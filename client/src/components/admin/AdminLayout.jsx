import React, { useState } from 'react';
import { LayoutDashboard, Bell, BookOpen, KeyRound, LogOut, ArrowLeft, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import NoticeManager from './NoticeManager';
import BookManager from './BookManager';
import { authService } from '../../services/api';

export default function AdminLayout({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [passwordModal, setPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState(null);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notices', label: 'Notices & Circulars', icon: Bell },
    { id: 'books', label: 'E-Library Catalog', icon: BookOpen }
  ];

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.changePassword(oldPassword, newPassword);
      if (res.success) {
        setPassMsg({ type: 'success', text: 'Password changed successfully!' });
        setOldPassword('');
        setNewPassword('');
        setTimeout(() => {
          setPasswordModal(false);
          setPassMsg(null);
        }, 1500);
      }
    } catch (err) {
      setPassMsg({ type: 'error', text: err.response?.data?.message || 'Password update failed' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between flex-shrink-0 border-r border-slate-800">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800 space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.jpg"
                alt="PM SHRI Logo"
                className="h-10 w-auto bg-white p-1 rounded-lg"
              />
              <div>
                <h3 className="font-heading font-extrabold text-sm text-white leading-tight">
                  PM SHRI Khujner
                </h3>
                <span className="text-[10px] uppercase font-bold text-brand-orange tracking-wider">
                  Admin Panel
                </span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate">{user?.full_name || 'School Head Admin'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                    active
                      ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setPasswordModal(true)}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <KeyRound className="w-4 h-4" />
            <span>Change Password</span>
          </button>

          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'notices' && <NoticeManager />}
        {activeTab === 'books' && <BookManager />}
      </main>

      {/* Change Password Modal */}
      {passwordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-heading font-extrabold text-lg text-slate-900">
              Change Admin Password
            </h3>
            
            {passMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  passMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-rose-50 text-rose-800'
                }`}
              >
                {passMsg.text}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setPasswordModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-brand-red"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
