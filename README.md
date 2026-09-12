# 🎂 Aesthetic Interactive Birthday Website Template ✨

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Template website ucapan ulang tahun interaktif, estetik, dan sinematik yang dirancang khusus agar **mudah digunakan dan dikustomisasi oleh siapa saja** — baik oleh programmer maupun pemula (tanpa perlu koding!).

---

## 🌟 Fitur Utama (Key Features)

1. 🎂 **Kue Ulang Tahun & Lilin Interaktif**:
   - Efek gores korek api dengan suara gesekan (*Web Audio API*).
   - Animasi nyala api lilin berkedip realistis.
   - Tiup lilin interaktif dengan jeda *make-a-wish*, kepulan asap animasi, efek fanfare ceria, dan hujan *pastel confetti*.

2. 💌 **Surat Kasih Berjalan (Kinetic Typography Letter)**:
   - Kalimat demi kalimat tampil halus dan elegan saat layar disentuh atau otomatis berjalan.
   - Tombol navigasi sebelumnya/selanjutnya + bar kemajuan (*progress bar*).

3. 🎁 **Ruang Kado Spesial (Virtual Gift Vault)**:
   - 📸 **Galeri Foto Polaroid 3D**: Bingkai polaroid estetik, zoom foto (*lightbox*), dan caption manis.
   - 🎙️ **Pesan Suara & Lagu**: Audio player visualizer gelombang suara untuk rekaman suara atau lagu ucapan.
   - 🎬 **Video Kenangan**: Pemutar video sinematik (mendukung link YouTube atau file mp4 lokal).
   - ✨ **Kapsul Kejutan**: Tombol membuka website atau hadiah rahasia tambahan.

4. 🎈 **Suasana Hangat & Interaktif**:
   - Partikel debu cahaya melayang (*ambient floating motes*).
   - Lampu gantung gemerlap (*fairy lights*).
   - Balon melayang interaktif yang bisa diletuskan saat diklik!

5. ⚙️ **Kustomisasi Super Mudah (3 Cara)**:
   - **Cara 1 (Tanpa Koding)**: Buka website, klik tombol **"⚙️ Kustomisasi"** di pojok kanan atas, ketik nama/pesan, lalu klik **"Salin Link Instan"**!
   - **Cara 2 (Lewat URL Parameter)**: Cukup tambahkan parameter di link:  
     `https://domain-kamu.vercel.app/?to=Nama&age=21&from=Pengirim`
   - **Cara 3 (File Konfigurasi)**: Edit 1 file terpusat di `src/config/birthday.config.ts`.

6. 💬 **Tombol Balas ke WhatsApp**:
   - Penerima dapat langsung membalas pesan terima kasih ke WhatsApp pengirim hanya dengan 1 kali klik.

---

## 🚀 1-Click Deploy (Sebar Link Website dalam 1 Menit)

Kamu bisa langsung mendeploy website ini secara gratis:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ram-id/birthday-template)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Ram-id/birthday-template)

---

## 💻 Cara Menjalankan di Komputer Lokal (Local Development)

### 1. Clone Repository
```bash
git clone https://github.com/Ram-id/birthday-template.git
cd birthday-template
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser di `http://localhost:3000` (atau port yang tertera di terminal).

---

## 🎨 Panduan Kustomisasi (Customization Guide)

### 1. Mengubah Teks & Data Melalui `src/config/birthday.config.ts`

Buka file [`src/config/birthday.config.ts`](./src/config/birthday.config.ts):

```typescript
export const defaultBirthdayConfig: BirthdayConfig = {
  recipientName: "Sarah",              // Nama yang berulang tahun
  petName: "Sayanggg",                 // Panggilan sayang
  senderName: "Dimas",                 // Nama kamu
  age: 21,                             // Umur
  birthDate: "12 September",
  bgmUrl: "/bgm.mp3",                  // Lagu latar di folder public/

  celebration: {
    greeting: "Selamat Ulang Tahun, Manisku! 🎂✨",
    subGreeting: "Hari ini adalah hari istimewa...",
    // ...
  },

  letter: {
    storyMessages: [
      "Hari ini terasa begitu istimewa...",
      "Satu tahun penuh perjalanan telah terlewati...",
      "Terima kasih sudah selalu ada di sisiku 🤍",
      // Tambahkan kalimat sesukamu di sini!
    ],
    signature: "Dengan segenap cinta, Dimas 🤍",
  },

  gifts: {
    // Atur kado foto, rekaman suara, video youtube, atau tautan rahasia
  },

  whatsapp: {
    phoneNumber: "628123456789",       // Nomor WA kamu (awali dengan 62)
    messageTemplate: "Makasih banyakkk atas websitenya! Terharu banget... 🤍✨",
  }
};
```

### 2. Mengganti Foto, Lagu, dan Video Asli

Cukup letakkan file kamu di dalam folder `public/`:
- **Foto Kue**: Simpan sebagai `public/cake.jpg`
- **Foto Polaroid**: Simpan sebagai `public/memory-1.jpg`, `public/memory-2.jpg`, `public/memory-3.jpg`
- **Lagu Latar**: Simpan file audio sebagai `public/bgm.mp3`
- **Voice Note / Rekaman Suara**: Simpan sebagai `public/sample-vn.mp3`
- **Video Spesial**: Bisa menggunakan link **YouTube** di konfigurasi, atau simpan video mp4 ke `public/video.mp4`.

*(Atau kamu juga bisa mengganti foto/video/audio langsung lewat tombol di website saat membukanya di browser!)*

---

## 📂 Struktur Direktori (Project Structure)

```text
birthday-template/
├── public/                     # Aset publik (kue, polaroid, audio, favicon)
│   ├── bgm.mp3
│   ├── cake.jpg
│   ├── giftbox.jpg
│   └── memory-1.jpg ...
├── src/
│   ├── config/
│   │   └── birthday.config.ts  # ⭐️ PUSAT KONFIGURASI SEMUA DATA
│   ├── utils/
│   │   └── soundEffects.ts     # Generator efek suara Web Audio API
│   ├── components/
│   │   ├── CelebrationStage.tsx    # Babak kue & tiup lilin
│   │   ├── FinalLoveStage.tsx      # Babak surat kinetik
│   │   ├── GiftVaultStage.tsx      # Babak ruang kado
│   │   ├── FloatingPetals.tsx      # Animasi partikel melayang
│   │   ├── InteractiveBalloons.tsx # Balon interaktif
│   │   └── modals/
│   │       ├── PhotoMemoryModal.tsx    # Modal polaroid 3D
│   │       ├── VoiceNoteModal.tsx      # Modal pemutar audio/VN
│   │       ├── SpecialVideoModal.tsx   # Modal pemutar video / YouTube
│   │       └── LiveCustomizerModal.tsx # Drawer kustomisasi instan
│   ├── App.tsx                 # Komponen utama & pemutar musik
│   ├── main.tsx
│   └── index.css               # Styling Tailwind + animasi lilin
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Web Audio API (zero external sound dependencies) + HTML5 Audio
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📄 Lisensi (License)

Proyek ini dirilis di bawah lisensi [MIT](./LICENSE). Bebas digunakan, dimodifikasi, dan dibagikan untuk siapa saja yang ingin membahagiakan orang tersayang! 🌻✨

Dibuat dengan segenap ketulusan oleh [Ram-id](https://github.com/Ram-id).
