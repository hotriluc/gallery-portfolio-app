import * as THREE from 'three';

import { useEffect, useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';
import { Image, Text, useScroll } from '@react-three/drei';

import { useSnapshot } from 'valtio';
import { damp, state } from '../../utils/utils';
import { useLocation } from 'wouter';
import { Color } from 'three';

interface WorkThumbnailProps {
  pagesSize: number;
  projectId: number;
}

const WorkThumbnail = ({
  pagesSize,
  projectId,
  c = new THREE.Color(),
}: WorkThumbnailProps & { c?: Color }) => {
  const scroll = useScroll();
  const [location, navigate] = useLocation();

  const ref = useRef<any>(null);
  const ref2 = useRef<any>(null);

  const [isNext, setIsNext] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { projects } = useSnapshot(state);
  const project = projects[projectId];
  const nextProjectIsExisted = projectId < projects.length - 1;

  // Redirect to next project
  const redirectToNextProject = () => {
    setClicked(false);
    setTimeout(() => {
      // only if y > 0.8
      if (isNext) {
        navigate(`/works/${projectId + 1}`);
      }
    }, 300);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.material.side = THREE.DoubleSide;
    }
    if (nextProjectIsExisted && ref2.current) {
      ref2.current.material.side = THREE.DoubleSide;
    }
  }, []);

  // Reset position and rotation
  useEffect(() => {
    ref.current.position.x = 0;
    ref.current.rotation.y = 0;

    return () => {
      //@ts-ignore
      scroll.scroll.current = 0.001;
      scroll.el.scrollLeft = 0;
      scroll.offset = 0;
    };
  }, [projectId]);

  useFrame((state, delta) => {
    const y = scroll.offset;

    if (ref.current) {
      setIsNext(nextProjectIsExisted && y > 0.9);

      ref.current.position.x = damp(
        ref.current.position.x,
        3 +
          y *
            (project.images
              ? pagesSize - 1 + (project.images.length - 1) / pagesSize
              : 0.5) *
            8.5,
        3,
        delta
      );
      ref.current.rotation.y = damp(
        ref.current.rotation.y,
        y * Math.PI,
        3,
        delta
      );

      ref.current.material.scale[1] = ref.current.scale.y = damp(
        ref.current.scale.y,
        9 - 3.5 * y,
        3,
        delta
      );
      ref.current.material.scale[0] = ref.current.scale.x = damp(
        ref.current.scale.x,
        4.5 - 2.5 * y,
        3,
        delta
      );
    }

    if (ref2.current) {
      //Positioning
      // ref2.current.position.x = ref.current.position.x;
      const { x, z } = ref.current.position;
      ref2.current.position.x = damp(ref2.current.position.x, x, 3, delta);

      ref2.current.position.z = damp(
        ref2.current.position.z,
        clicked ? z - 0.3 : z,
        3,
        delta
      );

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

      ref2.current.material.color.lerp(
        c.set(hovered ? 'white' : '#aaa'),
        hovered ? 0.3 : 0.1
      );
    }
  });

  return (
    <>
      <Image
        visible={!isNext}
        ref={ref}
        rotation={[0, 0, 0]}
        position={[0, 0, -2]}
        scale={[2, 5.5]}
        url={project.imgUrl}
      />
      {nextProjectIsExisted && (
        <Image
          visible={isNext}
          ref={ref2}
          rotation={[0, 0, 0]}
          position={[0, 0, -2]}
          scale={[5, 9]}
          url={projects[projectId + 1].imgUrl}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onPointerDown={() => setClicked(true)}
          onPointerUp={redirectToNextProject}
        >
          <Text position={[0, 0, 0.2]} fontSize={0.5}>
            Next
          </Text>
        </Image>
      )}
    </>
  );
};

export default WorkThumbnail;
