import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Image as ImageIcon, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';
import { PRESET_IMAGES, GENRE_OPTIONS, TONE_OPTIONS } from '../data/presetImages';

interface ImageUploaderProps {
  onAnalyze: (imageBase64: string, mimeType: string, genre: string, tone: string, customPrompt: string) => void;
  isLoading: boolean;
  selectedImageUrl: string | null;
  setSelectedImageUrl: (url: string | null) => void;
  selectedBase64: string | null;
  setSelectedBase64: (base64: string | null) => void;
  mimeType: string;
  setMimeType: (mime: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onAnalyze,
  isLoading,
  selectedImageUrl,
  setSelectedImageUrl,
  selectedBase64,
  setSelectedBase64,
  mimeType,
  setMimeType,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>(GENRE_OPTIONS[0]);
  const [selectedTone, setSelectedTone] = useState<string>(TONE_OPTIONS[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }
    setErrorMsg(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImageUrl(result);
      // Extract pure base64
      const base64Data = result.split(',')[1] || result;
      setSelectedBase64(base64Data);
    };
    reader.onerror = () => {
      setErrorMsg('Could not read file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Convert preset image to base64 via canvas or fetch
  const handleSelectPreset = async (preset: typeof PRESET_IMAGES[0]) => {
    setErrorMsg(null);
    setSelectedImageUrl(preset.fullUrl);
    setSelectedGenre(preset.genre);
    setSelectedTone(preset.tone);

    try {
      const response = await fetch(preset.fullUrl);
      const blob = await response.blob();
      setMimeType(blob.type || 'image/jpeg');

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1] || result;
        setSelectedBase64(base64Data);
      };
      reader.readAsDataURL(blob);
    } catch {
      // Fallback: draw image to canvas to bypass potential CORS in browser
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg', 0.85);
          setMimeType('image/jpeg');
          setSelectedBase64(dataURL.split(',')[1]);
        }
      };
      img.onerror = () => {
        setErrorMsg('Failed to load preset image. Please upload a local image file.');
      };
      img.src = preset.fullUrl;
    }
  };

  const handleStartAnalysis = () => {
    if (!selectedBase64) {
      setErrorMsg('Please select or upload an initial image first.');
      return;
    }
    setErrorMsg(null);
    onAnalyze(selectedBase64, mimeType, selectedGenre, selectedTone, customPrompt);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-amber-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            1. Visual Inspiration Canvas
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload an image to awaken the AI ghostwriter. Powered by <span className="text-amber-400 font-medium">gemini-4-argon</span>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 text-slate-300 flex items-center gap-1.5 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          {showAdvanced ? 'Hide Directives' : 'Writing Directives'}
        </button>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-950/60 border border-red-800/80 text-red-300 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Upload Drop Zone & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Upload Box */}
        <div className="lg:col-span-7">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] ${
              dragActive
                ? 'border-amber-400 bg-amber-950/20 shadow-lg shadow-amber-500/10'
                : selectedImageUrl
                ? 'border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50'
                : 'border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
            />

            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>

            <p className="text-sm font-medium text-slate-200">
              Drag &amp; drop an image, or <span className="text-amber-400 underline underline-offset-2">browse</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">Supports PNG, JPG, WebP, GIF (up to 20MB)</p>

            {selectedImageUrl && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Image loaded &amp; ready for scene analysis</span>
              </div>
            )}
          </div>
        </div>

        {/* Selected Image Preview */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          {selectedImageUrl ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner group">
              <img
                src={selectedImageUrl}
                alt="Uploaded Scene"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 truncate font-mono">
                Active Visual Anchor
              </div>
            </div>
          ) : (
            <div className="w-full aspect-video rounded-xl border border-slate-800 bg-slate-950/50 flex flex-col items-center justify-center p-4 text-center">
              <ImageIcon className="w-8 h-8 text-slate-600 mb-2 opacity-50" />
              <span className="text-xs text-slate-500">No image chosen yet</span>
              <span className="text-[11px] text-slate-600 mt-1">Select from curated presets below or upload</span>
            </div>
          )}
        </div>
      </div>

      {/* Curated Atmospheric Presets */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Curated Atmospheric Presets
          </span>
          <span className="text-[11px] text-slate-500">1-click instant load</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {PRESET_IMAGES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="group relative rounded-xl overflow-hidden border border-slate-800 hover:border-amber-400/80 transition-all duration-200 text-left bg-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={preset.thumbnail}
                  alt={preset.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-2">
                <div className="text-[11px] font-semibold text-slate-200 truncate group-hover:text-amber-300">
                  {preset.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{preset.genre}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Writing Directives (Collapsible) */}
      {showAdvanced && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Genre Flavor
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-400"
              >
                {GENRE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Atmospheric Tone
              </label>
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-400"
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Director's Note / Writing Directive (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 'Focus on the lone silhouette on the roof' or 'Second-person perspective'"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      )}

      {/* Action CTA */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Multimodal Vision: <strong className="text-amber-300">gemini-4-argon</strong></span>
        </div>

        <button
          type="button"
          onClick={handleStartAnalysis}
          disabled={!selectedBase64 || isLoading}
          className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2.5 shadow-lg transition-all duration-300 ${
            !selectedBase64 || isLoading
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] cursor-pointer'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Scene &amp; Ghostwriting...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Ghostwrite Opening Paragraph</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
