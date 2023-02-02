import { ScrollControls, Scroll, useScroll, Image } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { damp, lerp } from 'three/src/math/MathUtils';
import { Container, Flex } from '../../styles/Global.styles';

import { state } from '../../utils/utils';
import { useSnapshot } from 'valtio';
import { useRoute } from 'wouter';
import { WorkDescription, WorkHeading } from '../../styles/Work.styles';
import { Mesh } from 'three';

interface WorkSceneProps {
  projectId: number;
  galleryGap?: number;
  galleryItemWidth?: number;
}

const WorkScene = ({
  projectId,
  galleryGap = 0.4,
  galleryItemWidth = 3,
}: WorkSceneProps) => {
  const ref = useRef<Mesh>(null);
  const scroll = useScroll();
  const { width } = useThree((state) => state.viewport);
  const { projects } = useSnapshot(state);
  const project = projects[projectId];

  const itemTotalWidth = galleryGap + galleryItemWidth;

  const pagesSize = project.images
    ? 1 + (width - 0.4 + 3 + project.images?.length * (0.4 + 3)) / width
    : 1;

  useFrame((state, delta) => {
    //@ts-ignore
    const y = scroll.scroll.current;

    if (ref.current) {
      ref.current.position.x = damp(
        ref.current.position.x,
        3 + y * pagesSize * 10,
        3,
        delta
      );
      ref.current.rotation.y = damp(
        ref.current.rotation.y,
        2.5 + y * 2 * Math.PI,
        5,
        delta
      );

      ref.current.scale.x = damp(ref.current.scale.x, 1.0 - 0.5 * y, 5, delta);
    }
  });

  return (
    <>
      <mesh
        ref={ref}
        rotation={[0, -2.5, 0]}
        position={[0, 0, -2]}
        scale={[0, 1.0, 1.0]}
      >
        <meshNormalMaterial />
        <boxGeometry args={[3, 6, 0.3]} />
      </mesh>

      <group position={[width, 0, 0]}>
        {project.images?.map((url, index) => (
          <Image
            key={index}
            url={url}
            position={[index * itemTotalWidth, 0, 0]}
            scale={[galleryItemWidth, 4.5]}
          />
        ))}
      </group>
    </>
  );
};

const Work = () => {
  const { projects } = useSnapshot(state);

  const [match, params] = useRoute('/:id');
  //@ts-ignore
  const { id: projectId } = params;
  const project = projects[projectId];

  const { width } = useThree((state) => state.viewport);

  const pagesSize = project.images
    ? 1 + (width - 0.4 + 3 + project.images?.length * (0.4 + 3)) / width
    : 1;

  return (
    <ScrollControls
      damping={0.5}
      pages={pagesSize}
      horizontal
      style={{ overflow: 'hidden hidden' }}
    >
      <Scroll>
        <WorkScene projectId={projectId} />
      </Scroll>
      <Scroll html>
        <Container fluid>
          <Flex gap={5} style={{ padding: '4rem' }}>
            {/* Info section */}
            <Flex column style={{ width: '100vw', height: '100vh' }}>
              <WorkHeading>{project.title || 'Untitled'}</WorkHeading>
              <WorkDescription>
                {project.description || 'No description.'}
              </WorkDescription>
            </Flex>
            {/* Gallery section */}
            <Flex>
              <div>gallery</div>
            </Flex>
          </Flex>
        </Container>
      </Scroll>
    </ScrollControls>
  );
};

export default Work;