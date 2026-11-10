import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLogin, loading, error }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('PmShri@Khujner2024');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-hero-bg">
      <div className="max-w-md w-full relative z-10">
        
        {/* Glow behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-brand-red rounded-3xl blur-xl opacity-30"></div>

        <div className="relative glass-dark rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl backdrop-blur-2xl text-white space-y-6">
          
          {/* Logo & School Header */}
          <div className="text-center space-y-3">
            <div className="bg-white p-3 rounded-2xl inline-block shadow-lg mx-auto">
              <img
                src="/images/logo.jpg"
                alt="PM SHRI Logo"
                className="h-14 w-auto object-contain mx-auto"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-500/10 border border-orange-500/20 px-3 py-0.5 rounded-full">
                Administrative Portal
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-white mt-1">
                PM SHRI Girls HSS Khujner
              </h2>
              <p className="text-xs text-slate-400">
                Secure access for authorized school personnel only
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-red hover:to-brand-orange text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security footnote */}
          <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-400 flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit Encrypted • Direct Private Access</span>
          </div>

        </div>

      </div>
    </div>
  );
}
