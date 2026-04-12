'use client';

import { useState } from 'react';
import { Calendar, MessageSquare, Star, X } from 'lucide-react';
import { ProgramTabsByProgram } from '@/components/ProgramTabs';
import { WA_LINK } from '@/lib/config';

const KEUNGGULAN = [
  {
    icon: Calendar,
    title: 'Jadwal Fleksibel',
    desc: 'Jadwal 100% menyesuaikan waktu Anda, termasuk malam & weekend',
    detail: 'Waktu belajar ditentukan bersama berdasarkan kesepakatan Anda dan fasilitator. Tersedia sesi pagi, sore, malam hingga weekend — tidak ada jadwal yang kaku.',
  },
  {
    icon: Star,
    title: 'Kurikulum Personal',
    desc: 'Materi 100% disesuaikan dengan kebutuhan dan progress riset Anda',
    detail: 'Tidak ada materi yang "satu untuk semua". Setiap sesi dirancang khusus berdasarkan kondisi, data riset, dan target yang ingin Anda capai. Lebih efisien dan tepat sasaran.',
  },
  {
    icon: MessageSquare,
    title: 'Support Langsung',
    desc: 'Konsultasi tambahan via chat selama program berjalan',
    detail: 'Di luar jam sesi, Anda tetap bisa bertanya melalui WhatsApp langsung kepada fasilitator. Tidak ada pertanyaan yang dibiarkan menggantung.',
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
        <a href={WA_LINK('Halo Kak, saya ingin berkonsultasi mengenai layanan Private Class.')}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          Konsultasikan via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function PrivateClassPage() {
  const [activeKeunggulan, setActiveKeunggulan] = useState<typeof KEUNGGULAN[0] | null>(null);

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Private Class</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              AJI Learning — Belajar Privat 1-on-1
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Private Class —<br />
              <span className="text-[#F0A500]">Personal,</span>{' '}
              <span className="text-white/80">Efisien &amp; Tepat Sasaran</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Sesi belajar privat 1-on-1 langsung dengan fasilitator. Materi 100% disesuaikan dengan kebutuhan
              dan progres riset Anda. Jadwal malam dan weekend tersedia.
            </p>
            {/* Clickable keunggulan cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              {['Mulai dari Rp 150.000 / sesi', 'Jadwal menyesuaikan Anda', 'Konsultasi + Rekaman Sesi'].map((text) => (
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
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Private Class per Divisi Program</h2>
            <p className="text-gray-500 text-sm">Klik tab untuk melihat kelas privat yang tersedia. Klik kartu untuk mendaftar.</p>
          </div>
          <ProgramTabsByProgram formatFilter="private-class" queryKey="private-class-by-program" />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-12 bg-[#162058]">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-3">Tidak menemukan format yang Anda cari?</h2>
          <p className="text-white/60 mb-6">Diskusikan kebutuhan privat Anda langsung dengan tim kami — kami siap merancang sesi 100% sesuai kebutuhan spesifik Anda.</p>
          <a href={WA_LINK('Halo Kak, saya ingin berkonsultasi mengenai layanan Private Class.')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold px-8 py-3.5 rounded-xl transition-colors">
            Diskusi Private Class Sekarang
          </a>
        </div>
      </section>

      <KeunggulanModal item={activeKeunggulan} onClose={() => setActiveKeunggulan(null)} />
    </>
  );
}
