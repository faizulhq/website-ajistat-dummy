'use client';

import { useState } from 'react';
import { ArrowRight, Building2, CheckCircle, Presentation, Users, Briefcase, Handshake, MapPin, FileText, X } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const KERJASAMA = [
  { icon: Building2, title: 'In-House Training', desc: 'Pelatihan internal khusus untuk instansi, perusahaan, sekolah, atau kampus dengan kurikulum yang dapat disesuaikan (custom).' },
  { icon: Presentation, title: 'Workshop Tematik', desc: 'Pelatihan singkat dan interaktif berbasis praktik, dirancang untuk memberikan pengalaman belajar yang aplikatif.' },
  { icon: Users, title: 'Bootcamp Institusional', desc: 'Program pelatihan intensif bagi kelompok institusi dalam bidang statistik, komunikasi, digital, maupun bisnis.' },
  { icon: Handshake, title: 'Pendampingan Riset & Profesional', desc: 'Konsultasi jangka panjang untuk pengembangan kapasitas SDM organisasi Anda.' }
];

const TARGET_MITRA = [
  'Universitas & Sekolah',
  'Instansi Pemerintah',
  'Perusahaan Eksekutif',
  'BUMN & BUMD',
  'Lembaga Penelitian',
  'Organisasi & Komunitas Nirlaba'
];

const HERO_KEUNGGULAN = [
  {
    icon: MapPin,
    title: 'Offline / Online / Hybrid',
    desc: 'Fleksibel sesuai kebutuhan instansi',
    detail: 'Program dapat diselenggarakan sepenuhnya secara offline di lokasi instansi Anda, online via Zoom, atau format hybrid — menyesuaikan kebutuhan dan kebijakan internal organisasi.',
  },
  {
    icon: FileText,
    title: 'Kurikulum Custom',
    desc: 'Materi dirancang sesuai kebutuhan SDM',
    detail: 'Seluruh materi, modul, dan metode penyampaian dirancang melalui Need Assessment bersama tim akademisi kami — memastikan relevansi dengan tantangan SDM nyata yang dihadapi organisasi Anda.',
  },
  {
    icon: Briefcase,
    title: 'Paket All-in-One',
    desc: 'Modul, e-sertifikat, dan laporan evaluasi',
    detail: 'Setiap program mencakup paket lengkap: modul pelatihan eksklusif, e-sertifikat resmi untuk seluruh peserta, dan laporan evaluasi tertulis bagi manajemen.',
  },
];

