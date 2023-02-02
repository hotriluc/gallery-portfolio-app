import { ScrollControls, Scroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { damp } from 'three/src/math/MathUtils';
import { Container, Flex } from '../../styles/Global.styles';

const Work = () => {
  const ref = useRef<any>();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.x = damp(ref.current.position.x, 4, 1.5, delta);
    }
  });

  return (
    <ScrollControls pages={2} horizontal style={{ overflow: 'hidden hidden' }}>
      <Scroll>
        <mesh ref={ref}>
          <meshBasicMaterial />
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </Scroll>
      <Scroll html>
        <Container fluid>
          <Flex gap={5} style={{ padding: '4rem' }}>
            <Flex column style={{ width: '200vw', height: '100vh' }}>
              <h1>Title</h1>
              <p
                style={{
                  fontSize: '2.5rem',
                  lineHeight: '1.1em',
                  width: '50%',
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                fugiat vitae explicabo autem illo molestiae assumenda maiores
                neque, eveniet, nostrum modi, officiis provident corporis labore
                necessitatibus facilis eum incidunt. Quia?
              </p>
            </Flex>
            <Flex style={{}}>
              <h1>Title</h1>
              <p style={{ fontSize: '2.5rem', lineHeight: '1.1em' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                fugiat vitae explicabo autem illo molestiae assumenda maiores
                neque, eveniet, nostrum modi, officiis provident corporis labore
                necessitatibus facilis eum incidunt. Quia?
              </p>
            </Flex>
          </Flex>
        </Container>
      </Scroll>
    </ScrollControls>
  );
};

export default Work;
