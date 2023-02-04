import { useEffect } from 'react';

import { Container, Flex } from '../../styles/Global.styles';
import { WorkDescription, WorkHeading } from '../../styles/Work.styles';

import { useThree } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

import { useSnapshot } from 'valtio';
import { state } from '../../utils/utils';

import { useRoute } from 'wouter';

import WorkThumbnail from './WorkThumbnail';
import WorkGallery from './WorkGallery';

const Work = ({
  galleryGap = 0.8,
  galleryItemWidth = 3,
}: {
  galleryGap?: number;
  galleryItemWidth?: number;
}) => {
  const [match, params] = useRoute('/:id');
  //@ts-ignore
  const { id: projectId } = params;

  const { projects } = useSnapshot(state);
  const project = projects[projectId];

  const { width } = useThree((state) => state.viewport);

  const itemTotalWidth = galleryGap + galleryItemWidth;
  const pagesSize = project.images
    ? 1 +
      (width - itemTotalWidth + project.images?.length * itemTotalWidth) / width
    : 1;

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
        <WorkThumbnail projectId={parseInt(projectId)} pagesSize={pagesSize} />
        <WorkGallery
          projectId={parseInt(projectId)}
          w={galleryItemWidth}
          gap={galleryGap}
        />
      </Scroll>
      <Scroll html>
        <Container fluid>
          <Flex gap={5} style={{ padding: '4rem' }}>
            {/* Info section */}
            <Flex column style={{ width: '100vw', height: '100vh' }}>
              <WorkHeading>{project.title || 'Untitled'}</WorkHeading>
              <WorkDescription>
                {project.description || 'No description.'}
              </WorkDescription>
            </Flex>
            {/* Gallery section */}
            <Flex>
              <div>gallery</div>
            </Flex>
          </Flex>
        </Container>
      </Scroll>
    </ScrollControls>
  );
};

export default Work;
