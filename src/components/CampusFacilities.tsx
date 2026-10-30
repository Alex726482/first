import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Microscope, BookOpen, Monitor, Trophy, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface CampusFacilitiesProps {
  onFacilityClick: (facilityName: string) => void;
}

export const CampusFacilities: React.FC<CampusFacilitiesProps> = ({ onFacilityClick }) => {
  const [activeFacility, setActiveFacility] = useState<number>(0);

  const facilities = [
    {
      id: 'stem-lab',
      title: 'Advanced STEM & Robotics Innovation Center',
      tagline: 'Empowering future engineers, scientists, and inventors through experiential discovery.',
      image: '/src/assets/images/stem_robotics_lab_1793344316970.jpg',
      icon: Microscope,
      highlights: [
        '3D printers, IoT automation kits, and micro-controllers',
        'High-magnification binocular optical & digital microscopes',
        'Dedicated faculty mentorship for National Science Olympiads',
        'Certified chemical & physics safety workstations',
      ],
      stats: '4 Specialised Labs',
    },
    {
      id: 'smart-classrooms',
      title: 'Interactive Smart Classrooms & AV Studio',
      tagline: 'Acoustically tuned, naturally illuminated learning environments with digital interactive panels.',
      image: '/src/assets/images/interactive_classroom_1793344314382.jpg',
      icon: Monitor,
      highlights: [
        'Ultra-HD interactive multi-touch boards in every room',
        'Modular collaborative seating for team-based inquiry',
        'Ergonomic posture-support desks and air purification systems',
        'Fiber-optic connectivity and digital tablet resource hubs',
      ],
      stats: '52 Digital Classrooms',
    },
    {
      id: 'grand-library',
      title: 'The Alexandria Grand Library & Reading Sanctuary',
      tagline: 'Two sunlit levels holding over 28,000 volumes, archival manuscripts, and digital journal archives.',
      image: '/src/assets/images/library_reading_sanctuary_1793344316613.jpg',
      icon: BookOpen,
      highlights: [
        'Over 28,000 curated books spanning literature, science, and history',
        'Silent individual research alcoves with high-speed academic database access',
        'Junior reading lounge designed to foster early childhood literacy',
        'Weekly author salons, poetry circles, and book clubs',
      ],
      stats: '28,000+ Volumes',
    },
  ];

  return (
    <section id="campus" className="py-20 bg-[#060b15] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>World-Class Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-crest text-white tracking-tight">
              Spaces Designed to Spark Wonder
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              From high-precision robotics laboratories to double-height timber libraries, our 12-acre campus provides the physical foundation for boundless curiosity.
            </p>
          </div>

          {/* Interactive Facility Pill-Free Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {facilities.map((fac, idx) => (
              <button
                key={fac.id}
                type="button"
                onClick={() => setActiveFacility(idx)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFacility === idx
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {fac.id === 'stem-lab' ? 'STEM Labs' : fac.id === 'smart-classrooms' ? 'Classrooms' : 'Library'}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Showcase Card with Smooth Transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-800">
          {/* Left Visual Area */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-slate-950 border border-slate-700/80 group">
            <img
              src={facilities[activeFacility].image}
              alt={facilities[activeFacility].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold text-amber-300 font-crest">
                {facilities[activeFacility].stats}
              </span>
              <span className="text-slate-300">
                Click to inspect facility specs
              </span>
            </div>
          </div>

          {/* Right Content Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold font-mono">
                Facility Highlight 0{activeFacility + 1}
              </span>
              <h3 className="text-2xl font-bold font-crest text-white">
                {facilities[activeFacility].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {facilities[activeFacility].tagline}
              </p>
            </div>

            {/* Bullet Highlights */}
            <div className="space-y-3 pt-2">
              {facilities[activeFacility].highlights.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onFacilityClick(facilities[activeFacility].title)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Request Facility Tour Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Bento Cards for Quick Glance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            const isSelected = activeFacility === index;
            return (
              <motion.div
                key={facility.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveFacility(index)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-400/5'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {facility.stats}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 font-crest">
                  {facility.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {facility.tagline}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
