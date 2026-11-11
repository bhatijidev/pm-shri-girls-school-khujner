import React, { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/library/BookCard';
import CategoryFilter from '../components/library/CategoryFilter';
import Loading from '../components/ui/Loading';
import { BookOpen, Search, ShieldCheck, ChevronLeft, ChevronRight, Sparkles, Filter, Layers } from 'lucide-react';

export default function LibraryPage() {
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { books, categories, pagination, loading, error, params, setParams } = useBooks({
    page: 1,
    limit: 24,
    category: '',
    class: '',
    search: ''
  });

  const handleCategorySelect = (catId) => {
    setActiveCategoryId(catId);
    setParams((prev) => ({
      ...prev,
      page: 1,
      category: catId
    }));
  };

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setParams((prev) => ({
      ...prev,
      page: 1,
      class: cls
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

  return (
    <div className="py-12 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
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

        {/* Filter Bar & Search */}
        <div className="space-y-4">
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
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Select Grade:</span>
              <select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-sm"
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
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-slate-700">No books found</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your category filter, grade, or search keyword.
            </p>
            <button
              onClick={() => {
                setActiveCategoryId('');
                setSelectedClass('');
                setSearchTerm('');
                setParams({ page: 1, limit: 16, category: '', class: '', search: '' });
              }}
              className="text-xs font-bold text-brand-orange hover:underline"
            >
              Reset All Filters
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
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-slate-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
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
