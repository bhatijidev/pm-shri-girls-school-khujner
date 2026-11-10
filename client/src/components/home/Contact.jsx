import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', query: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4" />
            <span>Campus Location & Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">
            Contact & Visit Our School
          </h2>
          <p className="font-hindi text-base text-slate-600">
            प्रवेश संबंधी पूछताछ अथवा संपर्क हेतु विद्यालय कार्यालय में पधारें
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100 space-y-6">
              <h3 className="text-xl font-heading font-bold text-slate-900">
                School Administrative Office
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Official Campus Address</h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                      <strong>PM Shri Government Girls HSS School</strong><br />
                      Opposite Ganesh Mandir, Khujner,<br />
                      District Rajgarh, Madhya Pradesh — 465687
                    </p>
                    <p className="text-xs text-brand-orange font-semibold mt-1">UDISE Code: 23300137920</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Principal & School Contacts</h4>
                    <div className="mt-1 space-y-1">
                      <a
                        href="tel:9575962662"
                        className="block text-xs sm:text-sm text-slate-700 font-semibold hover:text-brand-orange transition-colors"
                      >
                        📞 Principal: +91 95759 62662
                      </a>
                      <a
                        href="tel:9575053750"
                        className="block text-xs sm:text-sm text-slate-700 font-semibold hover:text-brand-orange transition-colors"
                      >
                        📞 Office: +91 95750 53750
                      </a>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Available during school hours (Mon–Sat)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Official Email</h4>
                    <a
                      href="mailto:principalgghsskhujner@gmail.com"
                      className="text-xs sm:text-sm text-brand-orange font-semibold hover:underline block mt-0.5"
                    >
                      principalgghsskhujner@gmail.com
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">Direct Administrative Inquiries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Office Timings</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Monday to Saturday: 8:00 AM – 4:00 PM</p>
                    <p className="text-xs text-slate-400">Sundays & Gazette Holidays: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100">
              <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">
                Have a Question about Admissions?
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Leave your details below and our administrative office will assist you.
              </p>

              {submitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-emerald-800 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Thank you! Your inquiry has been noted. Please visit the school office during working hours.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Student Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter full name"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message / Class of Interest</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      placeholder="e.g. Admission for Class 11 Science Stream..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Office</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Embedded Interactive Map */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-4 shadow-sm border border-orange-100 overflow-hidden space-y-4">
            <div className="p-3">
              <h3 className="font-heading font-bold text-base text-slate-900">Campus Geographical Location</h3>
              <p className="text-xs text-slate-500">Opposite Ganesh Mandir, Khujner, District Rajgarh, MP - 465687</p>
            </div>
            
            <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
              <iframe
                title="Khujner MP Map"
                src="https://maps.google.com/maps?q=Ganesh%20Mandir,%20Khujner,%20Rajgarh,%20Madhya%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
