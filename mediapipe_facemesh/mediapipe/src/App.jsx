// src/App.jsx
import React from 'react';
import FaceMask from './components/FaceMask';
// import VideoConference from './components/VideoConference';

const App = () => {
  return (
    <div>
      <h1>가면 화상회의 데모</h1>
      {/* 화상회의 영역 */}
      {/* <VideoConference /> */}

      {/* 얼굴 마스크 오버레이 영역 */}
      <FaceMask />
    </div>
  );
};

export default App;
