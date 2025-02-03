import React, { useEffect } from 'react';
import { createFaceLandmarker, detectFaceLandmarks } from '../../utils/faceUtils';
import { useWebcam } from '../../hooks/useWebcam';
import { useThreeJS } from '../../hooks/useThreeJS';

const FaceLandmarkerComponent = ({ maskModelUrl }) => {
  const videoRef = useWebcam(async (videoElement) => {
    const faceLandmarker = await createFaceLandmarker();
    const detect = async () => {
      const landmarks = await detectFaceLandmarks(faceLandmarker, videoElement);
      console.log('Detected landmarks:', landmarks);
      requestAnimationFrame(detect);
    };
    detect();
  });

  const canvasRef = useThreeJS(maskModelUrl);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }}></video>
      <div ref={canvasRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default FaceLandmarkerComponent;
