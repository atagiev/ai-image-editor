import argparse
import cv2
import glob
import os
from basicsr.archs.rrdbnet_arch import RRDBNet

from .realesrgan import RealESRGANer
from .realesrgan.archs.srvgg_arch import SRVGGNetCompact


def main(model_name='RealESRGAN_x4plus', input_obj="inputs", output_obj="results", outscale=4, suffix="out", tile=0,
         tile_pad=10, pre_pad=0, face_enhance=False, half=False, alpha_upsampler="realsrgan", ext="auto"):
    """Inference demo for Real-ESRGAN.
    """
    '''parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--input', type=str, default='inputs', help='Input image or folder')
    parser.add_argument(
        '-n',
        '--model_name',
        type=str,
        default='RealESRGAN_x4plus',
        help=('Model names: RealESRGAN_x4plus | RealESRNet_x4plus | RealESRGAN_x4plus_anime_6B | RealESRGAN_x2plus'
              'RealESRGANv2-anime-xsx2 | RealESRGANv2-animevideo-xsx2-nousm | RealESRGANv2-animevideo-xsx2'
              'RealESRGANv2-anime-xsx4 | RealESRGANv2-animevideo-xsx4-nousm | RealESRGANv2-animevideo-xsx4'))
    parser.add_argument('-o', '--output', type=str, default='results', help='Output folder')
    parser.add_argument('-s', '--outscale', type=float, default=4, help='The final upsampling scale of the image')
    parser.add_argument('--suffix', type=str, default='out', help='Suffix of the restored image')
    parser.add_argument('-t', '--tile', type=int, default=0, help='Tile size, 0 for no tile during testing')
    parser.add_argument('--tile_pad', type=int, default=10, help='Tile padding')
    parser.add_argument('--pre_pad', type=int, default=0, help='Pre padding size at each border')
    parser.add_argument('--face_enhance', action='store_true', help='Use GFPGAN to enhance face')
    parser.add_argument('--half', action='store_true', help='Use half precision during inference')
    parser.add_argument(
        '--alpha_upsampler',
        type=str,
        default='realesrgan',
        help='The upsampler for the alpha channels. Options: realesrgan | bicubic')
    parser.add_argument(
        '--ext',
        type=str,
        default='auto',
        help='Image extension. Options: auto | jpg | png, auto means using the same extension as inputs')
    args = parser.parse_args()'''

    # determine models according to model names
    model_name = model_name.split('.')[0]
    if model_name in ['RealESRGAN_x4plus', 'RealESRNet_x4plus']:  # x4 RRDBNet model
        model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
        netscale = 4
    elif model_name in ['RealESRGAN_x4plus_anime_6B']:  # x4 RRDBNet model with 6 blocks
        model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=6, num_grow_ch=32, scale=4)
        netscale = 4
    elif model_name in ['RealESRGAN_x2plus']:  # x2 RRDBNet model
        model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=2)
        netscale = 2
    elif model_name in [
            'RealESRGANv2-anime-xsx2', 'RealESRGANv2-animevideo-xsx2-nousm', 'RealESRGANv2-animevideo-xsx2'
    ]:  # x2 VGG-style model (XS size)
        model = SRVGGNetCompact(num_in_ch=3, num_out_ch=3, num_feat=64, num_conv=16, upscale=2, act_type='prelu')
        netscale = 2
    elif model_name in [
            'RealESRGANv2-anime-xsx4', 'RealESRGANv2-animevideo-xsx4-nousm', 'RealESRGANv2-animevideo-xsx4'
    ]:  # x4 VGG-style model (XS size)
        model = SRVGGNetCompact(num_in_ch=3, num_out_ch=3, num_feat=64, num_conv=16, upscale=4, act_type='prelu')
        netscale = 4

    # determine model paths
    model_path = os.path.join('Real_ESRGAN/experiments/pretrained_models', model_name + '.pth')
    if not os.path.isfile(model_path):
        model_path = os.path.join('realesrgan/weights', model_name + '.pth')
    if not os.path.isfile(model_path):
        raise ValueError(f'Model {model_name} does not exist.')

    # restorer
    upsampler = RealESRGANer(
        scale=netscale,
        model_path=model_path,
        model=model,
        tile=tile,
        tile_pad=tile_pad,
        pre_pad=pre_pad,
        half=half)

    if face_enhance:  # Use GFPGAN for face enhancement
        from gfpgan import GFPGANer
        face_enhancer = GFPGANer(
            model_path='https://github.com/TencentARC/GFPGAN/releases/download/v0.2.0/GFPGANCleanv1-NoCE-C2.pth',
            upscale=outscale,
            arch='clean',
            channel_multiplier=2,
            bg_upsampler=upsampler)

    if isinstance(output_obj, str):
        os.makedirs(output_obj, exist_ok=True)

    if isinstance(input_obj, str):
        '''if os.path.isfile(input):
            paths = [input]
        else:
            paths = sorted(glob.glob(os.path.join(input, '*')))'''
        imgname, extension = os.path.splitext(os.path.basename(input_obj))
        img = cv2.imread(input_obj, cv2.IMREAD_UNCHANGED)
    else:
        img = input_obj


    #for idx, path in enumerate(paths):
    #imgname, extension = os.path.splitext(os.path.basename(path))
    #print('Testing', idx, imgname)

    #img = cv2.imread(path, cv2.IMREAD_UNCHANGED)

    if len(img.shape) == 3 and img.shape[2] == 4:
        img_mode = 'RGBA'
    else:
        img_mode = None

    try:
        if face_enhance:
            _, _, result = face_enhancer.enhance(img, has_aligned=False, only_center_face=False, paste_back=True)
        else:
            result, _ = upsampler.enhance(img, outscale=outscale)
    except RuntimeError as error:
        print('Error', error)
        print('If you encounter CUDA out of memory, try to set --tile with a smaller number.')
    else:
        if ext == 'auto':
            extension = extension[1:]
        else:
            extension = ext
        if img_mode == 'RGBA':  # RGBA images should be saved in png format
            extension = 'png'
        if isinstance(input_obj, str):
            save_path = os.path.join(output_obj, f'{imgname}_{suffix}.{extension}')
            cv2.imwrite(save_path, result)
        else:
            return result


if __name__ == '__main__':
    main()
