import { FaceLandmarker } from '@mediapipe/tasks-vision';

export const createFaceLandmarker = async () => {
  const faceLandmarker = new FaceLandmarker({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_landmarker/${file}`,
  });

  await faceLandmarker.setOptions({
    selfieMode: true,
    modelComplexity: 1,
    enableSegmentation: true,
    smoothSegmentation: true,
  });

  return faceLandmarker;
};

export const detectFaceLandmarks = async (faceLandmarker, videoElement) => {
  const results = await faceLandmarker.send({ image: videoElement });
  return results.multiFaceLandmarks;
};
