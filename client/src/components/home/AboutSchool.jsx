import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, BookMarked, GraduationCap, Sparkles, ShieldCheck } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import { bookService } from '../../services/api';

export default function AboutSchool() {
  const [stats, setStats] = useState({
    enrolledStudents: 550,
    boardPassRate: 96,
    facultyCount: 30,
    totalBooks: 503
  });

  useEffect(() => {
    bookService.getPublicStats()
      .then((res) => {
        if (res?.success && res?.data) {
          setStats((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {});
  }, []);
  const highlights = [
    'Selected under the Centrally Sponsored PM SHRI scheme by the Ministry of Education, Govt. of India',
    'Aligned with National Education Policy (NEP 2020) focusing on experiential, multidisciplinary learning',
    '100% free quality education, textbooks, stationery, and uniforms for girl students in Khujner region',
    'Modern computer lab, smart boards, integrated composite science laboratory & vocational training',
    'Regular health checkups, self-defense (Rani Laxmibai Atmaraksha Prashikshan), and career counseling'
  ];

  return (
    <section id="about" className="py-20 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-orange-100/60 px-3 py-1 rounded-full">
            <GraduationCap className="w-4 h-4" />
            <span>Exemplary Institution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">
            About PM SHRI Girls HSS Khujner
          </h2>
          <p className="font-hindi text-base text-slate-600">
            बालिका सशक्तिकरण, आधुनिक तकनीक एवं राष्ट्रीय शिक्षा नीति 2020 के अनुरूप समग्र विकास का केंद्र
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              <p className="text-base sm:text-lg">
                <strong className="text-slate-900 font-bold">PM SHRI Government Girls Higher Secondary School, Khujner</strong> (Rajgarh, Madhya Pradesh) 
                is an upgraded exemplar government institution committed to delivering premier 21st-century secondary and higher secondary education for young women.
              </p>
              <p className="text-sm sm:text-base text-slate-600">
                Under the PM SHRI banner, the school showcases pedagogical innovations, environmental sustainability, digital pedagogical tools, and child-centric infrastructure. Our mission is to nurture confident, educated, and self-reliant girls ready to lead in academia, sports, governance, and technology.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-800 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Affiliation & Accreditation</h4>
                  <p className="text-xs text-slate-500">MPBSE Bhopal & PM SHRI Scheme</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-brand-red flex-shrink-0">
                  <BookMarked className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Curriculum Structure</h4>
                  <p className="text-xs text-slate-500">NCERT & State Syllabus (Classes 9-12)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Photo Showcase with Interactive Overlays */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Featured Photo - Official School Campus Building */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
              <img
                src="/images/school-building.jpg"
                alt="Main Campus Building of PM SHRI Govt Girls HSS Khujner"
                className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-orange px-2 py-0.5 rounded-md shadow-sm">
                  Official Campus Building • मुख्य विद्यालय भवन
                </span>
                <h4 className="font-heading font-bold text-base mt-1">
                  पीएम श्री शासकीय कन्या उ.मा. विद्यालय, खुजनेर
                </h4>
                <p className="text-xs text-orange-200">
                  Modern Academic Complex & Courtyard • UDISE: 23300137920
                </p>
              </div>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 text-center space-y-1">
                <div className="text-3xl font-extrabold text-slate-900">
                  <AnimatedCounter end={stats.enrolledStudents} suffix="+" />
                </div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Enrolled Students
                </p>
                <p className="text-[10px] text-slate-400 font-hindi">छात्राएं (कक्षा 9वीं से 12वीं)</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 text-center space-y-1">
                <div className="text-3xl font-extrabold text-brand-orange">
                  <AnimatedCounter end={stats.boardPassRate} suffix="%" />
                </div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Board Pass Rate
                </p>
                <p className="text-[10px] text-slate-400 font-hindi">उत्कृष्ट बोर्ड परिणाम</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 text-center space-y-1">
                <div className="text-3xl font-extrabold text-blue-600">
                  <AnimatedCounter end={stats.facultyCount} suffix="" />
                </div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Faculty Members
                </p>
                <p className="text-[10px] text-slate-400 font-hindi">समर्पित शिक्षक एवं स्टाफ</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 text-center space-y-1">
                <div className="text-3xl font-extrabold text-emerald-600">
                  <AnimatedCounter end={stats.totalBooks} suffix="+" />
                </div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Digital E-Books
                </p>
                <p className="text-[10px] text-slate-400 font-hindi">ई-पुस्तकालय भंडार</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
