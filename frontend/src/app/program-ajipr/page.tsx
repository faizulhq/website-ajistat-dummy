'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const FORMATS = [
  { icon: '🎓', name: 'Bootcamp AjiPR', desc: 'Intensif 3–5 hari. Public speaking, media relation, personal branding.' },
  { icon: '🔧', name: 'Workshop AjiPR', desc: 'Hands-on workshop praktik presentasi, interview, dan public speaking.' },
];

const TOPICS = [
  'Public Speaking & Presentasi Profesional', 'Personal Branding Digital',
  'Media Relation & Press Release', 'Komunikasi Krisis (Crisis Communication)',
  'MC & Moderator Profesional', 'Storytelling untuk Bisnis & Akademik',
  'Negosiasi & Persuasi', 'Interview Karier & Beasiswa',
  'Komunikasi Internal Organisasi', 'Brand Identity & Positioning',
];

const KEUNGGULAN = [
  'Dibimbing praktisi komunikasi dan PR berpengalaman nasional',
  'Latihan langsung dengan feedback real-time dari mentor',
  'Portfolio komunikasi siap pakai untuk karier profesional',
  'Rekaman sesi untuk review mandiri seumur hidup',
  'Cocok untuk mahasiswa, profesional, dan pengusaha',
  'Konsultasi karier komunikasi via WhatsApp setelah program',
];

export default function AjiPRPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#3b0764] via-[#6d28d9] to-[#7C3AED] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-6xl">🎤</span>
              <div>
                <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">Aji Institute — Program Komunikasi</span>
                <h1 className="text-5xl sm:text-6xl font-black text-white">AjiPR</h1>
              </div>
            </div>
            <p className="text-white/75 text-xl leading-relaxed mb-6">
              Program <strong className="text-white">public relation, komunikasi profesional, dan personal branding</strong> untuk tampil percaya diri dan berpengaruh di ruang publik.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Public Speaking', 'Media Relation', 'Personal Branding', 'Komunikasi', 'MC', 'Storytelling'].map((t) => (
                <span key={t} className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full font-semibold border border-white/20">{t}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK('Halo, saya ingin mendaftar program AjiPR')} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-black px-8 py-4 rounded-2xl transition-all hover:scale-105">
                💬 Daftar via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/konsultasi"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:bg-white/10">
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-3">Format Belajar</p>
            <h2 className="text-3xl font-black text-gray-900">Pilih Format yang Sesuai</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {FORMATS.map((f) => (
              <a key={f.name} href={WA_LINK(`Halo, saya ingin info tentang ${f.name}`)}
                target="_blank" rel="noopener noreferrer"
                className="group bg-gray-50 hover:bg-[#7C3AED] border border-gray-100 hover:border-[#7C3AED] rounded-2xl p-6 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-black text-lg text-gray-900 group-hover:text-white mb-2 transition-colors">{f.name}</h3>
                <p className="text-gray-500 group-hover:text-white/70 text-sm transition-colors">{f.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900">Topik Program AjiPR</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOPICS.map((t) => (
              <span key={t} className="px-4 py-2 bg-white border border-gray-200 hover:border-[#7C3AED] hover:bg-purple-50 text-gray-700 rounded-xl text-sm font-medium transition-colors cursor-default">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10"><h2 className="text-3xl font-black text-gray-900">Keunggulan AjiPR</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KEUNGGULAN.map((k, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <CheckCircle className="w-5 h-5 text-[#7C3AED] mt-0.5 shrink-0" />
                <p className="text-gray-700 text-sm">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#3b0764] to-[#7C3AED]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Siap Bergabung dengan AjiPR?</h2>
          <p className="text-white/70 mb-8">Tingkatkan kemampuan komunikasi Anda bersama praktisi PR terbaik.</p>
          <a href={WA_LINK('Halo, saya ingin mendaftar program AjiPR. Bisa dibantu?')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            💬 Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
