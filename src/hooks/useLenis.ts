import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';

export const useLenis = () => {
  const requestRef = useRef<number>();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestRef.current = requestAnimationFrame(raf);
    };

    // Run request animation
    requestRef.current = requestAnimationFrame(raf);

    // Cleanup cancel previous timestamp
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
};
