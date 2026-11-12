import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Search, Sparkles, Award, ShieldCheck, 
  PhoneCall, Mail, Users, Briefcase, BookOpen, CheckCircle2,
  Building, Phone, ArrowLeft, Filter, UserCheck
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { officialFacultyList, facultyCategories, getPrincipal } from '../data/facultyData';

export default function FacultyPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const principal = getPrincipal();

  // Scroll to top of directory on filter click if needed
  const handleCategorySelect = (key) => {
    setSelectedCategory(key);
  };

  const filteredFaculty = useMemo(() => {
    return officialFacultyList.filter((staff) => {
      // Category filter
      const matchesCat =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'leadership'
          ? staff.isPrincipal
          : staff.category === selectedCategory;

      if (!matchesCat) return false;

      // Search query filter
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
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <SEO
        title="Official Faculty & Staff Directory (30 Members)"
        description="Official faculty & staff directory of PM SHRI Govt Girls Higher Secondary School, Khujner, District Rajgarh (M.P.). Meet Principal Shri Hitesh Soni and all 30 qualified lecturers, secondary teachers, vocational trainers, and staff."
        keywords="PM SHRI Khujner faculty, Khujner school teachers list, Hitesh Soni Principal Khujner, Govt girls school Khujner staff, MP school faculty directory"
        canonicalPath="/faculty"
      />

      {/* 1. Hero Header Banner */}
      <section className="relative bg-gradient-to-br from-brand-dark via-slate-900 to-brand-purple text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff6b35_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>Official Government Cadre Directory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Our Dedicated Faculty <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-brand-saffron">
                & Mentors (30 Members)
              </span>
            </h1>

            <p className="font-hindi text-base sm:text-xl text-slate-300 font-medium leading-relaxed">
              शासकीय कन्या उच्चतर माध्यमिक विद्यालय, खुजनेर — अनुभवी प्राचार्य, व्याख्याता, व्यवसायिक प्रशिक्षक एवं सहयोगी स्टाफ
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>UDISE: <strong className="text-white">23300137920</strong></span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Total Staff: <strong className="text-white">30 Members</strong></span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>MP Govt Verified Cadre</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        
        {/* 2. Key Stats Strip (4 Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 text-center">
            <div className="text-3xl font-extrabold text-slate-900">30</div>
            <p className="text-xs font-semibold uppercase text-slate-500 mt-1">Total Dedicated Staff</p>
            <p className="text-[10px] text-slate-400 font-hindi">कुल अधिकृत स्टाफ संख्या</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 text-center">
            <div className="text-3xl font-extrabold text-brand-orange">07</div>
            <p className="text-xs font-semibold uppercase text-slate-500 mt-1">PGT Lecturers</p>
            <p className="text-[10px] text-slate-400 font-hindi">उच्च माध्यमिक शिक्षक</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 text-center">
            <div className="text-3xl font-extrabold text-blue-600">09</div>
            <p className="text-xs font-semibold uppercase text-slate-500 mt-1">TGT / PRT & Voc.</p>
            <p className="text-[10px] text-slate-400 font-hindi">माध्यमिक, प्रा. एवं IT शिक्षक</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 text-center">
            <div className="text-3xl font-extrabold text-emerald-600">14</div>
            <p className="text-xs font-semibold uppercase text-slate-500 mt-1">Guest, Lab & Admin</p>
            <p className="text-[10px] text-slate-400 font-hindi">अतिथि शिक्षक, लैब व प्रशासन</p>
          </div>
        </div>

        {/* 3. Principal Leadership Spotlight Card */}
        {principal && (
          <div className="bg-gradient-to-br from-amber-500/10 via-white to-orange-500/10 rounded-3xl p-6 sm:p-10 border-2 border-amber-300/80 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-4 flex flex-col items-center sm:flex-row lg:flex-col text-center sm:text-left lg:text-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-0 lg:space-y-4">
                <div className="relative">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl border-4 border-white">
                    {principal.initials}
                  </div>
                  <span className="absolute -bottom-2.5 inset-x-0 mx-auto w-max bg-amber-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                    Institutional Head
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                    {principal.name}
                  </h3>
                  <p className="text-sm font-semibold text-slate-600 mt-0.5">
                    {principal.nameEn}
                  </p>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-1">
                    {principal.roleHindi} • {principal.roleEn}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Principal's Desk • PM SHRI Girls HSS Khujner</span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-hindi italic bg-white/80 p-5 rounded-2xl border border-amber-200/60 shadow-sm">
                  "हमारा ध्येय बालिकाओं को न केवल अकादमिक ज्ञान प्रदान करना है, बल्कि उनमें आत्मविश्वास, संस्कार, आधुनिक डिजिटल कौशल और नेतृत्व क्षमता का विकास करना है ताकि वे राष्ट्र निर्माण में अग्रणी भूमिका निभा सकें।"
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <a
                    href={`tel:${principal.phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-amber-200/80 text-slate-700 hover:text-brand-orange hover:border-brand-orange transition-all shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Direct Telephone</span>
                      <strong className="text-slate-900">{principal.phone}</strong>
                    </div>
                  </a>

                  <a
                    href={`mailto:${principal.email}`}
                    className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-amber-200/80 text-slate-700 hover:text-brand-orange hover:border-brand-orange transition-all shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-100 text-brand-red flex items-center justify-center">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Official Email</span>
                      <strong className="text-slate-900 truncate block">{principal.email}</strong>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Interactive Search & Category Filter Toolbar */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="शिक्षक का नाम, विषय या पद खोजें (Search by Name, Subject, Role)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs sm:text-sm text-slate-500 font-medium flex items-center space-x-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                Showing <strong>{filteredFaculty.length}</strong> of <strong>{officialFacultyList.length}</strong> Staff Members
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            {facultyCategories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategorySelect(cat.key)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center space-x-2 flex-shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-orange-500/20'
                      : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-brand-orange border border-slate-200/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Complete 30-Faculty Directory Grid */}
        <div className="space-y-6">
          {filteredFaculty.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredFaculty.map((staff, idx) => {
                  return (
                    <motion.div
                      key={staff.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.3) }}
                      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                    >
                      <div className="space-y-4">
                        {/* Header: Sr No Badge & Category Tag */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-orange-50 text-brand-orange font-bold text-xs border border-orange-200/60">
                            #{staff.id}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            {staff.categoryLabel}
                          </span>
                        </div>

                        {/* Avatar & Names */}
                        <div className="flex items-center space-x-4 pt-1">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${staff.color} text-white flex items-center justify-center font-extrabold text-base shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
                          >
                            {staff.initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-heading font-extrabold text-slate-900 text-base leading-snug group-hover:text-brand-orange transition-colors truncate">
                              {staff.name}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium truncate">
                              {staff.nameEn}
                            </p>
                            <div className="flex items-center space-x-1 mt-0.5">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span className="text-[11px] font-bold text-brand-orange font-hindi">
                                {staff.roleHindi}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Subject & Specialization Box */}
                        <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 space-y-1">
                          <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>विषय / कार्यक्षेत्र (Specialization)</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                            {staff.subject}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Cadre & Verification */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px]">
                          {staff.roleEn}
                        </span>
                        <span className="inline-flex items-center space-x-1 text-emerald-600 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>सत्यापित स्टाफ</span>
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-4">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900">
                कोई शिक्षक या स्टाफ नहीं मिला
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                "{searchQuery}" के लिए कोई परिणाम नहीं मिला। कृपया वर्तनी जांचें अथवा फ़िल्टर रीसेट करें।
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:opacity-95 transition-all"
              >
                <span>सभी 30 स्टाफ देखें (Reset Filters)</span>
              </button>
            </div>
          )}
        </div>

        {/* 6. Contact Office / Administrative Desk Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 text-orange-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Building className="w-3.5 h-3.5 text-brand-orange" />
              <span>School Administration & Staff Inquiries</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              शिक्षक अथवा कार्यालयीन संपर्क हेतु
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-hindi">
              अभिभावक एवं विद्यार्थी शिक्षकों अथवा प्राचार्य महोदय से परामर्श हेतु विद्यालयीन समय (सोमवार से शनिवार सुबह 10:00 बजे से दोपहर 3:00 बजे तक) कार्यालय में संपर्क कर सकते हैं।
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Administrative Desk</span>
              </Link>
              <a
                href="tel:9575962662"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all"
              >
                <span>📞 Principal Helpline: +91 95759 62662</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
