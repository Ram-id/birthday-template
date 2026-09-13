import { useState, useEffect } from 'react';
import { MobileBuilder } from './components/builder/MobileBuilder';
import { PaymentModal } from './components/builder/PaymentModal';
import { MobileViewer } from './components/viewer/MobileViewer';
import { GiftCustomData, defaultGiftCustomData } from './config/templates.config';
import { decodeGiftData } from './utils/codec';

export function App() {
  const [giftData, setGiftData] = useState<GiftCustomData>(defaultGiftCustomData);
  const [mode, setMode] = useState<'builder' | 'viewer'>('builder');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isRecipientView, setIsRecipientView] = useState(false);

  // Check URL query params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const encodedGift = params.get('gift');

    if (encodedGift) {
      const decoded = decodeGiftData(encodedGift);
      if (decoded) {
        setGiftData(decoded);
        setMode('viewer');
        setIsRecipientView(true);
        return;
      }
    }

    // Fallback simple query params like ?to=Sarah&from=Dimas
    const to = params.get('to');
    const from = params.get('from');
    const pet = params.get('pet');
    const occasion = params.get('occasion');

    if (to || from || pet || occasion) {
      setGiftData((prev) => ({
        ...prev,
        recipientName: to || prev.recipientName,
        senderName: from || prev.senderName,
        petName: pet || prev.petName,
        occasion: (occasion as any) || prev.occasion,
      }));
      setMode('viewer');
      setIsRecipientView(true);
      return;
    }

    // Check local draft
    const saved = localStorage.getItem('draft_luxury_gift');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.recipientName) {
          setGiftData(parsed);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleDataChange = (newData: GiftCustomData) => {
    setGiftData(newData);
    localStorage.setItem('draft_luxury_gift', JSON.stringify(newData));
  };

  const handlePreview = () => {
    setMode('viewer');
  };

  const handleReturnToBuilder = () => {
    setMode('builder');
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#EFECE6] flex justify-center items-center font-sans">
      {mode === 'builder' ? (
        <MobileBuilder
          giftData={giftData}
          onChange={handleDataChange}
          onPreview={handlePreview}
          onCheckout={() => setIsPaymentOpen(true)}
        />
      ) : (
        <MobileViewer
          giftData={giftData}
          onEdit={!isRecipientView ? handleReturnToBuilder : undefined}
          isPreview={!isRecipientView}
        />
      )}

      {/* Paywall Modal (Rp 15.000) */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        giftData={giftData}
      />
    </div>
  );
}

export default App;
