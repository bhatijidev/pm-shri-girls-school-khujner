import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollButtons() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Show button once user scrolls down more than 100px
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG circular dimensions
  const size = 52; // Component width and height
  const strokeWidth = 3.5;
  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ~138.23
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-to-top-progress"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-5 sm:right-7 z-40 pointer-events-auto"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            title={`Scroll to Top (${Math.round(scrollProgress)}% scrolled)`}
            className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xl shadow-slate-900/15 hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
          >
            {/* Circular Progress SVG Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 52 52"
            >
              <defs>
                {/* Gradient for the Upward Arrow */}
                <linearGradient id="scrollArrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff7849" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>

                {/* Gradient for Progress Track (Active) */}
                <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Background Circular Track (Light Grey) */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={strokeWidth}
              />

              {/* Active Circular Progress Stroke (Dark Slate) */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                fill="none"
                stroke="url(#scrollProgressGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>

            {/* Exact Orange Gradient Up Arrow from User's Image */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              {/* Arrow Vertical Stem */}
              <path
                d="M12 19V5"
                stroke="url(#scrollArrowGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Arrow Chevron Head */}
              <path
                d="M5 12L12 5L19 12"
                stroke="url(#scrollArrowGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Hover Tooltip displaying Scroll Percentage */}
            <span className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md border border-white/10 pointer-events-none transition-opacity">
              Top ({Math.round(scrollProgress)}%)
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
