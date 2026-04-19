'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock, Calendar, CheckCircle, ChevronDown, ChevronUp,
  FileText, Database, Video, FileSpreadsheet, FileCode, Lock,
  MessageCircle, GraduationCap,
} from 'lucide-react';
import type { ApiProgram } from '@/lib/types';
import { STATUS_LABEL, STATUS_COLOR } from '@/lib/types';
import { WA_LINK } from '@/lib/config';

function formatPrice(p: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
  }).format(p);
}

const TYPE_LABEL: Record<string, string> = {
  bootcamp: 'Bootcamp Intensif',
  'short-class': 'Short Class',
  'private-class': 'Kelas Privat',
  'in-house-training': 'In-House Training',
};

const VIDEO_LABEL: Record<string, string> = {
  bootcamp: 'Cuplikan Sesi Bootcamp',
  'short-class': 'Cuplikan Sesi Pembelajaran',
  'private-class': 'Cuplikan Sesi Latihan Privat',
  'in-house-training': 'Cuplikan Sesi Pelatihan',
};

const TYPE_HREF: Record<string, string> = {
  bootcamp: '/bootcamp',
  'short-class': '/short-class',
  'private-class': '/private-class',
};

const SCHEDULE: Record<string, Array<{ day: string; time: string; label: string; note: string }>> = {
  bootcamp: [
    { day: 'Hari 1', time: '08.00 – 12.00', label: 'Sesi Pagi: Materi & Konsep Dasar', note: 'Onboarding + pengenalan tools dan software' },
    { day: 'Hari 1', time: '13.00 – 17.00', label: 'Sesi Siang: Hands-on Praktik', note: 'Input data, eksplorasi dataset nyata' },
    { day: 'Hari 2', time: '08.00 – 12.00', label: 'Sesi Pagi: Analisis Mendalam', note: 'Uji statistik, interpretasi output' },
    { day: 'Hari 2', time: '13.00 – 17.00', label: 'Sesi Siang: Studi Kasus', note: 'Praktik dari dataset riset nyata' },
    { day: 'Hari 3+', time: '08.00 – 16.00', label: 'Sesi Topik Lanjutan & Penutupan', note: 'Review, Q&A, presentasi + sertifikat' },
  ],
  'short-class': [
    { day: 'Sesi 1', time: '08.00 – 10.00', label: 'Materi Inti & Teori', note: 'Konsep, tujuan, dan konteks penggunaan' },
    { day: 'Sesi 2', time: '10.15 – 12.00', label: 'Praktik Langsung', note: 'Hands-on dengan software & dataset' },
    { day: 'Sesi 3', time: '13.00 – 14.30', label: 'Studi Kasus & Q&A', note: 'Diskusi, troubleshooting, tanya jawab' },
    { day: 'Penutup', time: '14.30 – 15.00', label: 'Evaluasi & Sertifikat', note: 'Ringkasan materi + pemberian sertifikat' },
  ],
  'private-class': [
    { day: 'Sesi Awal', time: 'Fleksibel', label: 'Konsultasi Kebutuhan', note: 'Identifikasi kebutuhan dan target belajar' },
    { day: 'Sesi 1–3', time: 'Disepakati', label: 'Pembelajaran Inti', note: 'Materi disesuaikan level & kebutuhan peserta' },
    { day: 'Sesi 4–6', time: 'Disepakati', label: 'Praktik & Pendalaman', note: 'Hands-on dengan data/kasus peserta sendiri' },
    { day: 'Sesi Akhir', time: 'Disepakati', label: 'Review & Follow-up', note: 'Evaluasi capaian + konsultasi lanjutan via WA' },
  ],
};

const LEARNING_MATERIALS = [
  { icon: FileText, iconBg: '#EBF4FF', iconColor: '#2348A8', label: 'Modul Pelatihan', desc: 'Slide materi lengkap yang digunakan saat kelas berlangsung.', badge: 'PDF' },
  { icon: Database, iconBg: '#ECFDF5', iconColor: '#059669', label: 'Dataset Praktik', desc: 'Dataset riset nyata untuk eksplorasi mandiri.', badge: 'Excel / SAV' },
  { icon: Video, iconBg: '#FFF7ED', iconColor: '#EA580C', label: 'Rekaman Sesi', desc: 'Rekaman video seluruh sesi pembelajaran seumur hidup.', badge: 'Video / Link' },
  { icon: FileSpreadsheet, iconBg: '#F5F3FF', iconColor: '#7C3AED', label: 'Template Laporan', desc: 'Template terstruktur untuk menulis hasil analisis.', badge: 'DOCX / PDF' },
  { icon: FileCode, iconBg: '#FEFCE8', iconColor: '#CA8A04', label: 'Script & Syntax', desc: 'Kode yang digunakan selama pembelajaran.', badge: 'R / Python / SPSS' },
];

