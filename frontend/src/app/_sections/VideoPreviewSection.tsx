'use client';

import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

export function VideoPreviewSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="bg-[#0d1632] relative overflow-hidden py-0">
      {/* Background dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div>
            <span className="inline-block text-xs font-bold text-[#F0A500] bg-[#F0A500]/10 border border-[#F0A500]/30 px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              Cuplikan Program
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              Lihat Langsung Bagaimana Kami Mengajar
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              Intip cuplikan sesi langsung Bootcamp SPSS — bagaimana pengolahan data statistik yang kompleks kami sajikan dengan sederhana, jelas, dan langsung bisa dipraktikkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WA_LINK('Halo, saya tertarik bergabung program AjiStat setelah melihat video preview')}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-6 py-3.5 rounded-2xl transition-all hover:scale-105 text-sm shadow-lg">
                Daftar Sekarang <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/program-ajistat"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3.5 rounded-2xl text-sm transition-all hover:bg-white/10">
                Lihat Semua Program →
              </a>
            </div>
          </div>

          {/* Right: Portrait 9:16 video */}
          <div className="flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              style={{ width: '100%', maxWidth: '320px', aspectRatio: '9/16' }}>
              <video
                ref={videoRef}
                src="/videos/video-preview-pelatihan-spss.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-[#F0A500] text-[#162058] rounded-xl px-3 py-2 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-wide">Bootcamp SPSS</p>
                <p className="text-base font-black leading-tight">AjiStat</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
