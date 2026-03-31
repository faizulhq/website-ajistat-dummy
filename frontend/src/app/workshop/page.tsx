'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Users, BookOpen, Star, Award } from 'lucide-react';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { WA_LINK, PROGRAMS } from '@/lib/config';
import type { Program } from '@/lib/types';

const STATS = [
  { icon: Users, value: '200+', label: 'Peserta Workshop' },
  { icon: BookOpen, value: '15+', label: 'Topik Workshop' },
  { icon: Star, value: '4.9', label: 'Rating Rata-rata' },
  { icon: Award, value: '100%', label: 'Bersertifikat' },
];

const WORKSHOP_INFO = [
  { title: 'Workshop AjiStat', desc: 'Hands-on analisis data dengan SPSS, SmartPLS, NVivo, R, Python. Pakai dataset riset nyata.', prog: 'AjiStat' },
  { title: 'Workshop AjiBiz', desc: 'Praktik langsung business model canvas, analisis pasar, dan strategi pemasaran bisnis.', prog: 'AjiBiz' },
  { title: 'Workshop AjiPR', desc: 'Latihan public speaking, presentasi profesional, dan media relation langsung dengan feedback.', prog: 'AjiPR' },
];

export default function WorkshopPage() {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['programs', 'workshop', search],
    queryFn: () => programsApi.list({ type: 'workshop', search: search || undefined }).then((r) => r.data),
  });

  const programs: Program[] = data?.data ?? [];

  return (
    <>
      {/* HERO */}
      <div className="bg-[#054E7A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1AAEE0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#47C2EA]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">Aji Institute</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">Workshop Intensif</h1>
            <p className="text-white/70 text-lg mb-6">
              Hands-on workshop dari semua program Aji Institute — AjiStat, AjiBiz, AjiPR, dan lebih banyak lagi. Praktik langsung, langsung berdampak.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-white/8 border border-white/12 rounded-2xl p-4">
                  <Icon className="w-5 h-5 text-[#47C2EA] mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-white/50 text-xs">{label}</p>
                </div>
              ))}
            </div>
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text" placeholder="Cari workshop..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#47C2EA] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Workshop dari semua program */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-2">Jenis Workshop</p>
            <h2 className="text-3xl font-black text-gray-900">Workshop Lintas Program</h2>
            <p className="text-gray-500 mt-2">Workshop tersedia dari berbagai divisi program Aji Institute</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {WORKSHOP_INFO.map((w) => (
              <div key={w.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-black text-gray-900">{w.title}</h3>
                  <span className="text-xs bg-[#0B7AB5]/10 text-[#0B7AB5] px-2 py-0.5 rounded-full font-semibold">{w.prog}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{w.desc}</p>
                <a href={WA_LINK(`Halo, saya ingin info tentang ${w.title}`)}
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#1AAEE0] font-semibold hover:underline">
                  Tanya Info →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program List dari API */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900">Workshop Tersedia</h2>
            <p className="text-gray-500 text-sm mt-1">Jadwal workshop yang sedang dan akan segera dibuka</p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 mb-4">Belum ada jadwal workshop yang terbuka saat ini.</p>
              <a href={WA_LINK('Halo, saya ingin info jadwal workshop Aji Institute')}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0B7AB5] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1AAEE0] transition-colors">
                Tanya Jadwal via WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#054E7A] to-[#1AAEE0]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ingin Request Workshop Khusus?</h2>
          <p className="text-white/70 mb-8">Kami menerima request workshop untuk institusi, perusahaan, atau komunitas. Hubungi kami sekarang.</p>
          <a href={WA_LINK('Halo, saya ingin request workshop khusus dari Aji Institute')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            Request Workshop via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
