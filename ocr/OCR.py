from flask import Flask, request, jsonify
import cv2
import pytesseract
import numpy as np
from datetime import datetime
import re
import json
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

def grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def extract_dates_from_text(text):
    date_pattern = r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b'
    dates = re.findall(date_pattern, text)
    return dates

def noice_removal(image):
    kernel = np.ones((1,1), np.uint8)
    image = cv2.dilate(image, kernel, iterations=1)
    kernel = np.ones((1,1), np.uint8)
    image = cv2.erode(image, kernel, iterations=1)
    image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    image = cv2.medianBlur(image, 3)
    return image

@app.route('/extract_dates', methods=['POST'])
def extract_dates():
    
    file = request.files['file']


    img = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_COLOR)

    gray_image = grayscale(img)
    no_noise = noice_removal(gray_image)
    kernel = np.ones((5, 5), np.uint8)  
    dilated_image = cv2.dilate(no_noise, kernel, iterations=1)
    eroded_image = cv2.erode(dilated_image, kernel, iterations=1)

  
    cv2.imwrite("preprocessed_image.jpg", eroded_image)

    text = pytesseract.image_to_string("preprocessed_image.jpg")

    dates = extract_dates_from_text(text)

  
    dates_dict = {"dates": {}}
    if len(dates) >= 2:
        mdate = min(dates)  # Manufactured date
        edate = max(dates)  # Expiry date
        mdate_obj = datetime.strptime(mdate, '%d/%m/%y')
        edate_obj = datetime.strptime(edate, '%d/%m/%y')
        remaining_duration = edate_obj - datetime.now()
        remaining_years = remaining_duration.days // 365
        remaining_months = (remaining_duration.days % 365) // 30
        remaining_days = remaining_duration.days % 30
        if remaining_years <= 0:
            remaining_years = 0
        elif remaining_months <= 0:
            remaining_months= 0
        elif remaining_days <= 0:
            remaining_days= 0

        dates_dict["dates"] = {
            "mdate": mdate,
            "edate": edate,
            "rd": remaining_days,
            "rm": remaining_months,
            "ry": remaining_years
        }

 
    with open("extracted_dates.json", "w") as json_file:
        json.dump(dates_dict, json_file)

    return jsonify(dates_dict)

if __name__ == '__main__':
    app.run(debug=True,port=5002)
