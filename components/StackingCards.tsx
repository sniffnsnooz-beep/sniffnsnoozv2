"use client";
import { useRef, ReactNode } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

import { ReactLenis } from 'lenis/react';

interface StackingCardsProps {
  children: ReactNode[];
}

export default function StackingCards({ children }: StackingCardsProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  if (!children || children.length === 0) return null;

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className='relative z-20 w-full pb-[10vh]' ref={container}>
        <div className='w-full max-w-5xl mx-auto px-4 md:px-8'>
          {children.map((child, i) => {
            const targetScale = 1 - (children.length - i) * 0.05;
            return (
              <Card
                key={`card_${i}`}
                i={i}
                progress={scrollYProgress}
                range={[i * (1 / children.length), 1]}
                targetScale={targetScale}
              >
                {child}
              </Card>
            );
          })}
        </div>
      </div>
    </ReactLenis>
  );
}

interface CardProps {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  i,
  progress,
  range,
  targetScale,
  children
}) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className='w-full origin-top will-change-transform'
      >
        {children}
      </motion.div>
    </div>
  );
}
