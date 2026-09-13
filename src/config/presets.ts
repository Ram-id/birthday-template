import { GiftExperience, OccasionType, ThemeVibe } from '../types/gift';

export interface ThemeConfig {
  id: ThemeVibe;
  name: string;
  bgGradient: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
  gold: string;
}

export const themePresets: Record<ThemeVibe, ThemeConfig> = {
  'editorial-rose': {
    id: 'editorial-rose',
    name: 'Editorial Rose',
    bgGradient: 'from-[#FDFBF7] via-[#F8EFEA] to-[#F2DFD7]',
    cardBg: 'bg-white/85',
    textPrimary: '#3A1E1C',
    textSecondary: '#7A5A57',
    accent: '#E8A598',
    border: '#EADBCE',
    gold: '#D4AF37',
  },
  'warm-champagne': {
    id: 'warm-champagne',
    name: 'Warm Champagne',
    bgGradient: 'from-[#FFFDF9] via-[#FAF4EA] to-[#F3E7D3]',
    cardBg: 'bg-white/90',
    textPrimary: '#382618',
    textSecondary: '#786250',
    accent: '#D99B6A',
    border: '#E8DCB8',
    gold: '#C49826',
  },
  'midnight-sky': {
    id: 'midnight-sky',
    name: 'Midnight Starlight',
    bgGradient: 'from-[#0D1117] via-[#161B22] to-[#21262D]',
    cardBg: 'bg-[#1C2128]/85',
    textPrimary: '#F0F6FC',
    textSecondary: '#8B949E',
    accent: '#F2A365',
    border: '#30363D',
    gold: '#FFD700',
  },
  'botanical-sage': {
    id: 'botanical-sage',
    name: 'Botanical Sage',
    bgGradient: 'from-[#F9FAF8] via-[#EFF2EC] to-[#DEE4D8]',
    cardBg: 'bg-white/85',
    textPrimary: '#233022',
    textSecondary: '#576B55',
    accent: '#8AA082',
    border: '#CDD6C8',
    gold: '#B38F4D',
  },
};

