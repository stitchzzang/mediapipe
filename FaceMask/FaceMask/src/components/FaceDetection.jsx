import React, { useRef, useEffect } from 'react';
import { useFaceDetection } from '../hooks/useFaceDetection';

export const FaceDetection = ({ onFaceDetected }) => {
  const videoRef = useRef(null);
  const { model, error } = useFaceDetection();

  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
    };
    
    setupCamera();
    
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const detectFaces = async () => {
      if (videoRef.current && videoRef.current.readyState === 4 && model) {
        const predictions = await model.estimateFaces({ input: videoRef.current });
        if (predictions?.length > 0) {
          onFaceDetected(predictions[0]);
        }
      }
      animationFrameId = requestAnimationFrame(detectFaces);
    };

    detectFaces();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [model, onFaceDetected]);

  if (error) {
    return <div>Error loading model: {error}</div>;
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        position: 'absolute',
        width: '640px',
        height: '480px',
        transform: 'scaleX(-1)',
      }}
    />
  );
};
