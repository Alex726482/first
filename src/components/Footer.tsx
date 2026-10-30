import React from 'react';
import { Star, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040810] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0b1426] rounded-[10px] flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-crest font-bold text-lg text-white block leading-none">
                  Brilliant Star
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-medium">
                  English School
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              A premier co-educational English-medium institution dedicated to academic mastery,
              scientific inquiry, moral fortitude, and preparing articulate global leaders since 1998.
            </p>

            <div className="text-[11px] text-slate-500 font-crest italic">
              School Motto: &ldquo;Per Aspera Ad Astra&rdquo; &bull; Through hard work, to the stars.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Academics
            </h4>
            <ul className="space-y-2">
              <li><a href="#academics" className="hover:text-amber-400 transition-colors">Primary Foundation Wing</a></li>
              <li><a href="#academics" className="hover:text-amber-400 transition-colors">Middle School STEM</a></li>
              <li><a href="#academics" className="hover:text-amber-400 transition-colors">Senior Secondary College Prep</a></li>
              <li><a href="#campus" className="hover:text-amber-400 transition-colors">Robotics &amp; Science Labs</a></li>
              <li><a href="#campus" className="hover:text-amber-400 transition-colors">The Alexandria Library</a></li>
            </ul>
          </div>

          {/* Student Life */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Life at School
            </h4>
            <ul className="space-y-2">
              <li><a href="#student-life" className="hover:text-amber-400 transition-colors">The Four Collegiate Houses</a></li>
              <li><a href="#student-life" className="hover:text-amber-400 transition-colors">Model United Nations</a></li>
              <li><a href="#student-life" className="hover:text-amber-400 transition-colors">Philharmonic Orchestra</a></li>
              <li><a href="#student-life" className="hover:text-amber-400 transition-colors">Athletics &amp; Swimming Arena</a></li>
              <li><a href="#events" className="hover:text-amber-400 transition-colors">Term Dates &amp; Events</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Contact &amp; Admissions
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>42 Starlight Boulevard, Education Enclave, BS-1092</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (800) 428-STAR</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>admissions@brilliantstar.edu</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Mon&ndash;Fri: 8:00 AM &ndash; 4:30 PM<br />Sat: 9:00 AM &ndash; 1:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex items-center justify-between flex-wrap gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; 2026 Brilliant Star English School. All rights reserved. Recognized by Cambridge Assessment International Education.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
