import React from 'react';
import { Youtube, Instagram, Facebook, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SocialSidebar() {
  const socialLinks = [
    {
      name: 'YouTube Channel',
      icon: Youtube,
      href: 'https://www.youtube.com/results?search_query=pm+shri+girls+school+khujner',
      glassBg: 'bg-gradient-to-r from-slate-950/75 via-red-950/60 to-red-600/40 hover:from-red-900/80 hover:to-red-600/65',
      glassBorder: 'border-red-400/40 hover:border-red-300/80',
      glow: 'shadow-[0_8px_24px_-4px_rgba(239,68,68,0.35)] hover:shadow-[0_12px_28px_rgba(239,68,68,0.6)]',
      textColor: 'text-white',
      accentColor: 'text-red-400',
      label: 'Watch Videos'
    },
    {
      name: 'Instagram Gallery',
      icon: Instagram,
      href: 'https://instagram.com/pmshrikhujner',
      glassBg: 'bg-gradient-to-r from-slate-950/75 via-purple-950/60 to-rose-600/40 hover:from-purple-900/80 hover:to-rose-600/65',
      glassBorder: 'border-pink-400/40 hover:border-pink-300/80',
      glow: 'shadow-[0_8px_24px_-4px_rgba(244,63,94,0.35)] hover:shadow-[0_12px_28px_rgba(244,63,94,0.6)]',
      textColor: 'text-white',
      accentColor: 'text-pink-400',
      label: '@pmshrikhujner'
    },
    {
      name: 'WhatsApp Desk',
      icon: MessageCircle,
      href: 'https://wa.me/919575962662?text=Namaste%20PM%20SHRI%20Khujner%20School%20Inquiry',
      glassBg: 'bg-gradient-to-r from-slate-950/75 via-emerald-950/60 to-emerald-600/40 hover:from-emerald-900/80 hover:to-emerald-600/65',
      glassBorder: 'border-emerald-400/40 hover:border-emerald-300/80',
      glow: 'shadow-[0_8px_24px_-4px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_28px_rgba(16,185,129,0.6)]',
      textColor: 'text-white',
      accentColor: 'text-emerald-400',
      label: 'WhatsApp Chat'
    },
    {
      name: 'Facebook Page',
      icon: Facebook,
      href: 'https://facebook.com/pmshrikhujner',
      glassBg: 'bg-gradient-to-r from-slate-950/75 via-blue-950/60 to-blue-600/40 hover:from-blue-900/80 hover:to-blue-600/65',
      glassBorder: 'border-blue-400/40 hover:border-blue-300/80',
      glow: 'shadow-[0_8px_24px_-4px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_28px_rgba(59,130,246,0.6)]',
      textColor: 'text-white',
      accentColor: 'text-blue-400',
      label: 'Facebook'
    },
    {
      name: 'Direct Call',
      icon: Phone,
      href: 'tel:9575962662',
      glassBg: 'bg-gradient-to-r from-slate-950/75 via-orange-950/60 to-amber-600/40 hover:from-orange-900/80 hover:to-amber-600/65',
      glassBorder: 'border-orange-400/40 hover:border-orange-300/80',
      glow: 'shadow-[0_8px_24px_-4px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_28px_rgba(249,115,22,0.6)]',
      textColor: 'text-white',
      accentColor: 'text-orange-400',
      label: '+91 95759 62662'
    }
  ];

  return (
    <aside
      aria-label="Social media quick links"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-2 pointer-events-auto"
    >
      {socialLinks.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.name}
            href={item.href}
            target={item.href.startsWith('tel:') ? undefined : '_blank'}
            rel={item.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
            className={`group relative flex items-center ${item.glassBg} ${item.textColor} ${item.glow} backdrop-blur-2xl saturate-150 border-t border-r border-b ${item.glassBorder} py-2.5 px-3 rounded-r-2xl transition-all duration-300 transform hover:translate-x-1.5 hover:pl-3.5 overflow-hidden`}
          >
            {/* Liquid Glass Top Edge Specular Reflection */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-white/70 via-white/30 to-transparent pointer-events-none rounded-tr-2xl" />

            {/* Glossy Diagonal Flare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-r-2xl" />

            {/* Social Icon */}
            <Icon className="w-5 h-5 flex-shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-115 relative z-10" />

            {/* Slide-out Tooltip / Label */}
            <div className="absolute left-full ml-3 hidden sm:flex items-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform -translate-x-2 group-hover:translate-x-0 z-50">
              <div className="bg-slate-950/85 backdrop-blur-xl text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xl whitespace-nowrap border border-white/15">
                <span className="font-bold block text-[11px] text-orange-300">{item.name}</span>
                <span className="text-[10px] text-slate-300">{item.label}</span>
              </div>
            </div>
          </motion.a>
        );
      })}
    </aside>
  );
}
