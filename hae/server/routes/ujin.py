import easyocr
import cv2
import matplotlib.pyplot as plot
import numpy as np

card = {'학생증': 0, '체크카드':0, '주민등록증' : 0, '운전면허증': 0}

# 얼굴 탐지 및 가림
IMG_P= './uploads/2.png'
# 'C:\\Users\\YuJin\\Desktop\\D\\card2.png'

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml') # 정면 얼굴 검출
img = cv2.imread(IMG_P)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.3,5)
for (x,y,w,h) in faces:
    cv2.rectangle(img, (x,y), (x+w, y+h), (255,255,255),-1)
    roi_gray = gray[y:y+h, x:x+w]

# 이미지 저장
cv2.imwrite("rename2.jpg",img)

# 개인정보 가림
reader = easyocr.Reader(['en', 'ko'])
RST = reader.readtext("rename2.jpg")

print(RST)

font = cv2.FONT_HERSHEY_SIMPLEX
IMG = cv2.imread("rename2.jpg")
print("m")
for i in range(len(RST)):
    index = i
    T_LEFT = tuple(RST[i][0][0])
    B_RIGHT = tuple(RST[i][0][2])
    print(RST[i][1])

    if(RST[i][1] == 'DGB대구은행' or
       RST[i][1] == 'DCU' or
       RST[i][1] == '학 생 증' or
       RST[i][1] == 'DGB Check'):
        card['학생증'] += 1
        
    if(RST[i][1] == '주민등록증'):
        card['주민등록증'] += 1
        
    if(RST[i][1] == 'NH농현카드'or
       RST[i][1] == 'NH농협카드'or
       RST[i][1] == '채움'or
       RST[i][1] == 'OK' or
       RST[i][1] == 'KB국민카드' or
       RST[i][1] == 'Check' or
       RST[i][1] == 'nori' or
       RST[i][1] == '﻿mastercard'):
           card['체크카드'] += 1

    #주민번호 
    if(((RST[i][1])[0:1] >= '0' and (RST[i][1])[0:1] <= '9')): 
        IMG = cv2.rectangle(IMG,T_LEFT,B_RIGHT,(255,255,255),-1)
        # 이후 정보 모두 가림
        for j in range(len(RST) - i):
            IMG = cv2.rectangle(IMG,RST[i+j][0][0],RST[i+j][0][2],(255,255,255),-1)
        break

# Student_link = 'C:\\Users\\YuJin\\Desktop\\OpenCV\\card\\StudentCard\\'
# Identification_link = 'C:\\Users\\YuJin\\Desktop\\OpenCV\\card\\IdentificationCard\\'
# Guitar_link = 'C:\\Users\\YuJin\\Desktop\\OpenCV\\card\\Guitar\\'
# driver_link = 'C:\\Users\\YuJin\\Desktop\\OpenCV\\card\\driverLicense\\'
# Check_link = 'C:\\Users\\YuJin\\Desktop\\OpenCV\\card\\CheckCard\\'
cv2.imwrite('./output/image.png', IMG)
'''
max_key = max(card, key = card.get)

if(max_key =='학생증'):
    cv2.imwrite(Student_link+"1.png", IMG)
    print('1')

elif(max_key =='체크카드'):
    cv2.imwrite(Check_link+"1.png", IMG)
    print('2')
    
elif(max_key =='주민등록증'):
    cv2.imwrite(Identification_link+"1.png", IMG)
    print('3')
    
elif(max_key =='운전면허증'):
    cv2.imwrite(driver_link+"1.png", IMG)
    print('4')
    
else:
    cv2.imwrite(Guitar_link+"1.png", IMG)
    print('5')
'''

# print("???????",card[max_key]) 
# print('dsfsf',max_key)        
# plot.imshow(IMG)
# plot.axis("off")
# plot.show()
#cv2.imwrite("rename2.jpg",IMG)

