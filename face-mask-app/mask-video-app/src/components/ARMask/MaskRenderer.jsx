import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const MaskRenderer = ({ faceLandmarks, maskUrl }) => {
  const maskRef = useRef();
  const { scene } = useGLTF(maskUrl);
  
  useEffect(() => {
    if (scene) {
      scene.scale.set(100, 100, 100);
    }
  }, [scene]);

  useFrame(() => {
    if (!maskRef.current || !faceLandmarks || faceLandmarks.length === 0) return;

    // 얼굴 랜드마크를 기반으로 마스크 위치 업데이트
    const nose = faceLandmarks[0];
    maskRef.current.position.set(
      (nose.x - 0.5) * 2,
      -(nose.y - 0.5) * 2,
      -nose.z
    );
  });

  return (
    <primitive 
      ref={maskRef}
      object={scene.clone()} 
      dispose={null}
    />
  );
};

export default MaskRenderer;