import { useEffect, useRef } from 'react';

import { Container, Flex } from '../../styles/Global.styles';
import { WorkDescription, WorkHeading } from '../../styles/Work.styles';

import { useThree } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

import { useSnapshot } from 'valtio';
import { state } from '../../utils/utils';

import { useRoute } from 'wouter';

import { IGallery } from '../../interfaces/Gallery.interface';

import WorkThumbnail from './WorkThumbnail';
import WorkGallery from './WorkGallery';

const WorkScene = ({
  gap: galleryGap = 0.8,
  w: galleryItemWidth = 3,
}: IGallery) => {
  const [match, params] = useRoute('/:id');
  //@ts-ignore
  const { id: projectId } = params;

  const { projects } = useSnapshot(state);
  const project = projects[projectId];

  const { width } = useThree((state) => state.viewport);

  const itemTotalWidth = galleryGap + galleryItemWidth;
  const pagesSize =
    project && project.images
      ? 1 +
        (width - itemTotalWidth + project.images?.length * itemTotalWidth) /
          width
      : 1.1;

  console.log(pagesSize);

  useEffect(() => {
    state.clicked = null;
  }, []);

  return (
    <ScrollControls
      damping={0.5}
      pages={pagesSize}
      horizontal
      style={{ overflow: 'hidden hidden' }}
    >
      <Scroll>
        {project && (
          <>
            <WorkThumbnail
              projectId={parseInt(projectId)}
              pagesSize={pagesSize}
            />
            <WorkGallery
              projectId={parseInt(projectId)}
              w={galleryItemWidth}
              gap={galleryGap}
            />
          </>
        )}
      </Scroll>
      <Scroll html>
        <Container fluid>
          <Flex gap={5} style={{ padding: '4rem' }}>
            {/* Info section */}
            <Flex column style={{ width: '100vw', height: '100vh' }}>
              {project && (
                <>
                  <WorkHeading>{project.title || 'Untitled'}</WorkHeading>
                  <WorkDescription>
                    {project.description || 'No description.'}
                  </WorkDescription>
                </>
              )}
            </Flex>
          </Flex>
        </Container>
      </Scroll>
    </ScrollControls>
  );
};

export default WorkScene;
