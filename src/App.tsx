import { Canvas } from '@react-three/fiber';
import About from './components/about/About';

import Gallery from './components/gallery/Gallery';
import Wrapper from './components/layout/Wrapper';

import { useLocation, Switch, Route, Link, useRoute } from 'wouter';
import WorkScene from './components/work/WorkScene';
import { Navigation } from './styles/Global.styles';

function App() {
  const [location] = useLocation();
  const [match, params] = useRoute('/');

  console.log(match);

  return (
    <>
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
              <WorkScene />
            </Route>
          </Switch>
        </Canvas>
        <>
          {match && (
            <Navigation>
              <Link to="/">Works</Link>
              <Link to="about">About</Link>
            </Navigation>
          )}
        </>
      </Wrapper>
    </>
  );
}

export default App;
