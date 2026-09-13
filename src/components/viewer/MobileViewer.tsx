import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Wind, ArrowRight, Check, MessageCircle, RotateCcw, Volume2, VolumeX, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CommercialGiftData, businessConfig } from '../../config/commercial.config';
import { sounds } from '../../utils/soundEffects';

interface MobileViewerProps {
  giftData: CommercialGiftData;
  onEdit?: () => void;
  isPreview?: boolean;
}

export const MobileViewer: React.FC<MobileViewerProps> = ({
  giftData,
  onEdit,
  isPreview = false,
}) => {
  const [phase, setPhase] = useState<'welcome' | 'cake' | 'gifts' | 'letter' | 'closing'>('welcome');
  const [isCandleLit, setIsCandleLit] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [isWishing, setIsWishing] = useState(false);
  const [isStrikingMatch, setIsStrikingMatch] = useState(false);

  // Claimed coupons tracking
  const [claimedCoupons, setClaimedCoupons] = useState<Record<string, boolean>>({});

  // Letter progression
  const [letterIdx, setLetterIdx] = useState(0);

  // Audio BGM
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  const handleStart = () => {
    setPhase('cake');
    if (audioRef.current && !isPlayingMusic) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  const handleStrikeMatch = () => {
    if (isCandleLit) return;
    setIsStrikingMatch(true);
    sounds.playStrike();

    setTimeout(() => {
      setIsStrikingMatch(false);
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

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FFF1C5', '#FF9AA2'],
      });
    }, 1800);
  };

  const handleClaimCoupon = (couponId: string) => {
    if (claimedCoupons[couponId]) return;
    sounds.playChime(783.99);
    setClaimedCoupons((prev) => ({ ...prev, [couponId]: true }));
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FFB7B2', '#FFAAA6', '#FFD1BA'],
    });
  };

  const handleNextLetter = () => {
    if (letterIdx < giftData.letterContent.length - 1) {
      setLetterIdx((prev) => prev + 1);
      sounds.playChime(600 + Math.random() * 100);
    } else {
      setPhase('closing');
    }
  };

  const handleSendWhatsAppReply = () => {
    const claimedCount = Object.keys(claimedCoupons).length;
    const phone = giftData.senderWhatsApp ? giftData.senderWhatsApp.replace(/[^0-9]/g, '') : '';
    const text = `Makasih banyakkk buat kado website ulang tahunnya, manis bangett! 😭🤍✨\n\nKupon hadiahnya udah ada ${claimedCount} yang aku klaim, siap-siap aku tagih yaa! 😆❤️`;
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#FFFDF9] text-[#4A2E2B] font-sans flex flex-col justify-between relative shadow-lg overflow-x-hidden selection:bg-[#FFCAD4]">
      {/* Background BGM */}
      <audio ref={audioRef} src={giftData.bgmUrl || '/bgm.mp3'} loop preload="auto" />

      {/* Top Floating Controls */}
      <div className="w-full px-4 py-3 flex items-center justify-between z-30 sticky top-0 bg-[#FFFDF9]/80 backdrop-blur-xs">
        {/* Recipient Tag */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-stone-200/80 shadow-2xs text-[11px] font-bold">
          <span>🎂</span>
          <span className="truncate max-w-[120px]">{giftData.recipientName}</span>
          <span className="bg-[#FFE5D9] text-[#7A5C58] px-1.5 py-0.2 rounded-full text-[10px]">
            {giftData.age} th
          </span>
          {isPreview && (
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Pratinjau
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className="w-8 h-8 rounded-full bg-white/90 border border-stone-200 flex items-center justify-center text-stone-600 shadow-2xs transition cursor-pointer"
            title={isPlayingMusic ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingMusic ? <Volume2 size={14} className="text-rose-500 animate-pulse" /> : <VolumeX size={14} />}
          </button>

          {/* Mode Switcher / Edit button if creator */}
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <Edit3 size={12} />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area by Phase */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 my-auto relative z-10 text-center">
        {/* PHASE 1: WELCOME */}
        {phase === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center max-w-xs space-y-4 py-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#FFE5D9] flex items-center justify-center text-4xl shadow-md shadow-rose-100 animate-bounce">
              🎁
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#FFAAA6]">
                HADIAH SPESIAL HARI INI
              </span>
              <h2 className="text-2xl font-black text-[#4A2E2B] mt-1">
                Hai, {giftData.petName || giftData.recipientName}! ✨
              </h2>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Ada sebuah kejutan manis dan surat ulang tahun yang disiapkan khusus dari <b>{giftData.senderName}</b> untukmu.
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Buka Kado Spesial 🎁</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {/* PHASE 2: CAKE & CANDLE */}
        {phase === 'cake' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center max-w-xs space-y-3 py-2"
          >
            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 bg-stone-100 px-3 py-0.5 rounded-full">
              BABAK 1 — TIUP LILIN
            </div>

            <h3 className="text-xl font-black text-[#4A2E2B]">
              Selamat Ulang Tahun Ke-{giftData.age}! 🎂
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Nyalakan lilin, pejamkan mata sejenak, panjatkan doa tulus, lalu tiup lilinnya yaa...
            </p>

            {/* Cake Frame */}
            <div className="relative w-48 aspect-square rounded-3xl overflow-hidden shadow-lg border border-white/90 my-2 bg-rose-50/50">
              <img
                src="/cake.jpg"
                alt="Birthday Cake"
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Candle Flame Anchor */}
              <div
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-full z-30 flex flex-col items-center"
                style={{ left: '50%', top: '18.5%' }}
              >
                <AnimatePresence>
                  {isCandleLit && !isBlown && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex flex-col items-center animate-flame"
                    >
                      <div className="w-3 h-6 rounded-full bg-gradient-to-t from-rose-500 via-amber-400 to-yellow-100 shadow-[0_0_14px_#F59E0B]" />
                      <div className="w-1 h-1 rounded-full bg-white/95 -mt-1" />
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
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 text-[10px] font-bold text-[#4A2E2B] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/80 shadow-md whitespace-nowrap"
                  style={{ left: '50%', top: '18.5%' }}
                >
                  💨 puff! Harapanmu terbang ke langit... ✨
                </motion.div>
              )}
            </div>

            {/* Wishing Prompt */}
            {isWishing && (
              <div className="px-4 py-1.5 rounded-full bg-white text-xs font-bold text-[#4A2E2B] border border-rose-200 flex items-center gap-1.5 shadow-2xs">
                <Sparkles size={12} className="text-[#FFAAA6] animate-spin" />
                <span>..... 🤍 (Memanjatkan doa dalam hati...)</span>
              </div>
            )}

            {isBlown && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-2xl bg-white text-xs text-stone-700 leading-relaxed shadow-2xs border border-stone-100"
              >
                ✨ Lilin berhasil ditiup! Semoga semua harapan dan doamu terkabul dengan indah! ✨
              </motion.div>
            )}

            {/* Cake Action Button */}
            <div className="w-full pt-2">
              {!isCandleLit ? (
                <button
                  onClick={handleStrikeMatch}
                  disabled={isStrikingMatch}
                  className="w-full py-3 rounded-full bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Flame size={15} />
                  <span>{isStrikingMatch ? 'Menyalakan...' : 'Gores Korek & Nyalakan Lilin 🔥'}</span>
                </button>
              ) : !isBlown ? (
                <button
                  onClick={handleBlowCandle}
                  disabled={isWishing}
                  className="w-full py-3 rounded-full bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
                >
                  <Wind size={15} />
                  <span>Tiup Lilin & Make a Wish 💨</span>
                </button>
              ) : (
                <button
                  onClick={() => setPhase('gifts')}
                  className="w-full py-3.5 rounded-full bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Lanjut Buka Kado Spesial 🎁</span>
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* PHASE 3: GIFTS (VIRTUAL COUPONS & PHOTO) */}
        {phase === 'gifts' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center space-y-3 py-1"
          >
            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 bg-stone-100 px-3 py-0.5 rounded-full">
              BABAK 2 — KADO KASIH SAYANG
            </div>

            <div>
              <h3 className="text-lg font-black text-[#4A2E2B]">
                Kupon Hadiah Spesial Dari {giftData.senderName} 🎁
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Sentuh kupon di bawah untuk mengklaimnya yaa!
              </p>
            </div>

            {/* Coupons List */}
            <div className="w-full space-y-2 text-left">
              {giftData.coupons.map((coupon) => {
                const isClaimed = claimedCoupons[coupon.id];
                return (
                  <motion.div
                    key={coupon.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleClaimCoupon(coupon.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 shadow-xs ${
                      isClaimed
                        ? 'bg-emerald-50/90 border-emerald-300'
                        : 'bg-white border-stone-200 hover:border-[#FFAAA6]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl shrink-0">{coupon.icon}</span>
                      <div>
                        <div className="font-bold text-[#4A2E2B] text-xs flex items-center gap-1.5">
                          <span>{coupon.title}</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-tight mt-1">{coupon.description}</p>
                        <div className="mt-2 text-[10px] font-bold">
                          {isClaimed ? (
                            <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                              <Check size={11} strokeWidth={3} /> KLAIM BERHASIL (Siap Ditagih!)
                            </span>
                          ) : (
                            <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                              👆 Sentuh untuk Klaim Kupon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sweet Photo Polaroid Card (if provided) */}
            {giftData.photoUrl && (
              <div className="w-full bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3 text-left my-2">
                <img
                  src={giftData.photoUrl}
                  alt="Kenangan"
                  className="w-14 h-14 rounded-xl object-cover border border-stone-100 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cake.jpg';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    Foto Kenangan Manis 📸
                  </span>
                  <p className="text-[11px] text-stone-700 font-serif italic truncate">
                    "{giftData.photoCaption || 'Senyum manismu selalu membawa keceriaan'}"
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setPhase('letter')}
              className="w-full py-3.5 rounded-full bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Lanjut Baca Surat Kasih 💌</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>
        )}

        {/* PHASE 4: LETTER (KINETIC STEP READING) */}
        {phase === 'letter' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNextLetter}
            className="w-full flex-1 flex flex-col items-center justify-between py-6 min-h-[360px] cursor-pointer"
            title="Sentuh layar untuk lanjut"
          >
            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 bg-stone-100 px-3 py-0.5 rounded-full">
              BABAK 3 — SURAT UCAPAN
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4 my-auto text-center">
              <h4 className="text-xs font-serif font-bold text-rose-500 mb-3 tracking-widest uppercase">
                {giftData.letterGreeting}
              </h4>

              <AnimatePresence mode="wait">
                <motion.p
                  key={letterIdx}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className="text-lg sm:text-xl font-serif italic font-bold text-[#4A2E2B] leading-relaxed"
                >
                  "{giftData.letterContent[letterIdx]}"
                </motion.p>
              </AnimatePresence>

              <div className="mt-6 text-xs text-stone-500 font-serif italic">
                — {giftData.letterClosing || giftData.senderName} —
              </div>
            </div>

            {/* Letter Progress Indicator */}
            <div className="w-full flex flex-col items-center gap-2">
              <div className="flex gap-1.5">
                {giftData.letterContent.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === letterIdx ? 'w-6 bg-[#FFAAA6]' : 'w-2 bg-stone-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-stone-400 font-serif">
                (Sentuh layar di mana saja untuk lanjut)
              </span>
            </div>
          </motion.div>
        )}

        {/* PHASE 5: CLOSING & WHATSAPP DIRECT REPLY */}
        {phase === 'closing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center max-w-xs space-y-4 py-4"
          >
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-3xl">
              🤍
            </div>

            <div>
              <h3 className="text-xl font-black text-[#4A2E2B]">
                Selamat Ulang Tahun, {giftData.petName || giftData.recipientName}!
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Semoga hari bahagiamu penuh dengan tawa, kesehatan, dan impianmu terkabul satu per satu ✨
              </p>
            </div>

            {/* WhatsApp Reply Button */}
            <button
              onClick={handleSendWhatsAppReply}
              className="w-full py-3.5 px-5 rounded-full bg-[#34A853] hover:bg-[#2E9749] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Balas & Tagih Kupon ke {giftData.senderName} 💬</span>
            </button>

            {/* Restart Button */}
            <button
              onClick={() => {
                setPhase('cake');
                setLetterIdx(0);
              }}
              className="text-xs text-stone-500 hover:text-stone-700 flex items-center gap-1 font-medium transition cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Tonton Ulang dari Awal</span>
            </button>

            {/* VIRAL LOOP / COMMERCIAL FOOTER */}
            <div className="w-full mt-4 p-3 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border border-rose-200/80 text-center">
              <div className="text-[11px] font-bold text-[#4A2E2B] flex items-center justify-center gap-1">
                <Sparkles size={12} className="text-rose-500" />
                <span>Mau Bikin Kado Spesial Seperti Ini?</span>
              </div>
              <p className="text-[10px] text-stone-600 mt-0.5">
                Bikin kado digital interaktif untuk doi/sahabatmu cuma <b>{businessConfig.formattedPrice}</b>!
              </p>
              <a
                href={typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '/'}
                className="mt-2 block w-full py-1.5 rounded-xl bg-white hover:bg-stone-50 text-rose-600 font-bold text-[11px] border border-rose-200 transition"
              >
                Buat Kado Sendiri Sekarang 🚀
              </a>
            </div>
          </motion.div>
        )}
      </main>

      {/* Bottom Subtle Bar */}
      <footer className="w-full py-2.5 text-center text-[10px] text-stone-400 border-t border-stone-100">
        Dibuat penuh ketulusan • {giftData.senderName} untuk {giftData.recipientName} 🤍
      </footer>
    </div>
  );
};
