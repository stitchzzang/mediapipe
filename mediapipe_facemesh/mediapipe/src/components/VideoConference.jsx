// src/components/VideoConference.jsx
import React, { useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';

const VideoConference = () => {
  const videoContainerRef = useRef(null);

  useEffect(() => {
    // OpenVidu 객체 생성
    const OV = new OpenVidu();
    const session = OV.initSession();

    // session 이벤트 핸들러 설정 (예: streamCreated, streamDestroyed 등)
    session.on('streamCreated', (event) => {
      // 생성된 stream을 videoContainer에 추가
      const subscriber = session.subscribe(event.stream, videoContainerRef.current);
    });

    // 예시: 세션 연결 (실제 토큰과 서버 URL 필요)
    const joinSession = async () => {
      try {
        const token = 'YOUR_TOKEN_HERE'; // 백엔드에서 발급받은 토큰
        await session.connect(token, { clientData: 'User' });
        // 본인 스트림 발행
        const publisher = OV.initPublisher(undefined, {
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
        });
        session.publish(publisher);
      } catch (error) {
        console.error('OpenVidu session 연결 에러:', error);
      }
    };

    joinSession();

    return () => {
      // 컴포넌트 언마운트 시 session 정리
      session.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>화상회의</h2>
      <div ref={videoContainerRef} id="video-container" style={{ width: '640px', height: '480px', background: '#000' }}>
        {/* OpenVidu에서 생성한 비디오 스트림이 삽입됩니다. */}
      </div>
    </div>
  );
};

export default VideoConference;
