'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface PopupData {
  id: number;
  image: string;
  badge?: string;
  badge_color?: string;
  title: string;
  subtitle?: string;
  highlights?: string[];
  cta_text: string;
  cta_url: string;
  show_on_main_site: boolean;
  show_on_ajistat: boolean;
  order: number;
  slide_duration: number; // detik
}

const API = process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== '/api'
  ? process.env.NEXT_PUBLIC_API_URL
  : 'https://api.aji-institute.com';

export function WelcomePopup({ site }: { site: 'main' | 'ajistat' }) {
  const [slides, setSlides] = useState<PopupData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('popup_shown')) return;
    fetch(`${API}/api/cms/popup_active/`)
      .then((r) => (r.ok ? r.json() : []))
      .then((popups: PopupData[]) => {
        if (!Array.isArray(popups) || popups.length === 0) return;
        const filtered = popups.filter((p) =>
          site === 'main' ? p.show_on_main_site : p.show_on_ajistat
        );
        if (filtered.length === 0) return;
        setSlides(filtered);
        setTimeout(() => setVisible(true), 1000);
      })
      .catch(() => {});
  }, [site]);

  const goNext = useCallback(() => setCurrentIndex((i) => (i + 1) % slides.length), [slides.length]);
  const goPrev = useCallback(() => setCurrentIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!visible || slides.length <= 1) return;
    const duration = (slides[currentIndex]?.slide_duration ?? 5) * 1000;
    const timer = setTimeout(goNext, duration);
    return () => clearTimeout(timer);
  }, [visible, slides.length, currentIndex, goNext, slides]);

  function close() {
    setVisible(false);
    sessionStorage.setItem('popup_shown', '1');
  }

  if (!visible || slides.length === 0) return null;

  const data = slides[currentIndex];
  const badgeColor = data.badge_color ?? '#F0A500';
  const hasMultiple = slides.length > 1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
      style={{ backgroundColor: 'rgba(8,12,35,0.82)' }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-[780px] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{ animation: 'popupFadeIn 0.35s cubic-bezier(.22,1,.36,1)', maxHeight: '92vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol tutup */}
        <button onClick={close} className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center transition-colors" aria-label="Tutup">
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Nav PREV */}
        {hasMultiple && (
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center transition-colors" aria-label="Sebelumnya">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Nav NEXT */}
        {hasMultiple && (
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center transition-colors" aria-label="Berikutnya">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        )}

        {/* KIRI: Frame flyer */}
        <div className="md:w-[44%] shrink-0 flex flex-col justify-center items-center py-6 px-5 gap-3" style={{ background: 'linear-gradient(160deg, #101c60 0%, #162058 60%, #0a1240 100%)' }}>
          <div className="absolute top-0 left-0 w-20 h-20 opacity-10 pointer-events-none">
            <svg viewBox="0 0 80 80" fill="none">
              <circle cx="0" cy="0" r="60" stroke="#F0A500" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="40" stroke="#F0A500" strokeWidth="1" />
            </svg>
          </div>
          <div className="w-full rounded-xl overflow-hidden" style={{ boxShadow: '0 6px 40px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(240,165,0,0.30)' }}>
            <Image src={data.image} alt={data.title} width={360} height={480} className="w-full h-auto object-contain" priority unoptimized />
          </div>
          {hasMultiple && (
            <div className="flex gap-1.5 mt-1">
              {slides.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ backgroundColor: i === currentIndex ? badgeColor : 'rgba(255,255,255,0.25)', transform: i === currentIndex ? 'scale(1.3)' : 'scale(1)' }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
          <p className="text-white/25 text-[10px] tracking-widest uppercase mt-1">ajistat.aji-institute.com</p>
        </div>

        {/* KANAN: Konten dinamis */}
        <div key={data.id} className="flex-1 bg-[#0d1a4a] flex flex-col overflow-y-auto" style={{ animation: 'slideContentIn 0.3s ease-out' }}>
          <div className="bg-[#162058] px-6 py-5 border-b border-white/10">
            {data.badge && (
              <span className="inline-block text-[#0d1240] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide mb-3" style={{ backgroundColor: badgeColor }}>
                {data.badge}
              </span>
            )}
            <h2 className="text-white font-black text-[22px] leading-tight">{data.title}</h2>
            {data.subtitle && <p className="text-white/55 text-sm mt-2 leading-relaxed">{data.subtitle}</p>}
          </div>

          <div className="px-6 py-5 flex-1 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                <div className="font-black text-xl leading-none" style={{ color: badgeColor }}>5.000+</div>
                <div className="text-white/50 text-[11px] mt-1">Klien Terpercaya</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                <div className="font-black text-xl leading-none" style={{ color: badgeColor }}>S1 – S3</div>
                <div className="text-white/50 text-[11px] mt-1">Semua Jenjang</div>
              </div>
            </div>
            {data.highlights && data.highlights.length > 0 && (
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3 font-semibold">Layanan kami</p>
                <ul className="space-y-2.5">
                  {data.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-[5px] w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: badgeColor }} />
                      <span className="text-white/75 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="px-6 py-5 bg-[#0d1240] border-t border-white/10 space-y-3">
            <a href={data.cta_url} target="_blank" rel="noopener noreferrer" onClick={close}
              className="flex items-center justify-center gap-2 w-full font-black text-sm py-3.5 rounded-xl transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: badgeColor, color: '#0d1240' }}>
              {data.cta_text}
              <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={close} className="w-full text-white/35 hover:text-white/60 text-xs py-1 transition-colors">
              Lewati, saya akan kembali nanti →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideContentIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
