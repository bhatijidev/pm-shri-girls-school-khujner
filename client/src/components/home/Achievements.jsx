import React from 'react';
import { Award, Trophy, Star, Medal } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Achievements() {
  const stats = [
    {
      number: 96,
      suffix: '%',
      label: 'Board Examination Pass Rate',
      labelHindi: 'बोर्ड परीक्षा उत्तीर्ण प्रतिशत',
      icon: Award
    },
    {
      number: 32,
      suffix: '+',
      label: 'District Merit Rankers',
      labelHindi: 'जिला प्रवीण्य सूची में छात्राएं',
      icon: Trophy
    },
    {
      number: 100,
      suffix: '%',
      label: 'Eligible Girls on Scholarships',
      labelHindi: 'लाड़ली लक्ष्मी एवं अन्य छात्रवृत्तियां',
      icon: Medal
    },
    {
      number: 15,
      suffix: '+',
      label: 'Annual Sports & Science Trophies',
      labelHindi: 'वार्षिक खेल व विज्ञान पुरस्कार',
      icon: Star
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-brand-orange via-brand-saffron to-brand-red text-white relative overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/20">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className={`pt-6 lg:pt-0 ${idx !== 0 ? 'lg:pl-6' : ''} space-y-2`}>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                  <Icon className="w-6 h-6 text-yellow-200" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white drop-shadow-sm">
                  <AnimatedCounter end={s.number} suffix={s.suffix} />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {s.label}
                </h4>
                <p className="text-xs font-hindi text-orange-100/80">
                  {s.labelHindi}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
