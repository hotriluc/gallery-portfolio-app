import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { Flex } from '../../styles/Global.styles';
import GalleryItem from './GalleryItem';

const list: Array<{
  imgUrl: string;
  title: string;
}> = [
  { imgUrl: '/image1.jpg', title: 'something here' },
  { imgUrl: '/image1.jpg', title: 'something here' },
  { imgUrl: '/image1.jpg', title: 'something here' },
  { imgUrl: '/image1.jpg', title: 'something here' },
  { imgUrl: '/image1.jpg', title: 'something here' },
  { imgUrl: '/image1.jpg', title: 'something here' },
  { imgUrl: '/image1.jpg', title: 'something here' },
  //   { imgUrl: '/image1.jpg', title: 'something here' },
  //   { imgUrl: '/image1.jpg', title: 'something here' },
  //   { imgUrl: '/image1.jpg', title: 'something here' },
];

const Gallery = ({
  gap = 10,
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

      // Card scrolling animation
      console.log(cards[0].offsetWidth);

      // TODO: xPercent calculation depends on gap and padding etc.
      const scrollTween = gsap.to(cards, {
        xPercent:
          -(100 + cards[0].offsetWidth / 10) * cards.length -
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
        if (i > 0) {
          gsap.to(`.card-${i}`, {
            scale: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              horizontal: true,
              containerAnimation: scrollTween,
              scrub: true,
              trigger: `.card-${i}`,
              start: '-10% 50%',
              end: '40% 50%',
            },
          });
        }
        gsap.from(`.card-${i}`, {
          scale: 1.5,
          scrollTrigger: {
            horizontal: true,
            containerAnimation: scrollTween,
            scrub: true,
            trigger: `.card-${i}`,
            start: '60% 50%',
            end: '120% 50%',
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
