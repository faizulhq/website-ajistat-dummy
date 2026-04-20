'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api';
import { PROGRAMS } from '@/lib/config';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { cn } from '@/lib/utils';
import type { Program } from '@/lib/types';

export function ProgramGridSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">5 Divisi Program</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Pilih Jalur Pengembangan Anda</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {PROGRAMS.map((prog) => (
            <Link key={prog.code} href={prog.href}
              {...(prog.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                'group relative rounded-2xl p-6 text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl',
                prog.isFeatured && 'ring-2 ring-[#F0A500]/60'
              )}
              style={{ background: `linear-gradient(135deg, ${prog.color} 0%, ${prog.color}cc 100%)` }}
            >
              {prog.isFeatured && (
                <span className="absolute top-3 right-3 text-[10px] bg-[#F0A500] text-[#162058] font-bold px-2 py-0.5 rounded-full">Unggulan</span>
              )}
              <p className="font-black text-xl mb-1 mt-2">{prog.name}</p>
              <p className="text-white/70 text-xs mb-4 leading-relaxed">{prog.desc}</p>
              <div className="flex flex-wrap gap-1">
                {prog.topics.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full">{t}</span>
                ))}
                {prog.topics.length > 3 && (
                  <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full">+{prog.topics.length - 3}</span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedPrograms() {
  const { data: bootcampData, isLoading: l1 } = useQuery({
    queryKey: ['programs', 'bootcamp', 'homepage'],
    queryFn: () => programsApi.list({ type: 'bootcamp' }).then((r) => {
      const arr = r.data?.data ?? r.data;
      return Array.isArray(arr) ? arr[0] : undefined;
    }),
  });
  const { data: privateData, isLoading: l2 } = useQuery({
    queryKey: ['programs', 'private-class', 'homepage'],
    queryFn: () => programsApi.list({ type: 'private-class' }).then((r) => {
      const arr = r.data?.data ?? r.data;
      return Array.isArray(arr) ? arr[0] : undefined;
    }),
  });
  const { data: shortData, isLoading: l3 } = useQuery({
    queryKey: ['programs', 'short-class', 'homepage'],
    queryFn: () => programsApi.list({ type: 'short-class' }).then((r) => {
      const arr = r.data?.data ?? r.data;
      return Array.isArray(arr) ? arr[0] : undefined;
    }),
  });

  const featuredPrograms = [bootcampData, privateData, shortData].filter(Boolean) as Program[];
  const isLoading = l1 || l2 || l3;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Program Pilihan</p>
            <h2 className="text-3xl font-black text-gray-900">Program Unggulan</h2>
            <p className="text-gray-500 text-sm mt-1">Satu dari setiap format — Bootcamp, Private Class, Short Class</p>
          </div>
          <a href="/bootcamp" className="hidden sm:flex items-center gap-1.5 text-[#2348A8] font-semibold hover:underline text-sm">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)
            : featuredPrograms.map((p) => <ProgramCard key={p.id} program={p} />)
          }
        </div>
      </div>
    </section>
  );
}
