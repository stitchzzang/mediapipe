// src/lib/threeRenderer.js
import * as THREE from 'three';

export const initThreeScene = (canvas) => {
  const scene = new THREE.Scene();
  const width = canvas.width;    // 640
  const height = canvas.height;  // 480

  // Orthographic 카메라 설정 (캔버스 픽셀 좌표와 일치)
  const camera = new THREE.OrthographicCamera(
    -width / 2, width / 2, height / 2, -height / 2, 1, 1000
  );
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(width, height);
  // 배경을 투명하게 설정 (알파값 0)
  renderer.setClearColor(0x000000, 0);

  let maskMesh;
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/src/assets/mask6.png', (texture) => {
    // 초기 크기는 임의값; updateMask에서 조정됨.
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    maskMesh = new THREE.Mesh(geometry, material);
    maskMesh.name = 'maskMesh';
    maskMesh.visible = false;
    scene.add(maskMesh);
  });

  // 애니메이션 루프
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  /**
   * 얼굴 랜드마크 데이터를 받아 마스크의 위치, 스케일, 회전을 업데이트함.
   * @param {Array} landmarks - Mediapipe에서 반환한 얼굴 랜드마크 배열
   */
  const updateMask = (landmarks) => {
    if (!maskMesh) return;

    // 얼굴의 기준 포인트: 코(landmarks[1]), 왼쪽 눈(landmarks[33]), 오른쪽 눈(landmarks[263])
    const nose = landmarks[1];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    if (!nose || !leftEye || !rightEye) return;

    const videoWidth = 640;
    const videoHeight = 480;

    // 코 좌표 변환: 정규화 좌표(0~1)를 픽셀 좌표로 변환 후, 캔버스 중심 기준으로 재계산
    const cx = nose.x * videoWidth;
    const cy = nose.y * videoHeight;
    const posX = cx - videoWidth / 2;
    // 마스크를 위로 30픽셀 이동 (값을 조절하여 원하는 높이로 설정 가능)
    const offsetY = 20;
    const posY = -(cy - videoHeight / 2) + offsetY;

    maskMesh.position.set(posX, posY, 0);

    // 눈 사이 거리로 스케일 조정
    const dx = (leftEye.x - rightEye.x) * videoWidth;
    const dy = (leftEye.y - rightEye.y) * videoHeight;
    const eyeDistance = Math.sqrt(dx * dx + dy * dy);
    const baseEyeDistance = 70; // 80에서 70으로 줄여서 가면 크기 증가 !!
    const scaleFactor = eyeDistance / baseEyeDistance;
    // Y축 스케일을 음수로 설정하여 상하 반전
    maskMesh.scale.set(scaleFactor, -scaleFactor, scaleFactor);

    // 눈의 기울기로 회전 (왼쪽 눈과 오른쪽 눈 사이의 각도)
    const angle = Math.atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x);
    maskMesh.rotation.z = -angle;

    maskMesh.visible = true;
  };

  return {
    renderer,
    scene,
    camera,
    updateMask,
  };
};
