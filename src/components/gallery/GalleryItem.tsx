import * as THREE from 'three';

import { Image, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3Tuple } from 'three';
import { useSnapshot } from 'valtio';
import { state, damp } from '../../utils/utils';

const GalleryItem = ({
  index,
  position,
  scale,
  ...props
}: {
  index: number;
  position: Vector3Tuple;
  scale: Vector3Tuple;
  totalItems: number;
}) => {
  const ref = useRef<any>(null);
  const scroll = useScroll();

  const { clicked, projects } = useSnapshot(state);
  const [hover, setHover] = useState(false);

  const click = () => (state.clicked = index === clicked ? null : index);

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

      ref.current.material.grayscale = damp(
        ref.current.material.grayscale,
        hover || clicked === index ? 0 : Math.max(0, 1 - y),
        6,
        delta
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
      onClick={click}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    />
  );
};

export default GalleryItem;
