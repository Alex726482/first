import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, Feather, Download, Compass, ArrowRight } from 'lucide-react';
import { StoryDossier } from '../types';

interface ManuscriptEditorProps {
  dossier: StoryDossier;
  storyText: string;
  setStoryText: (text: string) => void;
  onContinue: (direction?: string) => void;
  isContinuing: boolean;
  theme: 'midnight' | 'parchment';
}

export const ManuscriptEditor: React.FC<ManuscriptEditorProps> = ({
  dossier,
  storyText,
  setStoryText,
  onContinue,
  isContinuing,
  theme,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedHookIndex, setSelectedHookIndex] = useState<number | null>(null);

  const wordCount = storyText.trim() ? storyText.trim().split(/\s+/).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handleCopy = () => {
    navigator.clipboard.writeText(`${dossier.title}\n\n${storyText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    const mdContent = `# ${dossier.title}
*Genre: ${dossier.genre}*  
*Mood: ${dossier.moodSummary}*

---

${storyText}

---
*Generated with AuraScribe - Multimodal Ghostwriting & Expressive Narration*
`;
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dossier.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'manuscript'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const firstLetter = storyText.trim().charAt(0);
  const restOfText = storyText.trim().slice(1);

  return (
    <div
      className={`rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl border transition-colors duration-300 space-y-6 ${
        theme === 'parchment'
          ? 'bg-[#fcf7ee] border-[#e7dac5] text-[#2c221b] shadow-amber-900/10'
          : 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-slate-950/40'
      }`}
    >
      {/* Top Meta Bar */}
      <div
        className={`flex items-center justify-between flex-wrap gap-3 border-b pb-4 ${
          theme === 'parchment' ? 'border-[#e7dac5]' : 'border-slate-800/80'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              theme === 'parchment'
                ? 'bg-amber-900/10 text-amber-900'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span
              className={`text-[11px] uppercase tracking-wider font-semibold ${
                theme === 'parchment' ? 'text-amber-900/70' : 'text-amber-400/90'
              }`}
            >
              Ghostwritten Opening Manuscript
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className={theme === 'parchment' ? 'text-stone-600' : 'text-slate-400'}>
                {dossier.genre}
              </span>
              <span>•</span>
              <span className={theme === 'parchment' ? 'text-stone-600' : 'text-slate-400'}>
                {wordCount} words (~{readingTimeMinutes} min read)
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              theme === 'parchment'
                ? 'border-stone-300 bg-white/70 hover:bg-white text-stone-800'
                : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            {isEditing ? 'Done Editing' : 'Edit Prose'}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`p-2 rounded-lg border transition-colors ${
              theme === 'parchment'
                ? 'border-stone-300 bg-white/70 hover:bg-white text-stone-800'
                : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
            title="Copy manuscript"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleExportMarkdown}
            className={`p-2 rounded-lg border transition-colors ${
              theme === 'parchment'
                ? 'border-stone-300 bg-white/70 hover:bg-white text-stone-800'
                : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
            title="Download Markdown"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Story Title */}
      <div className="text-center pt-2 pb-1 space-y-1">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-display-title font-bold tracking-tight ${
            theme === 'parchment' ? 'text-[#3b2b20]' : 'text-amber-100'
          }`}
        >
          {dossier.title}
        </h1>
        <div
          className={`w-24 h-0.5 mx-auto rounded-full ${
            theme === 'parchment' ? 'bg-amber-800/30' : 'bg-amber-500/40'
          }`}
        />
      </div>

      {/* Manuscript Prose Body */}
      {isEditing ? (
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Directly Edit Story Text:</label>
          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            rows={10}
            className={`w-full p-4 rounded-xl text-base md:text-lg font-serif-prose leading-relaxed border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
              theme === 'parchment'
                ? 'bg-white border-[#d8c8b0] text-[#2c221b]'
                : 'bg-slate-950/80 border-slate-800 text-slate-200'
            }`}
          />
        </div>
      ) : (
        <div
          className={`prose max-w-none text-base sm:text-lg md:text-xl font-serif-prose leading-relaxed tracking-wide select-text ${
            theme === 'parchment' ? 'text-[#2a221a]' : 'text-slate-200'
          }`}
        >
          {/* Illuminated Drop Cap for the opening paragraph */}
          <p className="whitespace-pre-line text-justify md:text-left">
            <span
              className={`float-left text-5xl md:text-6xl font-display-title font-bold leading-none pr-3 pt-1 select-none ${
                theme === 'parchment' ? 'text-amber-900' : 'text-amber-400'
              }`}
            >
              {firstLetter}
            </span>
            {restOfText}
          </p>
        </div>
      )}

      {/* Narrative Hooks (Suggested Continuation Branches) */}
      {dossier.continuationHooks && dossier.continuationHooks.length > 0 && (
        <div
          className={`pt-5 border-t space-y-3 ${
            theme === 'parchment' ? 'border-[#e7dac5]' : 'border-slate-800/80'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-500">
            <Compass className="w-3.5 h-3.5" />
            Suggested Narrative Paths
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dossier.continuationHooks.map((hook, idx) => {
              const isSelected = selectedHookIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedHookIndex(idx)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? theme === 'parchment'
                        ? 'border-amber-800 bg-amber-100/60'
                        : 'border-amber-400 bg-amber-950/30'
                      : theme === 'parchment'
                      ? 'border-[#e0d2bd] bg-white/50 hover:bg-white'
                      : 'border-slate-800/80 bg-slate-950/40 hover:bg-slate-800/40'
                  }`}
                >
                  <p
                    className={`italic mb-2 font-serif-prose text-[13px] ${
                      theme === 'parchment' ? 'text-stone-800' : 'text-slate-300'
                    }`}
                  >
                    &ldquo;{hook}&rdquo;
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onContinue(hook);
                    }}
                    disabled={isContinuing}
                    className="self-end inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500 hover:text-amber-400 pt-1"
                  >
                    <span>Follow Path</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Continue Story Bar */}
      <div
        className={`pt-4 border-t flex items-center justify-between flex-wrap gap-3 ${
          theme === 'parchment' ? 'border-[#e7dac5]' : 'border-slate-800/80'
        }`}
      >
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Feather className="w-3.5 h-3.5 text-amber-400" />
          <span>Keep writing with AI co-authorship</span>
        </div>

        <button
          type="button"
          onClick={() => {
            const hook = selectedHookIndex !== null ? dossier.continuationHooks[selectedHookIndex] : undefined;
            onContinue(hook);
          }}
          disabled={isContinuing}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
            isContinuing
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : theme === 'parchment'
              ? 'bg-amber-900 hover:bg-amber-950 text-amber-100 cursor-pointer shadow-amber-900/20'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 cursor-pointer shadow-amber-500/20 hover:scale-[1.02]'
          }`}
        >
          {isContinuing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Weaving Next Passage...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Continue Story</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
