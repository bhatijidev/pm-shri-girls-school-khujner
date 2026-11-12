import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, Sparkles, GraduationCap, ArrowRight, ShieldCheck, 
  PhoneCall, Mail, Users, CheckCircle2, BookOpen
} from 'lucide-react';
import { getPrincipal, getFeaturedMentors } from '../../data/facultyData';

export default function Faculty() {
  const principal = getPrincipal();
  const featuredMentors = getFeaturedMentors();

  return (
    <section id="faculty" className="py-20 bg-gradient-to-b from-white via-brand-cream/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-orange-100/80 px-3.5 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span>Academic Leadership & Mentors</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
            Our Dedicated Faculty & Mentors
          </h2>

          <p className="font-hindi text-base sm:text-lg text-slate-600 leading-relaxed">
            शासकीय कन्या उच्चतर माध्यमिक विद्यालय खुजनेर — 30 समर्पित शिक्षकों व प्रशासनिक अधिकारियों का आधिकारिक दल
          </p>

          <div className="pt-1 flex items-center justify-center space-x-2 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center space-x-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>30 Qualified Staff Members</span>
            </span>
            <span>•</span>
            <span className="text-slate-600">Classes 9th to 12th Holistic Education</span>
          </div>
        </div>

        {/* Principal Spotlight Card */}
        {principal && (
          <div className="bg-gradient-to-br from-amber-500/10 via-white to-orange-500/10 rounded-3xl p-6 sm:p-8 border-2 border-amber-300/80 shadow-md relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center text-center sm:text-left lg:text-center space-y-3 sm:space-y-0 sm:space-x-5 lg:space-x-0 lg:space-y-3">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg border-4 border-white">
                    {principal.initials}
                  </div>
                  <span className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-amber-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow uppercase tracking-wider">
                    Principal
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-heading font-extrabold text-slate-900">
                    {principal.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    {principal.nameEn}
                  </p>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-0.5">
                    {principal.roleHindi} • Head of Institution
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Principal's Desk • प्राचार्य संदेश</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-hindi italic bg-white/80 p-4 rounded-2xl border border-amber-200/60 shadow-sm">
                  "हमारा ध्येय बालिकाओं को न केवल अकादमिक ज्ञान प्रदान करना है, बल्कि उनमें आत्मविश्वास, संस्कार, आधुनिक डिजिटल कौशल और नेतृत्व क्षमता का विकास करना है ताकि वे राष्ट्र निर्माण में अग्रणी भूमिका निभा सकें।"
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <a
                    href={`tel:${principal.phone.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-slate-700 hover:text-brand-orange hover:border-brand-orange transition-colors font-semibold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{principal.phone}</span>
                  </a>
                  <a
                    href={`mailto:${principal.email}`}
                    className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-slate-700 hover:text-brand-orange hover:border-brand-orange transition-colors font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-red" />
                    <span>{principal.email}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Featured Subject Lecturers (Only 6 Featured Preview Cards) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-brand-orange" />
              <span>Senior Faculty Highlights (उच्च माध्यमिक शिक्षक)</span>
            </h3>
            <Link
              to="/faculty"
              className="text-xs font-bold text-brand-orange hover:underline flex items-center space-x-1"
            >
              <span>View All 30 →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredMentors.map((staff) => (
              <div
                key={staff.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${staff.color} text-white flex items-center justify-center font-extrabold text-sm shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {staff.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-bold text-slate-900 text-sm group-hover:text-brand-orange transition-colors truncate">
                        {staff.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium truncate">
                        {staff.nameEn}
                      </p>
                      <p className="text-[11px] font-bold text-brand-orange font-hindi">
                        {staff.roleHindi}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">विषय (Subject)</span>
                    <span className="font-semibold text-slate-800">{staff.subject}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{staff.roleEn}</span>
                  <span className="text-emerald-600 font-semibold">● Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big CTA Banner: View All 30 Faculty Members */}
        <div className="bg-gradient-to-r from-brand-orange via-brand-saffron to-brand-red rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-orange-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Complete School Directory</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
              Meet All 30 Faculty & Staff Members
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 max-w-xl font-hindi leading-relaxed">
              सम्पूर्ण 30 शिक्षकों, उच्च माध्यमिक व्याख्याताओं, व्यवसायिक IT प्रशिक्षकों, अतिथि शिक्षकों एवं प्रशासनिक अधिकारियों की पूरी सूची व विवरण देखें।
            </p>
          </div>

          <Link
            to="/faculty"
            className="flex-shrink-0 inline-flex items-center space-x-2 bg-white hover:bg-orange-50 text-brand-orange font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Explore Full Faculty Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
