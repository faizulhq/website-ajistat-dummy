'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Clock, MessageCircle, Share2, Globe, ExternalLink } from 'lucide-react';

const footerLinks = {
  program: [
    { label: 'Bootcamp', href: '/bootcamp' },
    { label: 'Short Class', href: '/short-class' },
    { label: 'Private Class', href: '/private-class' },
    { label: 'Konsultasi AJI Statistik', href: '/konsultasi' },
  ],
  perusahaan: [
    { label: 'Tentang Kami', href: '#' },
    { label: 'Tim Fasilitator', href: '#' },
    { label: 'Blog Riset', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Karir', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0C1A45] to-[#080f24] border-t-4 border-[#4FA8D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg px-2 py-1">
                <Image src="/logo.png" alt="AjiStat" width={40} height={28} className="h-7" style={{ width: 'auto' }} />
              </div>
              <span className="text-white font-bold text-base">Aji Mitra Statistika</span>
            </div>
            <p className="text-[#4FA8D8] text-sm italic mb-3">"Mitra Terpercaya untuk Riset dan Statistika Anda"</p>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Platform edukasi statistik dan riset by PT. Amanah Jana Insani.
            </p>
            <div className="flex gap-3">
              {[
                { icon: MessageCircle, label: 'WhatsApp' },
                { icon: Share2, label: 'Share' },
                { icon: Globe, label: 'Website' },
                { icon: ExternalLink, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} title={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#2568B5] flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Program */}
          <div>
            <h5 className="text-white font-semibold mb-4">Program</h5>
            <ul className="space-y-2">
              {footerLinks.program.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 hover:text-[#4FA8D8] text-sm transition-colors">
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
              {footerLinks.perusahaan.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/60 hover:text-[#4FA8D8] text-sm transition-colors">
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
                <Phone className="w-4 h-4 text-[#4FA8D8] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#4FA8D8] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">info@ajimitrastatistika.id</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#4FA8D8] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">Senin–Jumat, 08.00–17.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-sm">© 2026 Aji Mitra Statistika — PT. Amanah Jana Insani.</p>
          <p className="text-white/30 text-xs">Dibuat dengan ❤️ untuk kemajuan riset Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
