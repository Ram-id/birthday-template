/**
 * 🎂 BIRTHDAY APP TEMPLATE CONFIGURATION
 * -------------------------------------------------------------
 * File ini adalah pusat pengaturan semua konten di website ulang tahun ini.
 * Kamu bisa mengubah nama, umur, pesan, foto, musik, dan kado di sini dengan sangat mudah!
 *
 * This file is the central configuration for all website content.
 * You can easily customize names, age, messages, photos, music, and gifts here!
 */

export interface PhotoMemory {
  url: string;
  caption: string;
  tag?: string;
}

export interface BirthdayConfig {
  // Informasi Utama / General Info
  recipientName: string;
  petName: string; // Panggilan sayang / julukan lucu
  senderName: string;
  age: number;
  birthDate?: string; // e.g. "12 September"
  bgmUrl: string; // Musik latar (simpan di /public atau link online)

  // Pengaturan Babak Kue & Lilin / Cake Celebration Stage
  celebration: {
    greeting: string;
    subGreeting: string;
    cakeMessage: string;
    blowSuccessMessage: string;
    cakeImage?: string; // default: "/cake.jpg"
  };

  // Pengaturan Babak Surat / Letter Stage (Kinetic Typography)
  letter: {
    title: string;
    storyMessages: string[];
    closing: string;
    signature: string;
  };

  // Pengaturan Kado-Kado / Virtual Gift Vault
  gifts: {
    photoAlbum: {
      enabled: boolean;
      tag: string;
      title: string;
      subtitle: string;
      coverImage: string;
      photos: PhotoMemory[];
      storyNote?: string;
    };
    voiceNote: {
      enabled: boolean;
      tag: string;
      title: string;
      subtitle: string;
      audioUrl: string;
      introText: string;
      notes: string[];
    };
    videoMessage: {
      enabled: boolean;
      tag: string;
      title: string;
      subtitle: string;
      videoUrl: string; // Bisa link YouTube (e.g. "https://youtu.be/...") atau file video langsung ("/video.mp4")
      caption: string;
    };
    surpriseLink: {
      enabled: boolean;
      tag: string;
      title: string;
      subtitle: string;
      url: string;
      iconEmoji: string;
      description: string;
      buttonText: string;
    };
  };

  // Pengaturan Balasan WhatsApp / WhatsApp Reply Action
  whatsapp: {
    enabled: boolean;
    buttonText: string;
    phoneNumber?: string; // Optional: Format 628123456789 (kosongkan jika ingin membuka selector kontak WA)
    messageTemplate: string;
  };
}

