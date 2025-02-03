import { Scene } from './components/Scene';

function App() {
  return (
    <div className="App" style={{ 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000'
    }}>
      <Scene />
    </div>
  );
}

export default App;
