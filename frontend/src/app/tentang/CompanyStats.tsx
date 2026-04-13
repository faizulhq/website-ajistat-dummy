'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
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

const STATS = [
  { target: 5000, suffix: '+', label: '🤝 Klien Terbantu dari Konsultasi', color: 'bg-blue-50 border-blue-100' },
  { target: 30, suffix: '+', label: '📚 Layanan Aktif', color: 'bg-amber-50 border-amber-100' },
  { target: 10, suffix: '+', label: '🎓 Fasilitator Expert', color: 'bg-green-50 border-green-100' },
  { target: 5, suffix: '', label: '🏛️ Program Unggulan', color: 'bg-purple-50 border-purple-100' },
];

function StatCard({ target, suffix, label, color }: typeof STATS[0]) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} className={`${color} border rounded-2xl p-6 text-center`}>
      <p className="text-3xl font-bold text-gray-900 mb-1">
        {target >= 1000
          ? count.toLocaleString('id-ID') + suffix
          : count + suffix}
      </p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}

export function CompanyStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
