import React from 'react';
import ReactPlayer from 'react-player';

const StreamPlayer = () => {
  const streamUrl = 'rtmp://localhost/live/stream';

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={streamUrl}
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default StreamPlayer;
