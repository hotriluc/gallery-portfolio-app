import * as THREE from 'three';

import { useEffect, useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';
import { Image, Text, useScroll } from '@react-three/drei';

import { useSnapshot } from 'valtio';
import { damp, state } from '../../utils/utils';

const WorkThumbnail = ({
  pagesSize,
  projectId,
}: {
  pagesSize: number;
  projectId: number;
}) => {
  const scroll = useScroll();

  const ref = useRef<any>(null);
  const ref2 = useRef<any>(null);

  const [isNext, setIsNext] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { projects } = useSnapshot(state);
  const project = projects[projectId];
  const nextProjectIsExisted = projectId < projects.length - 1;

  useEffect(() => {
    if (ref.current) {
      ref.current.material.side = THREE.DoubleSide;
    }
    if (nextProjectIsExisted && ref2.current) {
      ref2.current.material.side = THREE.DoubleSide;
    }
  });

  useFrame((state, delta) => {
    //@ts-ignore
    const y = scroll.scroll.current;

    if (ref.current) {
      setIsNext(nextProjectIsExisted && y > 0.8);

      ref.current.position.x = damp(
        ref.current.position.x,
        3 + y * pagesSize * 10,
        3,
        delta
      );
      ref.current.rotation.y = damp(
        ref.current.rotation.y,
        2.5 + y * 2 * Math.PI,
        3,
        delta
      );

      ref.current.material.scale[1] = ref.current.scale.y = damp(
        ref.current.scale.y,
        9 - 3.5 * y,
        6,
        delta
      );
      ref.current.material.scale[0] = ref.current.scale.x = damp(
        ref.current.scale.x,
        5 - 3 * y,
        6,
        delta
      );
    }

    if (ref2.current) {
      //Positioning
      ref2.current.position.x = ref.current.position.x;
      ref2.current.rotation.y = !isNext
        ? ref.current.rotation.y
        : damp(
            ref2.current.rotation.y,
            ref.current.rotation.y + Math.PI,
            3,
            delta
          );

      // Scaling
      ref2.current.material.scale[1] = ref2.current.scale.y = damp(
        ref2.current.scale.y,
        hovered ? 7 : ref.current.material.scale[1],
        6,
        delta
      );
      ref2.current.material.scale[0] = ref2.current.scale.x =
        ref.current.material.scale[0];

      //Highlight
      ref2.current.material.grayscale = damp(
        ref2.current.material.grayscale,
        hovered ? 0 : 1,
        6,
        delta
      );
    }
  });

  return (
    <>
      <Image
        visible={!isNext}
        ref={ref}
        rotation={[0, -2.5, 0]}
        position={[0, 0, -2]}
        scale={[5, 9]}
        url={project.imgUrl}
      />
      {nextProjectIsExisted && (
        <Image
          visible={isNext}
          ref={ref2}
          rotation={[0, -2.5, 0]}
          position={[0, 0, -2]}
          scale={[5, 9]}
          url={projects[projectId + 1].imgUrl}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <Text position={[0, 0, 0.5]} fontSize={0.5}>
            Next
          </Text>
        </Image>
      )}
    </>
  );
};

export default WorkThumbnail;
