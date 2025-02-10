// src/components/FaceMask.jsx
import React, { useEffect, useRef } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { initThreeScene } from '../lib/threeRenderer';
import { initFaceMesh } from '../lib/faceLandmark';

const FaceMask = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const threeRendererRef = useRef(null);

  useEffect(() => {
    // 1. 웹캠 스트림 가져오기 (해상도 640×480)
    const getWebcamStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        }
      } catch (err) {
        console.error('웹캠 접근 에러:', err);
      }
    };
    getWebcamStream();

    // 2. Three.js 캔버스 초기화 (가면 오버레이용)
    threeRendererRef.current = initThreeScene(canvasRef.current);

    // 3. Mediapipe FaceMesh 초기화
    const faceMesh = initFaceMesh((results) => {
      if (
        results.multiFaceLandmarks &&
        results.multiFaceLandmarks.length > 0
      ) {
        const landmarks = results.multiFaceLandmarks[0];
        threeRendererRef.current.updateMask(landmarks);
      }
    });

    // 4. Mediapipe Camera Utils를 이용해 비디오 프레임마다 FaceMesh 처리
    const cameraMP = new Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });
    cameraMP.start();

    return () => {
      cameraMP.stop();
    };
  }, []);

  return (
    // 컨테이너 div에 relative를 주어 내부 요소들을 겹쳐 배치
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      {/* 웹캠 비디오: 배경으로 사용 (만약 미러링이 필요하면 transform: scaleX(-1)를 적용) */}
      <video
        ref={videoRef}
        style={{
          width: '640px',
          height: '480px',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          transform: 'scaleX(-1)'  // 웹캠 좌우 반전
        }}
        autoPlay
        playsInline
        muted
      />
      {/* Three.js 캔버스: 위에 가면(마스크) 오버레이 */}
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          transform: 'scaleX(-1)'  // 캔버스도 좌우 반전
        }}
      />
    </div>
  );
};

export default FaceMask;
