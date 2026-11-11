import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Bell, Sparkles, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: '/images/events/cycle-distribution.jpg',
      badge: 'National PM SHRI Exemplar Institution',
      titleHindi: 'प्रधानमंत्री श्री शासकीय कन्या उच्चतर माध्यमिक विद्यालय, खुजनेर',
      titleEnglish: 'PM SHRI Girls HSS, Khujner (M.P.)',
      subtitle: 'Rajgarh District • UDISE: 23300137920 • निःशुल्क साइकिल वितरण, स्मार्ट क्लासरूम एवं समग्र शिक्षा योजना अंतर्गत बालिकाओं का सर्वांगीण विकास।',
      primaryBtnText: 'Explore Digital Library',
      primaryBtnLink: '/library',
      secondaryBtnText: 'View School Notices',
      secondaryBtnLink: '/notices'
    },
    {
      id: 2,
      image: '/images/events/farewell-ceremony.jpg',
      badge: 'Academic Excellence & Girl Child Empowerment',
      titleHindi: 'बालिका शिक्षा, अनुशासन एवं प्रतिभा सम्मान समारोह',
      titleEnglish: 'Class 12 Academic Felicitation & Guidance',
      subtitle: 'शासकीय कन्या उमावि खुजनेर में 21वीं सदी की आधुनिक शिक्षा, विज्ञान संकाय एवं कला-वाणिज्य में उत्कृष्ट मार्गदर्शन।',
      primaryBtnText: 'View Facilities',
      primaryBtnLink: '/#facilities',
      secondaryBtnText: 'Explore E-Library',
      secondaryBtnLink: '/library'
    },
    {
      id: 3,
      image: '/images/events/school-event-khujner.jpg',
      badge: 'Cultural Heritage & Saraswati Vandana',
      titleHindi: 'मां सरस्वती प्रतिमा स्थापना एवं सांस्कृतिक मंच लोकार्पण',
      titleEnglish: 'Inauguration of Dedicated Cultural Stage',
      subtitle: 'वरिष्ठ शिक्षकों, प्रशासनिक अधिकारियों एवं जन प्रतिनिधियों द्वारा विद्यालय प्रांगण में सांस्कृतिक मंच का लोकार्पण।',
      primaryBtnText: 'Open E-Library Now',
      primaryBtnLink: '/library',
      secondaryBtnText: 'School Notices',
      secondaryBtnLink: '/notices'
    },
    {
      id: 4,
      image: '/images/events/girls-yoga-assembly.jpg',
      badge: 'Physical Empowerment & Self-Defense',
      titleHindi: 'रानी लक्ष्मीबाई आत्मरक्षा एवं नियमित योगाभ्यास',
      titleEnglish: 'Self-Defense Training & Daily Morning Assembly',
      subtitle: 'दैनिक प्रार्थना सभा, आत्मरक्षा कार्यशाला एवं खेलकूद गतिविधियों द्वारा बालिकाओं का मानसिक व शारीरिक सशक्तीकरण।',
      primaryBtnText: 'Our Facilities',
      primaryBtnLink: '/#facilities',
      secondaryBtnText: 'Contact Office',
      secondaryBtnLink: '/#contact'
    },
    {
      id: 5,
      image: '/images/events/pm-shri-green-campus.jpg',
      badge: 'Green Campus & Nature Conservation',
      titleHindi: 'पर्यावरण संरक्षण, इको क्लब एवं हरित विद्यालय परिसर',
      titleEnglish: 'PM SHRI Eco-Friendly Clean & Green Campus',
      subtitle: 'सघन पौधरोपण, हर्बल वाटिका एवं स्वच्छ भारत मिशन के तहत पर्यावरण संरक्षण के प्रति समर्पित विद्यालय परिसर।',
      primaryBtnText: 'Explore Campus',
      primaryBtnLink: '/#about',
      secondaryBtnText: 'School Notices',
      secondaryBtnLink: '/notices'
    }
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play interval: 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[current];

  return (
    <div
      className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.titleEnglish}
            className="w-full h-full object-cover object-center"
            loading={current === 0 ? 'eager' : 'lazy'}
            fetchpriority={current === 0 ? 'high' : 'auto'}
            decoding="async"
          />
          {/* Multi-layered dark gradient overlay for crystal clear contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
          <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Text Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl space-y-5">
          
          {/* Badge & School Emblem */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-lg inline-block">
              <img
                src="/images/logo.jpg"
                alt="PM SHRI Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange/30 to-brand-red/30 border border-brand-orange/50 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs sm:text-sm font-bold text-orange-200">
                {activeSlide.badge}
              </span>
            </div>
          </div>

          {/* Hindi Title */}
          <motion.h3
            key={`hi-${activeSlide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-hindi text-lg sm:text-2xl lg:text-3xl font-extrabold text-orange-300 drop-shadow-md leading-tight"
          >
            {activeSlide.titleHindi}
          </motion.h3>

          {/* English Main Heading */}
          <motion.h1
            key={`en-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg"
          >
            {activeSlide.titleEnglish}
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            key={`sub-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl leading-relaxed drop-shadow"
          >
            {activeSlide.subtitle}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            key={`btn-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-3 flex flex-wrap items-center gap-4"
          >
            <Link
              to={activeSlide.primaryBtnLink}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-red hover:to-brand-orange text-white font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>{activeSlide.primaryBtnText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={activeSlide.secondaryBtnLink}
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-all text-sm"
            >
              <Bell className="w-4 h-4 text-brand-orange" />
              <span>{activeSlide.secondaryBtnText}</span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Navigation Left / Right Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-brand-orange text-white backdrop-blur-md transition-all border border-white/10 hover:border-transparent group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-brand-orange text-white backdrop-blur-md transition-all border border-white/10 hover:border-transparent group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center space-x-2.5">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              current === idx
                ? 'w-8 h-2.5 bg-gradient-to-r from-brand-orange to-brand-red shadow-lg'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1 pointer-events-none z-20">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-6 sm:h-10 text-brand-cream preserve-3d">
          <path d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,26.7C840,21,960,43,1080,48C1200,53,1320,43,1380,37.3L1440,32L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z" fill="currentColor"></path>
        </svg>
      </div>

    </div>
  );
}
