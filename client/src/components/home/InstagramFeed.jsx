import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, Sparkles } from 'lucide-react';

export default function InstagramFeed() {
  const posts = [
    {
      title: 'Annual Science & Robotics Exhibition 2024-25',
      tag: '#ScienceFair #GirlsInSTEM',
      date: 'Recent Update',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
      likes: 184
    },
    {
      title: 'Rani Laxmibai Atmaraksha Self-Defense Workshop',
      tag: '#SelfDefense #KanyaShiksha',
      date: 'School Campus',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
      likes: 246
    },
    {
      title: 'Green Campus & Tree Plantation Drive',
      tag: '#EcoSchool #PMShriGreen',
      date: 'Environment Club',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      likes: 198
    },
    {
      title: 'Patriotic Celebrations & Cultural Dance Drama',
      tag: '#DeshBhakti #NationalPride',
      date: 'Campus Grounds',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
      likes: 342
    }
  ];

  return (
    <section className="py-20 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full">
            <Instagram className="w-4 h-4" />
            <span>Campus Moments & Social Feed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">
            Follow Us On Instagram
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Stay updated with school activities, assemblies, competitions, and celebrations at{' '}
            <a
              href="https://www.instagram.com/pmshrikhujner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange font-bold hover:underline"
            >
              @pmshrikhujner
            </a>
          </p>
        </div>

        {/* Gallery Cards with Real Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/pmshrikhujner"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl overflow-hidden bg-white shadow-sm border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
            >
              {/* Image Preview Container */}
              <div className="h-64 relative overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Dark gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40"></div>

                {/* Top Badge & Instagram Icon */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    {post.date}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Bottom Title & Hashtag */}
                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                  <p className="text-xs font-bold text-orange-300 uppercase tracking-wider drop-shadow-sm">
                    {post.tag}
                  </p>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-white leading-snug line-clamp-2 drop-shadow-md">
                    {post.title}
                  </h4>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 flex items-center justify-between text-xs text-slate-500 bg-white">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1 text-rose-600 font-semibold">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>View</span>
                  </span>
                </div>
                <span className="font-bold text-brand-orange group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                  <span>Open Post</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/pmshrikhujner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 via-rose-600 to-orange-500 hover:opacity-95 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-rose-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow @pmshrikhujner on Instagram</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
