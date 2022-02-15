import os
import pathlib
import unittest

from PIL import Image

from src.filter_names_enum import FilterNamesEnum
from src.local_storage import LocalStorage
from src.request import Request

class RequestTest(unittest.TestCase):
    def setUp(self) -> None:
        tmp_folder_path = os.path.join(pathlib.Path().resolve(),"..", "tmp")
        filters_folder_path = os.path.join(pathlib.Path().resolve(),"..", "ai_filters", "Style_GAN", "images")

        self.ls = LocalStorage(tmp_folder_path=tmp_folder_path, filters_folder_path=filters_folder_path)
        image1 = Image.open(os.path.join(pathlib.Path().resolve(), "images", "unnamed.jpg"))
        image2 = Image.open(os.path.join(pathlib.Path().resolve(),  "images", "unnamed_3.jpg"))
        self.id1 = self.ls.save_image(image=image1)
        self.id2 = self.ls.save_image(image=image2)

    def tearDown(self) -> None:
        self.ls.delete_images()

    def testRequestParams(self):
        r = Request(input_image_id=self.id1, filter_name=FilterNamesEnum.GREYSCALE.value)

        self.assertEqual(first=self.id1, second=r.input_image_id, msg="Expected equal IDs")

        self.assertIsNone(obj=r.output_image_id, msg="Expected None output id")

        self.assertEqual(first=r.filter_name, second=FilterNamesEnum.GREYSCALE, msg="Expected GREYSCALE filter")

        r.output_image_id = self.id2
        self.assertEqual(first=r.output_image_id, second=self.id2, msg="Expected equal IDs")

    def testRequestAIChecker(self):
        r = Request(input_image_id=self.id1, filter_name=FilterNamesEnum.GREYSCALE.value)

        self.assertFalse(expr=r.is_ai_filter)

        r2 = Request(input_image_id=self.id1, filter_name=FilterNamesEnum.AI_CANDY.value)

        self.assertTrue(expr=r2.is_ai_filter)

    def testRequestFilterNames(self):
        r = Request(input_image_id=self.id1, filter_name=FilterNamesEnum.GREYSCALE.value)
        self.assertEqual(first=r.filter_name, second=FilterNamesEnum.GREYSCALE, msg="Expected GREYSCALE filter")

        self.assertFalse(expr=r.is_ai_filter)

        is_failed = False
        try:
            Request(input_image_id=self.id1, filter_name="NOTAFILTER")
        except:
            is_failed = True

        self.assertTrue(expr=is_failed)


if __name__ == '__main__':
    unittest.main()
