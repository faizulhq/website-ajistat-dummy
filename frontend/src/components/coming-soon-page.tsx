'use client';

import Link from 'next/link';
import { MessageCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { WA_LINK } from '@/lib/config';

interface ComingSoonPageProps {
  brand: {
    icon: string;
    name: string;
    label: string;
    description: string;
    color: string;
    topics: string[];
    benefit: string;
  };
}

export function ComingSoonPage({ brand }: ComingSoonPageProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Hero */}
      <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #054E7A 0%, #0B7AB5 60%, ${brand.color}33 100%)` }}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>

          <div className="text-6xl mb-6">{brand.icon}</div>

          <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border"
            style={{ background: `${brand.color}22`, borderColor: `${brand.color}40`, color: brand.color }}>
            {brand.label}
          </span>

          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-bold text-white mb-6">
            {brand.name}<br />
            <span className="text-white/50 text-3xl font-normal">Segera Hadir 🚀</span>
          </h1>

          <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-xl mx-auto">{brand.description}</p>

          <div className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-sm font-medium px-5 py-2.5 rounded-full mb-10">
            🔔 Program dalam tahap pengembangan — Daftarkan minat Anda sekarang
          </div>

          {/* Early Interest Form */}
          {sent ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <p className="text-4xl mb-3">✅</p>
              <p className="text-white font-semibold text-lg">Terima kasih sudah mendaftar!</p>
              <p className="text-white/60 text-sm mt-2">Kami akan mengirimkan informasi terbaru ke email Anda saat program siap diluncurkan.</p>
            </div>
          ) : (
            <div className="bg-white/8 border border-white/15 rounded-2xl p-6 text-left">
              <p className="text-white font-semibold mb-4 text-center">Daftar untuk Mendapatkan Notifikasi Pertama</p>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50"
                />
                <button
                  onClick={() => email && setSent(true)}
                  className="bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-bold px-5 py-3 rounded-xl text-sm transition-colors"
                >
                  Daftar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Topik */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900 mb-2">
              Topik yang Akan Tersedia
            </h2>
            <p className="text-gray-500 text-sm">{brand.benefit}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {brand.topics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5">
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: brand.color }} />
                <span className="text-gray-700 text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA WA */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-xl mx-auto text-center px-4">
          <p className="font-semibold text-gray-900 text-lg mb-3">Ingin program ini hadir lebih cepat?</p>
          <p className="text-gray-500 text-sm mb-6">Sampaikan minat Anda dan jadilah bagian dari peserta pertama dengan harga Early Bird spesial.</p>
          <a href={WA_LINK(`Halo Aji Institute, saya tertarik dengan program ${brand.name} yang akan datang`)}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
            <MessageCircle className="w-4 h-4" /> Nyatakan Minat via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
