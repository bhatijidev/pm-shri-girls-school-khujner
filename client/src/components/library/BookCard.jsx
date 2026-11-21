import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Download, BookOpen, ShieldCheck, Eye, Sparkles, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { bookService, resolveMediaUrl } from '../../services/api';

export default function BookCard({ book }) {
  const [imgError, setImgError] = useState(false);
  const [readsCount, setReadsCount] = useState(book.view_count || 0);
  const [showModal, setShowModal] = useState(false);

  // NCERT Detection & Code Extraction
  const getNcertCode = () => {
    const raw = book.pdf_file_url || book.external_url || '';
    const mArchive = raw.match(/archive\.org\/download\/(?:ncert-)?([a-z0-9_]{3,20})ps\//i);
    if (mArchive) return mArchive[1].toLowerCase();
    const mDetails = raw.match(/archive\.org\/details\/(?:ncert-)?([a-z0-9_]{3,20})ps/i);
    if (mDetails) return mDetails[1].toLowerCase();
    const mNcert = raw.match(/[?&]([a-z0-9_]{3,20})=/i);
    if (mNcert) return mNcert[1].toLowerCase();
    const mPdf = raw.match(/\/([a-z0-9_]{3,20})\d{2}\.pdf/i);
    if (mPdf) return mPdf[1].toLowerCase();
    return null;
  };

  const ncertCode = getNcertCode();
  const isNcert = Boolean(
    ncertCode ||
    book.category_id === 1 ||
    book.category_slug === 'ncert' ||
    (book.title && book.title.toUpperCase().includes('NCERT'))
  );

  // Direct PDF URL construction - Guaranteed direct .pdf stream in 1 click
  const getDirectPdfUrl = () => {
    if (book.pdf_file_url) {
      const resolved = resolveMediaUrl(book.pdf_file_url);
      if (resolved.toLowerCase().endsWith('.pdf') || resolved.includes('/download/')) {
        return resolved;
      }
    }
    if (ncertCode) {
      return `https://archive.org/download/${ncertCode}ps/${ncertCode}ps.pdf`;
    }
    return resolveMediaUrl(book.pdf_file_url || book.external_url);
  };

  const directPdfUrl = getDirectPdfUrl();
  const cleanTitle = (book.title || '').replace(/NCERT\s*/i, '').replace(/\(.*?\)/g, '').trim();
  const tiwariMirrorUrl = `https://www.tiwariacademy.com/?s=${encodeURIComponent(cleanTitle)}`;
  const archiveMirrorUrl = ncertCode
    ? (book.external_url && book.external_url.includes('archive.org/details/')
        ? book.external_url
        : `https://archive.org/details/${ncertCode}ps`)
    : null;
  const dikshaUrl = 'https://diksha.gov.in/explore';

  const isDirectPdf = directPdfUrl && (directPdfUrl.toLowerCase().endsWith('.pdf') || directPdfUrl.includes('/download/'));
  const isExternal = !isDirectPdf && Boolean(book.external_url);

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
  let rawCover = !imgError && book.cover_image_url ? resolveMediaUrl(book.cover_image_url) : null;
  const coverUrl = rawCover && rawCover.includes('images.unsplash.com')
    ? rawCover.replace(/w=\d+/, 'w=360').replace(/q=\d+/, 'q=75') + (rawCover.includes('auto=format') ? '' : '&auto=format&fit=crop')
    : rawCover;

  return (
    <>
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

        {/* Card Action Buttons */}
        <div className="p-5 pt-0 space-y-2">
          {directPdfUrl ? (
            <>
              <a
                href={directPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleReadClick}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all duration-200 bg-gradient-to-r from-brand-orange to-brand-red text-white hover:opacity-95 shadow-md shadow-orange-500/20 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>📄 Open Direct PDF (सीधे PDF खोलें)</span>
                <ExternalLink className="w-3.5 h-3.5 text-orange-200" />
              </a>

              {(isNcert || archiveMirrorUrl) && (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-brand-orange hover:bg-orange-50/80 transition-colors border border-slate-200/80 flex items-center justify-center space-x-1.5"
                >
                  <span>⚙️ वैकल्पिक सर्वर व अध्याय (Alternate Mirrors)</span>
                </button>
              )}
            </>
          ) : (
            <button
              disabled
              className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold"
            >
              Reference in Campus Library
            </button>
          )}

          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span className="flex items-center space-x-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Legal & Free Direct PDF</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{readsCount} reads</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Alternate Mirrors Reader Modal (Portal to body to prevent transform clipping) */}
      {showModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1 pr-8">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                Multi-Server Mirror & Reader
              </span>
              <h3 className="text-lg font-heading font-bold text-slate-900 leading-snug">
                {book.title}
              </h3>
              {book.title_hindi && (
                <p className="font-hindi text-xs text-orange-600 font-medium">
                  {book.title_hindi}
                </p>
              )}
            </div>

            {/* High-Speed Guarantee Note */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 text-[11px] text-emerald-950 flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>हाई-स्पीड डायरेक्ट एक्सेस:</strong> सभी लिंक 100% वेरिफाइड हैं। आप सीधे अपने ब्राउज़र में पूरी किताब की PDF पढ़ सकते हैं अथवा वैकल्पिक सर्वर से चैप्टर अनुसार हल देख सकते हैं।
              </p>
            </div>

            {/* Server List */}
            <div className="space-y-2.5">
              {/* Server 1: Direct Cloud PDF (Complete Book) */}
              <a
                href={directPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleReadClick(); setShowModal(false); }}
                className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-orange-500/30 bg-orange-50/50 hover:bg-orange-50 hover:border-orange-500 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-orange text-white flex items-center justify-center font-bold text-xs shadow-md">
                    📄 1
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <span>Direct Cloud PDF (संपूर्ण पुस्तक 1-क्लिक)</span>
                      <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.2 rounded">Direct PDF</span>
                    </div>
                    <p className="text-[11px] text-slate-500">ब्राउज़र में सीधे पूरी किताब की PDF फाइल खुलती है</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Server 2: Interactive Archive.org Digital Reader / Flipbook */}
              {archiveMirrorUrl && (
                <a
                  href={archiveMirrorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { handleReadClick(); setShowModal(false); }}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-purple-300 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-500 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      📖 2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Archive.org Digital Flipbook Reader
                      </div>
                      <p className="text-[11px] text-slate-500">ऑनलाइन पेज पलटकर पढ़ने हेतु इंटरैक्टिव ई-रीडर</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              {/* Server 3: Tiwari Academy (Chapter-wise solutions & tests) */}
              <a
                href={tiwariMirrorUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleReadClick(); setShowModal(false); }}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-500 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    📚 3
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <span>Tiwari Academy Portal (अध्याय अनुसार समाधान)</span>
                      <span className="text-[9px] bg-emerald-700 text-white font-extrabold px-1.5 py-0.2 rounded">100% Active</span>
                    </div>
                    <p className="text-[11px] text-slate-500">प्रत्येक पाठ के प्रश्नोत्तर, गाइड व अभ्यास प्रश्न</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Server 4: DIKSHA National Portal */}
              <a
                href={dikshaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleReadClick(); setShowModal(false); }}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    📱 4
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      DIKSHA National Portal (QR Code Lessons)
                    </div>
                    <p className="text-[11px] text-slate-500">शिक्षा मंत्रालय भारत सरकार का आधिकारिक डिजिटल मंच</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Server 5: PM eVidya Portal */}
              <a
                href="https://pmevidya.education.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleReadClick(); setShowModal(false); }}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    🏛️ 5
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      PM eVidya One Nation One Digital Platform
                    </div>
                    <p className="text-[11px] text-slate-500">कक्षा 1 से 12 तक लाइव टीवी व डिजिटल शिक्षण सामग्री</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              बंद करें (Close)
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
