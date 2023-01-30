import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { Flex } from '../../styles/Global.styles';
import GalleryItem from './GalleryItem';

const list: Array<{
  imgUrl: string;
  title: string;
}> = [
  { imgUrl: '/image1.jpg', title: 'Lorem Ipsum' },
  { imgUrl: '/image1.jpg', title: 'Lorem Ipsum' },

  { imgUrl: '/image1.jpg', title: 'Lorem Ipsum' },
  { imgUrl: '/image1.jpg', title: 'Lorem Ipsum' },
  { imgUrl: '/image1.jpg', title: 'Lorem Ipsum' },
];

const Gallery = ({
  gap = 15,
  itemWidth = 300,
  itemHeight = 400,
}: {
  gap?: number;
  itemWidth?: number;
  itemHeight?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const cards: Array<HTMLDivElement> = gsap.utils.toArray('.card');

      const scrollTween = gsap.to(cards, {
        xPercent:
          -(115 + cards[0].offsetWidth / 10) * cards.length -
          gap * cards.length,

        ease: 'none', // <-- IMPORTANT!
        scrollTrigger: {
          trigger: ref.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + ref.current?.offsetWidth,
        },
      });

      // Scaling up/down on scroll
      for (let i = 0; i < list.length; i++) {
        gsap.to(`.card-${i}-title`, {
          x: -20,
          opacity: 0,
          scrollTrigger: {
            horizontal: true,
            containerAnimation: scrollTween,
            scrub: true,
            markers: true,
            trigger: `.card-${i}`,
            start: '150% 50%',
            end: '+=400% 50%',
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Flex
      gap={gap}
      ref={ref}
      style={{
        width: '500%',
        height: '100vh',
        position: 'fixed',
        paddingLeft: '45%',
      }}
      className="gallery-container"
    >
      {list.map((item, index) => {
        return (
          <GalleryItem
            height={itemHeight}
            width={itemWidth}
            key={index}
            index={index}
            imgUrl={item.imgUrl}
            title={item.title}
          />
        );
      })}
    </Flex>
  );
};

export default Gallery;
