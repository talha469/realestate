import './App.css';
import Header from './components/header/Header';
import Video from './components/video/Video';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="app__videos">
        <Video/>
        <Video/>
        <Video/>
      </div>
    </div>
  );
}

export default App;
