'use client';

import { useState } from 'react';
import { Zap, Target, BookMarked, X } from 'lucide-react';
import { WA_LINK, SHORT_CLASS_PROGRAMS } from '@/lib/config';

const KEUNGGULAN = [
  {
    icon: Zap,
    title: '2–3 Jam Saja',
    desc: 'Padat materi, langsung ke intinya',
    detail: 'Dirancang untuk Anda yang sibuk. Dalam 2–3 jam, kami langsung ke topik inti tanpa basa-basi — efisien dan efektif.',
  },
  {
    icon: Target,
    title: 'Topik Spesifik',
    desc: 'Fokus pada satu keahlian tertentu',
    detail: 'Setiap short class membahas satu topik secara tuntas. Tidak perlu ikut kelas panjang hanya untuk mempelajari satu teknik analisis.',
  },
  {
    icon: BookMarked,
    title: 'Langsung Praktik',
    desc: 'Belajar sambil mengerjakan data sendiri',
    detail: 'Bawa data Anda sendiri atau gunakan dataset latihan kami. Anda langsung praktik selama sesi berlangsung, bukan hanya menonton.',
  },
];

function formatPrice(p: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
}

function KeunggulanModal({ item, onClose }: { item: typeof KEUNGGULAN[0] | null; onClose: () => void }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 z-10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 bg-[#F0A500]/15 rounded-2xl flex items-center justify-center mb-4">
          <item.icon className="w-6 h-6 text-[#F0A500]" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.detail}</p>
        <a href={WA_LINK(`Halo AjiStat, saya ingin tanya Short Class: ${item.title}`)} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          💬 Tanya via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function ShortClassPage() {
  const [activeKeunggulan, setActiveKeunggulan] = useState<typeof KEUNGGULAN[0] | null>(null);

  return (
    <>
      {/* HERO */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Short Class</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              AjiStat — Short Class Statistik
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Short Class —<br />
              <span className="text-[#F0A500]">Singkat, Padat,</span>{' '}
              <span className="text-white/80">& Langsung Bisa</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Kelas singkat 2–3 jam yang fokus pada satu topik statistik secara tuntas. Cocok untuk Anda
              yang ingin menguasai teknik tertentu dengan cepat dan efisien.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {KEUNGGULAN.map((item) => (
                <button key={item.title} onClick={() => setActiveKeunggulan(item)}
                  className="bg-white/10 border border-white/15 rounded-xl p-4 text-left hover:bg-white/20 hover:border-white/30 transition-all hover:-translate-y-0.5 cursor-pointer group">
                  <item.icon className="w-6 h-6 text-[#F0A500] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {['Mulai dari Rp 75.000', 'Durasi 2–3 Jam', 'Via Zoom', 'Langsung Praktik'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROGRAM LIST */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Program Short Class</p>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Pilih Topik Short Class</h2>
            <p className="text-gray-500 text-sm">Klik kartu untuk mendaftar via WhatsApp.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SHORT_CLASS_PROGRAMS.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="bg-gradient-to-r from-[#162058] to-[#2348A8] px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/15 px-2 py-0.5 rounded-full">Short Class</span>
                  <h3 className="text-white font-black mt-2 text-sm leading-snug">{p.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">{p.description}</p>
                  <p className="text-[#162058] text-xs font-medium mb-4">{p.duration} · {p.facilitator}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through">{formatPrice(p.originalPrice)}</p>
                      <p className="font-black text-[#162058]">{formatPrice(p.price)}</p>
                    </div>
                    <a href={WA_LINK(`Halo AjiStat, saya ingin mendaftar Short Class: ${p.title}`)} target="_blank" rel="noopener noreferrer"
                      className="bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors">
                      Daftar →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F0A500] py-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-black text-[#162058] mb-3">Topik yang Anda cari belum ada?</h2>
          <p className="text-[#162058]/70 mb-6 text-sm">Kami buka kelas on-demand sesuai kebutuhan Anda.</p>
          <a href={WA_LINK('Halo AjiStat, saya ingin request Short Class dengan topik khusus')} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-black px-8 py-3.5 rounded-xl transition-colors">
            Request Topik via WhatsApp
          </a>
        </div>
      </section>

      <KeunggulanModal item={activeKeunggulan} onClose={() => setActiveKeunggulan(null)} />
    </>
  );
}
