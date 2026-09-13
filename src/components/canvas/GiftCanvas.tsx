import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, MessageCircle, RotateCcw, ArrowRight, Eye, X } from 'lucide-react';
import { GiftExperience } from '../../types/gift';
import { themePresets } from '../../config/presets';
import { InteractiveMoment } from './InteractiveMoment';
import { sounds } from '../../utils/soundEffects';

interface GiftCanvasProps {
  gift: GiftExperience;
  isStandalone?: boolean;
}

export const GiftCanvas: React.FC<GiftCanvasProps> = ({
  gift,
  isStandalone = false,
}) => {
  const theme = themePresets[gift.theme] || themePresets['editorial-rose'];
  const [hasOpened, setHasOpened] = useState(!isStandalone ? true : false); // If in studio preview, start open; if recipient, start sealed
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
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

  const handleOpenGift = () => {
    sounds.playChime(587.33);
    setHasOpened(true);
    if (audioRef.current && !isPlayingMusic) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendWhatsAppReply = () => {
    const phone = gift.senderWhatsApp ? gift.senderWhatsApp.replace(/[^0-9]/g, '') : '';
    const text = `Hai ${gift.senderName}! 🤍 Aku baru saja membuka kado digital yang kamu buat untukku... Manis, indah, dan mengharukan bangett! Terima kasih banyakk yaa 😭✨`;
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-b ${theme.bgGradient} font-sans selection:bg-[#FFCAD4] selection:text-[#4A2E2B] transition-colors duration-500 relative flex flex-col justify-between`}
      style={{ color: theme.textPrimary }}
    >
      {/* Background BGM Audio Element */}
      <audio ref={audioRef} src={gift.bgmUrl || '/bgm.mp3'} loop preload="auto" />

      {/* Floating Audio Controller Bar */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#EADBCE] shadow-md flex items-center justify-center text-[#4A2E2B] hover:scale-105 transition cursor-pointer"
          title={isPlayingMusic ? 'Jeda Musik' : 'Putar Musik'}
        >
          {isPlayingMusic ? <Volume2 size={16} className="text-[#FFAAA6] animate-pulse" /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* ACT 1: THE MONOGRAM WAX SEAL ENVELOPE (COVER) */}
      {!hasOpened ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 my-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center max-w-sm space-y-5"
          >
            {/* Envelope Frame */}
            <div
              onClick={handleOpenGift}
              className="relative w-72 sm:w-80 h-52 sm:h-56 rounded-3xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE5D9] border-2 border-white shadow-2xl flex flex-col items-center justify-center cursor-pointer group hover:scale-[1.03] active:scale-95 transition-all p-5"
            >
              <div className="absolute top-0 left-0 right-0 h-24 bg-white/40 rounded-t-3xl border-b border-white/80" />

              {/* Monogram Seal */}
              <div className="relative z-10 w-18 h-18 rounded-full bg-gradient-to-br from-[#E27D60] via-[#C35A38] to-[#993E24] flex items-center justify-center text-white shadow-xl border-2 border-[#FFE8D6] group-hover:rotate-12 transition-transform">
                <span className="text-2xl font-serif font-black tracking-wider">
                  {gift.recipientName ? gift.recipientName.charAt(0).toUpperCase() : '🤍'}
                </span>
              </div>

              {/* Envelope Text */}
              <div className="relative z-10 mt-3 text-center">
                <div className="text-[10px] font-serif uppercase tracking-widest text-[#7A5C58]">
                  KHUSUS UNTUK
                </div>
                <div className="font-serif font-black text-base text-[#4A2E2B]">
                  {gift.recipientName}
                </div>
                <div className="text-[10px] font-serif italic text-[#7A5C58] mt-0.5">
                  Sentuh segel untuk membuka kado 💌
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif font-black text-xl text-[#3A1E1C]">
                {gift.coverTitle}
              </h2>
              <p className="text-xs font-serif text-[#7A5C58] max-w-xs leading-relaxed">
                {gift.coverSubtitle}
              </p>
            </div>

            <button
              onClick={handleOpenGift}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Buka Kado Spesial Sekarang ✨</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      ) : (
        /* MAIN RECIPIENT JOURNEY: THE LETTER, MEMORIES, INTERACTIVE MOMENT */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-8 py-10 z-10 flex flex-col items-center"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#EADBCE] shadow-2xs mb-6 text-xs font-serif font-bold text-[#7A5C58]">
            <span>✨</span>
            <span>Untuk {gift.recipientName}</span>
            <span>•</span>
            <span>Dari {gift.senderName}</span>
          </div>

          {/* CHAPTER 1: THE EDITORIAL LETTER */}
          <section className="w-full bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/90 shadow-xl space-y-6 text-left my-4">
            <div className="border-b border-[#EADBCE] pb-4 text-center">
              <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#3A1E1C] tracking-tight">
                {gift.letterTitle}
              </h1>
              <p className="text-xs font-serif text-[#7A5C58] italic mt-1">
                — {gift.coverTitle} —
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[#4A2E2B]">
              {gift.letterParagraphs.map((para, idx) => (
                <p key={idx} className="indent-4 sm:indent-6">
                  {para}
                </p>
              ))}
            </div>

            {/* Closing Signature */}
            <div className="pt-4 border-t border-[#EADBCE] text-right font-serif">
              <p className="text-xs sm:text-sm italic text-[#7A5C58]">
                {gift.letterClosing}
              </p>
            </div>
          </section>

          {/* CHAPTER 2: MEMORY GALLERY (IF PHOTOS PROVIDED) */}
          {gift.photos && gift.photos.length > 0 && (
            <section className="w-full my-8 space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#EADBCE] text-xs font-serif font-bold text-[#7A5C58]">
                <span>📸</span>
                <span>Galeri Kenangan Manis</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch max-w-xl mx-auto">
                {gift.photos.map((photo, idx) => (
                  <motion.div
                    key={photo.id || idx}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightboxPhoto(photo.url)}
                    className="bg-white p-4 rounded-2xl shadow-md border border-[#EADBCE] flex flex-col justify-between text-left cursor-zoom-in group"
                  >
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 relative mb-3">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/cake.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-stone-800 text-[10px] font-serif font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Eye size={12} /> Perbesar
                        </span>
                      </div>
                    </div>

                    <div>
                      {photo.date && (
                        <span className="text-[10px] font-serif font-bold text-[#FFAAA6] uppercase tracking-wider block mb-0.5">
                          {photo.date}
                        </span>
                      )}
                      <p className="font-serif italic text-xs text-[#4A2E2B] leading-relaxed">
                        "{photo.caption}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* CHAPTER 3: THE INTERACTIVE MOMENT */}
          <InteractiveMoment gift={gift} accentColor={theme.accent} />

          {/* CHAPTER 4: CLOSING & WHATSAPP REPLY */}
          <section className="w-full max-w-md my-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white shadow-md border border-[#EADBCE] flex items-center justify-center text-3xl mx-auto">
              🤍
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-black text-xl text-[#3A1E1C]">
                Semoga Hari Ini Berkesan Bagimu ✨
              </h3>
              <p className="text-xs font-serif text-[#7A5C58] max-w-sm mx-auto leading-relaxed">
                Kado ini dirangkai penuh ketulusan untuk mengabadikan momen dan menghangatkan harimu.
              </p>
            </div>

            {/* WhatsApp Direct Reply Button */}
            <button
              onClick={handleSendWhatsAppReply}
              className="w-full py-3.5 px-6 rounded-full bg-[#34A853] hover:bg-[#2E9749] text-white font-serif font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Kirim Pesan Balasan ke {gift.senderName} 💬</span>
            </button>

            {/* Replay */}
            <button
              onClick={() => {
                setHasOpened(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-serif text-[#7A5C58] hover:text-[#4A2E2B] inline-flex items-center gap-1 font-semibold transition cursor-pointer pt-2"
            >
              <RotateCcw size={13} />
              <span>Buka Ulang Amplop dari Awal</span>
            </button>
          </section>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-2xl max-h-[90vh]">
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
              >
                <X size={18} />
              </button>
              <img
                src={lightboxPhoto}
                alt="Zoomed"
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Subtle Footer */}
      <footer className="w-full py-4 text-center text-[10px] font-serif text-[#7A5C58]/70 border-t border-white/60 mt-8">
        Dirangkai dengan segenap ketulusan • {gift.senderName} untuk {gift.recipientName} 🤍
      </footer>
    </div>
  );
};
