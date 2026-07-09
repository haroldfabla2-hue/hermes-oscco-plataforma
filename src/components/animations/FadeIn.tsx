'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  scale?: number;
  trigger?: 'scroll' | 'mount';
  className?: string;
}

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  scale = 1,
  trigger = 'scroll',
  className = '',
}: FadeInProps) {
  const directionOffset = 40;
  
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return { hidden: { opacity: 0, y: directionOffset, scale }, visible: { opacity: 1, y: 0, scale: 1 } };
      case 'down':
        return { hidden: { opacity: 0, y: -directionOffset, scale }, visible: { opacity: 1, y: 0, scale: 1 } };
      case 'left':
        return { hidden: { opacity: 0, x: directionOffset, scale }, visible: { opacity: 1, x: 0, scale: 1 } };
      case 'right':
        return { hidden: { opacity: 0, x: -directionOffset, scale }, visible: { opacity: 1, x: 0, scale: 1 } };
      case 'none':
      default:
        return { hidden: { opacity: 0, scale }, visible: { opacity: 1, scale: 1 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={trigger === 'mount' ? 'visible' : undefined}
      whileInView={trigger === 'scroll' ? 'visible' : undefined}
      viewport={trigger === 'scroll' ? { once: true, margin: '-20px' } : undefined}
      transition={{ duration, delay, ease: [0.21, 1.02, 0.43, 1.01] }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
