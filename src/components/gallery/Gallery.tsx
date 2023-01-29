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
];

const Gallery = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const cards = gsap.utils.toArray('.card');

      // Card scrolling animation

      // TODO: xPercent calculation depends on gap and padding etc.
      const scrollTween = gsap.to(cards, {
        xPercent: -100 * cards.length,
        ease: 'none', // <-- IMPORTANT!
        scrollTrigger: {
          trigger: ref.current,
          pin: true,
          scrub: 1,
          end: '+=3000',
        },
      });

      // Scaling up/down on scroll
      for (let i = 0; i < list.length; i++) {
        if (i > 0) {
          gsap.to(`.card-${i}`, {
            scale: 1.2,
            scrollTrigger: {
              horizontal: true,
              containerAnimation: scrollTween,
              scrub: true,
              markers: true,
              trigger: `.card-${i}`,
              start: 'left 50%',
              end: '40% 50%',
            },
          });
        }
        gsap.from(`.card-${i}`, {
          scale: 1.2,
          scrollTrigger: {
            horizontal: true,
            containerAnimation: scrollTween,
            scrub: true,
            // markers: true,
            trigger: `.card-${i}`,
            start: '60% 50%',
            end: '110% 50%',
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Flex
      gap={'10rem'}
      ref={ref}
      style={{
        width: '150%',
        height: '100vh',
        position: 'fixed',
        paddingLeft: '45%',
      }}
    >
      {list.map((item, index) => {
        return (
          <GalleryItem
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
