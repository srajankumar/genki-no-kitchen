from flask import Flask, request, jsonify
import cv2
from pyzbar.pyzbar import ZBarSymbol, decode
import json

app = Flask(__name__)

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
   
    file = request.files['file']
  
    image_path = file

  
    barcode_data = read_barcode(image_path)

    if barcode_data:
       
        json_data = {"barcode_data": barcode_data}
       
        with open("barcode_data.json", "w") as json_file:
            json.dump(json_data, json_file)
        return jsonify(json_data), 200
    else:
        return jsonify({"error": "No barcode detected in the image."}), 400

if __name__ == '__main__':
    app.run(debug=True)
