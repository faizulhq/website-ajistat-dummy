'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Users, BookOpen, Award, Briefcase, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { PROGRAMS, TOOLS, WA_LINK } from '@/lib/config';
import type { Program } from '@/lib/types';
import { cn } from '@/lib/utils';

// ─── HERO SLIDER ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    image: '/images/slide1.png',
    badge: '🎉 Terbatas — Daftar Sekarang',
    badgeColor: 'bg-[#F0A500] text-[#0C1A45]',
    headline: 'Ikuti Bootcamp\nGratis Pertamamu',
    subtext: 'Mulai perjalanan belajar Anda di Aji Institute — gratis, terstruktur, dan langsung praktik bersama mentor berpengalaman.',
    cta: 'Daftar Sekarang →',
    ctaHref: '/bootcamp',
    cta2: '💬 Tanya via WhatsApp',
    cta2Href: WA_LINK('Halo, saya ingin info Bootcamp Gratis Aji Institute'),
    chips: ['Gratis', 'Bersertifikat', 'Mentor Expert', 'Praktik Langsung'],
    stats: [{ val: '500+', label: 'Alumni' }, { val: '4.9★', label: 'Rating' }],
    overlay: 'from-[#0C1A45]/90 via-[#0C1A45]/70 to-transparent',
  },
  {
    image: '/images/slide2.png',
    badge: '⭐ Program Unggulan',
    badgeColor: 'bg-[#162660] text-[#4FA8D8] border border-[#4FA8D8]/40',
    headline: 'Kuasai Statistika\n& Riset dengan AjiStat',
    subtext: 'SPSS, SmartPLS, NVivo, R, Python, AMOS, EViews, STATA — semua ada di sini. Dibimbing langsung oleh pakar riset berpengalaman.',
    cta: 'Lihat Program AjiStat →',
    ctaHref: '/program-ajistat',
    cta2: '💬 Konsultasi Gratis',
    cta2Href: WA_LINK('Halo, saya ingin info program AjiStat'),
    chips: ['SPSS', 'SmartPLS', 'NVivo', 'R', 'Python', 'AMOS'],
    stats: [{ val: '10+', label: 'Tools' }, { val: '5', label: 'Format Kelas' }],
    overlay: 'from-[#0C1A45]/85 via-[#162660]/65 to-transparent',
  },
  {
    image: '/images/slide3.png',
    badge: '🚀 Kini Tersedia',
    badgeColor: 'bg-purple-600/80 text-white backdrop-blur',
    headline: '5 Divisi Program\nAji Institute',
    subtext: 'AjiStat, AjiBiz, AjiPR, AjiDigi, AjiLanguage — satu platform untuk semua kebutuhan pengembangan kompetensi profesional Anda.',
    cta: 'Eksplorasi Semua Program →',
    ctaHref: '/program-ajibiz',
    cta2: '💬 Diskusi Program',
    cta2Href: WA_LINK('Halo, saya ingin tahu lebih lanjut tentang program Aji Institute'),
    chips: ['AjiStat', 'AjiBiz', 'AjiPR', 'AjiDigi', 'AjiLanguage'],
    stats: [{ val: '5', label: 'Divisi' }, { val: '30+', label: 'Kelas' }],
    overlay: 'from-[#1a1040]/90 via-[#2d1b69]/70 to-transparent',
  },
];

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % SLIDES.length), []);
  const prev = () => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative overflow-hidden min-h-[90vh] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.headline}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        <div className={cn('absolute inset-0 bg-gradient-to-r', slide.overlay)} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className={cn('inline-block text-xs font-bold px-4 py-2 rounded-full mb-6', slide.badgeColor)}>
            {slide.badge}
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 whitespace-pre-line">
            {slide.headline}
          </h1>

          {/* Sub */}
          <p className="text-white/80 text-lg mb-6 leading-relaxed max-w-xl">
            {slide.subtext}
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {slide.chips.map((c) => (
              <span key={c} className="text-xs bg-white/20 backdrop-blur text-white px-3 py-1.5 rounded-full font-semibold border border-white/20">
                {c}
              </span>
            ))}
          </div>

          {/* Stats inline */}
          <div className="flex gap-6 mb-8">
            {slide.stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-[#F0A500]">{s.val}</p>
                <p className="text-white/60 text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={slide.ctaHref}
              className="inline-flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 shadow-2xl">
              {slide.cta}
            </Link>
            <a href={slide.cta2Href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-7 py-4 rounded-2xl text-base transition-all hover:bg-white/10 backdrop-blur">
              {slide.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur text-white rounded-full flex items-center justify-center transition-all hover:scale-110">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur text-white rounded-full flex items-center justify-center transition-all hover:scale-110">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`}
            className={cn('h-2.5 rounded-full transition-all duration-300', i === active ? 'w-10 bg-[#F0A500]' : 'w-2.5 bg-white/40 hover:bg-white/70')} />
        ))}
      </div>

      {/* Slide progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 h-1 bg-[#F0A500]/80 transition-none animate-progress z-20"
          style={{ animationDuration: '5s', animationIterationCount: 1 }}
        />
      )}
    </section>
  );
}

// ─── TOOL MODAL ──────────────────────────────────────────────────────────────
type ToolType = typeof TOOLS[0];

function ToolModal({ tool, onClose }: { tool: ToolType; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg"
            style={{ backgroundColor: tool.color }}>
            {tool.name.slice(0, 2)}
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900">{tool.name}</h3>
            <span className="text-xs font-semibold bg-[#162660]/10 text-[#162660] px-2 py-0.5 rounded-full">
              Tersedia di AjiStat
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{tool.desc}</p>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Digunakan untuk:</p>
          <p className="text-gray-700 text-sm">{tool.useFor}</p>
        </div>
        <a href={WA_LINK(`Halo, saya ingin belajar ${tool.name} di AjiStat`)}
          target="_blank" rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#162660] hover:bg-[#2568B5] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          💬 Tanya Kelas {tool.name}
        </a>
      </div>
    </div>
  );
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const STATS = [
  { icon: Users, value: '500+', label: 'Alumni Terlatih' },
  { icon: BookOpen, value: '30+', label: 'Program Aktif' },
  { icon: Briefcase, value: '10+', label: 'Fasilitator Expert' },
  { icon: Award, value: '5', label: 'Divisi Program' },
];

const AJI_PILLARS = [
  {
    letter: 'A',
    name: 'Amanah',
    desc: 'Integritas, kejujuran, dan tanggung jawab dalam setiap layanan kami. Kepercayaan Anda adalah amanah terbesar kami.',
    gradient: 'from-[#0C1A45] to-[#162660]',
    accent: '#4FA8D8',
    icon: '🛡️',
  },
  {
    letter: 'J',
    name: 'Jana',
    desc: 'Berpikir kritis, ilmiah, analitis, berbasis data dan kebenaran ilmiah. Kami percaya ilmu pengetahuan adalah fondasi kemajuan.',
    gradient: 'from-[#162660] to-[#2568B5]',
    accent: '#F0A500',
    icon: '🔬',
  },
  {
    letter: 'I',
    name: 'Insani',
    desc: 'Humanis, empatik, dan pengembangan manusia seutuhnya. Setiap peserta adalah individu yang berhak tumbuh dan berkembang.',
    gradient: 'from-[#2568B5] to-[#1e4fa0]',
    accent: '#4ade80',
    icon: '❤️',
  },
];

const KONSULTASI_LAYANAN = [
  { icon: '📊', title: 'Analisis Data Kuantitatif' },
  { icon: '🔍', title: 'Analisis Data Kualitatif (NVivo)' },
  { icon: '💾', title: 'Olah & Pengolahan Data' },
  { icon: '🎓', title: 'Pendampingan Skripsi / Tesis / Disertasi' },
  { icon: '🏢', title: 'Riset & Konsultasi Bisnis' },
  { icon: '📄', title: 'Penyusunan Laporan Hasil Analisis' },
];

const TESTIMONIALS = [
  { name: 'Rahma A.', role: 'Mahasiswa S2, UGM', program: 'Bootcamp SmartPLS', rating: 5, comment: 'Bootcamp SmartPLS AjiStat benar-benar mengubah cara saya memandang SEM. Dalam 3 hari saya sudah bisa menganalisis sendiri untuk tesis saya.' },
  { name: 'Dr. Budi S.', role: 'Dosen, Universitas Indonesia', program: 'Bootcamp NVivo', rating: 5, comment: 'Materi NVivo-nya sangat mendalam dan aplikatif. Sekarang saya rutin merekomendasikan AjiStat ke mahasiswa bimbingan saya.' },
  { name: 'Fira N.', role: 'Peneliti, LIPI', rating: 5, program: 'Private Class SPSS', comment: 'Private class-nya sangat personal dan fleksibel. Fasilitatornya sabar sekali menjelaskan analisis yang kompleks sekalipun.' },
];

export default function HomePage() {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);

  // Featured programs: 1 bootcamp + 1 private-class + 1 short-class
  const { data: bootcampData, isLoading: l1 } = useQuery({
    queryKey: ['programs', 'bootcamp', 'homepage'],
    queryFn: () => programsApi.list({ type: 'bootcamp' }).then((r) => {
      const arr = r.data?.data ?? r.data;
      return Array.isArray(arr) ? arr[0] : undefined;
    }),
  });
  const { data: privateData, isLoading: l2 } = useQuery({
    queryKey: ['programs', 'private-class', 'homepage'],
    queryFn: () => programsApi.list({ type: 'private-class' }).then((r) => {
      const arr = r.data?.data ?? r.data;
      return Array.isArray(arr) ? arr[0] : undefined;
    }),
  });
  const { data: shortData, isLoading: l3 } = useQuery({
    queryKey: ['programs', 'short-class', 'homepage'],
    queryFn: () => programsApi.list({ type: 'short-class' }).then((r) => {
      const arr = r.data?.data ?? r.data;
      return Array.isArray(arr) ? arr[0] : undefined;
    }),
  });

  const featuredPrograms = [bootcampData, privateData, shortData].filter(Boolean) as Program[];
  const isLoading = l1 || l2 || l3;

  return (
    <>
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* Stats strip */}
      <div className="bg-[#0C1A45] border-b border-[#4FA8D8]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-[#4FA8D8]/20 rounded-xl flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5 text-[#4FA8D8]" />
                </div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-white/50 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. AJISTAT SPOTLIGHT — Dedicated showcase */}
      <section className="py-0 overflow-hidden">
        <div className="bg-gradient-to-br from-[#0C1A45] via-[#162660] to-[#2568B5] relative">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-5xl">📊</span>
                  <div>
                    <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">⭐ Program Unggulan</span>
                    <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">AjiStat</h2>
                  </div>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Pusat pelatihan statistik, metodologi penelitian, dan analisis data terlengkap di Indonesia. Cocok untuk mahasiswa, peneliti, dosen, dan profesional.
                </p>
                {/* Tool chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['SPSS', 'SmartPLS', 'NVivo', 'R', 'Python', 'AMOS', 'EViews', 'STATA'].map((t) => (
                    <span key={t} className="text-xs bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full font-semibold border border-white/20 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/program-ajistat"
                    className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-black px-7 py-3.5 rounded-xl transition-all hover:scale-105">
                    Lihat Semua Program AjiStat <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href={WA_LINK('Halo, saya ingin konsultasi program AjiStat')}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:bg-white/10">
                    💬 Konsultasi Gratis
                  </a>
                </div>
              </div>

              {/* Right — Format cards */}
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Format Belajar Tersedia</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { fmt: 'Bootcamp', icon: '🎓', desc: 'Intensif 3–5 hari, materi mendalam', href: '/bootcamp' },
                    { fmt: 'Private Class', icon: '👤', desc: 'Jadwal fleksibel, 1-on-1 mentor', href: '/private-class' },
                    { fmt: 'Short Class', icon: '⚡', desc: 'Topik spesifik, 2–4 jam per sesi', href: '/short-class' },
                    { fmt: 'Workshop', icon: '🔧', desc: 'Hands-on praktik dengan dataset nyata', href: '/workshop' },
                    { fmt: 'Konsultasi', icon: '💬', desc: 'Pendampingan riset personal', href: '/konsultasi' },
                  ].map((item) => (
                    <Link key={item.fmt} href={item.href}
                      className="flex items-start gap-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl p-4 transition-all group">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-white font-bold text-sm group-hover:text-[#F0A500] transition-colors">{item.fmt}</p>
                        <p className="text-white/50 text-xs">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                  {/* Stats card */}
                  <div className="flex items-center justify-around bg-[#F0A500]/20 border border-[#F0A500]/30 rounded-xl p-4">
                    {[{ val: '500+', label: 'Alumni' }, { val: '4.9★', label: 'Rating' }, { val: '10+', label: 'Tools' }].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-[#F0A500] font-black text-lg">{s.val}</p>
                        <p className="text-white/50 text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION AJI — 3 PILAR */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Nilai Inti Kami</p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
              Makna di Balik{' '}
              <span className="bg-gradient-to-r from-[#162660] to-[#2568B5] bg-clip-text text-transparent">AJI</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AJI_PILLARS.map((pillar) => (
              <div key={pillar.letter}
                className={cn('relative rounded-3xl p-10 overflow-hidden text-white bg-gradient-to-br shadow-2xl', pillar.gradient)}>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[160px] font-black text-white/[0.06] select-none leading-none pointer-events-none">
                  {pillar.letter}
                </span>
                <div className="relative z-10">
                  <div className="text-5xl mb-5">{pillar.icon}</div>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-8xl font-black leading-none" style={{ color: pillar.accent }}>{pillar.letter}</span>
                    <span className="text-2xl font-bold pb-3 text-white">{pillar.name}</span>
                  </div>
                  <p className="text-white/70 leading-relaxed text-sm">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GRID 5 PROGRAM UTAMA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">5 Divisi Program</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Pilih Jalur Pengembangan Anda</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {PROGRAMS.map((prog) => (
              <Link key={prog.code} href={prog.href}
                className={cn(
                  'group relative rounded-2xl p-6 text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl',
                  prog.isFeatured && 'ring-2 ring-[#F0A500]/60'
                )}
                style={{ background: `linear-gradient(135deg, ${prog.color} 0%, ${prog.color}cc 100%)` }}
              >
                {prog.isFeatured && (
                  <span className="absolute top-3 right-3 text-[10px] bg-[#F0A500] text-[#0C1A45] font-bold px-2 py-0.5 rounded-full">⭐ Unggulan</span>
                )}
                <div className="text-4xl mb-4">{prog.icon}</div>
                <p className="font-black text-xl mb-1">{prog.name}</p>
                <p className="text-white/70 text-xs mb-4 leading-relaxed">{prog.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {prog.topics.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                  {prog.topics.length > 3 && (
                    <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full">+{prog.topics.length - 3}</span>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROGRAMS DARI API (diverse: 1 bootcamp + 1 private + 1 short) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-2">Program Pilihan</p>
              <h2 className="text-3xl font-black text-gray-900">Program Unggulan</h2>
              <p className="text-gray-500 text-sm mt-1">Satu dari setiap format — Bootcamp, Private Class, Short Class</p>
            </div>
            <Link href="/bootcamp" className="hidden sm:flex items-center gap-1.5 text-[#2568B5] font-semibold hover:underline text-sm">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)
              : featuredPrograms.map((p) => <ProgramCard key={p.id} program={p} />)
            }
          </div>
        </div>
      </section>

      {/* 6. PREVIEW LAYANAN KONSULTASI */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Layanan Kami</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Apa yang Bisa Kami Bantu?</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">Dari analisis data hingga pendampingan riset — tim ahli kami siap mendampingi Anda.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {KONSULTASI_LAYANAN.map((item) => (
              <div key={item.title}
                className="flex items-center gap-4 p-5 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-[#2568B5]/20 rounded-2xl transition-all cursor-default">
                <div className="text-3xl shrink-0">{item.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/layanan" className="inline-flex items-center gap-2 text-[#2568B5] font-semibold hover:underline">
              Lihat Semua Layanan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TOOLS & SOFTWARE — Logo cards with modal */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Tools &amp; Software yang Kami Kuasai
            </p>
            <p className="text-gray-500 text-xs">Klik logo untuk informasi lebih lanjut</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {TOOLS.map((tool) => (
              <button
                key={tool.name}
                onClick={() => setActiveTool(tool)}
                className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                title={`Klik untuk info tentang ${tool.name}`}
              >
                {/* Logo card */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-110 transition-all"
                  style={{ backgroundColor: tool.color }}
                >
                  {tool.name.length <= 4 ? tool.name : tool.name.slice(0, 3)}
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-800 font-medium transition-colors">{tool.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Modal */}
      {activeTool && <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />}

      {/* 8. TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Kata Mereka</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Testimoni Alumni</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-0.5 text-[#F0A500] text-lg">{'★'.repeat(t.rating)}</div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">"{t.comment}"</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                  <p className="text-[#2568B5] text-xs mt-0.5">{t.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA KERJA SAMA */}
      <section className="py-20 bg-gradient-to-br from-[#0C1A45] via-[#162660] to-[#1e4fa0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#4FA8D8] text-sm font-semibold uppercase tracking-widest mb-4">Kolaborasi Institusional</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ingin Berkolaborasi dengan Aji Institute?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Kami terbuka untuk kemitraan dengan universitas, lembaga riset, dan perusahaan dalam penyelenggaraan pelatihan dan pengembangan kompetensi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kerja-sama"
              className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-black px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
              Ajukan Kerja Sama <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={WA_LINK('Halo Aji Institute, saya tertarik untuk berkolaborasi')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all hover:bg-white/10">
              💬 Diskusi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
