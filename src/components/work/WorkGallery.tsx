import { useSnapshot } from 'valtio';
import { state } from '../../utils/utils';

import { IGallery } from '../../interfaces/Gallery.interface';

import WorkGalleryItem from './WorkGalleryItem';

type Props = { projectId: number } & IGallery;

const WorkGallery = ({ projectId, w = 3, gap = 0.8 }: Props) => {
  const { projects } = useSnapshot(state);
  const project = projects[projectId];

  const itemTotalWidth = w + gap;

  return (
    <group position={[10, 0, 0]}>
      {project.images?.map((img, index) => (
        <WorkGalleryItem
          key={index}
          index={index}
          position={[
            index * itemTotalWidth,
            img.position.y || 0,
            img.position.z || 0,
          ]}
          scale={[w, 4.5]}
          url={img.url}
        />
      ))}
    </group>
  );
};

export default WorkGallery;
