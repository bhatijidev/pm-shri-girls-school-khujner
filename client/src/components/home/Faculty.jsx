import React from 'react';
import { Award, BookOpen, GraduationCap } from 'lucide-react';

export default function Faculty() {
  const teachers = [
    {
      name: 'Dr. Sunita Sharma',
      role: 'Principal & Head of Institution',
      roleHindi: 'प्राचार्य',
      qual: 'M.Sc., M.Ed., Ph.D.',
      exp: '22+ Years in School Administration',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    },
    {
      name: 'Smt. Rekha Verma',
      role: 'Vice Principal & Senior Lecturer',
      roleHindi: 'उप-प्राचार्य (गणित)',
      qual: 'M.Sc. Mathematics, B.Ed.',
      exp: '18+ Years Academic Experience',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&q=80'
    },
    {
      name: 'Shri Rajesh Patidar',
      role: 'Lecturer - Physics & STEM Lead',
      roleHindi: 'व्याख्याता (भौतिक शास्त्र)',
      qual: 'M.Sc. Physics, NET Qualified',
      exp: '14+ Years STEM Mentorship',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80'
    },
    {
      name: 'Dr. Anita Malviya',
      role: 'Lecturer - Chemistry',
      roleHindi: 'व्याख्याता (रसायन शास्त्र)',
      qual: 'M.Sc., Ph.D. Chemistry',
      exp: '15+ Years Board Exam Trainer',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80'
    },
    {
      name: 'Smt. Kavita Rajput',
      role: 'Senior Teacher - Social Sciences',
      roleHindi: 'उच्च श्रेणी शिक्षक (सामाजिक विज्ञान)',
      qual: 'M.A. History & Civics, B.Ed.',
      exp: '12+ Years Experience',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80'
    },
    {
      name: 'Smt. Pooja Gupta',
      role: 'ICT & Computer Lab Incharge',
      roleHindi: 'कंप्यूटर अनुदेशक',
      qual: 'MCA, B.Tech Computer Science',
      exp: '8+ Years Tech Educator',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'
    }
  ];

  return (
    <section id="faculty" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">
            Our Dedicated Faculty & Mentors
          </h2>
          <p className="font-hindi text-base text-slate-600">
            छात्राओं के उज्ज्वल भविष्य निर्माण में निरंतर प्रयासरत समर्पित शिक्षक दल
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 bg-brand-cream border border-orange-100 hover:border-brand-orange/40 hover:shadow-xl transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center space-x-4">
                {/* Real Teacher Portrait Photo */}
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white group-hover:scale-105 transition-transform">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-orange transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-600">{t.role}</p>
                  <p className="text-[11px] font-hindi text-brand-orange font-medium">{t.roleHindi}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-orange-200/50 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                  <span><strong>Qualification:</strong> {t.qual}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>{t.exp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
