import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Sparkles, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { BirthdayConfig, PhotoMemory } from '../../config/birthday.config';

interface PhotoMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  customPhotos?: PhotoMemory[];
  onUpdatePhotos?: (photos: PhotoMemory[]) => void;
}

export const PhotoMemoryModal: React.FC<PhotoMemoryModalProps> = ({
  isOpen,
  onClose,
  config,
  customPhotos,
  onUpdatePhotos,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const albumConfig = config.gifts.photoAlbum;
  const photos = customPhotos && customPhotos.length > 0 ? customPhotos : albumConfig.photos;

  if (!isOpen) return null;

  const currentPhoto = photos[selectedIdx] || photos[0];

  const handleNextPhoto = () => {
    setSelectedIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setSelectedIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdatePhotos) {
      const url = URL.createObjectURL(file);
      const updated = [...photos];
      updated[selectedIdx] = {
        ...updated[selectedIdx],
        url,
      };
      onUpdatePhotos(updated);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-xl bg-[#FFFDF9] border border-white/90 rounded-3xl shadow-2xl p-5 sm:p-7 z-10 max-h-[90vh] flex flex-col text-left overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFAAA6] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-serif font-bold text-[#7A5C58] uppercase tracking-wider">
                {albumConfig.tag}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition cursor-pointer"
              title="Tutup"
            >
              <X size={16} />
            </button>
          </div>

          {/* Title */}
          <div className="my-3 text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-black text-[#4A2E2B]">
              {albumConfig.title}
            </h3>
            <p className="text-xs text-[#7A5C58] font-serif mt-0.5">
              {albumConfig.subtitle}
            </p>
          </div>

          {/* Polaroid Frame */}
          <div className="relative my-2 flex flex-col items-center">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, rotate: -2, scale: 0.96 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-stone-200/70 max-w-sm w-full flex flex-col items-center"
            >
              {/* Photo Viewport */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-100 cursor-zoom-in group shadow-inner"
              >
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/cake.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-stone-800 text-xs font-serif font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Eye size={12} /> Perbesar Foto
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="w-full text-center mt-3.5 px-2">
                <span className="text-[10px] font-serif font-bold tracking-widest text-[#FFAAA6] uppercase block mb-1">
                  {currentPhoto.tag || `Foto ${selectedIdx + 1}`}
                </span>
                <p className="font-serif italic text-sm text-[#4A2E2B] leading-relaxed">
                  "{currentPhoto.caption}"
                </p>
              </div>
            </motion.div>

            {/* Photo Navigation Arrows */}
            {photos.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={handlePrevPhoto}
                  className="w-9 h-9 rounded-full bg-white text-[#4A2E2B] border border-stone-200 hover:bg-stone-50 shadow-xs flex items-center justify-center transition cursor-pointer active:scale-95"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex gap-1.5">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIdx(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === selectedIdx ? 'w-6 bg-[#FFAAA6]' : 'w-2 bg-stone-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextPhoto}
                  className="w-9 h-9 rounded-full bg-white text-[#4A2E2B] border border-stone-200 hover:bg-stone-50 shadow-xs flex items-center justify-center transition cursor-pointer active:scale-95"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Story Note / Words from sender */}
          {albumConfig.storyNote && (
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-[#5D3A36] font-serif leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-900">
                <Sparkles size={12} className="text-[#FFAAA6]" />
                <span>Catatan Hangat:</span>
              </div>
              <p>{albumConfig.storyNote}</p>
            </div>
          )}

          {/* Quick In-Browser Photo Replacement Option */}
          <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-serif">
            <span>Mau mengganti foto polaroid ini?</span>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhoto}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-[#4A2E2B] font-bold text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer"
            >
              <Upload size={12} />
              <span>Ganti Foto Ini</span>
            </button>
          </div>
        </motion.div>

        {/* Lightbox Zoom */}
        {isLightboxOpen && (
          <div
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-2xl max-h-[90vh] flex flex-col items-center">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain"
              />
              <p className="text-white text-sm font-serif italic mt-3 text-center px-4">
                {currentPhoto.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
