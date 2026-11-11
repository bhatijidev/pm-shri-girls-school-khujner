import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  MessageSquare, 
  Compass, 
  Bus, 
  HelpCircle, 
  Sparkles,
  PhoneCall,
  Calendar,
  Building,
  User,
  AlertTriangle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Admission in Class 9 / 10 / 11 / 12',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomTicket = 'PMSHRI-KHJ-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomTicket);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      inquiryType: 'Admission in Class 9 / 10 / 11 / 12',
      message: ''
    });
    setSubmitted(false);
  };

  const faqs = [
    {
      q: 'विद्यालय में प्रवेश (Admission) की प्रक्रिया क्या है?',
      a: 'कक्षा 9वीं से 12वीं में प्रवेश हेतु विद्यालय कार्यालय से निशुल्क प्रवेश फॉर्म प्राप्त कर सकते हैं। आवश्यक दस्तावेज: पूर्व कक्षा की अंकसूची, समग्र आईडी, आधार कार्ड, बैंक पासबुक एवं जाति प्रमाण पत्र।'
    },
    {
      q: 'क्या बालिकाओं के लिए शिक्षा निशुल्क है?',
      a: 'हाँ, पीएम श्री योजना एवं मध्यप्रदेश शासन के नियमानुसार शासकीय कन्या उ.मा.वि. खुजनेर में सभी छात्राओं हेतु नि:शुल्क शिक्षण, पुस्तकें एवं शासन की छात्रवृत्ति व साइकिल योजना सुविधाएं उपलब्ध हैं।'
    },
    {
      q: 'प्राचार्य अथवा शिक्षकों से मिलने का उचित समय क्या है?',
      a: 'अभिभावक एवं विद्यार्थी सोमवार से शनिवार सुबह 10:00 बजे से दोपहर 3:00 बजे के मध्य विद्यालय कार्यालय में संपर्क कर सकते हैं।'
    },
    {
      q: 'स्थानांतरण प्रमाण पत्र (TC) अथवा अंकसूची कैसे प्राप्त करें?',
      a: 'कार्यालय अधीक्षक / क्लर्क शाखा में आवेदन प्रस्तुत करें। सामान्यतः 2 से 3 कार्य दिवसों के भीतर प्रक्रिया पूरी कर दी जाती है।'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      
      {/* 1. Hero Header Banner */}
      <section className="relative bg-gradient-to-br from-brand-dark via-slate-900 to-brand-purple text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff6b35_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>Official School Contact Desk</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Contact & Visit <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-brand-saffron">
                PM SHRI Girls School Khujner
              </span>
            </h1>

            <p className="font-hindi text-lg sm:text-xl text-slate-300 font-medium">
              शासकीय कन्या उच्चतर माध्यमिक विद्यालय, खुजनेर — संपर्क एवं सहायता केंद्र
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>UDISE Code: <strong className="text-white">23300137920</strong></span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg">
                <Building className="w-4 h-4 text-orange-400" />
                <span>District: Rajgarh (M.P.)</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg">
                <span>● Office Open (Mon–Sat)</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        
        {/* 2. Key Contact Cards Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Principal Desk */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center mb-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg">Principal's Office</h3>
              <p className="text-xs text-slate-500 mt-0.5">प्राचार्य कक्ष — श्री हितेश सोनी (प्राचार्य)</p>
              <div className="mt-4 space-y-1">
                <a
                  href="tel:9575962662"
                  className="text-base font-bold text-brand-orange hover:underline block"
                >
                  +91 95759 62662
                </a>
                <p className="text-xs text-slate-500">Direct helpline for academic matters</p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href="tel:9575962662"
                className="w-full inline-flex items-center justify-center space-x-2 bg-orange-50 hover:bg-orange-100 text-brand-orange text-xs font-bold py-2 rounded-xl transition-colors"
              >
                <span>Call Principal Desk</span>
              </a>
            </div>
          </div>

          {/* Card 2: Administrative / Clerk Office */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg">School Office & Clerk</h3>
              <p className="text-xs text-slate-500 mt-0.5">कार्यालय अधीक्षक / प्रवेश एवं छात्रवृत्ति</p>
              <div className="mt-4 space-y-1">
                <a
                  href="tel:9575053750"
                  className="text-base font-bold text-blue-600 hover:underline block"
                >
                  +91 95750 53750
                </a>
                <p className="text-xs text-slate-500">Admissions, TC, Marksheets & Scholarships</p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href="tel:9575053750"
                className="w-full inline-flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold py-2 rounded-xl transition-colors"
              >
                <span>Call Office Clerk</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email Desk */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-red flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg">Official Email</h3>
              <p className="text-xs text-slate-500 mt-0.5">आधिकारिक ईमेल पत्र-व्यवहार</p>
              <div className="mt-4 space-y-1">
                <a
                  href="mailto:principalgghsskhujner@gmail.com"
                  className="text-xs font-bold text-brand-red hover:underline block break-all"
                >
                  principalgghsskhujner@gmail.com
                </a>
                <p className="text-xs text-slate-500">Monitored daily by administrative staff</p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href="mailto:principalgghsskhujner@gmail.com"
                className="w-full inline-flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-brand-red text-xs font-bold py-2 rounded-xl transition-colors"
              >
                <span>Send Official Email</span>
              </a>
            </div>
          </div>

          {/* Card 4: Visiting Hours */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg">Visiting Hours</h3>
              <p className="text-xs text-slate-500 mt-0.5">कार्यालयीन समय सारणी</p>
              <div className="mt-4 space-y-1 text-xs text-slate-600">
                <p><strong>School Hours:</strong> 8:00 AM – 4:00 PM</p>
                <p><strong>Parent Meetings:</strong> 10:00 AM – 3:00 PM</p>
                <p className="text-slate-400">Sunday & Holidays: Closed</p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <span className="w-full inline-flex items-center justify-center space-x-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold py-2 rounded-xl">
                <span>Working Days: Mon to Sat</span>
              </span>
            </div>
          </div>

        </div>

        {/* 3. Inquiry Form & Address/Helplines Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Contact & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-1.5 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Admissions & Inquiry Desk</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-slate-900">
                Send an Online Message or Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                प्रवेश, छात्रवृत्ति अथवा सामान्य जानकारी के लिए अपना विवरण दर्ज करें। विद्यालय कार्यालय आपसे संपर्क करेगा।
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  संदेश सफलतापूर्वक प्राप्त हुआ!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  धन्यवाद <strong>{formData.name}</strong> जी। आपकी पूछताछ विद्यालय कार्यालय में दर्ज कर ली गई है।
                </p>
                <div className="inline-block bg-white border border-emerald-200 px-4 py-2 rounded-xl text-xs font-mono text-emerald-800 font-bold shadow-sm">
                  Inquiry Ref No: {ticketId}
                </div>
                <p className="text-xs text-slate-500">
                  शीघ्र सहायता हेतु आप कार्यालय समय में <strong>+91 95759 62662</strong> पर भी सीधे संपर्क कर सकते हैं।
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Student / Parent Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Chandra Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Inquiry Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange bg-slate-50/50"
                    >
                      <option value="Admission in Class 9 / 10">Class 9 / 10 Admission</option>
                      <option value="Class 11 Science Stream">Class 11 Science (PCM / PCB)</option>
                      <option value="Class 11 Arts / Commerce">Class 11 Arts / Commerce</option>
                      <option value="TC / Marksheet / Certificate">TC / Marksheet Request</option>
                      <option value="Scholarship / PM SHRI Benefits">Scholarship / PM SHRI Benefits</option>
                      <option value="General Query">General School Information</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="कृपया अपनी बात या प्रश्न यहाँ लिखें..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange bg-slate-50/50 resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-red hover:to-brand-orange text-white font-bold rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry to Principal Office</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Physical Address & Women / Student Safety Helplines */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Campus Physical Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Geographical Address</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900">
                School Campus Location
              </h3>
              
              <div className="text-sm text-slate-700 space-y-2 leading-relaxed bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                <p className="font-bold text-slate-900">
                  PM SHRI Government Girls Higher Secondary School
                </p>
                <p className="font-hindi text-slate-600">
                  शासकीय कन्या उच्चतर माध्यमिक विद्यालय, खुजनेर
                </p>
                <p className="text-slate-600">
                  <strong>Landmark:</strong> Opposite Ganesh Mandir (गणेश मंदिर के सामने)
                </p>
                <p className="text-slate-600">
                  <strong>Tehsil:</strong> Khujner, <strong>District:</strong> Rajgarh
                </p>
                <p className="text-slate-600">
                  <strong>State:</strong> Madhya Pradesh — <strong>PIN:</strong> 465687
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Ganesh+Mandir+Khujner+Rajgarh+Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:text-brand-orange hover:border-brand-orange font-bold text-xs transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Emergency & Girls Welfare Helplines (Crucial Govt Feature) */}
            <div className="bg-gradient-to-br from-slate-900 to-brand-dark text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Safety & Student Welfare Helplines</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-white">
                Emergency & Support Helplines
              </h3>
              <p className="text-xs text-slate-400">
                मध्यप्रदेश शासन एवं भारत सरकार द्वारा 24x7 संचालित निशुल्क हेल्पलाइन नंबर:
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href="tel:1090"
                  className="bg-white/10 hover:bg-white/15 p-3 rounded-xl border border-white/10 block transition-colors"
                >
                  <span className="text-[10px] uppercase font-bold text-rose-300 block">Women Helpline</span>
                  <span className="text-lg font-extrabold text-white">1090 / 181</span>
                  <span className="text-[10px] text-slate-400 block">महिला हेल्पलाइन</span>
                </a>

                <a
                  href="tel:1098"
                  className="bg-white/10 hover:bg-white/15 p-3 rounded-xl border border-white/10 block transition-colors"
                >
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Child Helpline</span>
                  <span className="text-lg font-extrabold text-white">1098</span>
                  <span className="text-[10px] text-slate-400 block">चाइल्डलाइन सेवा</span>
                </a>

                <a
                  href="tel:112"
                  className="bg-white/10 hover:bg-white/15 p-3 rounded-xl border border-white/10 block transition-colors"
                >
                  <span className="text-[10px] uppercase font-bold text-blue-300 block">Emergency Police</span>
                  <span className="text-lg font-extrabold text-white">112</span>
                  <span className="text-[10px] text-slate-400 block">आपातकालीन सहायता</span>
                </a>

                <a
                  href="tel:18002330175"
                  className="bg-white/10 hover:bg-white/15 p-3 rounded-xl border border-white/10 block transition-colors"
                >
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">MPBSE Counselling</span>
                  <span className="text-sm font-extrabold text-white">1800 233 0175</span>
                  <span className="text-[10px] text-slate-400 block">बोर्ड परीक्षा परामर्श</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 4. Interactive Google Map & Transit Instructions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4" />
                <span>Interactive Campus Map</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-slate-900">
                Find Us in Khujner
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                School Location: Opposite Ganesh Mandir, Main Road, Khujner, Rajgarh (M.P.)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">
                <Bus className="w-4 h-4 text-brand-orange" />
                <span>Khujner Bus Stand: 800m</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Rajgarh HQ: 35km</span>
              </span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=PM+SHRI+Government+Girls+Higher+Secondary+School+Khujner+Rajgarh+MP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 text-brand-orange font-bold transition-all shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
            <iframe
              title="PM SHRI Girls School Khujner Map"
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

        {/* 5. Frequently Asked Questions (FAQ) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>General Guidance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
              Frequently Asked Questions (अक्सर पूछे जाने वाले प्रश्न)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-heading font-bold text-slate-900 text-sm flex items-start space-x-2">
                  <span className="text-brand-orange font-bold">Q{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
