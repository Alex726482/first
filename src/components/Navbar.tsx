import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenAdmissions: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmissions }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Quiet Announcement / Utility Bar */}
      <div className="bg-[#0b1426] border-b border-slate-800/80 text-[11px] text-slate-300 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-semibold uppercase tracking-wider">Admissions Notice</span>
            <span className="text-slate-500" aria-hidden="true">&bull;</span>
            <span>Admissions for Academic Year 2026&ndash;2027 are now open for Nursery to Grade XII</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Phone className="w-3 h-3 text-amber-400" />
              +1 (800) 428-STAR
            </span>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <span className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Mail className="w-3 h-3 text-amber-400" />
              admissions@brilliantstar.edu
            </span>
          </div>
        </div>
      </div>

      {/* Main Strict 3-Zone Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#070d19]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-slate-100 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b1426] rounded-[10px] flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-crest font-bold text-lg sm:text-xl tracking-tight text-white leading-none">
                Brilliant Star
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-medium mt-1">
                English School
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#about"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              About School
            </a>
            <a
              href="#academics"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Academics
            </a>
            <a
              href="#campus"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Campus &amp; Facilities
            </a>
            <a
              href="#student-life"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Student Life
            </a>
            <a
              href="#events"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Events &amp; Notices
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAdmissions}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#070d19] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Apply for 2026&ndash;27</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-slate-800 bg-[#070d19] px-6 py-5 space-y-4 shadow-2xl"
            >
              <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-amber-400 transition-colors"
                >
                  About School
                </a>
                <a
                  href="#academics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-amber-400 transition-colors"
                >
                  Academics
                </a>
                <a
                  href="#campus"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-amber-400 transition-colors"
                >
                  Campus &amp; Facilities
                </a>
                <a
                  href="#student-life"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-amber-400 transition-colors"
                >
                  Student Life
                </a>
                <a
                  href="#events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-amber-400 transition-colors"
                >
                  Events &amp; Notices
                </a>
              </nav>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmissions();
                  }}
                  className="w-full py-3 rounded-xl text-xs font-bold text-[#070d19] bg-gradient-to-r from-amber-400 to-amber-500 text-center shadow-md shadow-amber-500/20"
                >
                  Apply for 2026&ndash;27 Admissions
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
