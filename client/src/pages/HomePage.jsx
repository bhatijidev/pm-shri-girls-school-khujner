import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import NoticeTicker from '../components/home/NoticeTicker';
import AboutSchool from '../components/home/AboutSchool';
import Facilities from '../components/home/Facilities';
import LibraryPreview from '../components/home/LibraryPreview';
import Achievements from '../components/home/Achievements';
import InstagramFeed from '../components/home/InstagramFeed';
import Faculty from '../components/home/Faculty';
import Contact from '../components/home/Contact';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Dynamic Visual Hero Image Slider */}
      <HeroSlider />
      
      {/* Live Scrolling Notice Ticker */}
      <NoticeTicker />
      
      {/* About School with Student Photography */}
      <AboutSchool />
      
      {/* Bento Grid Facilities with High-Res Photos */}
      <Facilities />
      
      {/* E-Library Showcase */}
      <LibraryPreview />
      
      {/* Achievements Banner */}
      <Achievements />
      
      {/* Instagram Feed with Live Photography */}
      <InstagramFeed />
      
      {/* Faculty Team with Teacher Portraits */}
      <Faculty />
      
      {/* Contact & Map */}
      <Contact />
    </div>
  );
}
