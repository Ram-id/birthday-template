/**
 * 🌹 EDITORIAL ROMANCE - MULTI-OCCASION TEMPLATES CONFIGURATION
 * -------------------------------------------------------------
 * Pusat konfigurasi 5 template momen spesial berkelas tinggi:
 * 1. Ulang Tahun (Birthday) 🎂
 * 2. Anniversary / Hari Jadi 💍
 * 3. Permintaan Maaf (Apology) 🕊️
 * 4. Ucapan Terima Kasih (Gratitude) 💐
 * 5. Kejutan Spesial (Surprise) ✨
 */

export type OccasionType = 'birthday' | 'anniversary' | 'apology' | 'thankyou' | 'surprise';

export interface OccasionCoupon {
  id: string;
  title: string;
  icon: string;
  description: string;
  tag: string;
}

export interface OccasionPreset {
  id: OccasionType;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  theme: {
    bgGradient: string;
    cardBg: string;
    accentColor: string;
    textColor: string;
    goldColor: string;
    envelopeColor: string;
  };
  defaultGreeting: string;
  defaultStory: string[];
  defaultClosing: string;
  coupons: OccasionCoupon[];
  milestoneLabel?: string;
}

export interface GiftCustomData {
  occasion: OccasionType;
  recipientName: string;
  petName: string;
  senderName: string;
  milestoneNumber?: number; // Umur (untuk ultah) atau tahun/bulan (untuk anniversary)
  photoUrl?: string;
  photoCaption?: string;
  greetingTitle: string;
  storyMessages: string[];
  closingSignature: string;
  selectedCoupons: OccasionCoupon[];
  bgmUrl: string;
  senderWhatsApp?: string;
}

