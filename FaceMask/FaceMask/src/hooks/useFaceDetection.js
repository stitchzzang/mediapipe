import React, { useState, useEffect } from 'react';
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

export const useFaceDetection = () => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipe,
          { detectorModelType: "short" }
        );
        setModel(model);
      } catch (error) {
        console.error("Face Detection 모델 로드 중 오류 발생:", error);
        setError("모델 로드 중 오류가 발생했습니다.");
      }
    };

    loadModel();
  }, []);

  return { model, error };
};
