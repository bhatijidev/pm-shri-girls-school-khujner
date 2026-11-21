import React, { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import { useBooks } from '../hooks/useBooks';
import { bookService } from '../services/api';
import BookCard from '../components/library/BookCard';
import CategoryFilter from '../components/library/CategoryFilter';
import Loading from '../components/ui/Loading';
import { 
  BookOpen, Search, ShieldCheck, ChevronLeft, ChevronRight, Sparkles, 
  Filter, Layers, AlertCircle, Languages, GraduationCap, X, RotateCcw 
} from 'lucide-react';

export default function LibraryPage() {
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMeta, setFilterMeta] = useState({ languages: [], subjects: [] });

  const { books, categories, pagination, loading, error, params, setParams } = useBooks({
    page: 1,
    limit: 24,
    category: '',
    class: '',
    language: '',
    subject: '',
    search: ''
  });

  // Fetch dynamic subjects and languages based on active class & category selection
  useEffect(() => {
    let isMounted = true;
    const loadMeta = async () => {
      try {
        const res = await bookService.getFilterMeta({
          class: selectedClass,
          category: activeCategoryId,
          language: selectedLanguage
        });
        if (isMounted && res.success && res.data) {
          setFilterMeta(res.data);
        }
      } catch (e) {
        console.error('Failed to load filter metadata', e);
      }
    };
    loadMeta();
    return () => { isMounted = false; };
  }, [selectedClass, activeCategoryId, selectedLanguage]);

  const handleCategorySelect = (catId) => {
    setActiveCategoryId(catId);
    setSelectedSubject('');
    setParams((prev) => ({
      ...prev,
      page: 1,
      category: catId,
      subject: ''
    }));
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setSelectedSubject('');
    setParams((prev) => ({
      ...prev,
      page: 1,
      class: cls,
      subject: ''
    }));
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setParams((prev) => ({
      ...prev,
      page: 1,
      language: lang
    }));
  };

  const handleSubjectChange = (subj) => {
    setSelectedSubject(subj);
    setParams((prev) => ({
      ...prev,
      page: 1,
      subject: subj
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setParams((prev) => ({
      ...prev,
      page: 1,
      search: searchTerm
    }));
  };

  const handleResetAll = () => {
    setActiveCategoryId('');
    setSelectedClass('');
    setSelectedLanguage('');
    setSelectedSubject('');
    setSearchTerm('');
    setParams({
      page: 1,
      limit: 24,
      category: '',
      class: '',
      language: '',
      subject: '',
      search: ''
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setParams((prev) => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 250, behavior: 'smooth' });
    }
  };

  const classFilters = [
    { label: 'All Grades (कक्षा 1 से 12)', value: '' },
    { label: 'Class 1', value: 'Class 1' },
    { label: 'Class 2', value: 'Class 2' },
    { label: 'Class 3', value: 'Class 3' },
    { label: 'Class 4', value: 'Class 4' },
    { label: 'Class 5', value: 'Class 5' },
    { label: 'Class 6', value: 'Class 6' },
    { label: 'Class 7', value: 'Class 7' },
    { label: 'Class 8', value: 'Class 8' },
    { label: 'Class 9', value: 'Class 9' },
    { label: 'Class 10', value: 'Class 10' },
    { label: 'Class 11', value: 'Class 11' },
    { label: 'Class 12', value: 'Class 12' },
    { label: 'All Ages / Competitive', value: 'All Ages' }
  ];

  const hasActiveFilters = Boolean(
    selectedClass || selectedLanguage || selectedSubject || activeCategoryId || searchTerm
  );

  return (
    <div className="py-12 bg-brand-cream min-h-screen">
      <SEO
        title="Digital E-Library (500+ Books & Textbooks)"
        description="Free online digital library of PM SHRI Girls HSS Khujner with 500+ official NCERT books for Class 1 to 12, MP Board textbooks, Vedic & Hindu literature, and competitive exam guides."
        keywords="NCERT books download, Class 1 to 12 NCERT PDF, MP Board ebooks, PM SHRI Khujner library, digital library Rajgarh"
        canonicalPath="/library"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Hero Banner */}
        <div className="gradient-hero-bg text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>Digital Knowledge Portal • PM SHRI School</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white leading-tight">
              E-Library & Digital Catalog
            </h1>

            <p className="font-hindi text-lg sm:text-xl text-orange-200">
              डिजिटल पुस्तकालय — कक्षा 1 से 12वीं तक सभी विषयों की पुस्तकें, एमपी बोर्ड व धर्म ग्रंथ
            </p>

            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Explore authentic textbooks, official government educational repositories, competitive examination question banks, and sacred heritage texts directly with zero copyright barriers.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Free & Legal Access via Official Government & Public Domain Portals</span>
            </div>
          </div>
        </div>

        {/* Server Health Notice for NCERT Outages */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-950 flex items-start space-x-3 shadow-sm">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-900">📚 24/7 ई-लाइब्रेरी डायरेक्ट PDF एक्सेस:</span>
            <p className="text-slate-600 leading-relaxed">
              सरकारी सर्वर (<code>ncert.nic.in</code>) के मेंटेनेंस इश्यू को हमेशा के लिए समाप्त करते हुए सभी 500+ पुस्तकों को <strong>हाई-स्पीड डायरेक्ट क्लाउड PDF</strong> से जोड़ दिया गया है — किसी भी पुस्तक के <strong>"📄 Open Direct PDF (सीधे PDF खोलें)"</strong> बटन पर क्लिक करते ही 1-क्लिक में पूरी पुस्तक की PDF आपके ब्राउज़र में तुरंत खुलती है।
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="space-y-3.5">
          {/* Categories Horizontal Tabs */}
          <CategoryFilter
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleCategorySelect}
          />

          {/* Search + Grade Filter Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by book title (Math, Physics, Gita, Chemistry, History...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-brand-red transition-colors"
              >
                Search
              </button>
            </form>

            {/* Class Grade Select */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Filter className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Select Grade:</span>
              <select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-sm cursor-pointer"
              >
                {classFilters.map((cls) => (
                  <option key={cls.value} value={cls.value}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Total count badge */}
            <div className="text-xs text-slate-500 font-medium px-2 whitespace-nowrap">
              <span>Showing: </span>
              <strong className="text-slate-900">{pagination.total || books.length}</strong> books
            </div>
          </div>

          {/* Language / Medium Filter Bar */}
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 flex-shrink-0">
              <Languages className="w-4 h-4 text-brand-orange" />
              <span>Language / माध्यम:</span>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none" data-scrollbar="none">
              <button
                onClick={() => handleLanguageChange('')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLanguage === ''
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-orange-50 hover:text-brand-orange border border-slate-200/80'
                }`}
              >
                All Languages (सभी)
              </button>

              <button
                onClick={() => handleLanguageChange('Hindi')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLanguage === 'Hindi'
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-brand-orange border border-slate-200/80'
                }`}
              >
                <span>🇮🇳 Hindi (हिंदी)</span>
              </button>

              <button
                onClick={() => handleLanguageChange('English')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLanguage === 'English'
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-brand-orange border border-slate-200/80'
                }`}
              >
                <span>🇬🇧 English (अंग्रेजी)</span>
              </button>

              <button
                onClick={() => handleLanguageChange('Sanskrit')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLanguage === 'Sanskrit'
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-700 text-white shadow-md shadow-amber-500/20'
                    : 'bg-slate-50 text-slate-700 hover:bg-amber-50 hover:text-amber-800 border border-slate-200/80'
                }`}
              >
                <span>🕉️ Sanskrit (संस्कृत)</span>
              </button>

              <button
                onClick={() => handleLanguageChange('Urdu')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLanguage === 'Urdu'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80'
                }`}
              >
                <span>📜 Urdu (उर्दू)</span>
              </button>
            </div>
          </div>

          {/* Dynamic Subject Filter Bar */}
          {filterMeta.subjects && filterMeta.subjects.length > 0 && (
            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-orange-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                  <GraduationCap className="w-4 h-4 text-brand-orange" />
                  <span>
                    {selectedClass ? `${selectedClass} के विषय (Subjects):` : 'विषय फ़िल्टर (Subjects):'}
                  </span>
                </div>
                {selectedSubject && (
                  <button
                    onClick={() => handleSubjectChange('')}
                    className="text-[11px] font-semibold text-brand-orange hover:underline flex items-center space-x-1"
                  >
                    <span>Clear Subject (सभी विषय देखें)</span>
                  </button>
                )}
              </div>

              {/* Horizontal Scrollable Subject Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none" data-scrollbar="none">
                <button
                  onClick={() => handleSubjectChange('')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedSubject === ''
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-orange-50 hover:text-brand-orange border border-slate-200/80'
                  }`}
                >
                  All Subjects (सभी)
                </button>

                {filterMeta.subjects.map((s) => {
                  const isSelected = selectedSubject === s.subject;
                  return (
                    <button
                      key={s.subject}
                      onClick={() => handleSubjectChange(isSelected ? '' : s.subject)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-orange-500/20'
                          : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-brand-orange border border-slate-200/80'
                      }`}
                    >
                      <span>{s.subject}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                      }`}>
                        {s.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex items-center flex-wrap gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">सक्रिय फ़िल्टर:</span>

              {activeCategoryId && (
                <span className="inline-flex items-center space-x-1.5 bg-orange-100 text-orange-950 px-2.5 py-1 rounded-xl font-bold">
                  <span>श्रेणी: {categories.find(c => String(c.id) === String(activeCategoryId))?.name || 'Category'}</span>
                  <button onClick={() => handleCategorySelect('')} className="hover:text-red-700" title="Remove category"><X className="w-3.5 h-3.5" /></button>
                </span>
              )}

              {selectedClass && (
                <span className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-900 px-2.5 py-1 rounded-xl font-bold">
                  <span>कक्षा: {selectedClass}</span>
                  <button onClick={() => handleClassChange('')} className="hover:text-red-700" title="Remove class"><X className="w-3.5 h-3.5" /></button>
                </span>
              )}

              {selectedLanguage && (
                <span className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-950 px-2.5 py-1 rounded-xl font-bold">
                  <span>माध्यम: {selectedLanguage}</span>
                  <button onClick={() => handleLanguageChange('')} className="hover:text-red-700" title="Remove language"><X className="w-3.5 h-3.5" /></button>
                </span>
              )}

              {selectedSubject && (
                <span className="inline-flex items-center space-x-1.5 bg-purple-100 text-purple-950 px-2.5 py-1 rounded-xl font-bold">
                  <span>विषय: {selectedSubject}</span>
                  <button onClick={() => handleSubjectChange('')} className="hover:text-red-700" title="Remove subject"><X className="w-3.5 h-3.5" /></button>
                </span>
              )}

              {searchTerm && (
                <span className="inline-flex items-center space-x-1.5 bg-slate-200 text-slate-800 px-2.5 py-1 rounded-xl font-bold">
                  <span>खोज: "{searchTerm}"</span>
                  <button onClick={() => { setSearchTerm(''); setParams(p => ({ ...p, page: 1, search: '' })); }} className="hover:text-red-700" title="Clear search"><X className="w-3.5 h-3.5" /></button>
                </span>
              )}

              <button
                onClick={handleResetAll}
                className="inline-flex items-center space-x-1 text-brand-orange hover:text-brand-red font-bold text-xs bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All (फ़िल्टर साफ़ करें)</span>
              </button>
            </div>
          )}
        </div>

        {/* Books Grid */}
        {loading ? (
          <Loading text="Loading books with cover images..." />
        ) : error ? (
          <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-3xl text-rose-700">
            <p className="font-bold">Error loading library</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : books.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl space-y-4">
            <BookOpen className="w-14 h-14 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-slate-800">कोई पुस्तक नहीं मिली (No books found)</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                चुने गए फ़िल्टर (कक्षा / माध्यम / विषय) के अनुसार कोई पुस्तक नहीं मिली। कृपया फ़िल्टर बदलें या सभी देखें।
              </p>
            </div>
            <button
              onClick={handleResetAll}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 hover:opacity-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>सभी फ़िल्टर साफ़ करें (Reset Filters)</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-3 pt-6">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-slate-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Legal & Copyright Transparency Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
              <h4 className="font-heading font-bold text-sm text-slate-900">
                100% Legal & Free Educational Access Disclaimer (कॉपीराइट एवं कानूनी सुरक्षा)
              </h4>
              <p>
                <strong>भारतीय कॉपीराइट अधिनियम, 1957 (धारा 52 - Fair Dealing in Education)</strong> एवं भारत सरकार के डिजिटल शिक्षण दिशा-निर्देशों के तहत, यह पोर्टल केवल छात्राओं और शिक्षकों की निःशुल्क शैक्षणिक सुविधा के लिए एक आधिकारिक डायरेक्ट इंडेक्स/कैटलॉग के रूप में कार्य करता है।
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-500 pt-1">
                <li><strong>No Hosting / No Piracy:</strong> कोई भी कॉपीराइटेड सामग्री हमारे सर्वर पर स्टोर नहीं है। सभी पुस्तकें NCERT (ncert.nic.in), मध्य प्रदेश विमर्श पोर्टल (vimarsh.mp.gov.in) एवं Archive.org के मूल सरकारी व पब्लिक डोमेन सर्वर्स से सीधे नए टैब में खोली जाती हैं।</li>
                <li><strong>Public Domain Heritage:</strong> हिन्दू धर्म ग्रंथ (भगवद्गीता, रामायण, उपनिषद) पब्लिक डोमेन एवं गीताप्रेस गोरखपुर के निःशुल्क अध्ययन भंडार से संदर्भित हैं।</li>
                <li><strong>PM SHRI Exemplar Mandate:</strong> यह विद्यालय भारत सरकार एवं मध्य प्रदेश स्कूल शिक्षा विभाग द्वारा संचालित एक शासकीय आदर्श संस्थान है, जिसका उद्देश्य बालिकाओं को डिजिटल शिक्षा व पठन सामग्री सुलभ कराना है।</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
