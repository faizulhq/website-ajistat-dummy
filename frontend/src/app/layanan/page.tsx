import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Layanan Konsultasi & Analisis Data',
  description: 'Layanan konsultasi statistik, analisis data, SPSS, SmartPLS, R, Python, NVivo untuk skripsi, tesis, disertasi, dan riset profesional.',
};

const LAYANAN = [
  { icon: '📊', title: 'Analisis Data Kuantitatif', desc: 'Analisis statistik deskriptif, inferensial, regresi, SEM, path analysis menggunakan SPSS, SmartPLS, AMOS, atau LISREL.' },
  { icon: '🔬', title: 'Analisis Data Kualitatif', desc: 'Analisis tematik, content analysis, dan grounded theory menggunakan NVivo untuk riset kualitatif.' },
  { icon: '📈', title: 'Olah Data Riset', desc: 'Pembersihan data, transformasi, uji validitas & reliabilitas, dan persiapan dataset untuk analisis lanjutan.' },
  { icon: '📝', title: 'Pendampingan Skripsi/Tesis', desc: 'Konsultasi metodologi penelitian, teknik sampling, penyusunan instrumen, dan analisis untuk skripsi, tesis, dan disertasi.' },
  { icon: '💼', title: 'Riset Bisnis & Industri', desc: 'Analisis survei pasar, evaluasi program, penelitian kebijakan, dan riset terapan untuk kebutuhan bisnis dan industri.' },
  { icon: '📋', title: 'Penyusunan Laporan', desc: 'Penulisan laporan riset, interpretasi hasil analisis, dan penyajian data dalam format akademik maupun eksekutif.' },
];

const SOFTWARE = [
  { name: 'SPSS', category: 'Statistik Deskriptif & Inferensial' },
  { name: 'SmartPLS', category: 'Structural Equation Modeling (PLS)' },
  { name: 'AMOS', category: 'SEM Covariance-Based' },
  { name: 'LISREL', category: 'SEM Advanced' },
  { name: 'EViews', category: 'Ekonometrika & Time Series' },
  { name: 'R', category: 'Analisis Statistik Open Source' },
  { name: 'Python', category: 'Data Science & Machine Learning' },
  { name: 'NVivo', category: 'Analisis Kualitatif' },
  { name: 'Excel', category: 'Pengolahan Data Dasar' },
  { name: 'STATA', category: 'Ekonometrika & Panel Data' },
];

const PROSES = [
  { step: '01', title: 'Konsultasi Awal', desc: 'Diskusi kebutuhan riset, ruang lingkup analisis, dan timeline penyelesaian via chat atau video call.' },
  { step: '02', title: 'Analisis & Pengerjaan', desc: 'Tim ahli kami mengerjakan analisis data sesuai metodologi yang disepakati dengan akurasi tinggi.' },
  { step: '03', title: 'Penyusunan Laporan', desc: 'Hasil analisis disajikan dalam laporan terstruktur lengkap dengan interpretasi dan rekomendasi.' },
  { step: '04', title: 'Revisi & Finalisasi', desc: 'Kami memberikan garansi revisi untuk memastikan hasil memenuhi standar akademik atau kebutuhan klien.' },
];

export default function LayananPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#054E7A] to-[#1090C8] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav className="flex justify-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/80">Layanan</span>
          </nav>
          <span className="inline-block bg-[#47C2EA]/20 border border-[#47C2EA]/30 text-[#47C2EA] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            📊 AJI Statistik — Layanan Konsultasi
          </span>
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-bold text-white mb-6">
            Konsultasi & Analisis Data<br />
            <span className="text-[#F0A500]">Profesional & Terpercaya</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Didampingi oleh konsultan berpengalaman, dari analisis sederhana hingga SEM kompleks. Untuk skripsi, tesis, disertasi, dan riset profesional.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href={WA_LINK('Halo, saya ingin konsultasi layanan analisis data')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-bold px-7 py-3.5 rounded-xl transition-colors">
              <MessageCircle className="w-4 h-4" /> Konsultasi Sekarang
            </a>
            <Link href="/konsultasi"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors">
              Isi Form Konsultasi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Layanan Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Apa yang Kami Kerjakan</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Layanan Analisis & Konsultasi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAYANAN.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Tools & Software</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Software yang Kami Kuasai</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {SOFTWARE.map((sw) => (
              <div key={sw.name} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center hover:border-[#1AAEE0]/30 hover:bg-blue-50 transition-colors">
                <p className="font-bold text-gray-900 text-sm mb-1">{sw.name}</p>
                <p className="text-gray-400 text-[10px]">{sw.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proses Kerja */}
      <section className="py-20 bg-[#054E7A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#47C2EA] text-sm font-semibold uppercase tracking-widest mb-3">Bagaimana Proses Kami</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white">4 Langkah Sederhana</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROSES.map((p) => (
              <div key={p.step} className="bg-white/8 border border-white/15 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 bg-[#1AAEE0] rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {p.step}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harga */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Estimasi Biaya</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900 mb-4">Harga Konsultasi</h2>
            <p className="text-gray-500">Harga bersifat estimasi dan dapat berbeda tergantung kompleksitas analisis. Hubungi kami untuk penawaran tepat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: 'Dasar', range: 'Rp 150.000 – 350.000', items: ['Analisis deskriptif', 'Uji asumsi klasik', 'Regresi sederhana', 'Interpretasi hasil'], color: 'border-gray-200' },
              { tier: 'Menengah', range: 'Rp 350.000 – 750.000', items: ['SEM / Path Analysis', 'Analisis multivariat', 'Uji mediasi/moderasi', 'Laporan lengkap', 'Revisi 1x'], popular: true, color: 'border-[#1AAEE0]' },
              { tier: 'Komprehensif', range: 'Rp 750.000+', items: ['Analisis kompleks (AMOS/LISREL)', 'Mix method', 'Konsultasi intensif', 'Laporan eksekutif', 'Revisi tidak terbatas'], color: 'border-gray-200' },
            ].map((pkg) => (
              <div key={pkg.tier} className={`bg-white rounded-2xl border-2 ${pkg.color} p-6 shadow-sm relative`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F0A500] text-[#054E7A] text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ Paling Diminati
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-lg mb-1">{pkg.tier}</h3>
                <p className="text-[#1AAEE0] font-bold text-xl mb-4">{pkg.range}</p>
                <ul className="space-y-2">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={WA_LINK(`Halo, saya ingin tanya paket konsultasi ${pkg.tier}`)}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-6 block text-center py-2.5 rounded-xl text-sm font-semibold bg-[#0B7AB5] text-white hover:bg-[#1AAEE0] transition-colors">
                  Tanya Sekarang
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#0B7AB5]">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white mb-4">Butuh Konsultasi Segera?</h2>
          <p className="text-white/60 mb-7">Tim kami siap merespons pertanyaan Anda dalam 1×24 jam di hari kerja.</p>
          <a href={WA_LINK('Halo, saya butuh bantuan konsultasi analisis data')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
            <MessageCircle className="w-4 h-4" /> Chat WhatsApp Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
