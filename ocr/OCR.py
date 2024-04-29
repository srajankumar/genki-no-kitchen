import cv2
import pytesseract
import numpy as np
from PIL import Image
import json
from datetime import datetime, timedelta
import re
pytesseract.pytesseract.tesseract_cmd = r'D:/Setups/Tesseract/tesseract.exe'

img=cv2.imread("C:/Users/sanks/OneDrive/Pictures/Screenshots/data1.jpg")

def grayscale(image):
    return cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)

gray_image=grayscale(img)
cv2.imwrite("D:/Projects/Computer Vision/OCR(FOOD)/binarization1.jpg",gray_image)

thresh,im_bw=cv2.threshold(gray_image,100,230,cv2.THRESH_BINARY)
cv2.imwrite("D:/Projects/Computer Vision/OCR(FOOD)/thresh1.jpg",im_bw)

def extract_dates_from_text(text):
    date_pattern = r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b'


    dates = re.findall(date_pattern, text)

    return dates

def noice_removal(image):
    kernel=np.ones((1,1),np.uint8)
    image=cv2.dilate(img,kernel,iterations=1)
    kernel= np.ones((1,1),np.uint8)
    image=cv2.erode(image,kernel,iterations=1)
    image=cv2.morphologyEx(image,cv2.MORPH_CLOSE,kernel)
    image=cv2.medianBlur(image,3)
    return image

no_noise=noice_removal(gray_image)
cv2.imwrite("D:/Projects/Computer Vision/OCR(FOOD)/noise1.jpg",no_noise)

kernel = np.ones((5, 5), np.uint8)  # Adjust the kernel size as needed

# Dilation
dilated_image = cv2.dilate(no_noise, kernel, iterations=1)

# Erosion
eroded_image = cv2.erode(dilated_image, kernel, iterations=1)
cv2.imwrite("D:/Projects/Computer Vision/OCR(FOOD)/eroded.jpg",eroded_image)

img=cv2.cvtColor(eroded_image,cv2.COLOR_BGR2RGB)
preprocessed_image = cv2.imread("D:/Projects/Computer Vision/OCR(FOOD)/eroded.jpg", cv2.IMREAD_GRAYSCALE)


# contours, _ = cv2.findContours(preprocessed_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
# for contour in contours:
#     # Get the bounding box of the contour
#     x, y, w, h = cv2.boundingRect(contour)
#     cv2.rectangle(preprocessed_image, (x, y), (x + w, y + h), (0, 255, 0), 2)


cv2.imwrite("D:/Projects/Computer Vision/OCR(FOOD)/pre.jpg", preprocessed_image)
text=pytesseract.image_to_string("D:/Projects/Computer Vision/OCR(FOOD)/pre.jpg")
print(text)

dates = extract_dates_from_text(text)

dates_dict = {"dates": dates}

if len(dates_dict["dates"]) >= 2:
    mdate = min(dates_dict["dates"])  # Manufactured date
    edate = max(dates_dict["dates"])  # Expiry date


mdate_obj = datetime.strptime(mdate, '%d/%m/%y')
edate_obj = datetime.strptime(edate, '%d/%m/%y')

remaining_duration = edate_obj - datetime.now()
# Calculate the difference between expiry date and today's date
remaining_years = remaining_duration.days // 365
remaining_months = (remaining_duration.days % 365) // 30
remaining_days = remaining_duration.days % 30



if remaining_years <= 0:
    remaining_years = 0;
elif remaining_months <= 0:
   remaining_months= 0
elif remaining_days <= 0:
    remaining_days= 0

dates_dict["dates"] = {"mdate": mdate, "edate": edate, "rd": remaining_days, "rm": remaining_months, "ry": remaining_years}

print("Remaining validity (days):", remaining_days)
print("Remaining validity (months):", remaining_months)
print("Remaining validity (years):", remaining_years)

with open("extracted_dates.json", "w") as json_file:
    json.dump(dates_dict, json_file)
