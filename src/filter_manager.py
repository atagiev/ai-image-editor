from src.ai_filter import AIFilter
from src.classic_filter import ClassicFilter
from src.local_storage import LocalStorage
from src.queue import Queue


class FilterManager:
    def __init__(self, storage: LocalStorage, queue: Queue):
        self.__ai_filter = AIFilter()
        self.__classic_filter = ClassicFilter()
        self.__storage: LocalStorage = storage
        self.__queue: Queue = queue

    def import_filters(self):
        pass

    def run(self):
        pass
