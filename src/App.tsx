import { useState, useEffect } from 'react';
import { MobileBuilder } from './components/builder/MobileBuilder';
import { PaymentModal } from './components/builder/PaymentModal';
import { MobileViewer } from './components/viewer/MobileViewer';
import { CommercialGiftData, defaultCommercialGift } from './config/commercial.config';
import { decodeGiftData } from './utils/codec';

export function App() {
  const [giftData, setGiftData] = useState<CommercialGiftData>(defaultCommercialGift);
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

    // Fallback: simple query params like ?to=Alya&from=Rian&age=21
    const to = params.get('to');
    const from = params.get('from');
    const age = params.get('age');
    const pet = params.get('pet');

    if (to || from || age || pet) {
      setGiftData((prev) => ({
        ...prev,
        recipientName: to || prev.recipientName,
        senderName: from || prev.senderName,
        age: age ? parseInt(age) || prev.age : prev.age,
        petName: pet || prev.petName,
      }));
      setMode('viewer');
      setIsRecipientView(true);
      return;
    }

    // Check local draft
    const saved = localStorage.getItem('draft_commercial_gift');
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

  const handleDataChange = (newData: CommercialGiftData) => {
    setGiftData(newData);
    localStorage.setItem('draft_commercial_gift', JSON.stringify(newData));
  };

  const handlePreview = () => {
    setMode('viewer');
  };

  const handleReturnToBuilder = () => {
    setMode('builder');
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#F5F2EB] flex justify-center items-center">
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
