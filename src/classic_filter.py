from PIL import Image

from classic_filters import classic_filter_impl
from src.filter_names_enum import FilterNamesEnum


class ClassicFilter:
    def apply_filter(self, image: Image, filter_name: FilterNamesEnum) -> Image:
        if filter_name == FilterNamesEnum.classic_filter1:
            return classic_filter_impl.greyscale_filter(image)
        elif filter_name == FilterNamesEnum.classic_filter2:
            return classic_filter_impl.brown_filter(image)
        elif filter_name == FilterNamesEnum.classic_filter3:
            return classic_filter_impl.invert_filter(image)
        elif filter_name == FilterNamesEnum.classic_filter4:
            return classic_filter_impl.hand_drawn_filter(image)
        elif filter_name == FilterNamesEnum.classic_filter5:
            return classic_filter_impl.emboss_filter(image)

