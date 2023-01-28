import Wrapper from './components/layout/Wrapper';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis();

  return (
    <Wrapper>
      <div>something</div>
    </Wrapper>
  );
}

export default App;
