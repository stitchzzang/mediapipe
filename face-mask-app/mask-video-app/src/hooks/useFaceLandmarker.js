import { useEffect, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const useFaceLandmarker = () => {
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeFaceLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          },
          outputFaceBlendshapes: true,
          outputFacialTransformationMatrixes: true,
          runningMode: "VIDEO",
          numFaces: 1
        });

        setFaceLandmarker(landmarker);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing face landmarker:', error);
        setIsLoading(false);
      }
    };

    initializeFaceLandmarker();
  }, []);

  const detectFace = (video) => {
    if (!faceLandmarker) return null;

    const nowInMs = Date.now();
    const results = faceLandmarker.detectForVideo(video, nowInMs);
    return {
      faceLandmarks: results.faceLandmarks,
      transformationMatrix: results.transformationMatrix // Ensure this is included
    };
  };

  return { faceLandmarker, isLoading, detectFace };
};

export default useFaceLandmarker;

