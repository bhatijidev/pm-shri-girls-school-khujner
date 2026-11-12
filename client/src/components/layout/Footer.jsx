import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.jpg"
                alt="PM SHRI Logo"
                className="h-12 w-auto bg-white p-1 rounded-lg"
              />
              <div>
                <h4 className="font-heading font-bold text-white text-base">PM SHRI School</h4>
                <p className="text-xs text-brand-orange font-semibold">Govt. Girls HSS Khujner</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Exemplar school under the Pradhan Mantri Schools for Rising India (PM SHRI) initiative.
              Committed to empowering girls with 21st-century skills, digital literacy, and holistic values.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>UDISE Code: <strong>23300137920</strong></span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Quick Links</span>
              <span className="w-8 h-0.5 bg-brand-orange"></span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-slate-400 hover:text-brand-orange transition-colors">
                  Official Notice Board & Circulars
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-slate-400 hover:text-brand-orange transition-colors">
                  Digital E-Library
                </Link>
              </li>
              <li>
                <a href="#facilities" className="text-slate-400 hover:text-brand-orange transition-colors">
                  School Facilities & Labs
                </a>
              </li>
              <li>
                <Link to="/faculty" className="text-slate-400 hover:text-brand-orange transition-colors">
                  Our Dedicated Faculty (30 Members)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-brand-orange transition-colors">
                  Contact Us & Campus Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Government Portals</span>
              <span className="w-8 h-0.5 bg-brand-orange"></span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://education.gov.in/pm-shri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-slate-400 hover:text-brand-orange transition-colors"
                >
                  <span>PM SHRI Portal (Govt of India)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://vimarsh.mp.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-slate-400 hover:text-brand-orange transition-colors"
                >
                  <span>Vimarsh Portal (MP Education)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://mpbse.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-slate-400 hover:text-brand-orange transition-colors"
                >
                  <span>MP Board (MPBSE Bhopal)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ncert.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-slate-400 hover:text-brand-orange transition-colors"
                >
                  <span>NCERT National Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://diksha.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-slate-400 hover:text-brand-orange transition-colors"
                >
                  <span>DIKSHA Digital India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: School Address */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Contact Campus</span>
              <span className="w-8 h-0.5 bg-brand-orange"></span>
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>
                  PM Shri Government Girls HSS School, Opposite Ganesh Mandir, Khujner, District Rajgarh, Madhya Pradesh — 465687
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="tel:9575962662" className="block text-slate-300 hover:text-brand-orange transition-colors">
                    +91 95759 62662 (Principal)
                  </a>
                  <a href="tel:9575053750" className="block text-slate-300 hover:text-brand-orange transition-colors">
                    +91 95750 53750 (Office)
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a
                  href="mailto:principalgghsskhujner@gmail.com"
                  className="text-slate-300 hover:text-brand-orange transition-colors break-all"
                >
                  principalgghsskhujner@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>Mon – Sat: 8:00 AM – 4:00 PM</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-1.5 text-brand-orange hover:text-orange-300 text-xs font-semibold"
                >
                  <span>Visit Full Contact & Support Desk →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PM SHRI Government Girls Higher Secondary School, Khujner. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            <span>Affiliated with MPBSE Bhopal & Centrally Sponsored under PM SHRI Scheme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
