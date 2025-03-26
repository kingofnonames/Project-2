from flask import Flask, request, send_file, make_response, jsonify
from easy_ocr_start import TranslateImageText
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/process_image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({"errorCode": 1, }), 400
    try:
        file = request.files['file']
        translate_image_text = TranslateImageText(file)
        respond = translate_image_text.translate_lan_trg()
        if respond["code"] == 0 or respond["code"] == 1:
            if respond["image"]:
                response = make_response(
                    send_file(respond["image"], mimetype='image/png'))
                response.status_code = 200
                return response
        else:
            return jsonify({"errorCode": respond["code"]}), 500
    except Exception:
        return jsonify({"errorCode": 7}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
