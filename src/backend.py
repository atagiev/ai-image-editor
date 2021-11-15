from PIL import Image

from src.local_storage import LocalStorage
from src.queue import Queue
from src.request import Request


class Backend:
    def __init__(self, storage: LocalStorage, queue: Queue):
        self.__storage = storage
        self.__queue = queue

    def run(self):
        pass

    def send_web_page(self):
        pass

    def get_image(self):
        pass

    def __send_image(self, request: Request):
        pass

    def __create_request(self, filter_name: str, image: Image) -> Request:
        pass
