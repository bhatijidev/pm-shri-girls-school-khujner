import React from 'react';
import { X, Calendar, AlertCircle, FileText, Download, User } from 'lucide-react';
import { resolveMediaUrl } from '../../services/api';

export default function NoticeDetail({ notice, onClose }) {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-orange-100 text-brand-orange px-3 py-1 rounded-full">
              {notice.category}
            </span>
            {notice.is_urgent === 1 && (
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>Urgent Circular</span>
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 leading-snug">
              {notice.title}
            </h2>
            {notice.title_hindi && (
              <h3 className="font-hindi text-base sm:text-lg font-bold text-brand-orange">
                {notice.title_hindi}
              </h3>
            )}
            <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published: {new Date(notice.published_at).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
              </span>
              {notice.author_name && (
                <span className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5" />
                  <span>By: {notice.author_name}</span>
                </span>
              )}
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base border-t border-slate-100 pt-6">
            <p className="whitespace-pre-line">{notice.content}</p>

            {notice.content_hindi && (
              <div className="p-4 bg-orange-50/70 border border-orange-200/60 rounded-2xl font-hindi text-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block">
                  हिंदी अनुवाद / विवरण:
                </span>
                <p className="whitespace-pre-line leading-relaxed">{notice.content_hindi}</p>
              </div>
            )}
          </div>

          {/* Attachment Download Area */}
          {notice.attachment_url && (
            <div className="pt-4 border-t border-slate-100">
              <a
                href={resolveMediaUrl(notice.attachment_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white py-3.5 px-6 rounded-xl font-bold shadow-md hover:opacity-95 transition-all text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Download Attached Circular (PDF)</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>PM SHRI Govt. Girls Higher Secondary School, Khujner</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
