'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PROGRAMS, WA_LINK } from '@/lib/config';
import { useCompanyConfig } from '@/hooks/useCompanyConfig';

const LAYANAN_LINKS = [
  { label: 'Bootcamp Intensif',  href: '/bootcamp' },
  { label: 'Short Class',        href: '/short-class' },
  { label: 'Private Class',      href: '/private-class' },
  { label: 'AjiStat ↗', href: 'https://ajistat.aji-institute.com' },
  { label: 'In-House Training',  href: '/in-house-training' },
];

const COMPANY_LINKS = [
  { label: 'Tentang Kami',   href: '/tentang' },
  { label: 'Blog & Artikel', href: '/blog' },
  { label: 'Workshop',       href: '/workshop' },
];

export function Footer() {
  const { config } = useCompanyConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#162058] to-[#0d1632] border-t-4 border-[#4A72D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl px-4 py-3 inline-block mb-5">
              <Image
                src="/images/logo.png"
                alt="Aji Institute"
                width={180}
                height={55}
                className="h-11 w-auto"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional
              dari statistik, bisnis, hingga komunikasi.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {PROGRAMS.map((p) => (
                <Link key={p.code} href={p.href}
                  className="text-[10px] bg-white/10 hover:bg-white/20 text-white/60 hover:text-white px-2.5 py-1 rounded-full transition-colors">
                  {p.code}
                </Link>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Layanan</p>
            <ul className="space-y-2.5">
              {LAYANAN_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Perusahaan</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Kontak</p>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
            <a href={`https://wa.me/${config.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-colors">
              {config.whatsapp_display}
            </a>
              </li>
              <li>
                <a href={`mailto:${config.email}`}
                  className="hover:text-white transition-colors">
                  {config.email}
                </a>
              </li>
              <li className="leading-snug whitespace-pre-line">{config.address}</li>
            </ul>
            {/* Sosial Media */}
            <div className="mt-5 flex items-center gap-3">
              <a href="https://www.instagram.com/aji.institute" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-pink-500/80 rounded-lg transition-colors"
                aria-label="Instagram Aji Institute">
                {/* Instagram SVG */}
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@aji.institute" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-black/80 rounded-lg transition-colors"
                aria-label="TikTok Aji Institute">
                {/* TikTok icon SVG (tidak ada di Lucide) */}
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.82 1.54V6.78a4.85 4.85 0 0 1-1.05-.09z"/>
                </svg>
              </a>
            </div>
            <a href={WA_LINK('Halo Aji Institute, saya ingin bertanya')}
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
              Konsultasi Gratis
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            {currentYear} Aji Institute by PT. Amanah Jnana Insani. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Dibuat untuk memajukan pendidikan Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