export const defaultBirthdayConfig: BirthdayConfig = {
  recipientName: "Bidadari Cantik",
  petName: "Sayanggg",
  senderName: "Seseorang yang Mengagumimu",
  age: 20,
  birthDate: "Hari Bahagia Ini",
  bgmUrl: "/bgm.mp3",

  // 1. Kue Ulang Tahun & Lilin Interaktif
  celebration: {
    greeting: "Selamat Ulang Tahun, Manisku! 🎂✨",
    subGreeting: "Hari ini adalah hari yang istimewa karena dunia dihadiahi seseorang sehangat dan seindah dirimu.",
    cakeMessage: "Nyalakan lilin, pejamkan mata sejenak, panjatkan harapan terbaikmu, lalu tiup lilinnya yaa... 🕯️💨",
    blowSuccessMessage: "✨ Lilin berhasil ditiup! Semoga setiap doa dan impian indahmu terkabul dengan manis! ✨",
    cakeImage: "/cake.jpg",
  },

  // 2. Surat Kinetik Berjalan (Kinetic Typography Letter)
  letter: {
    title: "Surat Kecil Dari Lubuk Hati 💌",
    storyMessages: [
      "Hari ini...",
      "terasa begitu indah dan berbeda dari hari-hari lainnya.",
      "Tanpa terasa...",
      "satu tahun penuh perjalanan telah terlewati",
      "dalam kedipan mata.",
      "Namun tahukah kamu?",
      "Hari ini adalah salah satu anugerah terindah,",
      "karena tepat di hari ini, kamu dilahirkan ke dunia 🤍",
      "Selamat bertambah usia yaa manisku...",
      "Semoga langkahmu selalu dipeluk keberkahan,",
      "semakin bertambah ilmu dan kedewasaanmu,",
      "diberikan kesehatan dan ketenangan jiwa selalu,",
      "dan semoga senyuman manis di wajahmu itu tidak pernah pudar ✨",
      "Terima kasih sudah hadir di dunia ini.",
      "Terima kasih atas segala tawa, kehangatan, dan ketulusan yang selalu kamu bawa.",
      "Kamu adalah sosok yang begitu berharga.",
      "Sebuah babak baru yang penuh warna kini menantimu.",
      "Jalani dengan penuh keyakinan dan bahagia selalu.",
      "Sekali lagi...",
      "Selamat Ulang Tahun yaa! 🤍✨🎉"
    ],
    closing: "Dari lubuk hati yang terdalam,",
    signature: "Dengan segenap doa & ketulusan 🤍",
  },

  // 3. Ruang Kado Spesial (Virtual Gift Vault)
  gifts: {
    photoAlbum: {
      enabled: true,
      tag: "HADIAH #1 — KENANGAN MANIS",
      title: "Galeri Foto Polaroid 📸",
      subtitle: "Kumpulan senyuman dan momen berharga yang tak lekang oleh waktu",
      coverImage: "/memory-1.jpg",
      photos: [
        {
          url: "/memory-1.jpg",
          caption: "Senyuman manismu yang selalu membawa keceriaan 🌻",
          tag: "Momen 01",
        },
        {
          url: "/memory-2.jpg",
          caption: "Tetaplah bersinar dan menjadi mentari bagi sekitarmu ✨",
          tag: "Momen 02",
        },
        {
          url: "/memory-3.jpg",
          caption: "Semoga kebahagiaan selalu menyertai setiap langkahmu 🤍",
          tag: "Momen 03",
        },
      ],
      storyNote: "Setiap foto menyimpan kehangatan tersendiri. Terima kasih telah selalu menjadi alasan banyak orang tersenyum! 🤍",
    },
    voiceNote: {
      enabled: true,
      tag: "HADIAH #2 — SUARA HATI",
      title: "Pesan Suara & Melodi 🎙️🎶",
      subtitle: "Dengarkan petikan melodi dan untaian doa tulus",
      audioUrl: "/sample-vn.mp3",
      introText: "Pasang earphone atau dengarkan di tempat tenang yaa... Sebuah rekaman melodi sederhana untuk hari bahagiamu.",
      notes: [
        "🎶 Selamat ulang tahun kami ucapkan... 🎶",
        "Semoga di usiamu yang baru ini, kamu senantiasa berada dalam lindungan Tuhan.",
        "Diberikan kemudahan dalam setiap urusan, cita-cita, dan impianmu,",
        "Serta dilimpahkan kebahagiaan yang melimpah ruah hari ini dan selamanya. Aamiin 🤲🤍"
      ],
    },
    videoMessage: {
      enabled: true,
      tag: "HADIAH #3 — BINGKAI SINEMATIK",
      title: "Video Spesial Perjalanan 🎬✨",
      subtitle: "Kompilasi momen dan ucapan hangat dalam bingkai sinematik",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Template placeholder (bisa diubah ke video apa saja)
      caption: "Sebuah video kenangan yang dirangkai khusus untuk memutar kembali senyuman dan tawa manismu.",
    },
    surpriseLink: {
      enabled: true,
      tag: "HADIAH BONUS — KEJUTAN SPESIAL",
      title: "Kapsul Kejutan / Hadiah Tambahan 🎁✨",
      subtitle: "Buka kejutan spesial atau tautan rahasia yang telah disiapkan",
      url: "https://google.com",
      iconEmoji: "✨",
      description: "Klik tautan ini untuk membuka hadiah rahasia atau halaman kejutan tambahan yang sudah dipersiapkan khusus untukmu!",
      buttonText: "Buka Kejutan Spesial ✨",
    },
  },

  // 4. Balasan WhatsApp Langsung
  whatsapp: {
    enabled: true,
    buttonText: "Kirim Pesan Balasan ke WhatsApp 💬",
    phoneNumber: "", // Kosongkan agar bisa kirim ke kontak mana saja, atau isi misal "628123456789"
    messageTemplate: "Makasih banyakkk atas ucapan dan website ulang tahunnya yang manis dan berkesan bangett! Aku terharuu dan bahagia hari ini... 😭🤍✨",
  },
};
