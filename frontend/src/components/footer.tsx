'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Clock, MessageCircle, Share2, ExternalLink, MapPin } from 'lucide-react';
import { SUB_BRANDS, CONTACT, SITE, BRAND, WA_LINK } from '@/lib/config';

export function Footer() {
  const layanan = [
    { label: 'Bootcamp Intensif', href: '/bootcamp' },
    { label: 'Short Class', href: '/short-class' },
    { label: 'Private Class', href: '/private-class' },
    { label: 'Konsultasi Data AjiStat', href: '/konsultasi' },
    { label: 'In-House Training', href: '/in-house-training' },
  ];

  const perusahaan = [
    { label: 'Tentang Kami', href: '/#tentang' },
    { label: 'Blog & Artikel', href: '/blog' },
    { label: 'In-House Training', href: '/in-house-training' },
    { label: 'Layanan Utama', href: '/layanan' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#054E7A] to-[#03344F] border-t-4 border-[#47C2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo-v2.png" alt={SITE.name} width={44} height={31} className="h-8 w-auto" />
              <div>
                <p className="text-white font-bold text-base">{SITE.name}</p>
                <p className="text-[#47C2EA] text-[10px]">{SITE.company}</p>
              </div>
            </div>
            <p className="text-[#47C2EA] text-sm italic mb-3">"{SITE.tagline}"</p>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional — dari statistik, bisnis, hingga komunikasi.
            </p>

            {/* Sub-brands pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {SUB_BRANDS.map((b) => (
                <Link key={b.id} href={b.href}
                  className="text-[10px] bg-white/10 hover:bg-white/20 text-white/70 hover:text-white px-2.5 py-1 rounded-full transition-colors">
                  {b.name}
                </Link>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2">
              <a href={WA_LINK()} target="_blank" rel="noopener noreferrer" title="WhatsApp"
                className="w-9 h-9 rounded-lg bg-green-600/30 hover:bg-green-600 flex items-center justify-center text-green-300 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/ajiinstitute.id" target="_blank" rel="noopener noreferrer" title="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-pink-600 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" title="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0077B5] flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Program */}
          <div>
            <h5 className="text-white font-semibold mb-4">Layanan & Program</h5>
            <ul className="space-y-2">
              {layanan.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/55 hover:text-[#47C2EA] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h5 className="text-white font-semibold mb-4">Perusahaan</h5>
            <ul className="space-y-2">
              {perusahaan.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/55 hover:text-[#47C2EA] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h5 className="text-white font-semibold mb-4">Kontak</h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#47C2EA] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/55 text-sm">{CONTACT.whatsappDisplay}</p>
                  <a href={WA_LINK()} target="_blank" rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-xs transition-colors">
                    Chat via WhatsApp →
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#47C2EA] mt-0.5 shrink-0" />
                <span className="text-white/55 text-sm">{CONTACT.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#47C2EA] mt-0.5 shrink-0" />
                <span className="text-white/55 text-sm">{CONTACT.operationalHours}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#47C2EA] mt-0.5 shrink-0" />
                <span className="text-white/55 text-sm">{CONTACT.address}</span>
              </li>
            </ul>

            <div className="mt-5">
              <a
                href={WA_LINK('Halo Aji Institute, saya ingin berkonsultasi')}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors w-full justify-center"
              >
                <MessageCircle className="w-4 h-4" /> Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/35 text-sm">© 2026 {BRAND.footerLabel}. All rights reserved.</p>
          <p className="text-white/25 text-xs">Dibuat dengan ❤️ untuk kemajuan riset Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
