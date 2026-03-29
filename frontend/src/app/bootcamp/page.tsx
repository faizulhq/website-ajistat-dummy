'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Users, Award, BookOpen, Star } from 'lucide-react';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import type { Program } from '@/lib/types';

const TAGS = ['SPSS', 'SmartPLS', 'R', 'Python', 'Metodologi', 'Scopus', 'Skripsi', 'Bisnis', 'Digital Marketing', 'Public Speaking', 'Bahasa Inggris'];

const STATS = [
  { icon: Users, value: '500+', label: 'Alumni Terlatih' },
  { icon: BookOpen, value: '10+', label: 'Program Bootcamp' },
  { icon: Star, value: '4.9★', label: 'Rating Rata-rata' },
  { icon: Award, value: '100%', label: 'Sertifikasi Resmi' },
];

export default function BootcampPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['programs', 'bootcamp', search],
    queryFn: () => programsApi.list({ type: 'bootcamp', search: search || undefined }).then((r) => r.data),
  });

  const programs: Program[] = (data?.data ?? []).filter((p: Program) =>
    !activeTag || p.tags.some((t) => t.toLowerCase().includes(activeTag.toLowerCase()))
  );

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#0C1A45] relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4FA8D8] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2568B5] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Bootcamp Intensif</span>
          </nav>

          <div className="max-w-3xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-[#2568B5]/30 border border-[#2568B5]/50 text-[#4FA8D8] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              🎓 AJI Learning — Program Unggulan
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Bootcamp Intensif<br />
              <span className="text-[#4FA8D8]">Berbasis Data Nyata</span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Program pelatihan intensif 3–5 hari dengan pendekatan langsung praktik menggunakan data riset nyata.
              Dipandu fasilitator berpengalaman via Zoom. Dirancang untuk mahasiswa S1–S3 dan peneliti profesional
              yang serius mengembangkan kompetensi statistik dan metodologi penelitian.
            </p>

            {/* 3 keunggulan */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: '📡', text: 'Live via Zoom & Rekaman Tersedia' },
                { icon: '📊', text: 'Praktik Data Riset Nyata' },
                { icon: '🏆', text: 'Sertifikat Kelulusan Resmi' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-2">
                  <span>{item.icon}</span>
                  <span className="text-white/80 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3 py-5 px-6">
                  <div className="w-10 h-10 bg-[#2568B5]/30 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#4FA8D8]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">{value}</p>
                    <p className="text-white/50 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── PROGRAM LIST ─── */}
      <section className="py-14 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Pilih Program Bootcamp</h2>
            <p className="text-gray-500 text-sm">Klik program untuk melihat kurikulum, fasilitator, dan detail lengkap pendaftaran.</p>
          </div>

          {/* Filter bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-56">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari program bootcamp..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] focus:ring-2 focus:ring-[#2568B5]/10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    activeTag === tag
                      ? 'bg-[#162660] text-white border-[#162660]'
                      : 'border-gray-200 text-gray-600 hover:border-[#2568B5] hover:text-[#2568B5]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            {isLoading ? 'Memuat program...' : `${programs.length} program ditemukan`}
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <ProgramCardSkeleton key={i} />)}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-medium text-gray-500 mb-1">Tidak ada program yang cocok</p>
              <p className="text-sm">Coba kata kunci atau filter yang berbeda</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA KONSULTASI ─── */}
      <section className="bg-[#162660] py-14">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-[#4FA8D8] text-sm font-semibold uppercase tracking-widest mb-3">Butuh Panduan?</p>
          <h2 className="text-2xl font-bold text-white mb-4">Tidak yakin program mana yang cocok?</h2>
          <p className="text-white/60 mb-8">Tim konsultan AjiStat siap membantu Anda memilih program yang paling sesuai dengan kebutuhan riset dan jadwal Anda.</p>
          <a
            href="/konsultasi"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            💬 Konsultasi Gratis
          </a>
        </div>
      </section>
    </>
  );
}
