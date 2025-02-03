import { useRef, useEffect } from 'react';

export const useWebcam = (onVideoReady) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          if (typeof onVideoReady === 'function') {
            onVideoReady(videoRef.current);
          }
        };
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startWebcam();
  }, [onVideoReady]);

  return videoRef;
};