export const occasionPresets: Record<OccasionType, OccasionPreset> = {
  // 1. ULANG TAHUN (BIRTHDAY)
  birthday: {
    id: 'birthday',
    title: 'Perayaan Ulang Tahun',
    subtitle: 'Kue lilin interaktif, make a wish, confetti, dan kupon ultah spesial',
    badge: 'Paling Populer 🎂',
    icon: '🎂',
    theme: {
      bgGradient: 'from-[#FFFDF9] via-[#FAF3EC] to-[#F5E6DC]',
      cardBg: 'bg-white/85',
      accentColor: '#FFAAA6',
      textColor: '#4A2E2B',
      goldColor: '#D4AF37',
      envelopeColor: '#F7D6D0',
    },
    defaultGreeting: 'Selamat Ulang Tahun, Cintaku! 🎂✨',
    defaultStory: [
      'Hari ini adalah hari yang begitu istimewa...',
      'karena tepat pada hari ini, dunia dihadiahi seseorang sehangat dan seindah dirimu.',
      'Tanpa terasa, satu tahun penuh langkah dan cerita telah kita lalui bersama.',
      'Terima kasih sudah selalu ada dengan senyuman manismu yang menenangkan.',
      'Di usiamu yang baru ini, semoga setiap langkahmu dipeluk kemudahan, kesehatan raga, dan kebahagiaan hati.',
      'Aku bersyukur memiliki dirimu di sisiku. Selamat Ulang Tahun yaa sayang! 🤍✨'
    ],
    defaultClosing: 'Dengan segenap cinta & doa terbaikmu 🤍',
    milestoneLabel: 'Ulang Tahun Ke-',
    coupons: [
      {
        id: 'b-food',
        title: 'Kupon Ditraktir Makanan Favorit 🍜',
        icon: '🍜',
        description: 'Bebas pilih makanan atau minuman apa saja yang kamu inginkan, sepenuhnya aku yang bayarin!',
        tag: 'Kado Ultah #1'
      },
      {
        id: 'b-hug',
        title: 'Kupon Peluk Hangat 24 Jam 🫂',
        icon: '🫂',
        description: 'Berlaku untuk pelukan hangat tanpa batas waktu kapan pun kamu merasa lelah atau kangen.',
        tag: 'Kado Ultah #2'
      },
      {
        id: 'b-date',
        title: 'Kupon Kencan Seharian Bebas Pilih 🎬',
        icon: '🎬',
        description: 'Kamu yang menentukan destinasi kencan, nonton film apa saja, dan jalan ke mana pun kamu suka.',
        tag: 'Kado Ultah #3'
      },
      {
        id: 'b-peace',
        title: 'Kupon Bebas Ngambek 1 Hari 🕊️',
        icon: '🕊️',
        description: 'Kalau ada hal kecil yang bikin kesal, kupon ini bikin aku langsung dimaafin tanpa syarat!',
        tag: 'Kado Ultah #4'
      }
    ]
  },

  // 2. ANNIVERSARY (HARI JADI / HUBUNGAN)
  anniversary: {
    id: 'anniversary',
    title: 'Perayaan Anniversary',
    subtitle: 'Kilas balik perjalanan cinta, janji setia, dan voucher kencan romantis',
    badge: 'Romantis Mendalam 💍',
    icon: '💍',
    theme: {
      bgGradient: 'from-[#FAF5F2] via-[#F3E7E4] to-[#EBD5D1]',
      cardBg: 'bg-white/90',
      accentColor: '#E29587',
      textColor: '#381E1C',
      goldColor: '#C69214',
      envelopeColor: '#ECC5BE',
    },
    defaultGreeting: 'Happy Anniversary, Sayangku! 💍🤍',
    defaultStory: [
      'Hari berganti hari, musim berganti waktu...',
      'dan rasa syukurku kepadamu justru semakin tumbuh lebih dalam dari sebelumnya.',
      'Terima kasih telah memilihku sebagai teman berbagi tawa, keluh kesah, dan masa depan.',
      'Setiap detik bersamamu adalah bab terindah dalam hidupku yang selalu ingin kubaca berulang kali.',
      'Semoga cinta dan ketulusan ini senantiasa bertumbuh semakin kokoh dan saling melengkapi.',
      'Selamat merayakan hari jadi kita, my forever love 🤍✨'
    ],
    defaultClosing: 'Selamanya milikmu dengan segenap jiwa 🤍',
    milestoneLabel: 'Tahun Ke-',
    coupons: [
      {
        id: 'a-dinner',
        title: 'Voucher Candlelight Dinner Berdua 🍷',
        icon: '🍷',
        description: 'Makan malam romantis berdua di tempat istimewa dengan obrolan hangat tanpa gangguan.',
        tag: 'Janji Cinta #1'
      },
      {
        id: 'a-forgive',
        title: 'Voucher Bebas Ngambek Tanpa Syarat 🕊️',
        icon: '🕊️',
        description: 'Kupon darurat penghapus rasa kesal dan cemberut seketika. Langsung damai & pelukan!',
        tag: 'Janji Cinta #2'
      },
      {
        id: 'a-wish',
        title: 'Voucher 1 Permintaan Spesial Bebas 👑',
        icon: '👑',
        description: 'Permintaan apa saja yang kamu dambakan, aku berjanji akan mewujudkannya khusus untukmu.',
        tag: 'Janji Cinta #3'
      },
      {
        id: 'a-trip',
        title: 'Voucher Staycation & Liburan Santai 🏖️',
        icon: '🏖️',
        description: 'Perjalanan santai berdua melepas penat rutinitas untuk merajut kenangan baru yang manis.',
        tag: 'Janji Cinta #4'
      }
    ]
  },

  // 3. PERMINTAAN MAAF (APOLOGY)
  apology: {
    id: 'apology',
    title: 'Surat Permintaan Maaf',
    subtitle: 'Ungkapan penyesalan tulus, janji berbenah, dan kupon berdamai manis',
    badge: 'Penuh Ketulusan 🥺',
    icon: '🥺',
    theme: {
      bgGradient: 'from-[#FAF8F5] via-[#F1EDE6] to-[#E8E1D5]',
      cardBg: 'bg-white/90',
      accentColor: '#B88278',
      textColor: '#332421',
      goldColor: '#B38F4D',
      envelopeColor: '#DDD6CA',
    },
    defaultGreeting: 'Dari Lubuk Hatiku yang Terdalam... 🕊️🤍',
    defaultStory: [
      'Aku menulis ini dengan segenap penyesalan dan ketulusan hati...',
      'Aku tahu mungkin perkataan atau tindakanku kemarin telah melukai perasaan manismu.',
      'Melihatmu sedih atau kecewa adalah hal terakhir yang pernah kuinginkan di dunia ini.',
      'Maafkan keegoisanku, maafkan kecerobohanku yang belum sepenuhnya memahamimu dengan baik.',
      'Kehadiranmu terlalu berharga untuk kubiarkan renggang oleh ego sesaat.',
      'Beri aku kesempatan untuk memperbaiki semuanya dan merawat senyumanmu kembali yaa... 🥺🤍'
    ],
    defaultClosing: 'Dengan penyesalan tulus & janji berbenah 🤍',
    coupons: [
      {
        id: 'ap-peace',
        title: 'Kupon Berdamai & Baikan Seketika 🕊️',
        icon: '🕊️',
        description: 'Klaim kupon ini untuk menghapus rasa marah seketika. Aku siap mendengarkan semua unek-unekmu.',
        tag: 'Tanda Damai #1'
      },
      {
        id: 'ap-treat',
        title: 'Kupon Traktir Es Krim & Makanan Penenang 🍨',
        icon: '🍨',
        description: 'Aku antar makanan manis favoritmu sampai senyum manismu kembali merekah seperti biasa.',
        tag: 'Tanda Damai #2'
      },
      {
        id: 'ap-listen',
        title: 'Kupon Mendengarkan Tanpa Membantah 🎧',
        icon: '🎧',
        description: 'Aku siap duduk diam mendengarkan semua perasaanmu tanpa membela diri sepatah kata pun.',
        tag: 'Tanda Damai #3'
      },
      {
        id: 'ap-hug',
        title: 'Kupon Peluk Erat Minta Maaf 🫂',
        icon: '🫂',
        description: 'Pelukan erat penuh penyesalan sebagai tanda bahwa aku tidak pernah ingin kehilangan dirimu.',
        tag: 'Tanda Damai #4'
      }
    ]
  },

  // 4. UCAPAN TERIMA KASIH (THANK YOU / GRATITUDE)
  thankyou: {
    id: 'thankyou',
    title: 'Surat Terima Kasih',
    subtitle: 'Apresiasi mendalam, buket virtual, dan untaian rasa syukur penuh kehangatan',
    badge: 'Apresiasi Hangat 💐',
    icon: '💐',
    theme: {
      bgGradient: 'from-[#FFFDF8] via-[#FAF3E7] to-[#F2E6CF]',
      cardBg: 'bg-white/90',
      accentColor: '#D99879',
      textColor: '#3D2A1F',
      goldColor: '#C49826',
      envelopeColor: '#F5E3C4',
    },
    defaultGreeting: 'Terima Kasih Atas Segala Kebaikanmu 💐✨',
    defaultStory: [
      'Ada banyak hal dalam hidup ini yang sering luput kusampaikan dengan kata-kata...',
      'Salah satu yang paling utama adalah betapa besarnya rasa terima kasihku kepadamu.',
      'Terima kasih telah menjadi orang yang selalu tulus membantu, mendukung, dan menemani langkahku.',
      'Kebaikan dan ketulusan yang kamu berikan meninggalkan jejak kehangatan yang begitu mendalam di hatiku.',
      'Semoga segala hal baik yang kamu taburkan di sekitarmu, berbalik melimpah ruah ke dalam hidupmu.',
      'Terima kasih sudah menjadi sosok yang begitu berarti bagiku! 🤍💐'
    ],
    defaultClosing: 'Dengan rasa syukur & hormat mendalam 🤍',
    coupons: [
      {
        id: 't-coffee',
        title: 'Kupon Traktir Kopi & Camilan Sore ☕',
        icon: '☕',
        description: 'Segelas kopi atau minuman favoritmu sepenuhnya aku yang traktir sebagai tanda terima kasih!',
        tag: 'Tanda Syukur #1'
      },
      {
        id: 't-help',
        title: 'Kupon Bantuan Siap Siaga Kapan Saja 🤝',
        icon: '🤝',
        description: 'Kapan pun kamu butuh bantuan atau teman kerepotan, panggil aku dan aku akan siap menemanimu.',
        tag: 'Tanda Syukur #2'
      },
      {
        id: 't-meal',
        title: 'Kupon Traktir Makan Siang Enak 🍱',
        icon: '🍱',
        description: 'Makan siang santai bersama untuk melepas lelah, menu lezat sesukamu pilihannya.',
        tag: 'Tanda Syukur #3'
      }
    ]
  },

  // 5. KEJUTAN SPESIAL (SURPRISE / JUST BECAUSE)
  surprise: {
    id: 'surprise',
    title: 'Kejutan Manis Tanpa Alasan',
    subtitle: 'Pita sutra interaktif, surat rahasia, dan voucher kejutan tak terduga',
    badge: 'Kejutan Misteri ✨',
    icon: '✨',
    theme: {
      bgGradient: 'from-[#FDFBF7] via-[#F4EFEB] to-[#EAE0D7]',
      cardBg: 'bg-white/90',
      accentColor: '#C97D6F',
      textColor: '#3A201C',
      goldColor: '#D4AF37',
      envelopeColor: '#E8D4C8',
    },
    defaultGreeting: 'Sebuah Kejutan Kecil Untukmu ✨🎁',
    defaultStory: [
      'Tidak perlu menunggu hari raya atau tanggal khusus untuk mengingatkanmu betapa istimewanya dirimu...',
      'Terkadang, hari biasa justru menjadi hari terbaik untuk mengirimkan seberkas cinta dan senyuman.',
      'Aku hanya ingin kamu tahu, bahwa di tengah riuhnya dunia, ada aku yang selalu mengagumi ketulusanmu.',
      'Tetaplah bersinar dengan caramu sendiri, dan jangan lupa untuk selalu tersenyum manis hari ini.',
      'Semoga kejutan kecil ini berhasil membuat harimu jadi jauh lebih hangat dan menyenangkan yaa! 🤍✨'
    ],
    defaultClosing: 'Dari seseorang yang selalu menyayangimu 🤍',
    coupons: [
      {
        id: 's-secret',
        title: 'Kupon 1 Permintaan Rahasia Bebas 👑',
        icon: '👑',
        description: 'Kamu boleh meminta apa saja yang wajar tanpa penolakan, wajib kukabulkan dengan senang hati!',
        tag: 'Kejutan #1'
      },
      {
        id: 's-drive',
        title: 'Kupon Jalan-Jalan Sore & Es Krim 🍦',
        icon: '🍦',
        description: 'Menyusuri jalan sore santai sambil mendengarkan musik favorit dan menikmati es krim berdua.',
        tag: 'Kejutan #2'
      },
      {
        id: 's-listen',
        title: 'Kupon Teman Ngobrol 24 Jam Penuh 🌙',
        icon: '🌙',
        description: 'Siap menemanimu ngobrol sampai larut malam tentang apa saja yang ada di kepalamu.',
        tag: 'Kejutan #3'
      }
    ]
  },
};