function HeroKeunggulanModal({ item, onClose }: {
  item: typeof HERO_KEUNGGULAN[0] | null;
  onClose: () => void;
}) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 z-10"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 bg-[#F0A500]/15 rounded-2xl flex items-center justify-center mb-4">
          <item.icon className="w-6 h-6 text-[#F0A500]" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.detail}</p>
        <a href={WA_LINK('Halo Tim Aji Institute, saya ingin tanya tentang program In-House Training')}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          Tanya via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function InHouseTrainingPage() {
  const [activeKerjasama, setActiveKerjasama] = useState<typeof KERJASAMA[0] | null>(null);
  const [activeHeroCard, setActiveHeroCard] = useState<typeof HERO_KEUNGGULAN[0] | null>(null);

  return (
    <>
      {/* ─── HERO (Bootcamp-consistent) ─── */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">In-House Training</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              Aji Institute Corporate &amp; Institutional
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              In-House Training —<br />
              <span className="text-[#F0A500]">Solusi Pelatihan</span>{' '}
              <span className="text-white/80">untuk Instansi</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Aji Institute membuka peluang kerja sama B2B dan B2G. Program kami dirancang secara fleksibel,
              tematik, dan dapat disesuaikan (custom) dengan karakteristik institusi Anda.
            </p>
            {/* Clickable keunggulan cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {HERO_KEUNGGULAN.map((item) => (
                <button key={item.title}
                  onClick={() => setActiveHeroCard(item)}
                  className="bg-white/10 border border-white/15 rounded-xl p-4 text-left hover:bg-white/20 hover:border-white/30 transition-all hover:-translate-y-0.5 cursor-pointer group">
                  <item.icon className="w-6 h-6 text-[#F0A500] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
            <a href={WA_LINK('Halo Tim Aji Institute, saya mewakili instansi saya dan ingin berdiskusi mengenai program In-House Training...')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 shadow-xl">
              <Briefcase className="w-5 h-5" /> Undang Kami Presentasi
            </a>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {['Offline / Online / Hybrid', 'Kurikulum custom sesuai kebutuhan', 'Modul + E-Sertifikat + Laporan'].map((text) => (
                <span key={text} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* PRINSIP KERJA SAMA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#2348A8] text-sm font-bold uppercase tracking-widest mb-2">Nilai Ekosistem Aji</p>
              <h2 className="text-3xl font-black text-gray-900 mb-6 leading-tight">Fleksibel, Komunikatif, dan Berorientasi pada Hasil</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Kami memahami bahwa setiap organisasi memiliki tantangan kompetensi yang berbeda. Oleh karena itu, seluruh bentuk pelaksanaan, durasi, metode penyampaian, hingga sub-materi pelatihan <strong>dapat disesuaikan (customized)</strong> melalui diskusi tahap awal (Need Assessment) dengan tim akademisi kami.
              </p>
              <ul className="space-y-4">
                {[
                  'Dapat diselenggarakan Offline, Online, maupun Hybrid',
                  'Materi pelatihan dirancang aplikatif dan praktis',
                  'Penyediaan fasilitas Modul, E-Sertifikat, dan Laporan Evaluasi',
                  'Diampu oleh akademisi, praktisi, dan profesional di bidangnya'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-800">
                    <CheckCircle className="w-5 h-5 text-[#2348A8] mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {['Statistik & Olah Data', 'Bisnis & Manajemen', 'Digital Marketing', 'Public Speaking', 'Keterampilan Bahasa', 'Pengembangan UMKM'].map((fokus, idx) => (
                <div key={idx} className="bg-blue-50/50 outline outline-1 outline-blue-100 rounded-2xl p-6 text-center shadow-sm">
                  <p className="font-bold text-[#162058] text-sm">{fokus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENTUK PROGRAM */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Pilihan Penawaran Kerja Sama</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Berbagai format pembelajaran yang ditawarkan Aji Institute untuk memenuhi target pengembangan sumber daya manusia organisasi Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KERJASAMA.map((k) => (
              <button key={k.title} onClick={() => setActiveKerjasama(k)} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-left w-full h-full group">
                <div className="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <k.icon className="w-6 h-6 text-[#2348A8]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{k.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{k.desc.substring(0, 75)}...</p>
                <div className="flex items-center gap-2 text-[#2348A8] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-[#2348A8]/10 px-3 py-1 rounded-full">Baca Selengkapnya</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MITRA */}
      <section className="py-16 bg-[#162058]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-8">Target Mitra & Klien Institusional</p>
          <div className="flex flex-wrap justify-center gap-4">
            {TARGET_MITRA.map((m) => (
              <span key={m} className="px-5 py-2.5 outline outline-1 outline-white/20 bg-white/5 rounded-full text-white/90 font-medium text-sm">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA TERAKHIR */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Diskusikan Kebutuhan Anda Sekarang</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Hubungi tim kemitraan kami untuk mendapatkan Proposal Penawaran Program selengkapnya, atau agendakan pertemuan (Need Assessment) gratis.
          </p>
          <a href={WA_LINK('Halo Tim Kemintran Aji Institute, saya tertarik dengan layanan In-House Training...')}
             target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-[#2348A8] hover:bg-[#1B3A8C] text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all shadow-xl hover:shadow-[#2348A8]/50">
            💬 Ajukan Pertemuan Bersama Tim
          </a>
        </div>
      </section>

      {/* Modal Popup Kerjasama */}
      {activeKerjasama && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setActiveKerjasama(null)}>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 z-10" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveKerjasama(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
              ✕
            </button>
            <div className="w-14 h-14 bg-[#2348A8]/10 rounded-2xl flex items-center justify-center mb-5">
              <activeKerjasama.icon className="w-7 h-7 text-[#2348A8]" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">{activeKerjasama.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-8">{activeKerjasama.desc}</p>
            <a href={WA_LINK(`Halo Tim Aji Institute, saya tertarik mendiskusikan program ${activeKerjasama.title}`)} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#2348A8] hover:bg-[#1B3A8C] text-white font-bold py-4 rounded-xl transition-colors shadow-md hover:shadow-lg">
              💬 Diskusikan Detail Lewat WhatsApp
            </a>
          </div>
        </div>
      )}
      <HeroKeunggulanModal item={activeHeroCard} onClose={() => setActiveHeroCard(null)} />
    </>
  );
}
