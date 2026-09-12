import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Volume2, Upload, Sparkles, Music } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthday.config';

interface VoiceNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  customAudio?: string;
  onUpdateAudio?: (audioUrl: string) => void;
  onPauseBgm?: () => void;
  onResumeBgm?: () => void;
}

export const VoiceNoteModal: React.FC<VoiceNoteModalProps> = ({
  isOpen,
  onClose,
  config,
  customAudio,
  onUpdateAudio,
  onPauseBgm,
  onResumeBgm,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const vnConfig = config.gifts.voiceNote;
  const audioSrc = customAudio || vnConfig.audioUrl;

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    onResumeBgm?.();
    onClose();
  };

  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onResumeBgm?.();
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          onPauseBgm?.();
        })
        .catch((e) => console.log('Audio playback error:', e));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
        onPauseBgm?.();
      }
    }
  };

  const handleUploadAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateAudio) {
      const url = URL.createObjectURL(file);
      onUpdateAudio(url);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !time) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-lg bg-[#FFFDF9] border border-white/90 rounded-3xl shadow-2xl p-5 sm:p-7 z-10 max-h-[90vh] flex flex-col text-left overflow-y-auto"
        >
          {/* Audio Tag */}
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => {
              setIsPlaying(false);
              onResumeBgm?.();
            }}
          />

          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFAAA6] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-serif font-bold text-[#7A5C58] uppercase tracking-wider">
                {vnConfig.tag}
              </span>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition cursor-pointer"
              title="Tutup"
            >
              <X size={16} />
            </button>
          </div>

          {/* Title */}
          <div className="my-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FFE5D9] flex items-center justify-center mb-2 shadow-xs">
              <Music size={24} className="text-[#4A2E2B]" />
            </div>
            <h3 className="text-xl font-serif font-black text-[#4A2E2B]">
              {vnConfig.title}
            </h3>
            <p className="text-xs text-[#7A5C58] font-serif mt-1 max-w-sm mx-auto">
              {vnConfig.subtitle}
            </p>
          </div>

          {/* Player Box */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-stone-200/80 my-2">
            {/* Audio Wave Visualizer Bars */}
            <div className="flex items-center justify-center gap-1.5 h-10 mb-4 px-2">
              {[40, 65, 30, 85, 95, 55, 75, 45, 90, 60, 35, 80, 50, 70, 90, 45, 60].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-[#FFAAA6]' : 'bg-stone-200'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * (Math.sin(currentTime * 5 + i) + 1.2)) / 2.2)}%` : '20%',
                  }}
                />
              ))}
            </div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#FFAAA6]"
            />

            <div className="flex justify-between text-[11px] font-mono text-stone-500 font-semibold mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <button
                onClick={handleRestart}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition cursor-pointer"
                title="Putar Ulang dari Awal"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={togglePlay}
                className="w-13 h-13 rounded-full cohesive-pill-btn flex items-center justify-center shadow-md transition active:scale-95 cursor-pointer text-[#4A2E2B]"
                title={isPlaying ? 'Jeda' : 'Putar'}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
              </button>

              <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                <Volume2 size={16} />
              </div>
            </div>
          </div>

          {/* Intro & Prayer Notes */}
          <div className="mt-3 space-y-2">
            <p className="text-xs text-[#7A5C58] font-serif italic text-center px-3">
              "{vnConfig.introText}"
            </p>

            {vnConfig.notes && vnConfig.notes.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/50 space-y-1.5 text-xs font-serif text-[#5D3A36]">
                <div className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                  <Sparkles size={12} className="text-[#FFAAA6]" />
                  <span>Doa & Untaian Kata:</span>
                </div>
                {vnConfig.notes.map((note, idx) => (
                  <p key={idx} className="leading-relaxed pl-2 border-l-2 border-amber-300">
                    {note}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* In-Browser Audio Replacement Option */}
          <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-serif">
            <span>Mau ganti file audio/rekaman suara?</span>
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*"
              className="hidden"
              onChange={handleUploadAudio}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-[#4A2E2B] font-bold text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer"
            >
              <Upload size={12} />
              <span>Ganti Audio</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
