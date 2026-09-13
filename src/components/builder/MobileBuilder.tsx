import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Check, Plus, Trash2, Camera, ArrowRight } from 'lucide-react';
import { GiftCustomData, OccasionType, occasionPresets, platformCommerce } from '../../config/templates.config';

interface MobileBuilderProps {
  giftData: GiftCustomData;
  onChange: (newData: GiftCustomData) => void;
  onPreview: () => void;
  onCheckout: () => void;
}

export const MobileBuilder: React.FC<MobileBuilderProps> = ({
  giftData,
  onChange,
  onPreview,
  onCheckout,
}) => {
  const [activeSection, setActiveSection] = useState<'occasion' | 'info' | 'coupons' | 'letter' | 'media'>('occasion');
  const [customCouponTitle, setCustomCouponTitle] = useState('');
  const [customCouponDesc, setCustomCouponDesc] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const currentPreset = occasionPresets[giftData.occasion] || occasionPresets.birthday;

  // Change occasion preset
  const handleSelectOccasion = (type: OccasionType) => {
    const preset = occasionPresets[type];
    onChange({
      ...giftData,
      occasion: type,
      greetingTitle: preset.defaultGreeting,
      storyMessages: preset.defaultStory,
      closingSignature: preset.defaultClosing,
      selectedCoupons: preset.coupons.slice(0, 3),
    });
  };

  // Toggle coupon
  const handleToggleCoupon = (coupon: typeof currentPreset.coupons[0]) => {
    const exists = giftData.selectedCoupons.some((c) => c.id === coupon.id);
    let updated;
    if (exists) {
      if (giftData.selectedCoupons.length <= 1) return; // Keep at least 1
      updated = giftData.selectedCoupons.filter((c) => c.id !== coupon.id);
    } else {
      updated = [...giftData.selectedCoupons, coupon];
    }
    onChange({ ...giftData, selectedCoupons: updated });
  };

  // Add custom coupon
  const handleAddCustomCoupon = () => {
    if (!customCouponTitle.trim()) return;
    const newCoupon = {
      id: `custom-${Date.now()}`,
      title: customCouponTitle.trim(),
      icon: '🎁',
      description: customCouponDesc.trim() || 'Kupon spesial yang siap diwujudkan kapan pun kamu mau!',
      tag: 'Kado Khusus',
    };
    onChange({
      ...giftData,
      selectedCoupons: [...giftData.selectedCoupons, newCoupon],
    });
    setCustomCouponTitle('');
    setCustomCouponDesc('');
    setShowAddCustom(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...giftData, photoUrl: url });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#FAF7F2] text-[#4A2E2B] font-sans flex flex-col justify-between pb-28 shadow-xl">
      {/* Top Luxury Header */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#EADBCE] p-4 sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💍</span>
            <div>
              <h1 className="font-serif font-black text-sm text-[#4A2E2B] tracking-wide">
                Studio Kado Digital Romantis
              </h1>
              <p className="text-[10px] font-serif text-[#7A5C58]">
                Personalisasi kartu & kado interaktif • {platformCommerce.formattedPrice}
              </p>
            </div>
          </div>
          <button
            onClick={onPreview}
            className="px-3 py-1.5 rounded-full bg-[#FFE5D9] hover:bg-[#FFD1BA] text-[#4A2E2B] text-xs font-serif font-bold flex items-center gap-1 transition cursor-pointer border border-[#FFCAD4]"
          >
            <Eye size={12} />
            <span>Pratinjau</span>
          </button>
        </div>

        {/* Step Chips */}
        <div className="flex gap-1.5 mt-3 pt-2 border-t border-[#EADBCE]/60 overflow-x-auto text-xs font-serif font-bold scrollbar-none">
          <button
            onClick={() => setActiveSection('occasion')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeSection === 'occasion' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
            }`}
          >
            1. Momen ({currentPreset.icon})
          </button>
          <button
            onClick={() => setActiveSection('info')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeSection === 'info' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
            }`}
          >
            2. Penerima
          </button>
          <button
            onClick={() => setActiveSection('coupons')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeSection === 'coupons' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
            }`}
          >
            3. Kupon Kado ({giftData.selectedCoupons.length})
          </button>
          <button
            onClick={() => setActiveSection('letter')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeSection === 'letter' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
            }`}
          >
            4. Isi Surat
          </button>
          <button
            onClick={() => setActiveSection('media')}
            className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
              activeSection === 'media' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
            }`}
          >
            5. Foto & WA
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="p-4 flex-1 space-y-4 text-xs">
        {/* SECTION 1: OCCASION PICKER */}
        {activeSection === 'occasion' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="text-center mb-3">
              <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#FFAAA6]">
                PILIH SUASANA & MOMEN
              </span>
              <h2 className="text-lg font-serif font-black text-[#4A2E2B] mt-0.5">
                Kado Ini Ingin Kamu Persembahkan Untuk Apa?
              </h2>
              <p className="text-[11px] font-serif text-[#7A5C58] mt-1">
                Pilih salah satu momen di bawah. Teks puitis dan jenis hadiah akan menyesuaikan secara otomatis:
              </p>
            </div>

            {/* 5 Occasion Visual Cards */}
            <div className="space-y-2.5">
              {(Object.keys(occasionPresets) as OccasionType[]).map((key) => {
                const preset = occasionPresets[key];
                const isSelected = giftData.occasion === key;
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelectOccasion(key)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-white border-[#FFAAA6] shadow-md ring-2 ring-[#FFAAA6]/30'
                        : 'bg-white/70 border-[#EADBCE] hover:bg-white opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFE5D9] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                        {preset.icon}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif font-bold text-sm text-[#4A2E2B]">{preset.title}</h3>
                          <span className="text-[9px] font-serif font-bold bg-[#FAF0E6] text-[#7A5C58] px-2 py-0.2 rounded-full">
                            {preset.badge}
                          </span>
                        </div>
                        <p className="text-[10px] font-serif text-[#7A5C58] line-clamp-1 mt-0.5">
                          {preset.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'border border-[#EADBCE]'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveSection('info')}
              className="w-full mt-3 py-3 rounded-2xl bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <span>Lanjut Isi Nama Penerima ({currentPreset.title})</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* SECTION 2: RECIPIENT INFO */}
        {activeSection === 'info' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <div className="bg-[#FFF5F2] border border-[#FFCAD4] p-3 rounded-2xl text-[#7A5C58] text-[11px] font-serif leading-relaxed">
              💡 <b>Tips Romantis:</b> Masukkan nama dan panggilan manis yang biasa kamu panggil agar terasa sangat intim dan menyentuh hatinya!
            </div>

            <div>
              <label className="block font-serif font-bold text-[#4A2E2B] mb-1">Nama Penerima</label>
              <input
                type="text"
                value={giftData.recipientName}
                onChange={(e) => onChange({ ...giftData, recipientName: e.target.value })}
                placeholder="e.g. Alya Putri"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EADBCE] font-serif text-[#4A2E2B] focus:outline-[#FFAAA6]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-serif font-bold text-[#4A2E2B] mb-1">Panggilan Sayang / Julukan</label>
                <input
                  type="text"
                  value={giftData.petName}
                  onChange={(e) => onChange({ ...giftData, petName: e.target.value })}
                  placeholder="e.g. Sayanggg, Cantik"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EADBCE] font-serif text-[#4A2E2B] focus:outline-[#FFAAA6]"
                />
              </div>
              <div>
                <label className="block font-serif font-bold text-[#4A2E2B] mb-1">
                  {currentPreset.milestoneLabel || 'Tahun / Angka Ke-'}
                </label>
                <input
                  type="number"
                  value={giftData.milestoneNumber || 0}
                  onChange={(e) => onChange({ ...giftData, milestoneNumber: parseInt(e.target.value) || 0 })}
                  placeholder="21"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EADBCE] font-serif text-[#4A2E2B] focus:outline-[#FFAAA6]"
                />
              </div>
            </div>

            <div>
              <label className="block font-serif font-bold text-[#4A2E2B] mb-1">Nama Kamu (Pengirim)</label>
              <input
                type="text"
                value={giftData.senderName}
                onChange={(e) => onChange({ ...giftData, senderName: e.target.value })}
                placeholder="e.g. Rian Pratama"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EADBCE] font-serif text-[#4A2E2B] focus:outline-[#FFAAA6]"
              />
            </div>

            <button
              onClick={() => setActiveSection('coupons')}
              className="w-full mt-2 py-3 rounded-2xl bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-serif font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Lanjut Pilih Kupon Kado</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* SECTION 3: OCCASION COUPONS */}
        {activeSection === 'coupons' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-[#FFFBF5] border border-[#EADBCE] p-3 rounded-2xl text-[#7A5C58] text-[11px] font-serif leading-relaxed">
              🎟️ <b>Kado Kupon Kasih Sayang</b> adalah hadiah simpel yang bisa diklaim oleh doi kapan pun! Centang kupon yang ingin kamu berikan:
            </div>

            {/* Coupons List */}
            <div className="space-y-2">
              {currentPreset.coupons.map((coupon) => {
                const isSelected = giftData.selectedCoupons.some((c) => c.id === coupon.id);
                return (
                  <div
                    key={coupon.id}
                    onClick={() => handleToggleCoupon(coupon)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-300 shadow-2xs'
                        : 'bg-white border-[#EADBCE] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl shrink-0">{coupon.icon}</span>
                      <div className="text-left">
                        <div className="font-serif font-bold text-[#4A2E2B] text-xs">{coupon.title}</div>
                        <p className="text-[10px] font-serif text-[#7A5C58] leading-tight mt-0.5">{coupon.description}</p>
                        <span className="text-[9px] font-serif font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.2 rounded-full inline-block mt-1">
                          {coupon.tag}
                        </span>
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
            {!showAddCustom ? (
              <button
                onClick={() => setShowAddCustom(true)}
                className="w-full py-2.5 border-2 border-dashed border-[#EADBCE] hover:border-[#FFAAA6] rounded-2xl text-[#7A5C58] font-serif font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus size={14} />
                <span>Tambah Kupon Janji Custom Sendiri</span>
              </button>
            ) : (
              <div className="p-3 bg-white rounded-2xl border border-[#EADBCE] space-y-2">
                <div className="font-serif font-bold text-xs text-[#4A2E2B]">Buat Kupon Hadiah Custom</div>
                <input
                  type="text"
                  value={customCouponTitle}
                  onChange={(e) => setCustomCouponTitle(e.target.value)}
                  placeholder="e.g. Kupon Masakin Makan Malam 🍳"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-[#EADBCE] text-xs font-serif"
                />
                <input
                  type="text"
                  value={customCouponDesc}
                  onChange={(e) => setCustomCouponDesc(e.target.value)}
                  placeholder="Keterangan singkat kupon..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-[#EADBCE] text-xs font-serif"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCustomCoupon}
                    className="flex-1 py-1.5 bg-[#FFAAA6] text-[#4A2E2B] rounded-xl font-serif font-bold text-xs"
                  >
                    Simpan Kupon
                  </button>
                  <button
                    onClick={() => setShowAddCustom(false)}
                    className="px-3 py-1.5 bg-stone-100 text-stone-500 rounded-xl text-xs font-serif"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveSection('letter')}
              className="w-full mt-2 py-3 rounded-2xl bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-serif font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Lanjut Isi Surat Puitis</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* SECTION 4: POETIC LETTER */}
        {activeSection === 'letter' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div>
              <label className="block font-serif font-bold text-[#4A2E2B] mb-1">Judul Pembuka Surat</label>
              <input
                type="text"
                value={giftData.greetingTitle}
                onChange={(e) => onChange({ ...giftData, greetingTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#EADBCE] font-serif text-xs text-[#4A2E2B]"
              />
            </div>

            <div>
              <label className="block font-serif font-bold text-[#4A2E2B] mb-1">
                Baris Kalimat Puitis (Tampil satu per satu saat layar disentuh)
              </label>
              <div className="space-y-2">
                {giftData.storyMessages.map((msg, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[#7A5C58] w-4">{idx + 1}.</span>
                    <input
                      type="text"
                      value={msg}
                      onChange={(e) => {
                        const updated = [...giftData.storyMessages];
                        updated[idx] = e.target.value;
                        onChange({ ...giftData, storyMessages: updated });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#EADBCE] font-serif text-xs text-[#4A2E2B]"
                    />
                    {giftData.storyMessages.length > 1 && (
                      <button
                        onClick={() => {
                          const updated = giftData.storyMessages.filter((_, i) => i !== idx);
                          onChange({ ...giftData, storyMessages: updated });
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-500 transition cursor-pointer"
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
                    storyMessages: [...giftData.storyMessages, 'Untaian kata tulusmu di sini... ✨'],
                  })
                }
                className="w-full mt-2 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#4A2E2B] font-serif font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <Plus size={13} />
                <span>Tambah Baris Kalimat</span>
              </button>
            </div>

            <div>
              <label className="block font-serif font-bold text-[#4A2E2B] mb-1">Penutup / Tanda Tangan</label>
              <input
                type="text"
                value={giftData.closingSignature}
                onChange={(e) => onChange({ ...giftData, closingSignature: e.target.value })}
                placeholder="e.g. Dengan segenap cinta, Rian 🤍"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#EADBCE] font-serif text-xs text-[#4A2E2B]"
              />
            </div>

            <button
              onClick={() => setActiveSection('media')}
              className="w-full mt-2 py-3 rounded-2xl bg-[#FFAAA6] hover:bg-[#ff9691] text-[#4A2E2B] font-serif font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Lanjut Foto & WhatsApp</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* SECTION 5: PHOTO & WHATSAPP */}
        {activeSection === 'media' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            {/* Photo Selection */}
            <div>
              <label className="block font-serif font-bold text-[#4A2E2B] mb-1">Foto Kenangan Spesial (Opsional)</label>
              <div className="p-3 bg-white rounded-2xl border border-[#EADBCE] flex items-center gap-3">
                <img
                  src={giftData.photoUrl || '/cake.jpg'}
                  alt="Preview"
                  className="w-16 h-16 rounded-xl object-cover border border-stone-100 shrink-0"
                />
                <div className="flex-1 min-w-0 text-left">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-[#FFE5D9] hover:bg-[#FFD1BA] text-[#4A2E2B] font-serif font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Camera size={13} />
                    <span>Pilih Foto dari HP</span>
                  </button>
                  <p className="text-[10px] font-serif text-stone-400 mt-1 truncate">Foto ini akan tampil manis di kartu polaroid.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-serif font-bold text-[#4A2E2B] mb-1">Caption Foto</label>
              <input
                type="text"
                value={giftData.photoCaption || ''}
                onChange={(e) => onChange({ ...giftData, photoCaption: e.target.value })}
                placeholder="e.g. Senyum manismu yang selalu membawa keceriaan ✨"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EADBCE] font-serif text-xs"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="pt-2 border-t border-[#EADBCE]">
              <label className="block font-serif font-bold text-[#4A2E2B] mb-1">
                Nomor WhatsApp Kamu (Untuk Menerima Balasan & Klaim Kupon)
              </label>
              <input
                type="text"
                value={giftData.senderWhatsApp || ''}
                onChange={(e) => onChange({ ...giftData, senderWhatsApp: e.target.value })}
                placeholder="628123456789 (awali dengan 62)"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EADBCE] font-serif text-xs"
              />
              <p className="text-[10px] font-serif text-[#7A5C58] mt-1 leading-tight">
                Penerima kado bisa langsung membalas ucapan dan mengklaim kupon ke nomor WhatsApp ini hanya dengan 1 kali klik.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-3.5 bg-white/95 backdrop-blur-md border-t border-[#EADBCE] flex gap-2 z-40">
        <button
          onClick={onPreview}
          className="flex-1 py-3 px-3 rounded-2xl bg-[#FAF0E6] hover:bg-[#F3E3D3] text-[#4A2E2B] font-serif font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#EADBCE]"
        >
          <Eye size={14} />
          <span>Uji Coba Pratinjau</span>
        </button>

        <button
          onClick={onCheckout}
          className="flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer"
        >
          <Sparkles size={14} />
          <span>Bungkus Kado ({platformCommerce.formattedPrice}) ✨</span>
        </button>
      </div>
    </div>
  );
};
