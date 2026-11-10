import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

// Route Code Splitting: Lazy load heavy subpages for instant initial landing page load
const NoticesPage = lazy(() => import('./pages/NoticesPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
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

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Pages with Main Layout & Navigation */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/notices"
          element={
            <Layout>
              <NoticesPage />
            </Layout>
          }
        />
        <Route
          path="/library"
          element={
            <Layout>
              <LibraryPage />
            </Layout>
          }
        />

        {/* Secret Admin Route - No link on public site */}
        <Route path="/admin/pmshri-khujner-2024" element={<AdminPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
