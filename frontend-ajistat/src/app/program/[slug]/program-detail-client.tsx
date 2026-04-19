'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock, Calendar, CheckCircle, ChevronDown, ChevronUp,
  FileText, Database, Video, FileSpreadsheet, FileCode, Lock,
  MessageCircle, ArrowLeft, GraduationCap,
} from 'lucide-react';
import type { Program } from '@/lib/config';
import { WA_LINK } from '@/lib/config';

function formatPrice(p: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
}

const TYPE_LABEL: Record<string, string> = {
  bootcamp: 'Bootcamp Intensif',
  'short-class': 'Short Class',
  'private-class': 'Kelas Privat',
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

function MaterialModal({ item, program, onClose }: { item: typeof LEARNING_MATERIALS[0] | null; program: Program; onClose: () => void }) {
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
          <a href={WA_LINK(`Halo AjiStat, saya ingin daftar kelas ${program.title} dan mendapatkan ${item.label}`)} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold py-3 rounded-xl transition-colors text-sm">
            Daftar Sekarang via WhatsApp
          </a>
          <button onClick={onClose} className="w-full text-gray-400 hover:text-gray-600 text-xs text-center py-2 mt-1 transition-colors">Mungkin nanti</button>
        </div>
      </div>
    </div>
  );
}

