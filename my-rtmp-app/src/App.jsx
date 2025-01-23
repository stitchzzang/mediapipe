import React, { useState } from 'react';
import WebStreamCapture from './components/WebStreamCapture';
import StreamViewer from './components/StreamViewer';

function App() {
  const [mode, setMode] = useState(null);

  return (
    <div className="App">
      <h1>Web Streaming</h1>
      
      {!mode && (
        <div className="mode-selection">
          <button onClick={() => setMode('broadcast')}>Start Broadcasting</button>
          <button onClick={() => setMode('view')}>Watch Stream</button>
        </div>
      )}

      {mode === 'broadcast' && <WebStreamCapture />}
      {mode === 'view' && <StreamViewer />}
    </div>
  );
}

export default App;
