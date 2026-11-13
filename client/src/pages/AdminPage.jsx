import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';

export default function AdminPage() {
  const { user, isAuthenticated, loading, error, login, logout } = useAuth();

  // Strict SEO No-Index: Prevent search engines from ever indexing or archiving admin portal
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    const prevContent = meta.content;
    meta.content = 'noindex, nofollow, noarchive, nosnippet, noimageindex';
    document.title = 'PM SHRI School Administration Portal';

    return () => {
      meta.content = prevContent || 'index, follow';
    };
  }, []);

  const handleLogin = async (username, password) => {
    await login(username, password);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={handleLogin}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <AdminLayout
      user={user}
      onLogout={logout}
    />
  );
}
