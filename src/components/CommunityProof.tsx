import React from 'react';
import { Star, ShieldCheck, Award, Quote, CheckCircle2 } from 'lucide-react';

export const CommunityProof: React.FC = () => {
  const testimonials = [
    {
      name: 'Priya & Rajiv Sharma',
      relation: 'Parents of Rohan (Grade IX) & Ananya (Grade V)',
      text: 'What distinguishes Brilliant Star is how they see each child. Our son was hesitant in public speaking; through the debate society and English rhetoric mentoring, he represented the school at the National Youth Parliament this year.',
      rating: 5,
    },
    {
      name: 'Marcus Sterling',
      relation: 'Alumnus, Class of 2022 · Now at University of Oxford',
      text: 'The rigorous STEM foundation and independent research ethos at Brilliant Star prepared me effortlessly for university physics. The teachers don’t just instruct; they ignite a genuine hunger for discovery.',
      rating: 5,
    },
    {
      name: 'Dr. Sarah Al-Mansoor',
      relation: 'Parent of Zachary (Grade VII)',
      text: 'The blend of traditional academic discipline with modern robotics and an extraordinary performing arts program is unmatched. Zachary loves coming to school every single morning.',
      rating: 5,
    },
  ];

  const accreditations = [
    { name: 'Cambridge Assessment International Education', desc: 'Authorized International Examination Centre' },
    { name: 'British Council International School Award', desc: 'Recognized for Global Curriculum Integration' },
    { name: 'National Council for STEM Excellence', desc: 'Certified A+ Laboratory & Robotics Curriculum' },
    { name: 'Global Schools Forum Alliance', desc: 'Member Network of Progressive Independent Schools' },
  ];

  return (
    <section className="py-20 bg-[#070d19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Testimonials */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Community Voices
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-crest text-white">
              Trusted by Generations of Families
            </h2>
            <p className="text-sm text-slate-400">
              Hear directly from our parents and alumni about the transformative impact of a Brilliant Star education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-xs sm:text-sm text-slate-300 font-serif-body leading-relaxed italic">
                    &ldquo;{item.text}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-xs font-bold text-white font-crest">{item.name}</div>
                  <div className="text-[11px] text-slate-400">{item.relation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditations Strip */}
        <div className="pt-10 border-t border-slate-800 space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-mono">
              Accreditations &amp; Global Affiliations
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {accreditations.map((acc, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/80 text-center space-y-1"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
                <div className="text-xs font-bold text-slate-200">{acc.name}</div>
                <div className="text-[10px] text-slate-400">{acc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
