'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, CheckCircle, BookOpen, Users, Award, Clock, X } from 'lucide-react';
import { programsApi } from '@/lib/api';
import { TagProgramModal } from '@/components/TagProgramModal';
import { ProgramTabsByFormat } from '@/components/ProgramTabs';
import { WA_LINK, TOOLS } from '@/lib/config';
import type { Program } from '@/lib/types';

const TOPICS = [
  'Uji Asumsi Klasik', 'Regresi Linear & Logistik', 'Structural Equation Modeling (SEM)',
  'Analisis Faktor (EFA/CFA)', 'Uji Validitas & Reliabilitas', 'Analisis Mediasi & Moderasi',
  'Analisis Klaster & Diskriminan', 'Analisis Data Kualitatif', 'Time Series & Ekonometri',
  'Panel Data', 'Systematic Literature Review (SLR)', 'Statistik Deskriptif',
];

const KEUNGGULAN = [
  {
    icon: CheckCircle,
    text: 'Materi berbasis kurikulum akademik dan kebutuhan riset riil',
    detail: 'Setiap modul disusun mengikuti standar metodologi penelitian akademik (S1–S3) dan kebutuhan industri nyata. Bukan sekadar teori — kami ajarkan bagaimana ilmu tersebut diaplikasikan langsung dalam penelitian Anda.',
    badge: 'Kurikulum Terstandar'
  },
  {
    icon: Award,
    text: 'Sertifikat kelulusan yang diakui lembaga akademik dan industri',
    detail: 'Peserta yang menyelesaikan program akan mendapatkan sertifikat resmi dari Aji Institute yang bisa dilampirkan dalam portofolio akademik maupun profesional.',
    badge: 'Sertifikat Resmi'
  },
  {
    icon: Users,
    text: 'Kelas kecil, pendampingan intensif per peserta',
    detail: 'Kami membatasi jumlah peserta per sesi agar setiap individu mendapat perhatian penuh dari fasilitator. Sesi praktik langsung dan tanya jawab akan berlangsung produktif.',
    badge: 'Rasio Peserta Ideal'
  },
  {
    icon: BookOpen,
    text: 'Akses rekaman sesi seumur hidup',
    detail: 'Seluruh rekaman sesi live tersimpan dan dapat diakses kapan saja, selamanya. Anda bisa belajar ulang sesuai kebutuhan, tanpa batas waktu.',
    badge: 'Lifetime Access'
  },
  {
    icon: Clock,
    text: 'Jadwal fleksibel, bisa malam & weekend',
    detail: 'Kami memahami kesibukan Anda. Tersedia sesi malam (pukul 19.00–21.00) dan akhir pekan, dirancang khusus bagi mahasiswa aktif dan pekerja.',
    badge: 'Jadwal Fleksibel'
  },
  {
    icon: CheckCircle,
    text: 'Follow-up konsultasi via WhatsApp setelah program',
    detail: 'Setelah program selesai, peserta tetap bisa bertanya dan berdiskusi melalui grup WhatsApp eksklusif yang dimoderasi oleh fasilitator AjiStat.',
    badge: 'Support Pasca Kelas'
  },
];

