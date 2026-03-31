import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Artikel',
  description: 'Artikel tentang statistika, metodologi penelitian, analisis data, dan pengembangan kompetensi profesional dari tim Aji Institute.',
};

const ARTICLES = [
  {
    id: 1,
    slug: 'mengenal-sem-smartpls',
    title: 'Mengenal Structural Equation Modeling (SEM) dengan SmartPLS: Panduan Lengkap untuk Pemula',
    excerpt: 'SEM adalah teknik analisis multivariat yang memungkinkan peneliti menguji hubungan kompleks antara variabel laten sekaligus. SmartPLS hadir sebagai solusi yang lebih aksesibel...',
    category: 'Statistika',
    readTime: '8 menit',
    date: '15 Maret 2025',
    tag: 'SmartPLS',
    color: '#1AAEE0',
  },
  {
    id: 2,
    slug: 'validitas-reliabilitas-instrumen',
    title: 'Uji Validitas dan Reliabilitas Instrumen: Cara Benar yang Sering Diabaikan Peneliti',
    excerpt: 'Banyak peneliti melakukan uji validitas dan reliabilitas hanya sebagai formalitas. Padahal, kualitas instrumen penelitian sangat menentukan kesahihan temuan riset Anda...',
    category: 'Metodologi',
    readTime: '6 menit',
    date: '5 Maret 2025',
    tag: 'SPSS',
    color: '#16A34A',
  },
  {
    id: 3,
    slug: 'analisis-kualitatif-nvivo',
    title: 'Panduan Analisis Data Kualitatif Menggunakan NVivo: Dari Transkrip hingga Temuan',
    excerpt: 'NVivo adalah software terdepan untuk riset kualitatif. Artikel ini memandu Anda langkah demi langkah mulai dari import data, coding, hingga penarikan temuan melalui query...',
    category: 'Kualitatif',
    readTime: '10 menit',
    date: '22 Februari 2025',
    tag: 'NVivo',
    color: '#7C3AED',
  },
  {
    id: 4,
    slug: 'tips-menulis-bab-3-skripsi',
    title: '7 Kesalahan Fatal dalam Menulis Bab 3 Metodologi Penelitian (dan Cara Menghindarinya)',
    excerpt: 'Bab 3 metodologi adalah fondasi dari seluruh penelitian Anda. Sayangnya, banyak mahasiswa membuat kesalahan yang tidak mereka sadari hingga sidang...',
    category: 'Akademik',
    readTime: '7 menit',
    date: '10 Februari 2025',
    tag: 'Skripsi',
    color: '#F0A500',
  },
];

const CATEGORIES = ['Semua', 'Statistika', 'Metodologi', 'Kualitatif', 'Akademik', 'Tools & Software'];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#054E7A] to-[#1090C8] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav className="flex justify-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/80">Blog</span>
          </nav>
          <span className="inline-block bg-[#47C2EA]/20 border border-[#47C2EA]/30 text-[#47C2EA] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            ✍️ Blog & Artikel
          </span>
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-bold text-white mb-6">
            Wawasan & Panduan<br />
            <span className="text-[#F0A500]">Riset & Kompetensi</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Artikel praktis tentang statistika, metodologi penelitian, analisis data, dan pengembangan kompetensi dari Tim Aji Institute.
          </p>
        </div>
      </div>

      {/* Filter Kategori */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                cat === 'Semua' ? 'bg-[#0B7AB5] text-white' : 'text-gray-600 hover:text-[#1AAEE0] border border-gray-200 hover:border-[#1AAEE0]'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Artikel Grid */}
      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 bg-gradient-to-br from-[#0B7AB5] to-[#1AAEE0] flex items-center justify-center py-16 px-8">
                <p className="text-white/20 text-8xl font-black select-none">AJI</p>
              </div>
              <div className="lg:col-span-3 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-50 text-[#1AAEE0] text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                    {ARTICLES[0].category}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {ARTICLES[0].readTime} baca
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {ARTICLES[0].title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{ARTICLES[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{ARTICLES[0].date}</span>
                  <span className="flex items-center gap-1.5 text-[#1AAEE0] text-sm font-semibold hover:gap-2.5 transition-all cursor-pointer">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                <div className="h-36 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${article.color}22, ${article.color}44)` }}>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-3 py-1.5">
                    <Tag className="w-3.5 h-3.5" style={{ color: article.color }} />
                    <span className="text-xs font-semibold" style={{ color: article.color }}>{article.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{article.category}</span>
                    <span className="text-gray-300 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#1AAEE0] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{article.date}</span>
                    <span className="text-[#1AAEE0] text-xs font-semibold cursor-pointer">Baca →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-10 bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
            <p className="text-3xl mb-3">✍️</p>
            <p className="font-semibold text-gray-700 mb-2">Artikel baru sedang disiapkan</p>
            <p className="text-gray-400 text-sm">Tim penulis Aji Institute sedang menyiapkan konten berkualitas tinggi untuk Anda.</p>
          </div>
        </div>
      </section>
    </>
  );
}
