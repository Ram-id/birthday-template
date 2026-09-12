import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, ExternalLink, MessageCircle, RotateCcw } from 'lucide-react';
import { BirthdayConfig } from '../config/birthday.config';
import { sounds } from '../utils/soundEffects';

interface GiftVaultStageProps {
  config: BirthdayConfig;
  onOpenPhotoAlbum: () => void;
  onOpenVoiceNote: () => void;
  onOpenVideo: () => void;
  onOpenSurpriseLink: () => void;
  onBackToLetter: () => void;
  onRestart: () => void;
  openedGifts: {
    photos: boolean;
    voiceNote: boolean;
    video: boolean;
    surprise: boolean;
  };
}

export const GiftVaultStage: React.FC<GiftVaultStageProps> = ({
  config,
  onOpenPhotoAlbum,
  onOpenVoiceNote,
  onOpenVideo,
  onOpenSurpriseLink,
  onBackToLetter,
  onRestart,
  openedGifts,
}) => {
  const gifts = config.gifts;

  // Active gifts count
  const activeGifts = [
    { key: 'photos', enabled: gifts.photoAlbum.enabled, opened: openedGifts.photos },
    { key: 'voiceNote', enabled: gifts.voiceNote.enabled, opened: openedGifts.voiceNote },
    { key: 'video', enabled: gifts.videoMessage.enabled, opened: openedGifts.video },
    { key: 'surprise', enabled: gifts.surpriseLink.enabled, opened: openedGifts.surprise },
  ].filter((g) => g.enabled);

  const openedCount = activeGifts.filter((g) => g.opened).length;
  const allOpened = openedCount === activeGifts.length && activeGifts.length > 0;

  const handleSendWhatsApp = () => {
    const rawMsg = config.whatsapp.messageTemplate || `Makasih banyakkk atas ucapan ulang tahunnya yang manis bangett! 🤍✨`;
    const phone = config.whatsapp.phoneNumber ? config.whatsapp.phoneNumber.replace(/[^0-9]/g, '') : '';
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(rawMsg)}`
      : `https://wa.me/?text=${encodeURIComponent(rawMsg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 my-auto select-none relative z-10 py-4">
      {/* Return to Love Letter Button */}
      <div className="w-full flex items-center justify-start mb-2">
        <button
          onClick={onBackToLetter}
          className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#4A2E2B] hover:text-[#7A5C58] px-3.5 py-1.5 rounded-full bg-white/70 border border-white/80 shadow-xs backdrop-blur-md transition group cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Surat</span>
        </button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto mb-5"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/75 border border-white/90 shadow-xs mb-2 backdrop-blur-md">
          <Sparkles size={12} className="text-[#FFAAA6]" />
          <span className="font-serif font-bold text-xs text-[#4A2E2B]">
            RUANG KADO UNTUK {config.recipientName.toUpperCase()}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-black text-[#4A2E2B]">
          Ruang Kado & Hadiah Spesial 🎁
        </h2>
        <p className="text-xs text-[#7A5C58] font-serif mt-1">
          Sentuh salah satu kotak kado di bawah untuk membukanya yaa...
        </p>

        <div className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-serif font-bold text-[#7A5C58]">
          <span className="w-2 h-2 rounded-full bg-[#FFAAA6] inline-block" />
          <span>Kado Terbuka: {openedCount} dari {activeGifts.length}</span>
          {allOpened && <span className="text-emerald-700 font-bold ml-1">✨ Semua Terbuka!</span>}
        </div>
      </motion.div>

      {/* Grid of Interactive Gifts */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {/* Gift 1: Photo Album / Polaroids */}
        {gifts.photoAlbum.enabled && (
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => {
              sounds.playChime(587.33);
              onOpenPhotoAlbum();
            }}
            className={`cursor-pointer rounded-3xl p-5 flex flex-col justify-between items-center text-center transition-all duration-300 shadow-md backdrop-blur-md border ${
              openedGifts.photos
                ? 'bg-amber-50/80 border-amber-200/80'
                : 'bg-white/75 border-white/90 hover:bg-white/95'
            }`}
          >
            <div className="w-full flex justify-between items-center text-[10px] font-serif font-bold text-amber-900 mb-2">
              <span className="bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200">
                {gifts.photoAlbum.tag}
              </span>
              {openedGifts.photos && (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Check size={10} /> Dibuka
                </span>
              )}
            </div>

            <div className="my-3 text-5xl filter drop-shadow-xs">📸</div>

            <h3 className="font-serif font-black text-base text-[#4A2E2B] mt-1">
              {gifts.photoAlbum.title}
            </h3>
            <p className="text-xs text-[#7A5C58] font-serif leading-relaxed mt-1 mb-4 line-clamp-2">
              {gifts.photoAlbum.subtitle}
            </p>

            <button className="w-full py-2.5 rounded-full bg-[#FFE5D9] hover:bg-[#FFD1BA] text-[#4A2E2B] font-serif font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer">
              <span>Buka Galeri Foto 📸</span>
              <ArrowRight size={13} />
            </button>
          </motion.div>
        )}

        {/* Gift 2: Voice Note / Song */}
        {gifts.voiceNote.enabled && (
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => {
              sounds.playChime(659.25);
              onOpenVoiceNote();
            }}
            className={`cursor-pointer rounded-3xl p-5 flex flex-col justify-between items-center text-center transition-all duration-300 shadow-md backdrop-blur-md border ${
              openedGifts.voiceNote
                ? 'bg-rose-50/80 border-rose-200/80'
                : 'bg-white/75 border-white/90 hover:bg-white/95'
            }`}
          >
            <div className="w-full flex justify-between items-center text-[10px] font-serif font-bold text-rose-900 mb-2">
              <span className="bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200">
                {gifts.voiceNote.tag}
              </span>
              {openedGifts.voiceNote && (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Check size={10} /> Didengarkan
                </span>
              )}
            </div>

            <div className="my-3 text-5xl filter drop-shadow-xs">🎙️</div>

            <h3 className="font-serif font-black text-base text-[#4A2E2B] mt-1">
              {gifts.voiceNote.title}
            </h3>
            <p className="text-xs text-[#7A5C58] font-serif leading-relaxed mt-1 mb-4 line-clamp-2">
              {gifts.voiceNote.subtitle}
            </p>

            <button className="w-full py-2.5 rounded-full bg-[#FFCAD4] hover:bg-[#F4ACB7] text-[#4A2E2B] font-serif font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer">
              <span>Dengarkan Rekaman 🎶</span>
              <ArrowRight size={13} />
            </button>
          </motion.div>
        )}

        {/* Gift 3: Video Message */}
        {gifts.videoMessage.enabled && (
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => {
              sounds.playChime(783.99);
              onOpenVideo();
            }}
            className={`cursor-pointer rounded-3xl p-5 flex flex-col justify-between items-center text-center transition-all duration-300 shadow-md backdrop-blur-md border ${
              openedGifts.video
                ? 'bg-sky-50/80 border-sky-200/80'
                : 'bg-white/75 border-white/90 hover:bg-white/95'
            }`}
          >
            <div className="w-full flex justify-between items-center text-[10px] font-serif font-bold text-sky-900 mb-2">
              <span className="bg-sky-100/90 px-2.5 py-0.5 rounded-full border border-sky-200">
                {gifts.videoMessage.tag}
              </span>
              {openedGifts.video && (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Check size={10} /> Ditonton
                </span>
              )}
            </div>

            <div className="my-3 text-5xl filter drop-shadow-xs">🎬</div>

            <h3 className="font-serif font-black text-base text-[#4A2E2B] mt-1">
              {gifts.videoMessage.title}
            </h3>
            <p className="text-xs text-[#7A5C58] font-serif leading-relaxed mt-1 mb-4 line-clamp-2">
              {gifts.videoMessage.subtitle}
            </p>

            <button className="w-full py-2.5 rounded-full bg-[#BDE0FE] hover:bg-[#A2D2FF] text-[#4A2E2B] font-serif font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer">
              <span>Tonton Video 🎬</span>
              <ArrowRight size={13} />
            </button>
          </motion.div>
        )}

        {/* Gift 4: Surprise Link */}
        {gifts.surpriseLink.enabled && (
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => {
              sounds.playChime(880.0);
              onOpenSurpriseLink();
            }}
            className={`cursor-pointer rounded-3xl p-5 flex flex-col justify-between items-center text-center transition-all duration-300 shadow-md backdrop-blur-md border ${
              openedGifts.surprise
                ? 'bg-purple-50/80 border-purple-200/80'
                : 'bg-white/75 border-white/90 hover:bg-white/95'
            }`}
          >
            <div className="w-full flex justify-between items-center text-[10px] font-serif font-bold text-purple-900 mb-2">
              <span className="bg-purple-100/90 px-2.5 py-0.5 rounded-full border border-purple-200">
                {gifts.surpriseLink.tag}
              </span>
              {openedGifts.surprise && (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Check size={10} /> Dijelajahi
                </span>
              )}
            </div>

            <div className="my-3 text-5xl filter drop-shadow-xs">
              {gifts.surpriseLink.iconEmoji || '🎁'}
            </div>

            <h3 className="font-serif font-black text-base text-[#4A2E2B] mt-1">
              {gifts.surpriseLink.title}
            </h3>
            <p className="text-xs text-[#7A5C58] font-serif leading-relaxed mt-1 mb-4 line-clamp-2">
              {gifts.surpriseLink.subtitle}
            </p>

            <button className="w-full py-2.5 rounded-full bg-[#E9D8F5] hover:bg-[#D3BBEF] text-[#4A2E2B] font-serif font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer">
              <span>{gifts.surpriseLink.buttonText || 'Buka Kejutan 🎁'}</span>
              <ExternalLink size={13} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Climax / Closing Actions */}
      <div className="w-full max-w-sm mt-6 flex flex-col items-center gap-3">
        <p className="text-xs text-[#7A5C58] font-serif italic text-center leading-relaxed">
          "Semoga hari ulang tahunmu penuh dengan tawa, kehangatan, dan kebahagiaan tak terhingga, {config.petName || config.recipientName} 🤍"
        </p>

        <div className="w-full flex items-center justify-center gap-2">
          {config.whatsapp.enabled && (
            <button
              onClick={handleSendWhatsApp}
              className="flex-1 py-3 px-5 rounded-full bg-[#34A853] hover:bg-[#2E9749] text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>{config.whatsapp.buttonText || 'Balas ke WhatsApp 💬'}</span>
            </button>
          )}

          <button
            onClick={onRestart}
            className="py-3 px-4 rounded-full bg-white/85 hover:bg-white text-[#4A2E2B] border border-[#EADBCE] font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
            title="Mulai Ulang dari Awal"
          >
            <RotateCcw size={13} />
            <span>Ulang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