const WHAT_YOU_GET = [
  'Rekaman video sesi seumur hidup',
  'Modul & materi tertulis lengkap',
  'Sertifikat kelulusan resmi',
  'Dataset riset untuk praktik',
  'Akses grup diskusi alumni',
  'Konsultasi lanjutan via WA',
];

function MaterialModal({
  item, program, onClose,
}: {
  item: typeof LEARNING_MATERIALS[0] | null;
  program: ApiProgram;
  onClose: () => void;
}) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="h-1 w-full bg-gradient-to-r from-[#162058] to-[#F0A500]" />
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <Lock className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.iconBg }}>
              <item.icon className="w-5 h-5" style={{ color: item.iconColor }} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
              <span className="text-[10px] font-bold bg-[#162058]/10 text-[#162058] px-2 py-0.5 rounded-full">{item.badge}</span>
            </div>
          </div>
          <h3 className="text-base font-black text-gray-900 mb-2">Daftar untuk Mendapatkan File Ini</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            File <strong>{item.label}</strong> hanya tersedia untuk peserta terdaftar di kelas <strong>{program.title}</strong>.
          </p>
          <a href={WA_LINK(`Halo AjiStat, saya ingin daftar kelas ${program.title} dan mendapatkan ${item.label}`)}
            target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold py-3 rounded-xl transition-colors text-sm">
            Daftar Sekarang via WhatsApp
          </a>
          <button onClick={onClose} className="w-full text-gray-400 hover:text-gray-600 text-xs text-center py-2 mt-1 transition-colors">Mungkin nanti</button>
        </div>
      </div>
    </div>
  );
}

