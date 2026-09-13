import { useState, useEffect } from 'react';
import { GiftExperience } from './types/gift';
import { defaultGiftExperiences } from './config/presets';
import { LandingPage } from './components/landing/LandingPage';
import { StudioEditor } from './components/studio/StudioEditor';
import { GiftCanvas } from './components/canvas/GiftCanvas';
import { decodeGiftData } from './utils/codec';
import { Edit3 } from 'lucide-react';

export function App() {
  const [giftData, setGiftData] = useState<GiftExperience>(defaultGiftExperiences.birthday);
  const [viewMode, setViewMode] = useState<'landing' | 'studio' | 'canvas'>('landing');
  const [isRecipientStandalone, setIsRecipientStandalone] = useState(false);

  // Check URL query params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const encodedGift = params.get('gift');

    if (encodedGift) {
      const decoded = decodeGiftData(encodedGift);
      if (decoded) {
        setGiftData(decoded);
        setViewMode('canvas');
        setIsRecipientStandalone(true);
        return;
      }
    }

    // Check saved local draft
    const savedDraft = localStorage.getItem('kadokasih_studio_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed && (parsed.recipientName || parsed.letterTitle)) {
          setGiftData(parsed);
        }
      } catch {
        // ignore fallback
      }
    }
  }, []);

  const handleDataChange = (newData: GiftExperience) => {
    setGiftData(newData);
    localStorage.setItem('kadokasih_studio_draft', JSON.stringify(newData));
  };

  const handleStartStudio = (preset: GiftExperience) => {
    setGiftData(preset);
    localStorage.setItem('kadokasih_studio_draft', JSON.stringify(preset));
    setViewMode('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full font-sans antialiased">
      {viewMode === 'landing' && (
        <LandingPage onStartStudio={handleStartStudio} />
      )}

      {viewMode === 'studio' && (
        <StudioEditor
          gift={giftData}
          onChange={handleDataChange}
          onGoToLanding={() => setViewMode('landing')}
          onPreviewFullscreen={() => setViewMode('canvas')}
        />
      )}

      {viewMode === 'canvas' && (
        <div className="relative min-h-screen">
          {/* If opened as preview from studio, give option to return to Studio */}
          {!isRecipientStandalone && (
            <div className="fixed top-4 left-4 z-50">
              <button
                onClick={() => setViewMode('studio')}
                className="px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-serif font-medium flex items-center gap-1.5 shadow-lg border border-white/20 transition cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Kembali ke Studio</span>
              </button>
            </div>
          )}

          <GiftCanvas gift={giftData} isStandalone={isRecipientStandalone} />
        </div>
      )}
    </div>
  );
}

export default App;
