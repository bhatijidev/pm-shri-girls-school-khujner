import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Flame, ChevronRight } from 'lucide-react';
import { useLatestNotices } from '../../hooks/useNotices';

export default function NoticeTicker() {
  const { latest, loading } = useLatestNotices();

  return (
    <div className="bg-gradient-to-r from-brand-orange via-brand-saffron to-brand-red text-white py-2.5 px-4 shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        
        {/* Fixed Title Label */}
        <div className="flex items-center space-x-2 bg-brand-dark/40 px-3 py-1 rounded-lg backdrop-blur-md flex-shrink-0 z-10 shadow-sm mr-4">
          <Flame className="w-4 h-4 text-yellow-300 animate-bounce" />
          <span className="font-heading font-bold text-xs sm:text-sm tracking-wide uppercase">
            Notices:
          </span>
        </div>

        {/* Scrolling Ticker Track */}
        <div className="flex-1 overflow-hidden relative whitespace-nowrap">
          {loading ? (
            <div className="text-xs text-white/80 py-1">Loading announcements...</div>
          ) : (
            <div className="inline-block animate-ticker hover:[animation-play-state:paused]">
              <div className="inline-flex items-center space-x-8 text-xs sm:text-sm font-medium">
                {latest.map((item) => (
                  <Link
                    key={item.id}
                    to="/notices"
                    className="inline-flex items-center space-x-2 hover:text-yellow-200 transition-colors"
                  >
                    {item.is_urgent === 1 && (
                      <span className="bg-red-900/60 text-yellow-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-yellow-300/40">
                        URGENT
                      </span>
                    )}
                    <span>{item.title}</span>
                    <span className="text-white/40">•</span>
                  </Link>
                ))}

                {/* Duplicated for smooth loop */}
                {latest.map((item) => (
                  <Link
                    key={`dup-${item.id}`}
                    to="/notices"
                    className="inline-flex items-center space-x-2 hover:text-yellow-200 transition-colors"
                  >
                    {item.is_urgent === 1 && (
                      <span className="bg-red-900/60 text-yellow-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-yellow-300/40">
                        URGENT
                      </span>
                    )}
                    <span>{item.title}</span>
                    <span className="text-white/40">•</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View All link */}
        <Link
          to="/notices"
          className="ml-4 flex-shrink-0 hidden sm:inline-flex items-center space-x-1 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors"
        >
          <span>All Notices</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
