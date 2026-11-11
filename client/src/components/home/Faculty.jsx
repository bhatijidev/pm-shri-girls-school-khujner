import React, { useState, useMemo } from 'react';
import { Award, BookOpen, GraduationCap, Sparkles, Search, UserCheck, ShieldCheck, PhoneCall, Mail, Users, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const officialFacultyList = [
  {
    id: 1,
    name: 'श्री हितेश सोनी',
    nameEn: 'Shri Hitesh Soni',
    roleHindi: 'प्राचार्य',
    roleEn: 'Principal & Head of Institution',
    category: 'leadership',
    categoryLabel: 'प्रशासन एवं नेतृत्व',
    subject: 'Institutional Leadership & Academic Administration',
    initials: 'HS',
    color: 'from-amber-500 via-orange-600 to-amber-700',
    isPrincipal: true,
    phone: '+91 95759 62662',
    email: 'principalgghsskhujner@gmail.com'
  },
  {
    id: 2,
    name: 'श्रीमती निर्मला मालवीय',
    nameEn: 'Smt. Nirmala Malviya',
    roleHindi: 'उ.मा.शि. राजनीति',
    roleEn: 'Lecturer (PGT) - Political Science',
    category: 'pgt',
    categoryLabel: 'उच्च माध्यमिक शिक्षक',
    subject: 'Political Science (राजनीति विज्ञान)',
    initials: 'NM',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 3,
    name: 'श्री निर्मल वर्मा',
    nameEn: 'Shri Nirmal Verma',
    roleHindi: 'उ.मा.शि. भूगोल',
    roleEn: 'Lecturer (PGT) - Geography',
    category: 'pgt',
    categoryLabel: 'उच्च माध्यमिक शिक्षक',
    subject: 'Geography (भूगोल)',
    initials: 'NV',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 4,
    name: 'श्री मनोज कुमार गोहेलोत',
    nameEn: 'Shri Manoj Kumar Gohelot',
    roleHindi: 'उ.मा.शि. संस्कृत',
    roleEn: 'Lecturer (PGT) - Sanskrit',
    category: 'pgt',
    categoryLabel: 'उच्च माध्यमिक शिक्षक',
    subject: 'Sanskrit Literature (संस्कृत साहित्य)',
    initials: 'MG',
    color: 'from-purple-600 to-violet-700'
  },
  {
    id: 5,
    name: 'श्रीमती पवित्रा गुप्ता',
    nameEn: 'Smt. Pavitra Gupta',
    roleHindi: 'उ.मा.शि. हिन्दी',
    roleEn: 'Lecturer (PGT) - Hindi',
    category: 'pgt',
    categoryLabel: 'उच्च माध्यमिक शिक्षक',
    subject: 'Hindi Literature (हिंदी साहित्य)',
    initials: 'PG',
    color: 'from-rose-600 to-pink-700'
  },
  {
    id: 6,
    name: 'श्री दीपक गोयल',
    nameEn: 'Shri Deepak Goyal',
    roleHindi: 'उ.मा.शि. गणित',
    roleEn: 'Lecturer (PGT) - Mathematics',
    category: 'pgt',
    categoryLabel: 'उच्च माध्यमिक शिक्षक',
    subject: 'Mathematics (उच्च गणित)',
    initials: 'DG',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 7,
    name: 'श्री इमानुएल पन्ना',
    nameEn: 'Shri Immanuel Panna',
    roleHindi: 'उ.मा.शि. कॉमर्स',
    roleEn: 'Lecturer (PGT) - Commerce',
    category: 'pgt',
    categoryLabel: 'उच्च माध्यमिक शिक्षक',
    subject: 'Commerce & Accountancy (वाणिज्य व लेखाशास्त्र)',
    initials: 'IP',
    color: 'from-indigo-600 to-blue-700'
  },
  {
    id: 8,
    name: 'श्रीमती रूपा चतुर्वेदी',
    nameEn: 'Smt. Roopa Chaturvedi',
    roleHindi: 'उ.मा.शि. अंग्रेजी',
    roleEn: 'Lecturer (PGT) - English',
    category: 'pgt',
    categoryLabel: 'उच्च माध्यमिक शिक्षक',
    subject: 'English Literature & Grammar (अंग्रेजी)',
    initials: 'RC',
    color: 'from-teal-600 to-emerald-700'
  },
  {
    id: 9,
    name: 'श्रीमती माया यादव',
    nameEn: 'Smt. Maya Yadav',
    roleHindi: 'मा.शि. सामाजिक विज्ञान',
    roleEn: 'Secondary Teacher (TGT) - Social Science',
    category: 'tgt',
    categoryLabel: 'माध्यमिक एवं प्राथमिक शिक्षक',
    subject: 'Social Science (सामाजिक विज्ञान)',
    initials: 'MY',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 10,
    name: 'श्रीमती बिलकिस बानो मंसूरी',
    nameEn: 'Smt. Bilkis Bano Mansoori',
    roleHindi: 'मा.शि. विज्ञान',
    roleEn: 'Secondary Teacher (TGT) - Science',
    category: 'tgt',
    categoryLabel: 'माध्यमिक एवं प्राथमिक शिक्षक',
    subject: 'General Science (विज्ञान)',
    initials: 'BM',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 11,
    name: 'श्री वीण माधवसिंह उमठ',
    nameEn: 'Shri Veen Madhav Singh Umath',
    roleHindi: 'स.शिक्षक',
    roleEn: 'Assistant Teacher',
    category: 'tgt',
    categoryLabel: 'माध्यमिक एवं प्राथमिक शिक्षक',
    subject: 'Foundational Education & Academic Guidance',
    initials: 'VU',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 12,
    name: 'श्री मंगीलाल राठौर',
    nameEn: 'Shri Mangilal Rathore',
    roleHindi: 'प्रा.शि.',
    roleEn: 'Primary School Teacher (PRT)',
    category: 'tgt',
    categoryLabel: 'माध्यमिक एवं प्राथमिक शिक्षक',
    subject: 'Primary Education (प्राथमिक शिक्षा)',
    initials: 'MR',
    color: 'from-cyan-600 to-blue-700'
  },
  {
    id: 13,
    name: 'श्री बद्रीलाल कुशवाह',
    nameEn: 'Shri Badrilal Kushwah',
    roleHindi: 'प्रा.शि.वि.',
    roleEn: 'Primary School Teacher (PRT)',
    category: 'tgt',
    categoryLabel: 'माध्यमिक एवं प्राथमिक शिक्षक',
    subject: 'Primary School Education (प्रा.शि.वि.)',
    initials: 'BK',
    color: 'from-orange-600 to-amber-700'
  },
  {
    id: 14,
    name: 'श्री शंकरलाल कारपेंटर',
    nameEn: 'Shri Shankarlal Carpenter',
    roleHindi: 'प्रा.शि.वि.',
    roleEn: 'Primary School Teacher (PRT)',
    category: 'tgt',
    categoryLabel: 'माध्यमिक एवं प्राथमिक शिक्षक',
    subject: 'Primary School Education (प्रा.शि.वि.)',
    initials: 'SC',
    color: 'from-emerald-600 to-green-700'
  },
  {
    id: 15,
    name: 'श्री राजेश जोशी',
    nameEn: 'Shri Rajesh Joshi',
    roleHindi: 'लेखापाल',
    roleEn: 'Accountant & Finance Officer',
    category: 'admin',
    categoryLabel: 'प्रशासनिक एवं सहयोगी स्टाफ',
    subject: 'School Accounts & Financial Management (लेखा शाखा)',
    initials: 'RJ',
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 16,
    name: 'श्री गोवर्धनसिंह यादव',
    nameEn: 'Shri Govardhan Singh Yadav',
    roleHindi: 'सहा. ग्रेड-2',
    roleEn: 'Assistant Grade-2 (Administrative Staff)',
    category: 'admin',
    categoryLabel: 'प्रशासनिक एवं सहयोगी स्टाफ',
    subject: 'Office Administration & Records Management',
    initials: 'GY',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 17,
    name: 'श्री सुनील कुमार चौहान',
    nameEn: 'Shri Sunil Kumar Chauhan',
    roleHindi: 'सहा. ग्रेड-3',
    roleEn: 'Assistant Grade-3 (Administrative Staff)',
    category: 'admin',
    categoryLabel: 'प्रशासनिक एवं सहयोगी स्टाफ',
    subject: 'Documentation, Scholarships & Student Records',
    initials: 'SC',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 18,
    name: 'श्री रमण कुशवाह',
    nameEn: 'Shri Raman Kushwah',
    roleHindi: 'लेखापाल',
    roleEn: 'Accountant (Finance Section)',
    category: 'admin',
    categoryLabel: 'प्रशासनिक एवं सहयोगी स्टाफ',
    subject: 'Accounts, Budgeting & Audit Verification',
    initials: 'RK',
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 19,
    name: 'श्रीमती दीक्षा सक्सेना',
    nameEn: 'Smt. Deeksha Saxena',
    roleHindi: 'व्यवसायिक शिक्षक IT/ITES',
    roleEn: 'Vocational Trainer - IT/ITES',
    category: 'vocational',
    categoryLabel: 'व्यवसायिक शिक्षक',
    subject: 'Information Technology & ITES Digital Lab Incharge',
    initials: 'DS',
    color: 'from-purple-600 to-indigo-700'
  },
  {
    id: 20,
    name: 'श्रीमती रुचि नागर',
    nameEn: 'Smt. Ruchi Nagar',
    roleHindi: 'व्यवसायिक शिक्षक',
    roleEn: 'Vocational Teacher - Skill Development',
    category: 'vocational',
    categoryLabel: 'व्यवसायिक शिक्षक',
    subject: 'Vocational & Practical Skill Education',
    initials: 'RN',
    color: 'from-pink-600 to-rose-700'
  },
  {
    id: 21,
    name: 'श्रीमती आरती यादव',
    nameEn: 'Smt. Aarti Yadav',
    roleHindi: 'प्री प्राइमरी शिक्षक',
    roleEn: 'Pre-Primary Teacher (ECCE)',
    category: 'tgt',
    categoryLabel: 'माध्यमिक एवं प्राथमिक शिक्षक',
    subject: 'Early Childhood Care & Foundational Learning',
    initials: 'AY',
    color: 'from-amber-600 to-yellow-600'
  },
  {
    id: 22,
    name: 'श्री नारायणसिंह वर्मा',
    nameEn: 'Shri Narayan Singh Verma',
    roleHindi: 'भृत्य',
    roleEn: 'Support Staff (Campus Logistics)',
    category: 'admin',
    categoryLabel: 'प्रशासनिक एवं सहयोगी स्टाफ',
    subject: 'Campus Operations & Administrative Support',
    initials: 'NV',
    color: 'from-slate-600 to-slate-700'
  },
  {
    id: 23,
    name: 'श्री रमेशचन्द्र सेन',
    nameEn: 'Shri Rameshchandra Sen',
    roleHindi: 'भृत्य',
    roleEn: 'Support Staff (Campus Services)',
    category: 'admin',
    categoryLabel: 'प्रशासनिक एवं सहयोगी स्टाफ',
    subject: 'Campus Maintenance & Utility Support',
    initials: 'RS',
    color: 'from-slate-600 to-slate-700'
  },
  {
    id: 24,
    name: 'श्री जितेन्द्र दुंगारिया',
    nameEn: 'Shri Jitendra Dungariya',
    roleHindi: 'भृत्य',
    roleEn: 'Support Staff (Campus Services)',
    category: 'admin',
    categoryLabel: 'प्रशासनिक एवं सहयोगी स्टाफ',
    subject: 'School Premises & Facility Maintenance',
    initials: 'JD',
    color: 'from-slate-600 to-slate-700'
  },
  {
    id: 25,
    name: 'सुश्री राधा दांगी',
    nameEn: 'Ms. Radha Dangi',
    roleHindi: 'अ.शि. ग्रेड-1 हिन्दी',
    roleEn: 'Guest Teacher Grade-1 - Hindi',
    category: 'guest',
    categoryLabel: 'अतिथि शिक्षक एवं प्रयोगशाला',
    subject: 'Hindi Language & Literature (हिंदी)',
    initials: 'RD',
    color: 'from-cyan-600 to-teal-700'
  },
  {
    id: 26,
    name: 'श्रीमती सुलेचना दांगी',
    nameEn: 'Smt. Sulechna Dangi',
    roleHindi: 'अ.शि. ग्रेड-1 समाज शास्त्र',
    roleEn: 'Guest Teacher Grade-1 - Sociology',
    category: 'guest',
    categoryLabel: 'अतिथि शिक्षक एवं प्रयोगशाला',
    subject: 'Sociology & Social Sciences (समाज शास्त्र)',
    initials: 'SD',
    color: 'from-indigo-600 to-blue-700'
  },
  {
    id: 27,
    name: 'श्रीमती एकता आचार्य',
    nameEn: 'Smt. Ekta Acharya',
    roleHindi: 'अ.शि. जीव विज्ञान',
    roleEn: 'Guest Teacher - Biology',
    category: 'guest',
    categoryLabel: 'अतिथि शिक्षक एवं प्रयोगशाला',
    subject: 'Biology & Life Sciences (जीव विज्ञान)',
    initials: 'EA',
    color: 'from-emerald-600 to-green-700'
  },
  {
    id: 28,
    name: 'श्रीमती रानी शर्मा',
    nameEn: 'Smt. Rani Sharma',
    roleHindi: 'अ.शि. वर्ग-2 अंग्रेजी',
    roleEn: 'Guest Teacher Grade-2 - English',
    category: 'guest',
    categoryLabel: 'अतिथि शिक्षक एवं प्रयोगशाला',
    subject: 'English Communication & Grammar (अंग्रेजी)',
    initials: 'RS',
    color: 'from-violet-600 to-purple-700'
  },
  {
    id: 29,
    name: 'श्रीमती सोनू शर्मा',
    nameEn: 'Smt. Sonu Sharma',
    roleHindi: 'अ.शि. वर्ग-2 गणित',
    roleEn: 'Guest Teacher Grade-2 - Mathematics',
    category: 'guest',
    categoryLabel: 'अतिथि शिक्षक एवं प्रयोगशाला',
    subject: 'Mathematics & Logical Problem Solving (गणित)',
    initials: 'SS',
    color: 'from-blue-600 to-cyan-700'
  },
  {
    id: 30,
    name: 'श्री शिव यादव',
    nameEn: 'Shri Shiv Yadav',
    roleHindi: 'अ.शि. प्रयोगशाला सहायक',
    roleEn: 'Guest Laboratory Assistant',
    category: 'guest',
    categoryLabel: 'अतिथि शिक्षक एवं प्रयोगशाला',
    subject: 'Physics, Chemistry & Biology Practical Laboratories',
    initials: 'SY',
    color: 'from-teal-600 to-emerald-700'
  }
];

export default function Faculty() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (key) => {
    setSelectedCategory(key);
    const el = document.getElementById('faculty');
    if (el) {
      const rect = el.getBoundingClientRect();
      const navbarOffset = 80;
      if (rect.top < -10 || rect.top > 120) {
        const targetY = window.pageYOffset + rect.top - navbarOffset;
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });
      }
    }
  };

  const principal = officialFacultyList.find((f) => f.isPrincipal);

  const categories = [
    { key: 'all', label: 'सभी स्टाफ', count: 30 },
    { key: 'pgt', label: 'उच्च माध्यमिक (PGT)', count: 7 },
    { key: 'tgt', label: 'माध्यमिक व प्राथमिक (TGT/PRT)', count: 7 },
    { key: 'vocational', label: 'व्यवसायिक शिक्षक (IT/Vocational)', count: 2 },
    { key: 'guest', label: 'अतिथि शिक्षक व लैब', count: 6 },
    { key: 'admin', label: 'प्रशासनिक व सहयोगी स्टाफ', count: 7 }
  ];

  const filteredFaculty = useMemo(() => {
    return officialFacultyList.filter((staff) => {
      // Exclude principal from the generic grid if in 'all' view to give him the hero spot,
      // or show if category matches leadership
      if (staff.isPrincipal && selectedCategory !== 'leadership') {
        return false;
      }

      const matchesCat =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'leadership'
          ? staff.isPrincipal
          : staff.category === selectedCategory;

      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        staff.name.toLowerCase().includes(q) ||
        staff.nameEn.toLowerCase().includes(q) ||
        staff.roleHindi.toLowerCase().includes(q) ||
        staff.roleEn.toLowerCase().includes(q) ||
        staff.subject.toLowerCase().includes(q) ||
        String(staff.id) === q
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faculty" className="py-20 bg-gradient-to-b from-white via-brand-cream/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-orange-100/80 px-3.5 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span>PM SHRI Official Faculty & Staff Directory</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
            Our Dedicated Faculty & Mentors
          </h2>

          <p className="font-hindi text-base sm:text-lg text-slate-600 leading-relaxed">
            शासकीय कन्या उच्चतर माध्यमिक विद्यालय खुजनेर — 30 समर्पित शिक्षकों व प्रशासनिक अधिकारियों का आधिकारिक दल
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              <Users className="w-3.5 h-3.5 text-brand-orange" />
              <span>30 Total Staff</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>15 PGT / TGT / PRT</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-purple-600" />
              <span>2 Vocational & IT</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Govt. MP Education Dept</span>
            </span>
          </div>
        </div>

        {/* 1. Featured Principal Hero Card */}
        {principal && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
                {/* Principal Avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-400 via-brand-orange to-brand-red p-1 shadow-2xl flex-shrink-0">
                  <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center text-white">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-300">
                      HS
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-orange-200">
                      Rank #1
                    </span>
                  </div>
                </div>

                {/* Principal Info */}
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Institutional Leadership • प्राचार्य डेस्क</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                    {principal.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-300">
                    {principal.nameEn} — <span className="text-amber-400 font-bold">{principal.roleHindi}</span> ({principal.roleEn})
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-hindi pt-1">
                    "हमारा ध्येय प्रत्येक बालिका को आधुनिक, संस्कारयुक्त एवं गुणवत्तापूर्ण शिक्षा प्रदान कर आत्मनिर्भर बनाना है। पीएम श्री योजना के तहत विद्यालय में डिजिटल अध्ययन, विज्ञान प्रयोगशालाएं एवं कौशल विकास निरंतर प्रगति पर हैं।"
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto flex-shrink-0 pt-2">
                <a
                  href={`tel:${principal.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold px-5 py-3 rounded-xl hover:opacity-95 shadow-lg shadow-orange-500/20 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call: {principal.phone}</span>
                </a>
                <a
                  href={`mailto:${principal.email}`}
                  className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-5 py-3 rounded-xl border border-white/15 backdrop-blur-md transition-colors"
                >
                  <Mail className="w-4 h-4 text-orange-300" />
                  <span>Email Principal Desk</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 2. Filter Tabs & Search Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-orange-100 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Horizontal Category Buttons */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((c) => {
                const active = selectedCategory === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => handleCategorySelect(c.key)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                      active
                        ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-orange-500/20'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search staff (राजनीति, गणित, IT, नाम)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange bg-slate-50 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Showing: <strong className="text-slate-900">{filteredFaculty.length + (selectedCategory === 'all' && !searchQuery ? 1 : 0)}</strong> Staff Members
            </span>
            <span className="font-hindi text-[11px] text-brand-orange font-medium">
              शासकीय कन्या उच्चतर माध्यमिक विद्यालय खुजनेर (राजगढ़)
            </span>
          </div>
        </div>

        {/* 3. Faculty Grid (Staff Cards) */}
        {filteredFaculty.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-heading font-bold text-lg text-slate-700">कोई शिक्षक अथवा स्टाफ नहीं मिला</h4>
            <p className="text-xs text-slate-500">
              कृपया खोज शब्द या चुने गए फ़िल्टर को बदल कर पुनः प्रयास करें।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-brand-orange hover:underline pt-2"
            >
              सभी स्टाफ देखें (Reset Filters)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredFaculty.map((staff) => (
                <motion.div
                  key={staff.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl p-5 border border-orange-100/80 shadow-sm hover:shadow-xl hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Serial Badge & Category Tag */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-slate-400 group-hover:text-brand-orange transition-colors">
                        क्र. #{staff.id}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-brand-orange transition-colors">
                        {staff.categoryLabel}
                      </span>
                    </div>

                    {/* Avatar & Name */}
                    <div className="flex items-start space-x-3.5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${staff.color} text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}>
                        {staff.initials}
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-brand-orange transition-colors leading-snug">
                          {staff.name}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium truncate">
                          {staff.nameEn}
                        </p>
                      </div>
                    </div>

                    {/* Official Designation Banner */}
                    <div className="bg-orange-50/60 rounded-2xl p-2.5 border border-orange-100/60 space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                        <span className="font-hindi text-xs font-bold text-brand-orange">
                          {staff.roleHindi}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-600 pl-5 leading-tight">
                        {staff.roleEn}
                      </p>
                    </div>

                    {/* Subject / Department */}
                    <div className="text-xs text-slate-600 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                        Subject / Department:
                      </span>
                      <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                        {staff.subject}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1 text-emerald-600 font-medium">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Govt. Girls HSS</span>
                    </span>
                    <span className="text-[10px] bg-slate-50 px-2 py-0.5 rounded-md font-semibold text-slate-500">
                      Khujner
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* 4. Official Trust & Verification Seal Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-slate-700">
              <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                Official Institutional Staff Registry • शासकीय कन्या उच्चतर माध्यमिक विद्यालय खुजनेर
              </h4>
              <p className="text-slate-600 leading-relaxed font-hindi">
                उपरोक्त सभी 30 शिक्षक एवं कर्मचारी मध्य प्रदेश स्कूल शिक्षा विभाग एवं पीएम श्री योजना के तहत विद्यालय में कार्यरत हैं। किसी भी शैक्षणिक परामर्श अथवा प्रशासनिक कार्य हेतु विद्यालय समय (सुबह 10:30 से शाम 4:30) में संपर्क कर सकते हैं।
              </p>
            </div>
          </div>

          <a
            href="tel:9575962662"
            className="flex-shrink-0 inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Principal Office</span>
          </a>
        </div>

      </div>
    </section>
  );
}
