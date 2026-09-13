import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Wind, Eye, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GiftExperience } from '../../types/gift';
import { sounds } from '../../utils/soundEffects';

interface InteractiveMomentProps {
  gift: GiftExperience;
  accentColor: string;
}

export const InteractiveMoment: React.FC<InteractiveMomentProps> = ({
  gift,
}) => {
  // Birthday cake states
  const [isCandleLit, setIsCandleLit] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [isWishing, setIsWishing] = useState(false);
  const [isStriking, setIsStriking] = useState(false);

  // Scratch / reveal state
  const [isRevealed, setIsRevealed] = useState(false);

  // Bouquet state
  const [isBouquetAccepted, setIsBouquetAccepted] = useState(false);

  const handleStrikeMatch = () => {
    if (isCandleLit) return;
    setIsStriking(true);
    sounds.playStrike();

    setTimeout(() => {
      setIsStriking(false);
      setIsCandleLit(true);
      sounds.playChime(659.25);
    }, 750);
  };

  const handleBlowCandle = () => {
    if (!isCandleLit || isBlown) return;
    setIsWishing(true);

    setTimeout(() => {
      setIsWishing(false);
      setIsBlown(true);
      sounds.playFanfare();

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFB7B2', '#FFAAA6', '#FFDAC1', '#E2F0CB', '#C7CEEA', '#FFF1C5', '#D4AF37'],
      });
    }, 1800);
  };

  const handleRevealSecret = () => {
    if (isRevealed) return;
    sounds.playChime(783.99);
    setIsRevealed(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFAAA6', '#FFCAD4', '#D4AF37'],
    });
  };

  const handleAcceptBouquet = () => {
    if (isBouquetAccepted) return;
    sounds.playChime(659.25);
    setIsBouquetAccepted(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFE5D9', '#FFD1BA', '#D4AF37'],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-lg text-center">
      {/* 1. BIRTHDAY CAKE MOMENT */}
      {gift.momentType === 'cake' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] text-[#7A5C58] text-xs font-serif font-bold">
            <Sparkles size={12} className="text-[#FFAAA6]" />
            <span>Momen Tiup Lilin Ulang Tahun 🎂</span>
          </div>

          <h3 className="font-serif font-black text-xl sm:text-2xl text-[#3A1E1C]">
            {gift.momentTitle || 'Tiup Lilin & Buat Permohonan 🎂'}
          </h3>

          <p className="text-xs sm:text-sm font-serif text-[#7A5C58] max-w-md leading-relaxed">
            {gift.momentDescription || 'Nyalakan lilin, pejamkan mata sejenak, panjatkan doa terbaikmu, lalu tiup lilinnya yaa...'}
          </p>

          {/* Cake Visual */}
          <div className="relative w-48 sm:w-56 aspect-square rounded-3xl overflow-hidden shadow-md border border-white/90 my-2 bg-rose-50/50">
            <img
              src="/cake.jpg"
              alt="Birthday Cake"
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Left Candle Flame */}
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
                    className="flex flex-col items-center animate-flame"
                  >
                    <div className="w-2.5 h-5 rounded-full bg-gradient-to-t from-rose-500 via-amber-400 to-yellow-100 shadow-[0_0_12px_#F59E0B]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Candle Flame */}
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
                    className="flex flex-col items-center animate-flame"
                    style={{ animationDelay: '0.2s' }}
                  >
                    <div className="w-2.5 h-5 rounded-full bg-gradient-to-t from-rose-500 via-amber-400 to-yellow-100 shadow-[0_0_12px_#F59E0B]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smoke Puff */}
            {isBlown && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -25, scale: 1.25 }}
                transition={{ duration: 2.2 }}
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 text-[11px] font-serif font-bold text-[#4A2E2B] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/80 shadow-md whitespace-nowrap"
                style={{ left: '50%', top: '18.5%' }}
              >
                💨 puff! Harapanmu terbang ke langit... ✨
              </motion.div>
            )}
          </div>

          {/* Wishing Prompt */}
          {isWishing && (
            <div className="px-4 py-1.5 rounded-full bg-white text-xs font-serif font-bold text-[#4A2E2B] border border-rose-200 flex items-center gap-1.5 shadow-2xs">
              <Sparkles size={12} className="text-[#FFAAA6] animate-spin" />
              <span>..... 🤍 (Memanjatkan doa tulus dalam hati...)</span>
            </div>
          )}

          {isBlown && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-2xl bg-white text-xs font-serif text-[#4A2E2B] leading-relaxed shadow-2xs border border-[#EADBCE] max-w-sm"
            >
              ✨ Lilin berhasil ditiup! Semoga semua harapan dan doamu terkabul dengan manis! ✨
            </motion.div>
          )}

          {/* Action Button */}
          <div className="w-full max-w-xs pt-2">
            {!isCandleLit ? (
              <button
                onClick={handleStrikeMatch}
                disabled={isStriking}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Flame size={16} />
                <span>{isStriking ? 'Menyalakan...' : 'Gores Korek & Nyalakan Lilin 🔥'}</span>
              </button>
            ) : !isBlown ? (
              <button
                onClick={handleBlowCandle}
                disabled={isWishing}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
              >
                <Wind size={16} />
                <span>Tiup Lilin & Make a Wish 💨</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-emerald-800 bg-emerald-100/80 px-4 py-2 rounded-full border border-emerald-200">
                <Check size={14} />
                <span>Harapan Telah Dipanjatkan ✨</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. ANNIVERSARY MILESTONE MOMENT */}
      {gift.momentType === 'milestone' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] text-[#7A5C58] text-xs font-serif font-bold">
            <Sparkles size={12} className="text-[#FFAAA6]" />
            <span>Milestone Perjalanan Cinta 💍</span>
          </div>

          <h3 className="font-serif font-black text-xl sm:text-2xl text-[#3A1E1C]">
            {gift.momentTitle || `Perayaan Tahun Ke-${gift.milestoneNumber || 1} Bersamamu`}
          </h3>

          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#FFF5F2] to-[#FFE5D9] border-2 border-white shadow-inner flex flex-col items-center justify-center my-2">
            <span className="text-3xl font-serif font-black text-[#8E3B33]">
              {gift.milestoneNumber ? `${gift.milestoneNumber * 365}+` : '365+'}
            </span>
            <span className="text-[10px] font-serif uppercase tracking-widest text-[#7A5C58] mt-1 font-bold">
              HARI BERSAMAMU
            </span>
          </div>

          <p className="text-xs sm:text-sm font-serif text-[#7A5C58] max-w-md leading-relaxed italic">
            "{gift.momentDescription || 'Setiap detik yang telah kita lewati adalah lembaran terindah yang tak pernah pudar maknanya.'}"
          </p>
        </div>
      )}

      {/* 3. SCRATCH / SECRET REVEAL MESSAGE MOMENT */}
      {gift.momentType === 'scratch' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] text-[#7A5C58] text-xs font-serif font-bold">
            <Sparkles size={12} className="text-[#FFAAA6]" />
            <span>Pesan Rahasia Tersembunyi 🕊️</span>
          </div>

          <h3 className="font-serif font-black text-xl sm:text-2xl text-[#3A1E1C]">
            {gift.momentTitle || 'Sebuah Pesan Rahasia Untukmu'}
          </h3>

          <p className="text-xs sm:text-sm font-serif text-[#7A5C58] max-w-md leading-relaxed">
            {gift.momentDescription || 'Sentuh kartu di bawah untuk membuka pesan rahasia yang tersimpan khusus untukmu...'}
          </p>

          <div
            onClick={handleRevealSecret}
            className={`w-full max-w-sm min-h-[120px] rounded-3xl p-5 border transition-all cursor-pointer flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden ${
              isRevealed
                ? 'bg-gradient-to-br from-[#FFF5F2] to-[#FFFDF9] border-[#FFCAD4]'
                : 'bg-gradient-to-br from-[#4A2E2B] to-[#301B19] text-white border-stone-800 hover:scale-[1.02]'
            }`}
          >
            {!isRevealed ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber-300">
                  <Eye size={18} />
                </div>
                <span className="text-xs font-serif font-bold tracking-wide text-amber-200">
                  Sentuh untuk Membuka Pesan Rahasia ✨
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-2"
              >
                <span className="text-[10px] font-serif uppercase tracking-widest text-[#FFAAA6] font-bold">
                  UNTUKMU DARI LUBUK HATI
                </span>
                <p className="text-sm font-serif italic text-[#3A1E1C] leading-relaxed font-bold">
                  "{gift.secretMessage || 'Aku berjanji akan selalu ada di sisimu, merawat senyum manismu, dan menyayangimu dengan sepenuh hati 🤍'}"
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* 4. BOUQUET / GRATITUDE APPRECIATION MOMENT */}
      {gift.momentType === 'bouquet' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] text-[#7A5C58] text-xs font-serif font-bold">
            <Sparkles size={12} className="text-[#FFAAA6]" />
            <span>Buket Apresiasi Virtual 💐</span>
          </div>

          <h3 className="font-serif font-black text-xl sm:text-2xl text-[#3A1E1C]">
            {gift.momentTitle || 'Buket Kasih & Rasa Syukur'}
          </h3>

          <div
            onClick={handleAcceptBouquet}
            className="w-36 h-36 rounded-3xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE5D9] border-2 border-white shadow-md flex items-center justify-center text-5xl cursor-pointer hover:scale-105 transition-transform"
            title="Sentuh untuk menerima buket"
          >
            💐
          </div>

          <p className="text-xs sm:text-sm font-serif text-[#7A5C58] max-w-md leading-relaxed italic">
            "{gift.momentDescription || 'Setiap kelopak bunga ini adalah simbol dari ketulusan dan terima kasihku atas kehadiranmu yang luar biasa.'}"
          </p>

          <button
            onClick={handleAcceptBouquet}
            className={`py-3 px-6 rounded-full font-serif font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5 ${
              isBouquetAccepted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B]'
            }`}
          >
            {isBouquetAccepted ? (
              <>
                <Check size={14} />
                <span>Buket Kasih Diterima 🤍</span>
              </>
            ) : (
              <span>Sentuh untuk Menerima Buket 💐</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
