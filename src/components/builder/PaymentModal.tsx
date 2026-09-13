import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, MessageCircle, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { CommercialGiftData, businessConfig } from '../../config/commercial.config';
import { encodeGiftData } from '../../utils/codec';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftData: CommercialGiftData;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  giftData,
}) => {
  const [isPaid, setIsPaid] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate the full shareable URL with encoded gift payload
  const encodedPayload = encodeGiftData(giftData);
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const shareableUrl = `${baseUrl}?gift=${encodedPayload}`;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === businessConfig.demoPromoCode.toUpperCase() || promoCode.trim().toUpperCase() === 'VIP') {
      setIsPaid(true);
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  };

  const handleSimulatePayment = () => {
    setIsPaid(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSendToRecipientWhatsApp = () => {
    const text = `Hai ${giftData.recipientName}! 🎂✨ Ada kado dan surat ulang tahun interaktif spesial yang aku buat khusus untukmu di hari ini. Buka sekarang yaa: \n\n${shareableUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleConfirmViaAdminWA = () => {
    const text = `Halo Admin! Saya ingin konfirmasi pembayaran ${businessConfig.formattedPrice} untuk Kado Digital atas nama penerima: *${giftData.recipientName}* dari *${giftData.senderName}*.`;
    window.open(`https://wa.me/${businessConfig.adminWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-5 z-10 max-h-[92vh] flex flex-col text-left overflow-y-auto border border-stone-100"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎁</span>
              <div>
                <h3 className="font-bold text-sm text-[#4A2E2B]">
                  {isPaid ? 'Link Kado Siap Dikirim! ✨' : 'Unlock Link Kado Spesial'}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {isPaid ? 'Kado untuk ' + giftData.recipientName : 'Cuma ' + businessConfig.formattedPrice + ' sekali bayar'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {!isPaid ? (
            /* STEP 1: PAYMENT (QRIS / PROMO) */
            <div className="py-3 flex flex-col items-center text-center space-y-3">
              {/* Price Banner */}
              <div className="w-full bg-gradient-to-r from-rose-50 to-amber-50 p-3 rounded-2xl border border-rose-100 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-xs text-stone-500 font-medium">Total Pembayaran:</div>
                  <div className="text-lg font-black text-rose-600">{businessConfig.formattedPrice}</div>
                </div>
                <span className="text-[10px] bg-rose-200 text-rose-800 font-bold px-2 py-1 rounded-full">
                  Akses Link Selamanya
                </span>
              </div>

              {/* QRIS Display */}
              <div className="p-3 bg-white border border-stone-200 rounded-2xl shadow-xs flex flex-col items-center max-w-[220px]">
                <div className="text-[10px] font-bold text-stone-600 tracking-wider mb-1">
                  SCAN QRIS PEMBAYARAN
                </div>
                <img
                  src={businessConfig.qrisImageUrl}
                  alt="QRIS Pembayaran"
                  className="w-40 h-40 object-contain rounded-lg border border-stone-100"
                />
                <div className="text-[9px] text-stone-400 mt-1.5 flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  <span>BCA • GoPay • OVO • Dana • ShopeePay</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed px-1">
                Scan QRIS di atas sebesar <b>{businessConfig.formattedPrice}</b>, lalu klik tombol konfirmasi atau uji coba di bawah:
              </p>

              {/* Action Buttons */}
              <div className="w-full space-y-2 pt-1">
                {/* Instant Sandbox / Demo Trigger */}
                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Konfirmasi Pembayaran ({businessConfig.formattedPrice})</span>
                </button>

                {/* WhatsApp Manual Confirm */}
                <button
                  onClick={handleConfirmViaAdminWA}
                  className="w-full py-2 px-3 rounded-full bg-stone-100 hover:bg-stone-200 text-[#4A2E2B] font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <MessageCircle size={14} className="text-emerald-600" />
                  <span>Kirim Bukti Transfer via WhatsApp</span>
                </button>
              </div>

              {/* Promo Code Input */}
              <div className="w-full pt-2 border-t border-stone-100">
                <div className="text-[10px] text-stone-500 font-medium mb-1.5 text-left">Punya Kode Voucher / Promo?</div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError(false);
                    }}
                    placeholder="Masukkan kode (e.g. GRATIS)"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs focus:outline-rose-400 uppercase"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Gunakan
                  </button>
                </div>
                {promoError && (
                  <p className="text-[10px] text-rose-500 text-left mt-1">Kode voucher tidak valid.</p>
                )}
              </div>
            </div>
          ) : (
            /* STEP 2: LINK READY & SHARING */
            <div className="py-3 flex flex-col items-center text-center space-y-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl animate-bounce">
                🎉
              </div>

              <div>
                <h4 className="font-bold text-base text-[#4A2E2B]">Pembayaran Berhasil!</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Link kado ulang tahun untuk <b>{giftData.recipientName}</b> sudah aktif selamanya.
                </p>
              </div>

              {/* Link Box */}
              <div className="w-full p-3 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col gap-2">
                <div className="text-[10px] text-stone-500 font-medium text-left">Tautan Kado Kamu:</div>
                <div className="text-[11px] font-mono text-[#4A2E2B] break-all bg-white p-2 rounded-xl border border-stone-100 text-left line-clamp-3">
                  {shareableUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-[#4A2E2B] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                  <span>{copied ? 'Tautan Berhasil Disalin!' : 'Salin Tautan Kado'}</span>
                </button>
              </div>

              {/* Share to WhatsApp Directly */}
              <button
                onClick={handleSendToRecipientWhatsApp}
                className="w-full py-3 rounded-full bg-[#34A853] hover:bg-[#2E9749] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Kirim Langsung ke WhatsApp Doi 💌</span>
              </button>

              {/* QR Code Preview for physical printing / greeting card */}
              <div className="w-full p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center gap-3 text-left">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(shareableUrl)}`}
                  alt="QR Code Kado"
                  className="w-14 h-14 rounded-lg border border-amber-200 bg-white p-1 shrink-0"
                />
                <div className="text-[11px] text-amber-900 leading-tight">
                  <span className="font-bold block">Kartu QR Code Kado 📲</span>
                  Screenshot QR code ini untuk diprint atau ditempel di kado fisikmu!
                </div>
              </div>

              {/* Test link in new tab */}
              <a
                href={shareableUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium underline"
              >
                <span>Buka dan coba lihat tampilan kado</span>
                <ExternalLink size={11} />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
