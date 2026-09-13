# 🌹 Platform Kado & Kartu Digital "Editorial Romance" (Multi-Momen & Paywall Rp 15.000) ✨

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Platform kartu ucapan dan kado digital interaktif berkelas **Elegan, Romantis, dan Sinematik** (*Editorial Luxury Aesthetic*). Dibuat khusus untuk kenyamanan layar ponsel (*mobile-first*) dan siap dikomersilkan dengan skema **Pay-to-Share seharga Rp 15.000 per link**.

Calon pembeli dapat memilih momen, mempersonalisasi nama, memilih kupon kado romantis, dan mencoba pratinjau gratis di ponsel mereka sebelum melakukan pembayaran via QRIS.

---

## 🌟 5 Template Momen Siap Pakai (Multi-Occasion)

Pengguna dapat memilih salah satu dari 5 template momen ini dengan 1 klik:

1. 🎂 **Perayaan Ulang Tahun (Birthday)**:
   - Kue bertekstur anggun, nyala lilin realistis, tiupan lilin dengan kepulan asap animasi, dan hujan konfeti pastel emas.
   - *Kupon bawaan*: Ditraktir Makanan Favorit, Peluk Hangat 24 Jam, Kencan Bebas Pilih, Bebas Ngambek.

2. 💍 **Perayaan Anniversary (Hari Jadi / Hubungan)**:
   - Penghitung milestone ("Tahun Ke-2 Bersamamu"), kilas balik perjalanan cinta, dan surat cinta mendalam.
   - *Kupon bawaan*: Candlelight Dinner Berdua, Bebas Ngambek Tanpa Syarat, 1 Permintaan Bebas, Staycation Santai.

3. 🥺 **Surat Permintaan Maaf (Apology / I'm Sorry)**:
   - Amplop ketulusan beraksen lembut, kata-kata penyesalan tulus dari hati, dan janji berbenah.
   - *Kupon bawaan*: Berdamai & Baikan Seketika, Traktir Es Krim Penenang, Mendengarkan Tanpa Membantah, Peluk Erat Minta Maaf.

4. 💐 **Ucapan Terima Kasih (Gratitude / Thank You)**:
   - Buket apresiasi virtual dan kartu tanda terima kasih yang menghangatkan hati.
   - *Kupon bawaan*: Traktir Kopi & Camilan Sore, Bantuan Siap Siaga Kapan Saja, Traktir Makan Siang Enak.

5. ✨ **Kejutan Manis Tanpa Alasan (Surprise / Just Because)**:
   - Kotak misteri berpita emas interaktif, surat cinta rahasia, dan voucher kejutan tak terduga.
   - *Kupon bawaan*: 1 Permintaan Rahasia Bebas, Jalan Sore & Es Krim, Teman Ngobrol 24 Jam Penuh.

---

## 🎨 Keunggulan UI/UX "Editorial Romance"

- **Palet Warna Elegan**: *Champagne Warm Cream, Blush Rose, Deep Wine/Espresso, dan Golden Amber Glow*.
- **Tipografi Klasik**: Kombinasi anggun antara serif puitis (*Playfair Display*, *Cormorant Garamond*) dan sans modern (*Plus Jakarta Sans*).
- **Segel Lilin Monogram (*Wax Seal*)**: Sentuh segel lilin untuk membuka amplop surat dengan suara denting melodi.
- **Kupon Tiket Vintage**: Tiket kupon bergradasi hangat yang dapat disentuh untuk diklaim langsung dengan stempel *"TERKLAIM (Siap Ditagih!)"*.
- **Surat Kinetik Mengharukan**: Setiap baris kalimat muncul halus saat layar disentuh.

---

## 💳 Cara Kerja Monetisasi (Paywall Rp 15.000)

1. Pengguna membuka website dan mendesain kado di **Studio Mobile** (Gratis).
2. Pengguna menekan tombol **"Bungkus Kado (Rp 15.000) ✨"**:
   - Tampil modal checkout QRIS Rp 15.000 (mendukung BCA, GoPay, OVO, Dana, ShopeePay).
   - Tersedia tombol konfirmasi WhatsApp admin dan input kode promo (kode tester: `GRATIS`).
3. Setelah terkonfirmasi:
   - Sistem menghasilkan **Tautan Kado Unik Permanen**.
   - Sistem membuat **Kartu Undangan QR Code Digital** siap kirim ke WhatsApp doi atau diprint.
4. **Tanpa Biaya Database Cloud (Rp 0 Server Cost)**:
   - Data kado di-encode secara aman ke URL parameter (`codec.ts`), sehingga link kado aktif selamanya tanpa biaya sewa database bulanan!
5. **Viral Growth Loop**:
   - Di bagian akhir halaman penerima, terdapat tombol ajakan membuat kado serupa, sehingga setiap penerima kado otomatis berpotensi menjadi pembeli baru Anda.

---

## ⚙️ Cara Mengatur QRIS & WhatsApp Admin Toko Anda

Buka file [`src/config/templates.config.ts`](./src/config/templates.config.ts):

```typescript
export const platformCommerce = {
  priceRupiah: 15000,
  formattedPrice: 'Rp 15.000',
  serviceName: 'Kado & Kartu Digital Interaktif Eksklusif',
  
  // Ganti URL gambar QRIS toko Anda di sini:
  qrisImageUrl: 'https://link-ke-gambar-qris-toko-anda.png',
  
  // Ganti dengan nomor WhatsApp Anda (awali dengan 62):
  adminWhatsApp: '628123456789',
  
  // Kode voucher promo untuk uji coba:
  demoPromoCode: 'GRATIS',
};
```

---

## 🚀 1-Click Deploy Gratis

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ram-id/birthday-template)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Ram-id/birthday-template)

---

## 💻 Menjalankan di Komputer Lokal

```bash
git clone https://github.com/Ram-id/birthday-template.git
cd birthday-template
npm install
npm run dev
```
Buka browser di: `http://localhost:3000`

---

## 📄 Lisensi (License)

Dirilis di bawah lisensi [MIT](./LICENSE). Dibuat dengan segenap ketulusan oleh [Ram-id](https://github.com/Ram-id).
