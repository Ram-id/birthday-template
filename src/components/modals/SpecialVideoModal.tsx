import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthday.config';

interface SpecialVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  customVideo?: string;
  onUpdateVideo?: (videoUrl: string) => void;
  onPauseBgm?: () => void;
  onResumeBgm?: () => void;
}

const getYouTubeId = (url?: string): string | null => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
};

export const SpecialVideoModal: React.FC<SpecialVideoModalProps> = ({
  isOpen,
  onClose,
  config,
  customVideo,
  onUpdateVideo,
  onPauseBgm,
  onResumeBgm,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const videoConfig = config.gifts.videoMessage;
  const rawVideoUrl = customVideo || videoConfig.videoUrl;
  const ytId = getYouTubeId(rawVideoUrl);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateVideo) {
      const url = URL.createObjectURL(file);
      onUpdateVideo(url);
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onResumeBgm?.();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-2xl bg-[#FFFDF9] border border-white/90 rounded-3xl shadow-2xl p-5 sm:p-7 z-10 max-h-[90vh] flex flex-col text-left overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFAAA6] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-serif font-bold text-[#7A5C58] uppercase tracking-wider">
                {videoConfig.tag}
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
          <div className="my-3 text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-black text-[#4A2E2B]">
              {videoConfig.title}
            </h3>
            <p className="text-xs text-[#7A5C58] font-serif mt-0.5">
              {videoConfig.subtitle}
            </p>
          </div>

          {/* Video Player Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-xl my-2 border border-stone-200/80">
            {ytId ? (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                title="Birthday Special Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <video
                ref={videoRef}
                src={rawVideoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => onPauseBgm?.()}
                onPause={() => onResumeBgm?.()}
              >
                Browser Anda tidak mendukung tag video.
              </video>
            )}
          </div>

          {/* Caption */}
          {videoConfig.caption && (
            <p className="text-xs text-[#7A5C58] font-serif italic text-center mt-2 px-3 leading-relaxed">
              "{videoConfig.caption}"
            </p>
          )}

          {/* In-Browser Video Replacement Option */}
          <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-serif">
            <span>Mau mencoba putar file video dari komputermu?</span>
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-[#4A2E2B] font-bold text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer"
            >
              <Upload size={12} />
              <span>Pilih Video Lokal</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
