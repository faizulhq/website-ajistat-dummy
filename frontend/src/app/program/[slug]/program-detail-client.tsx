'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Clock, Calendar, Users, CheckCircle, Star,
  MessageCircle, ArrowLeft, BookOpen, Award, ChevronDown, ChevronUp, X,
  FileText, Database, Video, FileSpreadsheet, FileCode, Lock, GraduationCap
} from 'lucide-react';
import { programsApi } from '@/lib/api';
import { formatPrice, STATUS_LABELS, STATUS_COLORS, cn } from '@/lib/utils';
import { WA_LINK } from '@/lib/config';
import type { Program } from '@/lib/types';

const TYPE_LABEL: Record<string, string> = {
  'bootcamp': 'Bootcamp Intensif',
  'short-class': 'Short Class',
  'private-class': 'Private Class',
};

// Label video sesuai tipe kelas
const VIDEO_LABEL: Record<string, string> = {
  'bootcamp': 'Cuplikan Sesi Bootcamp',
  'short-class': 'Cuplikan Sesi Pembelajaran',
  'private-class': 'Cuplikan Sesi Latihan Privat',
  'in-house-training': 'Cuplikan Sesi Pelatihan',
};

const WHAT_YOU_GET = [
  { icon: BookOpen, label: 'Rekaman video sesi seumur hidup' },
  { icon: BookOpen, label: 'Modul & materi tertulis' },
  { icon: Award, label: 'Sertifikat kelulusan resmi' },
  { icon: Users, label: 'Akses grup diskusi alumni' },
  { icon: CheckCircle, label: 'Dataset riset untuk praktik' },
  { icon: MessageCircle, label: 'Konsultasi lanjutan via WA' },
];

// Materi pembelajaran saja (PDF, DOCX, Video, Dataset)
const LEARNING_MATERIALS = [
  {
    icon: FileText,
    iconBg: '#EBF4FF',
    iconColor: '#2348A8',
    label: 'Modul Pelatihan',
    desc: 'Slide materi lengkap yang digunakan saat kelas berlangsung. Bisa disimpan dan dibaca ulang kapan saja.',
    badge: 'PDF',
  },
  {
    icon: Database,
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    label: 'Dataset Praktik',
    desc: 'Dataset riset nyata yang digunakan langsung saat sesi latihan — siap untuk eksplorasi mandiri.',
    badge: 'Excel / SAV',
  },
  {
    icon: Video,
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    label: 'Rekaman Sesi',
    desc: 'Rekaman video seluruh sesi pembelajaran. Putar ulang materi kapan saja, seumur hidup tanpa batas.',
    badge: 'Video / Link',
  },
  {
    icon: FileSpreadsheet,
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    label: 'Template Laporan',
    desc: 'Template terstruktur untuk menulis hasil analisis data — langsung bisa dipakai di skripsi/tesis Anda.',
    badge: 'DOCX / PDF',
  },
  {
    icon: FileCode,
    iconBg: '#FEFCE8',
    iconColor: '#CA8A04',
    label: 'Script & Syntax',
    desc: 'Kode atau syntax yang digunakan selama pembelajaran — bisa langsung dipakai di proyek riset Anda.',
    badge: 'R / Python / SPSS',
  },
];

// ── Facilitator card ─────────────────────────────────────────────
function FacilitatorCard() {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-5">👨‍🏫 Pemateri / Pengajar</h2>
      <div className="flex items-start gap-5 bg-gradient-to-br from-[#162058]/5 to-[#2348A8]/5 border border-[#2348A8]/15 rounded-2xl p-5">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#162058] to-[#2348A8] flex items-center justify-center text-white text-xl font-black shrink-0 shadow-lg">
          AP
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="font-black text-gray-900 text-base">Aji Pamoso, S.Si, M.T</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#F0A500]/20 text-[#C8870A] px-2 py-0.5 rounded-full border border-[#F0A500]/30">
              <GraduationCap className="w-3 h-3" /> Fasilitator Terverifikasi
            </span>
          </div>
          <p className="text-[#2348A8] text-xs font-semibold mb-2">Fasilitator &amp; Instruktur Aji Institute</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Praktisi aktif dan pengajar berpengalaman di bidang statistik, riset kuantitatif, dan analisis data.
            Telah membantu ribuan mahasiswa dan peneliti dari berbagai universitas di seluruh Indonesia menuntaskan riset mereka.
          </p>
        </div>
      </div>
    </section>
  );
}

