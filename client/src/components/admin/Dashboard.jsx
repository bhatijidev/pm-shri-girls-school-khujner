import React, { useState, useEffect } from 'react';
import { bookService } from '../../services/api';
import { BookOpen, Bell, Eye, AlertCircle, PlusCircle, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import Loading from '../ui/Loading';

export default function Dashboard({ setActiveTab }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await bookService.getStats();
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loading text="Loading admin analytics..." />;

  const statCards = [
    {
      title: 'Total Active Books',
      value: stats?.totalBooks || 0,
      icon: BookOpen,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      action: () => setActiveTab('books')
    },
    {
      title: 'Published Notices',
      value: stats?.totalNotices || 0,
      icon: Bell,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      action: () => setActiveTab('notices')
    },
    {
      title: 'Urgent Alert Notices',
      value: stats?.urgentNotices || 0,
      icon: AlertCircle,
      color: 'bg-rose-500',
      textColor: 'text-rose-600',
      action: () => setActiveTab('notices')
    },
    {
      title: 'Total Book Views',
      value: stats?.totalViews || 0,
      icon: Eye,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PM SHRI Khujner CMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Welcome, School Administrator
          </h2>
          <p className="text-sm text-slate-300">
            Publish urgent circulars, manage the digital e-library, and update school notifications in real-time.
          </p>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={() => setActiveTab('notices')}
            className="flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md hover:opacity-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Notice</span>
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Book / Resource</span>
          </button>
        </div>
      </div>

      {/* Stats 4-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={card.action}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all ${card.action ? 'cursor-pointer hover:border-brand-orange/40' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`w-10 h-10 rounded-xl ${card.color} text-white flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-heading font-extrabold text-slate-900">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Categories & Recent Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Categories Distribution */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Library Categories</h3>
              <p className="text-xs text-slate-500">Breakdown of books by syllabus and stream</p>
            </div>
            <button
              onClick={() => setActiveTab('books')}
              className="text-xs font-bold text-brand-orange hover:underline"
            >
              Manage Books →
            </button>
          </div>

          <div className="space-y-3">
            {stats?.categoryStats?.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-orange-50/60 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color || '#F7941D' }}
                  ></div>
                  <div>
                    <span className="text-sm font-bold text-slate-800">{cat.name}</span>
                    {cat.name_hindi && (
                      <span className="text-xs font-hindi text-slate-500 ml-2">
                        ({cat.name_hindi})
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
                  {cat.book_count} books
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Recent Notices</h3>
              <p className="text-xs text-slate-500">Live announcements visible on main site</p>
            </div>
            <button
              onClick={() => setActiveTab('notices')}
              className="text-xs font-bold text-brand-orange hover:underline"
            >
              Manage All →
            </button>
          </div>

          <div className="space-y-3">
            {stats?.recentNotices?.map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-orange-200 transition-colors space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-100 text-brand-orange">
                    {n.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(n.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                  {n.title}
                </h4>
                {n.title_hindi && (
                  <p className="text-xs font-hindi text-slate-500 line-clamp-1">
                    {n.title_hindi}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
