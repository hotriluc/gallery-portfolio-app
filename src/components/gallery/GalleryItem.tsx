import * as THREE from 'three';
import { state, damp } from '../../utils/utils';

import { useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';
import { Image, useScroll } from '@react-three/drei';

import { useSnapshot } from 'valtio';
import { useLocation } from 'wouter';

import { IGalleryItem } from '../../interfaces/Gallery.interface';

const GalleryItem = ({
  index,
  position,
  scale,
  c = new THREE.Color(),
  ...props
}: IGalleryItem) => {
  const ref = useRef<any>(null);
  const scroll = useScroll();
  const [location, navigate] = useLocation();

  const { clicked, projects } = useSnapshot(state);
  const [hovered, setHovered] = useState(false);

  const onPointerDown = () => {
    state.clicked = index === clicked ? null : index;
  };

  const onPointerUp = () => {
    navigate('/' + index);
  };

  const onPointerLeave = () => {
    state.clicked = null;
  };

  useFrame((state, delta) => {
    const y = scroll.curve(
      index / projects.length - 1.5 / projects.length,
      4 / projects.length
    );

    if (ref.current) {
      // On click animation
      ref.current.material.scale[1] = ref.current.scale.y = damp(
        ref.current.scale.y,
        clicked === index ? 5 : 4 + y,
        8,
        delta
      );
      ref.current.material.scale[0] = ref.current.scale.x = damp(
        ref.current.scale.x,
        clicked === index ? 4.7 : scale[0],
        6,
        delta
      );

      // Move neighbors position depends on clicked item
      if (clicked !== null && index < clicked)
        ref.current.position.x = damp(
          ref.current.position.x,
          position[0] - 2,
          6,
          delta
        );
      if (clicked !== null && index > clicked)
        ref.current.position.x = damp(
          ref.current.position.x,
          position[0] + 2,
          6,
          delta
        );
      if (clicked === null || clicked === index)
        ref.current.position.x = damp(
          ref.current.position.x,
          position[0],
          6,
          delta
        );

      // Highlighting animation
      ref.current.material.grayscale = damp(
        ref.current.material.grayscale,
        hovered || clicked === index ? 0 : Math.max(0, 1 - y),
        6,
        delta
      );
      ref.current.material.color.lerp(
        c.set(hovered || clicked === index ? 'white' : '#aaa'),
        hovered ? 0.3 : 0.1
      );
    }
  });

  return (
    //@ts-ignore
    <Image
      ref={ref}
      position={position}
      scale={[scale[0], scale[1]]}
      {...props}
      onPointerDown={onPointerDown}
      onPointerLeave={onPointerLeave}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerUp={onPointerUp}
    />
  );
};

export default GalleryItem;
