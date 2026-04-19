'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { TOOLS, TOPICS, TARGET_MARKET, WA_LINK, BOOTCAMP_PROGRAMS, PRIVATE_PROGRAMS, SHORT_CLASS_PROGRAMS } from '@/lib/config';
import type { ApiProgram } from '@/lib/types';

function formatPrice(p: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
}

/* ─── Target Market Modal ─── */
type TargetItem = typeof TARGET_MARKET[0];

function TargetModal({ item, onClose }: { item: TargetItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-7 z-10 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 bg-[#162058]/10 text-[#162058] text-xs font-bold px-3 py-1 rounded-full mb-3">Paket untuk {item.label}</span>
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
          Tanyakan via WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ─── Tool Modal ─── */
type ToolItem = typeof TOOLS[0];

function ToolModal({ tool, onClose }: { tool: ToolItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10" onClick={(e) => e.stopPropagation()}>
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
          Tanya Kelas {tool.name} via WA
        </a>
      </div>
    </div>
  );
}

/* ─── Service Modal (Bootcamp / Private / Short Class) ─── */
interface ServiceModalProps {
  title: string;
  programs: ApiProgram[];
  href: string;
  onClose: () => void;
}

function ServiceModal({ title, programs, href, onClose }: ServiceModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden z-10" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#162058] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Program Tersedia</p>
            <h3 className="text-white font-black text-base">{title}</h3>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 space-y-2 max-h-72 overflow-y-auto">
          {programs.map((p) => (
            <Link key={p.id} href={`/program/${p.slug}`} onClick={onClose}
              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#162058]/25 hover:bg-gray-50 transition-all group">
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-xs font-semibold leading-snug line-clamp-2 group-hover:text-[#162058] transition-colors">{p.title}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{p.duration}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[#162058] font-black text-xs">{formatPrice(p.price)}</p>
                {p.original_price && <p className="text-gray-300 text-[10px] line-through">{formatPrice(p.original_price)}</p>}
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#162058] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 flex items-center justify-between">
          <p className="text-gray-400 text-xs">Menampilkan {programs.length} program</p>
          <Link href={href} onClick={onClose}
            className="text-[#162058] font-bold text-xs hover:underline flex items-center gap-1">
            Lihat Selengkapnya <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── LAYANAN DATA ─── */
type ServiceKey = 'konsultasi' | 'privat' | 'bootcamp' | 'shortclass';

const LAYANAN = [
  {
    key: 'konsultasi' as ServiceKey,
    subtitle: 'Pendampingan Riset',
    title: 'Konsultasi & Olah Data',
    desc: 'Pendampingan profesional untuk kebutuhan olah data penelitian Anda — dari metodologi hingga interpretasi hasil yang siap dipresentasikan.',
    tags: ['Kuantitatif', 'Kualitatif', 'Campuran'],
    waMsg: 'Halo AjiStat, saya ingin konsultasi olah data penelitian',
  },
  {
    key: 'privat' as ServiceKey,
    subtitle: '1-on-1 Intensif',
    title: 'Kelas Privat',
    desc: 'Pembelajaran 1-on-1 sesuai jadwal dan kebutuhan Anda. Langsung praktik software statistik dengan pendampingan intensif dari fasilitator expert.',
    tags: ['Jadwal Fleksibel', '1-on-1', 'Praktik Langsung'],
    href: '/private-class',
  },
  {
    key: 'bootcamp' as ServiceKey,
    subtitle: 'Intensif 3–5 Hari',
    title: 'Bootcamp',
    desc: 'Program pelatihan intensif terstruktur 3–5 hari. Pelajari satu software atau metode secara mendalam bersama komunitas peserta lainnya.',
    tags: ['Intensif', 'Bersertifikat', 'Komunitas'],
    href: '/bootcamp',
  },
  {
    key: 'shortclass' as ServiceKey,
    subtitle: 'Singkat & Padat',
    title: 'Short Class',
    desc: 'Kelas singkat 2–3 jam yang fokus pada satu topik statistik secara tuntas. Cocok untuk yang ingin menguasai teknik tertentu dengan cepat.',
    tags: ['2–3 Jam', 'Terjangkau', 'Langsung Praktik'],
    href: '/short-class',
  },
];

/* ─── Main Page ─── */
export default function AjiStatClient({ allPrograms }: { allPrograms: ApiProgram[] }) {
  const [activeTarget, setActiveTarget] = useState<TargetItem | null>(null);
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [activeService, setActiveService] = useState<ServiceKey | null>(null);

  // Filter programs per type directly from API data
  const apiBootcamp = allPrograms.filter((p) => p.type === 'bootcamp');
  const apiShortClass = allPrograms.filter((p) => p.type === 'short-class');
  const apiPrivate = allPrograms.filter((p) => p.type === 'private-class');

  // Fallback to static config ONLY if API returns empty for that type
  const fallbackMap = (list: any[], type: any) => list.map(p => ({
      id: p.id, title: p.title, slug: p.slug, type,
      status: 'upcoming' as const, price: p.price, original_price: p.originalPrice,
      tags: p.tags, duration: p.duration, schedule: p.status ?? '',
      facilitator_name: p.facilitator, thumbnail_color: '#162058', is_featured: false,
  }));

  const serviceModalData: Record<Exclude<ServiceKey, 'konsultasi'>, { programs: ApiProgram[]; href: string }> = {
    privat: { programs: apiPrivate.length > 0 ? apiPrivate : fallbackMap(PRIVATE_PROGRAMS, 'private-class'), href: '/private-class' },
    bootcamp: { programs: apiBootcamp.length > 0 ? apiBootcamp : fallbackMap(BOOTCAMP_PROGRAMS, 'bootcamp'), href: '/bootcamp' },
    shortclass: { programs: apiShortClass.length > 0 ? apiShortClass : fallbackMap(SHORT_CLASS_PROGRAMS, 'short-class'), href: '/short-class' },
  };

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
            Pusat Pelatihan &<br />
            <span className="text-[#F0A500]">Riset Statistik</span><br />
            <span className="text-white/70">Terpercaya</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
            AjiStat adalah platform pelatihan statistik & pendampingan riset profesional —
            dari Bootcamp, Kelas Privat, Short Class, hingga Konsultasi & Olah Data.
            Untuk mahasiswa S1–S3, dosen, peneliti, dan institusi.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={WA_LINK('Halo AjiStat, saya ingin tanya layanan olah data')} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl transition-colors text-sm shadow-xl">
              Hubungi Kami via WhatsApp
            </a>
            <Link href="#layanan"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-colors text-sm">
              Lihat Layanan
            </Link>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {['5.000+ Klien Terbantu', 'Bootcamp · Privat · Short Class', 'Konsultasi & Olah Data', '10+ Software Statistik', 'Mahasiswa S1 — S3'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]" />{t}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LAYANAN.map((s) => {
              const isKonsultasi = s.key === 'konsultasi';
              const content = (
                <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all group h-full flex flex-col cursor-pointer">
                  <p className="text-[#2348A8] text-xs font-bold uppercase tracking-wider mb-1">{s.subtitle}</p>
                  <h3 className="text-xl font-black text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.tags.map((t) => (
                      <span key={t} className="text-xs font-semibold px-2.5 py-1 bg-[#162058]/8 text-[#162058] rounded-full">{t}</span>
                    ))}
                  </div>
                  <span className="text-[#162058] font-bold text-sm group-hover:text-[#2348A8] transition-colors group-hover:underline">
                    {isKonsultasi ? 'Selengkapnya →' : `Lihat Program →`}
                  </span>
                </div>
              );
              if (isKonsultasi) {
                return (
                  <Link key={s.key} href="/konsultasi">
                    {content}
                  </Link>
                );
              }
              return (
                <button key={s.key} onClick={() => setActiveService(s.key)} className="text-left">
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── UNTUK SIAPA ─── */}
      <section id="target" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Untuk Siapa?</p>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Melayani Berbagai Kalangan</h2>
            <p className="text-gray-500 text-sm">Klik kartu untuk melihat paket & estimasi harga yang sesuai.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TARGET_MARKET.map((t) => (
              <button key={t.key} onClick={() => setActiveTarget(t)}
                className="group border-2 border-gray-100 bg-white rounded-2xl p-6 text-left hover:border-[#162058]/30 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#162058] to-[#2348A8] flex items-center justify-center text-white font-black text-sm">
                    {t.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#2348A8] bg-[#2348A8]/10 px-2 py-0.5 rounded-full mt-1">
                    {t.packages.length} paket tersedia
                  </span>
                </div>
                <p className="font-black text-gray-900 text-lg mb-1 group-hover:text-[#162058] transition-colors">{t.label}</p>
                <p className="text-gray-400 text-sm leading-snug mb-4">{t.desc}</p>
                <div className="flex items-center gap-1.5 text-[#162058] font-bold text-sm">
                  <span>Lihat Paket</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
        {activeTarget && <TargetModal item={activeTarget} onClose={() => setActiveTarget(null)} />}
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

      {/* ─── SOFTWARE TOOLS ─── */}
      <section id="software" className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Tools & Software</p>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Software yang Kami Kuasai</h2>
            <p className="text-gray-500 text-sm">Klik logo untuk informasi lebih lanjut</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {TOOLS.map((tool) => (
              <button key={tool.name} onClick={() => setActiveTool(tool)}
                className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                title={`Klik untuk info tentang ${tool.name}`}>
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shadow-md group-hover:scale-110 transition-all bg-white border border-gray-100">
                  {tool.logo ? (
                    <Image src={tool.logo} alt={tool.name} width={48} height={48} className="object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: tool.color }}>
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

      {/* ─── CTA ─── */}
      <section className="bg-[#F0A500] py-14">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-black text-[#162058] mb-3">Siap Mulai Riset Anda?</h2>
          <p className="text-[#162058]/70 mb-6 text-sm">Hubungi tim AjiStat sekarang dan temukan layanan terbaik untuk kebutuhan riset Anda.</p>
          <a href={WA_LINK('Halo AjiStat, saya ingin tanya layanan yang sesuai dengan kebutuhan riset saya')} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-black px-8 py-4 rounded-2xl transition-colors">
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>

      {/* ─── Service Modals ─── */}
      {activeService && activeService !== 'konsultasi' && (
        <ServiceModal
          title={LAYANAN.find(l => l.key === activeService)!.title}
          programs={serviceModalData[activeService as Exclude<ServiceKey, 'konsultasi'>].programs}
          href={serviceModalData[activeService as Exclude<ServiceKey, 'konsultasi'>].href}
          onClose={() => setActiveService(null)}
        />
      )}
    </>
  );
}
