import * as faceapi from 'face-api.js';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './FaceRecognition.css';

const FaceRecognition = () => {
  const webcamRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showScanner, setShowScanner] = useState(true);
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      setFaceDetected(true);
    };

    loadModels();
  }, []);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    const image = await faceapi.fetchImage(imageSrc);
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
    setDetections(detections);
    console.log(detections);
    webcamRef.current.pause();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowScanner(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>

      <div style={{ marginTop: '20px',backgroundColor: 'pink', padding: '20px', borderRadius: '10px', position: 'relative' }}>
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
        ) : (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={false}
              width={255}
              height={190}
              videoConstraints={{
                facingMode: 'user'
              }}
              style={{ transform: 'scaleX(-1)' }}
            />
            {showScanner && (
              <div className="scanner"></div>
            )}
            {detections.map((detection, index) => (
              <div
                key={index}
                className="face-border"
                style={{
                  position: 'absolute',
                  top: detection.box.top,
                  left: detection.box.left,
                  width: detection.box.width,
                  height: detection.box.height,
                  border: '2px solid green',
                  borderRadius: '5px',
                  pointerEvents: 'none', 
                }}
              ></div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
