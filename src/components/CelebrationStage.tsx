import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Wind, ArrowRight, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../config/birthday.config';
import { sounds } from '../utils/soundEffects';

interface CelebrationStageProps {
  config: BirthdayConfig;
  onGoToLetter: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const CelebrationStage: React.FC<CelebrationStageProps> = ({
  config,
  onGoToLetter,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const [isCandleLit, setIsCandleLit] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [isWishing, setIsWishing] = useState(false);
  const [isStrikingMatch, setIsStrikingMatch] = useState(false);

  const handleStrikeMatch = () => {
    if (isCandleLit) return;
    setIsStrikingMatch(true);
    sounds.playStrike();

    setTimeout(() => {
      setIsStrikingMatch(false);
      setIsCandleLit(true);
      sounds.playChime(659.25);
      if (!isPlayingMusic) {
        onToggleMusic();
      }
    }, 850);
  };

  const handleBlowCandle = () => {
    if (!isCandleLit || isBlown) return;
    setIsWishing(true);

    setTimeout(() => {
      setIsWishing(false);
      setIsBlown(true);
      sounds.playFanfare();

      // Celebration confetti with soft pastel & warm celebration colors
      const duration = 2800;
      const animationEnd = Date.now() + duration;
      const pastelColors = ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FFF1C5', '#FF9AA2', '#FFCAD4'];

      const interval: ReturnType<typeof setInterval> = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 25 * (timeLeft / duration);
        confetti({
          particleCount,
          spread: 80,
          origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() * 0.3 + 0.45 },
          colors: pastelColors,
        });
        confetti({
          particleCount,
          spread: 80,
          origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() * 0.3 + 0.45 },
          colors: pastelColors,
        });
      }, 200);
    }, 2200);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-4 my-auto select-none relative z-10 py-3">
      {/* 1. Romantic Heading */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/75 border border-white/90 shadow-xs mb-2 backdrop-blur-md">
          <span className="text-sm">🎂</span>
          <span className="font-serif font-bold text-xs text-[#4A2E2B]">
            Happy {config.age}th Birthday, {config.recipientName}!
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#FFAAA6] text-[#4A2E2B] font-sans text-[10px] font-bold">
            Usia {config.age}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#4A2E2B] drop-shadow-xs">
          {config.celebration.greeting}
        </h1>
        <p className="text-xs sm:text-sm text-[#7A5C58] font-serif max-w-sm mx-auto mt-1 leading-relaxed px-2">
          {config.celebration.subGreeting}
        </p>
      </motion.div>

      {/* 2. Birthday Cake Visual */}
      <div className="relative my-2 select-none flex flex-col items-center">
        {/* Soft Ambient Glow behind Cake */}
        {isCandleLit && !isBlown && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FFD1BA]/40 rounded-full blur-2xl pointer-events-none animate-soft-pulse z-0" />
        )}

        {/* Cake Container */}
        <div className="relative w-[210px] sm:w-[240px] aspect-square rounded-3xl overflow-hidden shadow-lg border border-white/80 z-10 bg-rose-50/50">
          <img
            src={config.celebration.cakeImage || "/cake.jpg"}
            alt="Birthday Cake"
            className="w-full h-full object-cover pointer-events-none"
            onError={(e) => {
              // Fallback to /cake.jpg if custom path is missing
              (e.target as HTMLImageElement).src = "/cake.jpg";
            }}
          />

          {/* Left Candle Flame Anchor */}
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-full z-30 flex flex-col items-center"
            style={{ left: '46.09%', top: '18.36%' }}
          >
            <AnimatePresence>
              {isCandleLit && !isBlown && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center animate-flame"
                >
                  <div className="w-2.5 h-5 rounded-full bg-gradient-to-t from-rose-500 via-amber-400 to-yellow-100 shadow-[0_0_12px_#F59E0B]" />
                  <div className="w-1 h-1 rounded-full bg-white/95 -mt-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Candle Flame Anchor */}
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-full z-30 flex flex-col items-center"
            style={{ left: '54.30%', top: '18.75%' }}
          >
            <AnimatePresence>
              {isCandleLit && !isBlown && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center animate-flame"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="w-2.5 h-5 rounded-full bg-gradient-to-t from-rose-500 via-amber-400 to-yellow-100 shadow-[0_0_12px_#F59E0B]" />
                  <div className="w-1 h-1 rounded-full bg-white/95 -mt-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Striking Match Stick Animation */}
          <AnimatePresence>
            {isStrikingMatch && (
              <motion.div
                initial={{ x: 40, y: -20, rotate: 25, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center"
                style={{ left: '50%', top: '18%' }}
              >
                <div className="w-8 h-1.5 bg-amber-200 rounded-xs shadow-md flex items-center justify-end">
                  <div className="w-3 h-3 rounded-full bg-rose-600 shadow-[0_0_12px_#F43F5E] animate-pulse" />
                </div>
                <Sparkles size={16} className="text-yellow-300 animate-spin -ml-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blown Smoke Puff */}
          {isBlown && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -25, scale: 1.25 }}
              transition={{ duration: 2.2 }}
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 text-[11px] font-serif font-bold text-[#4A2E2B] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/80 shadow-md whitespace-nowrap"
              style={{ left: '50.2%', top: '18.5%' }}
            >
              💨 puff! Harapanmu terbang ke langit... ✨
            </motion.div>
          )}
        </div>

        {/* Wishing Status Prompt */}
        {isWishing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-2.5 px-4 py-1.5 rounded-full bg-white/85 text-[#4A2E2B] text-xs font-serif font-bold border border-[#FFCAD4] flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles size={13} className="text-[#FFAAA6] animate-spin" />
            <span>..... 🤍✨ (Memanjatkan doa tulus dalam hati...)</span>
          </motion.div>
        )}

        {isBlown && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-2 p-3 rounded-2xl bg-white/75 text-xs text-[#4A2E2B] font-serif leading-relaxed shadow-xs max-w-xs"
          >
            {config.celebration.blowSuccessMessage}
          </motion.div>
        )}

        {!isCandleLit && (
          <p className="text-xs text-[#7A5C58] font-serif italic my-2 leading-relaxed">
            {config.celebration.cakeMessage}
          </p>
        )}
      </div>

      {/* 3. Action Button */}
      <div className="w-full max-w-[260px] mt-1 space-y-2">
        {!isCandleLit ? (
          <button
            onClick={handleStrikeMatch}
            disabled={isStrikingMatch}
            className="w-full py-3 cohesive-pill-btn rounded-full text-xs sm:text-sm font-serif font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Flame size={15} />
            <span>{isStrikingMatch ? 'Menyalakan Lilin...' : `Gores Korek & Nyalakan Lilin 🔥`}</span>
          </button>
        ) : !isBlown ? (
          <button
            onClick={handleBlowCandle}
            disabled={isWishing}
            className="w-full py-3 cohesive-pill-btn rounded-full text-xs sm:text-sm font-serif font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
          >
            <Wind size={15} />
            <span>{isWishing ? '..... 🤍' : 'Tiup Lilin & Make a Wish 💨'}</span>
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGoToLetter}
            className="w-full py-3.5 cohesive-pill-btn rounded-full text-xs sm:text-sm font-serif font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Mail size={16} />
            <span>Baca Pesan & Surat Kasih 💌</span>
            <ArrowRight size={14} />
          </motion.button>
        )}
      </div>
    </div>
  );
};
