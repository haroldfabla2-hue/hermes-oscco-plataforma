'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  scale?: number;
  yOffset?: number;
  className?: string;
}

export default function HoverCard({
  children,
  scale = 1.03,
  yOffset = -8,
  className = '',
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ scale, y: yOffset }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
