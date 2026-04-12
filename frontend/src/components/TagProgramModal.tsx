'use client';

import { useEffect, useRef } from 'react';
import { X, ArrowRight, Clock, Users } from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import type { Program } from '@/lib/types';

interface Props {
  tag: string | null;
  programs: Program[];
  onClose: () => void;
}

export function TagProgramModal({ tag, programs, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (tag) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [tag]);

  if (!tag) return null;

  // Filter programs: match tag + title + description (case-insensitive)
  const keyword = tag.toLowerCase();
  const matched = programs.filter((p) =>
    p.tags.some((t) => t.toLowerCase().includes(keyword)) ||
    p.title.toLowerCase().includes(keyword) ||
    p.description?.toLowerCase().includes(keyword)
  );

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Kelas terkait: ${tag}`}
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      style={{ animation: 'fadeInOverlay 0.15s ease-out' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: 'slideUpModal 0.2s ease-out' }}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-5 bg-linear-to-r from-[#162058] to-[#1B3A8C]">
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Kelas & Pelatihan</p>
            <h2 className="text-white font-black text-xl leading-tight">{tag}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup popup"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: scrollable */}
        <div className="overflow-y-auto flex-1 p-5 space-y-3">
          {matched.length > 0 ? (
            matched.map((p) => {
              const discount = p.original_price
                ? Math.round((1 - p.price / p.original_price) * 100)
                : null;
              return (
                <a
                  key={p.id}
                  href={`/program/${p.slug}`}
                  className="flex gap-4 items-start bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-[#2348A8] rounded-2xl p-4 transition-all group"
                >
                  {/* Color swatch */}
                  <div
                    className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-black text-white/30 text-lg select-none"
                    style={{ backgroundColor: p.thumbnail_color ?? '#1B3A8C' }}
                  >
                    AJI
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Type badge */}
                    <span className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 inline-block',
                      p.type === 'bootcamp' ? 'bg-[#1B3A8C] text-white' :
                      p.type === 'short-class' ? 'bg-[#F0A500] text-[#162058]' :
                      'bg-[#0d1632] text-white'
                    )}>
                      {p.type === 'bootcamp' ? 'Bootcamp' : p.type === 'short-class' ? 'Short Class' : 'Private Class'}
                    </span>
                    <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-[#2348A8] transition-colors">
                      {p.title}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {p.duration && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" /> {p.duration}
                        </span>
                      )}
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Users className="w-3 h-3" /> Aji Pamoso, S.Si, M.T
                        </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[#1B3A8C] font-black text-sm">{formatPrice(p.price)}</p>
                    {discount && (
                      <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                        -{discount}%
                      </span>
                    )}
                    <div className="mt-1.5 text-[#2348A8] flex items-center gap-0.5 text-xs font-semibold group-hover:gap-1.5 transition-all justify-end">
                      Lihat <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="text-center py-14">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <p className="font-bold text-gray-700 mb-1">Kelas belum tersedia</p>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                Kelas untuk topik <span className="font-semibold text-[#2348A8]">"{tag}"</span> sedang kami siapkan.
                Hubungi kami untuk info lebih lanjut!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400 text-center">
            Menampilkan {matched.length} kelas · Klik kartu untuk detail lengkap
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUpModal { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}
