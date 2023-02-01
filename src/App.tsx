import { Canvas } from '@react-three/fiber';
import Gallery from './components/gallery/Gallery';
import Wrapper from './components/layout/Wrapper';

function App() {
  return (
    <Wrapper>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Gallery />
      </Canvas>
    </Wrapper>
  );
}

export default App;
