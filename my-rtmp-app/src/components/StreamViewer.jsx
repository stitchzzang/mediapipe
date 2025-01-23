import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const StreamComponent = () => {
  const videoRef = useRef(null);
  const streamUrl = 'https://your-domain.com/streams/stream.m3u8';

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} controls />
    </div>
  );
};

export default StreamComponent;
