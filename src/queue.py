from src.request import Request


class Queue:
    def __init__(self):
        self.__list_open_requests: list[Request] = []
        self.__list_closed_requests: list[Request] = []

    def add_open_request(self, request: Request):
        pass

    def get_open_request(self) -> Request:
        pass

    def move_open_to_closed(self, request: Request):
        pass

    def get_closed_request(self) -> Request:
        pass
