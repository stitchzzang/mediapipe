import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const MaskRenderer = ({ faceLandmarks, maskUrl }) => {
  const { scene } = useGLTF(maskUrl);

  useEffect(() => {
    if (faceLandmarks) {
      console.log('Received face landmarks in MaskRenderer:', faceLandmarks);
      // Update mask position based on faceLandmarks
      const [x, y, z] = faceLandmarks[0]; // Example: use the first landmark for positioning
      scene.position.set(x, y, z);
      scene.rotation.set(0, 0, 0); // Adjust rotation if necessary
      scene.scale.set(1, 1, 1); // Adjust scale if necessary

      // If transformation matrix is available, apply it
      if (faceLandmarks.transformationMatrix) {
        const matrix = new THREE.Matrix4().fromArray(faceLandmarks.transformationMatrix);
        scene.applyMatrix4(matrix);
      }
    }
  }, [faceLandmarks, scene]);

  return (
    <primitive object={scene} />
  );
};

export default MaskRenderer;
