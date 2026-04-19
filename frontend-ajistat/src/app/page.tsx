'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';
import { TOOLS, TOPICS, TARGET_MARKET, WA_LINK } from '@/lib/config';

/* ─── Target Market Modal ─── */
type TargetItem = typeof TARGET_MARKET[0];

function TargetModal({ item, onClose }: { item: TargetItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-7 z-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 bg-[#162058]/10 text-[#162058] text-xs font-bold px-3 py-1 rounded-full mb-3">
            Paket untuk {item.label}
          </span>
          <h3 className="text-2xl font-black text-gray-900">{item.label}</h3>
          <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
        </div>
        <div className="space-y-3">
          {item.packages.map((pkg) => (
            <div key={pkg.name} className="border border-gray-200 rounded-2xl p-4 hover:border-[#162058]/30 hover:bg-gray-50 transition-all">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-bold text-gray-900 text-sm">{pkg.name}</p>
                <span className="text-[#162058] font-black text-sm shrink-0 bg-[#162058]/8 px-2 py-0.5 rounded-lg">{pkg.price}</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{pkg.detail}</p>
            </div>
          ))}
        </div>
        <a href={WA_LINK(`Halo AjiStat, saya adalah ${item.label} dan ingin tanya paket layanan yang sesuai`)}
          target="_blank" rel="noopener noreferrer"
          className="mt-5 w-full flex items-center justify-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          💬 Tanya Paket via WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ─── Tool Modal ─── */
type ToolItem = typeof TOOLS[0];

function ToolModal({ tool, onClose }: { tool: ToolItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shadow-lg bg-white border border-gray-100">
            {tool.logo ? (
              <Image src={tool.logo} alt={tool.name} width={48} height={48} className="object-contain p-1" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: tool.color }}>
                {tool.name.slice(0, 2)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900">{tool.name}</h3>
            <span className="text-xs font-semibold bg-[#1B3A8C]/10 text-[#1B3A8C] px-2 py-0.5 rounded-full">Tersedia di AjiStat</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{tool.desc}</p>
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Digunakan untuk:</p>
          <p className="text-gray-700 text-sm">{tool.useFor}</p>
        </div>
        <a href={WA_LINK(`Halo AjiStat, saya ingin belajar ${tool.name}`)} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#1B3A8C] hover:bg-[#2348A8] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          Tanya Kelas {tool.name}
        </a>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function AjiStatPage() {
  const [activeTarget, setActiveTarget] = useState<TargetItem | null>(null);
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            Divisi Statistik & Riset — Aji Institute
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            Konsultasi &<br />
            <span className="text-[#F0A500]">Olah Data Statistik</span><br />
            <span className="text-white/70">Profesional</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
            AjiStat adalah mitra riset terpercaya Anda. Kami melayani pengolahan dan analisis data penelitian
            kuantitatif & kualitatif — untuk skripsi, tesis, disertasi, dan riset institusional.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={WA_LINK('Halo AjiStat, saya ingin konsultasi olah data')} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl transition-colors text-sm shadow-xl">
              Konsultasi Sekarang
            </a>
            <Link href="#layanan"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-colors text-sm">
              Lihat Layanan
            </Link>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {['5.000+ Klien Terbantu', 'Respons dalam 24 Jam', 'Berpengalaman Sejak 2015', '100% Kerahasiaan Data', 'Mahasiswa S1 — S3'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="py-14 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { num: '5.000+', label: 'Klien Terbantu' },
              { num: '10+', label: 'Software Dikuasai' },
              { num: '2015', label: 'Berpengalaman Sejak' },
              { num: '24 Jam', label: 'Siap Membantu' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm">
                <p className="text-3xl font-black text-[#162058] mb-1">{s.num}</p>
                <p className="text-gray-500 text-xs font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LAYANAN ─── */}
      <section id="layanan" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Layanan Kami</p>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Solusi Lengkap untuk Riset Anda</h2>
            <p className="text-gray-500">Dari konsultasi awal hingga laporan final — kami dampingi setiap tahap penelitian Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Konsultasi Data',
                subtitle: 'Pendampingan Riset',
                desc: 'Pendampingan profesional untuk kebutuhan olah data penelitian Anda — dari metodologi hingga interpretasi hasil yang siap dipresentasikan.',
                tags: ['Kuantitatif', 'Kualitatif', 'Campuran'],
                href: WA_LINK('Halo AjiStat, saya ingin konsultasi data'),
                cta: 'Mulai Konsultasi',
              },
              {
                title: 'Kelas Privat',
                subtitle: '1-on-1 Intensif',
                desc: 'Pembelajaran 1-on-1 sesuai jadwal dan kebutuhan Anda. Langsung praktik software statistik dengan pendampingan intensif dari fasilitator expert.',
                tags: ['Jadwal Fleksibel', '1-on-1', 'Praktik Langsung'],
                href: '/private-class',
                cta: 'Lihat Kelas Privat',
              },
              {
                title: 'Bootcamp',
                subtitle: 'Intensif 3–5 Hari',
                desc: 'Program pelatihan intensif terstruktur 3–5 hari. Pelajari satu software atau metode secara mendalam bersama komunitas peserta lainnya.',
                tags: ['Intensif', 'Bersertifikat', 'Komunitas'],
                href: '/bootcamp',
                cta: 'Lihat Bootcamp',
              },
            ].map((s) => (
              <div key={s.title} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <p className="text-[#2348A8] text-xs font-bold uppercase tracking-wider mb-1">{s.subtitle}</p>
                <h3 className="text-xl font-black text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs font-semibold px-2.5 py-1 bg-[#162058]/8 text-[#162058] rounded-full">{t}</span>
                  ))}
                </div>
                {s.href.startsWith('http') ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                    className="text-[#162058] font-bold text-sm hover:text-[#2348A8] transition-colors group-hover:underline">
                    {s.cta} →
                  </a>
                ) : (
                  <Link href={s.href} className="text-[#162058] font-bold text-sm hover:text-[#2348A8] transition-colors group-hover:underline">
                    {s.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOFTWARE TOOLS ─── */}
      <section id="software" className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Tools & Software yang Kami Kuasai
            </p>
            <p className="text-gray-500 text-xs">Klik logo untuk informasi lebih lanjut</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {TOOLS.map((tool) => (
              <button key={tool.name} onClick={() => setActiveTool(tool)}
                className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                title={`Klik untuk info tentang ${tool.name}`}>
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shadow-md group-hover:scale-110 transition-all bg-white border border-gray-100">
                  {tool.logo ? (
                    <Image src={tool.logo} alt={tool.name} width={48} height={48} className="object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-black text-sm"
                      style={{ backgroundColor: tool.color }}>
                      {tool.name.length <= 4 ? tool.name : tool.name.slice(0, 3)}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-800 font-medium transition-colors">{tool.name}</span>
              </button>
            ))}
          </div>
        </div>
        {activeTool && <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />}
      </section>

      {/* ─── TOPIK ─── */}
      <section id="topik" className="py-16 bg-[#162058]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#F0A500] text-sm font-semibold uppercase tracking-widest mb-2">Topik Statistika</p>
            <h2 className="text-3xl font-black text-white mb-2">Cakupan Analisis yang Luas</h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">Kami menguasai berbagai metode dan teknik analisis statistik — dari dasar hingga lanjutan.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TOPICS.map((t) => (
              <span key={t} className="text-sm font-medium px-4 py-2 bg-white/8 border border-white/15 text-white/80 rounded-full hover:bg-[#F0A500]/15 hover:border-[#F0A500]/40 hover:text-[#F0A500] transition-all cursor-default">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UNTUK SIAPA ─── */}
      <section id="target" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Untuk Siapa?</p>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Melayani Berbagai Kalangan</h2>
            <p className="text-gray-500 text-sm">Klik kartu untuk melihat paket & estimasi harga yang sesuai.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TARGET_MARKET.map((t) => (
              <button key={t.key} onClick={() => setActiveTarget(t)}
                className="group border border-gray-200 rounded-2xl p-5 text-center hover:border-[#162058]/40 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer text-left">
                <p className="font-black text-gray-900 text-sm mb-1 group-hover:text-[#162058] transition-colors">{t.label}</p>
                <p className="text-gray-400 text-xs leading-snug mb-3">{t.desc}</p>
                <span className="text-[10px] font-bold text-[#2348A8] bg-[#2348A8]/10 px-2 py-0.5 rounded-full">
                  Lihat Paket →
                </span>
              </button>
            ))}
          </div>
        </div>
        {activeTarget && <TargetModal item={activeTarget} onClose={() => setActiveTarget(null)} />}
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#F0A500] py-14">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-black text-[#162058] mb-3">Siap Mulai Riset Anda?</h2>
          <p className="text-[#162058]/70 mb-6 text-sm">Hubungi tim AjiStat sekarang dan dapatkan konsultasi gratis untuk menentukan layanan terbaik.</p>
          <a href={WA_LINK('Halo AjiStat, saya ingin konsultasi riset')} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-black px-8 py-4 rounded-2xl transition-colors">
            Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