function MaterialModal({
  material,
  program,
  onClose,
}: {
  material: typeof LEARNING_MATERIALS[0] | null;
  program: Program;
  onClose: () => void;
}) {
  if (!material) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#162058] to-[#F0A500]" />

        <div className="p-7">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Lock icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#162058]/8 flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-[#162058]" />
          </div>

          {/* Material preview card */}
          <div className="flex items-center gap-3 mb-5 p-3 rounded-xl border border-gray-100 bg-gray-50">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: material.iconBg }}
            >
              <material.icon className="w-5 h-5" style={{ color: material.iconColor }} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{material.label}</p>
              <span className="text-[10px] font-bold bg-[#162058]/10 text-[#162058] px-2 py-0.5 rounded-full">
                {material.badge}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-black text-gray-900 mb-2">
            Daftar Kelas untuk Mendapatkan File Ini
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            File <strong>{material.label}</strong> ({material.badge}) hanya tersedia untuk peserta yang telah terdaftar
            di kelas <strong>{program.title}</strong>. Daftar sekarang untuk mendapatkan akses penuh ke semua materi!
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={WA_LINK(`Halo, saya ingin mendaftar kelas ${program.title} dan mendapatkan file ${material.label}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md"
            >
              💬 Daftar Sekarang via WhatsApp
            </a>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xs text-center py-1 transition-colors"
            >
              Mungkin nanti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [showFullCurriculum, setShowFullCurriculum] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState<typeof LEARNING_MATERIALS[0] | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['program', slug],
    queryFn: () => programsApi.detail(slug).then((r) => r.data),
  });

  const program: Program | undefined = data;

  if (isLoading) return (
    <div className="max-w-5xl mx-auto px-4 py-20 animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
      <div className="h-4 bg-gray-100 rounded-xl" />
      <div className="h-4 bg-gray-100 rounded-xl w-2/3" />
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl" />)}
      </div>
    </div>
  );

  if (isError || !program) return (
    <div className="text-center py-32">
      <p className="text-5xl mb-4">😕</p>
      <h2 className="font-bold text-xl text-gray-800 mb-2">Program tidak ditemukan</h2>
      <Link href="/bootcamp" className="text-[#2348A8] text-sm hover:underline">← Lihat semua program</Link>
    </div>
  );

  const curriculum = program.curriculum ?? [];
  const testimonials = program.testimonials ?? [];
  const visibleCurriculum = showFullCurriculum ? curriculum : curriculum.slice(0, 6);

  const discount = program.original_price
    ? Math.round((1 - program.price / program.original_price) * 100)
    : null;

  const videoLabel = VIDEO_LABEL[program.type] ?? 'Cuplikan Pembelajaran';

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            style={{ backgroundColor: program.thumbnail_color }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex gap-2 text-white/40 text-sm mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <Link href={`/${program.type}`} className="hover:text-white transition-colors capitalize">
              {TYPE_LABEL[program.type]}
            </Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{program.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs font-bold bg-[#2348A8]/40 border border-[#2348A8]/50 text-white px-3 py-1 rounded-full">
                  {TYPE_LABEL[program.type]}
                </span>
                <span className={cn('text-xs font-semibold px-3 py-1 rounded-full', STATUS_COLORS[program.status])}>
                  {STATUS_LABELS[program.status]}
                </span>
                {program.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs bg-white/10 text-white/75 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>

              <h1 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
                {program.title}
              </h1>

              {program.description && (
                <p className="text-white/70 text-base leading-relaxed mb-7">{program.description}</p>
              )}

              {/* Video — label dinamis sesuai tipe */}
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
                    Mata pelatihan ini berisi video, tetapi browser Anda tidak mendukung pemutar video HTML5.
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

            {/* Right: Purchase Card (desktop) */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-6 shadow-2xl sticky top-20">
                <div className="mb-5">
                  {program.original_price && (
                    <p className="text-gray-400 text-sm line-through">{formatPrice(program.original_price)}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-[#1B3A8C]">{formatPrice(program.price)}</p>
                    {discount && (
                      <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
                    )}
                  </div>
                </div>

                <a
                  href={WA_LINK(`Halo, saya ingin mendaftar program: ${program.title}`)}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold py-3.5 rounded-xl transition-all mb-3 text-sm"
                >
                  💬 Daftar Sekarang via WhatsApp
                </a>

                <a
                  href={WA_LINK(`Halo, saya tertarik dengan program: ${program.title}. Bisa info lebih lanjut?`)}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Tanya via WhatsApp
                </a>

                <ul className="mt-5 space-y-2">
                  {WHAT_YOU_GET.slice(0, 4).map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2 text-xs text-gray-600">
                      <Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE PURCHASE BAR ─── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 shadow-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[#1B3A8C] font-bold text-lg leading-none">{formatPrice(program.price)}</p>
          {discount && <p className="text-gray-400 text-xs line-through">{formatPrice(program.original_price!)}</p>}
        </div>
        <a href={WA_LINK(`Halo, saya tertarik dengan: ${program.title}`)}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 font-semibold px-4 py-2.5 rounded-xl text-sm">
          <MessageCircle className="w-4 h-4" /> Tanya
        </a>
        <a href={WA_LINK(`Halo, saya ingin mendaftar program: ${program.title}`)}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          💬 Daftar
        </a>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-28 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* ─── Fasilitator / Pemateri ─── */}
            <FacilitatorCard />

            {/* ─── MATERI & FILE PEMBELAJARAN (dipindah ke atas jadwal) ─── */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <h2 className="text-xl font-bold text-gray-900">Materi &amp; File Pembelajaran</h2>
                <span className="text-xs bg-[#F0A500]/20 text-[#C8870A] font-semibold px-2.5 py-0.5 rounded-full border border-[#F0A500]/30">
                  Klik untuk info
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Berikut file dan materi yang akan dibagikan &amp; diajarkan selama program berlangsung.
                Klik salah satu untuk mengetahui cara mendapatkannya.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LEARNING_MATERIALS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveMaterial(item)}
                    className="flex items-start gap-4 bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#2348A8]/30 hover:shadow-md rounded-2xl p-4 transition-all text-left group cursor-pointer w-full"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                        <span className="text-[10px] font-bold bg-[#162058]/10 text-[#162058] px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      <p className="text-[#2348A8] text-[10px] font-semibold mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        Klik untuk cara mendapatkan →
                      </p>
                    </div>
                    {/* Lock icon */}
                    <Lock className="w-4 h-4 text-gray-300 shrink-0 mt-0.5 group-hover:text-[#F0A500] transition-colors" />
                  </button>
                ))}
              </div>
            </section>

            {/* ─── Jadwal Program ─── */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">📅 Jadwal Program</h2>
              {program.schedule ? (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-5">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#2348A8] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Jadwal Umum</p>
                      <p className="text-gray-600 text-sm">{program.schedule}</p>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* Jadwal harian default berdasarkan type program */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="bg-[#162058] px-5 py-3">
                  <p className="text-white font-semibold text-sm">📋 Rundown Harian</p>
                </div>
                {(program.type === 'bootcamp'
                  ? [
                      { day: 'Hari 1', time: '08.00 – 12.00', label: 'Sesi Pagi: Materi & Konsep Dasar', note: 'Onboarding + pengenalan tools dan software' },
                      { day: 'Hari 1', time: '13.00 – 17.00', label: 'Sesi Siang: Hands-on Praktik', note: 'Input data, eksplorasi dataset nyata' },
                      { day: 'Hari 2', time: '08.00 – 12.00', label: 'Sesi Pagi: Analisis Mendalam', note: 'Uji statistik, interpretasi output' },
                      { day: 'Hari 2', time: '13.00 – 17.00', label: 'Sesi Siang: Studi Kasus', note: 'Praktik langsung dari dataset riset nyata' },
                      { day: 'Hari 3', time: '08.00 – 12.00', label: 'Sesi Pagi: Topik Lanjutan', note: 'Materi advanced & Q&A mendalam' },
                      { day: 'Hari 3', time: '13.00 – 16.00', label: 'Sesi Siang: Review & Presentasi', note: 'Presentasi hasil + penutupan + sertifikat' },
                    ]
                  : program.type === 'short-class'
                  ? [
                      { day: 'Sesi 1', time: '08.00 – 10.00', label: 'Materi Inti & Teori', note: 'Konsep, tujuan, dan konteks penggunaan' },
                      { day: 'Sesi 2', time: '10.15 – 12.00', label: 'Praktik Langsung', note: 'Hands-on dengan software & dataset' },
                      { day: 'Sesi 3', time: '13.00 – 14.30', label: 'Studi Kasus & Q&A', note: 'Diskusi, troubleshooting, tanya jawab' },
                      { day: 'Penutup', time: '14.30 – 15.00', label: 'Evaluasi & Sertifikat', note: 'Ringkasan materi + pemberian sertifikat' },
                    ]
                  : [
                      { day: 'Sesi Awal', time: 'Fleksibel', label: 'Konsultasi Kebutuhan', note: 'Identifikasi kebutuhan dan target belajar' },
                      { day: 'Sesi 1–3', time: 'Disepakati', label: 'Pembelajaran Inti', note: 'Materi disesuaikan level & kebutuhan peserta' },
                      { day: 'Sesi 4–6', time: 'Disepakati', label: 'Praktik & Pendalaman', note: 'Hands-on dengan data/kasus peserta sendiri' },
                      { day: 'Sesi Akhir', time: 'Disepakati', label: 'Review & Follow-up', note: 'Evaluasi capaian + konsultasi lanjutan via WA' },
                    ]
                ).map((row, i) => (
                  <div key={i} className={cn(
                    'grid grid-cols-[80px_1fr] sm:grid-cols-[100px_140px_1fr] gap-3 px-5 py-4 items-start',
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                    i > 0 && 'border-t border-gray-100'
                  )}>
                    <span className="text-xs font-bold text-[#2348A8] bg-blue-50 px-2 py-1 rounded-lg text-center whitespace-nowrap">{row.day}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {row.time}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{row.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{row.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-3 text-center">
                * Jadwal bersifat panduan, dapat disesuaikan. Info detail tanyakan via WhatsApp.
              </p>
            </section>

            {curriculum.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">📚 Kurikulum Program</h2>
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  {visibleCurriculum.map((item, i) => (
                    <div key={i} className={cn(
                      'flex items-start gap-4 px-5 py-4',
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                      i > 0 && 'border-t border-gray-100'
                    )}>
                      <div className="w-7 h-7 bg-[#1B3A8C] rounded-lg text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 text-sm pt-1">{item}</p>
                    </div>
                  ))}
                </div>
                {curriculum.length > 6 && (
                  <button
                    onClick={() => setShowFullCurriculum(!showFullCurriculum)}
                    className="mt-4 flex items-center gap-1.5 text-[#2348A8] text-sm font-semibold hover:underline"
                  >
                    {showFullCurriculum ? (
                      <><ChevronUp className="w-4 h-4" /> Tampilkan lebih sedikit</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" /> Lihat {curriculum.length - 6} modul lainnya</>
                    )}
                  </button>
                )}
              </section>
            )}

            {/* Untuk Siapa */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">🎯 Untuk Siapa Program Ini?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Mahasiswa S1, S2, dan S3 yang sedang mengerjakan skripsi/tesis/disertasi',
                  'Dosen dan peneliti yang ingin meningkatkan kompetensi analisis data',
                  'Praktisi dan profesional yang membutuhkan keterampilan riset berbasis data',
                  'Pemula yang ingin mulai belajar statistik dan analisis data dari nol',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <CheckCircle className="w-4 h-4 text-[#2348A8] shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimoni */}
            {testimonials.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">⭐ Apa Kata Peserta?</h2>
                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <div className="flex gap-1 mb-3">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#F0A500] text-[#F0A500]" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm italic mb-4">&quot;{t.comment}&quot;</p>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B3A8C] to-[#2348A8] flex items-center justify-center text-white text-xs font-bold">
                          {t.avatar || t.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                          <p className="text-gray-400 text-xs">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar: Yang Didapatkan */}
          <div className="hidden lg:block">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">✅ Yang Akan Anda Dapatkan</h3>
              <ul className="space-y-3">
                {WHAT_YOU_GET.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back to listing */}
            <Link
              href={`/${program.type}`}
              className="mt-4 flex items-center gap-2 text-gray-500 hover:text-[#2348A8] text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke daftar program
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Material Modal ─── */}
      <MaterialModal
        material={activeMaterial}
        program={program}
        onClose={() => setActiveMaterial(null)}
      />
    </>
  );
}
