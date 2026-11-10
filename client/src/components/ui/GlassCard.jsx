import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  dark = false,
  onClick
}) {
  const baseClasses = dark
    ? 'glass-dark rounded-2xl p-6 text-white'
    : 'glass-panel rounded-2xl p-6 shadow-sm shadow-orange-950/5';

  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
