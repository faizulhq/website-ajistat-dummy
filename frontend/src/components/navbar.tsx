'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { PROGRAMS, WA_LINK } from '@/lib/config';

// ── Warna Navbar (Navy Blue sesuai logo baru) ─────────────────────────────────
// bg navbar  : #162058 (dark navy)
// dropdown   : #0d1632
// active/hover accent: #4A72D4 (light navy blue)
// CTA gold   : #F0A500

const LAYANAN_LINKS = [
  { label: 'Bootcamp',          href: '/bootcamp' },
  { label: 'Private Class',     href: '/private-class' },
  { label: 'Short Class',       href: '/short-class' },
  { label: 'Workshop',          href: '/workshop' },
  { label: 'Konsultasi AjiStat', href: '/konsultasi' },
  { label: 'In-House Training', href: '/in-house-training' },
];

const MAIN_LINKS = [
  { href: '/blog',    label: 'Blog' },
  { href: '/tentang', label: 'Tentang' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen,        setMobileOpen]        = useState(false);
  const [programOpen,       setProgramOpen]        = useState(false);
  const [layananOpen,       setLayananOpen]        = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen]  = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen]  = useState(false);
  const progRef    = useRef<HTMLDivElement>(null);
  const layananRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (progRef.current    && !progRef.current.contains(e.target as Node))    setProgramOpen(false);
      if (layananRef.current && !layananRef.current.contains(e.target as Node)) setLayananOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProgramOpen(false);
    setLayananOpen(false);
  }, [pathname]);

  const isProgActive    = PROGRAMS.some((p) => pathname.startsWith(p.href));
  const isLayananActive = LAYANAN_LINKS.some((l) => pathname === l.href);

  return (
    <nav
      className="fixed inset-x-0 z-50 bg-[#162058] border-b border-white/10 transition-[top] duration-200"
      style={{ top: 'var(--ann-h, 0px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
              <Image
                src="/images/logo.png"
                alt="Aji Institute"
                width={200} 
                height={60}
                className="h-11 w-auto"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            <Link href="/"
              className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === '/' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10')}>
              Beranda
            </Link>

            {/* Program dropdown */}
            <div ref={progRef} className="relative">
              <button onClick={() => { setProgramOpen(!programOpen); setLayananOpen(false); }}
                className={cn('flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  programOpen || isProgActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10')}>
                Program & Kelas
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', programOpen && 'rotate-180')} />
              </button>

              {programOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#0d1632] border border-white/15 rounded-2xl shadow-2xl py-2 z-50">
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest px-4 py-2">Pilih Program</p>
                  {PROGRAMS.map((prog) => (
                    <Link key={prog.code} href={prog.href}
                      onClick={() => setProgramOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 transition-colors group',
                        pathname.startsWith(prog.href)
                          ? 'bg-white/10 text-[#4A72D4]'
                          : 'text-white/70 hover:text-white hover:bg-white/8'
                      )}>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm group-hover:text-[#4A72D4] transition-colors">{prog.name}</p>
                        <p className="text-white/40 text-[11px] truncate">{prog.desc}</p>
                      </div>
                      {prog.isFeatured && (
                        <span className="text-[9px] bg-[#F0A500] text-[#162058] font-bold px-1.5 py-0.5 rounded-full shrink-0">⭐</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Layanan dropdown */}
            <div ref={layananRef} className="relative">
              <button onClick={() => { setLayananOpen(!layananOpen); setProgramOpen(false); }}
                className={cn('flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  layananOpen || isLayananActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10')}>
                Layanan
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', layananOpen && 'rotate-180')} />
              </button>

              {layananOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-[#0d1632] border border-white/15 rounded-2xl shadow-2xl py-2 z-50">
                  {LAYANAN_LINKS.map((item) => (
                    <Link key={item.href} href={item.href}
                      onClick={() => setLayananOpen(false)}
                      className={cn('flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                        pathname === item.href ? 'text-[#4A72D4] bg-white/8' : 'text-white/65 hover:text-white hover:bg-white/8')}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {MAIN_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10')}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Right CTA ── */}
          <div className="flex items-center gap-2">
            <Link href="/konsultasi"
              className="hidden lg:flex items-center gap-1.5 bg-[#1B3A8C] hover:bg-[#2348A8] border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
              <MessageCircle className="w-3.5 h-3.5" /> Konsultasi Data
            </Link>
            <a href={WA_LINK('Halo Aji Institute, saya ingin mendaftar program')}
              target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
              Daftar Kelas
            </a>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d1632] border-t border-white/10 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <Link href="/" className="block px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/8 rounded-lg text-sm">Beranda</Link>

            {/* Mobile Program accordion */}
            <div>
              <button onClick={() => setMobileProgramOpen(!mobileProgramOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/8 rounded-lg text-sm">
                Program & Kelas
                <ChevronDown className={cn('w-4 h-4 transition-transform', mobileProgramOpen && 'rotate-180')} />
              </button>
              {mobileProgramOpen && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {PROGRAMS.map((prog) => (
                    <Link key={prog.code} href={prog.href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-white/65 hover:text-white text-sm rounded-lg">
                      {prog.name}
                      {prog.isFeatured && <span className="text-[9px] bg-[#F0A500] text-[#162058] font-bold px-1.5 py-0.5 rounded-full">Unggulan</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Layanan accordion */}
            <div>
              <button onClick={() => setMobileLayananOpen(!mobileLayananOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/8 rounded-lg text-sm">
                Layanan
                <ChevronDown className={cn('w-4 h-4 transition-transform', mobileLayananOpen && 'rotate-180')} />
              </button>
              {mobileLayananOpen && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {LAYANAN_LINKS.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-white/65 hover:text-white text-sm rounded-lg">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {MAIN_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/8 rounded-lg text-sm">
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link href="/konsultasi" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#1B3A8C] border border-white/20 text-white font-semibold py-2.5 rounded-xl text-sm">
                <MessageCircle className="w-4 h-4" /> Konsultasi Data
              </Link>
              <a href={WA_LINK('Halo Aji Institute, saya ingin mendaftar program')}
                target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#F0A500] text-[#162058] font-bold py-2.5 rounded-xl text-sm">
                💬 Daftar Kelas via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
