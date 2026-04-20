'use client';

import Image from 'next/image';
import { BookOpen, Briefcase, Award, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// ── Live counting hook ──────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Modal component ──────────────────────────────────────────────
function StatModal({ stat, onClose }: {
  stat: { title: string; detail: string; icon: React.ElementType; accent: string } | null;
  onClose: () => void;
}) {
  if (!stat) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 z-10"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          ✕
        </button>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: stat.accent + '22' }}>
          <stat.icon className="w-6 h-6" style={{ color: stat.accent }} />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-3">{stat.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{stat.detail}</p>
      </div>
    </div>
  );
}

// ── Stat card (photo variant) ──────────────────────────────────────
function PhotoStatCard({
  target,
  suffix,
  label,
  icon: Icon,
  accent,
  detail,
  onOpen,
}: {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  accent: string;
  detail: string;
  onOpen: () => void;
}) {
  const { count, ref } = useCountUp(target);
  const displayNum = target >= 1000
    ? (count >= 1000 ? `${(count / 1000).toFixed(0)}.000` : count.toString())
    : count.toString();

  return (
    <div
      ref={ref}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      className="relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer group transition-all hover:scale-[1.03] hover:shadow-2xl w-full text-left"
      style={{ aspectRatio: '4/3', minHeight: '160px' }}>
      {/* Background photo */}
      <Image
        src="/images/alumni-inhouse-training.jpeg"
        alt="Alumni In-House Training"
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, 25vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#162058]/90 via-[#162058]/60 to-transparent" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: accent + '33' }}>
            <Icon className="w-4 h-4" style={{ color: accent }} />
          </div>
        </div>
        <p className="text-2xl font-black text-white leading-none">{displayNum}{suffix}</p>
        <p className="text-white/70 text-xs mt-0.5">{label}</p>
        <p className="text-white/0 group-hover:text-white/60 text-[10px] mt-1 transition-colors">Klik untuk info →</p>
      </div>
    </div>
  );
}

// ── Plain stat card ────────────────────────────────────────────────
function PlainStatCard({
  target,
  suffix,
  label,
  icon: Icon,
  accent,
  detail,
  onOpen,
}: {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  accent: string;
  detail: string;
  onOpen: () => void;
}) {
  const { count, ref } = useCountUp(target);
  const displayNum = target >= 1000
    ? (count >= 1000 ? `${(count / 1000).toFixed(0)}.000` : count.toString())
    : count.toString();

  return (
    <div
      ref={ref}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 cursor-pointer group transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.03] hover:shadow-2xl text-left w-full h-full"
      style={{ minHeight: '120px' }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: accent + '33' }}>
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-black text-white leading-none">{displayNum}{suffix}</p>
        <p className="text-white/55 text-xs mt-0.5 leading-snug">{label}</p>
      </div>
      <p className="text-white/0 group-hover:text-white/50 text-[10px] transition-colors">Klik untuk info →</p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────
const STAT_DETAILS = [
  {
    target: 500, suffix: '+', label: 'Alumni In-House Training',
    icon: BookOpen, accent: '#F0A500',
    title: 'Alumni In-House Training',
    detail: 'Lebih dari 500 peserta telah mengikuti program In-House Training yang kami selenggarakan untuk berbagai instansi, kampus, dan perusahaan di seluruh Indonesia. Program ini dirancang secara custom sesuai kebutuhan SDM organisasi klien kami.',
    isPhoto: true,
  },
  {
    target: 5000, suffix: '+', label: 'Klien Terbantu dari Konsultasi',
    icon: Award, accent: '#4A72D4',
    title: '5.000+ Klien Terbantu',
    detail: 'Ribuan mahasiswa, peneliti, dosen, dan profesional telah berhasil menuntaskan riset mereka dengan bantuan tim konsultan AjiStat. Dari skripsi S1 hingga disertasi S3 dan riset institusional.',
    isPhoto: false,
  },
  {
    target: 10, suffix: '+', label: 'Fasilitator Expert',
    icon: Briefcase, accent: '#34d399',
    title: '10+ Fasilitator Expert',
    detail: 'Tim fasilitator Aji Institute terdiri dari akademisi aktif, peneliti, dan praktisi industri yang berpengalaman. Setiap fasilitator dipilih ketat berdasarkan rekam jejak riset dan kemampuan mengajar yang terbukti.',
    isPhoto: false,
  },
  {
    target: 5, suffix: '', label: 'Divisi Program Unggulan',
    icon: Star, accent: '#a78bfa',
    title: '5 Divisi Program',
    detail: 'Aji Institute menghadirkan 5 program divisi yang komprehensif: AjiStat (Statistik & Riset), AjiBiz (Bisnis & Manajemen), AjiComm (Komunikasi & PR), AjiAI (Digital Marketing), dan AjiLingua (Bahasa Asing & Akademik).',
    isPhoto: false,
  },
];

export function StatsStrip() {
  const [activeStat, setActiveStat] = useState<(typeof STAT_DETAILS[0]) | null>(null);

  return (
    <div className="bg-[#162058] border-b border-[#4A72D4]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_DETAILS.map((stat) =>
            stat.isPhoto ? (
              <PhotoStatCard
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                accent={stat.accent}
                detail={stat.detail}
                onOpen={() => setActiveStat(stat)}
              />
            ) : (
              <PlainStatCard
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                accent={stat.accent}
                detail={stat.detail}
                onOpen={() => setActiveStat(stat)}
              />
            )
          )}
        </div>
      </div>

      <StatModal
        stat={activeStat ? { title: activeStat.title, detail: activeStat.detail, icon: activeStat.icon, accent: activeStat.accent } : null}
        onClose={() => setActiveStat(null)}
      />
    </div>
  );
}
