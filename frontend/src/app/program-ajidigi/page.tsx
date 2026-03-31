'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import type { Program } from '@/lib/types';

const TOPICS = [
  'Digital Marketing Strategy', 'Social Media Marketing (IG, TikTok, LinkedIn)',
  'Content Planning & Calendar', 'Copy Writing & Caption Kreatif',
  'Google Ads & Meta Ads', 'SEO Dasar & Intermediate',
  'Canva untuk Konten Bisnis', 'Email Marketing',
  'Analytics & Reporting Digital', 'Personal Branding Online',
  'E-Commerce & Marketplace', 'Video Marketing Dasar',
];

const KEUNGGULAN = [
  'Kurikulum terkini mengikuti tren digital 2024–2025',
  'Dibimbing praktisi digital marketing aktif dari agensi dan korporat',
  'Langsung praktik buat konten, ads, dan strategi digital',
  'Portfolio digital siap pakai untuk karier atau bisnis',
  'Cocok pemula hingga pelaku bisnis yang ingin scale up',
  'Akses tools premium dan template konten eksklusif',
];

export default function AjiDigiPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['programs', 'ajidigi'],
    queryFn: () => programsApi.list().then((r) => r.data),
  });

  const programs: Program[] = (data?.data ?? []).filter((p: Program) =>
    p.tags.some((t) => t.toLowerCase() === 'ajidigi')
  );

  return (
    <>
      <div className="bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#059669] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div>
                <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">Aji Institute — Program Digital</span>
                <h1 className="text-5xl sm:text-6xl font-black text-white">AjiDigi</h1>
              </div>
            </div>
            <p className="text-white/75 text-xl leading-relaxed mb-6">
              Program <strong className="text-white">digital marketing, konten kreatif, dan keterampilan digital</strong> untuk pelaku bisnis, kreator konten, dan profesional masa kini.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Digital Marketing', 'Social Media', 'Content', 'SEO', 'Ads', 'Canva'].map((t) => (
                <span key={t} className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full font-semibold border border-white/20">{t}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK('Halo, saya ingin mendaftar program AjiDigi')} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-black px-8 py-4 rounded-2xl transition-all hover:scale-105">
                Daftar via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
              
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#059669] text-sm font-semibold uppercase tracking-widest mb-3">Tersedia Saat Ini</p>
            <h2 className="text-3xl font-black text-gray-900 border-b-2 border-dashed border-gray-200 pb-6 inline-block">Program AjiDigi Tersedia</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <ProgramCardSkeleton key={i} />)}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="font-bold text-gray-800 text-lg mb-2">Program Segera Hadir!</p>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">Tim AjiDigi sedang menyiapkan kelas terbaik untuk Anda. Silakan sampaikan minat Anda pada layanan Konsultasi.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10"><h2 className="text-3xl font-black text-gray-900">Topik Program AjiDigi</h2></div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOPICS.map((t) => (
              <span key={t} className="px-4 py-2 bg-white border border-gray-200 hover:border-[#059669] hover:bg-green-50 text-gray-700 rounded-xl text-sm font-medium transition-colors cursor-default">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10"><h2 className="text-3xl font-black text-gray-900">Keunggulan AjiDigi</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KEUNGGULAN.map((k, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <CheckCircle className="w-5 h-5 text-[#059669] mt-0.5 shrink-0" />
                <p className="text-gray-700 text-sm">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#064e3b] to-[#059669]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Siap Bergabung dengan AjiDigi?</h2>
          <p className="text-white/70 mb-8">Kuasai digital marketing dan jadilah yang terdepan di era digital.</p>
          <a href={WA_LINK('Halo, saya ingin mendaftar program AjiDigi. Bisa dibantu?')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
