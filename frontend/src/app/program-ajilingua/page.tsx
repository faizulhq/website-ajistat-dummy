'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X, Globe, BookOpen, Award, Users, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api';
import { TagProgramModal } from '@/components/TagProgramModal';
import { ProgramTabsByFormat } from '@/components/ProgramTabs';
import { WA_LINK } from '@/lib/config';
import type { Program } from '@/lib/types';

const TOPICS = [
  'Academic Writing & Research Paper', 'English for Research & Publication (Scopus)',
  'IELTS & TOEFL Preparation', 'Business English & Professional Email',
  'Speaking Practice & Conversation', 'Pronunciation & Intonation',
  'Grammar Intensif (TOEIC Ready)', 'Bahasa Inggris untuk Presentasi',
  'Cross-Cultural Communication', 'Abstract & Literature Review Writing',
  'English for Job Interview', 'Bahasa Inggris untuk Beasiswa',
];

const KEUNGGULAN = [
  { icon: Globe, text: 'Dibimbing tutor berpengalaman dengan sertifikat internasional', detail: 'Semua fasilitator memiliki sertifikasi internasional dan pengalaman mengajar bahasa Inggris di level akademik dan profesional.', badge: 'Tutor Bersertifikat' },
  { icon: BookOpen, text: 'Fokus bahasa Inggris akademik dan profesional, bukan sekadar grammar', detail: 'Kurikulum dirancang untuk kebutuhan nyata: academic writing, presentasi, interview, dan komunikasi profesional global.', badge: 'Akademik & Profesional' },
  { icon: Users, text: 'Cocok untuk mahasiswa S1–S3, peneliti, dosen, dan profesional', detail: 'Program tersedia untuk semua level dan kebutuhan — dari persiapan IELTS hingga English for Academic Publication.', badge: 'Semua Level' },
  { icon: Award, text: 'Materi khusus persiapan IELTS, TOEFL, TOEIC, dan beasiswa luar negeri', detail: 'Kurikulum mencakup strategi khusus untuk meningkatkan skor IELTS, TOEFL, dan TOEIC secara efisien dan terstruktur.', badge: 'Test Prep' },
  { icon: CheckCircle, text: 'Sesi speaking dan writing langsung dengan feedback mentor', detail: 'Setiap sesi speaking dan writing dikoreksi langsung oleh mentor untuk perkembangan yang lebih cepat dan efektif.', badge: 'Feedback Langsung' },
  { icon: Globe, text: 'Bisa mulai dari level pemula hingga advanced', detail: 'Tersedia jalur belajar yang disesuaikan dengan level bahasa Inggris Anda saat ini, dari pemula hingga advanced.', badge: 'Multi-Level' },
];

function KeunggulanModal({ item, onClose }: { item: typeof KEUNGGULAN[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 z-10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
        <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] flex items-center justify-center mb-4"><item.icon className="w-6 h-6 text-[#2348A8]" /></div>
        <span className="text-xs font-bold text-[#2348A8] bg-[#EBF4FF] px-3 py-1 rounded-full">{item.badge}</span>
        <h3 className="text-xl font-black text-gray-900 mt-3 mb-3">{item.text}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.detail}</p>
        <a href={WA_LINK('Halo, saya ingin tanya lebih lanjut tentang program AjiLingua')} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#1B3A8C] hover:bg-[#2348A8] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          💬 Tanya via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function AjiLinguaPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeKeunggulan, setActiveKeunggulan] = useState<typeof KEUNGGULAN[0] | null>(null);

  const { data } = useQuery({
    queryKey: ['programs', 'ajilingua-all'],
    queryFn: () => programsApi.list().then((r) => r.data),
  });

  const ajiLinguaFilter = (p: Program) => p.tags.some((t) => ['ajilingua', 'ajilangua'].includes(t.toLowerCase()));

  return (
    <>
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#162058] via-[#162058] to-[#2348A8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div>
                <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">Aji Institute — Bahasa Asing & Akademik</span>
                <h1 className="text-5xl sm:text-6xl font-black text-white">AjiLingua</h1>
              </div>
            </div>
            <p className="text-white/75 text-xl leading-relaxed mb-6">
              Program pelatihan <strong className="text-white">bahasa Inggris akademik, profesional, dan persiapan ujian internasional</strong> untuk mahasiswa, peneliti, dosen, dan profesional global.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['IELTS', 'TOEFL', 'Academic Writing', 'Speaking', 'Business English'].map((t) => (
                <button key={t} onClick={() => setActiveTag(t)}
                  className="text-xs bg-white/15 hover:bg-white/30 text-white px-3 py-1.5 rounded-full font-semibold border border-white/20 transition-colors cursor-pointer">{t}</button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK('Halo, saya ingin mendaftar program AjiLingua')} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105">
                Daftar via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/konsultasi"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:bg-white/10">
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRAM TABS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Kelas & Program Tersedia</p>
            <h2 className="text-3xl font-black text-gray-900">Pilih Format Belajar AjiLingua</h2>
            <p className="text-gray-500 text-sm mt-2">Klik tab untuk melihat kelas yang tersedia per format. Klik kartu untuk mendaftar.</p>
          </div>
          <ProgramTabsByFormat programFilter={ajiLinguaFilter} queryKey="programs-ajilingua-tabs" />
        </div>
      </section>

      {/* TOPIK */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Apa yang Dipelajari</p>
            <h2 className="text-3xl font-black text-gray-900">Topik Program AjiLingua</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOPICS.map((t) => (
              <button key={t} onClick={() => setActiveTag(t)}
                className="px-4 py-2 bg-white border border-gray-200 hover:border-[#2348A8] hover:bg-blue-50 text-gray-700 rounded-xl text-sm font-medium transition-colors cursor-pointer">{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Kenapa AjiLingua?</p>
            <h2 className="text-3xl font-black text-gray-900">Keunggulan Program</h2>
            <p className="text-gray-500 text-sm mt-2">Klik kartu untuk detail informasi</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEUNGGULAN.map((k, i) => (
              <button key={i} onClick={() => setActiveKeunggulan(k)}
                className="group flex items-start gap-3 bg-white hover:bg-[#162058] rounded-2xl border border-gray-100 hover:border-[#162058] p-5 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                <k.icon className="w-5 h-5 text-[#2348A8] group-hover:text-[#F0A500] mt-0.5 shrink-0 transition-colors" />
                <div>
                  <p className="text-gray-700 group-hover:text-white text-sm transition-colors">{k.text}</p>
                  <p className="text-[#2348A8] group-hover:text-white/60 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-all">Klik untuk selengkapnya →</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#162058] to-[#2348A8]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Siap Bergabung dengan AjiLingua?</h2>
          <p className="text-white/70 mb-8">Tingkatkan kemampuan bahasa Inggris akademik dan profesional Anda bersama tutor berpengalaman.</p>
          <a href={WA_LINK('Halo, saya ingin mendaftar program AjiLingua. Bisa dibantu?')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            Daftar via WhatsApp Sekarang
          </a>
        </div>
      </section>

      <TagProgramModal tag={activeTag} programs={data?.data ?? []} onClose={() => setActiveTag(null)} />
      {activeKeunggulan && <KeunggulanModal item={activeKeunggulan} onClose={() => setActiveKeunggulan(null)} />}
    </>
  );
}
