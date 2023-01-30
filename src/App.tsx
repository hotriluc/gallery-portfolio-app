import Gallery from './components/gallery/Gallery';
import Wrapper from './components/layout/Wrapper';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis();

  return (
    <Wrapper>
      <Gallery />
    </Wrapper>
  );
}

export default App;
