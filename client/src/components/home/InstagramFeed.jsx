import React, { useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, Sparkles, Play, Video, Image, X, Calendar, MapPin, Eye } from 'lucide-react';

export default function InstagramFeed() {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'videos'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Real photos of PM SHRI Govt Girls Higher Secondary School Khujner
  const photos = [
    {
      titleHindi: 'निःशुल्क साइकिल वितरण समारोह 2025-26',
      titleEnglish: 'Free Bicycle Distribution to Meritorious Students',
      tag: '#SamagraShiksha #CycleDistribution',
      location: 'Main Campus, Khujner',
      date: 'School Event',
      image: '/images/events/cycle-distribution.jpg',
      likes: 384,
      description: 'पीएम श्री शासकीय कन्या उच्चतर माध्यमिक विद्यालय खुजनेर में समग्र शिक्षा अभियान अंतर्गत बालिकाओं को निःशुल्क साइकिलें वितरित की गईं।'
    },
    {
      titleHindi: 'कक्षा 12वीं छात्राओं का दीक्षांत एवं विदाई समारोह',
      titleEnglish: 'Class 12 Academic Farewell & Felicitation Ceremony',
      tag: '#Class12Farewell #KanyaShiksha',
      location: 'Cultural Stage, Khujner',
      date: 'Campus Grounds',
      image: '/images/events/farewell-ceremony.jpg',
      likes: 426,
      description: 'सत्र 2025-26 में कक्षा 12वीं की बालिकाओं हेतु विदाई, आशीर्वाद एवं भविष्य की उच्च शिक्षा मार्गदर्शन समारोह।'
    },
    {
      titleHindi: 'मां सरस्वती प्रतिमा स्थापना एवं सांस्कृतिक मंच लोकार्पण',
      titleEnglish: 'Saraswati Idol & Dedicated Stage Inauguration',
      tag: '#SaraswatiPuja #PMShriKhujner',
      location: 'School Courtyard',
      date: 'Special Occasion',
      image: '/images/events/school-event-khujner.jpg',
      likes: 352,
      description: 'सीईओ जिला पंचायत, स्थानीय जनप्रतिनिधियों एवं वरिष्ठ शिक्षकों की गरिमामयी उपस्थिति में मां सरस्वती प्रतिमा व मंच लोकार्पण।'
    },
    {
      titleHindi: 'श्री कृष्ण जन्मोत्सव एवं सांस्कृतिक प्रस्तुतियां',
      titleEnglish: 'Cultural Dance Drama & Heritage Festivities',
      tag: '#CulturalFest #GirlsTalent',
      location: 'School Auditorium',
      date: 'Cultural Club',
      image: '/images/events/cultural-krishna-utsav.jpg',
      likes: 395,
      description: 'विद्यालय की छात्राओं द्वारा पारंपरिक वेशभूषा में आकर्षक सांस्कृतिक नृत्य, गीत एवं एकांकी प्रस्तुतियां।'
    }
  ];

  // Real videos of Govt Girls HSS Khujner & PM SHRI School activities
  const videos = [
    {
      id: 'kOdZ-glTY1U',
      titleHindi: 'खुजनेर शासकीय कन्या उच्चतर माध्यमिक विद्यालय विशेष आयोजन',
      titleEnglish: 'Special Ceremony & Dignitaries at Khujner Girls School',
      tag: '#NewsCoverage #KhujnerGirlsSchool',
      channel: 'रंगीलो मध्यप्रदेश',
      duration: '3:00',
      views: '1.2k+ Views',
      thumbnail: '/images/events/school-event-khujner.jpg',
      description: 'शासकीय कन्या उच्चतर माध्यमिक विद्यालय खुजनेर में मुख्य कार्यपालन अधिकारी (सीईओ) जिला पंचायत राजगढ़ एवं प्रशासनिक अधिकारियों की उपस्थिति में आयोजित कार्यक्रम।'
    },
    {
      id: 'z-afWLaP-Pw',
      titleHindi: 'शासकीय कन्या उमावि खुजनेर — कृष्ण जन्मोत्सव एवं सांस्कृतिक उत्सव',
      titleEnglish: 'Festive Cultural Dance & Student Program Coverage',
      tag: '#KrishnaUtsav #CulturalDance',
      channel: 'जनसक्रिय न्यूज़',
      duration: '1:09',
      views: '600+ Views',
      thumbnail: '/images/events/cultural-krishna-utsav.jpg',
      description: 'शासकीय कन्या उच्चतर माध्यमिक विद्यालय खुजनेर में एकादशी एवं कृष्ण जन्मोत्सव पर छात्राओं द्वारा मनमोहक सांस्कृतिक प्रस्तुतियां।'
    },
    {
      id: '05g619t0wdY',
      titleHindi: 'ग्रीन स्कूल एवं पर्यावरण संरक्षण अभियान (PM SHRI)',
      titleEnglish: 'Eco-Friendly Clean & Green Campus Initiatives',
      tag: '#GreenSchool #PMShriCampus',
      channel: 'PM SHRI Eco Club',
      duration: '1:27',
      views: '800+ Views',
      thumbnail: '/images/events/pm-shri-green-campus.jpg',
      description: 'विद्यालय प्रांगण में हरित परिसर, पौधरोपण, हर्बल गार्डन एवं स्वच्छ भारत मिशन के अंतर्गत पर्यावरण संरक्षण गतिविधियां।'
    },
    {
      id: 'y0_a7z28Ib4',
      titleHindi: 'दैनिक प्रार्थना सभा, योगाभ्यास एवं आत्मरक्षा सत्र',
      titleEnglish: 'Morning Prayer, Yoga Drills & Self-Defense Practice',
      tag: '#YogaDay #MorningAssembly',
      channel: 'PM SHRI Girls Assembly',
      duration: 'Shorts',
      views: '1.6k+ Views',
      thumbnail: '/images/events/girls-yoga-assembly.jpg',
      description: 'छात्राओं के मानसिक एकाग्रता एवं शारीरिक सशक्तिकरण हेतु नियमित दैनिक योगाभ्यास व रानी लक्ष्मीबाई आत्मरक्षा कार्यशाला।'
    }
  ];

  return (
    <section className="py-20 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Tabs */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider bg-rose-50 border border-rose-200 px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Real Campus Life & Official Media</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
            विद्यालय की वास्तविक झलकियां एवं वीडियो
          </h2>

          <p className="font-hindi text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            पीएम श्री शासकीय कन्या उच्चतर माध्यमिक विद्यालय, खुजनेर (राजगढ़) के आधिकारिक कार्यक्रम, शैक्षणिक उत्सव एवं वास्तविक वीडियो कवरेज
          </p>

          {/* Toggle Tabs between Real Photos and Real Videos */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-white shadow-sm border border-orange-100 space-x-1">
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'photos'
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>📸 Actual Photos (वास्तविक फोटो)</span>
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'videos'
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Video className="w-4 h-4 text-red-500" />
                <span>🎥 Real Videos (आधिकारिक वीडियो)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Real Photo Highlights */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {photos.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-sm border border-orange-100/80 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
              >
                {/* Photo Container */}
                <div className="h-64 relative overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.titleEnglish}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="bg-black/60 backdrop-blur-md text-orange-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-brand-orange" />
                      <span>{item.location}</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 space-y-1">
                    <p className="text-[10px] font-bold text-orange-300 uppercase tracking-wider">
                      {item.tag}
                    </p>
                    <h4 className="font-heading font-bold text-sm text-white leading-snug line-clamp-2 drop-shadow-md">
                      {item.titleHindi}
                    </h4>
                  </div>
                </div>

                {/* Card Meta & Action */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="flex items-center space-x-1 text-rose-600 font-semibold">
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{item.likes}</span>
                    </span>
                    <span className="font-bold text-brand-orange group-hover:underline inline-flex items-center space-x-1">
                      <span>View Full Photo</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Real Video Highlights */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {videos.map((vid, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedVideo(vid)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-sm border border-red-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
              >
                {/* Video Thumbnail with Play Badge */}
                <div className="h-64 relative overflow-hidden bg-slate-950">
                  <img
                    src={vid.thumbnail}
                    alt={vid.titleEnglish}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

                  {/* Play Button in Center */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>

                  {/* Top Channel Badge */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="bg-black/70 backdrop-blur-md text-yellow-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-yellow-300/30">
                      {vid.channel}
                    </span>
                    <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      {vid.duration}
                    </span>
                  </div>

                  {/* Bottom Title */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 space-y-1">
                    <p className="text-[10px] font-bold text-yellow-300 uppercase tracking-wider">
                      {vid.tag}
                    </p>
                    <h4 className="font-heading font-bold text-sm text-white leading-snug line-clamp-2 drop-shadow-md">
                      {vid.titleHindi}
                    </h4>
                  </div>
                </div>

                {/* Description & Action */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      {vid.views}
                    </span>
                    <span className="font-bold text-red-600 group-hover:underline inline-flex items-center space-x-1">
                      <span>Watch Video</span>
                      <Play className="w-3 h-3 fill-red-600" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Social Link & Verification Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center justify-center md:justify-start space-x-2">
              <span>Connect With School Administration & Activities</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-hindi">
              सभी कार्यक्रमों, परीक्षा घोषणाओं, विज्ञान प्रदर्शनी एवं खेलकूद अपडेट्स के लिए सोशल मीडिया से जुड़ें
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.youtube.com/results?search_query=%E0%A4%B6%E0%A4%BE%E0%A4%B8%E0%A4%95%E0%A5%80%E0%A4%AF+%E0%A4%95%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A4%BE+%E0%A4%89%E0%A4%9A%E0%A5%8D%E0%A4%9A%E0%A4%A4%E0%A4%B0+%E0%A4%AE%E0%A4%BE%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%AE%E0%A4%BF%E0%A4%95+%E0%A4%B5%E0%A4%BF%E0%A4%A6%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%B2%E0%A4%AF+%E0%A4%96%E0%A5%81%E0%A4%9C%E0%A4%A8%E0%A5%87%E0%A4%B0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Video className="w-4 h-4" />
              <span>More Videos on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.instagram.com/p/DDPM_F4oKDk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 via-rose-600 to-orange-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4" />
              <span>View On Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-slate-900 rounded-3xl overflow-hidden max-w-3xl w-full border border-slate-700 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800 text-white">
              <div className="truncate pr-4">
                <h4 className="font-bold text-sm truncate">{selectedVideo.titleHindi}</h4>
                <p className="text-[11px] text-slate-400">{selectedVideo.channel} • {selectedVideo.tag}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Iframe Embed */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.titleEnglish}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0"
              />
            </div>

            {/* Bottom Meta */}
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-300 max-w-xl">
                {selectedVideo.description}
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors inline-flex items-center space-x-1.5"
              >
                <span>Open in YouTube App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-slate-900 rounded-3xl overflow-hidden max-w-3xl w-full border border-slate-800 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close */}
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800 text-white">
              <div className="truncate pr-4">
                <h4 className="font-bold text-sm truncate">{selectedPhoto.titleHindi}</h4>
                <p className="text-[11px] text-orange-300">{selectedPhoto.location} • {selectedPhoto.tag}</p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image */}
            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.titleEnglish}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            {/* Caption */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-hindi">
                {selectedPhoto.description}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {selectedPhoto.titleEnglish}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
