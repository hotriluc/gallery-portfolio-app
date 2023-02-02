import { ScrollControls, Scroll, useScroll, Image } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { damp } from 'three/src/math/MathUtils';
import { Container, Flex } from '../../styles/Global.styles';

import { state } from '../../utils/utils';
import { useSnapshot } from 'valtio';
import { useRoute } from 'wouter';
import { WorkDescription, WorkHeading } from '../../styles/Work.styles';
import { Color, Mesh, Vector2Tuple, Vector3Tuple } from 'three';

import * as THREE from 'three';

const WorkThumbnail = ({ pagesSize }: { pagesSize: number }) => {
  const ref = useRef<Mesh>(null);
  const scroll = useScroll();

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
    <mesh
      ref={ref}
      rotation={[0, -2.5, 0]}
      position={[0, 0, -2]}
      scale={[0, 1.0, 1.0]}
    >
      <meshNormalMaterial />
      <boxGeometry args={[3, 6, 0.3]} />
    </mesh>
  );
};

const WorkGallery = ({
  projectId,
  w,
  gap,
}: {
  projectId: number;
  w: number;
  gap: number;
}) => {
  const { width } = useThree((state) => state.viewport);
  const itemTotalWidth = w + gap;

  const { projects } = useSnapshot(state);
  const project = projects[projectId];

  return (
    <group position={[10, 0, 0]}>
      {project.images?.map((img, index) => (
        <WorkGalleryItem
          key={index}
          index={index}
          position={[
            index * itemTotalWidth,
            img.position.y || 0,
            img.position.z || 0,
          ]}
          scale={[w, 4.5]}
          url={img.url}
        />
      ))}
    </group>
  );
};

const WorkGalleryItem = ({
  index,
  position,
  scale,
  url,
  c = new THREE.Color(),
  ...props
}: {
  index: number;
  position: Vector3Tuple;
  scale: Vector2Tuple;
  url: string;
  c?: Color;
}) => {
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);
  const scroll = useScroll();

  useFrame((state, delta) => {
    const y = scroll.curve(index / 5 - 1.5 / 5, 4 / 5);
    if (ref.current) {
      // On click animation
      ref.current.material.scale[1] = ref.current.scale.y = damp(
        ref.current.scale.y,
        hovered ? 7 : scale[1] + y,
        8,
        delta
      );
      //   ref.current.rotation.y = damp(
      //     ref.current.rotation.y,
      //     -Math.PI * 2.3 + y,
      //     8,
      //     delta
      //   );
      ref.current.material.scale[0] = ref.current.scale.x = damp(
        ref.current.scale.x,
        hovered ? 4.7 : scale[0],
        6,
        delta
      );

      ref.current.material.grayscale = damp(
        ref.current.material.grayscale,
        hovered ? 0 : Math.max(0, 1 - y),
        6,
        delta
      );

      ref.current.material.color.lerp(
        c.set(hovered ? 'white' : '#aaa'),
        hovered ? 0.3 : 0.1
      );
    }
  });
  return (
    //@ts-ignore
    <Image
      transparent={hovered ? false : true}
      opacity={0.9}
      ref={ref}
      key={index}
      position={position}
      scale={scale}
      url={url}
      {...props}
      onPointerMove={() => {
        setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
      }}
    />
  );
};

const Work = ({
  galleryGap = 0.8,
  galleryItemWidth = 3,
}: {
  galleryGap?: number;
  galleryItemWidth?: number;
}) => {
  const [match, params] = useRoute('/:id');
  //@ts-ignore
  const { id: projectId } = params;

  const { projects } = useSnapshot(state);
  const project = projects[projectId];

  const { width } = useThree((state) => state.viewport);
  const itemTotalWidth = galleryGap + galleryItemWidth;

  const pagesSize = project.images
    ? 1 +
      (width - itemTotalWidth + project.images?.length * itemTotalWidth) / width
    : 1;

  useEffect(() => {
    state.clicked = null;
  }, []);

  return (
    <ScrollControls
      damping={0.5}
      pages={pagesSize}
      horizontal
      style={{ overflow: 'hidden hidden' }}
    >
      <Scroll>
        <WorkThumbnail pagesSize={pagesSize} />
        <WorkGallery
          projectId={projectId}
          w={galleryItemWidth}
          gap={galleryGap}
        />
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
