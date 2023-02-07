import { ScrollControls, Scroll } from '@react-three/drei';

const About = () => {
  return (
    <ScrollControls pages={2}>
      <Scroll>
        <mesh>
          <meshBasicMaterial color={'red'} />
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </Scroll>
    </ScrollControls>
  );
};

export default About;
