import easyocr
import cv2

from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np

####
file = open('server/count.txt', 'r')
count = str(int(file.read()) + 1 )
file.close()


file = open("server/count.txt", "w") 
file.write(count)
file.close()

file = open('server/count.txt', 'r')
num = file.read()
file.close()

####

# 이미지 분류
model = load_model('server/keras_model.h5')

data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

img_link = 'uploads/1.jpg'
image = Image.open(img_link).convert('RGB')
IMG_P = img_link


size = (224, 224)

image = ImageOps.fit(image, size, Image.ANTIALIAS)

image_array = np.asarray(image)

normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

data[0] = normalized_image_array

prediction = model.predict(data)

str_list = str(prediction).split()

Student_card = float(str_list[0][2:5])
Identification_card = float(str_list[1][:3])
driver_license = float(str_list[2][:3])
Credit_Check_Card = float(str_list[3][:3])
Earphones = float(str_list[4][:3])
Wallet = float(str_list[5][:3])
Tumbler = float(str_list[6][:3])
Cosmetics = float(str_list[7][:3])
Guitar = float(str_list[8][:3])

dic = {"학생증" : Student_card, "주민등록증" : Identification_card, 
    "운전면허증" : driver_license, "신용_체크카드" : Credit_Check_Card,  
    "이어폰" : Earphones, "지갑" : Wallet,
    "텀블러" : Tumbler, "화장품" : Cosmetics, 
    "기타" : Guitar}
# print(dic)

max_key = ""
for key, value in dic.items():
    if value == max(dic.values()):
        # print("max : ",key)
        max_key = key

###############################

image = cv2.imread(IMG_P)
IMG_PP = cv2.flip(image, 1)

# 얼굴 가림
if(max_key == "학생증" or max_key == "주민등록증" or max_key == "운전면허증"):

    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    gray = cv2.cvtColor(IMG_PP, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3,5)
    for (x,y,w,h) in faces:
        cv2.rectangle(IMG_PP, (x,y), (x+w, y+h), (255,255,255),-1)
        roi_gray = gray[y:y+h, x:x+w]

# 개인정보 가림
font = cv2.FONT_HERSHEY_SIMPLEX

reader = easyocr.Reader(['en', 'ko'])
RST = reader.readtext(IMG_PP)

for i in range(len(RST)):
    index = i
    T_LEFT = tuple(RST[i][0][0])
    B_RIGHT = tuple(RST[i][0][2])

    if(max_key == "학생증"):
        if((RST[i][1])[0:1] >= '0' and (RST[i][1])[0:1] <= '9') : 
            for j in range(len(RST) - i):
                IMG_PP = cv2.rectangle(IMG_PP,RST[i+j][0][0],RST[i+j][0][2],(255,255,255),-1)
                if((RST[i][1]) != '유효기한' or (RST[i][1]) != '유호기한'):
                    break       
        if((RST[i][1])[0:1] == 'd'):
            IMG_PP = cv2.rectangle(IMG_PP,T_LEFT,B_RIGHT,(255,255,255),-1)
    
    if(max_key == "주민등록증"):
        if(((RST[i][1])[0:1] >= '0' and (RST[i][1])[0:1] <= '9')): 
            for j in range(i, len(RST) - i):                
                
                if( ((RST[j][1])[0:4] <= '2022') and ((RST[j][1])[0:4] >= '1950') ):
                   break 
                IMG_PP = cv2.rectangle(IMG_PP,RST[j][0][0],RST[j][0][2],(255,255,255),-1)

    if(max_key == "운전면허증"):
        if((RST[i][1])[1:2] >= '0' and (RST[i][1])[1:2] <= '9'): 
            
            for j in range(i, len(RST) - i):          
                            
                if(len(RST[j][1]) == 3): continue
                elif(RST[j][1][0:1] == "면" or RST[j][1][0:1] == "적" or RST[j][1][2:3] == "검") : break
                else : IMG_PP = cv2.rectangle(IMG_PP,RST[j][0][0],RST[j][0][2],(255,255,255),-1)
                
    if(max_key == "신용_체크카드"):      
        if((RST[i][1])[0:1] >= '0' and (RST[i][1])[0:1] <= '9'): 
            
            for j in range(i, len(RST) - i):  
                if((RST[j][1])[0:1] >= '0' and (RST[j][1])[0:1] <= '9'):
                    IMG_PP = cv2.rectangle(IMG_PP,RST[j][0][0],RST[j][0][2],(255,255,255),-1)
                else : break
# 이미지 저장
if(max_key == "학생증"): cv2.imwrite('output/card/학생증/'+ num + '.jpg', IMG_PP)
elif(max_key == "주민등록증"): cv2.imwrite('output/card/주민등록증/'+ num + '.jpg', IMG_PP)
elif(max_key == "운전면허증"): cv2.imwrite('output/card/운전면허증/'+ num + '.jpg', IMG_PP)
elif(max_key == "신용_체크카드"): cv2.imwrite('output/card/신용카드/'+ num + '.jpg', IMG_PP)
elif(max_key == "이어폰"): cv2.imwrite('output/이어폰/'+ num + '.jpg', IMG_PP)
elif(max_key == "지갑"): cv2.imwrite('output/지갑/'+ num + '.jpg', IMG_PP)
elif(max_key == "텀블러"): cv2.imwrite('output/텀블러/'+ num + '.jpg', IMG_PP)
elif(max_key == "화장품"): cv2.imwrite('output/화장품/'+ num + '.jpg', IMG_PP)
else : cv2.imwrite('output/'+ num + '.jpg', IMG_PP)

#
link_str = ""
if(max_key == "학생증"): link_str = 'output/card/학생증/'+ num + '.jpg'
elif(max_key == "주민등록증"): link_str = 'output/card/주민등록증/'+ num + '.jpg'
elif(max_key == "운전면허증"): link_str = 'output/card/운전면허증/'+ num + '.jpg'
elif(max_key == "신용_체크카드"): link_str = 'output/card/신용카드/'+ num + '.jpg'
elif(max_key == "이어폰"): link_str = 'output/이어폰/'+ num + '.jpg'
elif(max_key == "지갑"): link_str = 'output/지갑/'+ num + '.jpg'
elif(max_key == "텀블러"): link_str = 'output/텀블러/'+ num + '.jpg'
elif(max_key == "화장품"): link_str = 'output/화장품/'+ num + '.jpg'
else : link_str = 'output/'+ num + '.jpg'

import json

image_dict = {
    "max_key" : max_key,
    "link" : link_str
}

json_string  = json.dumps(image_dict)
print(json_string)