export const defaultGiftExperiences: Record<OccasionType, GiftExperience> = {
  // 1. ULANG TAHUN (BIRTHDAY)
  birthday: {
    id: 'preset-birthday',
    title: 'Perayaan Ulang Tahun',
    occasion: 'birthday',
    theme: 'editorial-rose',
    recipientName: 'Si Manis',
    petName: 'Sayangku',
    senderName: 'Teman Spesialmu',
    coverTitle: 'Sebuah Persembahan Untuk Hari Bahagiamu ✨',
    coverSubtitle: 'Sebuah ruang hangat penuh doa dan kenangan yang kurangkai khusus untukmu.',
    letterTitle: 'Selamat Bertambah Usia, Manisku 🎂🤍',
    letterParagraphs: [
      'Hari ini adalah hari yang begitu istimewa, karena tepat pada hari ini, dunia dihadiahi seseorang sehangat dan seindah dirimu.',
      'Tanpa terasa, satu tahun penuh langkah, cerita, dan tawa telah kita lalui bersama. Setiap momen bersamamu selalu menjadi bagian terindah dalam hariku.',
      'Di usiamu yang baru ini, semoga setiap langkahmu dipeluk kemudahan oleh Tuhan, senyuman manismu tidak pernah pudar, serta seluruh impian dan cita-citamu terkabul satu per satu.',
      'Terima kasih telah hadir dan mewarnai duniaku. Selamat Ulang Tahun yaa sayang! 🤍✨'
    ],
    letterClosing: 'Dengan segenap cinta & doa tulus selamanya 🤍',
    photos: [
      {
        id: 'p1',
        url: '/cake.jpg',
        caption: 'Senyuman manismu yang selalu berhasil membuat hariku lebih cerah 🌻',
        date: 'Kenangan Manis',
      },
      {
        id: 'p2',
        url: '/memory-2.jpg',
        caption: 'Tetaplah mekar dan bersinar indah dengan caramu sendiri ✨',
        date: 'Momen Berharga',
      }
    ],
    momentType: 'cake',
    momentTitle: 'Tiup Lilin & Panjatkan Harapan 🎂',
    momentDescription: 'Gores korek api, pejamkan mata sejenak, buat permohonan tulus dalam hati, lalu tiup lilinnya yaa...',
    milestoneNumber: 21,
    bgmUrl: '/bgm.mp3',
    senderWhatsApp: '',
  },

  // 2. ANNIVERSARY
  anniversary: {
    id: 'preset-anniversary',
    title: 'Perayaan Anniversary',
    occasion: 'anniversary',
    theme: 'warm-champagne',
    recipientName: 'Kekasih Hatiku',
    petName: 'Teman Hidupku',
    senderName: 'Pasanganmu',
    coverTitle: 'Kilas Balik Perjalanan Cinta Kita 💍',
    coverSubtitle: 'Menatap kembali hari-hari indah yang telah kita rajut bersama.',
    letterTitle: 'Happy Anniversary, Sayangku 🤍✨',
    letterParagraphs: [
      'Hari berganti hari, musim berganti waktu, dan rasa syukurku kepadamu justru semakin tumbuh lebih dalam dari sebelumnya.',
      'Terima kasih telah memilihku sebagai teman berbagi tawa, keluh kesah, mimpi-mimpi besar, dan masa depan.',
      'Setiap detik bersamamu adalah bab terindah dalam hidupku yang selalu ingin kubaca berulang kali tanpa rasa bosan.',
      'Semoga cinta, kesabaran, dan ketulusan ini senantiasa bertumbuh semakin kokoh dan saling melengkapi di tahun-tahun mendatang.'
    ],
    letterClosing: 'Selamanya milikmu dengan segenap jiwa 🤍',
    photos: [
      {
        id: 'p1',
        url: '/memory-1.jpg',
        caption: 'Langkah pertama yang membawa kita berjalan berdampingan hingga hari ini 🤍',
        date: 'Awal Pertemuan',
      },
      {
        id: 'p2',
        url: '/memory-3.jpg',
        caption: 'Tawa lepas bersamamu yang tidak akan pernah tergantikan oleh apa pun ✨',
        date: 'Momen Berdua',
      }
    ],
    momentType: 'milestone',
    momentTitle: 'Perjalanan 730 Hari Bersamamu 💍',
    momentDescription: 'Setiap hari yang kita lalui adalah anugerah terindah yang senantiasa kurawat dengan segenap cinta.',
    milestoneNumber: 2,
    bgmUrl: '/bgm.mp3',
    senderWhatsApp: '',
  },

  // 3. APOLOGY
  apology: {
    id: 'preset-apology',
    title: 'Surat Permintaan Maaf Tulus',
    occasion: 'apology',
    theme: 'botanical-sage',
    recipientName: 'Orang Baik',
    petName: 'Sayangku',
    senderName: 'Aku yang Menyesal',
    coverTitle: 'Dari Lubuk Hatiku yang Terdalam... 🕊️',
    coverSubtitle: 'Sebuah ungkapan penyesalan dan harapan untuk merawat kembali senyummu.',
    letterTitle: 'Maafkan Aku, Manisku... 🤍',
    letterParagraphs: [
      'Aku menulis surat ini dengan segenap kerendahan hati dan penyesalan yang teramat dalam.',
      'Aku menyadari bahwa perkataan atau tindakanku kemarin telah melukai hatimu yang begitu lembut. Melihatmu sedih atau kecewa adalah hal terakhir yang pernah kuinginkan di dunia ini.',
      'Maafkan keegoisanku, maafkan kecerobohanku yang belum mampu memahamimu dengan baik saat itu.',
      'Kehadiranmu terlalu berharga untuk kubiarkan renggang oleh ego sesaat. Aku berjanji akan belajar menjadi sosok yang lebih baik dan lebih sabar untukmu.'
    ],
    letterClosing: 'Dengan penyesalan tulus & janji berbenah 🤍',
    photos: [
      {
        id: 'p1',
        url: '/memory-2.jpg',
        caption: 'Senyuman hangatmu yang selalu ingin kujaga dan kurawat selamanya 🌿',
        date: 'Kenangan Damai',
      }
    ],
    momentType: 'scratch',
    momentTitle: 'Sebuah Janji Tulus Untukmu 🕊️',
    momentDescription: 'Sentuh atau usap kotak rahasia di bawah ini untuk membaca janji dari lubuk hatiku...',
    secretMessage: 'Aku berjanji akan selalu mendengar tanpa menyela, memeluk saat kamu lelah, dan tidak akan pernah membiarkan amarah merusak kehangatan kita lagi 🤍',
    bgmUrl: '/bgm.mp3',
    senderWhatsApp: '',
  },

  // 4. GRATITUDE
  gratitude: {
    id: 'preset-gratitude',
    title: 'Surat Apresiasi & Terima Kasih',
    occasion: 'gratitude',
    theme: 'warm-champagne',
    recipientName: 'Sahabat Terbaikku',
    petName: 'Sahabatku',
    senderName: 'Teman Baikmu',
    coverTitle: 'Terima Kasih Atas Segala Kebaikan & Ketulusanmu 💐',
    coverSubtitle: 'Sebuah ungkapan terima kasih mendalam yang seringkali tak terucap.',
    letterTitle: 'Untuk Sosok yang Selalu Menginspirasiku 💐🤍',
    letterParagraphs: [
      'Ada begitu banyak hal dalam hidup ini yang seringkali luput kusampaikan dengan kata-kata langsung.',
      'Salah satu yang paling utama adalah betapa besarnya rasa syukur dan terima kasihku atas setiap kasih sayang, doa malam, dan pengorbanan tanpa batas yang senantiasa kamu berikan.',
      'Kebaikan dan ketulusanmu telah menjadi pelita yang menerangi langkah-langkahku saat dunia terasa berat.',
      'Semoga segala kebaikan yang kamu taburkan senantiasa berbalik melimpah ruah ke dalam hidupmu dengan beribu kebahagiaan dan kesehatan.'
    ],
    letterClosing: 'Dengan rasa syukur & hormat mendalam selamanya 🤍',
    photos: [
      {
        id: 'p1',
        url: '/memory-1.jpg',
        caption: 'Pelukan paling hangat dan rumah paling tenang yang selalu kurindukan 💐',
        date: 'Kasih Abadi',
      }
    ],
    momentType: 'bouquet',
    momentTitle: 'Buket Rasa Syukur Untukmu 💐',
    momentDescription: 'Kado kecil ini adalah simbol dari rasa terima kasih yang tak terhingga atas setiap jejak kebaikanmu.',
    bgmUrl: '/bgm.mp3',
    senderWhatsApp: '',
  },

  // 5. SURPRISE
  surprise: {
    id: 'preset-surprise',
    title: 'Kejutan Manis Tanpa Alasan',
    occasion: 'surprise',
    theme: 'editorial-rose',
    recipientName: 'Bintang Hatiku',
    petName: 'Si Manis',
    senderName: 'Pengagum Rahasiamu',
    coverTitle: 'Hanya Ingin Mengingatkan Betapa Berharganya Dirimu ✨',
    coverSubtitle: 'Sebuah kejutan kecil di hari biasa untuk mengukir senyuman di wajahmu.',
    letterTitle: 'Sebuah Surat Manis Untukmu ✨🤍',
    letterParagraphs: [
      'Kita tidak selalu memerlukan hari raya atau tanggal khusus untuk mengingatkan satu sama lain betapa berharganya keberadaan seseorang.',
      'Terkadang, hari biasa justru menjadi hari terbaik untuk mengirimkan seberkas kehangatan dan senyuman.',
      'Aku hanya ingin kamu tahu, bahwa di tengah riuh dan lelahnya kesibukanmu, ada aku yang selalu bangga dan mengagumi kerja keras serta ketulusanmu.',
      'Tetaplah bersinar dengan caramu sendiri, jaga kesehatanmu, dan jangan lupa tersenyum manis hari ini yaa!'
    ],
    letterClosing: 'Dari seseorang yang selalu mengagumimu 🤍',
    photos: [
      {
        id: 'p1',
        url: '/memory-3.jpg',
        caption: 'Semoga kejutan kecil ini berhasil membuat harimu terasa lebih manis ✨',
        date: 'Hari Spesial Ini',
      }
    ],
    momentType: 'scratch',
    momentTitle: 'Pesan Rahasia Tersembunyi ✨🎁',
    momentDescription: 'Sentuh kotak misteri ini untuk membuka pesan kejutan rahasia khusus untukmu...',
    secretMessage: 'Weekend ini, luangkan waktumu yaa... Aku sudah menyiapkan kencan kejutan spesial ke tempat yang paling ingin kamu kunjungi! 🎬🍿✨',
    bgmUrl: '/bgm.mp3',
    senderWhatsApp: '',
  },
};
