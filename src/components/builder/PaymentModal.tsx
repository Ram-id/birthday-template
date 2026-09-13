import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, MessageCircle, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { GiftCustomData, platformCommerce } from '../../config/templates.config';
import { encodeGiftData } from '../../utils/codec';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftData: GiftCustomData;
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
    if (promoCode.trim().toUpperCase() === platformCommerce.demoPromoCode.toUpperCase() || promoCode.trim().toUpperCase() === 'VIP') {
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
    const text = `Hai ${giftData.recipientName}! ✨ Ada sebuah kado dan surat digital istimewa yang kurangkai khusus untukmu di hari ini. Buka sekarang yaa: \n\n${shareableUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleConfirmViaAdminWA = () => {
    const text = `Halo Admin! Saya ingin konfirmasi pembayaran ${platformCommerce.formattedPrice} untuk Kado Digital (${giftData.occasion.toUpperCase()}) atas nama: *${giftData.recipientName}* dari *${giftData.senderName}*.`;
    window.open(`https://wa.me/${platformCommerce.adminWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Modal Window: Luxury Ivory Boutique Receipt */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-sm bg-[#FCFAF7] rounded-3xl shadow-2xl p-5 sm:p-6 z-10 max-h-[92vh] flex flex-col text-left overflow-y-auto border border-[#EADBCE]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EADBCE]">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <div>
                <h3 className="font-serif font-black text-sm text-[#4A2E2B]">
                  {isPaid ? 'Kado Siap Dikirim! 💌' : 'Bungkus Kado Spesial'}
                </h3>
                <p className="text-[10px] font-serif text-[#7A5C58]">
                  {isPaid ? `Tautan eksklusif untuk ${giftData.recipientName}` : `Cuma ${platformCommerce.formattedPrice} • Sekali bayar aktif selamanya`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-[#4A2E2B] border border-[#EADBCE] flex items-center justify-center transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {!isPaid ? (
            /* STEP 1: PAYMENT (QRIS / PROMO) */
            <div className="py-3 flex flex-col items-center text-center space-y-3">
              {/* Luxury Price Receipt */}
              <div className="w-full bg-gradient-to-r from-[#FFF5F2] to-[#FFFBF5] p-3 rounded-2xl border border-[#FFCAD4] flex items-center justify-between">
                <div className="text-left">
                  <div className="text-[10px] font-serif text-[#7A5C58] uppercase tracking-wider">Total Pembayaran:</div>
                  <div className="text-lg font-serif font-black text-[#8E3B33]">{platformCommerce.formattedPrice}</div>
                </div>
                <span className="text-[10px] font-serif font-bold bg-[#FFE5D9] text-[#7A5C58] px-2.5 py-1 rounded-full border border-[#FFCAD4]">
                  Akses Link Selamanya
                </span>
              </div>

              {/* QRIS Frame */}
              <div className="p-3 bg-white border border-[#EADBCE] rounded-2xl shadow-xs flex flex-col items-center max-w-[220px]">
                <div className="text-[9px] font-serif font-bold text-[#7A5C58] tracking-widest mb-1.5 uppercase">
                  SCAN QRIS PEMBAYARAN
                </div>
                <img
                  src={platformCommerce.qrisImageUrl}
                  alt="QRIS Pembayaran"
                  className="w-40 h-40 object-contain rounded-lg border border-stone-100"
                />
                <div className="text-[9px] text-[#7A5C58] mt-2 flex items-center gap-1 font-serif">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  <span>BCA • GoPay • OVO • Dana • ShopeePay</span>
                </div>
              </div>

              <p className="text-[11px] font-serif text-[#7A5C58] leading-relaxed px-1">
                Scan QRIS di atas sebesar <b>{platformCommerce.formattedPrice}</b>, lalu klik tombol di bawah untuk membuka link:
              </p>

              {/* Action Buttons */}
              <div className="w-full space-y-2 pt-1">
                {/* Instant Sandbox / Demo Trigger */}
                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Konfirmasi Pembayaran ({platformCommerce.formattedPrice})</span>
                </button>

                {/* WhatsApp Manual Confirm */}
                <button
                  onClick={handleConfirmViaAdminWA}
                  className="w-full py-2 px-3 rounded-full bg-white hover:bg-stone-50 text-[#4A2E2B] border border-[#EADBCE] font-serif font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <MessageCircle size={14} className="text-emerald-600" />
                  <span>Kirim Bukti Transfer via WhatsApp</span>
                </button>
              </div>

              {/* Promo Code Input */}
              <div className="w-full pt-2 border-t border-[#EADBCE]">
                <div className="text-[10px] font-serif text-[#7A5C58] font-bold mb-1.5 text-left">Punya Kode Voucher / Promo?</div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError(false);
                    }}
                    placeholder="Masukkan kode (e.g. GRATIS)"
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#EADBCE] text-xs font-serif focus:outline-[#FFAAA6] uppercase text-[#4A2E2B]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 rounded-xl bg-[#4A2E2B] hover:bg-[#381E1C] text-white text-xs font-serif font-bold transition cursor-pointer"
                  >
                    Gunakan
                  </button>
                </div>
                {promoError && (
                  <p className="text-[10px] text-rose-500 font-serif text-left mt-1">Kode voucher tidak valid.</p>
                )}
              </div>
            </div>
          ) : (
            /* STEP 2: LINK READY & SHARING */
            <div className="py-3 flex flex-col items-center text-center space-y-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FFE5D9] text-[#4A2E2B] flex items-center justify-center text-2xl shadow-xs animate-bounce">
                💌
              </div>

              <div>
                <h4 className="font-serif font-black text-base text-[#4A2E2B]">Kado Berhasil Dibungkus! ✨</h4>
                <p className="text-xs font-serif text-[#7A5C58] mt-0.5">
                  Tautan kado digital untuk <b>{giftData.recipientName}</b> telah aktif selamanya.
                </p>
              </div>

              {/* Link Box */}
              <div className="w-full p-3 bg-white rounded-2xl border border-[#EADBCE] flex flex-col gap-2 shadow-2xs">
                <div className="text-[10px] font-serif text-[#7A5C58] font-bold text-left">Tautan Eksklusif Kamu:</div>
                <div className="text-[10px] font-mono text-[#4A2E2B] break-all bg-stone-50 p-2 rounded-xl border border-stone-200 text-left line-clamp-3">
                  {shareableUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 rounded-xl bg-[#FFE5D9] hover:bg-[#FFD1BA] text-[#4A2E2B] font-serif font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                  <span>{copied ? 'Tautan Berhasil Disalin!' : 'Salin Tautan Kado'}</span>
                </button>
              </div>

              {/* Share to WhatsApp Directly */}
              <button
                onClick={handleSendToRecipientWhatsApp}
                className="w-full py-3.5 rounded-full bg-[#34A853] hover:bg-[#2E9749] text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Kirim Langsung ke WhatsApp Doi 💌</span>
              </button>

              {/* Aesthetic QR Code Card Preview */}
              <div className="w-full p-3 bg-[#FAF3EC] border border-[#EADBCE] rounded-2xl flex items-center gap-3 text-left">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(shareableUrl)}`}
                  alt="QR Code Kado"
                  className="w-14 h-14 rounded-lg border border-[#EADBCE] bg-white p-1 shrink-0"
                />
                <div className="text-[10px] font-serif text-[#5D3A36] leading-tight">
                  <span className="font-bold block mb-0.5">Kartu QR Code Digital 📲</span>
                  Screenshot atau cetak QR code ini untuk ditempelkan di kado fisikmu!
                </div>
              </div>

              {/* Test link in new tab */}
              <a
                href={shareableUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-serif text-[#7A5C58] hover:text-[#4A2E2B] flex items-center gap-1 font-semibold underline"
              >
                <span>Buka dan uji coba tampilan kado</span>
                <ExternalLink size={11} />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
