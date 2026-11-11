import React from 'react';
import { Youtube, Instagram, Facebook, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SocialSidebar() {
  const socialLinks = [
    {
      name: 'YouTube Channel',
      icon: Youtube,
      href: 'https://www.youtube.com/results?search_query=pm+shri+girls+school+khujner',
      bg: 'bg-[#FF0000]',
      hoverBg: 'hover:bg-[#CC0000]',
      shadow: 'shadow-red-500/25',
      label: 'Watch Videos'
    },
    {
      name: 'Instagram Gallery',
      icon: Instagram,
      href: 'https://instagram.com/pmshrikhujner',
      bg: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600',
      hoverBg: 'hover:opacity-90',
      shadow: 'shadow-rose-500/25',
      label: '@pmshrikhujner'
    },
    {
      name: 'WhatsApp Desk',
      icon: MessageCircle,
      href: 'https://wa.me/919575962662?text=Namaste%20PM%20SHRI%20Khujner%20School%20Inquiry',
      bg: 'bg-[#25D366]',
      hoverBg: 'hover:bg-[#1EBE5D]',
      shadow: 'shadow-emerald-500/25',
      label: 'WhatsApp Chat'
    },
    {
      name: 'Facebook Page',
      icon: Facebook,
      href: 'https://facebook.com/pmshrikhujner',
      bg: 'bg-[#1877F2]',
      hoverBg: 'hover:bg-[#0C63D4]',
      shadow: 'shadow-blue-500/25',
      label: 'Facebook'
    },
    {
      name: 'Direct Call',
      icon: Phone,
      href: 'tel:9575962662',
      bg: 'bg-gradient-to-r from-brand-orange to-brand-red',
      hoverBg: 'hover:opacity-95',
      shadow: 'shadow-orange-500/25',
      label: '+91 95759 62662'
    }
  ];

  return (
    <aside
      aria-label="Social media quick links"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-1.5 pointer-events-auto"
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
            className={`group relative flex items-center ${item.bg} ${item.hoverBg} text-white shadow-lg ${item.shadow} py-2.5 px-3 rounded-r-2xl transition-all duration-300 transform hover:translate-x-1`}
          >
            {/* Social Icon */}
            <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />

            {/* Slide-out Tooltip / Label */}
            <div className="absolute left-full ml-2 hidden sm:flex items-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform -translate-x-2 group-hover:translate-x-0">
              <div className="bg-slate-900/95 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap border border-white/10 backdrop-blur-md">
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
