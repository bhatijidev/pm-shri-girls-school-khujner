import React from 'react';
import { Youtube, Instagram, Facebook, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SocialSidebar() {
  const socialLinks = [
    {
      name: 'YouTube Channel',
      icon: Youtube,
      href: 'https://www.youtube.com/results?search_query=pm+shri+girls+school+khujner',
      iconColor: 'text-[#FF0000]',
      hoverClass: 'hover:bg-[#FF0000] hover:text-white hover:border-red-400 hover:shadow-red-500/40',
      label: 'Watch Videos'
    },
    {
      name: 'Instagram Gallery',
      icon: Instagram,
      href: 'https://instagram.com/pmshrikhujner',
      iconColor: 'text-[#E1306C]',
      hoverClass: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-pink-400 hover:shadow-pink-500/40',
      label: '@pmshrikhujner'
    },
    {
      name: 'WhatsApp Desk',
      icon: MessageCircle,
      href: 'https://wa.me/919575962662?text=Namaste%20PM%20SHRI%20Khujner%20School%20Inquiry',
      iconColor: 'text-[#25D366]',
      hoverClass: 'hover:bg-[#25D366] hover:text-white hover:border-emerald-400 hover:shadow-emerald-500/40',
      label: 'WhatsApp Chat'
    },
    {
      name: 'Facebook Page',
      icon: Facebook,
      href: 'https://facebook.com/pmshrikhujner',
      iconColor: 'text-[#1877F2]',
      hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:border-blue-400 hover:shadow-blue-500/40',
      label: 'Facebook'
    },
    {
      name: 'Direct Call',
      icon: Phone,
      href: 'tel:9575962662',
      iconColor: 'text-[#F7941D]',
      hoverClass: 'hover:bg-gradient-to-r hover:from-brand-orange hover:to-brand-red hover:text-white hover:border-orange-400 hover:shadow-orange-500/40',
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
            className={`group relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-r border-b border-white/60 dark:border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.7)] py-2.5 px-3 rounded-r-2xl transition-all duration-300 transform hover:translate-x-1.5 hover:pl-3.5 hover:shadow-xl ${item.iconColor} ${item.hoverClass}`}
          >
            {/* Liquid Glass Top Edge Specular Reflection */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-white/90 via-white/40 to-transparent pointer-events-none rounded-tr-2xl" />

            {/* Social Icon */}
            <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-115 relative z-10" />

            {/* Slide-out Tooltip / Label */}
            <div className="absolute left-full ml-3 hidden sm:flex items-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform -translate-x-2 group-hover:translate-x-0 z-50">
              <div className="bg-slate-950/90 backdrop-blur-xl text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xl whitespace-nowrap border border-white/15">
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
