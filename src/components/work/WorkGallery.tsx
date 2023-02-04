import { useSnapshot } from 'valtio';
import { state } from '../../utils/utils';
import WorkGalleryItem from './WorkGalleryItem';

const WorkGallery = ({
  projectId,
  w,
  gap,
}: {
  projectId: number;
  w: number;
  gap: number;
}) => {
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
