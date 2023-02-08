import { Canvas } from '@react-three/fiber';
import About from './components/about/About';

import Gallery from './components/gallery/Gallery';
import Wrapper from './components/layout/Wrapper';

import { useLocation, Switch, Route, Link, useRoute } from 'wouter';
import WorkScene from './components/work/WorkScene';
import { BackButton, Navigation } from './styles/Global.styles';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';

function App() {
  const [location] = useLocation();
  const [match, params] = useRoute('/works/:id');

  return (
    <>
      <Wrapper>
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
          <Switch location={location}>
            <Route path="/">
              <Suspense fallback={null}>
                <Gallery />
              </Suspense>
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/works/:id">
              <Suspense fallback={null}>
                <WorkScene />
              </Suspense>
            </Route>
          </Switch>
        </Canvas>
        <Loader
          containerStyles={{
            justifyContent: 'center',
            backgroundColor: '#101010',
          }}
          innerStyles={{ width: '85vw', height: 7 }}
          barStyles={{ width: '85vw', height: 10, transformOrigin: 'center' }}
          dataStyles={{ fontSize: '2.5rem', fontWeight: 300 }}
        />
        <>
          {!match ? (
            <Navigation>
              <Link to="/">Works</Link>
              <Link to="about">About</Link>
            </Navigation>
          ) : (
            <BackButton>
              <Link to="/">back</Link>
            </BackButton>
          )}
        </>
      </Wrapper>
    </>
  );
}

export default App;
