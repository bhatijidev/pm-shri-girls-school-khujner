import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLatestNotices } from '../../hooks/useNotices';
import { AlertCircle, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  const { urgent } = useLatestNotices();
  const [dismissAlert, setDismissAlert] = React.useState(false);

  const topUrgent = urgent && urgent.length > 0 ? urgent[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream selection:bg-brand-orange selection:text-white">
      {/* Top Urgent Announcement Alert Banner */}
      {topUrgent && !dismissAlert && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs sm:text-sm py-2 px-4 shadow-md z-50 sticky top-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate pr-4">
              <span className="flex h-2 w-2 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
              </span>
              <span className="font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-[10px]">
                Urgent Alert
              </span>
              <Link
                to={`/notices`}
                className="hover:underline truncate font-medium flex items-center space-x-1"
              >
                <span>{topUrgent.title}</span>
                <ChevronRight className="w-3.5 h-3.5 inline flex-shrink-0" />
              </Link>
            </div>
            <button
              onClick={() => setDismissAlert(true)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar />

      {/* Page Content with offset for fixed navbar */}
      <main className="flex-grow pt-20 sm:pt-24">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
