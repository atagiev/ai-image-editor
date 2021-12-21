from enum import Enum


class FilterNamesEnum(Enum):
    """
    IMPORTANT ai filters name should start with "ai_"
    """
    AI_CANDY = "candy"
    AI_FEATHERS = "feathers"
    AI_MOSAIC = "mosaic"
    
    GREYSCALE = "Черно-белое"
    BROWN = "Сепия"
    INVERT = "Инвертирование"
    HAND_DRAWN = "Рисунок"
    EMBOSS = "Рельеф"
