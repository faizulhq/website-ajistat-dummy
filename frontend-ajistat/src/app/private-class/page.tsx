'use client';

import { useState } from 'react';
import { Clock, Star, Shield, X } from 'lucide-react';
import { WA_LINK, PRIVATE_PROGRAMS } from '@/lib/config';

const KEUNGGULAN = [
  {
    icon: Clock,
    title: 'Jadwal Fleksibel',
    desc: 'Sesuaikan jadwal dengan kesibukan Anda',
    detail: 'Anda bebas menentukan jadwal sesi sesuai waktu yang tersedia. Pagi, siang, atau malam — kami siap menyesuaikan dengan agenda Anda.',
  },
  {
    icon: Star,
    title: 'Pendampingan 1-on-1',
    desc: 'Belajar langsung dengan fasilitator expert',
    detail: 'Sesi privat 1-on-1 memungkinkan Anda bertanya tanpa ragu dan mendapatkan perhatian penuh dari fasilitator selama sesi berlangsung.',
  },
  {
    icon: Shield,
    title: 'Materi Disesuaikan',
    desc: 'Topik dan kecepatan belajar sesuai kebutuhan',
    detail: 'Materi disesuaikan 100% dengan kebutuhan dan latar belakang Anda. Tidak ada kurikulum kaku — belajar apa yang Anda butuhkan.',
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
        <a href={WA_LINK(`Halo AjiStat, saya ingin Kelas Privat`)} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          Tanya via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function PrivateClassPage() {
  const [activeKeunggulan, setActiveKeunggulan] = useState<typeof KEUNGGULAN[0] | null>(null);

  return (
    <>
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Kelas Privat</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              AjiStat — Kelas Privat 1-on-1
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Kelas Privat —<br />
              <span className="text-[#F0A500]">Personal, Fleksibel,</span>{' '}
              <span className="text-white/80">& Efektif</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Belajar langsung 1-on-1 dengan fasilitator expert sesuai kebutuhan dan jadwal Anda.
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
              {['Mulai dari Rp 75.000/sesi', 'Via Zoom / Tatap Muka', 'Jadwal Bebas', 'Materi Disesuaikan'].map((t) => (
                <span key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]" />{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="py-14 bg-gray-50 min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Program Kelas Privat</p>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Pilih Topik Kelas Privat</h2>
            <p className="text-gray-500 text-sm">Klik kartu untuk mendaftar via WhatsApp.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRIVATE_PROGRAMS.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="bg-gradient-to-r from-[#1B3A8C] to-[#2348A8] px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/15 px-2 py-0.5 rounded-full">Kelas Privat</span>
                  <h3 className="text-white font-black mt-2 text-sm leading-snug">{p.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">{p.description}</p>
                  <p className="text-[#1B3A8C] text-xs font-medium mb-4">{p.duration} · {p.facilitator}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through">{formatPrice(p.originalPrice)}</p>
                      <p className="font-black text-[#162058]">{formatPrice(p.price)}</p>
                    </div>
                    <a href={WA_LINK(`Halo AjiStat, saya ingin Kelas Privat: ${p.title}`)} target="_blank" rel="noopener noreferrer"
                      className="bg-[#1B3A8C] hover:bg-[#2348A8] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors">
                      Daftar →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F0A500] py-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-black text-[#162058] mb-3">Topik lain yang Anda butuhkan?</h2>
          <p className="text-[#162058]/70 mb-6 text-sm">Kami siap menyesuaikan materi sesuai kebutuhan spesifik Anda.</p>
          <a href={WA_LINK('Halo AjiStat, saya ingin Kelas Privat topik khusus')} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-black px-8 py-3.5 rounded-xl transition-colors">
            Request Topik via WhatsApp
          </a>
        </div>
      </section>

      <KeunggulanModal item={activeKeunggulan} onClose={() => setActiveKeunggulan(null)} />
    </>
  );
}
