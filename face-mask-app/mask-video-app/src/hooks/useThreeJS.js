import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const useThreeJS = (maskModelUrl) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const rendererRef = useRef(new THREE.WebGLRenderer({ antialias: true }));

  useEffect(() => {
    const initThreeJS = async () => {
      const { loadMaskModel } = await import('../utils/maskLoader');
      const maskModel = await loadMaskModel(maskModelUrl);

      cameraRef.current.position.z = 5;
      sceneRef.current.add(maskModel);

      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      canvasRef.current.appendChild(rendererRef.current.domElement);

      const animate = () => {
        requestAnimationFrame(animate);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };

      animate();
    };

    initThreeJS();
  }, [maskModelUrl]);

  return canvasRef;
};
