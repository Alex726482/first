import React, { useState } from 'react';
import { Eye, Palette, Compass, Wind, Flame, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { StoryDossier } from '../types';

interface SceneDossierProps {
  dossier: StoryDossier;
  modelUsed?: string;
}

export const SceneDossier: React.FC<SceneDossierProps> = ({ dossier, modelUsed }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Scene &amp; Atmosphere Analysis
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300">
                {modelUsed || 'gemini-4-argon'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">Extracted mood, sensory cues, and narrative tension</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/40 hover:bg-slate-800 transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Collapse</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Expand Details</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Mood Summary Quote Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 border border-indigo-900/50">
        <div className="text-xs uppercase font-semibold tracking-wider text-indigo-300 mb-1 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Mood &amp; Emotional Aura
        </div>
        <p className="text-sm font-serif-prose italic text-slate-200 leading-relaxed">
          &ldquo;{dossier.moodSummary}&rdquo;
        </p>
      </div>

      {/* Dominant Palette Swatches */}
      {dossier.colorPalette && dossier.colorPalette.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            Extracted Palette
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {dossier.colorPalette.map((color, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-950/60 border border-slate-800"
              >
                <div
                  className="w-6 h-6 rounded-md shadow-sm shrink-0 border border-white/10"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="overflow-hidden">
                  <div className="text-[11px] font-medium text-slate-200 truncate">{color.name}</div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase">{color.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expanded breakdown */}
      {isExpanded && dossier.sceneAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 border-t border-slate-800/60">
          {/* Setting & Environment */}
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Environment &amp; Setting
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {dossier.sceneAnalysis.environment}
            </p>
          </div>

          {/* Sensory Details */}
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
              Sensory Atmosphere
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {dossier.sceneAnalysis.sensoryDetails}
            </p>
          </div>

          {/* Implicit Conflict */}
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Latent Conflict
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {dossier.sceneAnalysis.implicitConflict}
            </p>
          </div>
        </div>
      )}

      {/* Key Motifs Tags */}
      {dossier.sceneAnalysis?.keyMotifs && dossier.sceneAnalysis.keyMotifs.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3 h-3 text-slate-500" />
            Visual Motifs:
          </span>
          {dossier.sceneAnalysis.keyMotifs.map((motif, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/70 text-slate-300 border border-slate-700/60"
            >
              {motif}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
