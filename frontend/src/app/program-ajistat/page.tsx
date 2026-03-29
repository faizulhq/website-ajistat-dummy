'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, CheckCircle, BookOpen, Users, Award, Clock } from 'lucide-react';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { WA_LINK } from '@/lib/config';
import type { Program } from '@/lib/types';

const FORMATS = [
  { icon: '🎓', name: 'Bootcamp', desc: 'Program intensif 3–5 hari. Materi mendalam, praktik langsung, kelompok kecil.', href: '/bootcamp', badge: 'Terpopuler' },
  { icon: '👤', name: 'Private Class', desc: 'Sesi 1-on-1 dengan mentor. Jadwal fleksibel, materi disesuaikan kebutuhan Anda.', href: '/private-class', badge: null },
  { icon: '⚡', name: 'Short Class', desc: 'Fokus topik spesifik dalam 2–4 jam. Cocok untuk pemula maupun peneliti berpengalaman.', href: '/short-class', badge: null },
  { icon: '🔧', name: 'Workshop', desc: 'Hands-on workshop dengan dataset riset nyata. Langsung bisa dipraktikkan.', href: '/workshop', badge: null },
  { icon: '💬', name: 'Konsultasi', desc: 'Pendampingan riset personal — dari pemilihan metode hingga interpretasi hasil.', href: '/konsultasi', badge: null },
];

const TOOLS = [
  { name: 'SPSS', desc: 'Statistical Package for Social Sciences', color: '#003087' },
  { name: 'SmartPLS', desc: 'SEM berbasis Partial Least Squares', color: '#E8A020' },
  { name: 'NVivo', desc: 'Analisis data kualitatif', color: '#8B0000' },
  { name: 'R / RStudio', desc: 'Bahasa statistik open-source', color: '#2266B8' },
  { name: 'Python', desc: 'Data science & analisis statistik', color: '#3776AB' },
  { name: 'AMOS', desc: 'SEM berbasis covariance', color: '#0066CC' },
  { name: 'EViews', desc: 'Ekonometri & time series', color: '#005A9C' },
  { name: 'STATA', desc: 'Statistik untuk ekonomi & kesehatan', color: '#1A5276' },
];

const TOPICS = [
  'Uji Asumsi Klasik', 'Regresi Linear & Logistik', 'Structural Equation Modeling (SEM)',
  'Analisis Faktor (EFA/CFA)', 'Uji Validitas & Reliabilitas', 'Analisis Mediasi & Moderasi',
  'Analisis Klaster & Diskriminan', 'Analisis Data Kualitatif', 'Time Series & Ekonometri',
  'Panel Data', 'Systematic Literature Review (SLR)', 'Statistik Deskriptif',
];

const KEUNGGULAN = [
  { icon: CheckCircle, text: 'Materi berbasis kurikulum akademik dan kebutuhan riset riil' },
  { icon: Award, text: 'Sertifikat kelulusan yang diakui lembaga akademik dan industri' },
  { icon: Users, text: 'Kelas kecil, pendampingan intensif per peserta' },
  { icon: BookOpen, text: 'Akses rekaman sesi seumur hidup' },
  { icon: Clock, text: 'Jadwal fleksibel, bisa malam & weekend' },
  { icon: CheckCircle, text: 'Follow-up konsultasi via WhatsApp setelah program' },
];

export default function AjiStatPage() {
  const { data: allData, isLoading } = useQuery({
    queryKey: ['programs', 'ajistat', 'all'],
    queryFn: () => programsApi.list().then((r) => {
      const arr = r.data?.data ?? r.data;
      return (Array.isArray(arr) ? arr : []) as Program[];
    }),
  });

  return (
    <>
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#0C1A45] via-[#162660] to-[#2568B5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-6xl">📊</span>
              <div>
                <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">⭐ Program Unggulan Aji Institute</span>
                <h1 className="text-5xl sm:text-6xl font-black text-white">AjiStat</h1>
              </div>
            </div>
            <p className="text-white/75 text-xl leading-relaxed mb-4">
              Pusat pelatihan <strong className="text-white">statistik, metodologi penelitian, dan analisis data</strong> terlengkap. Untuk mahasiswa S1–S3, peneliti, dosen, dan profesional.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['SPSS', 'SmartPLS', 'NVivo', 'R', 'Python', 'AMOS', 'EViews', 'STATA'].map((t) => (
                <span key={t} className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full font-semibold border border-white/20">{t}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK('Halo, saya ingin mendaftar program AjiStat')} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105">
                💬 Daftar Sekarang via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/konsultasi"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:bg-white/10">
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#0C1A45] border-b border-[#4FA8D8]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[{ val: '500+', label: 'Alumni' }, { val: '4.9★', label: 'Rating' }, { val: '8+', label: 'Tools Dikuasai' }, { val: '5', label: 'Format Kelas' }].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-[#F0A500]">{s.val}</p>
                <p className="text-white/50 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORMAT KELAS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Format Belajar</p>
            <h2 className="text-3xl font-black text-gray-900">Pilih Format yang Sesuai</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FORMATS.map((f) => (
              <Link key={f.name} href={f.href}
                className="group relative bg-gray-50 hover:bg-[#162660] border border-gray-100 hover:border-[#162660] rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {f.badge && (
                  <span className="absolute top-4 right-4 text-[10px] bg-[#F0A500] text-[#0C1A45] font-bold px-2 py-0.5 rounded-full">{f.badge}</span>
                )}
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-black text-lg text-gray-900 group-hover:text-white mb-2 transition-colors">{f.name} AjiStat</h3>
                <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[#2568B5] group-hover:text-[#4FA8D8] text-sm font-semibold transition-colors">
                  Lihat Program <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Tools & Software</p>
            <h2 className="text-3xl font-black text-gray-900">Yang Kami Ajarkan</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TOOLS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-lg mx-auto mb-3 shadow-md"
                  style={{ backgroundColor: t.color }}>
                  {t.name.length <= 4 ? t.name : t.name.slice(0, 3)}
                </div>
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOPIK */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Topik Program</p>
            <h2 className="text-3xl font-black text-gray-900">Materi yang Tersedia</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOPICS.map((topic) => (
              <span key={topic}
                className="px-4 py-2 bg-gray-50 border border-gray-200 hover:border-[#162660] hover:bg-[#162660]/5 text-gray-700 hover:text-[#162660] rounded-xl text-sm font-medium transition-colors cursor-default">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Kenapa AjiStat?</p>
            <h2 className="text-3xl font-black text-gray-900">Keunggulan Program</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEUNGGULAN.map((k, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-5">
                <k.icon className="w-5 h-5 text-[#2568B5] mt-0.5 shrink-0" />
                <p className="text-gray-700 text-sm">{k.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM LIST dari API */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-2">Jadwal & Program</p>
              <h2 className="text-3xl font-black text-gray-900">Program AjiStat Tersedia</h2>
            </div>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)}
            </div>
          ) : allData && allData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allData.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-5xl mb-4">📊</p>
              <p className="text-gray-500">Program segera tersedia. Hubungi kami untuk info lebih lanjut.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0C1A45] to-[#2568B5]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Siap Bergabung dengan AjiStat?</h2>
          <p className="text-white/70 mb-8">Hubungi kami sekarang dan dapatkan konsultasi gratis untuk menentukan program yang tepat.</p>
          <a href={WA_LINK('Halo, saya ingin mendaftar program AjiStat. Bisa dibantu?')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            💬 Daftar via WhatsApp Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
