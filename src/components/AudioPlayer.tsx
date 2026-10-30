import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause, RotateCcw, Download, Sparkles, AlertCircle, Radio, Music } from 'lucide-react';
import { VOICE_OPTIONS } from '../data/presetImages';
import { NarrationVoice } from '../types';

interface AudioPlayerProps {
  storyText: string;
  storyTitle: string;
  defaultStyle?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  storyText,
  storyTitle,
  defaultStyle,
}) => {
  const [selectedVoice, setSelectedVoice] = useState<NarrationVoice>('Fenrir');
  const [narrationStyle, setNarrationStyle] = useState<string>(
    defaultStyle || 'Evocative, dramatic audiobook narrator with poetic pacing and natural pauses'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('gemini-3.8-flash-tts');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync style if defaultStyle changes from newly analyzed story
  useEffect(() => {
    if (defaultStyle) {
      setNarrationStyle(defaultStyle);
    }
  }, [defaultStyle]);

  // Clean up audio object URL on unmount or new audio
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleGenerateTTS = async () => {
    if (!storyText.trim()) {
      setError('No story text available to narrate.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setIsPlaying(false);

    try {
      const response = await fetch('/api/narrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: storyText,
          voiceName: selectedVoice,
          style: narrationStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to narrate story.');
      }

      setModelUsed(data.modelUsed || 'gemini-3.8-flash-tts');

      // Convert base64 WAV to blob URL
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: data.mimeType || 'audio/wav' });
      const newUrl = URL.createObjectURL(blob);

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      setAudioUrl(newUrl);

      // Autoplay upon generation
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.playbackRate = playbackRate;
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((e) => {
            console.warn('Autoplay prevented by browser:', e);
          });
        }
      }, 100);
    } catch (err: any) {
      console.error('TTS narration error:', err);
      setError(err?.message || 'Failed to generate voice narration. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error('Playback error:', e);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-2xl space-y-4">
      {/* Hidden audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
          onError={(e) => {
            console.error('Audio playback error:', e);
            setError('Error during audio playback.');
            setIsPlaying(false);
          }}
        />
      )}

      {/* Header and Voice Selector */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Expressive AI Voice Narration
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300">
                {modelUsed}
              </span>
            </h3>
            <p className="text-xs text-slate-400">Cinematic text-to-speech with expressive literary modulation</p>
          </div>
        </div>

        {/* Read Aloud Trigger Button */}
        <button
          type="button"
          onClick={handleGenerateTTS}
          disabled={isGenerating || !storyText.trim()}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 shadow-md ${
            isGenerating || !storyText.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 hover:scale-[1.02] cursor-pointer'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Synthesizing Voice...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>{audioUrl ? 'Re-Synthesize Narration' : 'Read Aloud'}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Voice Personas Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {VOICE_OPTIONS.map((voice) => {
          const isSelected = selectedVoice === voice.id;
          return (
            <button
              key={voice.id}
              type="button"
              onClick={() => setSelectedVoice(voice.id)}
              className={`p-2.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-amber-400 bg-amber-950/20 shadow-md shadow-amber-500/10'
                  : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                  {voice.name}
                </span>
                {isSelected && <Radio className="w-3 h-3 text-amber-400" />}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-1">{voice.persona}</div>
              <div className="text-[9px] text-slate-500 mt-1 line-clamp-1">{voice.gender}</div>
            </button>
          );
        })}
      </div>

      {/* Narration Tone & Style Prompt */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400 shrink-0 text-[11px] font-medium uppercase tracking-wider">
          Narrator Direction:
        </span>
        <input
          type="text"
          value={narrationStyle}
          onChange={(e) => setNarrationStyle(e.target.value)}
          placeholder="e.g. Deep, atmospheric audiobook narrator with poetic pacing"
          className="w-full text-xs px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Audio Player Controls & Waveform */}
      {audioUrl ? (
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          {/* Visual Waveform Bar Animation */}
          <div className="flex items-center justify-center gap-1 h-9 px-4 bg-slate-900/60 rounded-lg overflow-hidden border border-slate-800/60">
            {Array.from({ length: 36 }).map((_, idx) => {
              const baseHeight = 15 + Math.sin(idx * 0.45) * 40;
              return (
                <div
                  key={idx}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPlaying
                      ? 'bg-gradient-to-t from-amber-500 to-amber-300'
                      : 'bg-slate-700/60'
                  }`}
                  style={{
                    height: isPlaying
                      ? `${Math.max(12, (baseHeight + (idx % 5) * 8) % 100)}%`
                      : '18%',
                    animation: isPlaying
                      ? `waveBar 1.${(idx % 7) + 2}s ease-in-out infinite alternate`
                      : 'none',
                  }}
                />
              );
            })}
          </div>

          {/* Time Scrubber */}
          <div className="space-y-1">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Music className="w-3 h-3 text-amber-400/70" />
                24kHz Mono WAV
              </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-md shadow-amber-400/20 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Restart narration"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Speed Buttons */}
              <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-[11px]">
                {[0.85, 1.0, 1.2].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => handleRateChange(rate)}
                    className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                      playbackRate === rate
                        ? 'bg-amber-400 text-slate-950'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Download WAV File */}
            <a
              href={audioUrl}
              download={`${storyTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'story'}_narration.wav`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Audio (.wav)</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 text-center flex flex-col items-center justify-center py-5">
          <Volume2 className="w-6 h-6 text-slate-600 mb-1" />
          <p className="text-xs text-slate-400">
            Click <strong className="text-amber-300 font-semibold">&ldquo;Read Aloud&rdquo;</strong> to generate expressive voice narration with <span className="font-mono text-amber-400">gemini-3.8-flash-tts</span>.
          </p>
        </div>
      )}
    </div>
  );
};
