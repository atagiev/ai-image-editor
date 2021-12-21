from PIL import Image

from src.filter_names_enum import FilterNamesEnum
import ai_filters.Style_GAN.inference_stylegan as style_gan
import numpy as np


class AIFilter:
    def apply_filter(self, image: Image, filter_name: FilterNamesEnum) -> Image:
        if filter_name == FilterNamesEnum.AI_CANDY:
            style = "candy"
        elif filter_name == FilterNamesEnum.AI_FEATHERS:
            style = "feathers"
        elif filter_name == FilterNamesEnum.AI_MOSAIC:
            style = "mosaic"
        elif filter_name == FilterNamesEnum.AI_STARRY_NIGHT:
            style = "starry_night"
        elif filter_name == FilterNamesEnum.AI_WAVE:
            style = "wave"
        image = np.asarray(image)
        result = style_gan.run(image, input_size=image.shape[0], style=style)
        return Image.fromarray(np.uint8(result)).convert('RGB')
