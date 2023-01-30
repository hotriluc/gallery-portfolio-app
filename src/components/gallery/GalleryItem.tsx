import gsap from 'gsap';
import React, { useRef } from 'react';
import styled from 'styled-components';

interface GalleryItemProps {
  index: number;
  imgUrl: string;
  title: string;
  width: number;
  height: number;
}

const Card = styled.div`
  /* position: relative; */
  box-shadow: ${(props) => props.theme.color};
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  p {
    color: white;
    position: absolute;
    mix-blend-mode: exclusion;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    width: max-content;
    margin: 0;
    text-transform: uppercase;
  }
`;

const GalleryItem = (props: GalleryItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // scaling up animation
  const onEnter = ({ currentTarget }: { currentTarget: HTMLDivElement }) => {
    gsap.to(currentTarget, { scale: 1.2 });
  };

  // return to default scale
  const onLeave = ({ currentTarget }: { currentTarget: HTMLDivElement }) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  const onMouseDown = ({
    currentTarget,
  }: {
    currentTarget: HTMLDivElement;
  }) => {
    gsap.to(currentTarget, { scale: 1.1 });
  };

  const onMouseUp = ({ currentTarget }: { currentTarget: HTMLDivElement }) => {
    gsap.to(currentTarget, { scale: 1.2 });
    console.log('move to project' + props.index);
  };

  return (
    <Card
      ref={ref}
      className={`card card-${props.index}`}
      style={{ height: props.height, width: props.width }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <img src={props.imgUrl} alt="" />
      <p className={`card-${props.index}-title`}>{props.title}</p>
    </Card>
  );
};

export default GalleryItem;
