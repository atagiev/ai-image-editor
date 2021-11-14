from PIL import Image

from src.filter_names_enum import FilterNamesEnum


class LocalStorage:
    def __init__(self, tmp_folder_path: str, filters_folder_path: str):
        self.__tmp_folder_path = tmp_folder_path
        self.__filters_folder_path = filters_folder_path
        self.__last_image_id = 0

    def save_image(self, image: Image):
        pass

    def get_image(self, image_id: int) -> Image:
        pass

    def delete_image(self, image_id: int):
        pass

    def get_filter_image(self, filter_name: FilterNamesEnum):
        pass
