// Konstanta global untuk seluruh aplikasi Aji Institute
export const BRAND = {
  name: 'Aji Institute',
  legalName: 'PT. Amanah Jñāna Insani',
  tagline: 'Pelatihan │ Pengembangan Kompetensi │ Konsultasi Profesional',
  taglineSub: 'Center for Research, Data, and Professional Development',
  footerLabel: 'Aji Institute by PT. Amanah Jñāna Insani',
}

export const CONTACT = {
  whatsapp: '6285892605592',
  whatsappDisplay: '+62 858-9260-5592',
  email: 'info@ajiinstitute.id',
  instagram: '@ajiinstitute.id',
  operationalHours: '24 Jam / 7 Hari',
  address: 'Podomoro Park Buah Batu Cluster Wangsagriya 7 No. 1',
}

export const PROGRAMS = [
  {
    code: 'AjiStat',
    name: 'AjiStat',
    icon: 'STAT',
    color: '#1B3A8C',
    desc: 'Statistik, metodologi penelitian, dan analisis data',
    topics: ['SPSS', 'SmartPLS', 'NVivo', 'R', 'Python', 'AMOS', 'EViews', 'STATA'],
    isFeatured: true,
    formats: ['Bootcamp', 'Private Class', 'Short Class', 'Workshop', 'Konsultasi'],
    href: '/program-ajistat',
    available: true,
  },
  {
    code: 'AjiBiz',
    name: 'AjiBiz',
    icon: 'BIZ',
    color: '#2348A8',
    desc: 'Bisnis, manajemen, dan pengembangan usaha',
    topics: ['Business Planning', 'Entrepreneurship', 'Manajemen', 'Strategi Usaha', 'UMKM'],
    isFeatured: false,
    formats: ['Bootcamp', 'Private Class', 'Short Class'],
    href: '/program-ajibiz',
    available: true,
  },
  {
    code: 'AjiPR',
    name: 'AjiPR',
    icon: 'PR',
    color: '#1E3A6E',
    desc: 'Public relation, komunikasi, dan personal branding',
    topics: ['Public Relation', 'Media Relation', 'Personal Branding', 'Presentasi', 'Komunikasi Publik'],
    isFeatured: false,
    formats: ['Bootcamp', 'Workshop'],
    href: '/program-ajipr',
    available: true,
  },
  {
    code: 'AjiDigi',
    name: 'AjiDigi',
    icon: 'DIGI',
    color: '#162850',
    desc: 'Digital marketing dan keterampilan digital',
    topics: ['Digital Marketing', 'Social Media Strategy', 'Content Planning', 'Branding Digital', 'Tools Produktivitas'],
    isFeatured: false,
    formats: ['Bootcamp', 'Short Class'],
    href: '/program-ajidigi',
    available: true,
  },
  {
    code: 'AjiLangua',
    name: 'AjiLangua',
    icon: 'LANG',
    color: '#0F2245',
    desc: 'Bahasa akademik, profesional, dan komunikasi global',
    topics: ['Bahasa Inggris', 'Speaking Practice', 'Workplace Communication', 'Bahasa Akademik'],
    isFeatured: false,
    formats: ['Kelas AjiLangua', 'Private Class'],
    href: '/program-ajilangua',
    available: true,
  },
]

export const TOOLS = [
  {
    name: 'SPSS',
    color: '#BE1425',
    logo: '/logos/spss-1.jpg',
    desc: 'Statistical Package for the Social Sciences. Software analisis statistik paling populer untuk riset akademik.',
    useFor: 'Uji asumsi, regresi, ANOVA, uji beda, korelasi, crosstab.',
  },
  {
    name: 'SmartPLS',
    color: '#E8A020',
    logo: '/logos/pls.jpg',
    desc: 'Software Structural Equation Modeling berbasis Partial Least Squares. Ideal untuk penelitian bisnis dan sosial.',
    useFor: 'SEM-PLS, CFA, path analysis, mediasi, moderasi.',
  },
  {
    name: 'AMOS',
    color: '#CC2222',
    logo: '/logos/amos-1.png',
    desc: 'Analysis of Moment Structures. Software SEM berbasis covariance untuk model pengukuran yang kompleks.',
    useFor: 'SEM-CB, CFA, path diagram, goodness of fit.',
  },
  {
    name: 'R / RStudio',
    color: '#2266B8',
    logo: '/logos/r-studio.png',
    desc: 'Bahasa pemrograman statistik open-source yang sangat powerful dan fleksibel.',
    useFor: 'Analisis data, visualisasi, machine learning, big data.',
  },
  {
    name: 'Python',
    color: '#3776AB',
    logo: '/logos/python.png',
    desc: 'Bahasa pemrograman serbaguna yang kuat untuk data science dan analisis statistik.',
    useFor: 'Data wrangling, visualisasi, ML, NLP, otomasi analisis.',
  },
  {
    name: 'NVivo',
    color: '#8B0000',
    logo: '/logos/nvivo-1.png',
    desc: 'Software analisis data kualitatif (QDA) terkemuka di dunia.',
    useFor: 'Coding tema, analisis wawancara, FGD, konten media.',
  },
  {
    name: 'EViews',
    color: '#005A9C',
    logo: '/logos/EViews-1.jpeg',
    desc: 'Software ekonometri untuk analisis data time series dan cross-section.',
    useFor: 'Regresi panel data, ARIMA, VAR, VECM, uji stasioneritas.',
  },
  {
    name: 'STATA',
    color: '#1A5276',
    logo: '/logos/stata.png',
    desc: 'Software statistik profesional yang banyak digunakan di bidang ekonomi dan kesehatan.',
    useFor: 'Regresi, panel data, survival analysis, survei data.',
  },
  {
    name: 'LISREL',
    color: '#444444',
    logo: '/logos/lisrel-1.jpeg',
    desc: 'Pioneer software SEM berbasis covariance yang banyak dipakai di riset psikologi dan sosial.',
    useFor: 'CFA, SEM-CB, path analysis, multitrait-multimethod.',
  },
  {
    name: 'Excel',
    color: '#217346',
    logo: '/logos/excel-logo.png',
    desc: 'Microsoft Excel — spreadsheet paling banyak digunakan untuk analisis data dasar dan visualisasi.',
    useFor: 'Tabulasi data, pivot table, chart, statistik deskriptif.',
  },
]


export const WA_LINK = (message?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`

// Alias untuk backward compatibility
export const SITE = {
  ...BRAND,
  company: BRAND.legalName,
  description: 'Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional — dari statistik, bisnis, hingga komunikasi.',
}

export const SUB_BRANDS = PROGRAMS.map(p => ({
  id: p.code.toLowerCase(),
  name: p.name,
  label: p.desc,
  description: p.desc,
  icon: p.icon,
  color: p.color,
  href: p.href,
  available: p.available,
}))
