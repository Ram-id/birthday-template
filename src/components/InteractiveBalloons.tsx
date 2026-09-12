import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface Balloon {
  id: number;
  color: string;
  side: 'left' | 'right';
  xOffset: number; // px from edge
  yOffset: number; // % from top
  size: number;
  label: string;
  delay: number;
}

const initialBalloons: Balloon[] = [
  { id: 1, color: 'from-[#FFB7B2] to-[#FFAAA6]', side: 'left', xOffset: 16, yOffset: 15, size: 50, label: '🌸', delay: 0 },
  { id: 2, color: 'from-[#FFE5D9] to-[#FFD1BA]', side: 'left', xOffset: 52, yOffset: 32, size: 56, label: '✨', delay: 0.3 },
  { id: 3, color: 'from-[#FFF1C5] to-[#FDE2B8]', side: 'left', xOffset: 20, yOffset: 55, size: 48, label: '🎂', delay: 0.6 },
  { id: 4, color: 'from-[#E2F0CB] to-[#BCD4CE]', side: 'left', xOffset: 60, yOffset: 72, size: 52, label: '🍃', delay: 0.9 },
  { id: 5, color: 'from-[#C7CEEA] to-[#B9D7EA]', side: 'right', xOffset: 16, yOffset: 16, size: 52, label: '🤍', delay: 0.15 },
  { id: 6, color: 'from-[#FFCAD4] to-[#F4ACB7]', side: 'right', xOffset: 54, yOffset: 34, size: 56, label: '💖', delay: 0.45 },
  { id: 7, color: 'from-[#FFE5D9] to-[#FFD1BA]', side: 'right', xOffset: 22, yOffset: 54, size: 50, label: '🧸', delay: 0.75 },
  { id: 8, color: 'from-[#E9D8F5] to-[#D3BBEF]', side: 'right', xOffset: 58, yOffset: 70, size: 54, label: '👑', delay: 1.05 },
];

export const InteractiveBalloons: React.FC = () => {
  const [popped, setPopped] = useState<Record<number, boolean>>({});

  const handlePop = (balloon: Balloon, e: React.MouseEvent) => {
    if (popped[balloon.id]) return;

    sounds.playPop();

    // Trigger local confetti burst at balloon click location
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FFF1C5', '#FF9AA2'],
      shapes: ['circle'],
      scalar: 0.8,
    });

    setPopped((prev) => ({ ...prev, [balloon.id]: true }));

    // Respawn balloon after 4 seconds
    setTimeout(() => {
      setPopped((prev) => ({ ...prev, [balloon.id]: false }));
    }, 4000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Fairy Lights Twinkling String at the Top */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-around px-4 pointer-events-none z-10 opacity-85">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Hanging wire */}
            <div className="w-[1px] h-3 bg-amber-900/20" />
            {/* Glowing Bulb */}
            <div
              className={`w-2.5 h-3.5 rounded-full shadow-sm twinkle-star ${
                i % 4 === 0
                  ? 'bg-amber-300 shadow-amber-300/80'
                  : i % 4 === 1
                  ? 'bg-rose-300 shadow-rose-300/80'
                  : i % 4 === 2
                  ? 'bg-yellow-200 shadow-yellow-200/80'
                  : 'bg-orange-200 shadow-orange-200/80'
              }`}
              style={{ animationDelay: `${(i * 0.35) % 2.5}s` }}
            />
          </div>
        ))}
      </div>

      {/* Floating Interactive Balloons */}
      {initialBalloons.map((b) => (
        <AnimatePresence key={b.id}>
          {!popped[b.id] && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 0.9,
                y: [0, -12, 0],
                rotate: [-2, 2, -2],
              }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{
                y: { repeat: Infinity, duration: 3.5 + (b.id % 4) * 0.4, ease: 'easeInOut' },
                rotate: { repeat: Infinity, duration: 4 + (b.id % 3) * 0.3, ease: 'easeInOut' },
                default: { duration: 0.4, delay: b.delay },
              }}
              onClick={(e) => handlePop(b, e)}
              className="absolute pointer-events-auto cursor-pointer group select-none hidden sm:block"
              style={{
                [b.side]: `${b.xOffset}px`,
                top: `${b.yOffset}%`,
              }}
              title="Klik untuk meletuskan balon! 🎈"
            >
              {/* Balloon Body */}
              <div
                className={`relative rounded-full bg-gradient-to-tr ${b.color} shadow-md shadow-[#EADBCE]/50 group-hover:scale-110 transition-transform flex items-center justify-center`}
                style={{ width: `${b.size}px`, height: `${b.size * 1.2}px` }}
              >
                {/* Glossy Reflection */}
                <div className="absolute top-2 left-2.5 w-3 h-5 bg-white/60 rounded-full blur-[1px] rotate-[-25deg]" />

                {/* Inner cute emoji */}
                <span className="text-sm select-none filter drop-shadow-xs group-hover:scale-125 transition-transform">
                  {b.label}
                </span>

                {/* Balloon Tie Knot */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-xs bg-inherit rotate-45" />
              </div>

              {/* Balloon String */}
              <div className="w-[1px] h-12 bg-stone-400/50 mx-auto -mt-0.5 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};
