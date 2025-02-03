import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Webcam from './Webcam';
import MaskRenderer from './MaskRenderer';
import useFaceLandmarker from '../../hooks/useFaceLandmarker';

const ARMask = () => {
  const [landmarks, setLandmarks] = useState(null);
  const { detectFace, isLoading } = useFaceLandmarker();

  const handleFrame = (video) => {
    const results = detectFace(video);
    console.log('Detected face landmarks:', results); // 추가된 콘솔 로그
    if (results?.faceLandmarks?.[0]) {
      setLandmarks(results.faceLandmarks[0]);
    }
  };

  if (isLoading) {
    return <div>Loading face detection model...</div>;
  }

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <Webcam onFrame={handleFrame} />
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%' 
      }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <MaskRenderer 
            faceLandmarks={landmarks} 
            maskUrl="/models/masks/mask3.glb"
          />
          {console.log('Rendering MaskRenderer with landmarks:', landmarks, 'and maskUrl:', '/models/masks/mask3.glb')}
        </Canvas>
      </div>
    </div>
  );
};

export default ARMask;