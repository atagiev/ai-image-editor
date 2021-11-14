from PIL import Image

from src.filter_names_enum import FilterNamesEnum


class AIFilter:
    def apply_filter(self, image: Image, filter_name: FilterNamesEnum, filter_image: Image) -> Image:
        pass
