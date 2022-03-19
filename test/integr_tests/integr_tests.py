import os
import pathlib
import unittest
import multiprocessing
from time import sleep

import requests


def backend_process():
    os.chdir(os.path.join(pathlib.Path().resolve(), "..", ".."))
    import main


class IntegrationTests(unittest.TestCase):

    @staticmethod
    def _run_backend():
        thread = multiprocessing.Process(target=backend_process)
        thread.start()
        sleep(5)
        return thread

    def test_two_backends(self):
        th = self._run_backend()
        is_failed = False

        try:
            import main
        except:
            is_failed = True

        self.assertTrue(is_failed)
        th.terminate()

    def test_ping(self):
        th = self._run_backend()

        r = requests.get(url="http://localhost:5000/ping")
        self.assertTrue(r.json()['success'])

        th.terminate()

    def test_file_server(self):
        th = self._run_backend()

        r = requests.get(url="http://localhost:8000/")
        self.assertIsNotNone(r.text)

        th.terminate()

    def test_get_image_size(self):
        th = self._run_backend()
        path = os.path.join(pathlib.Path().resolve(), "..", "test_images", "fox_320_480.jpg")

        payload = {'image': open(path, 'rb')}
        response = requests.post(url="http://localhost:5000/get_size", files=payload)
        r = response.json()
        self.assertEqual(r['w'], 320)
        self.assertEqual(r['h'], 480)
        th.terminate()

    def test_get_not_image_size(self):
        th = self._run_backend()
        path = os.path.join(pathlib.Path().resolve(), "..", "unit_tests", "test_ai_filter.py")

        payload = {'image': open(path, 'rb')}
        response = requests.post(url="http://localhost:5000/get_size", files=payload)
        self.assertEqual(response.status_code, 500)
        th.terminate()

    def test_apply_filter(self):
        th = self._run_backend()

        path = os.path.join(pathlib.Path().resolve(), "..", "test_images", "fox_320_480.jpg")

        payload = {'image': open(path, 'rb')}
        data = {'filter_name': "Candy"}
        response = requests.post(url="http://localhost:5000/", data=data, files=payload)

        self.assertEqual(response.json()['id'], 2)

        th.terminate()

    def test_apply_filter_on_incorrect_file(self):
        th = self._run_backend()

        path = os.path.join(pathlib.Path().resolve(), "..", "unit_tests", "test_ai_filter.py")

        payload = {'image': open(path, 'rb')}
        data = {'filter_name': "Candy"}
        response = requests.post(url="http://localhost:5000/", data=data, files=payload)

        self.assertEqual(response.status_code, 500)

        th.terminate()

    def test_save_unreal_image(self):
        th = self._run_backend()
        data = {'saved_image_id': "2000"}
        response = requests.post(url="http://localhost:5000/save_image", data=data)
        r = response.json()
        self.assertFalse(r['success'])
        th.terminate()

    def test_save_image(self):
        th = self._run_backend()

        path = os.path.join(pathlib.Path().resolve(), "..", "test_images", "fox_320_480.jpg")

        payload = {'image': open(path, 'rb')}
        data = {'filter_name': "Candy"}
        response = requests.post(url="http://localhost:5000/", data=data, files=payload)

        self.assertEqual(response.json()['id'], 2)

        data = {'saved_image_id': "2"}
        response = requests.post(url="http://localhost:5000/save_image", data=data)
        r = response.json()
        self.assertTrue(r['success'])

        th.terminate()

    def test_reset(self):
        th = self._run_backend()

        r = requests.get(url="http://localhost:5000/reset")
        self.assertEqual(r.json()['error'], "NO")

        th.terminate()

    def test_get_last_saved(self):
        th = self._run_backend()

        path = os.path.join(pathlib.Path().resolve(), "..", "test_images", "fox_320_480.jpg")
        payload = {'image': open(path, 'rb')}
        data = {'filter_name': "Candy"}
        requests.post(url="http://localhost:5000/", data=data, files=payload)

        data = {'saved_image_id': "2"}
        requests.post(url="http://localhost:5000/save_image", data=data)

        response = requests.get(url="http://localhost:5000/get_last_saved")

        r = response.json()

        self.assertEqual(r['error'], "NO")
        self.assertEqual(r['id'], "2")

        th.terminate()

    def test_bad_get_last_saved(self):
        th = self._run_backend()

        response = requests.get(url="http://localhost:5000/get_last_saved")
        r = response.json()

        self.assertEqual(r['error'], "YES")

        th.terminate()

    def test_find_file_in_http_server(self):
        th = self._run_backend()

        path = os.path.join(pathlib.Path().resolve(), "..", "test_images", "fox_320_480.jpg")

        payload = {'image': open(path, 'rb')}
        data = {'filter_name': "Candy"}
        response = requests.post(url="http://localhost:5000/", data=data, files=payload)

        self.assertEqual(response.json()['id'], 2)

        r = requests.get(url="http://localhost:8000/")
        self.assertIn("2.jpg", r.text)

        th.terminate()

    @unittest.skip
    def test_reset_applied_filters(self):
        th = self._run_backend()
        path = os.path.join(pathlib.Path().resolve(), "..", "test_images", "fox_320_480.jpg")

        payload = {'image': open(path, 'rb')}
        data = {'filter_name': "Candy"}
        requests.post(url="http://localhost:5000/", data=data, files=payload)

        data = {'saved_image_id': "2"}
        requests.post(url="http://localhost:5000/save_image", data=data)

    @unittest.skip
    def test_images_on_file_server(self):
        pass


if __name__ == '__main__':
    unittest.main()
