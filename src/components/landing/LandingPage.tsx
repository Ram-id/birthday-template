import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Gift,
  Flame,
  Send,
  Music,
  Camera,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronDown,
  Smile,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { GiftExperience, OccasionType } from '../../types/gift';
import { defaultGiftExperiences } from '../../config/presets';

interface LandingPageProps {
  onStartStudio: (preset: GiftExperience) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartStudio }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [previewTab, setPreviewTab] = useState<'envelope' | 'letter' | 'moment'>('envelope');

  const templatesList: {
    type: OccasionType;
    title: string;
    tagline: string;
    badge: string;
    gradient: string;
    icon: any;
    features: string[];
    accentColor: string;
  }[] = [
    {
      type: 'birthday',
      title: 'Ulang Tahun (Birthday)',
      tagline: 'Kue ulang tahun virtual dengan lilin yang bisa ditiup, taburan konfeti, dan doa tulus.',
      badge: 'Paling Populer 🔥',
      gradient: 'from-[#FDFBF7] via-[#FFF1E6] to-[#FED7D7]',
      icon: Flame,
      accentColor: '#D97706',
      features: ['Tiup Lilin Real-time', 'Efek Suara Tiupan & Suasana', 'Surat Panjang Editorial'],
    },
    {
      type: 'anniversary',
      title: 'Anniversary & Jadian',
      tagline: 'Kilas balik perjalanan cinta, penghitung hari kebersamaan, dan janji suci masa depan.',
      badge: 'Romantis Abadi ✨',
      gradient: 'from-[#FFFDF9] via-[#FAF5EE] to-[#FCE7F3]',
      icon: Heart,
      accentColor: '#BE185D',
      features: ['Milestone Hari Bersama', 'Galeri Foto Kenangan', 'Tema Champagne Emas'],
    },
    {
      type: 'apology',
      title: 'Permintaan Maaf (Apology)',
      tagline: 'Sampaikan rasa penyesalan dan ketulusan hati dengan kartu rahasia scratch-to-reveal.',
      badge: 'Menyentuh Hati 🥺',
      gradient: 'from-[#F9FAF8] via-[#F1F5F9] to-[#E2E8F0]',
      icon: Smile,
      accentColor: '#475569',
      features: ['Kartu Gosok Rahasia', 'Pesan Penyejuk Hati', 'Aksen Lembut & Hangat'],
    },
    {
      type: 'gratitude',
      title: 'Ungkapan Terima Kasih',
      tagline: 'Apresiasi mendalam untuk sahabat, rekan kerja, atau orang tua dengan buket virtual mekar.',
      badge: 'Bermakna 💐',
      gradient: 'from-[#F9FAF8] via-[#F0FDF4] to-[#DCFCE7]',
      icon: Gift,
      accentColor: '#15803D',
      features: ['Buket Bunga Mekar', 'Surat Apresiasi Tulus', 'Foto Kenangan Sahabat'],
    },
    {
      type: 'surprise',
      title: 'Kejutan Romantis (Surprise)',
      tagline: 'Ajakan kencan rahasia yang dibuka dengan sekali ketuk, lagu romantis, dan pesan spontan.',
      badge: 'Penuh Kejutan 💫',
      gradient: 'from-[#FFFDF9] via-[#FEF3C7] to-[#FDE68A]',
      icon: Sparkles,
      accentColor: '#B45309',
      features: ['Tiket Kencan Rahasia', 'Musik Latar Romantis', 'Respon Instan ke WhatsApp'],
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'Surat Bergaya Editorial Klasik',
      desc: 'Tipografi anggun layaknya buku puisi cinta, dengan efek teks berjalan dan kertas bertekstur mewah.',
    },
    {
      icon: Flame,
      title: 'Momen Interaktif Real-time',
      desc: 'Bukan gambar mati. Lilin bisa dinyalakan dan ditiup, kartu rahasia bisa digosok menggunakan jari atau mouse.',
    },
    {
      icon: Camera,
      title: 'Galeri Foto Kenangan Polaroid',
      desc: 'Tampilkan momen-momen manis kalian berdua berbingkai polaroid yang bisa diklik untuk memperbesar kenangan.',
    },
    {
      icon: Music,
      title: 'Lagu Latar & Soundscape Halus',
      desc: 'Disertai alunan musik romantis dan efek denting kristal saat amplop lilin dibuka untuk pertama kalinya.',
    },
    {
      icon: Send,
      title: 'Balas Langsung ke WhatsApp',
      desc: 'Penerima cukup klik satu tombol di bagian akhir untuk mengirimkan pesan haru dan bahagia ke nomor WhatsApp-mu.',
    },
    {
      icon: ShieldCheck,
      title: 'Tanpa Download Aplikasi & Instan',
      desc: 'Cukup bagikan tautan privat. Kado digital langsung terbuka dengan mulus di Safari, Chrome, atau browser apa pun.',
    },
  ];

  const faqs = [
    {
      q: 'Apakah pasangan atau orang terkasih perlu mengunduh aplikasi untuk membuka kado?',
      a: 'Sama sekali tidak! Kado tersimpan secara cerdas dalam sebuah tautan privat. Pasanganmu cukup membuka tautan tersebut di peramban (browser) ponsel atau laptopnya, dan kado langsung terbuka dengan anggun.',
    },
    {
      q: 'Apakah saya bisa mengganti tulisan surat, foto, dan lagu sesuka hati?',
      a: 'Tentu saja! Melalui Studio Editor kami yang praktis, Anda bisa mengubah nama panggilan, mengetik surat dari lubuk hati, mengunggah foto-foto kenangan, mengganti tema warna, hingga memasukkan nomor WhatsApp Anda.',
    },
    {
      q: 'Apakah kado ini aman dan privat?',
      a: 'Ya, seluruh data dan kenanganmu dienkripsi secara langsung ke dalam URL tautan kado. Kado hanya bisa dibuka oleh orang yang memegang tautan tersebut.',
    },
    {
      q: 'Bisa dibuka di perangkat apa saja?',
      a: 'Bisa dibuka di semua perangkat! Baik itu iPhone, Android, iPad, tablet, maupun laptop Windows dan Mac. Tampilan akan otomatis menyesuaikan diri secara sempurna.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#33221E] font-sans antialiased selection:bg-[#F2C2B8] selection:text-[#33221E]">
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#EBDCCF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8A3324] text-white flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 fill-current text-white" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#3A1E1C]">
                KadoKasih<span className="text-[#8A3324]">.id</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#6F514D]">
            <a href="#templates" className="hover:text-[#8A3324] transition-colors">
              Pilihan Template
            </a>
            <a href="#features" className="hover:text-[#8A3324] transition-colors">
              Fitur Kado
            </a>
            <a href="#how-it-works" className="hover:text-[#8A3324] transition-colors">
              Cara Kerja
            </a>
            <a href="#faq" className="hover:text-[#8A3324] transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onStartStudio(defaultGiftExperiences['birthday'])}
              className="px-4 py-2 rounded-full bg-[#8A3324] hover:bg-[#722A1E] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow transition-all flex items-center space-x-1.5"
            >
              <span>Buka Studio Kado</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6">
        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#FCE8E2] via-[#F5D5CE] to-transparent rounded-full blur-3xl opacity-70 pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#EBDCCF] shadow-sm mb-6 text-xs sm:text-sm text-[#8A3324] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8A3324]" />
            <span>Platform Kado Digital Interaktif Paling Berkesan</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.2] text-[#2C1816] tracking-tight mb-6"
          >
            Bukan Sekadar Pesan Chat Biasa.{' '}
            <span className="italic font-light block sm:inline text-[#8A3324]">
              Abadikan Cinta & Kenangan
            </span>{' '}
            dalam Kado Digital Interaktif.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-[#6B534F] max-w-2xl mx-auto font-light leading-relaxed mb-10"
          >
            Rancang surat editorial estetik, galeri foto polaroid kenangan, momen tiup lilin interaktif,
            dan kejutan rahasia untuk pasangan, sahabat, atau orang tuamu dalam hitungan menit.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => onStartStudio(defaultGiftExperiences['birthday'])}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#8A3324] hover:bg-[#73291D] text-white text-base font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2.5 group"
            >
              <span>Mulai Rancang Kado Gratis</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#templates"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-[#F3ECE6] text-[#4A2E2B] border border-[#E0D0C3] text-base font-medium transition-all text-center"
            >
              Lihat 5 Pilihan Momen 💌
            </a>
          </motion.div>

          {/* Trust Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#7F6663]">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A3324]" />
              <span>100% Interaktif & Audio Realtime</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A3324]" />
              <span>Tanpa Unduh Aplikasi (Buka via Link)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A3324]" />
              <span>Responsif HP, Tablet, & Laptop</span>
            </div>
          </div>
        </div>

        {/* 3. HERO INTERACTIVE SHOWCASE CARD */}
        <div className="max-w-3xl mx-auto mt-14 bg-white/95 rounded-3xl p-4 sm:p-7 border border-[#EBDCCF] shadow-xl shadow-[#4A2E2B]/5">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E6DD] text-xs sm:text-sm">
            <span className="font-serif italic text-[#8A3324] font-medium flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pratinjau Pengalaman Digital Penerima</span>
            </span>
            <div className="flex items-center space-x-1 bg-[#FAF6F1] p-1 rounded-full border border-[#EAE0D5]">
              <button
                onClick={() => setPreviewTab('envelope')}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  previewTab === 'envelope' ? 'bg-[#8A3324] text-white font-medium shadow-xs' : 'text-[#6D534F]'
                }`}
              >
                1. Amplop Lilin
              </button>
              <button
                onClick={() => setPreviewTab('letter')}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  previewTab === 'letter' ? 'bg-[#8A3324] text-white font-medium shadow-xs' : 'text-[#6D534F]'
                }`}
              >
                2. Surat & Foto
              </button>
              <button
                onClick={() => setPreviewTab('moment')}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  previewTab === 'moment' ? 'bg-[#8A3324] text-white font-medium shadow-xs' : 'text-[#6D534F]'
                }`}
              >
                3. Tiup Lilin
              </button>
            </div>
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {previewTab === 'envelope' && (
                <motion.div
                  key="envelope"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="py-12 px-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FDFBF7] to-[#F7ECE4] rounded-2xl border border-[#F0DFD5]"
                >
                  <div className="w-20 h-20 rounded-full bg-[#8A3324] text-white flex items-center justify-center shadow-lg mb-4 ring-8 ring-[#8A3324]/10">
                    <span className="font-serif text-2xl font-bold tracking-widest">SM</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#2E1917] mb-2 font-normal">
                    Sebuah Surat Khusus Untuk Si Manis ✨
                  </h3>
                  <p className="text-sm text-[#7A615D] max-w-md font-light mb-5">
                    "Ada ruang hangat yang kurangkai khusus untuk merayakan hari bahagiamu..."
                  </p>
                  <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#8A3324]/10 text-[#8A3324] text-xs font-medium">
                    <span>Sentuh Cap Segel Lilin untuk Membuka Surat</span>
                    <Sparkles className="w-3 h-3" />
                  </span>
                </motion.div>
              )}

              {previewTab === 'letter' && (
                <motion.div
                  key="letter"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="p-6 sm:p-8 bg-gradient-to-b from-[#FFFDFB] to-[#FAF4EE] rounded-2xl border border-[#EBDCCF] text-left"
                >
                  <div className="max-w-xl mx-auto space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#8A3324] font-medium tracking-widest uppercase pb-3 border-b border-[#EFE4DA]">
                      <span>Surat Cinta Kasih</span>
                      <span>Untuk: Si Manis 🤍</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#2C1816]">
                      Selamat Bertambah Usia, Manisku 🎂✨
                    </h3>
                    <p className="font-serif text-sm sm:text-base text-[#4C3633] leading-relaxed italic">
                      "Hari ini adalah hari yang begitu istimewa, karena tepat pada hari ini, dunia dihadiahi seseorang sehangat dan seindah dirimu..."
                    </p>
                    <div className="pt-2 flex items-center space-x-4">
                      <div className="w-24 h-28 bg-white p-1.5 rounded shadow-sm border border-[#EADBCE] -rotate-3">
                        <img
                          src="/cake.jpg"
                          alt="Memory"
                          className="w-full h-20 object-cover rounded"
                        />
                        <div className="text-[9px] text-center text-[#78625E] font-serif mt-1">
                          Senyumanmu 🌻
                        </div>
                      </div>
                      <div className="text-xs text-[#7A615D] font-light leading-relaxed">
                        Foto-foto kenangan berharga dengan catatan manis yang bisa diklik untuk memperbesar...
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {previewTab === 'moment' && (
                <motion.div
                  key="moment"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="py-10 px-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFF9F6] to-[#FBF0EA] rounded-2xl border border-[#F2DDD2]"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-3 shadow-inner">
                    <Flame className="w-8 h-8 fill-amber-500 animate-pulse" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#2D1A18] mb-1">
                    Tiup Lilin & Panjatkan Doa 🎂
                  </h3>
                  <p className="text-sm text-[#7D6460] max-w-sm mb-4">
                    Gores korek api virtual, nyalakan lilin, dan sentuh untuk meniupnya hingga confetti bertebaran!
                  </p>
                  <button
                    onClick={() => onStartStudio(defaultGiftExperiences['birthday'])}
                    className="px-5 py-2 rounded-full bg-[#8A3324] text-white text-xs font-medium hover:bg-[#722A1E] transition-all flex items-center space-x-1.5"
                  >
                    <span>Coba di Studio Editor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. OCCASION TEMPLATES SECTION */}
      <section id="templates" className="py-20 md:py-28 px-4 sm:px-6 bg-[#F5ECE3] border-y border-[#E8D9CC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#8A3324] font-semibold">
              Koleksi Template Elegan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1816] mt-2 mb-4 font-normal">
              Pilih Momen Spesial yang Ingin Kamu Rayakan
            </h2>
            <p className="text-[#6D534F] text-sm sm:text-base font-light">
              Setiap template telah dirancang dengan narasi kata yang menyentuh, palet warna elegan,
              dan interaksi unik yang disesuaikan dengan suasana hatimu.
            </p>
          </div>

          {/* Grid of 5 Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templatesList.map((tpl) => {
              const IconComp = tpl.icon;
              return (
                <div
                  key={tpl.type}
                  className="bg-white/90 rounded-2xl border border-[#E6D4C6] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className={`p-6 bg-gradient-to-br ${tpl.gradient} border-b border-[#ECE0D6]`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/90 text-[#3A1E1C] shadow-2xs border border-[#E8D8CC]">
                        {tpl.badge}
                      </span>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: `${tpl.accentColor}15`, color: tpl.accentColor }}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#2E1917] mb-2">
                      {tpl.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6C534F] leading-relaxed font-light">
                      {tpl.tagline}
                    </p>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <span className="text-[11px] tracking-wider uppercase font-semibold text-[#8B6E6A]">
                        Fitur Utama:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#523A36]">
                        {tpl.features.map((f, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8A3324] shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => onStartStudio(defaultGiftExperiences[tpl.type])}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6F2] hover:bg-[#8A3324] text-[#4A2E2B] hover:text-white border border-[#E2D2C4] hover:border-[#8A3324] text-xs sm:text-sm font-medium transition-all flex items-center justify-center space-x-2 shadow-2xs"
                    >
                      <span>Gunakan Template Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Custom Blank Canvas Card */}
            <div className="bg-[#EFE5DC]/60 rounded-2xl border-2 border-dashed border-[#DBC6B6] p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8A3324] shadow-xs">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#2E1917]">
                  Rancang Dari Nol
                </h3>
                <p className="text-xs text-[#6C534F] mt-1 max-w-xs font-light">
                  Mulai dengan kanvas kosong dan bebas sesuaikan momen, tema warna, dan kata hatimu sendiri.
                </p>
              </div>
              <button
                onClick={() => onStartStudio(defaultGiftExperiences['birthday'])}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#8A3324] text-[#3A1E1C] hover:text-white border border-[#DAC6B7] text-xs font-medium transition-all shadow-2xs"
              >
                Mulai Kanvas Kustom ✨
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KEY FEATURES SECTION */}
      <section id="features" className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#8A3324] font-semibold">
              Kualitas Tanpa Kompromi
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1816] mt-2 mb-4 font-normal">
              Didesain Khusus untuk Menyentuh Perasaan
            </h2>
            <p className="text-[#6D534F] text-sm sm:text-base font-light">
              Kado digital bukan sekadar link web biasa. Setiap detail interaksi, palet warna, dan suaranya
              dibuat agar penerima merasakan ketulusanmu secara mendalam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/80 p-7 rounded-2xl border border-[#EBDCCF] shadow-2xs hover:shadow-sm transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#8A3324]/10 text-[#8A3324] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2E1917] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6C534F] leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 px-4 sm:px-6 bg-[#F8F1EA] border-t border-[#E8DACD]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#8A3324] font-semibold">
              Sangat Mudah Digunakan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1816] mt-2 mb-4 font-normal">
              3 Langkah Sederhana Menghadirkan Senyuman
            </h2>
            <p className="text-[#6D534F] text-sm sm:text-base font-light">
              Tidak membutuhkan keahlian teknis apa pun. Kamu bisa menyelesaikannya dalam waktu kurang dari 3 menit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white/90 p-7 rounded-2xl border border-[#EBDCCF] relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#8A3324] text-white font-serif font-bold flex items-center justify-center mb-4 shadow-sm">
                1
              </div>
              <h3 className="font-serif text-lg font-medium text-[#2E1917] mb-2">
                Pilih Momen & Tema
              </h3>
              <p className="text-xs sm:text-sm text-[#6C534F] font-light leading-relaxed">
                Tentukan apakah ini kado ulang tahun, anniversary, permintaan maaf, ucapan terima kasih, atau kejutan romantis.
              </p>
            </div>

            <div className="bg-white/90 p-7 rounded-2xl border border-[#EBDCCF] relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#8A3324] text-white font-serif font-bold flex items-center justify-center mb-4 shadow-sm">
                2
              </div>
              <h3 className="font-serif text-lg font-medium text-[#2E1917] mb-2">
                Personalisasi di Studio
              </h3>
              <p className="text-xs sm:text-sm text-[#6C534F] font-light leading-relaxed">
                Tuliskan kata hatimu, unggah foto kenangan terindah, dan atur detail interaksi dengan pratinjau langsung secara real-time.
              </p>
            </div>

            <div className="bg-white/90 p-7 rounded-2xl border border-[#EBDCCF] relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#8A3324] text-white font-serif font-bold flex items-center justify-center mb-4 shadow-sm">
                3
              </div>
              <h3 className="font-serif text-lg font-medium text-[#2E1917] mb-2">
                Bagikan Tautan Privat
              </h3>
              <p className="text-xs sm:text-sm text-[#6C534F] font-light leading-relaxed">
                Salin link tautan privat atau kirim langsung lewat WhatsApp. Orang terkasihmu akan tersenyum haru saat membukanya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EMOTIONAL STORIES & TESTIMONIALS */}
      <section className="py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#8A3324] font-semibold">
              Kisah Kasih Nyata
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1816] mt-2 mb-3 font-normal">
              Cerita Hangat dari Mereka yang Telah Berbagi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 p-6 rounded-2xl border border-[#EBDCCF] flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-sm text-[#46312E] leading-relaxed mb-4">
                  "Pacarku sampai nangis terharu pas buka amplopnya dan tiup lilin di hp. Kami lagi LDR beda pulau, tapi kado ini beneran bikin rasa hangatnya nyampe banget."
                </p>
              </div>
              <div className="border-t border-[#F2E5DB] pt-3 text-xs">
                <p className="font-medium text-[#2E1917]">Pasangan LDR</p>
                <p className="text-[#846864] font-light">Kado Ulang Tahun Spesial</p>
              </div>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-[#EBDCCF] flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-sm text-[#46312E] leading-relaxed mb-4">
                  "Template Anniversary-nya cakep pol! Ada penghitung hari milestone yang bikin kita nostalgia bareng. Desainnya mewah dan menyentuh hati."
                </p>
              </div>
              <div className="border-t border-[#F2E5DB] pt-3 text-xs">
                <p className="font-medium text-[#2E1917]">Pasangan Anniversary</p>
                <p className="text-[#846864] font-light">Merayakan 2 Tahun Bersama</p>
              </div>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-[#EBDCCF] flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-sm text-[#46312E] leading-relaxed mb-4">
                  "Sempat canggung mau minta maaf setelah salah paham. Pakai template kartu rahasia gosok ini, suasana langsung cair dan dia senyum lagi. Makasih banyak!"
                </p>
              </div>
              <div className="border-t border-[#F2E5DB] pt-3 text-xs">
                <p className="font-medium text-[#2E1917]">Pengguna KadoKasih</p>
                <p className="text-[#846864] font-light">Ungkapan Maaf & Janji</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-[#FAF4EE] border-t border-[#EADBCE]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#8A3324] font-semibold">
              Pertanyaan Umum
            </span>
            <h2 className="font-serif text-3xl text-[#2C1816] mt-2 mb-2 font-normal">
              Hal yang Sering Ditanyakan
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/90 rounded-xl border border-[#EBDCCF] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-serif text-base text-[#2E1917] font-medium"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A3324] transition-transform duration-200 shrink-0 ml-2 ${
                      activeFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#6E5450] font-light leading-relaxed border-t border-[#F5EDE5] pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-[#8A3324] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-white">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight mb-5 leading-tight">
            Siap Menghadirkan Momen yang Tak Terlupakan?
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-8">
            Jangan biarkan momen berhargamu berlalu begitu saja. Buat surat cinta dan kado digital interaktif
            sekarang juga — gratis dan tanpa perlu daftar akun.
          </p>
          <button
            onClick={() => onStartStudio(defaultGiftExperiences['birthday'])}
            className="px-8 py-4 rounded-full bg-white text-[#8A3324] hover:bg-[#FAF4EE] text-base font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center space-x-2"
          >
            <span>Buka Studio Kado Sekarang</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="py-8 px-4 sm:px-6 bg-[#261513] text-white/70 text-xs border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-[#8A3324] text-white flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-serif font-medium text-white tracking-wide">
              KadoKasih.id
            </span>
            <span className="text-white/40">| Bespoke Digital Gift SaaS Platform</span>
          </div>

          <div className="text-center sm:text-right text-white/50">
            Dibuat dengan segenap cinta untuk merayakan setiap momen berharga. © {new Date().getFullYear()} KadoKasih.
          </div>
        </div>
      </footer>
    </div>
  );
};
