import Gallery from './components/gallery/Gallery';
import Wrapper from './components/layout/Wrapper';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis();

  return (
    <Wrapper>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          color: 'red',
          zIndex: 40,
        }}
      >
        CENTER
      </div>
      <Gallery />
    </Wrapper>
  );
}

export default App;
