import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Smartphone, Monitor, Share2, Copy, Check, MessageCircle, X, Plus, Trash2, Camera } from 'lucide-react';
import { GiftExperience, OccasionType, ThemeVibe } from '../../types/gift';
import { defaultGiftExperiences, themePresets } from '../../config/presets';
import { GiftCanvas } from '../canvas/GiftCanvas';
import { encodeGiftData } from '../../utils/codec';

interface StudioEditorProps {
  gift: GiftExperience;
  onChange: (updated: GiftExperience) => void;
  onGoToLanding: () => void;
  onPreviewFullscreen?: () => void;
}

export const StudioEditor: React.FC<StudioEditorProps> = ({
  gift,
  onChange,
  onGoToLanding,
  onPreviewFullscreen,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'letter' | 'moment' | 'photos' | 'atmosphere'>('details');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Switch Occasion Preset
  const handleSelectOccasion = (type: OccasionType) => {
    const preset = defaultGiftExperiences[type];
    onChange({
      ...preset,
      recipientName: gift.recipientName || preset.recipientName,
      senderName: gift.senderName || preset.senderName,
      petName: gift.petName || preset.petName,
    });
  };

  // Switch Theme Preset
  const handleSelectTheme = (themeKey: ThemeVibe) => {
    onChange({ ...gift, theme: themeKey });
  };

  // Add / remove letter paragraphs
  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...gift.letterParagraphs];
    updated[index] = val;
    onChange({ ...gift, letterParagraphs: updated });
  };

  const handleAddParagraph = () => {
    onChange({
      ...gift,
      letterParagraphs: [...gift.letterParagraphs, 'Tuliskan baris ketulusanmu di sini... ✨'],
    });
  };

  const handleRemoveParagraph = (index: number) => {
    if (gift.letterParagraphs.length <= 1) return;
    const updated = gift.letterParagraphs.filter((_, i) => i !== index);
    onChange({ ...gift, letterParagraphs: updated });
  };

  // Handle local photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPhoto = {
        id: `photo-${Date.now()}`,
        url,
        caption: 'Momen berharga yang selalu kusimpan dalam hati ✨',
        date: 'Kenangan Manis',
      };
      onChange({ ...gift, photos: [...gift.photos, newPhoto] });
    }
  };

  const handleRemovePhoto = (id: string) => {
    onChange({
      ...gift,
      photos: gift.photos.filter((p) => p.id !== id),
    });
  };

  // Share URL generation
  const encodedPayload = encodeGiftData(gift as any);
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const shareableUrl = `${baseUrl}?gift=${encodedPayload}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSendToWhatsApp = () => {
    const text = `Hai ${gift.recipientName}! ✨ Ada kado dan surat digital istimewa yang kubuat khusus untukmu. Buka sekarang yaa: \n\n${shareableUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full h-screen bg-[#F7F4EE] text-[#4A2E2B] flex flex-col overflow-hidden font-sans">
      {/* 1. TOP STUDIO NAVBAR */}
      <header className="w-full h-15 bg-white border-b border-[#EADBCE] px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoToLanding}
            className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer"
            title="Kembali ke Beranda"
          >
            <span className="text-xl">🎁</span>
            <span className="font-serif font-black text-base tracking-tight text-[#3A1E1C]">
              KadoKasih <span className="font-sans text-xs font-bold text-[#FFAAA6]">Studio</span>
            </span>
          </button>

          <div className="h-4 w-[1px] bg-stone-300 mx-1 hidden sm:block" />

          {/* Occasion Switcher Selector */}
          <select
            value={gift.occasion}
            onChange={(e) => handleSelectOccasion(e.target.value as OccasionType)}
            className="bg-[#FAF3EC] border border-[#EADBCE] text-[#4A2E2B] text-xs font-serif font-bold py-1.5 px-3 rounded-full cursor-pointer focus:outline-[#FFAAA6]"
          >
            <option value="birthday">🎂 Ulang Tahun</option>
            <option value="anniversary">💍 Anniversary</option>
            <option value="apology">🕊️ Permintaan Maaf</option>
            <option value="gratitude">💐 Terima Kasih</option>
            <option value="surprise">✨ Kejutan Manis</option>
          </select>
        </div>

        {/* Center: Device Viewport Toggle (Desktop vs Mobile) */}
        <div className="hidden md:flex items-center gap-1 bg-[#FAF3EC] p-1 rounded-full border border-[#EADBCE]">
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`px-3 py-1 rounded-full text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer ${
              previewDevice === 'mobile' ? 'bg-white shadow-2xs text-[#4A2E2B]' : 'text-[#7A5C58] hover:text-[#4A2E2B]'
            }`}
          >
            <Smartphone size={13} />
            <span>Ponsel (HP)</span>
          </button>
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`px-3 py-1 rounded-full text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer ${
              previewDevice === 'desktop' ? 'bg-white shadow-2xs text-[#4A2E2B]' : 'text-[#7A5C58] hover:text-[#4A2E2B]'
            }`}
          >
            <Monitor size={13} />
            <span>Desktop</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {onPreviewFullscreen && (
            <button
              onClick={onPreviewFullscreen}
              className="py-2 px-3 rounded-full bg-[#FAF3EC] border border-[#EADBCE] text-[#4A2E2B] font-serif font-bold text-xs flex items-center gap-1.5 hover:bg-[#F2E5D8] transition cursor-pointer"
              title="Lihat Pengalaman Penerima Layar Penuh"
            >
              <Eye size={13} />
              <span className="hidden sm:inline">Pratinjau Penuh</span>
            </button>
          )}

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="py-2 px-4 rounded-full bg-gradient-to-r from-[#FFB7B2] to-[#FFAAA6] text-[#4A2E2B] font-serif font-bold text-xs flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <Share2 size={14} />
            <span>Bagikan Kado 💌</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN SPLIT SCREEN WORKSPACE */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT PANEL: CONTROLS & PERSONALIZATION */}
        <div className="w-full md:w-[420px] bg-white border-r border-[#EADBCE] flex flex-col h-full shrink-0 shadow-xs z-20">
          {/* Subtabs */}
          <div className="flex border-b border-[#EADBCE] px-3 pt-3 gap-1 overflow-x-auto text-xs font-serif font-bold scrollbar-none shrink-0 bg-[#FCFAF7]">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-2 rounded-t-xl transition cursor-pointer shrink-0 ${
                activeTab === 'details' ? 'bg-white text-[#4A2E2B] border-t border-x border-[#EADBCE]' : 'text-[#7A5C58] hover:text-[#4A2E2B]'
              }`}
            >
              1. Detail
            </button>
            <button
              onClick={() => setActiveTab('letter')}
              className={`px-3 py-2 rounded-t-xl transition cursor-pointer shrink-0 ${
                activeTab === 'letter' ? 'bg-white text-[#4A2E2B] border-t border-x border-[#EADBCE]' : 'text-[#7A5C58] hover:text-[#4A2E2B]'
              }`}
            >
              2. Surat
            </button>
            <button
              onClick={() => setActiveTab('moment')}
              className={`px-3 py-2 rounded-t-xl transition cursor-pointer shrink-0 ${
                activeTab === 'moment' ? 'bg-white text-[#4A2E2B] border-t border-x border-[#EADBCE]' : 'text-[#7A5C58] hover:text-[#4A2E2B]'
              }`}
            >
              3. Momen
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3 py-2 rounded-t-xl transition cursor-pointer shrink-0 ${
                activeTab === 'photos' ? 'bg-white text-[#4A2E2B] border-t border-x border-[#EADBCE]' : 'text-[#7A5C58] hover:text-[#4A2E2B]'
              }`}
            >
              4. Foto ({gift.photos.length})
            </button>
            <button
              onClick={() => setActiveTab('atmosphere')}
              className={`px-3 py-2 rounded-t-xl transition cursor-pointer shrink-0 ${
                activeTab === 'atmosphere' ? 'bg-white text-[#4A2E2B] border-t border-x border-[#EADBCE]' : 'text-[#7A5C58] hover:text-[#4A2E2B]'
              }`}
            >
              5. Tema
            </button>
          </div>

          {/* Tab Content Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-serif">
            {/* TAB 1: DETAILS */}
            {activeTab === 'details' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Nama Penerima Kado</label>
                  <input
                    type="text"
                    value={gift.recipientName}
                    onChange={(e) => onChange({ ...gift, recipientName: e.target.value })}
                    placeholder="e.g. Si Manis / Kekasih Hatiku"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B] focus:outline-[#FFAAA6]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#4A2E2B] mb-1">Panggilan Sayang</label>
                    <input
                      type="text"
                      value={gift.petName}
                      onChange={(e) => onChange({ ...gift, petName: e.target.value })}
                      placeholder="e.g. Sayangku, Teman Hidupku"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B] focus:outline-[#FFAAA6]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#4A2E2B] mb-1">Nama Kamu (Pengirim)</label>
                    <input
                      type="text"
                      value={gift.senderName}
                      onChange={(e) => onChange({ ...gift, senderName: e.target.value })}
                      placeholder="e.g. Namamu / Seseorang yang Menyayangimu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B] focus:outline-[#FFAAA6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Judul Sampul Amplop</label>
                  <input
                    type="text"
                    value={gift.coverTitle}
                    onChange={(e) => onChange({ ...gift, coverTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B] focus:outline-[#FFAAA6]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Sub-judul Sampul</label>
                  <textarea
                    rows={2}
                    value={gift.coverSubtitle}
                    onChange={(e) => onChange({ ...gift, coverSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B] focus:outline-[#FFAAA6]"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: LETTER */}
            {activeTab === 'letter' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Judul Surat</label>
                  <input
                    type="text"
                    value={gift.letterTitle}
                    onChange={(e) => onChange({ ...gift, letterTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Paragraf Surat</label>
                  <div className="space-y-2">
                    {gift.letterParagraphs.map((p, idx) => (
                      <div key={idx} className="relative">
                        <textarea
                          rows={3}
                          value={p}
                          onChange={(e) => handleParagraphChange(idx, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B] text-xs pr-8"
                        />
                        {gift.letterParagraphs.length > 1 && (
                          <button
                            onClick={() => handleRemoveParagraph(idx)}
                            className="absolute top-2 right-2 p-1 text-stone-400 hover:text-rose-500 transition cursor-pointer"
                            title="Hapus paragraf ini"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleAddParagraph}
                    className="w-full mt-2 py-2 rounded-xl bg-[#FAF3EC] hover:bg-[#F3E7D9] text-[#4A2E2B] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Tambah Paragraf Surat</span>
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Tanda Tangan / Penutup</label>
                  <input
                    type="text"
                    value={gift.letterClosing}
                    onChange={(e) => onChange({ ...gift, letterClosing: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B]"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: INTERACTIVE MOMENT */}
            {activeTab === 'moment' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Tipe Momen Interaktif</label>
                  <select
                    value={gift.momentType}
                    onChange={(e) => onChange({ ...gift, momentType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B] font-bold"
                  >
                    <option value="cake">🎂 Tiup Lilin Ulang Tahun & Permohonan</option>
                    <option value="milestone">💍 Milestone Penghitung Hari Cinta</option>
                    <option value="scratch">✨ Kartu Buka Pesan Rahasia</option>
                    <option value="bouquet">💐 Buket Apresiasi & Terima Kasih</option>
                  </select>
                </div>

                {gift.momentType === 'scratch' && (
                  <div>
                    <label className="block font-bold text-[#4A2E2B] mb-1">Pesan Rahasia Tersembunyi</label>
                    <textarea
                      rows={3}
                      value={gift.secretMessage || ''}
                      onChange={(e) => onChange({ ...gift, secretMessage: e.target.value })}
                      placeholder="Tuliskan rahasia atau janji yang hanya bisa dibaca saat kartu disentuh..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B]"
                    />
                  </div>
                )}

                {gift.momentType === 'milestone' && (
                  <div>
                    <label className="block font-bold text-[#4A2E2B] mb-1">Jumlah Tahun / Milestone</label>
                    <input
                      type="number"
                      value={gift.milestoneNumber || 1}
                      onChange={(e) => onChange({ ...gift, milestoneNumber: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B]"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Keterangan / Instruksi</label>
                  <input
                    type="text"
                    value={gift.momentDescription || ''}
                    onChange={(e) => onChange({ ...gift, momentDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: PHOTOS */}
            {activeTab === 'photos' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#4A2E2B]">Galeri Foto Kenangan</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-full bg-[#FFE5D9] hover:bg-[#FFD1BA] text-[#4A2E2B] font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <Camera size={13} />
                    <span>Upload Foto</span>
                  </button>
                </div>

                {gift.photos.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-[#EADBCE] rounded-2xl text-[#7A5C58]">
                    <p className="text-xs">Belum ada foto kenangan.</p>
                    <p className="text-[10px] text-stone-400 mt-1">Tambahkan 1-4 foto momen terbaik kalian!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {gift.photos.map((photo, idx) => (
                      <div key={photo.id || idx} className="p-3 bg-[#FCFAF7] rounded-xl border border-[#EADBCE] flex items-center gap-3">
                        <img src={photo.url} alt="Thumbnail" className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200" />
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={photo.caption}
                            onChange={(e) => {
                              const updated = [...gift.photos];
                              updated[idx] = { ...updated[idx], caption: e.target.value };
                              onChange({ ...gift, photos: updated });
                            }}
                            className="w-full px-2 py-1 bg-white border border-[#EADBCE] rounded-lg text-xs"
                            placeholder="Caption foto..."
                          />
                        </div>
                        <button
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-500 transition cursor-pointer shrink-0"
                          title="Hapus foto"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: ATMOSPHERE & THEME */}
            {activeTab === 'atmosphere' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-2">Pilih Nuansa Estetika (Theme)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(themePresets) as ThemeVibe[]).map((themeKey) => {
                      const t = themePresets[themeKey];
                      const isSelected = gift.theme === themeKey;
                      return (
                        <div
                          key={themeKey}
                          onClick={() => handleSelectTheme(themeKey)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-20 ${
                            isSelected ? 'bg-white border-[#FFAAA6] shadow-sm ring-2 ring-[#FFAAA6]/30' : 'bg-white/60 border-[#EADBCE] opacity-80'
                          }`}
                        >
                          <span className="font-bold text-xs text-[#4A2E2B]">{t.name}</span>
                          <div className="flex gap-1 mt-2">
                            <span className="w-4 h-4 rounded-full border border-stone-200" style={{ backgroundColor: t.accent }} />
                            <span className="w-4 h-4 rounded-full border border-stone-200" style={{ backgroundColor: t.gold }} />
                            <span className="w-4 h-4 rounded-full border border-stone-200" style={{ backgroundColor: t.textPrimary }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EADBCE]">
                  <label className="block font-bold text-[#4A2E2B] mb-1">Nomor WhatsApp Kamu (Untuk Menerima Balasan)</label>
                  <input
                    type="text"
                    value={gift.senderWhatsApp || ''}
                    onChange={(e) => onChange({ ...gift, senderWhatsApp: e.target.value })}
                    placeholder="628123456789"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#EADBCE] text-[#4A2E2B]"
                  />
                  <p className="text-[10px] text-[#7A5C58] mt-1 leading-relaxed">
                    Saat penerima mengklik tombol balasan di akhir halaman, pesan terima kasih akan otomatis terkirim ke WhatsApp ini.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: LIVE INTERACTIVE PREVIEW */}
        <div className="flex-1 bg-[#EBE7DF] overflow-y-auto flex items-center justify-center p-4 sm:p-8 relative">
          <div
            className={`transition-all duration-300 shadow-2xl rounded-3xl overflow-hidden border-4 border-stone-800 ${
              previewDevice === 'mobile' ? 'w-full max-w-[390px] h-[780px]' : 'w-full max-w-[950px] h-[820px]'
            }`}
          >
            <div className="w-full h-full overflow-y-auto">
              <GiftCanvas gift={gift} isStandalone={false} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. SHARE & EXPORT MODAL */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              className="relative w-full max-w-sm bg-[#FCFAF7] rounded-3xl shadow-2xl p-6 z-10 border border-[#EADBCE] text-center space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#EADBCE]">
                <h3 className="font-serif font-black text-sm text-[#4A2E2B]">Bagikan Kado Digital ✨</h3>
                <button onClick={() => setIsShareModalOpen(false)} className="w-7 h-7 rounded-full bg-white border border-[#EADBCE] flex items-center justify-center text-stone-500">
                  <X size={14} />
                </button>
              </div>

              <div className="w-14 h-14 rounded-full bg-[#FFE5D9] flex items-center justify-center text-2xl mx-auto">
                💌
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#4A2E2B]">Tautan Kado Siap Dikirim!</h4>
                <p className="text-xs font-serif text-[#7A5C58] mt-0.5">
                  Tautan ini berisi seluruh kado untuk <b>{gift.recipientName}</b> dan aktif selamanya.
                </p>
              </div>

              {/* Link Copier */}
              <div className="p-3 bg-white rounded-2xl border border-[#EADBCE] flex flex-col gap-2">
                <div className="text-[10px] font-mono text-stone-600 truncate bg-stone-50 p-2 rounded-xl text-left">
                  {shareableUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 rounded-xl bg-[#FFE5D9] hover:bg-[#FFD1BA] text-[#4A2E2B] font-serif font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                  <span>{copied ? 'Tautan Tersalin!' : 'Salin Tautan Kado'}</span>
                </button>
              </div>

              {/* Share to WhatsApp */}
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 rounded-full bg-[#34A853] hover:bg-[#2E9749] text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Kirim Langsung ke WhatsApp Doi 💌</span>
              </button>

              {/* QR Code */}
              <div className="p-3 bg-[#FAF3EC] border border-[#EADBCE] rounded-2xl flex items-center gap-3 text-left">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(shareableUrl)}`}
                  alt="QR Code"
                  className="w-12 h-12 rounded-lg border border-[#EADBCE] bg-white p-1 shrink-0"
                />
                <div className="text-[10px] font-serif text-[#5D3A36] leading-tight">
                  <span className="font-bold block mb-0.5">Kartu QR Code Digital 📲</span>
                  Screenshot QR code ini untuk dicetak atau ditempel di kado fisikmu!
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
