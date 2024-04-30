# from flask import Flask, request, jsonify
# import cv2
# from pyzbar.pyzbar import ZBarSymbol, decode
# import json
# from flask_cors import CORS
# app = Flask(__name__)
# CORS(app)
# def read_barcode(image_path):
#     frame = cv2.imread(image_path)
#     barcodes = decode(frame, symbols=[ZBarSymbol.EAN13])
#     if barcodes:
#         for barcode in barcodes:
#             barcode_data = barcode.data.decode('utf-8')
#             return barcode_data
#     return None

# @app.route('/read_barcode', methods=['POST'])
# def read_barcode_api():
   
#     file = request.files['file']
  
#     image_path = file

  
#     barcode_data = read_barcode(image_path)

#     if barcode_data:
       
#         json_data = {"barcode_data": barcode_data}
       
#         with open("barcode_data.json", "w") as json_file:
#             json.dump(json_data, json_file)
#         return jsonify(json_data), 200
#     else:
#         return jsonify({"error": "No barcode detected in the image."}), 400

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
import cv2
from pyzbar.pyzbar import ZBarSymbol, decode
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def read_barcode(image_path):
    frame = cv2.imread(image_path)
    barcodes = decode(frame, symbols=[ZBarSymbol.EAN13])
    if barcodes:
        for barcode in barcodes:
            barcode_data = barcode.data.decode('utf-8')
            return barcode_data
    return None

@app.route('/read_barcode', methods=['POST'])
def read_barcode_api():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file to a temporary location
    upload_folder = 'uploads'  # Specify the folder where files will be saved
    os.makedirs(upload_folder, exist_ok=True)
    image_path = os.path.join(upload_folder, file.filename)
    file.save(image_path)

    # Pass the path of the saved file to the read_barcode function
    barcode_data = read_barcode(image_path)

    if barcode_data:
        json_data = {"barcode_data": barcode_data}
        with open("barcode_data.json", "w") as json_file:
            json.dump(json_data, json_file)
        return jsonify(json_data), 200
    else:
        return jsonify({"error": "No barcode detected in the image."}), 400

if __name__ == '__main__':
    app.run(debug=True,port=5001)
