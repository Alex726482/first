import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Compass, MapPin } from 'lucide-react';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ isOpen, onClose }) => {
  const [currentStop, setCurrentStop] = useState<number>(0);

  if (!isOpen) return null;

  const stops = [
    {
      title: 'Main Entrance & Heritage Quadrangle',
      image: '/src/assets/images/school_campus_hero_1793344314582.jpg',
      category: 'Campus Grounds',
      description: 'The architectural heart of Brilliant Star English School. Featuring historic brickwork seamlessly integrated with modern glass atriums and sprawling manicured botanical lawns where school assemblies and cultural convocations convene.',
      keyFeatures: ['Historic Clock Pavilion & Crest', '12-Acre Sustainable Campus', 'Wi-Fi Enabled Outdoor Amphitheatre'],
    },
    {
      title: 'STEM & Robotics Innovation Laboratory',
      image: '/src/assets/images/stem_robotics_lab_1793344316970.jpg',
      category: 'Science Complex',
      description: 'A certified research environment where students master automated robotics, 3D additive manufacturing, optics, and microbiology under expert faculty guidance.',
      keyFeatures: ['Precision 3D Rapid Prototyping', 'Digital High-Magnification Microscopy', 'National Science Olympiad Prep Center'],
    },
    {
      title: 'Interactive Smart Classroom Wing',
      image: '/src/assets/images/interactive_classroom_1793344314382.jpg',
      category: 'Academic Wings',
      description: 'Acoustically treated, naturally illuminated learning spaces equipped with multi-touch displays and modular collaborative seating to encourage energetic debate and peer-to-peer discourse.',
      keyFeatures: ['Interactive Multi-Touch 4K Panels', 'Ergonomic Active Posture Seating', 'Acoustic Sound Dampening Systems'],
    },
    {
      title: 'The Alexandria Grand Library & Sanctuary',
      image: '/src/assets/images/library_reading_sanctuary_1793344316613.jpg',
      category: 'Research & Humanities',
      description: 'A double-height timber-clad intellectual sanctuary housing over 28,000 physical volumes, digital scholarly journal terminals, and quiet individual reading alcoves overlooking the gardens.',
      keyFeatures: ['28,000+ Curated Volumes', 'Quiet Research & Philosophy Pods', 'Archival Literature & Manuscript Collection'],
    },
  ];

  const current = stops[currentStop];

  const handleNext = () => {
    setCurrentStop((prev) => (prev + 1) % stops.length);
  };

  const handlePrev = () => {
    setCurrentStop((prev) => (prev - 1 + stops.length) % stops.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#070d19] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-crest text-white">
              Interactive 360&deg; Campus Walkthrough
            </h3>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Stop {currentStop + 1} of {stops.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Frame with Prev / Next Overlays */}
        <div className="relative aspect-[16/9] sm:aspect-[21/10] bg-slate-950 overflow-hidden group">
          <img
            src={current.image}
            alt={current.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-transparent to-transparent opacity-60" />

          {/* Navigation Controls */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-transform hover:scale-105 cursor-pointer"
            aria-label="Previous Stop"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-transform hover:scale-105 cursor-pointer"
            aria-label="Next Stop"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs text-amber-300 font-semibold bg-slate-950/70 px-3 py-1 rounded-full border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{current.category}</span>
          </div>
        </div>

        {/* Info & Checkpoints */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold font-crest text-white">
              {current.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Key Highlights:</span>
            {current.keyFeatures.map((feat, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
              >
                {feat}
              </span>
            ))}
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {stops.map((stop, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentStop(i)}
                className={`relative rounded-xl overflow-hidden aspect-[16/10] border transition-all ${
                  currentStop === i
                    ? 'border-amber-400 ring-2 ring-amber-400/40'
                    : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={stop.image}
                  alt={stop.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
