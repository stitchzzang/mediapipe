import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';

export const FaceMask = ({ faceData }) => {
  const gltf = useLoader(GLTFLoader, '/models/mask.gltf');
  
  if (!faceData) return null;

  const nose = faceData.keypoints[4];
  
  return (
    <Suspense fallback={null}>
      <primitive 
        object={gltf.scene}
        position={[nose.x / 100, -nose.y / 100, -nose.z / 100]}
        scale={[0.01, 0.01, 0.01]}
        rotation={[0, Math.PI, 0]}
      />
    </Suspense>
  );
};
