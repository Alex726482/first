import React from 'react';
import { motion } from 'motion/react';
import { Compass, Trophy, Music, Globe, Users, Shield, Award, Sparkles } from 'lucide-react';

export const StudentLife: React.FC = () => {
  const houses = [
    { name: 'Sirius House', color: 'from-amber-500 to-amber-700', border: 'border-amber-500/40', badge: 'Loyalty & Courage', motto: '“Semper Fidelis”' },
    { name: 'Polaris House', color: 'from-blue-500 to-blue-700', border: 'border-blue-500/40', badge: 'Wisdom & Leadership', motto: '“Dux Vitae”' },
    { name: 'Vega House', color: 'from-emerald-500 to-emerald-700', border: 'border-emerald-500/40', badge: 'Creativity & Discovery', motto: '“Invenio Lumen”' },
    { name: 'Altair House', color: 'from-purple-500 to-purple-700', border: 'border-purple-500/40', badge: 'Integrity & Perseverance', motto: '“Fortitudo Vincit”' },
  ];

  const clubs = [
    { icon: Globe, title: 'Model United Nations & Parliamentary Debate', desc: 'Representing global delegations, drafting diplomacy resolutions, and competing at international summits.' },
    { icon: Music, title: 'Performing Arts & Symphony Orchestra', desc: 'String ensembles, annual Shakespeare drama festival, contemporary jazz band, and vocal choir.' },
    { icon: Trophy, title: 'Competitive Athletics & Swimming', desc: 'All-weather football turf, indoor basketball arena, semi-Olympic heated pool, and martial arts dojo.' },
    { icon: Sparkles, title: 'Astronomy & Environmental Stewardship', desc: 'Rooftop observatory telescope sessions, urban permaculture garden, and zero-waste recycling drives.' },
  ];

  return (
    <section id="student-life" className="py-20 bg-[#060b15] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Holistic Student Development</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-crest text-white tracking-tight">
            Life Beyond the Textbooks
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Character is forged on the playing fields, the debate podium, the theatre stage, and through passionate community fellowship.
          </p>
        </div>

        {/* The House System */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xl font-bold font-crest text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                The Four Collegiate Houses
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Fostering lifelong camaraderie, healthy sporting rivalry, and peer mentorship</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {houses.map((house, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl bg-slate-900/60 border ${house.border} space-y-3 relative overflow-hidden`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${house.color} p-0.5 shadow-md flex items-center justify-center text-white font-crest font-bold text-sm`}>
                  {house.name.charAt(0)}
                </div>

                <div>
                  <h4 className="text-base font-bold font-crest text-white">{house.name}</h4>
                  <div className="text-xs text-amber-300 font-serif-body italic">{house.motto}</div>
                </div>

                <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                  House Virtue: <strong className="text-slate-200">{house.badge}</strong>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extracurricular Clubs Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xl font-bold font-crest text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Signature Co-Curricular Academies
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubs.map((club, idx) => {
              const Icon = club.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold font-crest text-white">{club.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{club.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
