import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScrollButtons() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      setAtTop(scrollY <= 60);
      setAtBottom(scrollY >= maxScroll - 60);
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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div
      aria-label="Page scroll controls"
      className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-center space-y-2 pointer-events-auto"
    >
      {/* Scroll Up Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        title="Scroll to Top (पेज के शीर्ष पर जाएं)"
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl shadow-lg border flex items-center justify-center transition-all duration-300 group backdrop-blur-md ${
          atTop
            ? 'bg-white/70 border-slate-200 text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-brand-orange hover:to-brand-red hover:border-transparent'
            : 'bg-white/95 border-orange-200/90 shadow-orange-500/20 text-slate-800 hover:text-white hover:bg-gradient-to-tr hover:from-brand-orange hover:to-brand-red hover:border-transparent'
        }`}
      >
        <ChevronUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </motion.button>

      {/* Scroll Down Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={scrollToBottom}
        aria-label="Scroll to bottom of page"
        title="Scroll to Bottom (पेज के नीचे जाएं)"
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl shadow-lg border flex items-center justify-center transition-all duration-300 group backdrop-blur-md ${
          atBottom
            ? 'bg-white/70 border-slate-200 text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-brand-orange hover:to-brand-red hover:border-transparent'
            : 'bg-white/95 border-orange-200/90 shadow-orange-500/20 text-slate-800 hover:text-white hover:bg-gradient-to-tr hover:from-brand-orange hover:to-brand-red hover:border-transparent'
        }`}
      >
        <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
      </motion.button>
    </div>
  );
}
