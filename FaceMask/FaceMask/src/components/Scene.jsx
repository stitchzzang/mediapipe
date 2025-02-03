import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaceMask } from './FaceMask';
import { FaceDetection } from './FaceDetection';
import { useState } from 'react';

export const Scene = () => {
  const [faceData, setFaceData] = useState(null);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <FaceDetection onFaceDetected={setFaceData} />
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FaceMask faceData={faceData} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};
