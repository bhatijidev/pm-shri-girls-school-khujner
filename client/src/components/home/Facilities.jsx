import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, BookOpen, FlaskConical, Presentation, Trophy, Palette, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Facilities() {
  const facilities = [
    {
      title: 'Modern ICT & Computer Lab',
      titleHindi: 'आधुनिक कंप्यूटर एवं आईटी लैब',
      description: 'Equipped with high-speed internet, 30+ desktop workstations, and coding curriculum for girls to master digital literacy and 21st-century software skills.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      icon: Monitor,
      badge: 'Smart Lab',
      span: 'lg:col-span-2'
    },
    {
      title: 'Composite Science Laboratory',
      titleHindi: 'संयुक्त विज्ञान प्रयोगशाला',
      description: 'Fully furnished with modern microscopes, chemical apparatus, and safety kits for practical physics, chemistry, and biology experiments.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
      icon: FlaskConical,
      badge: 'STEM Focused',
      span: 'lg:col-span-1'
    },
    {
      title: 'Digital & Physical E-Library',
      titleHindi: 'डिजिटल एवं भौतिक पुस्तकालय',
      description: 'A serene reading environment housing over 3,000+ reference volumes, NCERT books, competitive exam guides, and instant digital portal access.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
      icon: BookOpen,
      badge: '24/7 Portal',
      span: 'lg:col-span-1'
    },
    {
      title: 'Interactive Smart Classrooms',
      titleHindi: 'इंटरैक्टिव स्मार्ट क्लासरूम',
      description: 'Large interactive flat-panel displays, audiovisual lessons, and digital blackboard projection powered under PM SHRI modernization.',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80',
      icon: Presentation,
      badge: 'NEP 2020 Tech',
      span: 'lg:col-span-2'
    },
    {
      title: 'Sports & Athletics Arena',
      titleHindi: 'विशाल खेल मैदान एवं व्यायामशाला',
      description: 'Open playground for volleyball, kho-kho, kabaddi, badminton, and regular Rani Laxmibai self-defense training sessions.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
      icon: Trophy,
      badge: 'Health & Fitness',
      span: 'lg:col-span-1'
    },
    {
      title: 'Vocational & Arts Studio',
      titleHindi: 'व्यावसायिक एवं कला केंद्र',
      description: 'Promoting local handicrafts, textile work, fine arts, debate competitions, and creative cultural workshops for girls.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
      icon: Palette,
      badge: 'Creative Arts',
      span: 'lg:col-span-2'
    }
  ];

  return (
    <section id="facilities" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span>Infrastructure & Learning Spaces</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            World-Class Campus Facilities
          </h2>
          <p className="text-slate-400 font-hindi text-base">
            छात्राओं के सर्वांगीण विकास हेतु आधुनिक प्रयोगशालाएं, डिजिटल कक्ष एवं खेल सुविधाएं
          </p>
        </div>

        {/* Bento Grid with Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {facilities.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between shadow-lg ${f.span}`}
              >
                {/* Image Header with Badge Overlay */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-800">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {f.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/90 text-white flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-brand-orange transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs font-hindi text-orange-300 font-medium mb-2">
                      {f.titleHindi}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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

      </div>
    </section>
  );
}
