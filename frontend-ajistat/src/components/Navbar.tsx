'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import Image from 'next/image';

const LAYANAN_LINKS = [
  { label: 'Bootcamp Intensif', href: '/bootcamp' },
  { label: 'Kelas Privat', href: '/private-class' },
  { label: 'Short Class', href: '/short-class' },
  { label: 'Konsultasi Data', href: '/konsultasi' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-[#162058] border-b border-white/10 h-[72px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="rounded-xl overflow-hidden bg-white">
            <Image
              src="/images/Logo-AjiStat.jpeg"
              alt="AjiStat by Aji Institute"
              width={1600}
              height={900}
              className="h-14 w-auto block"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5">
          <Link href="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
            Beranda
          </Link>

          {/* Layanan Dropdown */}
          <div className="relative">
            <button onClick={() => setLayananOpen(!layananOpen)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${layananOpen ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              Layanan
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${layananOpen ? 'rotate-180' : ''}`} />
            </button>
            {layananOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-[#0d1632] border border-white/15 rounded-2xl shadow-2xl py-2 z-50"
                onMouseLeave={() => setLayananOpen(false)}>
                {LAYANAN_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setLayananOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${pathname === item.href ? 'text-[#F0A500] bg-white/8' : 'text-white/65 hover:text-white hover:bg-white/8'}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#topik"
            className="px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            Topik
          </Link>
          <a href="https://aji-institute.com" target="_blank" rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            Aji Institute ↗
          </a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <a href={WA_LINK('Halo AjiStat, saya ingin konsultasi data')} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] text-xs font-bold px-4 py-2 rounded-xl transition-colors">
            Hubungi Kami
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 md:hidden bg-[#0d1632] border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/8 rounded-lg text-sm">Beranda</Link>
            {LAYANAN_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/8 rounded-lg text-sm">
                {item.label}
              </Link>
            ))}
            <a href="https://aji-institute.com" target="_blank" rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/8 rounded-lg text-sm">
              Aji Institute ↗
            </a>
            <div className="pt-3 border-t border-white/10">
              <a href={WA_LINK('Halo AjiStat, saya ingin konsultasi')} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#F0A500] text-[#162058] font-bold py-2.5 rounded-xl text-sm">
                Hubungi Kami via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
