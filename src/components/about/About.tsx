import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { AmbientLight, Mesh } from 'three';
import { damp } from 'three/src/math/MathUtils';
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

const AboutScene = () => {
  const scroll = useScroll();
  const ref = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();

  useFrame((state, delta) => {
    const y = scroll.offset;

    if (ref.current) {
      ref.current.position.y = damp(
        ref.current.position.y,
        0 - 12 * y,
        6,
        delta
      );

      ref.current.rotation.y = damp(
        ref.current.rotation.y,
        Math.PI + Math.PI * y,
        2,
        delta
      );

      ref2.current.position.y = damp(
        ref2.current.position.y,
        2 - 14 * y,
        5.5,
        delta
      );

      ref2.current.rotation.y = damp(
        ref2.current.rotation.y,
        -Math.PI - Math.PI * y,
        1.9,
        delta
      );

      ref3.current.position.y = damp(
        ref3.current.position.y,
        -1 - 9 * y,
        5,
        delta
      );

      ref3.current.rotation.y = damp(
        ref3.current.rotation.y,
        -Math.PI / 7 + Math.PI * y,
        1.7,
        delta
      );
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[-4, 1, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <meshStandardMaterial />
        <octahedronGeometry args={[0.4, 0]} />
      </mesh>
      <mesh ref={ref2} position={[-2, 3, -1]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial />
        <octahedronGeometry args={[0.7, 0]} />
      </mesh>
      <mesh ref={ref3} position={[-2, -2, 1]} rotation={[0, -Math.PI, 0]}>
        <meshStandardMaterial />
        <octahedronGeometry args={[0.7, 0]} />
      </mesh>
    </group>
  );
};

const About = () => {
  return (
    <ScrollControls pages={2.5} style={{ overflow: 'hidden auto' }}>
      <Scroll>
        <AboutScene />
        <pointLight position={[3, 0, 1]} />
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
