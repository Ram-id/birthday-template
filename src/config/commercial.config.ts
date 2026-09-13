/**
 * 🎁 COMMERCIAL & MOBILE-FIRST BIRTHDAY GIFT CONFIGURATION
 * -------------------------------------------------------------
 * Pusat konfigurasi platform kado digital komersial (Rp 15.000 / link).
 */

export interface VirtualCoupon {
  id: string;
  title: string;
  category: 'romantic' | 'friendship' | 'fun';
  icon: string;
  description: string;
  validUntil?: string;
}

export interface CommercialGiftData {
  // Data Penerima & Pengirim
  recipientName: string;
  petName: string;
  senderName: string;
  age: number;

  // Tema Tampilan
  theme: 'rose' | 'lavender' | 'sunset' | 'matcha' | 'dark';

  // Kado Simpel: Kupon Kasih Sayang
  coupons: VirtualCoupon[];

  // Kado Simpel: Foto Kenangan (opsional)
  photoUrl?: string;
  photoCaption?: string;

  // Surat Ucapan
  letterGreeting: string;
  letterContent: string[];
  letterClosing: string;

  // Musik Latar
  bgmUrl: string;

  // WhatsApp Pengirim untuk Balasan
  senderWhatsApp?: string;
}

// Pilihan Kupon Virtual Populer Siap Pakai
export const availableCoupons: VirtualCoupon[] = [
  {
    id: 'food',
    title: 'Kupon Ditraktir Makanan Favorit 🍜',
    category: 'romantic',
    icon: '🍜',
    description: 'Bebas pilih makanan/minuman apa saja yang kamu pengenin, sepenuhnya aku yang bayarin!',
    validUntil: 'Kapan saja kamu mau'
  },
  {
    id: 'hug',
    title: 'Kupon Peluk Hangat 24 Jam 🫂',
    category: 'romantic',
    icon: '🫂',
    description: 'Berlaku untuk pelukan tanpa batas waktu kapan pun kamu ngerasa lelah atau kangen.',
    validUntil: 'Berlaku selamanya'
  },
  {
    id: 'no-angry',
    title: 'Kupon Bebas Ngambek 1 Hari 🕊️',
    category: 'fun',
    icon: '🕊️',
    description: 'Kalau ada hal kecil yang bikin kesel, kupon ini bikin aku langsung dimaafin tanpa syarat!',
    validUntil: '1x pakai'
  },
  {
    id: 'cinema',
    title: 'Kupon Nonton Bioskop & Jajan Popcorn 🎬',
    category: 'romantic',
    icon: '🎬',
    description: 'Pilih film apa pun yang lagi tayang di bioskop, lengkap dengan popcorn & minuman.',
    validUntil: 'Bulan ini'
  },
  {
    id: 'coffee',
    title: 'Kupon Ngopi & Deep Talk Santai ☕',
    category: 'friendship',
    icon: '☕',
    description: 'Waktu santai ngobrol tentang apa pun dari hati ke hati, tanpa ada gangguan gadget.',
    validUntil: 'Kapan saja'
  },
  {
    id: 'wish',
    title: 'Kupon 1 Permintaan Rahasia Bebas 👑',
    category: 'fun',
    icon: '👑',
    description: 'Kamu boleh minta 1 permintaan apa saja yang wajar, dan aku wajib mengabulkannya!',
    validUntil: 'Kapan saja'
  },
];

// Template Ucapan Siap Pakai
export const letterTemplates = {
  romantic: [
    "Selamat ulang tahun yaa manisku... 🎂✨",
    "Hari ini begitu istimewa karena orang sebaik dan sehangat kamu dilahirkan ke dunia.",
    "Terima kasih sudah selalu ada, membawa tawa, dan menghangatkan hari-hariku.",
    "Semoga di usiamu yang baru ini, setiap langkahmu dipeluk kemudahan, kesehatan, dan kebahagiaan.",
    "Aku sayang kamu hari ini, besok, dan seterusnya 🤍"
  ],
  friendship: [
    "Happy birthday sahabat terbaikku! 🎉🥳",
    "Nggak kerasa umurmu udah nambah lagi nih, makin dewasa yaa!",
    "Makasih udah selalu ada di suka maupun duka, dan jadi teman cerita paling seru.",
    "Semoga segala impian dan cita-citamu tahun ini terkabul satu per satu.",
    "Tetap jadi orang ceria yang selalu bikin suasana rame yaa! 🚀"
  ],
  simple: [
    "Selamat bertambah usia! 🎂✨",
    "Semoga selalu diberikan kesehatan, kelancaran rezeki, dan hati yang damai.",
    "Semoga semua harapan terbaikmu tercapai dengan indah.",
    "Selamat merayakan hari bahagiamu hari ini! 🎊"
  ]
};

// Data Default Kado
export const defaultCommercialGift: CommercialGiftData = {
  recipientName: 'Alya Putri',
  petName: 'Sayanggg',
  senderName: 'Rian Pratama',
  age: 21,
  theme: 'rose',
  coupons: [availableCoupons[0], availableCoupons[1], availableCoupons[2]],
  photoUrl: '/cake.jpg',
  photoCaption: 'Senyum manismu yang selalu bikin hari-hariku cerah ✨',
  letterGreeting: 'Selamat Ulang Tahun, Cintaku! 🎂🤍',
  letterContent: letterTemplates.romantic,
  letterClosing: 'Dengan segenap rasa sayang, Rian 🤍',
  bgmUrl: '/bgm.mp3',
  senderWhatsApp: '628123456789',
};

// Konfigurasi Monetisasi & Bisnis
export const businessConfig = {
  priceRupiah: 15000,
  formattedPrice: 'Rp 15.000',
  serviceName: 'Kado Ulang Tahun Digital Interaktif',
  qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021126580014ID.LINKAJA.WWW01189360091400000000005204581253033605802ID5913Kado%20Digital6007Jakarta61051234062070703A016304E8A2',
  qrisInstruction: 'Scan QRIS di atas menggunakan GoPay, OVO, Dana, ShopeePay, BCA Mobile, atau Bank apa saja sebesar Rp 15.000.',
  adminWhatsApp: '628123456789', // Ganti dengan nomor WhatsApp Anda untuk konfirmasi bayar
  demoPromoCode: 'GRATIS', // Kode voucher uji coba / testing
};
