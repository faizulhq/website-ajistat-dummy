import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Artikel',
  description: 'Artikel tentang statistika, metodologi penelitian, analisis data, dan pengembangan kompetensi profesional dari tim Aji Institute.',
};

const ARTICLES = [
  {
    id: 99,
    slug: 'https://deskjabar.pikiran-rakyat.com/jabar/pr-1139475242/pelatihan-jurnalistik-mahasiswa-dituntut-mampu-menulis-populer-yang-menjangkau-audien-di-luar-akademisi',
    title: 'Liputan Media: Mahasiswa Dituntut Mampu Menulis Populer yang Menjangkau Audien di Luar Akademisi',
    excerpt: 'Pelatihan Jurnalistik memberikan wawasan bahwa karya tulis di luar konteks akademik membutuhkan teknik berbeda agar bisa diterima oleh audiens populer yang lebih luas...',
    category: 'Liputan Media',
    readTime: 'Pikiran Rakyat',
    date: '10 April 2025',
    tag: 'Jurnalistik',
    color: '#E11D48', // PR Redish
    isExternal: true,
    image: '/images/bootcamp-slide.jpeg',
  },
];

const CATEGORIES = ['Semua', 'Statistika', 'Metodologi', 'Kualitatif', 'Akademik', 'Tools & Software'];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#162058] to-[#1B3A8C] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav className="flex justify-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/80">Blog</span>
          </nav>
          <span className="inline-block bg-[#4A72D4]/20 border border-[#4A72D4]/30 text-[#4A72D4] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
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
                cat === 'Semua' ? 'bg-[#1B3A8C] text-white' : 'text-gray-600 hover:text-[#2348A8] border border-gray-200 hover:border-[#2348A8]'
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
            <Link 
              href={ARTICLES[0].isExternal ? ARTICLES[0].slug : `/blog/${ARTICLES[0].slug}`}
              target={ARTICLES[0].isExternal ? "_blank" : "_self"}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                <div className="lg:col-span-2 bg-gradient-to-br from-[#1B3A8C] to-[#2348A8] flex items-center justify-center py-16 px-8 relative overflow-hidden">
                  {ARTICLES[0].image ? (
                    <img src={ARTICLES[0].image} alt="Artikel Utama" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <p className="text-white/20 text-8xl font-black select-none z-10">AJI</p>
                  )}
                </div>
                <div className="lg:col-span-3 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-50 text-[#2348A8] text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                      {ARTICLES[0].category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {ARTICLES[0].readTime}
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#2348A8] transition-colors">
                    {ARTICLES[0].title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{ARTICLES[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{ARTICLES[0].date}</span>
                    <span className="flex items-center gap-1.5 text-[#2348A8] text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>


          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.slice(1).map((article) => (
              <Link 
                key={article.id} 
                href={article.isExternal ? article.slug : `/blog/${article.slug}`}
                target={article.isExternal ? "_blank" : "_self"}
                className="block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${article.color}22, ${article.color}44)` }}>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-3 py-1.5 z-10 transition-transform group-hover:scale-105">
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
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#2348A8] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{article.date}</span>
                    <span className="text-[#2348A8] text-xs font-semibold group-hover:underline">Baca →</span>
                  </div>
                </div>
              </Link>
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
