import { ScrollControls, Scroll } from '@react-three/drei';
import {
  ContactList,
  ExperienceList,
  OrganizationName,
  Position,
  PositionDuration,
  PositionName,
  SectionDescription,
  SectionHeading,
} from '../../styles/About.styles';
import { Container, Flex } from '../../styles/Global.styles';

const About = () => {
  return (
    <ScrollControls pages={2.5}>
      <Scroll>
        <mesh position={[-4, 0, 0]}>
          <meshBasicMaterial />
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </Scroll>
      <Scroll html>
        <Container fluid>
          <Flex
            gap={5}
            column
            style={{ padding: '10rem 4rem', width: '50%', marginLeft: 'auto' }}
          >
            <section>
              <SectionHeading>About me</SectionHeading>
              <SectionDescription>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
                perferendis corporis atque et, quia temporibus tenetur aliquam
                debitis dolores accusantium distinctio rerum architecto
                blanditiis doloribus, saepe earum ipsum id in!
              </SectionDescription>
            </section>
            <section>
              <SectionHeading>Work Experience</SectionHeading>
              <ExperienceList>
                <Position>
                  <PositionName>Position_1</PositionName>
                  <OrganizationName>Company_1</OrganizationName>
                  <PositionDuration>2021 - current</PositionDuration>
                </Position>

                <Position>
                  <PositionName>Position_N</PositionName>
                  <OrganizationName>Company_M</OrganizationName>
                  <PositionDuration>2020 - 20XX</PositionDuration>
                </Position>
                <Position>
                  <PositionName>Position_N</PositionName>
                  <OrganizationName>Company_M</OrganizationName>
                  <PositionDuration>2020 - 20XX</PositionDuration>
                </Position>
                <Position>
                  <PositionName>Position_N</PositionName>
                  <OrganizationName>Company_M</OrganizationName>
                  <PositionDuration>2020 - 20XX</PositionDuration>
                </Position>
              </ExperienceList>
            </section>
            <section>
              <SectionHeading>Get in Touch</SectionHeading>
              <ContactList>
                <li>
                  <a href="#">Email</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
              </ContactList>
            </section>
          </Flex>
        </Container>
      </Scroll>
    </ScrollControls>
  );
};

export default About;
