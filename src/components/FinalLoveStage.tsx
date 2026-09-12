import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../config/birthday.config';
import { sounds } from '../utils/soundEffects';

interface FinalLoveStageProps {
  config: BirthdayConfig;
  onBackToCelebration: () => void;
  onGoToGifts: () => void;
}

export const FinalLoveStage: React.FC<FinalLoveStageProps> = ({
  config,
  onBackToCelebration,
  onGoToGifts,
}) => {
  const storyMessages = config.letter.storyMessages || [];
  const [storyIdx, setStoryIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto progression with gentle ambient pace
  useEffect(() => {
    if (isFinished) return;

    timerRef.current = setTimeout(() => {
      setStoryIdx((prev) => {
        if (prev < storyMessages.length - 1) {
          return prev + 1;
        } else {
          setIsFinished(true);
          confetti({
            particleCount: 110,
            spread: 85,
            origin: { y: 0.5 },
            colors: ['#FFB7B2', '#FFAAA6', '#FFDAC1', '#E2F0CB', '#C7CEEA', '#FFF1C5'],
          });
          return prev;
        }
      });
    }, 3400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [storyIdx, isFinished, storyMessages.length]);

  const handleNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (storyIdx < storyMessages.length - 1) {
      setStoryIdx((prev) => prev + 1);
      sounds.playChime(620 + Math.random() * 120);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (storyIdx > 0) {
      setStoryIdx((prev) => prev - 1);
      sounds.playChime(500);
    }
  };

  const isLastSlide = storyIdx === storyMessages.length - 1;
  const currentText = storyMessages[storyIdx] || '';

  const isHighlight =
    currentText.toLowerCase().includes('happy birthday') ||
    currentText.toLowerCase().includes('selamat ulang tahun') ||
    currentText.toLowerCase().includes('istimewa') ||
    currentText.toLowerCase().includes('berharga');

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-between px-4 my-auto select-none relative z-10 py-4 min-h-[68vh]">
      {/* Top Header & Navigation */}
      <div className="w-full flex items-center justify-between mb-3">
        <button
          onClick={onBackToCelebration}
          className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#4A2E2B] hover:text-[#7A5C58] px-3.5 py-1.5 rounded-full bg-white/70 border border-white/80 shadow-xs backdrop-blur-md transition group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Kue</span>
        </button>

        <button
          onClick={onGoToGifts}
          className="inline-flex items-center gap-1 text-xs font-serif font-bold text-[#7A5C58] hover:text-[#4A2E2B] px-3 py-1.5 rounded-full bg-white/50 hover:bg-white/80 border border-white/70 shadow-xs transition cursor-pointer"
          title="Lewati langsung ke Ruang Hadiah"
        >
          <Gift size={12} className="text-[#FFAAA6]" />
          <span>Ruang Kado</span>
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Main Kinetic Motion Typography Area */}
      <div
        onClick={handleNext}
        className="w-full flex-1 flex flex-col items-center justify-center text-center my-4 px-2 py-6 cursor-pointer"
        title="Sentuh untuk lanjut ke baris berikutnya"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/75 border border-white/90 shadow-xs mb-5 backdrop-blur-md pointer-events-none">
          <Sparkles size={12} className="text-[#FFAAA6]" />
          <span className="font-serif font-bold text-xs text-[#4A2E2B]">
            {config.letter.title}
          </span>
        </div>

        {/* Dynamic Motion Line */}
        <div className="min-h-[140px] sm:min-h-[190px] flex items-center justify-center w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={storyIdx}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <p
                className={`text-xl sm:text-3xl font-serif leading-relaxed italic drop-shadow-xs transition-colors ${
                  isHighlight
                    ? 'font-black text-[#381B19]'
                    : 'font-bold text-[#4A2E2B]'
                }`}
              >
                "{currentText}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Signature */}
        <div className="mt-5 pointer-events-none">
          <p className="text-xs sm:text-sm text-[#7A5C58] font-serif italic tracking-wide">
            — {config.letter.signature || config.senderName} —
          </p>
        </div>

        <p className="text-[10px] text-[#7A5C58]/60 font-serif italic mt-3 pointer-events-none">
          (Sentuh layar di mana saja untuk lanjut ✨)
        </p>
      </div>

      {/* Bottom Progress & Controls */}
      <div className="w-full flex flex-col items-center gap-2.5">
        {/* Progress Bar */}
        <div className="w-full max-w-xs flex items-center gap-2.5">
          <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] rounded-full"
              animate={{ width: `${((storyIdx + 1) / storyMessages.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="font-mono text-[10px] text-[#7A5C58] font-bold">
            {storyIdx + 1}/{storyMessages.length}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-3 mt-1">
          <button
            onClick={handlePrev}
            disabled={storyIdx === 0}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#4A2E2B] border border-white/90 disabled:opacity-30 transition flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
            title="Kalimat Sebelumnya"
          >
            <ChevronLeft size={16} />
          </button>

          {!isLastSlide ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-full cohesive-pill-btn text-xs font-serif font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <span>Lanjut</span>
              <ChevronRight size={14} />
            </button>
          ) : (
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onGoToGifts}
              className="px-6 py-2.5 rounded-full cohesive-pill-btn text-xs sm:text-sm font-serif font-black flex items-center gap-2 shadow-md cursor-pointer animate-pulse"
            >
              <Gift size={15} />
              <span>Lanjut Buka Ruang Kado 🎁✨</span>
              <ArrowRight size={14} />
            </motion.button>
          )}

          <button
            onClick={handleNext}
            disabled={isLastSlide}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#4A2E2B] border border-white/90 disabled:opacity-30 transition flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
            title="Kalimat Selanjutnya"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Prominent CTA on Last Slide */}
        {isLastSlide && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xs mt-2 flex flex-col items-center"
          >
            <button
              onClick={onGoToGifts}
              className="w-full py-3.5 px-6 rounded-full cohesive-pill-btn text-xs sm:text-sm font-serif font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Lanjut Buka Ruang Kado 🎁✨</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
