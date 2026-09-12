import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Check, Copy, Sliders, Download, Sparkles, Plus, Trash2 } from 'lucide-react';
import { BirthdayConfig, defaultBirthdayConfig } from '../../config/birthday.config';

interface LiveCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSaveConfig: (newConfig: BirthdayConfig) => void;
}

export const LiveCustomizerModal: React.FC<LiveCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'gifts' | 'whatsapp'>('general');
  const [form, setForm] = useState<BirthdayConfig>({ ...config });
  const [copied, setCopied] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);

  React.useEffect(() => {
    setForm({ ...config });
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig(form);
    localStorage.setItem('custom_birthday_config', JSON.stringify(form));
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setForm({ ...defaultBirthdayConfig });
    localStorage.removeItem('custom_birthday_config');
  };

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    params.set('to', form.recipientName);
    params.set('pet', form.petName);
    params.set('age', form.age.toString());
    params.set('from', form.senderName);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(form, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "birthday.config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleStoryMessageChange = (index: number, val: string) => {
    const updated = [...form.letter.storyMessages];
    updated[index] = val;
    setForm({
      ...form,
      letter: {
        ...form.letter,
        storyMessages: updated,
      },
    });
  };

  const handleAddStoryMessage = () => {
    setForm({
      ...form,
      letter: {
        ...form.letter,
        storyMessages: [...form.letter.storyMessages, "Tulis baris pesan indahmu di sini... ✨"],
      },
    });
  };

  const handleRemoveStoryMessage = (index: number) => {
    const updated = form.letter.storyMessages.filter((_, i) => i !== index);
    setForm({
      ...form,
      letter: {
        ...form.letter,
        storyMessages: updated,
      },
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-xl bg-[#FFFDF9] border border-white/90 rounded-3xl shadow-2xl p-5 sm:p-7 z-10 max-h-[92vh] flex flex-col text-left overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFE5D9] flex items-center justify-center text-[#4A2E2B]">
                <Sliders size={16} />
              </div>
              <div>
                <h3 className="font-serif font-black text-base sm:text-lg text-[#4A2E2B]">
                  Kustomisasi Template ✨
                </h3>
                <p className="text-[11px] text-[#7A5C58] font-serif">
                  Ubah data website sesuai keinginanmu secara instan
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 border-b border-stone-200/70 pt-2 pb-1 overflow-x-auto text-xs font-serif font-bold">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
                activeTab === 'general' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
              }`}
            >
              Info Utama
            </button>
            <button
              onClick={() => setActiveTab('letter')}
              className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
                activeTab === 'letter' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
              }`}
            >
              Isi Surat ({form.letter.storyMessages.length})
            </button>
            <button
              onClick={() => setActiveTab('gifts')}
              className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
                activeTab === 'gifts' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
              }`}
            >
              Kado & Video
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-3 py-1.5 rounded-full transition cursor-pointer shrink-0 ${
                activeTab === 'whatsapp' ? 'bg-[#FFAAA6] text-[#4A2E2B]' : 'text-[#7A5C58] hover:bg-stone-100'
              }`}
            >
              WhatsApp
            </button>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs font-serif pr-1">
            {/* TAB 1: GENERAL */}
            {activeTab === 'general' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#4A2E2B] mb-1">Nama Penerima</label>
                    <input
                      type="text"
                      value={form.recipientName}
                      onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                      placeholder="e.g. Sarah"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#4A2E2B] mb-1">Panggilan Sayang / Julukan</label>
                    <input
                      type="text"
                      value={form.petName}
                      onChange={(e) => setForm({ ...form, petName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                      placeholder="e.g. Sayanggg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#4A2E2B] mb-1">Usia / Ulang Tahun Ke-</label>
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#4A2E2B] mb-1">Nama Pengirim</label>
                    <input
                      type="text"
                      value={form.senderName}
                      onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                      placeholder="e.g. Dimas"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Ucapan Utama di Atas Kue</label>
                  <input
                    type="text"
                    value={form.celebration.greeting}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        celebration: { ...form.celebration, greeting: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">Sub-Ucapan</label>
                  <textarea
                    rows={2}
                    value={form.celebration.subGreeting}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        celebration: { ...form.celebration, subGreeting: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: LETTER */}
            {activeTab === 'letter' && (
              <div className="space-y-3">
                <p className="text-[11px] text-[#7A5C58]">
                  Setiap kalimat di bawah akan ditampilkan satu per satu dengan animasi kinetik halus saat layar disentuh.
                </p>

                <div className="space-y-2">
                  {form.letter.storyMessages.map((msg, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-stone-400 w-5 shrink-0 text-right">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        value={msg}
                        onChange={(e) => handleStoryMessageChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-[#4A2E2B] text-xs"
                      />
                      <button
                        onClick={() => handleRemoveStoryMessage(idx)}
                        className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg transition"
                        title="Hapus baris ini"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddStoryMessage}
                  className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#4A2E2B] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Tambah Baris Surat</span>
                </button>
              </div>
            )}

            {/* TAB 3: GIFTS */}
            {activeTab === 'gifts' && (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">
                    Link Video Kenangan (YouTube / File Video)
                  </label>
                  <input
                    type="text"
                    value={form.gifts.videoMessage.videoUrl}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        gifts: {
                          ...form.gifts,
                          videoMessage: { ...form.gifts.videoMessage, videoUrl: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                    placeholder="https://youtu.be/..."
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    Bisa berupa link YouTube atau file mp4 di folder public.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">
                    Hadiah Tambahan / Tautan Rahasia
                  </label>
                  <input
                    type="text"
                    value={form.gifts.surpriseLink.url}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        gifts: {
                          ...form.gifts,
                          surpriseLink: { ...form.gifts.surpriseLink, url: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                    placeholder="https://..."
                  />
                </div>
              </div>
            )}

            {/* TAB 4: WHATSAPP */}
            {activeTab === 'whatsapp' && (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">
                    Nomor WhatsApp Pengirim (Opsional)
                  </label>
                  <input
                    type="text"
                    value={form.whatsapp.phoneNumber || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        whatsapp: { ...form.whatsapp, phoneNumber: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                    placeholder="628123456789 (kosongkan jika tanpa nomor spesifik)"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#4A2E2B] mb-1">
                    Pesan Balasan WhatsApp Otomatis
                  </label>
                  <textarea
                    rows={3}
                    value={form.whatsapp.messageTemplate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        whatsapp: { ...form.whatsapp, messageTemplate: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-[#FFAAA6] text-[#4A2E2B]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Share Links & Actions */}
          <div className="pt-3 border-t border-stone-200/70 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2 px-3 rounded-full bg-stone-100 hover:bg-stone-200 text-[#4A2E2B] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copied ? 'Tersalin!' : 'Salin Link Instan (?to=...)'}</span>
              </button>

              <button
                onClick={handleDownloadJSON}
                className="py-2 px-3 rounded-full bg-stone-100 hover:bg-stone-200 text-[#4A2E2B] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                title="Unduh file JSON konfigurasi"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Unduh JSON</span>
              </button>

              <button
                onClick={handleReset}
                className="py-2 px-3 rounded-full bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-500 text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                title="Reset ke pengaturan awal"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-full cohesive-pill-btn text-xs font-serif font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer text-[#4A2E2B]"
            >
              {savedStatus ? <Check size={16} /> : <Sparkles size={16} />}
              <span>{savedStatus ? 'Tersimpan!' : 'Terapkan & Simpan Perubahan ✨'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
