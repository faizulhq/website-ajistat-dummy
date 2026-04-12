'use client';

import { useState } from 'react';
import { ArrowRight, X, BarChart3, Database, FileText, BookOpen, Building2, ClipboardList, ChevronRight } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const KONSULTASI_LAYANAN = [
  {
    icon: BarChart3,
    title: 'Analisis Data Kuantitatif',
    desc: 'Layanan analisis statistik inferensial, pengujian hipotesis, dan interpretasi data kuantitatif berbasis pendekatan akademik dan profesional.',
    contoh: ['Uji regresi linear & logistik', 'Uji beda (T-test, ANOVA, MANOVA)', 'Structural Equation Modeling (SEM)', 'Analisis mediasi & moderasi'],
    tools: ['SPSS', 'SmartPLS', 'AMOS', 'R', 'STATA'],
    cocokUntuk: 'Mahasiswa S1–S3, peneliti, dosen, profesional',
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-[#2348A8] bg-[#EBF4FF]',
  },
  {
    icon: FileText,
    title: 'Analisis Data Kualitatif (NVivo)',
    desc: 'Pengolahan data kualitatif berbasis teks, wawancara, FGD, dan dokumen menggunakan software NVivo dan metode tematik.',
    contoh: ['Thematic Analysis', 'Coding & kategorisasi data', 'Analisis konten & wacana', 'Triangulasi data'],
    tools: ['NVivo', 'Atlas.ti'],
    cocokUntuk: 'Peneliti kualitatif, mahasiswa sosial dan humaniora',
    color: 'bg-purple-50 border-purple-100',
    iconColor: 'text-purple-700 bg-purple-100',
  },
  {
    icon: Database,
    title: 'Olah & Pengolahan Data',
    desc: 'Pembersihan, transformasi, dan persiapan dataset agar siap dianalisis — dari data mentah hingga format yang terstruktur.',
    contoh: ['Cleaning & imputasi data', 'Rekoding variabel', 'Pembuatan dummy variable', 'Ekspor & format ulang data'],
    tools: ['SPSS', 'Excel', 'Python', 'R'],
    cocokUntuk: 'Siapapun yang memiliki dataset yang perlu dirapikan',
    color: 'bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-700 bg-emerald-100',
  },
  {
    icon: BookOpen,
    title: 'Pendampingan Skripsi / Tesis / Disertasi',
    desc: 'Bimbingan metodologi penelitian dari perumusan masalah, design riset, hingga olah data dan penulisan bab hasil.',
    contoh: ['Konsultasi kerangka teori', 'Pemilihan metode yang tepat', 'Pengolahan data + interpretasi', 'Review bab 3 & 4 penelitian'],
    tools: ['SPSS', 'SmartPLS', 'NVivo', 'R'],
    cocokUntuk: 'Mahasiswa S1, S2, S3 dari semua jurusan',
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-700 bg-amber-100',
  },
  {
    icon: Building2,
    title: 'Riset & Konsultasi Bisnis',
    desc: 'Dukungan riset pasar, analisis data bisnis, dan penyusunan laporan berbasis data untuk kebutuhan pengambilan keputusan.',
    contoh: ['Survei kepuasan pelanggan', 'Analisis kompetitor berbasis data', 'Laporan riset pasar', 'Dashboard data bisnis'],
    tools: ['SPSS', 'Excel', 'Python'],
    cocokUntuk: 'Startup, UMKM, perusahaan menengah',
    color: 'bg-sky-50 border-sky-100',
    iconColor: 'text-sky-700 bg-sky-100',
  },
  {
    icon: ClipboardList,
    title: 'Penyusunan Laporan Hasil Analisis',
    desc: 'Penulisan laporan ilmiah dan profesional yang menyajikan hasil analisis data secara sistematis, akurat, dan siap dipresentasikan.',
    contoh: ['Laporan analisis lengkap', 'Output SPSS/SmartPLS terformat', 'Visualisasi grafik & tabel', 'Interpretasi narasi akademik'],
    tools: ['Word', 'SPSS', 'SmartPLS'],
    cocokUntuk: 'Mahasiswa, peneliti, klien profesional',
    color: 'bg-rose-50 border-rose-100',
    iconColor: 'text-rose-700 bg-rose-100',
  },
];

type Layanan = typeof KONSULTASI_LAYANAN[0];

function LayananModal({ item, onClose }: { item: Layanan; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-7 z-10 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.iconColor}`}>
          <item.icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{item.desc}</p>

        <div className="mb-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contoh layanan yang tersedia:</p>
          <ul className="space-y-2">
            {item.contoh.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
                <ChevronRight className="w-4 h-4 text-[#2348A8] shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {item.tools.map((t) => (
            <span key={t} className="text-xs font-semibold bg-[#1B3A8C]/10 text-[#1B3A8C] px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>

        <div className={`rounded-xl px-4 py-3 text-xs text-gray-600 border mb-5 ${item.color}`}>
          👥 <strong>Cocok untuk:</strong> {item.cocokUntuk}
        </div>

        <a href={WA_LINK(`Halo, saya tertarik dengan layanan: ${item.title}`)}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#1B3A8C] hover:bg-[#2348A8] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          💬 Konsultasikan Kebutuhan Saya
        </a>
      </div>
    </div>
  );
}

export function KonsultasiPreview() {
  const [activeItem, setActiveItem] = useState<Layanan | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Layanan Kami</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Apa yang Bisa Kami Bantu?</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Dari analisis data hingga pendampingan riset — tim ahli kami siap mendampingi Anda. <span className="text-[#2348A8] font-semibold">Klik untuk detail.</span></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {KONSULTASI_LAYANAN.map((item) => (
            <button key={item.title}
              onClick={() => setActiveItem(item)}
              className="group flex items-center gap-4 p-5 bg-gray-50 hover:bg-white hover:shadow-lg border border-gray-100 hover:border-[#2348A8]/25 rounded-2xl transition-all duration-200 text-left hover:-translate-y-0.5 cursor-pointer">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${item.iconColor}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm leading-snug">{item.title}</p>
                <p className="text-[#2348A8] text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Klik untuk info →</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeItem && <LayananModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </section>
  );
}

export function CtaKerjaSama() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#162058] via-[#1B3A8C] to-[#1B3A8C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#4A72D4] text-sm font-semibold uppercase tracking-widest mb-4">Kolaborasi Institusional</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Ingin Berkolaborasi dengan Aji Institute?
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Kami terbuka untuk kemitraan dengan universitas, lembaga riset, dan perusahaan dalam penyelenggaraan pelatihan dan pengembangan kompetensi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/in-house-training"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            Ajukan Kerja Sama <ArrowRight className="w-5 h-5" />
          </a>
          <a href={WA_LINK('Halo Aji Institute, saya tertarik untuk berkolaborasi')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all hover:bg-white/10">
            Diskusi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
