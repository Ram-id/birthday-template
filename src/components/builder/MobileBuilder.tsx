import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Check, Plus, Trash2, Camera, ArrowRight } from 'lucide-react';
import { CommercialGiftData, availableCoupons, letterTemplates, VirtualCoupon, businessConfig } from '../../config/commercial.config';

interface MobileBuilderProps {
  giftData: CommercialGiftData;
  onChange: (newData: CommercialGiftData) => void;
  onPreview: () => void;
  onCheckout: () => void;
}

export const MobileBuilder: React.FC<MobileBuilderProps> = ({
  giftData,
  onChange,
  onPreview,
  onCheckout,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'coupons' | 'letter' | 'media'>('info');
  const [customCouponTitle, setCustomCouponTitle] = useState('');
  const [customCouponDesc, setCustomCouponDesc] = useState('');
  const [showAddCustomCoupon, setShowAddCustomCoupon] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Toggle selected coupon
  const handleToggleCoupon = (coupon: VirtualCoupon) => {
    const exists = giftData.coupons.some((c) => c.id === coupon.id);
    let updated: VirtualCoupon[];
    if (exists) {
      // Don't allow removing if only 1 left
      if (giftData.coupons.length <= 1) return;
      updated = giftData.coupons.filter((c) => c.id !== coupon.id);
    } else {
      updated = [...giftData.coupons, coupon];
    }
    onChange({ ...giftData, coupons: updated });
  };

  // Add custom coupon
  const handleAddCustomCoupon = () => {
    if (!customCouponTitle.trim()) return;
    const newCoupon: VirtualCoupon = {
      id: `custom-${Date.now()}`,
      title: customCouponTitle.trim(),
      category: 'romantic',
      icon: '🎁',
      description: customCouponDesc.trim() || 'Kupon spesial yang wajib dikabulkan kapan pun kamu mau!',
      validUntil: 'Berlaku selamanya',
    };
    onChange({
      ...giftData,
      coupons: [...giftData.coupons, newCoupon],
    });
    setCustomCouponTitle('');
    setCustomCouponDesc('');
    setShowAddCustomCoupon(false);
  };

  // Switch letter template
  const handleSelectTemplate = (templateKey: 'romantic' | 'friendship' | 'simple') => {
    onChange({
      ...giftData,
      letterContent: letterTemplates[templateKey],
    });
  };

  // Handle local photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...giftData, photoUrl: url });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#FCFAF7] text-[#4A2E2B] flex flex-col justify-between pb-28">
      {/* Top Banner */}
      <div className="w-full bg-white border-b border-stone-200/80 p-4 sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎂</span>
            <div>
              <h1 className="font-bold text-sm text-[#4A2E2B]">Buat Kado Ulang Tahun</h1>
              <p className="text-[11px] text-stone-500">Website interaktif siap kirim ke doi • Rp 15rb</p>
            </div>
          </div>
          <button
            onClick={onPreview}
            className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <Eye size={13} />
            <span>Pratinjau</span>
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex gap-1.5 mt-3 pt-2 border-t border-stone-100 overflow-x-auto text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeTab === 'info' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            1. Penerima
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeTab === 'coupons' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            2. Kupon Kado ({giftData.coupons.length})
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeTab === 'letter' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            3. Isi Surat
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeTab === 'media' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            4. Foto & WhatsApp
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="p-4 flex-1 space-y-4 text-xs font-medium">
        {/* TAB 1: PENERIMA */}
        {activeTab === 'info' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl text-amber-900 text-[11px] leading-relaxed">
              💡 <b>Tips:</b> Masukkan nama dan panggilan manis agar website kado ini terasa sangat personal dan berkesan bagi penerimanya!
            </div>

            <div>
              <label className="block font-bold text-[#4A2E2B] mb-1">Nama yang Berulang Tahun</label>
              <input
                type="text"
                value={giftData.recipientName}
                onChange={(e) => onChange({ ...giftData, recipientName: e.target.value })}
                placeholder="e.g. Alya Putri"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#4A2E2B] mb-1">Panggilan Sayang / Julukan</label>
                <input
                  type="text"
                  value={giftData.petName}
                  onChange={(e) => onChange({ ...giftData, petName: e.target.value })}
                  placeholder="e.g. Sayanggg, Cil"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#4A2E2B] mb-1">Ulang Tahun Ke-</label>
                <input
                  type="number"
                  value={giftData.age}
                  onChange={(e) => onChange({ ...giftData, age: parseInt(e.target.value) || 0 })}
                  placeholder="21"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#4A2E2B] mb-1">Nama Kamu (Pengirim)</label>
              <input
                type="text"
                value={giftData.senderName}
                onChange={(e) => onChange({ ...giftData, senderName: e.target.value })}
                placeholder="e.g. Rian Pratama"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
              />
            </div>

            <button
              onClick={() => setActiveTab('coupons')}
              className="w-full mt-2 py-3 rounded-2xl bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Lanjut Pilih Kupon Kado</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* TAB 2: KUPON KADO VIRTUAL */}
        {activeTab === 'coupons' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl text-rose-900 text-[11px] leading-relaxed">
              🎁 <b>Kado Kupon Kasih Sayang</b> adalah hadiah simpel yang bisa diklaim oleh doi kapan pun! Centang kupon yang ingin kamu berikan:
            </div>

            <div className="space-y-2">
              {availableCoupons.map((coupon) => {
                const isSelected = giftData.coupons.some((c) => c.id === coupon.id);
                return (
                  <div
                    key={coupon.id}
                    onClick={() => handleToggleCoupon(coupon)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-300 shadow-2xs'
                        : 'bg-white border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl">{coupon.icon}</span>
                      <div>
                        <div className="font-bold text-[#4A2E2B] text-xs">{coupon.title}</div>
                        <p className="text-[10px] text-stone-500 leading-tight mt-0.5">{coupon.description}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-amber-400 text-amber-950' : 'border border-stone-300'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Coupon Addition */}
            {!showAddCustomCoupon ? (
              <button
                onClick={() => setShowAddCustomCoupon(true)}
                className="w-full py-2.5 border-2 border-dashed border-stone-300 hover:border-stone-400 rounded-2xl text-stone-600 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus size={14} />
                <span>Tambah Kupon Khusus Sendiri</span>
              </button>
            ) : (
              <div className="p-3 bg-white rounded-2xl border border-stone-200 space-y-2">
                <div className="font-bold text-xs text-[#4A2E2B]">Buat Kupon Hadiah Custom</div>
                <input
                  type="text"
                  value={customCouponTitle}
                  onChange={(e) => setCustomCouponTitle(e.target.value)}
                  placeholder="e.g. Kupon Masakin Makan Malam 🍳"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                />
                <input
                  type="text"
                  value={customCouponDesc}
                  onChange={(e) => setCustomCouponDesc(e.target.value)}
                  placeholder="Keterangan singkat kupon..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCustomCoupon}
                    className="flex-1 py-1.5 bg-[#FFAAA6] text-[#4A2E2B] rounded-xl font-bold text-xs"
                  >
                    Simpan Kupon
                  </button>
                  <button
                    onClick={() => setShowAddCustomCoupon(false)}
                    className="px-3 py-1.5 bg-stone-100 text-stone-500 rounded-xl text-xs"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveTab('letter')}
              className="w-full mt-2 py-3 rounded-2xl bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Lanjut Isi Surat</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* TAB 3: SURAT UCAPAN */}
        {activeTab === 'letter' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* Template Selector */}
            <div>
              <label className="block font-bold text-[#4A2E2B] mb-1.5">Pilih Template Ucapan Instan</label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleSelectTemplate('romantic')}
                  className="py-2 px-2 rounded-xl bg-rose-100/70 hover:bg-rose-200 text-rose-900 text-[11px] font-bold text-center transition cursor-pointer"
                >
                  Romantis 🤍
                </button>
                <button
                  onClick={() => handleSelectTemplate('friendship')}
                  className="py-2 px-2 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-amber-900 text-[11px] font-bold text-center transition cursor-pointer"
                >
                  Sahabat 🚀
                </button>
                <button
                  onClick={() => handleSelectTemplate('simple')}
                  className="py-2 px-2 rounded-xl bg-sky-100/70 hover:bg-sky-200 text-sky-900 text-[11px] font-bold text-center transition cursor-pointer"
                >
                  Simpel 🎂
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#4A2E2B] mb-1">Judul Surat</label>
              <input
                type="text"
                value={giftData.letterGreeting}
                onChange={(e) => onChange({ ...giftData, letterGreeting: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#4A2E2B] mb-1">
                Isi Baris Pesan (Ditampilkan satu per satu secara kinetik)
              </label>
              <div className="space-y-2">
                {giftData.letterContent.map((line, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-stone-400 w-4">{idx + 1}.</span>
                    <input
                      type="text"
                      value={line}
                      onChange={(e) => {
                        const updated = [...giftData.letterContent];
                        updated[idx] = e.target.value;
                        onChange({ ...giftData, letterContent: updated });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs"
                    />
                    {giftData.letterContent.length > 1 && (
                      <button
                        onClick={() => {
                          const updated = giftData.letterContent.filter((_, i) => i !== idx);
                          onChange({ ...giftData, letterContent: updated });
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-500 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  onChange({
                    ...giftData,
                    letterContent: [...giftData.letterContent, 'Harapan terbaik untukmu di hari ini... ✨'],
                  })
                }
                className="w-full mt-2 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-1 transition"
              >
                <Plus size={13} />
                <span>Tambah Baris Kalimat</span>
              </button>
            </div>

            <div>
              <label className="block font-bold text-[#4A2E2B] mb-1">Penutup / Tanda Tangan</label>
              <input
                type="text"
                value={giftData.letterClosing}
                onChange={(e) => onChange({ ...giftData, letterClosing: e.target.value })}
                placeholder="e.g. Dengan segenap rasa sayang, Rian 🤍"
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs"
              />
            </div>

            <button
              onClick={() => setActiveTab('media')}
              className="w-full mt-2 py-3 rounded-2xl bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Lanjut Foto & WhatsApp</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* TAB 4: FOTO & WHATSAPP */}
        {activeTab === 'media' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            {/* Photo Selection */}
            <div>
              <label className="block font-bold text-[#4A2E2B] mb-1">Foto Kenangan Spesial (Opsional)</label>
              <div className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center gap-3">
                <img
                  src={giftData.photoUrl || '/cake.jpg'}
                  alt="Preview"
                  className="w-16 h-16 rounded-xl object-cover border border-stone-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Camera size={13} />
                    <span>Ganti Foto dari HP</span>
                  </button>
                  <p className="text-[10px] text-stone-400 mt-1 truncate">Foto ini akan tampil manis di kartu kado.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#4A2E2B] mb-1">Caption Foto</label>
              <input
                type="text"
                value={giftData.photoCaption || ''}
                onChange={(e) => onChange({ ...giftData, photoCaption: e.target.value })}
                placeholder="e.g. Senyum manismu yang selalu bikin hari-hariku cerah ✨"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="pt-2 border-t border-stone-200">
              <label className="block font-bold text-[#4A2E2B] mb-1">
                Nomor WhatsApp Kamu (Untuk Menerima Balasan & Klaim Kupon)
              </label>
              <input
                type="text"
                value={giftData.senderWhatsApp || ''}
                onChange={(e) => onChange({ ...giftData, senderWhatsApp: e.target.value })}
                placeholder="628123456789 (awali dengan 62)"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs"
              />
              <p className="text-[10px] text-stone-500 mt-1 leading-tight">
                Saat yang ultah mengklik tombol balasan di akhir website, pesannya akan langsung terkirim ke nomor WhatsApp ini.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-3.5 bg-white/95 backdrop-blur-md border-t border-stone-200 flex gap-2 z-40">
        <button
          onClick={onPreview}
          className="flex-1 py-3 px-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-[#4A2E2B] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <Eye size={15} />
          <span>Uji Coba Pratinjau</span>
        </button>

        <button
          onClick={onCheckout}
          className="flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-black text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer"
        >
          <Sparkles size={15} />
          <span>Dapatkan Link ({businessConfig.formattedPrice}) 🚀</span>
        </button>
      </div>
    </div>
  );
};
