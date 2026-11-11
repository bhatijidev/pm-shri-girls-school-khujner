import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PageTransition from './components/common/PageTransition';

// Route Code Splitting: Lazy load heavy subpages for instant initial landing page load
const NoticesPage = lazy(() => import('./pages/NoticesPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-brand-orange animate-spin"></div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Loading PM SHRI Portal...
      </p>
    </div>
  );
}

function PublicLayoutWrapper() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public Pages with Main Layout & Smooth Apple-grade Transition */}
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/notices"
            element={
              <PageTransition>
                <NoticesPage />
              </PageTransition>
            }
          />
          <Route
            path="/library"
            element={
              <PageTransition>
                <LibraryPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <Suspense fallback={<PageLoader />}>
      {isAdmin ? (
        <Routes>
          {/* Secret Admin Route - No link on public site */}
          <Route path="/admin/pmshri-khujner-2024" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/admin/pmshri-khujner-2024" replace />} />
        </Routes>
      ) : (
        <PublicLayoutWrapper />
      )}
    </Suspense>
  );
}
