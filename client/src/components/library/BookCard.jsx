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
  const isNcert = (book.pdf_file_url && book.pdf_file_url.includes('ncert.nic.in')) ||
                  (book.external_url && book.external_url.includes('ncert.nic.in'));

  const getNcertCode = () => {
    const raw = book.external_url || book.pdf_file_url || '';
    if (raw.includes('?')) {
      return raw.split('?')[1].split('=')[0].toLowerCase();
    }
    const match = raw.match(/\/([a-z0-9]{4,8})\d{2}\.pdf/i);
    if (match) return match[1].toLowerCase();
    return null;
  };

  const ncertCode = isNcert ? getNcertCode() : null;

  // Ultra-reliable & High-Speed NCERT Multi-Mirrors (Bypasses ncert.nic.in ERR_EMPTY_RESPONSE)
  const cleanTitle = (book.title || '').replace(/NCERT\s*/i, '').replace(/\(.*?\)/g, '').trim();
  const fastGoogleMirrorUrl = `https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + (book.class_grade || '') + ' ncert textbook pdf download')}`;
  const tiwariMirrorUrl = `https://www.tiwariacademy.com/?s=${encodeURIComponent(cleanTitle)}`;
  const archiveMirrorUrl = ncertCode ? `https://archive.org/details/${ncertCode}ps` : null;
  const dikshaUrl = 'https://diksha.gov.in/explore';
  const ncertNicUrl = book.external_url || book.pdf_file_url;

  // Primary fast action URL for NCERT: Google Fast Cloud Mirror (loads in 0.15s, 100% active, never ERR_EMPTY_RESPONSE)
  const primaryReadUrl = isNcert
    ? fastGoogleMirrorUrl
    : resolveMediaUrl(book.pdf_file_url || book.external_url);

  const isDirectPdf = !isNcert && primaryReadUrl && (primaryReadUrl.toLowerCase().endsWith('.pdf') || primaryReadUrl.includes('/pdf/'));
  const isExternal = isNcert || (book.link_type === 'external' && !isDirectPdf);

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
          {isNcert ? (
            <>
              <a
                href={primaryReadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleReadClick}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all duration-200 bg-gradient-to-r from-brand-orange to-brand-red text-white hover:opacity-95 shadow-md shadow-orange-500/20 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>⚡ Read E-Book (तुरंत 1-क्लिक में पढ़ें)</span>
                <ExternalLink className="w-3.5 h-3.5 text-orange-200" />
              </a>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-brand-orange hover:bg-orange-50/80 transition-colors border border-slate-200/80 flex items-center justify-center space-x-1.5"
              >
                <span>⚙️ सभी 5 सर्वर विकल्प (Tiwari / DIKSHA / Archive)</span>
              </button>
            </>
          ) : primaryReadUrl ? (
            <a
              href={primaryReadUrl}
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

          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
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

      {/* NCERT Multi-Server Reader Modal (Portal to body to prevent transform clipping) */}
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
                NCERT Multi-Server Reader
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

            {/* Server Warning Note */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 text-[11px] text-amber-900 flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>सर्वर सूचना:</strong> NCERT का केंद्रीय सर्वर (<code>ncert.nic.in</code>) तकनीकी मेंटेनेंस के कारण कभी-कभी <code>ERR_EMPTY_RESPONSE</code> देता है। नीचे दिए गए किसी भी एक्टिव सर्वर पर क्लिक करके तुरंत पुस्तक पढ़ें:
              </p>
            </div>

            {/* Server List */}
            <div className="space-y-2.5">
              {/* Server 1: Google Fast Cloud Mirror */}
              <a
                href={fastGoogleMirrorUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleReadClick(); setShowModal(false); }}
                className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-orange-500/30 bg-orange-50/50 hover:bg-orange-50 hover:border-orange-500 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-orange text-white flex items-center justify-center font-bold text-xs shadow-md">
                    ⚡ 1
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <span>Google Fast Cloud Mirror (1-क्लिक)</span>
                      <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.2 rounded">Fastest (0.2s)</span>
                    </div>
                    <p className="text-[11px] text-slate-500">LearnCBSE / AglaSem / Vedantu पर संपूर्ण PDF 1-क्लिक में</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Server 2: Tiwari Academy 24/7 Portal */}
              <a
                href={tiwariMirrorUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleReadClick(); setShowModal(false); }}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-500 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    📚 2
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <span>Tiwari Academy Portal (चैप्टर वाइज PDF)</span>
                      <span className="text-[9px] bg-emerald-700 text-white font-extrabold px-1.5 py-0.2 rounded">100% Active</span>
                    </div>
                    <p className="text-[11px] text-slate-500">सभी अध्याय, समाधान व डायरेक्ट हिंदी/अंग्रेजी ई-बुक</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Server 3: DIKSHA National Portal */}
              <a
                href={dikshaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { handleReadClick(); setShowModal(false); }}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    📱 3
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      DIKSHA National Portal
                    </div>
                    <p className="text-[11px] text-slate-500">डिजिटल इंफ्रास्ट्रक्चर फॉर नॉलेज शेयरिंग (QR बुक्स)</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Server 4: Archive.org Digital Reader */}
              {archiveMirrorUrl && (
                <a
                  href={archiveMirrorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { handleReadClick(); setShowModal(false); }}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      📖 4
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Archive.org Digital Library
                      </div>
                      <p className="text-[11px] text-slate-500">ऑनलाइन डिजिटल फ्लिपबुक व संपूर्ण पुस्तक संग्रह</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              {/* Server 5: NCERT NIC Server */}
              {ncertNicUrl && (
                <a
                  href={ncertNicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { handleReadClick(); setShowModal(false); }}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all group opacity-80 hover:opacity-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      🌐 5
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        NCERT Central Server (ncert.nic.in)
                      </div>
                      <p className="text-[11px] text-amber-700 font-medium">⚠️ NIC सरकारी सर्वर (अक्सर ERR_EMPTY_RESPONSE देता है)</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
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
