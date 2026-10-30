import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, BookOpen, Brain, Sparkles, Check, ArrowRight } from 'lucide-react';

interface AcademicProgramsProps {
  onLearnMore: (program: string) => void;
}

export const AcademicPrograms: React.FC<AcademicProgramsProps> = ({ onLearnMore }) => {
  const [selectedDivision, setSelectedDivision] = useState<'primary' | 'middle' | 'senior'>('middle');

  const divisions = {
    primary: {
      title: 'Primary Foundation Wing',
      grades: 'Nursery to Grade V · Ages 3–10',
      description: 'Cultivating wonder, expressive English articulation, foundational numeracy, and joyous social discovery in warm, child-centered environments.',
      focusAreas: [
        'Structured Phonics & Early Literary Immersion',
        'Inquiry-Based Environmental & Life Sciences',
        'Hands-on Concrete-to-Pictorial Mathematics',
        'Visual Arts, Orff Music, and Motor Dexterity',
        'Socio-Emotional Care & Empathy Circles',
      ],
      ratio: '1:12 Teacher-Student Ratio',
      quote: '“Every child enters school as an eager explorer. Our role is to ensure their curiosity grows stronger every day.”',
    },
    middle: {
      title: 'Middle School Exploration Wing',
      grades: 'Grades VI to VIII · Ages 11–14',
      description: 'Bridging foundational mastery with critical reasoning, scientific experimentation, collaborative coding, and persuasive debate.',
      focusAreas: [
        'Advanced English Rhetoric & World Literature',
        'Experimental Physics, Chemistry, and Biological Labs',
        'Algorithmic Thinking & Python/Robotics Foundations',
        'World Geography, Civics, and Model United Nations',
        'Inter-House Sports, Athletics & Performing Arts',
      ],
      ratio: '1:14 Teacher-Student Ratio',
      quote: '“Empowering young adolescents to challenge assumptions, articulate nuanced perspectives, and solve complex problems.”',
    },
    senior: {
      title: 'Senior Secondary & College Prep Wing',
      grades: 'Grades IX to XII · Ages 15–18',
      description: 'Rigorous pre-university academic excellence preparing students for global competitive examinations, university honors, and ethical leadership.',
      focusAreas: [
        'Stream Selection: STEM (Pure & Applied), Commerce, Humanities',
        'Advanced Cambridge & National Secondary Board Curriculum',
        'Dedicated University Admissions & Scholarship Counseling',
        'Original Capstone Research Paper & Innovation Defense',
        'Prefectorial Council & Community Impact Projects',
      ],
      ratio: '1:15 Teacher-Student Ratio',
      quote: '“Graduating scholars who not only excel academically, but possess the moral compass to create meaningful societal impact.”',
    },
  };

  const current = divisions[selectedDivision];

  return (
    <section id="academics" className="py-20 bg-[#070d19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Academic Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-crest text-white tracking-tight">
            Comprehensive Learning from Early Years to University
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A continuous, thoughtfully scaffolded curriculum designed to challenge the intellect, build moral resilience, and foster bilingual fluency.
          </p>
        </div>

        {/* Division Switcher Tabs */}
        <div className="flex justify-center">
          <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap gap-1 max-w-xl">
            <button
              type="button"
              onClick={() => setSelectedDivision('primary')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedDivision === 'primary'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Primary Foundation (Nursery&ndash;V)
            </button>

            <button
              type="button"
              onClick={() => setSelectedDivision('middle')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedDivision === 'middle'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Middle School (VI&ndash;VIII)
            </button>

            <button
              type="button"
              onClick={() => setSelectedDivision('senior')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedDivision === 'senior'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Senior Secondary (IX&ndash;XII)
            </button>
          </div>
        </div>

        {/* Dynamic Division Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDivision}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  {current.grades}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-crest text-white">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Core Focus Points */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Curriculum Cornerstones:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.focusAreas.map((area, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onLearnMore(current.title)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors cursor-pointer"
                >
                  <span>Download {current.title} Syllabus Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quote & Faculty Overview Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0b1426] border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Brain className="w-5 h-5" />
              </div>

              <blockquote className="text-sm font-serif-body italic text-slate-200 leading-relaxed">
                {current.quote}
              </blockquote>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Classroom Engagement</span>
                <span className="text-amber-300 font-mono font-semibold">{current.ratio}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
