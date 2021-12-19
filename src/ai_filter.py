from PIL import Image

from src.filter_names_enum import FilterNamesEnum
# import ai_filters.Style_GAN.inference_stylegan as style_gan
# import ai_filters.Real_ESRGAN.inference_realesrgan as real_srgan


class AIFilter:
    def apply_filter(self, image: Image, filter_name: FilterNamesEnum) -> Image:
        # if filter_name == FilterNamesEnum.AI_UPSCALE:
        #     result = real_srgan.main(model_name="RealESRGAN_x4plus", input_obj=image, output_obj=None, outscale=3.5, half=True, face_enhance=True, ext=None)
        # else:
        #     result = style_gan.run(image, input_size=image.shape[0], style=filter_name)
        return image