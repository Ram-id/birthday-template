import React, { useState, useEffect, useRef } from 'react';
import { FloatingPetals } from './components/FloatingPetals';
import { InteractiveBalloons } from './components/InteractiveBalloons';
import { CelebrationStage } from './components/CelebrationStage';
import { FinalLoveStage } from './components/FinalLoveStage';
import { GiftVaultStage } from './components/GiftVaultStage';
import { PhotoMemoryModal } from './components/modals/PhotoMemoryModal';
import { VoiceNoteModal } from './components/modals/VoiceNoteModal';
import { SpecialVideoModal } from './components/modals/SpecialVideoModal';
import { LiveCustomizerModal } from './components/modals/LiveCustomizerModal';
import { BirthdayConfig, defaultBirthdayConfig, PhotoMemory } from './config/birthday.config';
import { Play, Pause, Volume2, Sparkles, Sliders } from 'lucide-react';

export function App() {
  const [stage, setStage] = useState<'celebration' | 'letter' | 'gifts'>('celebration');
  const [config, setConfig] = useState<BirthdayConfig>(defaultBirthdayConfig);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [bgmTime, setBgmTime] = useState(0);
  const [bgmDuration, setBgmDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasBgmAutoPausedRef = useRef(false);

  // Modals state
  const [isPhotoAlbumOpen, setIsPhotoAlbumOpen] = useState(false);
  const [isVoiceNoteOpen, setIsVoiceNoteOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // In-browser media overrides
  const [customPhotos, setCustomPhotos] = useState<PhotoMemory[] | undefined>(undefined);
  const [customAudio, setCustomAudio] = useState<string | undefined>(undefined);
  const [customVideo, setCustomVideo] = useState<string | undefined>(undefined);

  // Opened gifts tracker
  const [openedGifts, setOpenedGifts] = useState({
    photos: false,
    voiceNote: false,
    video: false,
    surprise: false,
  });

  // Read URL query parameters or localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || params.get('name');
    const pet = params.get('pet');
    const age = params.get('age');
    const from = params.get('from') || params.get('sender');

    // If query params are present, prioritize them
    if (to || pet || age || from) {
      setConfig((prev) => ({
        ...prev,
        recipientName: to || prev.recipientName,
        petName: pet || prev.petName,
        age: age ? parseInt(age) || prev.age : prev.age,
        senderName: from || prev.senderName,
      }));
      return;
    }

    // Otherwise check localStorage
    const saved = localStorage.getItem('custom_birthday_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.recipientName) {
          setConfig(parsed);
        }
      } catch {
        // ignore invalid json
      }
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
      wasBgmAutoPausedRef.current = false;
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
          wasBgmAutoPausedRef.current = false;
        })
        .catch((e) => console.log('Audio autoplay prevented:', e));
    }
  };

  const pauseMusicForMedia = () => {
    if (audioRef.current && !audioRef.current.paused) {
      wasBgmAutoPausedRef.current = true;
      audioRef.current.pause();
      setIsPlayingMusic(false);
    }
  };

  const resumeMusicAfterMedia = () => {
    if (audioRef.current && wasBgmAutoPausedRef.current) {
      wasBgmAutoPausedRef.current = false;
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const handleBgmTimeUpdate = () => {
    if (audioRef.current) {
      setBgmTime(audioRef.current.currentTime);
    }
  };

  const handleBgmLoadedMetadata = () => {
    if (audioRef.current) {
      setBgmDuration(audioRef.current.duration || 0);
    }
  };

  const handleBgmSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setBgmTime(val);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !time) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRestart = () => {
    setStage('celebration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] w-full relative calm-aesthetic-bg text-[#4A2E2B] font-sans flex flex-col justify-between items-center selection:bg-[#FFCAD4] selection:text-[#4A2E2B] pb-24 sm:pb-28 overflow-x-hidden">
      {/* Background BGM Audio element */}
      <audio
        ref={audioRef}
        src={config.bgmUrl}
        loop
        preload="auto"
        onTimeUpdate={handleBgmTimeUpdate}
        onLoadedMetadata={handleBgmLoadedMetadata}
      />

      {/* Floating Sparkles & Warm Ambient Atmosphere */}
      <FloatingPetals />

      {/* Floating & Interactive Balloons */}
      <InteractiveBalloons />

      {/* Top Navbar */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between relative z-30">
        {/* Recipient Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/90 shadow-xs">
          <span className="text-sm">🎂</span>
          <span className="font-serif font-black text-xs sm:text-sm tracking-wide text-[#4A2E2B]">
            {config.recipientName}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A5C58] bg-[#FFE5D9] px-2 py-0.5 rounded-full">
            Usia {config.age} ✨
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* In-Browser Live Customizer Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#4A2E2B] border border-white/90 shadow-xs backdrop-blur-md transition flex items-center gap-1.5 text-xs font-serif font-bold active:scale-95 cursor-pointer"
            title="Kustomisasi Konten & Link"
          >
            <Sliders size={13} className="text-[#FFAAA6]" />
            <span className="hidden sm:inline">Kustomisasi</span>
          </button>
        </div>
      </header>

      {/* Main Stage Switcher */}
      <main className="w-full flex-1 flex flex-col items-center justify-center my-auto relative z-10 px-2">
        {stage === 'celebration' && (
          <CelebrationStage
            config={config}
            onGoToLetter={() => {
              setStage('letter');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={toggleMusic}
          />
        )}

        {stage === 'letter' && (
          <FinalLoveStage
            config={config}
            onBackToCelebration={() => {
              setStage('celebration');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToGifts={() => {
              setStage('gifts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {stage === 'gifts' && (
          <GiftVaultStage
            config={config}
            onOpenPhotoAlbum={() => {
              setIsPhotoAlbumOpen(true);
              setOpenedGifts((prev) => ({ ...prev, photos: true }));
            }}
            onOpenVoiceNote={() => {
              setIsVoiceNoteOpen(true);
              setOpenedGifts((prev) => ({ ...prev, voiceNote: true }));
            }}
            onOpenVideo={() => {
              setIsVideoOpen(true);
              setOpenedGifts((prev) => ({ ...prev, video: true }));
            }}
            onOpenSurpriseLink={() => {
              setOpenedGifts((prev) => ({ ...prev, surprise: true }));
              window.open(config.gifts.surpriseLink.url, '_blank', 'noopener,noreferrer');
            }}
            onBackToLetter={() => {
              setStage('letter');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRestart={handleRestart}
            openedGifts={openedGifts}
          />
        )}
      </main>

      {/* Aesthetic Bottom Audio Player Bar */}
      <div className="fixed bottom-3 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-40">
        <div className="bg-white/90 text-[#4A2E2B] rounded-3xl p-3 sm:px-5 sm:py-3.5 shadow-xl shadow-[#EADBCE]/50 backdrop-blur-md border border-white/90 flex items-center justify-between gap-3 select-none">
          {/* Play/Pause Button */}
          <button
            onClick={toggleMusic}
            className="w-9 h-9 rounded-full cohesive-pill-btn text-[#4A2E2B] flex items-center justify-center shadow-xs transition active:scale-90 shrink-0 cursor-pointer"
            title={isPlayingMusic ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingMusic ? (
              <Pause size={15} />
            ) : (
              <Play size={15} className="ml-0.5" />
            )}
          </button>

          {/* Title & Timeline Scrubber */}
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#4A2E2B] truncate pr-2 flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#FFAAA6] animate-spin" />
                <span>
                  {isPlayingMusic
                    ? 'Lagu Ulang Tahun • Musik Pengiring'
                    : 'Putar Musik Pengiring 🎶'}
                </span>
              </span>
              <span className="text-[10px] font-mono text-[#7A5C58] font-semibold shrink-0">
                {formatTime(bgmTime)} / {formatTime(bgmDuration || 252)}
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={bgmDuration || 252}
              value={bgmTime}
              onChange={handleBgmSeek}
              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#FFAAA6]"
            />
          </div>

          {/* Volume Icon Indicator */}
          <div className="text-[#4A2E2B] shrink-0">
            <Volume2 size={16} className={isPlayingMusic ? 'animate-bounce text-[#FFAAA6]' : 'opacity-70'} />
          </div>
        </div>
      </div>

      {/* Gift Modals */}
      <PhotoMemoryModal
        isOpen={isPhotoAlbumOpen}
        onClose={() => setIsPhotoAlbumOpen(false)}
        config={config}
        customPhotos={customPhotos}
        onUpdatePhotos={(photos) => setCustomPhotos(photos)}
      />

      <VoiceNoteModal
        isOpen={isVoiceNoteOpen}
        onClose={() => setIsVoiceNoteOpen(false)}
        config={config}
        customAudio={customAudio}
        onUpdateAudio={(aud) => setCustomAudio(aud)}
        onPauseBgm={pauseMusicForMedia}
        onResumeBgm={resumeMusicAfterMedia}
      />

      <SpecialVideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        config={config}
        customVideo={customVideo}
        onUpdateVideo={(vid) => setCustomVideo(vid)}
        onPauseBgm={pauseMusicForMedia}
        onResumeBgm={resumeMusicAfterMedia}
      />

      {/* In-Browser Live Customizer Modal */}
      <LiveCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSaveConfig={(newConfig) => setConfig(newConfig)}
      />
    </div>
  );
}

export default App;
