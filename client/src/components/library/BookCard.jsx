import React, { useState } from 'react';
import { ExternalLink, Download, BookOpen, ShieldCheck, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { bookService } from '../../services/api';

export default function BookCard({ book }) {
  const [imgError, setImgError] = useState(false);
  const [readsCount, setReadsCount] = useState(book.view_count || 0);
  const targetUrl = book.pdf_file_url || book.external_url;
  const isDirectPdf = targetUrl && (targetUrl.toLowerCase().endsWith('.pdf') || targetUrl.includes('/pdf/'));
  const isExternal = book.link_type === 'external' && !isDirectPdf;

  const handleReadClick = () => {
    setReadsCount((prev) => prev + 1);
    bookService.recordView(book.id);
  };

  // Fallback category colors if image fails
  const categoryGradients = {
    ncert: 'from-blue-600 via-indigo-700 to-blue-900',
    'mp-board': 'from-emerald-600 via-teal-700 to-emerald-900',
    cbse: 'from-red-600 via-rose-700 to-red-900',
    icse: 'from-orange-600 via-amber-700 to-orange-900',
    'hindu-dharm': 'from-amber-600 via-orange-600 to-yellow-800',
    competitive: 'from-purple-600 via-indigo-800 to-purple-950',
    'school-materials': 'from-cyan-600 via-blue-700 to-slate-900'
  };

  const gradient = categoryGradients[book.category_slug] || 'from-slate-700 to-slate-900';
  let rawCover = !imgError && book.cover_image_url ? book.cover_image_url : null;
  // Dynamic WebP optimization for Unsplash images
  const coverUrl = rawCover && rawCover.includes('images.unsplash.com')
    ? rawCover.replace(/w=\d+/, 'w=360').replace(/q=\d+/, 'q=75') + (rawCover.includes('auto=format') ? '' : '&auto=format&fit=crop')
    : rawCover;

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Real Book Cover Image Area with Spine & Overlay */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-900">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} p-5 flex flex-col justify-between`}>
              <BookOpen className="w-16 h-16 text-white/20 absolute -right-2 -bottom-2 pointer-events-none" />
              <span className="text-[10px] font-extrabold uppercase text-orange-200">
                {book.subject || 'Textbook'}
              </span>
              <h4 className="font-heading font-bold text-white text-base line-clamp-2">
                {book.title}
              </h4>
            </div>
          )}

          {/* Dark gradient overlay for readability of badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 pointer-events-none"></div>

          {/* Book spine aesthetic line on left */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/60 to-transparent"></div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
              {book.category_name || 'Library'}
            </span>
            {book.class_grade && (
              <span className="text-[10px] font-extrabold bg-gradient-to-r from-brand-orange to-brand-red text-white px-2.5 py-0.5 rounded-full shadow-sm">
                {book.class_grade}
              </span>
            )}
          </div>

          {/* Bottom title in cover */}
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <span className="text-[11px] font-semibold text-orange-300 uppercase tracking-wide block drop-shadow-sm">
              {book.subject || 'Curriculum'}
            </span>
            <h4 className="font-heading font-bold text-sm text-white line-clamp-2 drop-shadow-md">
              {book.title}
            </h4>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-5 space-y-3">
          {book.title_hindi && (
            <p className="font-hindi text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">
              {book.title_hindi}
            </p>
          )}

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {book.description || 'Official educational resource prescribed for student study.'}
          </p>

          <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
            {book.publisher && (
              <div className="flex items-center justify-between truncate">
                <span className="text-slate-400">Publisher:</span>
                <span className="font-medium text-slate-700 truncate ml-2">{book.publisher}</span>
              </div>
            )}
            {book.author && (
              <div className="flex items-center justify-between truncate">
                <span className="text-slate-400">Author:</span>
                <span className="font-medium text-slate-700 truncate ml-2">{book.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="p-5 pt-0">
        {targetUrl ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleReadClick}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all duration-200 bg-gradient-to-r from-brand-orange to-brand-red text-white hover:opacity-95 shadow-md shadow-orange-500/20"
          >
            {isDirectPdf ? (
              <>
                <BookOpen className="w-4 h-4 text-white" />
                <span>Open PDF Book (सीधे PDF पढ़ें)</span>
                <ExternalLink className="w-3 h-3 text-orange-200" />
              </>
            ) : isExternal ? (
              <>
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download Free E-Book</span>
              </>
            )}
          </a>
        ) : (
          <button
            disabled
            className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold"
          >
            Reference in Campus Library
          </button>
        )}

        <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span className="flex items-center space-x-1 text-emerald-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Legal & Free</span>
          </span>
          <span className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{readsCount} reads</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
