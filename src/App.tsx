import { Canvas } from '@react-three/fiber';
import About from './components/about/About';

import Gallery from './components/gallery/Gallery';
import Wrapper from './components/layout/Wrapper';
import Work from './components/work/Work';

import { useLocation, Switch, Route, Link } from 'wouter';

function App() {
  const [location] = useLocation();

  return (
    <Wrapper>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Switch location={location}>
          <Route path="/">
            <Gallery />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/:id">
            <Work />
          </Route>
        </Switch>
      </Canvas>
      <nav style={{ position: 'fixed', top: 0, left: '50%' }}>
        <Link to="/">Works</Link>
        <Link to="about">About</Link>
      </nav>
    </Wrapper>
  );
}

export default App;
