import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Silky-smooth cubic bezier easing (Apple iOS / macOS fluid feel)
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(2px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(2px)',
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1]
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
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
