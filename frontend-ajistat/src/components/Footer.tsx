'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WA_LINK, CONTACT, BRAND } from '@/lib/config';
import { useCompanyConfigContext } from '@/components/CompanyConfigProvider';

const LAYANAN_LINKS = [
  { label: 'Bootcamp Intensif', href: '/bootcamp' },
  { label: 'Kelas Privat', href: '/private-class' },
  { label: 'Short Class', href: '/short-class' },
  { label: 'Konsultasi Data', href: '/konsultasi' },
];

const COMPANY_LINKS = [
  { label: 'Tentang Aji Institute', href: 'https://aji-institute.com/tentang' },
  { label: 'Blog & Artikel', href: 'https://aji-institute.com/blog' },
  { label: 'AjiBiz', href: 'https://aji-institute.com/program-ajibiz' },
  { label: 'AjiComm', href: 'https://aji-institute.com/program-ajicomm' },
  { label: 'AjiAI', href: 'https://aji-institute.com/program-ajiai' },
  { label: 'AjiLingua', href: 'https://aji-institute.com/program-ajilingua' },
];

export function Footer() {
  const { config } = useCompanyConfigContext();

  return (
    <footer className="bg-gradient-to-b from-[#162058] to-[#0d1632] border-t-4 border-[#4A72D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div className="rounded-xl overflow-hidden bg-white inline-block">
                <Image
                  src="/images/Logo-AjiStat.jpeg"
                  alt="AjiStat by Aji Institute"
                  width={1600}
                  height={900}
                  className="h-14 w-auto block"
                />
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Divisi Statistik &amp; Riset dari Aji Institute — mitra analisis data terpercaya untuk mahasiswa, peneliti, dan profesional.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Layanan</p>
            <ul className="space-y-2.5">
              {LAYANAN_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisi Lain */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Aji Institute</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target={item.href.startsWith('https') ? '_blank' : undefined}
                    rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Kontak</p>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors">
                  {config.whatsapp_display}
                </a>
              </li>
              <li>
                <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">
                  {config.email}
                </a>
              </li>
              <li className="leading-snug whitespace-pre-line">{config.address}</li>
            </ul>
            <a href={WA_LINK('Halo AjiStat, saya ingin tanya layanan')} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
              Hubungi via WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} AjiStat — Bagian dari{' '}
            <a href="https://aji-institute.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              Aji Institute
            </a>{' '}({BRAND.legalName}). All rights reserved.
          </p>
          <p className="text-white/20 text-xs">Dibuat untuk memajukan riset Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
