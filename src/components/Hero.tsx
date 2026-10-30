import React from 'react';
import { motion } from 'motion/react';
import { Compass, Calendar, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface HeroProps {
  onOpenAdmissions: () => void;
  onOpenVirtualTour: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdmissions, onOpenVirtualTour }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24">
      {/* Background Soft Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 space-y-6 text-left"
          >
            {/* Clean Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Excellence in English-Medium Education</span>
              <span className="text-slate-600" aria-hidden="true">&bull;</span>
              <span className="text-slate-400 font-mono">Est. 1998</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.12] text-balance font-crest">
              Where Curiosity Ignites Character &amp; Lifelong Brilliance
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              Brilliant Star English School fosters intellectual courage, compassionate leadership,
              and global readiness through holistic English-medium instruction, cutting-edge STEM laboratories,
              and vibrant cultural arts.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                type="button"
                onClick={onOpenAdmissions}
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-[#070d19] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>Schedule a Campus Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenVirtualTour}
                className="px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Virtual Campus Tour</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cambridge &amp; National Board Accredited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Next Open House: Saturday, Nov 15</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image Showcase Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl shadow-blue-950/50 group">
              <img
                src="/src/assets/images/school_campus_hero_1793344314582.jpg"
                alt="Brilliant Star English School Campus Exterior"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Scrim Gradient for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d19]/90 via-[#070d19]/20 to-transparent" />

              {/* Interactive Badge on Image */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0b1426]/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                    Main Campus Grounds &bull; Heritage Quadrangle
                  </div>
                  <div className="text-sm font-semibold text-white">
                    12-Acre Sustainable Green Campus &bull; Central Library &bull; Athletic Arena
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenVirtualTour}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Quantitative KPI Strip (Section 5.13 Rule) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left"
        >
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-bold font-crest text-amber-400 tabular-nums">
              100%
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Board Exam Distinction</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Continuous top percentile academic honors</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-bold font-crest text-amber-400 tabular-nums">
              1 : 14
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Teacher-Student Ratio</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Personalized mentor care &amp; guidance</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-bold font-crest text-amber-400 tabular-nums">
              35+
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Co-Curricular Clubs &amp; Sports</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Robotics, debating, orchestra, athletics</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-bold font-crest text-amber-400 tabular-nums">
              28 Years
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Legacy of Academic Excellence</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Shaping ethical leaders since 1998</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
