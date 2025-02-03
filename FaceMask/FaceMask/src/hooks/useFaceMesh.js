import { useState, useEffect } from 'react'; // useState 추가
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const useFaceMesh = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 }
      );
      setModel(model);
    };
    loadModel();
  }, []);

  const detectFace = async (video) => {
    if (!model || !video) return null;

    const predictions = await model.estimateFaces({
      input: video,
      returnTensors: false,
      flipHorizontal: false,
      predictIrises: false,
    });
    return predictions;
  };

  return { detectFace };
};
