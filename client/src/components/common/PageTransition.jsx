import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Ultra-fast GPU-accelerated page transition (no CPU-heavy blur filters)
const pageVariants = {
  initial: {
    opacity: 0,
    y: 6
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.12,
      ease: 'easeOut'
    }
  }
};

export default function PageTransition({ children }) {
  // Ensure the page always enters cleanly at the top of the viewport
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: 'opacity, transform' }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
