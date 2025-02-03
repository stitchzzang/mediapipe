// 웹캠 스트림 초기화 및 관리
// 비디오 엘리먼트 설정
// MediaPipe 분석을 위한 프레임 제공
import React, { useEffect, useRef } from 'react';

const Webcam = ({ onFrame }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    enableCamera();

    // Cleanup function
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleVideoPlay = () => {
    const processFrame = () => {
      if (videoRef.current) {
        onFrame?.(videoRef.current);
      }
      requestAnimationFrame(processFrame);
    };

    requestAnimationFrame(processFrame);
  };

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      onPlay={handleVideoPlay}
      style={{ width: '640px', height: '480px' }}
    />
  );
};

export default Webcam;