import os
import pathlib
from logging import info

from src.backend import Backend
from src.filter_manager import FilterManager
from src.local_storage import LocalStorage
from src.queue import Queue

tmp_folder_path = os.path.join(pathlib.Path().resolve(), "tmp")
filters_folder_path = os.path.join(pathlib.Path().resolve(), "ai_filters")
pathlib.Path(tmp_folder_path).mkdir(parents=True, exist_ok=True)
info(msg=f"tmp folder path: {tmp_folder_path}")
info(msg=f"filters folder path: {filters_folder_path}")

storage = LocalStorage(tmp_folder_path=tmp_folder_path, filters_folder_path=filters_folder_path)
queue = Queue()

filter_manager = FilterManager(storage=storage, queue=queue)
filter_manager.import_filters()
filter_manager.run()
backend = Backend(storage=storage, queue=queue)
backend.run()


