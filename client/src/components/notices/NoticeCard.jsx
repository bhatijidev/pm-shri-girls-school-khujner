import React, { useState } from 'react';
import { Calendar, AlertCircle, FileText, Download, ChevronDown, ChevronUp, Tag } from 'lucide-react';

export default function NoticeCard({ notice, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  const categoryColors = {
    exam: 'bg-purple-100 text-purple-800 border-purple-200',
    admission: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    holiday: 'bg-amber-100 text-amber-800 border-amber-200',
    result: 'bg-blue-100 text-blue-800 border-blue-200',
    urgent: 'bg-rose-100 text-rose-800 border-rose-200',
    general: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  const badgeColor = categoryColors[notice.category] || categoryColors.general;

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div
      className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
        notice.is_urgent === 1
          ? 'border-l-4 border-l-rose-500 border-rose-200 bg-rose-50/20'
          : 'border-slate-200/80 hover:border-orange-200'
      }`}
    >
      <div className="p-5 sm:p-6 space-y-3">
        {/* Top meta bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
              {notice.category}
            </span>
            {notice.is_urgent === 1 && (
              <span className="flex items-center space-x-1 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                <AlertCircle className="w-3 h-3" />
                <span>Urgent</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatDate(notice.published_at)}</span>
          </div>
        </div>

        {/* Notice Title */}
        <div className="space-y-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 hover:text-brand-orange transition-colors">
            {notice.title}
          </h3>
          {notice.title_hindi && (
            <p className="font-hindi text-xs sm:text-sm text-slate-600">
              {notice.title_hindi}
            </p>
          )}
        </div>

        {/* Content Body Preview / Full */}
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
          {expanded ? (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <p className="whitespace-pre-line">{notice.content}</p>
              {notice.content_hindi && (
                <div className="p-3 bg-orange-50/60 rounded-xl font-hindi text-slate-700 text-xs sm:text-sm border border-orange-100">
                  {notice.content_hindi}
                </div>
              )}
            </div>
          ) : (
            <p className="line-clamp-2">{notice.content}</p>
          )}
        </div>

        {/* Actions bar */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
          {notice.attachment_url ? (
            <a
              href={notice.attachment_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-brand-orange hover:text-brand-red font-semibold py-1 px-2.5 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download Circular (PDF)</span>
              <Download className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-slate-400">Notice ID: #{notice.id}</span>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-600 hover:text-brand-orange font-medium flex items-center space-x-1 py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span>{expanded ? 'Show Less' : 'Read Full Notice'}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
