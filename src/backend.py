from logging import info
from time import sleep

from PIL import Image
from flask import render_template
from flask import request as flask_request

from src.local_storage import LocalStorage
from src.queue import Queue
from src.request import Request


class Backend:
    def __init__(self, storage: LocalStorage, queue: Queue):
        self.__storage = storage
        self.__queue = queue

    def __create_request(self, filter_name: str, image: Image) -> Request:
        image_id = self.__storage.save_image(image=image)
        request = Request(input_image_id=image_id, filter_name=filter_name)
        info(msg=f"New request with id {image_id} created")
        return request

    @staticmethod
    def send_web_page():
        return render_template("public/index.html")

    def delete_image(self, image_id):
        sleep(20)
        info(msg=f"Deleting image {image_id}")
        self.__storage.delete_image(image_id=image_id)

    def get_image(self, flask_request_local: flask_request):
        image = Image.open(flask_request_local.files['image'])
        filter_name = flask_request_local.values['filter_name']

        request = self.__create_request(image=image, filter_name=filter_name)
        self.__queue.add_open_request(request=request)

        while request not in self.__queue.get_closed_requests():
            sleep(2)

        self.__queue.delete_closed_request(request=request)

        path = self.__storage.get_image_path(image_id=request.output_image_id)
        return path, request.output_image_id
