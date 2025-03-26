from PIL import Image, ImageFont, ImageDraw
import easyocr
import numpy as np
from googletrans import Translator
import traceback
import re
from werkzeug.datastructures import FileStorage
import io
from typing import Dict, Union

TRANSLATOR = Translator()
THRESHOLD = 0.5
MAX_WIDTH = 1500
MAX_HEIGHT = 1500


class TranslateImageText:
    def __init__(self, image_file: FileStorage, lan_trg: str = "vi", format: str = "PNG") -> None:
        self.image_file = image_file
        self.lan_trg = lan_trg
        self.format = format
        self.reader = easyocr.Reader(lang_list=['en', 'ch_sim'], gpu=False)

    def translate_text(self, text: str) -> str:
        try:
            return TRANSLATOR.translate(text, src="auto", dest=self.lan_trg).text
        except Exception as e:
            print("Lỗi khi dịch:", e)
            return text

    def translate_lan_trg(self) -> Dict[str, Union[int, io.BytesIO]]:
        try:
            img = Image.open(self.image_file)
            if img.size[0] > MAX_WIDTH or img.size[1] > MAX_HEIGHT:
                img = img.resize((MAX_WIDTH, MAX_HEIGHT), Image.LANCZOS)
            img_array = np.array(img)

            try:
                text_ = self.reader.readtext(img_array)
            except Exception:
                pass
            if not text_:
                img_io = io.BytesIO()
                img.save(img_io, format=self.format)
                img_io.seek(0)
                return {
                    "code": 0,
                    "image": img_io,
                }
            draw = ImageDraw.Draw(img)
            try:
                font = ImageFont.truetype("arial.ttf", size=30)
            except IOError:
                font = ImageFont.load_default()
            for t_ in text_:
                bbox, text, score = t_
                if score > THRESHOLD:
                    translated_text = self.translate_text(text)

                    text_size = draw.textbbox(
                        (0, 0), translated_text, font=font)
                    width = text_size[2] - text_size[0]
                    height = text_size[3] - text_size[0]
                    draw.rectangle(
                        xy=(bbox[0][0], bbox[0][1], max(bbox[2][0], bbox[0][0] + width),
                            max(bbox[2][1], bbox[0][1] + height)),
                        outline=(0, 0, 0), width=2, fill=(255, 255, 255)
                    )

                    draw.text((bbox[0][0], bbox[0][1]),
                              translated_text, font=font, fill=(0, 0, 0))
            img_io = io.BytesIO()
            img.save(img_io, format=self.format)
            img_io.seek(0)
            return {
                "code": 1,
                "image": img_io,
            }
        except ValueError:
            return {
                "code": 2,
                "image": None,
            }
        except IOError:
            return {
                "code": 3,
                "image": None,
            }
        except Exception:
            return {
                "code": 4,
                "image": None,
            }
