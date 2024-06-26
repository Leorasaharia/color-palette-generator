import cv2
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame = cv2.flip(frame, 1)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    min_face_size = (160, 160) 
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=min_face_size)
    for (x, y, w, h) in faces:
        face_size = max(w, h)
        if face_size < 180:  
            color = (0, 255, 0)  
        elif face_size >= 180 and face_size < 360: 
            color = (0, 0, 255) 
        else:
            color = (255, 0, 0) 
        cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)  
        cv2.putText(frame, "Human Face", (x, y+h+20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)  
    cv2.imshow('Face Recognition', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
