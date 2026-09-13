# 🎁 Platform Kado Digital Ulang Tahun Komersial (Mobile-First & Paywall Rp 15.000) ✨

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Template website platform kado ulang tahun interaktif **berbasis mobile-first** yang dirancang khusus untuk **langsung dikomersilkan / dimonetisasi** dengan sistem **Pay-to-Share seharga Rp 15.000 per link**.

Calon pembeli bisa membuat dan mencoba pratinjau kado secara gratis di ponsel mereka, lalu membayar Rp 15.000 (via QRIS / E-Wallet) ketika ingin membagikan tautan unik dan kartu QR Code kepada orang tersayang.

---

## 🌟 Fitur Utama Komersial & Mobile-First

1. 📱 **Tampilan Nyaman Khusus Layar HP (Mobile-First)**:
   - Dirancang pas untuk layar smartphone (iPhone & Android). Ringan, responsif, dan nyaman digunakan dengan satu tangan.

2. 🎁 **Kado Simpel: Kupon Kasih Sayang (Virtual Love Coupons)**:
   - Format kado yang sangat disukai pasangan muda & sahabat di media sosial (viral di TikTok/Instagram):
     - 🍜 *Kupon Ditraktir Makanan Favorit*
     - 🫂 *Kupon Peluk Hangat 24 Jam*
     - 🕊️ *Kupon Bebas Ngambek 1 Hari*
     - 🎬 *Kupon Nonton Bioskop & Jajan Popcorn*
     - ☕ *Kupon Ngopi & Deep Talk Santai*
     - 👑 *Kupon 1 Permintaan Rahasia Bebas*
     - *(Bisa tambah kupon custom sendiri!)*
   - Penerima dapat menyentuh kupon untuk **mengklaimnya secara langsung**.

3. 🎂 **Kue Ulang Tahun & Lilin Interaktif**:
   - Gores korek api -> nyala api realistis -> tiup lilin -> kepulan asap animasi -> ledakan confetti perayaan.

4. 💌 **Surat Ucapan Kinetik (Kinetic Letter)**:
   - Pilihan template ucapan instan (*Romantis*, *Sahabat*, atau *Simpel*). Kalimat demi kalimat tampil elegan saat layar disentuh.

5. 💳 **Paywall Rp 15.000 (Monetisasi Siap Pakai)**:
   - Tampilan modal pembayaran QRIS Rp 15.000 (mendukung BCA, GoPay, OVO, Dana, ShopeePay).
   - Fitur kode promo/voucher (misal: kode `GRATIS` untuk uji coba/tester).
   - Tombol konfirmasi transfer via WhatsApp admin.
   - Tombol simulasi bayar instan (*sandbox*).
   - Setelah bayar: menghasilkan **Tautan Unik Permanen** + **Kartu QR Code** siap print/kirim!

6. 🔁 **Viral Growth Loop**:
   - Di akhir halaman penerima kado terdapat ajakan manis:  
     *"Mau bikin kado spesial seperti ini untuk pacar/sahabatmu? Buat di sini cuma Rp 15.000 ✨"*  
     Setiap penerima kado otomatis berpotensi menjadi pembeli baru Anda!

---

## ⚙️ Cara Mengatur QRIS & WhatsApp Toko Anda

Buka file [`src/config/commercial.config.ts`](./src/config/commercial.config.ts):

```typescript
export const businessConfig = {
  priceRupiah: 15000,
  formattedPrice: 'Rp 15.000',
  serviceName: 'Kado Ulang Tahun Digital Interaktif',
  
  // Ganti link gambar QRIS toko Anda di sini:
  qrisImageUrl: 'https://link-ke-gambar-qris-toko-anda.png',
  
  // Ganti dengan nomor WhatsApp Anda (awali dengan 62):
  adminWhatsApp: '628123456789',
  
  // Kode promo untuk pengujian:
  demoPromoCode: 'GRATIS',
};
```

---

## 🚀 1-Click Deploy ke Hosting Gratis

Anda bisa langsung mendeploy website ini ke internet dalam 1 menit:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ram-id/birthday-template)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Ram-id/birthday-template)

---

## 💻 Menjalankan di Komputer Lokal

```bash
# 1. Clone repository
git clone https://github.com/Ram-id/birthday-template.git
cd birthday-template

# 2. Install dependensi
npm install

# 3. Jalankan server lokal
npm run dev
```
Buka di browser: `http://localhost:3000`

---

## 📄 Lisensi (License)

Dirilis di bawah lisensi [MIT](./LICENSE). Bebas digunakan untuk komersial, disesuaikan, dan dikembangkan lebih lanjut.
Dibuat oleh [Ram-id](https://github.com/Ram-id).
