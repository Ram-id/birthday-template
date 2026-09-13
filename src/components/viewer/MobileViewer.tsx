import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Wind, ArrowRight, Check, MessageCircle, RotateCcw, Volume2, VolumeX, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GiftCustomData, occasionPresets, platformCommerce } from '../../config/templates.config';
import { sounds } from '../../utils/soundEffects';

interface MobileViewerProps {
  giftData: GiftCustomData;
  onEdit?: () => void;
  isPreview?: boolean;
}

export const MobileViewer: React.FC<MobileViewerProps> = ({
  giftData,
  onEdit,
  isPreview = false,
}) => {
  const preset = occasionPresets[giftData.occasion] || occasionPresets.birthday;
  const [phase, setPhase] = useState<'envelope' | 'hero' | 'coupons' | 'letter' | 'closing'>('envelope');

  // Birthday candle states
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

  const handleOpenEnvelope = () => {
    sounds.playChime(587.33);
    setPhase('hero');
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
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FFB7B2', '#FFAAA6', '#FFDAC1', '#E2F0CB', '#C7CEEA', '#FFF1C5', '#E5C378'],
      });
    }, 1800);
  };

  const handleClaimCoupon = (couponId: string) => {
    if (claimedCoupons[couponId]) return;
    sounds.playChime(783.99);
    setClaimedCoupons((prev) => ({ ...prev, [couponId]: true }));
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#FFB7B2', '#FFAAA6', '#FFD1BA', '#E5C378'],
    });
  };

  const handleNextLetter = () => {
    if (letterIdx < giftData.storyMessages.length - 1) {
      setLetterIdx((prev) => prev + 1);
      sounds.playChime(600 + Math.random() * 100);
    } else {
      setPhase('closing');
    }
  };

  const handleSendWhatsAppReply = () => {
    const claimedCount = Object.keys(claimedCoupons).length;
    const phone = giftData.senderWhatsApp ? giftData.senderWhatsApp.replace(/[^0-9]/g, '') : '';
    const text = `Makasih banyakkk buat hadiah digitalnya, manis dan terharu bangett! 😭🤍✨\n\nKupon hadiahnya udah ada ${claimedCount} yang aku klaim, siap-siap aku tagih yaa! 😆❤️`;
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`w-full max-w-md mx-auto min-h-screen bg-gradient-to-b ${preset.theme.bgGradient} text-[#4A2E2B] font-sans flex flex-col justify-between relative shadow-2xl overflow-x-hidden selection:bg-[#FFCAD4]`}>
      {/* Background BGM Audio */}
      <audio ref={audioRef} src={giftData.bgmUrl || '/bgm.mp3'} loop preload="auto" />

      {/* Top Floating Controls */}
      <div className="w-full px-4 py-3.5 flex items-center justify-between z-30 sticky top-0 bg-white/70 backdrop-blur-md border-b border-white/60">
        {/* Recipient Tag */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#EADBCE] shadow-2xs text-[11px] font-serif font-bold text-[#4A2E2B]">
          <span>{preset.icon}</span>
          <span className="truncate max-w-[120px]">{giftData.recipientName}</span>
          {giftData.milestoneNumber ? (
            <span className="bg-[#FFE5D9] text-[#7A5C58] px-1.5 py-0.2 rounded-full text-[10px]">
              Ke-{giftData.milestoneNumber}
            </span>
          ) : null}
          {isPreview && (
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.2 rounded-full">
              Pratinjau
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className="w-8 h-8 rounded-full bg-white/90 border border-[#EADBCE] flex items-center justify-center text-[#4A2E2B] shadow-2xs transition cursor-pointer"
            title={isPlayingMusic ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingMusic ? <Volume2 size={14} className="text-[#FFAAA6] animate-pulse" /> : <VolumeX size={14} />}
          </button>

          {/* Mode Switcher / Edit button if creator */}
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-stone-50 border border-[#EADBCE] text-[#4A2E2B] text-xs font-serif font-bold flex items-center gap-1 transition cursor-pointer shadow-2xs"
            >
              <Edit3 size={12} />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Experience Body */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 my-auto relative z-10 text-center">
        {/* ACT 1: THE WAX SEAL MONOGRAM ENVELOPE */}
        {phase === 'envelope' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center max-w-xs space-y-4 py-8"
          >
            {/* Sealed Monogram Envelope Container */}
            <div
              onClick={handleOpenEnvelope}
              className="relative w-64 h-48 rounded-3xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE5D9] border border-white shadow-xl flex flex-col items-center justify-center cursor-pointer group hover:scale-105 active:scale-95 transition-all p-4"
            >
              {/* Envelope Flap Accent */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-white/40 rounded-t-3xl border-b border-white/80" />

              {/* Wax Seal Monogram Badge */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#E27D60] via-[#C35A38] to-[#993E24] flex items-center justify-center text-white shadow-lg border-2 border-[#FFE8D6] group-hover:rotate-12 transition-transform">
                <span className="text-2xl filter drop-shadow-xs">{preset.icon}</span>
              </div>

              {/* Envelope Text */}
              <div className="relative z-10 mt-3 text-center">
                <div className="text-[10px] font-serif uppercase tracking-widest text-[#7A5C58]">
                  KHUSUS UNTUK
                </div>
                <div className="font-serif font-black text-sm text-[#4A2E2B]">
                  {giftData.recipientName}
                </div>
                <div className="text-[10px] font-serif italic text-[#7A5C58] mt-0.5">
                  Sentuh segel untuk membuka surat 💌
                </div>
              </div>
            </div>

            <p className="text-xs font-serif text-[#7A5C58] max-w-xs leading-relaxed mt-2">
              Sebuah untaian ketulusan dan kado manis yang dirangkai khusus dari <b>{giftData.senderName}</b> untukmu.
            </p>

            <button
              onClick={handleOpenEnvelope}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Buka Surat & Kado Spesial ✨</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>
        )}

        {/* ACT 2: OCCASION HERO MOMENT (CAKE / ANNIVERSARY / APOLOGY / SURPRISE) */}
        {phase === 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center max-w-xs space-y-3 py-2"
          >
            <div className="text-[10px] font-serif uppercase font-bold tracking-wider text-[#7A5C58] bg-white/80 border border-white/80 px-3 py-0.5 rounded-full shadow-2xs">
              {preset.badge}
            </div>

            <h3 className="text-xl font-serif font-black text-[#4A2E2B]">
              {giftData.greetingTitle}
            </h3>

            {/* OCCASION SPECIFIC CENTERPIECE */}
            {giftData.occasion === 'birthday' ? (
              /* Birthday Cake with Candles */
              <div className="flex flex-col items-center">
                <p className="text-xs font-serif text-[#7A5C58] leading-relaxed mb-2">
                  Nyalakan lilin ke-{giftData.milestoneNumber || 21}, pejamkan mata sejenak, panjatkan doa tulus, lalu tiup lilinnya yaa...
                </p>

                <div className="relative w-48 aspect-square rounded-3xl overflow-hidden shadow-lg border border-white my-2 bg-rose-50/50">
                  <img
                    src="/cake.jpg"
                    alt="Birthday Cake"
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* Dual Candle Flame Anchors */}
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

                  {/* Blown Smoke */}
                  {isBlown && (
                    <motion.div
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -25, scale: 1.25 }}
                      transition={{ duration: 2.2 }}
                      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 text-[10px] font-serif font-bold text-[#4A2E2B] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/80 shadow-md whitespace-nowrap"
                      style={{ left: '50%', top: '18.5%' }}
                    >
                      💨 puff! Harapanmu terbang ke langit... ✨
                    </motion.div>
                  )}
                </div>

                {/* Wishing prompt */}
                {isWishing && (
                  <div className="px-4 py-1.5 rounded-full bg-white text-xs font-serif font-bold text-[#4A2E2B] border border-rose-200 flex items-center gap-1.5 shadow-2xs my-1">
                    <Sparkles size={12} className="text-[#FFAAA6] animate-spin" />
                    <span>..... 🤍 (Memanjatkan doa dalam hati...)</span>
                  </div>
                )}

                {/* Cake Action Button */}
                <div className="w-full pt-2">
                  {!isCandleLit ? (
                    <button
                      onClick={handleStrikeMatch}
                      disabled={isStrikingMatch}
                      className="w-full py-3 rounded-full cohesive-pill-btn text-xs font-serif font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Flame size={15} />
                      <span>{isStrikingMatch ? 'Menyalakan...' : 'Gores Korek & Nyalakan Lilin 🔥'}</span>
                    </button>
                  ) : !isBlown ? (
                    <button
                      onClick={handleBlowCandle}
                      disabled={isWishing}
                      className="w-full py-3 rounded-full cohesive-pill-btn text-xs font-serif font-bold shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <Wind size={15} />
                      <span>Tiup Lilin & Make a Wish 💨</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setPhase('coupons')}
                      className="w-full py-3.5 rounded-full cohesive-pill-btn text-xs font-serif font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Lanjut Buka Kado Spesial 🎁</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Non-Birthday Hero Card (Anniversary, Apology, ThankYou, Surprise) */
              <div className="flex flex-col items-center space-y-3 my-2">
                <div className="w-48 h-48 rounded-3xl bg-white/80 border border-white shadow-md flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  <div className="text-5xl my-2 filter drop-shadow-xs">{preset.icon}</div>
                  <div className="font-serif font-bold text-sm text-[#4A2E2B]">{preset.title}</div>
                  <p className="text-[10px] font-serif text-[#7A5C58] italic mt-1 text-center">
                    "{giftData.petName || giftData.recipientName}, ada pesan tulus & hadiah untukmu..."
                  </p>
                </div>

                <button
                  onClick={() => setPhase('coupons')}
                  className="w-full py-3.5 rounded-full cohesive-pill-btn text-xs font-serif font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Buka Kupon & Surat Kasih 🎁</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ACT 3: VINTAGE COUPON TICKETS & POLAROID */}
        {phase === 'coupons' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center space-y-3 py-1"
          >
            <div className="text-[10px] font-serif uppercase font-bold tracking-wider text-[#7A5C58] bg-white/80 border border-white/80 px-3 py-0.5 rounded-full shadow-2xs">
              KADO KASIH SAYANG
            </div>

            <div>
              <h3 className="text-lg font-serif font-black text-[#4A2E2B]">
                Voucher Spesial Dari {giftData.senderName} 🎟️
              </h3>
              <p className="text-[11px] font-serif text-[#7A5C58] mt-0.5">
                Sentuh tiket kupon di bawah untuk mengklaimnya yaa!
              </p>
            </div>

            {/* Coupons List Styled as Vintage Luxury Tickets */}
            <div className="w-full space-y-2.5 text-left">
              {giftData.selectedCoupons.map((coupon) => {
                const isClaimed = claimedCoupons[coupon.id];
                return (
                  <motion.div
                    key={coupon.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleClaimCoupon(coupon.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 relative overflow-hidden shadow-xs ${
                      isClaimed
                        ? 'bg-emerald-50/90 border-emerald-300'
                        : 'bg-white/90 border-[#EADBCE] hover:border-[#FFAAA6]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0 mt-0.5">{coupon.icon}</span>
                      <div>
                        <span className="text-[9px] font-serif font-bold text-amber-800 bg-amber-100/80 px-2 py-0.2 rounded-full uppercase tracking-wider">
                          {coupon.tag}
                        </span>
                        <h4 className="font-serif font-bold text-[#4A2E2B] text-xs mt-1">{coupon.title}</h4>
                        <p className="text-[11px] font-serif text-[#5D3A36] leading-relaxed mt-0.5">{coupon.description}</p>
                        
                        <div className="mt-2 text-[10px] font-serif font-bold">
                          {isClaimed ? (
                            <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                              <Check size={11} strokeWidth={3} /> KLAIM BERHASIL (Siap Ditagih!)
                            </span>
                          ) : (
                            <span className="text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
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

            {/* Sweet Polaroid Card */}
            {giftData.photoUrl && (
              <div className="w-full bg-white p-3.5 rounded-2xl border border-[#EADBCE] shadow-xs flex items-center gap-3 text-left my-1">
                <img
                  src={giftData.photoUrl}
                  alt="Kenangan"
                  className="w-16 h-16 rounded-xl object-cover border border-[#EADBCE] shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cake.jpg';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-serif font-bold text-amber-800 bg-amber-100 px-2 py-0.2 rounded-full inline-block mb-1">
                    Foto Kenangan Manis 📸
                  </span>
                  <p className="text-[11px] text-[#4A2E2B] font-serif italic truncate">
                    "{giftData.photoCaption || 'Momen manis yang selalu kusimpan dalam hati'}"
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setPhase('letter')}
              className="w-full py-3.5 rounded-full cohesive-pill-btn text-xs font-serif font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Lanjut Baca Surat Puitis 💌</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>
        )}

        {/* ACT 4: POETIC KINETIC LETTER */}
        {phase === 'letter' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNextLetter}
            className="w-full flex-1 flex flex-col items-center justify-between py-6 min-h-[380px] cursor-pointer"
            title="Sentuh layar untuk lanjut"
          >
            <div className="text-[10px] font-serif uppercase font-bold tracking-wider text-[#7A5C58] bg-white/80 border border-white/80 px-3 py-0.5 rounded-full shadow-2xs">
              SURAT DARI HATI
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4 my-auto text-center">
              <h4 className="text-xs font-serif font-bold text-rose-600 mb-4 tracking-widest uppercase">
                {giftData.greetingTitle}
              </h4>

              <AnimatePresence mode="wait">
                <motion.p
                  key={letterIdx}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg sm:text-xl font-serif italic font-bold text-[#381B19] leading-relaxed drop-shadow-2xs"
                >
                  "{giftData.storyMessages[letterIdx]}"
                </motion.p>
              </AnimatePresence>

              <div className="mt-6 text-xs text-[#7A5C58] font-serif italic">
                — {giftData.closingSignature || giftData.senderName} —
              </div>
            </div>

            {/* Letter Progress Indicator */}
            <div className="w-full flex flex-col items-center gap-2">
              <div className="flex gap-1.5">
                {giftData.storyMessages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === letterIdx ? 'w-6 bg-[#FFAAA6]' : 'w-2 bg-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-[#7A5C58] font-serif italic">
                (Sentuh layar di mana saja untuk lanjut ✨)
              </span>
            </div>
          </motion.div>
        )}

        {/* ACT 5: CLOSING & WHATSAPP REPLY */}
        {phase === 'closing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center max-w-xs space-y-4 py-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#FFE5D9] text-[#4A2E2B] flex items-center justify-center text-3xl shadow-xs">
              🤍
            </div>

            <div>
              <h3 className="text-xl font-serif font-black text-[#4A2E2B]">
                Untuk {giftData.petName || giftData.recipientName}
              </h3>
              <p className="text-xs font-serif text-[#7A5C58] mt-1 leading-relaxed">
                Semoga hadiah kecil ini mampu menghangatkan harimu dan mengukir senyum di wajahmu selalu ✨
              </p>
            </div>

            {/* WhatsApp Direct Reply */}
            <button
              onClick={handleSendWhatsAppReply}
              className="w-full py-3.5 px-5 rounded-full bg-[#34A853] hover:bg-[#2E9749] text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Balas & Tagih Kupon ke {giftData.senderName} 💬</span>
            </button>

            {/* Restart Button */}
            <button
              onClick={() => {
                setPhase('hero');
                setLetterIdx(0);
              }}
              className="text-xs text-[#7A5C58] hover:text-[#4A2E2B] font-serif flex items-center gap-1 font-semibold transition cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Tonton Ulang dari Awal</span>
            </button>

            {/* VIRAL LUXURY FOOTER */}
            <div className="w-full mt-4 p-3.5 bg-white/80 border border-[#EADBCE] rounded-2xl text-center shadow-2xs">
              <div className="text-[11px] font-serif font-bold text-[#4A2E2B] flex items-center justify-center gap-1">
                <Sparkles size={12} className="text-[#FFAAA6]" />
                <span>Mau Bikin Kejutan Manis Seperti Ini?</span>
              </div>
              <p className="text-[10px] font-serif text-[#7A5C58] mt-0.5">
                Bikin kartu & kado digital interaktif untuk orang tersayangmu cuma <b>{platformCommerce.formattedPrice}</b>!
              </p>
              <a
                href={typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '/'}
                className="mt-2 block w-full py-2 rounded-xl bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-[11px] shadow-2xs transition"
              >
                Buat Kado Sendiri Sekarang 🚀
              </a>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-3 text-center text-[10px] font-serif text-[#7A5C58]/70 border-t border-white/60">
        Dirangkai penuh ketulusan • {giftData.senderName} untuk {giftData.recipientName} 🤍
      </footer>
    </div>
  );
};