function KeunggulanModal({ item, onClose }: { item: typeof KEUNGGULAN[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 z-10"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] flex items-center justify-center mb-4">
          <item.icon className="w-6 h-6 text-[#2348A8]" />
        </div>
        <span className="text-xs font-bold text-[#2348A8] bg-[#EBF4FF] px-3 py-1 rounded-full">{item.badge}</span>
        <h3 className="text-xl font-black text-gray-900 mt-3 mb-3">{item.text}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.detail}</p>
        <a href={WA_LINK('Halo, saya ingin tanya lebih lanjut tentang program AjiStat')}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#1B3A8C] hover:bg-[#2348A8] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          💬 Tanya via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function AjiStatPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeKeunggulan, setActiveKeunggulan] = useState<typeof KEUNGGULAN[0] | null>(null);

  const { data: allDataRaw } = useQuery({
    queryKey: ['programs', 'ajistat-all'],
    queryFn: () => programsApi.list().then((r) => {
      const arr = r.data?.data ?? r.data;
      return (Array.isArray(arr) ? arr : []) as Program[];
    }),
  });

  const ajiStatFilter = (p: Program) =>
    !p.tags.some((t) => ['ajibiz', 'ajipr', 'ajidigi', 'ajilangua'].includes(t.toLowerCase()));

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
                <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">Program Unggulan Aji Institute</span>
                <h1 className="text-5xl sm:text-6xl font-black text-white">AjiStat</h1>
              </div>
            </div>
            <p className="text-white/75 text-xl leading-relaxed mb-4">
              Pusat pelatihan <strong className="text-white">statistik, metodologi penelitian, dan analisis data</strong> terlengkap. Untuk mahasiswa S1–S3, peneliti, dosen, dan profesional.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {TOOLS.filter(t => ['SPSS', 'SmartPLS', 'NVivo', 'R / RStudio', 'Python', 'AMOS', 'EViews', 'STATA'].includes(t.name)).map((t) => (
                <button key={t.name} title={t.name} onClick={() => setActiveTag(t.name)}
                  className="w-9 h-9 rounded-lg overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 cursor-pointer">
                  {t.logo ? (
                    <Image src={t.logo} alt={t.name} width={28} height={28} className="object-contain p-0.5" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-black text-[9px]"
                      style={{ backgroundColor: t.color }}>
                      {t.name.slice(0, 2)}
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK('Halo, saya ingin mendaftar program AjiStat')} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105">
                Daftar Sekarang via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/konsultasi"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:bg-white/10">
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRAM TABS — by Format (Bootcamp / Short Class / Private / In-House) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Kelas & Program Tersedia</p>
            <h2 className="text-3xl font-black text-gray-900">Pilih Format Belajar AjiStat</h2>
            <p className="text-gray-500 text-sm mt-2">Klik tab untuk melihat kelas yang tersedia per format. Klik kartu untuk mendaftar.</p>
          </div>
          <ProgramTabsByFormat
            programFilter={ajiStatFilter}
            queryKey="programs-ajistat-tabs"
          />
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Tools & Software</p>
            <h2 className="text-3xl font-black text-gray-900">Yang Kami Ajarkan</h2>
            <p className="text-gray-500 text-sm mt-2">Klik logo untuk melihat informasi lebih lanjut</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 mt-10 max-w-4xl mx-auto">
            {TOOLS.map((t) => {
              if (!t.logo) return null;
              return (
                <button key={t.name} title={t.name} onClick={() => setActiveTag(t.name)}
                  className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center hover:scale-110 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer">
                  <Image src={t.logo} alt={t.name} width={32} height={32} className="object-contain" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOPIK */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Topik Program</p>
            <h2 className="text-3xl font-black text-gray-900">Materi yang Tersedia</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOPICS.map((t) => (
              <button key={t} onClick={() => setActiveTag(t)}
                className="px-4 py-2 bg-white border border-gray-200 hover:border-[#162058] hover:bg-blue-50 text-gray-700 rounded-xl text-sm font-medium transition-colors cursor-pointer">
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Kenapa AjiStat?</p>
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
          <h2 className="text-3xl font-black text-white mb-4">Siap Bergabung dengan AjiStat?</h2>
          <p className="text-white/70 mb-8">Hubungi kami sekarang dan dapatkan konsultasi gratis untuk menentukan program yang tepat.</p>
          <a href={WA_LINK('Halo, saya ingin mendaftar program AjiStat. Bisa dibantu?')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            Daftar via WhatsApp Sekarang
          </a>
        </div>
      </section>

      <TagProgramModal
        tag={activeTag}
        programs={allDataRaw ?? []}
        onClose={() => setActiveTag(null)}
      />

      {activeKeunggulan && (
        <KeunggulanModal item={activeKeunggulan} onClose={() => setActiveKeunggulan(null)} />
      )}
    </>
  );
}
