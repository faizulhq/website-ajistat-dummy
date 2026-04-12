'use client';

import { useState } from 'react';
import { Users, Award, BookOpen, Star, X } from 'lucide-react';
import { ProgramTabsByProgram } from '@/components/ProgramTabs';
import { WA_LINK } from '@/lib/config';

const KEUNGGULAN = [
  {
    icon: Users,
    title: 'Fasilitator Expert',
    desc: 'Dibimbing oleh praktisi dan peneliti berpengalaman di bidangnya',
    detail: 'Setiap fasilitator kami adalah praktisi aktif dan peneliti berpengalaman yang mengajar berdasarkan pengalaman nyata, bukan sekadar teori. Mereka hadir langsung di setiap sesi untuk menjawab pertanyaan dan membimbing Anda secara personal.',
  },
  {
    icon: BookOpen,
    title: '3–5 Hari Intensif',
    desc: 'Pembelajaran intensif langsung praktik dengan data nyata',
    detail: 'Durasi 3–5 hari dirancang agar Anda bisa belajar secara mendalam tanpa terburu-buru. Setiap sesi menggabungkan teori singkat dengan praktik langsung menggunakan dataset riil, bukan data simulasi.',
  },
  {
    icon: Star,
    title: 'Bersertifikat',
    desc: 'Sertifikat resmi Aji Institute yang diakui secara nasional',
    detail: 'Setelah menyelesaikan bootcamp, peserta mendapatkan e-sertifikat resmi berlogo Aji Institute yang dapat digunakan untuk melengkapi CV, portofolio akademik, dan profil LinkedIn.',
  },
  {
    icon: Award,
    title: 'Rekaman Tersedia',
    desc: 'Akses ulang rekaman sesi kapan saja setelah bootcamp selesai',
    detail: 'Seluruh rekaman sesi live tersimpan di platform dan bisa diakses kapan saja, selamanya. Anda bisa belajar ulang topik yang belum dikuasai tanpa batas waktu atau biaya tambahan.',
  },
];

function KeunggulanModal({ item, onClose }: {
  item: typeof KEUNGGULAN[0] | null;
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
        <a href={WA_LINK(`Halo, saya ingin tanya tentang fitur Bootcamp: ${item.title}`)}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          💬 Tanya via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function BootcampPage() {
  const [activeKeunggulan, setActiveKeunggulan] = useState<typeof KEUNGGULAN[0] | null>(null);

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Bootcamp</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              AJI Learning — Bootcamp Intensif
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Bootcamp —<br />
              <span className="text-[#F0A500]">Intensif, Praktis,</span>{' '}
              <span className="text-white/80">&amp; Berdampak</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Program bootcamp 3–5 hari yang dirancang untuk membawa Anda dari pemula hingga mahir secara praktis.
              Cocok untuk mahasiswa, peneliti, akademisi, dan profesional.
            </p>
            {/* Clickable keunggulan cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {KEUNGGULAN.map((item) => (
                <button key={item.title}
                  onClick={() => setActiveKeunggulan(item)}
                  className="bg-white/10 border border-white/15 rounded-xl p-4 text-left hover:bg-white/20 hover:border-white/30 transition-all hover:-translate-y-0.5 cursor-pointer group">
                  <item.icon className="w-6 h-6 text-[#F0A500] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {['Mulai dari Rp 250.000', 'Sesi Live via Zoom', 'Sertifikat resmi AJI'].map((text) => (
                <span key={text} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── TABS PER PROGRAM ─── */}
      <section className="py-14 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Pilih Program Divisi</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Bootcamp per Divisi Program</h2>
            <p className="text-gray-500 text-sm">Pilih divisi program yang sesuai kebutuhan Anda. Klik kartu untuk mendaftar.</p>
          </div>
          <ProgramTabsByProgram formatFilter="bootcamp" queryKey="bootcamp-by-program" />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#F0A500] py-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-[#162058] mb-3">Ada topik yang belum tersedia?</h2>
          <p className="text-[#162058]/70 mb-6">Kami menerima permintaan topik khusus. Hubungi tim Aji Institute.</p>
          <a href={WA_LINK('Halo Admin, saya ingin request topik Bootcamp baru')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
            Request Topik via WhatsApp
          </a>
        </div>
      </section>

      <KeunggulanModal item={activeKeunggulan} onClose={() => setActiveKeunggulan(null)} />
    </>
  );
}
