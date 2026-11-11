import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, BookOpen, FlaskConical, Presentation, Trophy, Palette, 
  Sparkles, ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, Sliders, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Facilities() {
  const facilities = [
    {
      id: 1,
      title: 'Modern ICT & Computer Lab',
      titleHindi: 'आधुनिक कंप्यूटर एवं आईटी लैब',
      shortTitle: 'Computer Lab',
      shortHindi: 'कंप्यूटर लैब',
      description: 'Equipped with high-speed internet, 30+ desktop workstations, and coding curriculum for girls to master digital literacy and 21st-century software skills.',
      image: '/images/events/farewell-ceremony.jpg',
      icon: Monitor,
      badge: 'Smart Lab',
      features: ['30+ Modern PCs', 'High-Speed Broadband', 'IT/ITES Curriculum', 'Digital Literacy']
    },
    {
      id: 2,
      title: 'Composite Science Laboratory',
      titleHindi: 'संयुक्त विज्ञान प्रयोगशाला',
      shortTitle: 'Science Lab',
      shortHindi: 'विज्ञान लैब',
      description: 'Fully furnished with modern microscopes, chemical apparatus, and safety kits for practical physics, chemistry, and biology experiments.',
      image: '/images/events/empowering-minds.jpg',
      icon: FlaskConical,
      badge: 'STEM Focused',
      features: ['Physics Lab Equipment', 'Chemistry Workstations', 'Biology Microscopes', 'Safety First Gear']
    },
    {
      id: 3,
      title: 'Digital & Physical E-Library',
      titleHindi: 'डिजिटल एवं भौतिक पुस्तकालय',
      shortTitle: 'E-Library',
      shortHindi: 'ई-लाइब्रेरी',
      description: 'A serene reading environment housing over 3,000+ reference volumes, 500+ digital e-books, NCERT textbooks, competitive exam guides, and instant portal access.',
      image: '/images/events/school-event-khujner.jpg',
      icon: BookOpen,
      badge: '24/7 Digital Hub',
      features: ['500+ Digital E-Books', 'Competitive Exam Portals', 'Gita Press Granths', 'Quiet Reading Hall']
    },
    {
      id: 4,
      title: 'Interactive Smart Classrooms & Campus',
      titleHindi: 'इंटरैक्टिव स्मार्ट क्लासरूम एवं परिसर',
      shortTitle: 'Smart Class',
      shortHindi: 'स्मार्ट क्लास',
      description: 'Smart flat-panel displays, audio-visual educational material, and welfare schemes including free bicycle distribution under PM SHRI.',
      image: '/images/events/cycle-distribution.jpg',
      icon: Presentation,
      badge: 'NEP 2020 Tech',
      features: ['Interactive Panels', 'Audio-Visual Lessons', 'Free Bicycle Distribution', 'Digital Teaching']
    },
    {
      id: 5,
      title: 'Sports & Athletics Arena',
      titleHindi: 'विशाल खेल मैदान एवं योगाभ्यास',
      shortTitle: 'Sports & Yoga',
      shortHindi: 'खेल व योग',
      description: 'Open playground for volleyball, kho-kho, kabaddi, badminton, daily morning yoga assembly, and regular Rani Laxmibai self-defense training sessions.',
      image: '/images/events/girls-yoga-assembly.jpg',
      icon: Trophy,
      badge: 'Health & Fitness',
      features: ['Daily Yoga Assembly', 'Self-Defense Training', 'Volleyball & Kho-Kho', 'Annual Athletics Meet']
    },
    {
      id: 6,
      title: 'Vocational & Cultural Stage',
      titleHindi: 'सांस्कृतिक मंच एवं कला केंद्र',
      shortTitle: 'Cultural Stage',
      shortHindi: 'सांस्कृतिक मंच',
      description: 'Dedicated cultural stage for drama, debate competitions, festival celebrations, dance performances, and creative student workshops.',
      image: '/images/events/cultural-krishna-utsav.jpg',
      icon: Palette,
      badge: 'Creative Arts',
      features: ['Open-Air Cultural Stage', 'Saraswati Mandapam', 'Debates & Drama', 'Annual Cultural Fest']
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // Touch Swipe Handling for Mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 45; // in px

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % facilities.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? facilities.length - 1 : prev - 1));
  };

  const current = facilities[activeIndex];
  const CurrentIcon = current.icon;

  return (
    <section id="facilities" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
            <span>Infrastructure & Learning Spaces</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white leading-tight">
            World-Class Campus Facilities
          </h2>
          <p className="text-slate-400 font-hindi text-base sm:text-lg">
            छात्राओं के सर्वांगीण विकास हेतु आधुनिक प्रयोगशालाएं, डिजिटल कक्ष एवं खेल सुविधाएं
          </p>

          {/* View Mode Toggle Button */}
          <div className="pt-2 flex items-center justify-center space-x-2">
            <div className="bg-slate-900 border border-white/10 p-1 rounded-2xl inline-flex items-center space-x-1 shadow-inner">
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'slider'
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>स्लाइडर मोड (Swipe)</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>सभी ग्रिड में देखें</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. Mobile & Desktop Interactive Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none px-2">
          {facilities.map((f, idx) => {
            const Icon = f.icon;
            const isActive = activeIndex === idx;
            return (
              <button
                key={f.id}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white border-transparent shadow-lg shadow-orange-500/25 scale-105'
                    : 'bg-slate-900/90 text-slate-300 border-white/10 hover:border-brand-orange/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-orange-400'}`} />
                <span>{f.shortTitle}</span>
                <span className={`text-[10px] font-hindi ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                  ({f.shortHindi})
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Interactive Slider Mode with Touch Swiping */}
        {viewMode === 'slider' ? (
          <div
            className="relative bg-slate-900/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[480px]">
              
              {/* Left Side: Photo with Badge & Swipe Indicator */}
              <div className="relative lg:col-span-7 h-64 sm:h-80 lg:h-full overflow-hidden bg-slate-800 select-none">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </AnimatePresence>
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950"></div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 shadow-md">
                    {current.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-lg">
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                </div>

                {/* Mobile Touch Swipe Hint Pill */}
                <div className="absolute bottom-4 left-4 z-10 lg:hidden">
                  <span className="text-[10px] font-semibold bg-black/60 backdrop-blur-md text-orange-200 px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1.5">
                    <span>👈左右 Swipe करें 👉</span>
                  </span>
                </div>

                {/* Counter Pill */}
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="text-xs font-mono font-bold bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(facilities.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Right Side: Details & Feature Highlights */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                        PM SHRI Campus Facility #{current.id}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
                        {current.title}
                      </h3>
                      <p className="font-hindi text-sm sm:text-base text-orange-300 font-semibold">
                        {current.titleHindi}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {current.description}
                    </p>

                    {/* Feature Checkpoints */}
                    <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-300">
                      {current.features.map((feat, i) => (
                        <div key={i} className="flex items-center space-x-2 bg-slate-800/60 p-2 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Controls: Prev/Next & Dots */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Slide Dots */}
                  <div className="flex items-center space-x-2">
                    {facilities.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          setActiveIndex(idx);
                        }}
                        className={`transition-all duration-300 rounded-full ${
                          activeIndex === idx
                            ? 'w-7 h-2 bg-gradient-to-r from-brand-orange to-brand-red shadow-md'
                            : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                        }`}
                        aria-label={`Facility ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Switch Buttons (< Prev / Next >) */}
                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                    <button
                      onClick={handlePrev}
                      className="p-3 rounded-2xl bg-white/10 hover:bg-brand-orange text-white border border-white/15 transition-all flex items-center space-x-1.5 text-xs font-bold active:scale-95"
                      aria-label="Previous Facility"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>पिछला</span>
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-red text-white transition-all flex items-center space-x-1.5 text-xs font-bold shadow-lg shadow-orange-500/25 active:scale-95 hover:opacity-95"
                      aria-label="Next Facility"
                    >
                      <span>अगला सुविधा</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* 3. Grid View Mode (All 6 Facilities at Once) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {f.badge}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-md">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white group-hover:text-brand-orange transition-colors">
                        {f.title}
                      </h3>
                      <p className="text-xs font-hindi text-orange-300 font-medium mb-2">
                        {f.titleHindi}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {f.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-slate-500">PM SHRI Upgraded</span>
                      <Link
                        to="/library"
                        className="text-brand-orange font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
