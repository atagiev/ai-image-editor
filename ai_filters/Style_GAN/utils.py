import numpy as np
import torch
import cv2
from PIL import Image


def tensor_process_rgbimage(img, size=None, scale=None, keep_asp=False):
    #img = Image.open(filename).convert('RGB')
    if size is not None:
        if keep_asp:
            size2 = int(size * 1.0 / img.shape[0] * img.shape[1])
            img = cv2.resize(img, (size2, size), interpolation=cv2.INTER_AREA)
            #img = img.resize((size, size2), Image.ANTIALIAS)
        else:
            img = cv2.resize(img, (size, size), interpolation=cv2.INTER_AREA)

    elif scale is not None:
        img = cv2.resize(img, (int(img.shape[0] / scale), int(img.shape[1] / scale)), interpolation=cv2.INTER_AREA)
    img = img.transpose(2, 0, 1)
    img = torch.from_numpy(img).float()
    return img


def tensor_postprocess_rgbimage(tensor, cuda=False):
    if cuda:
        img = tensor.clone().cpu().clamp(0, 255).numpy()
    else:
        img = tensor.clone().clamp(0, 255).numpy()
    img = img.transpose(1, 2, 0).astype('uint8')
    return img
    #img = Image.fromarray(img)
    #img.save(filename)


def tensor_postprocess_bgrimage(tensor, cuda=False):
    (b, g, r) = torch.chunk(tensor, 3)
    tensor = torch.cat((r, g, b))
    return tensor_postprocess_rgbimage(tensor, cuda)


def preprocess_batch(batch):
    batch = batch.transpose(0, 1)
    (r, g, b) = torch.chunk(batch, 3)
    batch = torch.cat((b, g, r))
    batch = batch.transpose(0, 1)
    return batch