export default function ProgramDetailClient({ program }: { program: Program }) {
  const [showFullCurriculum, setShowFullCurriculum] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState<typeof LEARNING_MATERIALS[0] | null>(null);

  const curriculum = program.curriculum ?? [];
  const visibleCurriculum = showFullCurriculum ? curriculum : curriculum.slice(0, 5);
  const discount = Math.round((1 - program.price / program.originalPrice) * 100);
  const schedule = SCHEDULE[program.type] ?? SCHEDULE['bootcamp'];

  return (
    <>
      {/* HERO */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex gap-2 text-white/40 text-xs mb-6 flex-wrap items-center">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <Link href={TYPE_HREF[program.type] ?? '/'} className="hover:text-white transition-colors">{TYPE_LABEL[program.type]}</Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{program.title}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-bold bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] px-3 py-1 rounded-full">
                  {TYPE_LABEL[program.type]}
                </span>
                {program.status && (
                  <span className="text-xs font-semibold bg-green-500/20 border border-green-400/40 text-green-300 px-3 py-1 rounded-full">
                    {program.status}
                  </span>
                )}
                {program.tags.map(tag => (
                  <span key={tag} className="text-xs bg-white/10 text-white/60 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-snug">{program.title}</h1>
              <p className="text-white/65 text-sm leading-relaxed mb-8">{program.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white/8 border border-white/12 rounded-xl p-3.5 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#F0A500] shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider">Durasi</p>
                    <p className="text-white text-xs font-medium">{program.duration}</p>
                  </div>
                </div>
                <div className="bg-white/8 border border-white/12 rounded-xl p-3.5 flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#F0A500] shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider">Jadwal</p>
                    <p className="text-white text-xs font-medium">Segera</p>
                  </div>
                </div>
                <div className="bg-white/8 border border-white/12 rounded-xl p-3.5 flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#F0A500] shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider">Fasilitator</p>
                    <p className="text-white text-xs font-medium truncate">{program.facilitator.split(',')[0]}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Purchase Card Desktop */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-5 shadow-2xl sticky top-20">
                <p className="text-gray-400 text-sm line-through mb-0.5">{formatPrice(program.originalPrice)}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-2xl font-black text-[#162058]">{formatPrice(program.price)}</p>
                  <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
                </div>
                <a href={WA_LINK(`Halo AjiStat, saya ingin mendaftar program: ${program.title}`)} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold py-3 rounded-xl transition-colors mb-2 text-sm">
                  Daftar Sekarang via WhatsApp
                </a>
                <a href={WA_LINK(`Halo AjiStat, saya tertarik program ${program.title}. Bisa info lebih lanjut?`)} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 font-semibold py-2.5 rounded-xl transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" /> Tanya via WhatsApp
                </a>
                <ul className="mt-4 space-y-2">
                  {WHAT_YOU_GET.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 shadow-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[#162058] font-black text-base leading-none">{formatPrice(program.price)}</p>
          <p className="text-gray-400 text-xs line-through">{formatPrice(program.originalPrice)}</p>
        </div>
        <a href={WA_LINK(`Halo AjiStat, saya tertarik: ${program.title}`)} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 font-semibold px-3 py-2.5 rounded-xl text-sm">
          <MessageCircle className="w-4 h-4" />
        </a>
        <a href={WA_LINK(`Halo AjiStat, saya ingin mendaftar: ${program.title}`)} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold px-5 py-2.5 rounded-xl text-sm">
          Daftar
        </a>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Fasilitator */}
            <section>
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#F0A500] inline-block" />
                Pemateri / Fasilitator
              </h2>
              <div className="flex items-start gap-4 bg-gradient-to-br from-[#162058]/5 to-[#2348A8]/5 border border-[#2348A8]/15 rounded-2xl p-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#162058] to-[#2348A8] flex items-center justify-center text-white text-sm font-black shrink-0">
                  {program.facilitator.split(' ').slice(-2).map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-black text-gray-900 text-sm">{program.facilitator}</p>
                    <span className="text-[10px] font-bold bg-[#F0A500]/20 text-[#C8870A] px-2 py-0.5 rounded-full border border-[#F0A500]/30">Terverifikasi</span>
                  </div>
                  <p className="text-[#2348A8] text-xs font-semibold mb-1">Fasilitator AjiStat</p>
                  {program.facilitatorBio && <p className="text-gray-600 text-xs leading-relaxed">{program.facilitatorBio}</p>}
                </div>
              </div>
            </section>

            {/* Materi & File */}
            <section>
              <h2 className="text-lg font-black text-gray-900 mb-1 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#F0A500] inline-block" />
                Materi & File Pembelajaran
                <span className="text-xs bg-[#F0A500]/20 text-[#C8870A] font-semibold px-2.5 py-0.5 rounded-full border border-[#F0A500]/30 ml-1">Klik untuk info</span>
              </h2>
              <p className="text-gray-400 text-xs mb-4">Klik salah satu untuk mengetahui cara mendapatkan file tersebut.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LEARNING_MATERIALS.map(item => (
                  <button key={item.label} onClick={() => setActiveMaterial(item)}
                    className="flex items-start gap-3 bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#2348A8]/25 hover:shadow-md rounded-xl p-4 transition-all text-left group cursor-pointer w-full">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: item.iconBg }}>
                      <item.icon className="w-4 h-4" style={{ color: item.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="font-semibold text-gray-800 text-xs">{item.label}</p>
                        <span className="text-[10px] font-bold bg-[#162058]/10 text-[#162058] px-1.5 py-0.5 rounded-full">{item.badge}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    <Lock className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5 group-hover:text-[#F0A500] transition-colors" />
                  </button>
                ))}
              </div>
            </section>

            {/* Jadwal */}
            <section>
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#F0A500] inline-block" />
                Jadwal & Rundown Program
              </h2>
              <div className="rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-[#162058] px-5 py-3">
                  <p className="text-white font-semibold text-sm">Rundown Harian</p>
                </div>
                {schedule.map((row, i) => (
                  <div key={i} className={`grid grid-cols-[70px_110px_1fr] gap-3 px-5 py-3.5 items-start ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                    <span className="text-xs font-bold text-[#2348A8] bg-blue-50 px-2 py-1 rounded-lg text-center whitespace-nowrap">{row.day}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{row.time}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{row.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{row.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-2 text-center">* Jadwal bersifat panduan. Info detail tanyakan via WhatsApp.</p>
            </section>

            {/* Kurikulum */}
            {curriculum.length > 0 && (
              <section>
                <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-[#F0A500] inline-block" />
                  Kurikulum Program
                </h2>
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  {visibleCurriculum.map((item, i) => (
                    <div key={i} className={`flex items-start gap-4 px-5 py-4 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                      <div className="w-6 h-6 bg-[#162058] rounded-lg text-white text-xs font-black flex items-center justify-center shrink-0">{i + 1}</div>
                      <p className="text-gray-700 text-sm pt-0.5">{item}</p>
                    </div>
                  ))}
                </div>
                {curriculum.length > 5 && (
                  <button onClick={() => setShowFullCurriculum(!showFullCurriculum)}
                    className="mt-3 flex items-center gap-1.5 text-[#2348A8] text-sm font-semibold hover:underline">
                    {showFullCurriculum
                      ? <><ChevronUp className="w-4 h-4" /> Tampilkan lebih sedikit</>
                      : <><ChevronDown className="w-4 h-4" /> Lihat {curriculum.length - 5} materi lainnya</>}
                  </button>
                )}
              </section>
            )}

            {/* Untuk Siapa */}
            <section>
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#F0A500] inline-block" />
                Untuk Siapa Program Ini?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Mahasiswa S1, S2, dan S3 yang sedang mengerjakan skripsi/tesis/disertasi',
                  'Dosen dan peneliti yang ingin meningkatkan kompetensi analisis data',
                  'Praktisi dan profesional yang membutuhkan keterampilan riset berbasis data',
                  'Pemula yang ingin mulai belajar statistik dari nol hingga mahir',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 bg-blue-50/60 border border-blue-100 rounded-xl p-4">
                    <CheckCircle className="w-4 h-4 text-[#2348A8] shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-4">
            <div className="bg-gradient-to-br from-[#162058]/5 to-[#2348A8]/5 border border-[#162058]/10 rounded-2xl p-5">
              <h3 className="font-black text-gray-900 mb-4 text-sm">Yang Akan Anda Dapatkan</h3>
              <ul className="space-y-3">
                {WHAT_YOU_GET.map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href={TYPE_HREF[program.type] ?? '/'}
              className="flex items-center gap-2 text-gray-400 hover:text-[#2348A8] text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali ke daftar program
            </Link>
          </div>
        </div>
      </div>

      <MaterialModal item={activeMaterial} program={program} onClose={() => setActiveMaterial(null)} />
    </>
  );
}
