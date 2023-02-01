import { Scroll, ScrollControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import GalleryItem from './GalleryItem';

const urls: Array<number> = [1, 2, 3, 4, 5, 6];

const Gallery = ({ w = 4, gap = 0.7 }: { w?: number; gap?: number }) => {
  const itemSize = w + gap;
  const { width } = useThree((state) => state.viewport);

  return (
    <ScrollControls
      horizontal
      damping={1}
      pages={(width - itemSize + urls.length * itemSize) / width}
      style={{ overflow: 'hidden hidden' }}
    >
      <Scroll>
        {urls.map((url, index) => (
          <GalleryItem
            key={index}
            index={index}
            position={[index * itemSize, 0, 0]}
            scale={[w, 4, 1]}
            //@ts-ignore
            url={'/image1.jpg'}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
};

export default Gallery;
