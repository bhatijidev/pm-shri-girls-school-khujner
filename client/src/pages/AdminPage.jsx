import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';

export default function AdminPage() {
  const { user, isAuthenticated, loading, error, login, logout } = useAuth();

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
