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
  'Business Plan & Analisis Kelayakan Usaha', 'Manajemen Keuangan Bisnis',
  'Digital Marketing untuk UMKM', 'Leadership & Manajemen Tim',
  'Negosiasi & Komunikasi Bisnis', 'Strategi Pemasaran & Branding',
  'Analisis Kompetitor & Pasar', 'Manajemen Risiko Bisnis',
  'Business Model Canvas', 'Wirausaha Sosial & Inovasi',
];

const KEUNGGULAN = [
  'Kurikulum berbasis kebutuhan praktis dunia bisnis Indonesia',
  'Dibimbing wirausahawan dan manajer berpengalaman',
  'Studi kasus nyata dari UMKM dan perusahaan nasional',
  'Sertifikat kelulusan untuk CV/portofolio profesional',
  'Komunitas alumni & networking bisnis aktif',
  'Follow-up konsultasi via WhatsApp setelah program',
];

export default function AjiBizPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['programs', 'ajibiz'],
    queryFn: () => programsApi.list().then((r) => r.data),
  });

  const programs: Program[] = (data?.data ?? []).filter((p: Program) =>
    p.tags.some((t) => t.toLowerCase() === 'ajibiz')
  );

  return (
    <>
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#054E7A] via-[#1a3a6e] to-[#1AAEE0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div>
                <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">Aji Institute — Program Bisnis</span>
                <h1 className="text-5xl sm:text-6xl font-black text-white">AjiBiz</h1>
              </div>
            </div>
            <p className="text-white/75 text-xl leading-relaxed mb-6">
              Program pengembangan kompetensi <strong className="text-white">bisnis, manajemen, dan kewirausahaan</strong> untuk wirausahawan, manajer, dan profesional yang ingin naik level.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Business Plan', 'Manajemen', 'Marketing', 'Leadership', 'UMKM', 'Strategi'].map((t) => (
                <span key={t} className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full font-semibold border border-white/20">{t}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK('Halo, saya ingin mendaftar program AjiBiz')} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105">
                Daftar via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
              
            </div>
          </div>
        </div>
      </div>

      {/* PROGRAM TERSEDIA */}
      <section className="py-20 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Tersedia Saat Ini</p>
            <h2 className="text-3xl font-black text-gray-900 border-b-2 border-dashed border-gray-200 pb-6 inline-block">Program AjiBiz Tersedia</h2>
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
              <p className="text-gray-500 max-w-sm mx-auto text-sm">Tim AjiBiz sedang menyiapkan kelas terbaik untuk Anda. Silakan sampaikan minat Anda pada layanan Konsultasi.</p>
            </div>
          )}
        </div>
      </section>

      {/* TOPIK */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Apa yang Dipelajari</p>
            <h2 className="text-3xl font-black text-gray-900">Topik Program AjiBiz</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOPICS.map((t) => (
              <span key={t} className="px-4 py-2 bg-white border border-gray-200 hover:border-[#1AAEE0] hover:bg-blue-50 text-gray-700 rounded-xl text-sm font-medium transition-colors cursor-default">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900">Kenapa AjiBiz?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KEUNGGULAN.map((k, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <CheckCircle className="w-5 h-5 text-[#1AAEE0] mt-0.5 shrink-0" />
                <p className="text-gray-700 text-sm">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#054E7A] to-[#1AAEE0]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Siap Bergabung dengan AjiBiz?</h2>
          <p className="text-white/70 mb-8">Hubungi kami dan mulai perjalanan bisnis Anda bersama mentor berpengalaman.</p>
          <a href={WA_LINK('Halo, saya ingin mendaftar program AjiBiz. Bisa dibantu?')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
