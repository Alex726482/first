import React from 'react';
import { Quote, Feather, Compass, CheckCircle } from 'lucide-react';

export const PrincipalWelcome: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#070d19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Principal's Portrait & Credo */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="relative inline-block mx-auto lg:mx-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl bg-slate-950 p-1">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                  alt="Dr. Evelyn Vance - Principal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg font-crest font-bold text-xs">
                BSES
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-crest text-white">Dr. Evelyn Vance, Ed.D.</h3>
              <p className="text-xs text-amber-400 font-medium">Head of School &bull; Principal</p>
              <p className="text-[11px] text-slate-400 font-mono">B.A. (Hons), M.Ed. (Cantab), Ed.D. (Oxon)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-semibold text-amber-300 uppercase tracking-wider block">School Motto:</span>
              <p className="font-crest font-bold text-base text-white">&ldquo;Per Aspera Ad Astra&rdquo;</p>
              <p className="text-slate-400 italic">Through hard work, to the stars.</p>
            </div>
          </div>

          {/* Right Column: Letter to Parents and Students */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Feather className="w-4 h-4 text-amber-400" />
              <span>Head of School&rsquo;s Address</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-crest text-white tracking-tight">
              &ldquo;We do not merely teach children what to think; we teach them how to question with joy and reason with integrity.&rdquo;
            </h2>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-serif-body">
              <p>
                Welcome to Brilliant Star English School. For twenty-eight years, our quadrangles have echoed with the joyous, earnest questions of students who dare to imagine a better tomorrow.
              </p>
              <p>
                In a rapidly shifting global landscape, academic rigor alone is insufficient. We strive to cultivate emotional resilience, boundless empathy, scientific curiosity, and a deep, articulate command of language that allows our young scholars to communicate their ideas across cultures and continents.
              </p>
              <p>
                Whether in our robotics laboratories, on our championship athletic fields, or immersed in a Shakespearean rehearsal, every student at Brilliant Star is seen, nurtured, and challenged to achieve their personal zenith.
              </p>
            </div>

            {/* Core Values Bullets */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">Moral Integrity</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">Inquiry &amp; Logic</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">Global Empathy</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">Creative Courage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
