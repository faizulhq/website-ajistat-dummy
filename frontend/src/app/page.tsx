'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BookOpen, Microscope, GraduationCap, Users, Star, ChevronLeft, ChevronRight, Award, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { formatPrice } from '@/lib/utils';
import type { Program, Testimonial } from '@/lib/types';

const serviceUnits = [
  { icon: BookOpen, label: 'AJI Learning', desc: 'Bootcamp intensif & short class: statistika, metodologi penelitian, penulisan akademik.', href: '/bootcamp', color: 'bg-blue-50', iconColor: 'text-[#2568B5]', cta: 'Lihat Program →' },
  { icon: Microscope, label: 'AJI Statistik', desc: 'Konsultasi analisis data, statistik akademik, pendampingan skripsi, tesis, dan disertasi.', href: '/konsultasi', color: 'bg-emerald-50', iconColor: 'text-emerald-600', cta: 'Konsultasi →' },
  { icon: GraduationCap, label: 'AJI EduLab', desc: 'Workshop riset & inovasi laboratorium pembelajaran. Kolaborasi peneliti dan akademisi.', href: '/konsultasi', color: 'bg-amber-50', iconColor: 'text-amber-600', cta: 'Eksplor →' },
  { icon: Users, label: 'AJI Private', desc: 'Mentoring personal: statistika, metodologi penelitian, akademik dan profesional.', href: '/private-class', color: 'bg-purple-50', iconColor: 'text-purple-600', cta: 'Daftar →' },
];

const values = [
  { icon: '🤝', label: 'Amanah', desc: 'Integritas, kejujuran, dan tanggung jawab menjadi fondasi setiap layanan kami.' },
  { icon: '🔬', label: 'Jana', desc: 'Berpikir kritis, berbasis data, mencari kebenaran ilmiah dengan metode yang valid.' },
  { icon: '❤️', label: 'Insani', desc: 'Humanis, empatik, dan pengembangan holistik untuk dampak nyata pada manusia.' },
];

const stats = [
  { num: '2.000+', label: 'Peserta Aktif' },
  { num: '120+', label: 'Program Selesai' },
  { num: '95%', label: 'Tingkat Kepuasan' },
  { num: '50+', label: 'Instansi Mitra' },
];

export default function HomePage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const { data: featuredData, isLoading: featuredLoading } = useQuery({
    queryKey: ['programs', 'featured'],
    queryFn: () => programsApi.list({ featured: true }).then((r) => r.data),
  });

  const { data: testimonialsData } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => programsApi.testimonials().then((r) => r.data),
  });

  const featured: Program[] = featuredData?.data ?? [];
  const testimonials: Testimonial[] = testimonialsData?.data ?? [];
  const t = testimonials[testimonialIdx];

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0C1A45] via-[#162660] to-[#1e4fa0] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#4FA8D8] blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#F0A500] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#4FA8D8]/15 border border-[#4FA8D8]/30 text-[#4FA8D8] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
              <TrendingUp className="w-3.5 h-3.5" /> Platform Edukasi Statistika #1 Indonesia
            </div>
            <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Kuasai Statistika &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0A500] to-[#FFD166]">
                Riset Bersama Ahlinya
              </span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Bootcamp intensif, kelas singkat, dan konsultasi personal bersama praktisi berpengalaman. Dari skripsi hingga publikasi Scopus.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/bootcamp"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105 shadow-lg shadow-amber-500/20">
                🚀 Lihat Program Kami
              </Link>
              <Link href="/konsultasi"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/25 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                💬 Konsultasi Gratis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-white font-bold text-2xl font-[family-name:var(--font-poppins)]">{s.num}</p>
                  <p className="text-white/50 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── VALUES ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-[#2568B5] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-100 mb-4">
              Nilai Kami
            </span>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">
              Dibangun di Atas Tiga Pilar Utama
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.label} className="text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all group">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-gray-900 mb-3">{v.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE UNITS ────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-[#2568B5] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-100 mb-4">
              Unit Layanan
            </span>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Empat Unit Unggulan Kami</h2>
            <p className="text-gray-500 mt-3">Setiap unit dirancang khusus untuk memenuhi kebutuhan akademik dan profesional Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceUnits.map((u) => (
              <Link key={u.label} href={u.href}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`w-12 h-12 ${u.color} rounded-xl flex items-center justify-center mb-5`}>
                  <u.icon className={`w-6 h-6 ${u.iconColor}`} />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-gray-900 mb-2">{u.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{u.desc}</p>
                <span className="text-[#2568B5] text-sm font-semibold group-hover:underline">{u.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROGRAMS ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-[#2568B5] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-100 mb-4">
              Program Unggulan
            </span>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Mulai Belajar Sekarang</h2>
            <p className="text-gray-500 mt-3">Pilih program sesuai kebutuhan riset dan karier akademik Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredLoading 
              ? [...Array(3)].map((_, i) => <ProgramCardSkeleton key={i} />) 
              : featured.map((p) => <ProgramCard key={p.id} program={p} />)}
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/bootcamp" className="inline-flex items-center gap-2 bg-[#162660] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#2568B5] transition-colors">
              🎓 Lihat Semua Bootcamp
            </Link>
            <Link href="/short-class" className="inline-flex items-center gap-2 border-2 border-[#162660] text-[#162660] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#162660] hover:text-white transition-colors">
              ⚡ Lihat Short Class
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block bg-blue-50 text-[#2568B5] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-100 mb-4">
                Testimoni
              </span>
              <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Kata Mereka tentang Kami</h2>
            </div>
            {t && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-md border border-gray-100 relative">
                  <div className="text-7xl text-blue-100 font-black absolute top-6 left-8 leading-none select-none">"</div>
                  <div className="flex gap-1 mb-4 relative z-10">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F0A500] text-[#F0A500]" />)}
                  </div>
                  <p className="text-gray-700 text-base italic leading-relaxed mb-6 relative z-10">{t.comment}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#162660] to-[#4FA8D8] flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.role}</p>
                      <p className="text-[#2568B5] text-xs font-medium">Program: {t.program_name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button onClick={() => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length)}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#2568B5] hover:border-[#2568B5] hover:text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button key={i} onClick={() => setTestimonialIdx(i)}
                        className={`h-2 rounded-full transition-all ${i === testimonialIdx ? 'w-6 bg-[#2568B5]' : 'w-2 bg-gray-200'}`} />
                    ))}
                  </div>
                  <button onClick={() => setTestimonialIdx((testimonialIdx + 1) % testimonials.length)}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#2568B5] hover:border-[#2568B5] hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#162660] to-[#0C1A45]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-12 h-12 text-[#F0A500] mx-auto mb-6" />
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Riset Anda?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Bergabunglah dengan ribuan mahasiswa, dosen, dan peneliti yang telah mempercayai AjiStat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/bootcamp" className="bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105">
              🚀 Lihat Semua Program
            </Link>
            <Link href="/konsultasi" className="bg-white/10 hover:bg-white/15 border border-white/25 text-white font-semibold px-8 py-3.5 rounded-xl transition-all">
              📩 Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
