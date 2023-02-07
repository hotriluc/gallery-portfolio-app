import { useThree } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';

import { state } from '../../utils/utils';
import { useSnapshot } from 'valtio';

import { IGallery } from '../../interfaces/Gallery.interface';

import GalleryItem from './GalleryItem';

const Gallery = ({ w = 1.5, gap = 0.3 }: IGallery) => {
  const { projects } = useSnapshot(state);
  const { width } = useThree((state) => state.viewport);
  const itemSize = w + gap;

  return (
    <ScrollControls
      horizontal
      damping={0.5}
      pages={(width - itemSize + projects.length * itemSize) / width}
      style={{ overflow: 'hidden hidden' }}
    >
      <Scroll>
        {projects.map((project, index) => (
          <GalleryItem
            key={index}
            index={index}
            position={[index * itemSize, 0, 0]}
            scale={[w, 4]}
            //@ts-ignore
            url={'/image1.jpg'}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
};

export default Gallery;