export default function ProgramDetailClient({ program }: { program: ApiProgram }) {
  const [showFullCurriculum, setShowFullCurriculum] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState<typeof LEARNING_MATERIALS[0] | null>(null);

  const curriculum = program.curriculum ?? [];
  const visibleCurriculum = showFullCurriculum ? curriculum : curriculum.slice(0, 6);

  const discount = program.original_price
    ? Math.round((1 - program.price / program.original_price) * 100)
    : null;

  const scheduleItems = SCHEDULE[program.type] ?? SCHEDULE['bootcamp'];
  const videoLabel = VIDEO_LABEL[program.type] ?? 'Cuplikan Pembelajaran';

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            style={{ backgroundColor: program.thumbnail_color || '#F0A500' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex gap-2 text-white/40 text-sm mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <Link href={TYPE_HREF[program.type] ?? '/bootcamp'} className="hover:text-white transition-colors">
              {TYPE_LABEL[program.type]}
            </Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{program.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs font-bold bg-[#2348A8]/40 border border-[#2348A8]/50 text-white px-3 py-1 rounded-full">
                  {TYPE_LABEL[program.type]}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLOR[program.status]}`}>
                  {STATUS_LABEL[program.status]}
                </span>
                {program.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs bg-white/10 text-white/75 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-snug">
                {program.title}
              </h1>

              {program.description && (
                <p className="text-white/70 text-base leading-relaxed mb-7">{program.description}</p>
              )}

              {/* ─── VIDEO INLINE 16:9 (seperti web utama) ─── */}
              {program.demo_video_url && (
                <div className="mb-10 mt-2 bg-black/40 rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group">
                  <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-white/90 text-xs font-semibold tracking-wide uppercase">{videoLabel}</p>
                  </div>
                  <video
                    src={program.demo_video_url}
                    controls
                    playsInline
                    className="w-full aspect-video object-cover"
                    preload="metadata"
                    controlsList="nodownload"
                  >
                    Browser Anda tidak mendukung pemutar video HTML5.
                  </video>
                </div>
              )}

              {/* Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {program.duration && (
                  <div className="bg-white/8 border border-white/12 rounded-xl p-4 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#4A72D4] shrink-0" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">Durasi</p>
                      <p className="text-white text-sm font-medium">{program.duration}</p>
                    </div>
                  </div>
                )}
                {program.schedule && (
                  <div className="bg-white/8 border border-white/12 rounded-xl p-4 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#4A72D4] shrink-0" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">Jadwal</p>
                      <p className="text-white text-sm font-medium">{program.schedule}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Sidebar Price (desktop) */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-24">
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-3 mb-1">
                      <p className="text-3xl font-black text-[#162058]">{formatPrice(program.price)}</p>
                      {discount && (
                        <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">-{discount}%</span>
                      )}
                    </div>
                    {program.original_price && (
                      <p className="text-gray-400 text-sm line-through">{formatPrice(program.original_price)}</p>
                    )}
                  </div>
                  <a href={WA_LINK(`Halo AjiStat, saya ingin mendaftar: ${program.title}`)}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black py-3.5 rounded-xl transition-colors text-sm mb-3">
                    Daftar Sekarang via WhatsApp
                  </a>
                  <a href={WA_LINK(`Halo AjiStat, saya ingin bertanya tentang: ${program.title}`)}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3.5 rounded-xl transition-colors text-sm mb-5">
                    <MessageCircle className="w-4 h-4" /> Tanya via WhatsApp
                  </a>
                  <ul className="space-y-2.5">
                    {WHAT_YOU_GET.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-gray-600 text-xs">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 shadow-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[#162058] font-black text-base leading-none">{formatPrice(program.price)}</p>
          {program.original_price && (
            <p className="text-gray-400 text-xs line-through">{formatPrice(program.original_price)}</p>
          )}
        </div>
        <a href={WA_LINK(`Halo AjiStat, saya tertarik: ${program.title}`)}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 font-semibold px-3 py-2.5 rounded-xl text-sm">
          <MessageCircle className="w-4 h-4" />
        </a>
        <a href={WA_LINK(`Halo AjiStat, saya ingin mendaftar: ${program.title}`)}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold px-5 py-2.5 rounded-xl text-sm">
          Daftar
        </a>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Fasilitator */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#2348A8]" /> Pemateri / Pengajar
              </h2>
              <div className="flex items-start gap-5 bg-gradient-to-br from-[#162058]/5 to-[#2348A8]/5 border border-[#2348A8]/15 rounded-2xl p-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#162058] to-[#2348A8] flex items-center justify-center text-white text-xl font-black shrink-0 shadow-lg">
                  AP
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-black text-gray-900 text-base">
                      {program.facilitator_name || 'Aji Pamoso, S.Si, M.T'}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#F0A500]/20 text-[#C8870A] px-2 py-0.5 rounded-full border border-[#F0A500]/30">
                      <GraduationCap className="w-3 h-3" /> Fasilitator Terverifikasi
                    </span>
                  </div>
                  <p className="text-[#2348A8] text-xs font-semibold mb-2">
                    {program.facilitator_title || 'Fasilitator & Instruktur AjiStat'}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {program.facilitator_bio || 'Praktisi aktif dan pengajar berpengalaman di bidang statistik, riset kuantitatif, dan analisis data. Telah membantu ribuan mahasiswa dan peneliti dari berbagai universitas di seluruh Indonesia.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Kurikulum */}
            {curriculum.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Kurikulum & Materi</h2>
                <div className="space-y-3">
                  {visibleCurriculum.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#162058]/20 transition-colors">
                      <span className="w-7 h-7 rounded-lg bg-[#162058] text-white text-xs font-black flex items-center justify-center shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                {curriculum.length > 6 && (
                  <button
                    onClick={() => setShowFullCurriculum(!showFullCurriculum)}
                    className="mt-4 w-full flex items-center justify-center gap-2 text-[#162058] font-semibold text-sm hover:text-[#2348A8] border border-[#162058]/20 rounded-xl py-3 hover:bg-[#162058]/5 transition-all">
                    {showFullCurriculum ? (
                      <><ChevronUp className="w-4 h-4" /> Sembunyikan</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" /> Tampilkan semua {curriculum.length} sesi</>
                    )}
                  </button>
                )}
              </section>
            )}

            {/* Materi & File */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Materi & File yang Didapatkan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LEARNING_MATERIALS.map((item) => (
                  <button key={item.label} onClick={() => setActiveMaterial(item)}
                    className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#162058]/30 hover:shadow-md transition-all text-left group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.iconBg }}>
                      <item.icon className="w-5 h-5" style={{ color: item.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                      <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.badge}</span>
                    </div>
                    <Lock className="w-4 h-4 text-gray-300 group-hover:text-[#162058] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </section>

            {/* Jadwal Kelas */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Jadwal & Struktur Sesi</h2>
              <div className="space-y-3">
                {scheduleItems.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#162058]/20 transition-all">
                    <div className="shrink-0 text-right w-24">
                      <p className="text-xs font-bold text-[#2348A8]">{item.day}</p>
                      <p className="text-[11px] text-gray-400 font-mono">{item.time}</p>
                    </div>
                    <div className="flex-1 border-l border-gray-200 pl-4">
                      <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ─── Sidebar kanan (sama persis desktop) ─── */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* CTA BOTTOM */}
      <section className="bg-gradient-to-r from-[#162058] to-[#2348A8] py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Siap Bergabung?</h2>
          <p className="text-white/70 mb-6 text-sm">Daftar sekarang dan mulai perjalanan belajar Anda bersama AjiStat.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={WA_LINK(`Halo AjiStat, saya ingin mendaftar kelas ${program.title}`)}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl">
              Daftar Sekarang via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Modal File */}
      <MaterialModal item={activeMaterial} program={program} onClose={() => setActiveMaterial(null)} />
    </>
  );
}
