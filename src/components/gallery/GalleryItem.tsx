import * as THREE from 'three';

import { Image, useScroll } from '@react-three/drei';
import { useFrame, Vector3 } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { useSnapshot } from 'valtio';
import { state, damp } from '../../utils/utils';

const GalleryItem = ({
  index,
  position,
  scale,
  ...props
}: {
  index: number;
  position: Vector3;
  scale: Vector3;
  totalItems: number;
}) => {
  const ref = useRef<any>(null);
  const scroll = useScroll();

  const { clicked, urls } = useSnapshot(state);

  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );

    if (ref.current) {
      ref.current.material.scale[1] = ref.current.scale.y = damp(
        ref.current.scale.y,
        4 + y,
        8,
        delta
      );
    }
  });

  //@ts-ignore
  return <Image ref={ref} position={position} scale={scale} {...props} />;
};

export default GalleryItem;
