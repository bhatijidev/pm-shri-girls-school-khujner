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
      hoverBg: 'hover:bg-red-50/90 hover:border-red-300 hover:shadow-red-500/20',
      label: 'Watch Videos'
    },
    {
      name: 'Instagram Gallery',
      icon: Instagram,
      href: 'https://instagram.com/pmshrikhujner',
      iconColor: 'text-[#E1306C]',
      hoverBg: 'hover:bg-pink-50/90 hover:border-pink-300 hover:shadow-pink-500/20',
      label: '@pmshrikhujner'
    },
    {
      name: 'WhatsApp Desk',
      icon: MessageCircle,
      href: 'https://wa.me/919575962662?text=Namaste%20PM%20SHRI%20Khujner%20School%20Inquiry',
      iconColor: 'text-[#25D366]',
      hoverBg: 'hover:bg-emerald-50/90 hover:border-emerald-300 hover:shadow-emerald-500/20',
      label: 'WhatsApp Chat'
    },
    {
      name: 'Facebook Page',
      icon: Facebook,
      href: 'https://facebook.com/pmshrikhujner',
      iconColor: 'text-[#1877F2]',
      hoverBg: 'hover:bg-blue-50/90 hover:border-blue-300 hover:shadow-blue-500/20',
      label: 'Facebook'
    },
    {
      name: 'Direct Call',
      icon: Phone,
      href: 'tel:9575962662',
      iconColor: 'text-[#F7941D]',
      hoverBg: 'hover:bg-orange-50/90 hover:border-orange-300 hover:shadow-orange-500/20',
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
            className={`group relative flex items-center bg-white/75 dark:bg-slate-900/75 backdrop-blur-2xl border-t border-r border-b border-white/80 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] py-2.5 px-3 rounded-r-2xl transition-all duration-300 transform hover:translate-x-2 hover:pl-4 hover:shadow-xl ${item.iconColor} ${item.hoverBg}`}
          >
            {/* Liquid Glass Top Edge Specular Reflection */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-white/95 via-white/50 to-transparent pointer-events-none rounded-tr-2xl" />

            {/* Social Icon */}
            <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-120 relative z-10" />

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