// Data default awal
export const defaultGiftCustomData: GiftCustomData = {
  occasion: 'birthday',
  recipientName: 'Bidadari Cantik',
  petName: 'Sayanggg',
  senderName: 'Seseorang yang Mengagumimu',
  milestoneNumber: 21,
  photoUrl: '/cake.jpg',
  photoCaption: 'Senyuman manismu yang selalu membawa keceriaan di setiap hari ✨',
  greetingTitle: occasionPresets.birthday.defaultGreeting,
  storyMessages: occasionPresets.birthday.defaultStory,
  closingSignature: occasionPresets.birthday.defaultClosing,
  selectedCoupons: occasionPresets.birthday.coupons.slice(0, 3),
  bgmUrl: '/bgm.mp3',
  senderWhatsApp: '628123456789',
};

// Konfigurasi Bisnis Komersial
export const platformCommerce = {
  priceRupiah: 15000,
  formattedPrice: 'Rp 15.000',
  serviceName: 'Kado & Kartu Digital Interaktif Eksklusif',
  qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021126580014ID.LINKAJA.WWW01189360091400000000005204581253033605802ID5913Kado%20Digital6007Jakarta61051234062070703A016304E8A2',
  adminWhatsApp: '628123456789', // Nomor WhatsApp admin
  demoPromoCode: 'GRATIS', // Kode promo uji coba
};
