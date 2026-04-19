// AjiStat — Divisi Statistik & Riset Aji Institute
export const BRAND = {
  name: 'AjiStat',
  fullName: 'AjiStat by Aji Institute',
  tagline: 'Konsultasi & Olah Data Statistik Profesional',
  parent: 'Aji Institute',
  legalName: 'PT. Amanah Jñāna Insani',
};

export const CONTACT = {
  whatsapp: '6285195564668',
  whatsappDisplay: '+62 851-9556-4668',
  email: 'info@aji-institute.id',
  address: 'Kompleks Bandung Indah Raya Blok C7 No.1, Kel. Mekarjaya, Kec. Rancasari, Bandung',
};

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.aji-institute.com';

export function WA_LINK(message?: string) {
  return `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export const TOOLS = [
  { name: 'SPSS', color: '#BE1425', logo: '/logos/spss-1.jpg', desc: 'Statistical Package for the Social Sciences. Software analisis statistik paling populer untuk riset akademik.', useFor: 'Uji asumsi, regresi, ANOVA, uji beda, korelasi, crosstab.' },
  { name: 'SmartPLS', color: '#E8A020', logo: '/logos/pls.jpg', desc: 'Software Structural Equation Modeling berbasis Partial Least Squares. Ideal untuk penelitian bisnis dan sosial.', useFor: 'SEM-PLS, CFA, path analysis, mediasi, moderasi.' },
  { name: 'AMOS', color: '#CC2222', logo: '/logos/amos-1.png', desc: 'Analysis of Moment Structures. Software SEM berbasis covariance untuk model pengukuran yang kompleks.', useFor: 'SEM-CB, CFA, path diagram, goodness of fit.' },
  { name: 'R / RStudio', color: '#2266B8', logo: '/logos/r-studio.png', desc: 'Bahasa pemrograman statistik open-source yang sangat powerful dan fleksibel.', useFor: 'Analisis data, visualisasi, machine learning, big data.' },
  { name: 'Python', color: '#3776AB', logo: '/logos/python.png', desc: 'Bahasa pemrograman serbaguna yang kuat untuk data science dan analisis statistik.', useFor: 'Data wrangling, visualisasi, ML, NLP, otomasi analisis.' },
  { name: 'NVivo', color: '#8B0000', logo: '/logos/nvivo-1.png', desc: 'Software analisis data kualitatif (QDA) terkemuka di dunia.', useFor: 'Coding tema, analisis wawancara, FGD, konten media.' },
  { name: 'EViews', color: '#005A9C', logo: '/logos/EViews-1.jpeg', desc: 'Software ekonometri untuk analisis data time series dan cross-section.', useFor: 'Regresi panel data, ARIMA, VAR, VECM, uji stasioneritas.' },
  { name: 'STATA', color: '#1A5276', logo: '/logos/stata.png', desc: 'Software statistik profesional yang banyak digunakan di bidang ekonomi dan kesehatan.', useFor: 'Regresi, panel data, survival analysis, survei data.' },
  { name: 'LISREL', color: '#444444', logo: '/logos/lisrel-1.jpeg', desc: 'Pioneer software SEM berbasis covariance yang banyak dipakai di riset psikologi dan sosial.', useFor: 'CFA, SEM-CB, path analysis, multitrait-multimethod.' },
  { name: 'Excel', color: '#217346', logo: '/logos/excel-logo.png', desc: 'Microsoft Excel — spreadsheet paling banyak digunakan untuk analisis data dasar dan visualisasi.', useFor: 'Tabulasi data, pivot table, chart, statistik deskriptif.' },
];

// ─── Program Data ─────────────────────────────────────────────────────────────

export interface Program {
  id: number;
  type: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: number;
  originalPrice: number;
  tags: string[];
  facilitator: string;
  facilitatorBio?: string;
  curriculum?: string[];
  status?: string;
  previewVideo?: string;
}

export const ALL_PROGRAMS: Program[] = [
  {
    id: 1, type: 'bootcamp', slug: 'bootcamp-analisis-spss',
    title: 'Bootcamp Analisis Data dengan SPSS: Dari Dasar hingga Mahir',
    description: 'Program bootcamp intensif yang membekali peserta dengan kemampuan analisis data menggunakan SPSS secara komprehensif. Cocok untuk mahasiswa S1, S2, maupun peneliti yang ingin menguasai statistik kuantitatif untuk keperluan skripsi, tesis, atau publikasi ilmiah.',
    duration: '4 Hari (8 Sesi Live Zoom)', price: 350000, originalPrice: 700000,
    tags: ['SPSS', 'Kuantitatif', 'Olah Data'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015. Telah mendampingi 5.000+ klien dari berbagai universitas dan institusi.',
    status: 'Akan dilaksanakan', previewVideo: '/videos/video-preview-pelatihan-spss.mp4',
    curriculum: ['Pengenalan SPSS & Input Data', 'Statistik Deskriptif & Eksplorasi Data', 'Uji Normalitas & Asumsi Klasik', 'Uji Beda (T-Test, ANOVA, Mann-Whitney)', 'Analisis Korelasi & Regresi Linear', 'Regresi Berganda & Interpretasi', 'Analisis Faktor & Reliabilitas', 'Presentasi Hasil & Penulisan Laporan'],
  },
  {
    id: 2, type: 'bootcamp', slug: 'bootcamp-smartpls',
    title: 'Bootcamp SmartPLS: Structural Equation Modeling untuk Riset',
    description: 'Pelajari teknik Partial Least Square – Structural Equation Modeling (PLS-SEM) menggunakan SmartPLS. Ideal untuk peneliti manajemen, ekonomi, dan ilmu sosial yang ingin membuktikan hubungan antar variabel laten dalam penelitiannya.',
    duration: '3 Hari (6 Sesi Live Zoom)', price: 400000, originalPrice: 800000,
    tags: ['SmartPLS', 'SEM', 'Kuantitatif'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Akan dilaksanakan',
    curriculum: ['Pengantar SEM & PLS-SEM', 'Instalasi & Navigasi SmartPLS', 'Membangun Model Pengukuran (Outer Model)', 'Uji Validitas Konvergen & Diskriminan', 'Membangun Model Struktural (Inner Model)', 'Uji Hipotesis & Bootstrapping', 'Mediasi & Moderasi dalam PLS-SEM', 'Pelaporan Hasil dan Penulisan Bab Analisis'],
  },
  {
    id: 3, type: 'bootcamp', slug: 'bootcamp-rstudio',
    title: 'Bootcamp R Studio: Analisis Statistika Lanjutan untuk Peneliti',
    description: 'Kuasai R dan R Studio untuk analisis statistik lanjutan: dari eksplorasi data, regresi, hingga visualisasi publikasi. Program ini dirancang untuk peneliti dan akademisi yang ingin beralih ke software statistik open-source terkuat di dunia.',
    duration: '5 Hari (10 Sesi Live Zoom)', price: 450000, originalPrice: 900000,
    tags: ['R', 'R Studio', 'Data Science'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Akan dilaksanakan',
    curriculum: ['Instalasi R & R Studio, pengenalan sintaks dasar', 'Import & manipulasi data dengan tidyverse', 'Statistik deskriptif & eksplorasi data', 'Visualisasi data dengan ggplot2', 'Uji asumsi & non-parametrik', 'Regresi linear & logistik', 'Analisis multivariat (PCA, Cluster)', 'Membuat laporan dinamis dengan R Markdown', 'Studi kasus skripsi/tesis', 'Presentasi & evaluasi proyek akhir'],
  },
  {
    id: 4, type: 'private-class', slug: 'private-analisis-spss',
    title: 'Private Class Analisis Data dengan SPSS: Dari Dasar hingga Mahir',
    description: 'Pendampingan intensif 1-on-1 untuk menguasai analisis data menggunakan SPSS. Jadwal fleksibel disesuaikan kebutuhan mahasiswa S1, S2, dan peneliti untuk keperluan skripsi, tesis, atau publikasi ilmiah.',
    duration: '4 Sesi (Sesuai Perjanjian)', price: 350000, originalPrice: 700000,
    tags: ['SPSS', 'Kuantitatif', 'Olah Data'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Tersedia',
    curriculum: ['Pengenalan SPSS & Input Data', 'Statistik Deskriptif & Eksplorasi Data', 'Uji Normalitas & Asumsi Klasik', 'Uji Beda (T-Test, ANOVA, Mann-Whitney)', 'Analisis Korelasi & Regresi Linear', 'Regresi Berganda & Interpretasi', 'Analisis Faktor & Reliabilitas', 'Presentasi Hasil & Penulisan Laporan'],
  },
  {
    id: 5, type: 'private-class', slug: 'private-smartpls',
    title: 'Private Class SmartPLS: Structural Equation Modeling untuk Riset',
    description: 'Belajar PLS-SEM menggunakan SmartPLS secara privat 1-on-1. Ideal untuk peneliti manajemen, ekonomi, dan ilmu sosial yang membutuhkan pendampingan intensif dengan jadwal yang fleksibel.',
    duration: '3 Sesi (Sesuai Perjanjian)', price: 400000, originalPrice: 800000,
    tags: ['SmartPLS', 'SEM', 'Kuantitatif'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Tersedia',
    curriculum: ['Pengantar SEM & PLS-SEM', 'Instalasi & Navigasi SmartPLS', 'Membangun Model Pengukuran (Outer Model)', 'Uji Validitas Konvergen & Diskriminan', 'Membangun Model Struktural (Inner Model)', 'Uji Hipotesis & Bootstrapping', 'Mediasi & Moderasi dalam PLS-SEM', 'Pelaporan Hasil dan Penulisan Bab Analisis'],
  },
  {
    id: 6, type: 'private-class', slug: 'private-rstudio',
    title: 'Private Class R Studio: Analisis Statistika Lanjutan',
    description: 'Kuasai R dan R Studio untuk analisis statistik lanjutan secara privat. Materi disesuaikan 100% dengan kebutuhan dan dataset penelitian Anda.',
    duration: '5 Sesi (Sesuai Perjanjian)', price: 450000, originalPrice: 900000,
    tags: ['R', 'R Studio', 'Data Science'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Tersedia',
    curriculum: ['Instalasi R & R Studio', 'Manipulasi data dengan tidyverse', 'Statistik deskriptif & eksplorasi data', 'Visualisasi data dengan ggplot2', 'Uji asumsi & non-parametrik', 'Regresi linear & logistik', 'Analisis multivariat (PCA, Cluster)', 'Laporan dinamis dengan R Markdown'],
  },
  {
    id: 7, type: 'private-class', slug: 'private-python-data',
    title: 'Private Class Python for Data Analysis: Pandas, NumPy & Visualisasi',
    description: 'Pelajari Python sebagai alat analisis data modern: dari manipulasi data dengan Pandas, analisis statistik dengan NumPy, hingga visualisasi interaktif. Cocok untuk peneliti dan profesional data.',
    duration: '4 Sesi (Sesuai Perjanjian)', price: 475000, originalPrice: 950000,
    tags: ['Python', 'Data Science', 'Visualisasi'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Tersedia',
    curriculum: ['Setup Python & Jupyter Notebook', 'Dasar-dasar Python untuk analisis data', 'Manipulasi data dengan Pandas', 'Komputasi numerik dengan NumPy', 'Visualisasi dengan Matplotlib & Seaborn', 'Statistik deskriptif & inferensial', 'Regresi & machine learning dasar', 'Studi kasus analisis dataset riset'],
  },
  {
    id: 8, type: 'short-class', slug: 'short-uji-instrumen-spss',
    title: 'Short Class: Uji Instrumen Penelitian (Validitas & Reliabilitas) dengan SPSS',
    description: 'Pelajari cara menguji validitas dan reliabilitas instrumen kuesioner menggunakan SPSS dalam satu sesi praktis. Sangat cocok untuk mahasiswa yang sedang menyusun bab metodologi penelitian.',
    duration: '1 Hari (2 Jam Live Zoom)', price: 99000, originalPrice: 250000,
    tags: ['SPSS', 'Validitas', 'Reliabilitas'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Akan dilaksanakan',
    curriculum: ['Konsep validitas & reliabilitas', 'Uji validitas pearson correlation di SPSS', 'Uji reliabilitas Cronbach Alpha', 'Interpretasi hasil & penulisan laporan'],
  },
  {
    id: 9, type: 'short-class', slug: 'short-regresi-spss',
    title: 'Short Class: Regresi Linear Berganda dengan SPSS — Cepat & Tepat',
    description: 'Kuasai analisis regresi linear berganda menggunakan SPSS dalam satu sesi singkat. Dari input data hingga interpretasi output dan penulisan hasil ke laporan penelitian.',
    duration: '1 Hari (3 Jam Live Zoom)', price: 125000, originalPrice: 300000,
    tags: ['SPSS', 'Regresi', 'Kuantitatif'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Akan dilaksanakan',
    curriculum: ['Konsep dasar regresi linear', 'Input & persiapan data di SPSS', 'Uji asumsi klasik (normalitas, heteroskedastisitas, multikolinearitas)', 'Interpretasi output & penulisan hasil'],
  },
  {
    id: 10, type: 'short-class', slug: 'short-visualisasi-python',
    title: 'Short Class: Visualisasi Data Penelitian dengan Python (Matplotlib & Seaborn)',
    description: 'Buat visualisasi data yang menarik dan publication-ready menggunakan Python. Cocok untuk peneliti dan mahasiswa yang ingin mempercantik tampilan data di jurnal atau laporan penelitian.',
    duration: '1 Hari (2 Jam Live Zoom)', price: 99000, originalPrice: 250000,
    tags: ['Python', 'Visualisasi', 'Data Science'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Akan dilaksanakan',
    curriculum: ['Setup Python & library visualisasi', 'Chart dasar: bar, line, scatter, histogram', 'Kustomisasi warna, font, dan layout', 'Export gambar berkualitas tinggi untuk publikasi'],
  },
  {
    id: 11, type: 'short-class', slug: 'short-penulisan-artikel',
    title: 'Short Class: Teknik Penulisan Artikel Ilmiah Terindeks Scopus & Sinta',
    description: 'Pelajari strategi dan teknik penulisan artikel ilmiah yang berpeluang besar diterima di jurnal terindeks Scopus dan Sinta. Dari struktur IMRaD hingga cover letter dan submission.',
    duration: '1 Hari (3 Jam Live Zoom)', price: 150000, originalPrice: 350000,
    tags: ['Penulisan Ilmiah', 'Scopus', 'Sinta'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Sedang Berlangsung',
    curriculum: ['Struktur artikel ilmiah: IMRaD', 'Menulis abstrak yang kuat & menarik', 'Tips submit ke jurnal Scopus & Sinta', 'Review & revisi: cara merespons reviewer'],
  },
  {
    id: 12, type: 'short-class', slug: 'short-statistika-dasar',
    title: 'Short Class: Statistika Dasar untuk Pemula — Mahir dalam 1 Hari',
    description: 'Program satu hari yang dirancang khusus bagi pemula yang ingin memahami konsep-konsep dasar statistika: dari mean, median, modus, distribusi data, hingga interpretasi hasil yang benar.',
    duration: '1 Hari (2 Jam Live Zoom)', price: 99000, originalPrice: 250000,
    tags: ['Statistika Dasar', 'Pemula'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015.',
    status: 'Akan dilaksanakan',
    curriculum: ['Pengertian & jenis-jenis data', 'Ukuran pemusatan: mean, median, modus', 'Ukuran penyebaran: varians, standar deviasi', 'Distribusi data & interpretasi grafik'],
  },
  {
    id: 13, type: 'bootcamp', slug: 'bootcamp-nvivo',
    title: 'Bootcamp NVivo: Analisis Data Kualitatif Komprehensif',
    description: 'Kuasai analisis data kualitatif menggunakan NVivo secara mendalam. Dari pengkodean tema, analisis naratif, hingga triangulasi mixed methods. Cocok untuk mahasiswa S2/S3 dan peneliti yang menggunakan pendekatan kualitatif atau mixed methods.',
    duration: '3 Hari (6 Sesi Live Zoom)', price: 400000, originalPrice: 750000,
    tags: ['NVivo', 'Kualitatif', 'Mixed Methods'], facilitator: 'Aji Pamoso, S.Si, M.T',
    facilitatorBio: 'Pendiri AjiStat, pakar statistik dan metodologi penelitian berpengalaman sejak 2015. Telah mendampingi 5.000+ klien dari berbagai universitas dan institusi.',
    status: 'Akan dilaksanakan', previewVideo: '/videos/video-preview-nvivo.mp4',
    curriculum: ['Pengantar analisis kualitatif & NVivo', 'Import data: wawancara, dokumen, media', 'Membuat node & melakukan koding', 'Analisis tema & kategori', 'Query & visualisasi data kualitatif', 'Triangulasi mixed methods', 'Menulis laporan hasil analisis kualitatif'],
  },
];

export const BOOTCAMP_PROGRAMS = ALL_PROGRAMS.filter(p => p.type === 'bootcamp');
export const PRIVATE_PROGRAMS = ALL_PROGRAMS.filter(p => p.type === 'private-class');
export const SHORT_CLASS_PROGRAMS = ALL_PROGRAMS.filter(p => p.type === 'short-class');

export function getProgramBySlug(slug: string): Program | undefined {
  return ALL_PROGRAMS.find(p => p.slug === slug);
}

// ─── Topics & Target Market ───────────────────────────────────────────────────

export const TOPICS = [
  'Validitas & Reliabilitas',
  'MSI',
  'Analisis Regresi (Anreg)',
  'Korelasi',
  'Design Experiment',
  'SEM (PLS/AMOS)',
  'Statistika Nonparametrik',
  'Analisis Faktor',
  'MDS',
  'PCA',
  'Cluster Analysis',
  'Path Analysis',
  'Service Quality',
  'Time Series',
  'Teknik Sampling',
  'Statistik Deskriptif',
  'Conjoint Analysis',
  'Uji Hipotesis',
  'Mediasi & Moderasi',
  'ANOVA',
  'Uji Beda',
  'NVivo (Kualitatif)',
  'Content Analysis',
];

export const FIELDS = [
  {
    name: 'Manajemen', sub: 'SDM, Pemasaran, Keuangan, Produksi', color: '#1B3A8C',
    desc: 'Analisis data untuk penelitian bisnis dan manajemen dengan berbagai model terapan.',
    examples: ['Analisis Kinerja Karyawan (SDM)', 'Pengaruh Promosi terhadap Penjualan (Pemasaran)', 'Analisis Laporan Keuangan', 'Structural Equation Modeling (SEM) untuk Perilaku Konsumen']
  },
  {
    name: 'Kesehatan', sub: 'Kedokteran, Keperawatan, Kebidanan', color: '#059669',
    desc: 'Pengolahan data medis, uji klinis, dan survei kesehatan masyarakat dengan standar bio-statistik.',
    examples: ['Uji Efektivitas Obat/Terapi', 'Analisis Faktor Risiko Penyakit', 'Uji Validitas Instrumen Kuesioner Medis', 'Analisis Survival & Epidemiologi']
  },
  {
    name: 'MIPA', sub: 'Matematika, Biologi, Kimia, Fisika', color: '#0284C7',
    desc: 'Analisis statistik presisi tinggi untuk eksperimen laboratorium dan pemodelan matematis.',
    examples: ['Design of Experiments (DOE)', 'Analisis Varians (ANOVA) Multivariat', 'Time Series & Peramalan', 'Uji Asumsi Klasik Ekstensif']
  },
  {
    name: 'Pertanian', sub: 'Agribisnis, Peternakan, Kehutanan', color: '#65A30D',
    desc: 'Pendampingan olah data untuk percobaan lapangan (Rancangan Acak Lengkap/Kelompok) dan studi sosial ekonomi pertanian.',
    examples: ['Rancangan Percobaan (RAL, RAK)', 'Analisis Rantai Pasok Agribisnis', 'Kelayakan Usaha Tani', 'Uji Lanjut (Duncan, BNT, Tukey)']
  },
  {
    name: 'Komunikasi', sub: 'Media, Humas, Jurnalistik', color: '#D97706',
    desc: 'Analisis riset media, opini publik, dan efektivitas komunikasi massa atau korporat.',
    examples: ['Analisis Isi (Content Analysis)', 'Uji Efektivitas Kampanye PR', 'Analisis Jaringan Komunikasi', 'Survei Kepuasan Audiens']
  },
  {
    name: 'Psikologi', sub: 'Klinis, Industri, Pendidikan', color: '#7C3AED',
    desc: 'Uji psikometri dan analisis multivariat kompleks untuk mengukur konstruk psikologis.',
    examples: ['Validitas & Reliabilitas Alat Ukur', 'Analisis Faktor (CFA & EFA)', 'Uji Mediasi & Moderasi', 'Path Analysis & SEM']
  },
];

export const TARGET_MARKET = [
  {
    key: 's1', label: 'Mahasiswa S1', desc: 'Skripsi & tugas akhir', icon: 'S1',
    packages: [
      { name: 'Konsultasi Cepat', price: 'Mulai Rp 50.000', detail: 'Konsultasi singkat 1 jam via WA/Zoom untuk pertanyaan spesifik tentang metode atau hasil analisis.' },
      { name: 'Short Class Statistik', price: 'Mulai Rp 75.000', detail: 'Kelas singkat 2–3 jam untuk menguasai satu software/topik, cocok sebelum sidang atau submit laporan.' },
      { name: 'Paket Skripsi Lengkap', price: 'Mulai Rp 200.000', detail: 'Pendampingan menyeluruh dari pemilihan metode, olah data, interpretasi, hingga penulisan BAB IV & V.' },
    ],
  },
  {
    key: 's2', label: 'Mahasiswa S2', desc: 'Tesis & penelitian magister', icon: 'S2',
    packages: [
      { name: 'Konsultasi Metodologi', price: 'Mulai Rp 100.000', detail: 'Konsultasi intensif untuk pemilihan metode yang tepat, desain penelitian, dan interpretasi hasil tesis.' },
      { name: 'Kelas Privat SEM/PLS', price: 'Mulai Rp 150.000', detail: 'Pendampingan personal untuk menguasai SEM-PLS, SEM-AMOS, atau metode lanjutan lainnya.' },
      { name: 'Paket Tesis Komprehensif', price: 'Mulai Rp 500.000', detail: 'Layanan lengkap dari reviu proposal hingga analisis final. Termasuk sesi tanya jawab tak terbatas selama proses.' },
    ],
  },
  {
    key: 's3', label: 'Mahasiswa S3', desc: 'Disertasi & riset doktoral', icon: 'S3',
    packages: [
      { name: 'Konsultasi Expert', price: 'Mulai Rp 200.000', detail: 'Konsultasi mendalam dengan pakar statistik untuk desain riset doktoral yang kompleks dan valid.' },
      { name: 'Pendampingan Disertasi', price: 'Negosiasi', detail: 'Program pendampingan jangka panjang dari awal hingga seminar hasil, termasuk persiapan publikasi jurnal.' },
      { name: 'Mixed Methods Intensif', price: 'Mulai Rp 300.000', detail: 'Khusus riset campuran kuantitatif + kualitatif, termasuk NVivo, triangulasi data, dan penulisan hasil.' },
    ],
  },
  {
    key: 'peneliti', label: 'Peneliti', desc: 'Riset akademik & publikasi', icon: 'RES',
    packages: [
      { name: 'Konsultasi Publikasi', price: 'Mulai Rp 150.000', detail: 'Bantuan analisis data untuk keperluan submit ke jurnal ilmiah nasional/internasional.' },
      { name: 'Olah Data Mandiri', price: 'Mulai Rp 100.000', detail: 'Pendampingan olah data riset dengan software pilihan Anda, termasuk visualisasi dan laporan.' },
    ],
  },
  {
    key: 'dosen', label: 'Dosen', desc: 'Penelitian & pengabdian', icon: 'DOC',
    packages: [
      { name: 'Workshop Singkat', price: 'Mulai Rp 200.000', detail: 'Workshop statistik 1 hari untuk tim dosen atau mahasiswa binaan. Bisa diselenggarakan di kampus.' },
      { name: 'In-House Training', price: 'Hubungi Kami', detail: 'Pelatihan eksklusif di lingkungan kampus untuk dosen atau tim peneliti, disesuaikan kebutuhan institusi.' },
    ],
  },
  {
    key: 'perusahaan', label: 'Perusahaan', desc: 'Riset pasar & data bisnis', icon: 'ORG',
    packages: [
      { name: 'Analisis Riset Pasar', price: 'Negosiasi', detail: 'Analisis data survei, customer satisfaction, atau riset pasar perusahaan Anda secara profesional.' },
      { name: 'Corporate Training', price: 'Hubungi Kami', detail: 'Pelatihan analisis data untuk tim divisi riset/marketing perusahaan. Program bisa disesuaikan kebutuhan.' },
    ],
  },
];
