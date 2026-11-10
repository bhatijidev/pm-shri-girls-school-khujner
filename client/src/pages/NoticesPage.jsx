import React, { useState } from 'react';
import { useNotices } from '../hooks/useNotices';
import NoticeCard from '../components/notices/NoticeCard';
import NoticeDetail from '../components/notices/NoticeDetail';
import Loading from '../components/ui/Loading';
import { Bell, Search, Filter, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNotice, setActiveNotice] = useState(null);

  const { notices, pagination, loading, error, params, setParams } = useNotices({
    page: 1,
    limit: 10,
    category: '',
    search: ''
  });

  const categories = [
    { label: 'All Notices', value: '' },
    { label: '🔴 Urgent', value: 'urgent' },
    { label: 'Admissions', value: 'admission' },
    { label: 'Examinations', value: 'exam' },
    { label: 'Holidays', value: 'holiday' },
    { label: 'Results', value: 'result' },
    { label: 'General Circulars', value: 'general' }
  ];

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setParams((prev) => ({
      ...prev,
      page: 1,
      category: cat
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
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
              <Bell className="w-4 h-4 text-brand-orange animate-bounce" />
              <span>Official School Information Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
              School Notices & Circulars
            </h1>
            <p className="font-hindi text-lg text-orange-200">
              विद्यालय सूचना पटल, आधिकारिक आदेश एवं परीक्षा समय-सारणी
            </p>
            <p className="text-slate-400 text-sm">
              Live updates directly managed by the administration of PM SHRI Government Girls Higher Secondary School, Khujner.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-orange-100/80 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search circulars by keyword, exam, date..."
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

            {/* Quick status counter */}
            <div className="text-xs text-slate-500 font-medium px-2 flex items-center space-x-1">
              <span>Showing:</span>
              <strong className="text-slate-900">{pagination.total || notices.length}</strong>
              <span>circulars</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => {
              const active = selectedCategory === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => handleCategoryChange(c.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notices List */}
        {loading ? (
          <Loading text="Loading official notices..." />
        ) : error ? (
          <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-3xl text-rose-700">
            <p className="font-bold">Error loading circulars</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : notices.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl space-y-3">
            <Bell className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-slate-700">No notices found</h3>
            <p className="text-sm text-slate-500">
              No matching circulars were found for the selected category or search keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSearchTerm('');
                setParams({ page: 1, limit: 10, category: '', search: '' });
              }}
              className="text-xs font-bold text-brand-orange hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((n) => (
              <NoticeCard
                key={n.id}
                notice={n}
                onSelect={(notice) => setActiveNotice(notice)}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-3 pt-6">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-slate-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>

      {/* Modal for viewing single notice */}
      {activeNotice && (
        <NoticeDetail
          notice={activeNotice}
          onClose={() => setActiveNotice(null)}
        />
      )}
    </div>
  );
}
