'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { TOOLS, WA_LINK } from '@/lib/config';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api';
import { TagProgramModal } from '@/components/TagProgramModal';
import type { Program } from '@/lib/types';

const SLIDES = [
  {
    image: '/images/slide1.jpeg',
    headline: 'Kuasai Statistika\n& Riset dengan AjiStat',
    subtext: 'SPSS, SmartPLS, NVivo, R, Python, AMOS, EViews, STATA — semua ada di sini. Dipandu langsung oleh pakar riset berpengalaman.',
    cta: 'Lihat Program AjiStat →',
    ctaHref: '/program-ajistat',
    cta2: 'Konsultasi Gratis',
    cta2Href: WA_LINK('Halo, saya ingin info program AjiStat'),
    chips: ['SPSS', 'SmartPLS', 'NVivo', 'R', 'Python', 'AMOS'],
    stats: [{ val: '10+', label: 'Tools' }, { val: '5', label: 'Format Layanan' }],
    overlay: 'from-[#162058]/90 via-[#1B3A8C]/75 to-transparent',
  },
  {
    image: '/images/slide-programs.jpg',
    headline: '5 Program\nAji Institute',
    subtext: 'AjiStat, AjiBiz, AjiPR, AjiDigi, AjiLangua — satu platform untuk semua kebutuhan pengembangan kompetensi profesional Anda.',
    cta: 'Eksplorasi Semua Program →',
    ctaHref: '/program-ajibiz',
    cta2: 'Diskusi Program',
    cta2Href: WA_LINK('Halo, saya ingin tahu lebih lanjut tentang program Aji Institute'),
    chips: ['AjiStat', 'AjiBiz', 'AjiPR', 'AjiDigi', 'AjiLangua'],
    stats: [{ val: '5', label: 'Program' }, { val: '30+', label: 'Layanan' }],
    overlay: 'from-[#0d1632]/85 via-[#162058]/60 to-transparent',
  },
  {
    image: '/images/programs/bootcamp-slide.jpeg',
    headline: 'Ikuti Bootcamp\nGratis Pertamamu',
    subtext: 'Mulai perjalanan belajar Anda di Aji Institute — gratis, terstruktur, dan langsung praktik bersama mentor berpengalaman.',
    cta: 'Daftar Sekarang →',
    ctaHref: '/bootcamp',
    cta2: 'Tanya via WhatsApp',
    cta2Href: WA_LINK('Halo, saya ingin info Bootcamp Gratis Aji Institute'),
    chips: ['Gratis', 'Bersertifikat', 'Mentor Expert', 'Praktik Langsung'],
    stats: [{ val: '10.000+', label: 'Alumni' }, { val: '4.9', label: 'Rating' }],
    overlay: 'from-[#162058]/90 via-[#1B3A8C]/70 to-transparent',
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { data: allProgramsData } = useQuery({
    queryKey: ['programs', 'all-tags'],
    queryFn: () => programsApi.list().then(r => r.data),
  });
  const allPrograms: Program[] = Array.isArray(allProgramsData?.data) ? allProgramsData.data : [];

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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 whitespace-pre-line">
            {slide.headline}
          </h1>

          <p className="text-white/80 text-lg mb-6 leading-relaxed max-w-xl">
            {slide.subtext}
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-8 items-center">
            {slide.chips.map((c) => {
              const toolMatch = TOOLS.find(t => t.name === c || (c === 'R' && t.name === 'R / RStudio'));
              if (toolMatch?.logo) {
                return (
                  <button key={c} title={toolMatch.name} onClick={() => setActiveTag(toolMatch.name)}
                    className="w-8 h-8 rounded-lg overflow-hidden bg-white/20 backdrop-blur hover:bg-white/30 border border-white/30 flex items-center justify-center transition-all hover:scale-110 cursor-pointer">
                    <Image src={toolMatch.logo} alt={toolMatch.name} width={24} height={24} className="object-contain p-0.5" />
                  </button>
                );
              }
              return (
                <button key={c} onClick={() => setActiveTag(c)}
                  className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur text-white px-3 py-1.5 rounded-full font-semibold border border-white/20 cursor-pointer transition-colors">
                  {c}
                </button>
              );
            })}
          </div>

          {/* Stats */}
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
            <a href={slide.ctaHref}
              className="inline-flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 shadow-2xl">
              {slide.cta}
            </a>
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

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 h-1 bg-[#F0A500]/80 transition-none animate-progress z-20"
          style={{ animationDuration: '5s', animationIterationCount: 1 }}
          key={active}
        />
      )}

      <TagProgramModal
        tag={activeTag}
        programs={allPrograms}
        onClose={() => setActiveTag(null)}
      />
    </section>
  );
}
