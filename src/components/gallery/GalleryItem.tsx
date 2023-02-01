import { Image } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';

const GalleryItem = ({
  index,
  position,
  scale,
  ...props
}: {
  index?: number;
  position: Vector3;
  scale: Vector3;
}) => {
  //@ts-ignore
  return <Image position={position} scale={scale} {...props} />;
};

export default GalleryItem;
