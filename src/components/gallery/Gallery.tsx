import { Scroll, ScrollControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import GalleryItem from './GalleryItem';
import { state } from '../../utils/utils';
import { useSnapshot } from 'valtio';

const Gallery = ({
  itemWidth = 1.5,
  gap = 0.3,
}: {
  itemWidth?: number;
  gap?: number;
}) => {
  const { urls } = useSnapshot(state);
  console.log(urls);

  const itemSize = itemWidth + gap;
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
            scale={[itemWidth, 4, 1]}
            //@ts-ignore
            url={'/image1.jpg'}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
};

export default Gallery;
