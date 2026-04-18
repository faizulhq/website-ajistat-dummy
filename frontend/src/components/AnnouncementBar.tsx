'use client';

/**
 * AnnouncementBar — Banner pengumuman FIXED di atas Navbar.
 * - Posisi: fixed top-0, z-index 60 (lebih tinggi dari navbar z-50)
 * - Saat tampil: set CSS variable --ann-h sehingga navbar & main bisa geser otomatis
 * - Saat dismiss: hapus CSS variable
 * Data diambil dari API /api/announcements/ (dikelola via Django Admin).
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Info, Tag, AlertTriangle } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'promo' | 'warning';
  cta_label: string;
  cta_url: string;
}

// Tinggi bar — fixed 40px agar mudah di-offset oleh navbar & main
const BAR_HEIGHT = '40px';

const TYPE_STYLES: Record<string, { bar: string; icon: React.ReactNode }> = {
  info: {
    bar: 'bg-[#1B3A8C] text-white',
    icon: <Info className="w-4 h-4 flex-shrink-0" />,
  },
  promo: {
    bar: 'bg-emerald-700 text-white',
    icon: <Tag className="w-4 h-4 flex-shrink-0" />,
  },
  warning: {
    bar: 'bg-amber-500 text-white',
    icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
  },
};

const API_BASE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api'
    : 'https://api.aji-institute.com/api';

export function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<number>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Baca dismissed IDs dari sessionStorage (reset tiap sesi browser)
    try {
      const stored = sessionStorage.getItem('dismissed_announcements');
      if (stored) setDismissedIds(new Set(JSON.parse(stored)));
    } catch {}

    fetch(`${API_BASE}/announcements/`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        setAnnouncements(json.data ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const visible = announcements.filter((a) => !dismissedIds.has(a.id));

  // ── Sync CSS variable ke root ─────────────────────────────────────────────
  useEffect(() => {
    if (loaded && visible.length > 0) {
      document.documentElement.style.setProperty('--ann-h', BAR_HEIGHT);
    } else {
      document.documentElement.style.removeProperty('--ann-h');
    }
  }, [loaded, visible.length]);

  if (!loaded || visible.length === 0) return null;

  const ann = visible[0];
  const style = TYPE_STYLES[ann.type] ?? TYPE_STYLES.info;

  const dismiss = (id: number) => {
    setDismissedIds((prev) => {
      const next = new Set(prev).add(id);
      try {
        sessionStorage.setItem('dismissed_announcements', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  return (
    <div
      id={`announcement-bar-${ann.id}`}
      className={`${style.bar} text-sm font-medium fixed top-0 inset-x-0 z-[60]`}
      style={{ height: BAR_HEIGHT }}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {style.icon}
          <span className="truncate">
            <span className="font-semibold">{ann.title}</span>
            {ann.message && (
              <span className="opacity-90 ml-1.5 hidden sm:inline">— {ann.message}</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {ann.cta_label && ann.cta_url && (
            <Link
              href={ann.cta_url}
              target={ann.cta_url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-semibold transition-colors whitespace-nowrap"
            >
              {ann.cta_label} →
            </Link>
          )}
          <button
            onClick={() => dismiss(ann.id)}
            aria-label="Tutup pengumuman"
            className="opacity-70 hover:opacity-100 transition-opacity p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
