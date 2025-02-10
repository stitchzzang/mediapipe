// src/lib/faceLandmark.js
import { FaceMesh } from '@mediapipe/face_mesh';

/**
 * FaceMesh 초기화 함수.
 * @param {function} onResultsCallback - FaceMesh 결과 콜백 함수.
 * @returns {FaceMesh} 초기화된 FaceMesh 인스턴스.
 */
export const initFaceMesh = (onResultsCallback) => {
  const faceMesh = new FaceMesh({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
  });
  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: false,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.4,
  });
  faceMesh.onResults(onResultsCallback);
  return faceMesh;
};
