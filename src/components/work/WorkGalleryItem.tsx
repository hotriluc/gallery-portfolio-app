import * as THREE from 'three';
import { damp } from '../../utils/utils';

import { useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';
import { Image, useScroll } from '@react-three/drei';

import { IGalleryItem } from '../../interfaces/Gallery.interface';

const WorkGalleryItem = ({
  index,
  position,
  scale,
  url,
  c = new THREE.Color(),
  ...props
}: IGalleryItem) => {
  const scroll = useScroll();

  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);

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

export default WorkGalleryItem;