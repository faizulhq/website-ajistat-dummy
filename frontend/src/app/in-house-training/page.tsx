'use client';

import { ArrowRight, Building2, CheckCircle, Presentation, Users, Briefcase, Handshake } from 'lucide-react';
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

export default function InHouseTrainingPage() {
  return (
    <>
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#054E7A] via-[#0B7AB5] to-[#1AAEE0] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-[#47C2EA] rounded-full blur-[120px] opacity-20 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[#F0A500] text-sm font-bold uppercase tracking-widest mb-4 block">Aji Institute Corporate & Institutional</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            In-House Training & <br className="hidden sm:block" /> Program Kerja Sama Institusional
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg leading-relaxed mb-10">
            Aji Institute membuka peluang kerja sama B2B dan B2G untuk pengembangan kompetensi sumber daya manusia. Program kami dirancang secara fleksibel, tematik, dan dapat disesuaikan (custom) dengan karakteristik institusi Anda.
          </p>
          <div className="flex justify-center">
            <a href={WA_LINK('Halo Tim Aji Institute, saya mewakili instansi saya dan ingin berdiskusi mengenai program In-House Training / Kerja Sama Institusional...')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-black px-8 py-4 rounded-2xl text-lg transition-transform hover:scale-105 shadow-xl">
              <Briefcase className="w-5 h-5" /> Undang Kami Presentasi
            </a>
          </div>
        </div>
      </div>

      {/* PRINSIP KERJA SAMA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#1AAEE0] text-sm font-bold uppercase tracking-widest mb-2">Nilai Ekosistem Aji</p>
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
                    <CheckCircle className="w-5 h-5 text-[#1AAEE0] mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {['Statistik & Olah Data', 'Bisnis & Manajemen', 'Digital Marketing', 'Public Speaking', 'Keterampilan Bahasa', 'Pengembangan UMKM'].map((fokus, idx) => (
                <div key={idx} className="bg-blue-50/50 outline outline-1 outline-blue-100 rounded-2xl p-6 text-center shadow-sm">
                  <p className="font-bold text-[#054E7A] text-sm">{fokus}</p>
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
              <div key={k.title} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center mb-6">
                  <k.icon className="w-6 h-6 text-[#1AAEE0]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{k.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MITRA */}
      <section className="py-16 bg-[#054E7A]">
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
             className="inline-flex items-center gap-2 bg-[#1AAEE0] hover:bg-[#1090C8] text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all shadow-xl hover:shadow-[#1AAEE0]/50">
            💬 Ajukan Pertemuan Bersama Tim
          </a>
        </div>
      </section>
    </>
  );
}
