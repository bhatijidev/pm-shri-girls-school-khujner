import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LibraryPreview() {
  const categoryHighlights = [
    {
      name: 'NCERT Textbooks',
      nameHindi: 'एनसीईआरटी पुस्तकें',
      desc: 'Class 1 to 12 free official textbooks for Math, Science, Physics, Chemistry, Biology & Humanities.',
      image: '/images/books/cat-ncert.jpg',
      badge: 'Official NCERT',
      color: 'bg-blue-600',
      tag: 'Classes 1-12'
    },
    {
      name: 'MP Board Curriculum',
      nameHindi: 'एमपी बोर्ड पाठ्यक्रम',
      desc: 'Direct integration with Vimarsh & MP Text Book Corporation for blueprint, model papers & question banks.',
      image: '/images/books/cat-mpboard.jpg',
      badge: 'Vimarsh Portal',
      color: 'bg-emerald-600',
      tag: 'MPBSE Bhopal'
    },
    {
      name: 'CBSE & Skill Books',
      nameHindi: 'सीबीएसई कौशल शिक्षा',
      desc: 'AI, Information Technology, Financial Markets & Vocational Handbooks from CBSE.',
      image: '/images/books/cat-cbse.jpg',
      badge: 'Skill Education',
      color: 'bg-rose-600',
      tag: 'Vocational'
    },
    {
      name: 'Hindu Dharm Sacred Granth',
      nameHindi: 'हिन्दू धर्म ग्रंथ (गीताप्रेस)',
      desc: 'Bhagavad Gita, Ramcharitmanas, Ramayana, Chanakya Niti, Vidur Niti, Panchatantra & Puranas.',
      image: '/images/books/cat-hindudharm.jpg',
      badge: 'Public Domain',
      color: 'bg-amber-600',
      tag: 'Sacred Heritage'
    },
    {
      name: 'Competitive Exam Hub',
      nameHindi: 'प्रतियोगी परीक्षा तैयारी',
      desc: 'UPSC, MPPSC, SSC, General Knowledge, Constitution, Hindi Grammar, NEET & JEE Preparation.',
      image: '/images/books/cat-competitive.jpg',
      badge: 'Govt. Portals',
      color: 'bg-purple-600',
      tag: 'UPSC / NEET'
    },
    {
      name: 'School Guides & Career',
      nameHindi: 'कन्या करियर मार्गदर्शन',
      desc: 'Inspiring biographies (Dr. Kalam, Swami Vivekananda, Rani Lakshmibai) & Girls career roadmaps.',
      image: '/images/books/cat-career.jpg',
      badge: 'Khujner HSS',
      color: 'bg-teal-600',
      tag: 'Girl Child'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-brand-cream to-orange-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-orange-100 px-3.5 py-1 rounded-full">
              <BookOpen className="w-4 h-4" />
              <span>Digital Resource Center</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900">
              Copyright-Safe Digital E-Library
            </h2>
            <p className="font-hindi text-base text-slate-600 max-w-2xl">
              एनसीईआरटी, एमपी बोर्ड, प्रतियोगी परीक्षाएं एवं धर्म ग्रंथों का निःशुल्क डिजिटल भंडार
            </p>
          </div>

          <Link
            to="/library"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold px-6 py-3.5 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 self-start md:self-auto text-sm"
          >
            <span>Open Full Library (500+ Books)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid with Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryHighlights.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-orange-100 hover:border-brand-orange/50 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Category Photo Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30"></div>

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className={`${cat.color} text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm`}>
                      {cat.tag}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-white bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-semibold">Verified Legal</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-lg font-heading font-extrabold text-white leading-snug drop-shadow-md">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <p className="text-xs font-hindi text-brand-orange font-bold">
                    {cat.nameHindi}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <span className="text-xs font-semibold text-slate-400">{cat.badge}</span>
                <Link
                  to="/library"
                  className="text-xs font-bold text-brand-orange hover:text-brand-red inline-flex items-center space-x-1 transition-colors"
                >
                  <span>Browse Books</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal Trust Notice */}
        <div className="mt-12 bg-white border border-orange-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span>
              <strong>Zero Copyright Infringement:</strong> All academic textbooks link directly to official Ministry and Board servers; spiritual granths are sourced exclusively from authentic public domain repositories.
            </span>
          </div>
          <Link
            to="/library"
            className="text-xs font-bold uppercase tracking-wider text-brand-orange hover:underline whitespace-nowrap self-start sm:self-auto"
          >
            Explore All 500+ Books →
          </Link>
        </div>

      </div>
    </section>
  );
}
