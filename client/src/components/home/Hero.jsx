import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Bell, Award, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero-bg text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      {/* Decorative Animated Floating Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl animate-float-slow pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* PM SHRI Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange/20 to-brand-red/20 border border-brand-orange/30 px-4 py-2 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-brand-orange animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-orange-200">
                Centrally Sponsored • NEP 2020 Exemplar Institution
              </span>
            </div>

            {/* School Title in Hindi & English */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-hindi font-bold text-orange-300 drop-shadow-sm">
                प्रधानमंत्री श्री शासकीय कन्या उच्चतर माध्यमिक विद्यालय
              </h2>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
                PM SHRI Girls HSS <br className="hidden sm:block" />
                <span className="gradient-text-gold">Khujner, Rajgarh (M.P.)</span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Creating holistic, resilient, and well-rounded young women equipped with 
              <span className="text-orange-300 font-semibold"> key 21st-Century skills</span>, 
              modern digital intelligence, scientific temper, and grounded Indian values.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/library"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-red hover:to-brand-orange text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore E-Library</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/notices"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Bell className="w-4 h-4 text-brand-orange" />
                <span>Notices & Circulars</span>
              </Link>
            </div>

            {/* Highlights Bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">550+</p>
                <p className="text-xs text-slate-400">Enrolled Girls</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-orange">96.4%</p>
                <p className="text-xs text-slate-400">Board Results</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
                <p className="text-xs text-slate-400">Govt Scholarship</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing Card with PM SHRI Logo & Emblem */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-orange via-brand-saffron to-brand-red rounded-3xl blur-lg opacity-40 animate-pulse-glow"></div>
              
              <div className="relative glass-dark rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl backdrop-blur-2xl text-center space-y-6">
                
                {/* Logo Frame */}
                <div className="bg-white rounded-2xl p-4 shadow-inner inline-block mx-auto transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/images/logo.jpg"
                    alt="PM SHRI School Logo"
                    className="w-full max-w-[280px] h-auto object-contain mx-auto"
                  />
                </div>

                <div className="space-y-2">
                  <div className="inline-block bg-orange-500/20 text-orange-300 text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/30">
                    UDISE: 23300137920 • Khujner, Rajgarh
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Government Girls Higher Secondary School
                  </h3>
                  <p className="text-xs text-slate-300">
                    Empowering girl education under NEP 2020 through smart classrooms, vocational skills, and STEM labs.
                  </p>
                </div>

                {/* Key feature pills */}
                <div className="grid grid-cols-2 gap-2 text-left text-xs text-slate-200">
                  <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-lg border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Free Govt Education</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-lg border border-white/10">
                    <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span>District Toppers</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12 text-brand-cream preserve-3d">
          <path d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,26.7C840,21,960,43,1080,48C1200,53,1320,43,1380,37.3L1440,32L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}
