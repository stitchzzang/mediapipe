import React, { useRef, useState } from 'react';

const WebStreamCapture = () => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamUrl, setStreamUrl] = useState('');

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      videoRef.current.srcObject = stream;
      setIsStreaming(true);
      
      // 고유한 스트림 URL 생성
      const uniqueId = Date.now().toString();
      setStreamUrl(`${window.location.origin}/stream/${uniqueId}`);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="stream-container">
      <video ref={videoRef} autoPlay muted playsInline />
      <div className="controls">
        <button onClick={isStreaming ? stopStream : startStream}>
          {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
        </button>
        {streamUrl && (
          <div className="stream-info">
            <p>Share this link:</p>
            <code>{streamUrl}</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebStreamCapture;

const peer = new Peer({
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' }
    ]
  }
});
