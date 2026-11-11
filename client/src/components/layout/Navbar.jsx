import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Bell, Home, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Notices', path: '/notices', icon: Bell },
    { name: 'Digital Library', path: '/library', icon: BookOpen },
    { name: 'Facilities', path: '/#facilities', icon: Sparkles },
    { name: 'Contact Us', path: '/contact', icon: Phone }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.pathname === '/' && location.hash === path.substring(1);
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-md shadow-slate-900/5 py-3'
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & School Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/images/logo.jpg"
                alt="PM SHRI Logo"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 bg-brand-orange text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                GOVT
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                PM SHRI School
              </span>
              <span className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-tight">
                Govt. Girls HSS, Khujner
              </span>
              <span className="text-[11px] font-hindi text-slate-500 hidden sm:block">
                शासकीय कन्या उच्चतर माध्यमिक विद्यालय
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-sm shadow-orange-500/20'
                      : 'text-slate-700 hover:text-brand-orange hover:bg-orange-50/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <Link
              to="/library"
              className="ml-3 inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-saffron hover:from-brand-red hover:to-brand-orange text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>E-Library Portal</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-brand-orange hover:bg-orange-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-slate-200/50 px-4 pt-3 pb-6 mt-2 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white'
                      : 'text-slate-700 hover:bg-orange-50 hover:text-brand-orange'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/library"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-sm font-bold py-3 rounded-xl shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Digital Library</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
