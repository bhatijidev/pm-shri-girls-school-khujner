import React from 'react';
import SEO from '../components/common/SEO';
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
      <SEO
        title="PM SHRI Govt. Girls HSS, Khujner | मध्य प्रदेश"
        description="Official digital portal of PM SHRI Government Girls Higher Secondary School, Khujner, District Rajgarh (M.P.). Exemplar institution nurturing 21st century education, smart classrooms, e-library, and 30 dedicated faculty."
        keywords="PM SHRI Khujner, PM SHRI Govt Girls HSS Khujner, PM SHRI School Khujner, शासकीय कन्या उच्चतर माध्यमिक विद्यालय खुजनेर, Rajgarh MP schools, Digital E-Library"
        canonicalPath="/"
      />

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
