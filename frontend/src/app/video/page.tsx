'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Play, Volume2, VolumeX, ExternalLink,
  Video as VideoIcon, ChevronRight, Search, X, Maximize, Minimize
} from 'lucide-react';
import { programsApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { Program } from '@/lib/types';

const BRAND_LABELS: Record<string, string> = {
  'aji-institute': 'Aji Institute',
  ajistat: 'AjiStat',
  ajibiz: 'AjiBiz',
  ajicomm: 'AjiComm',
  ajiai: 'AjiAI',
  ajilingua: 'AjiLingua',
};

const BRAND_COLORS: Record<string, string> = {
  'aji-institute': '#162058',
  ajistat: '#1B3A8C',
  ajibiz: '#0f6b2f',
  ajicomm: '#7c2d8a',
  ajiai: '#b45309',
  ajilingua: '#0369a1',
};

const TYPE_LABELS: Record<string, string> = {
  bootcamp: 'Bootcamp',
  'short-class': 'Short Class',
  'private-class': 'Private Class',
  'in-house-training': 'In-House Training',
};

// Inline YouTube logo SVG (lucide-react versi lama tidak punya Youtube icon)
function YoutubeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function getYoutubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.includes('/shorts/')) return u.pathname.split('/shorts/')[1].split('?')[0];
      return u.searchParams.get('v');
    }
  } catch { /* invalid URL */ }
  return null;
}

function getYoutubeThumbnail(url: string): string {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}

function resolveVideoUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return url;
}

function getVideosFromProgram(p: Program): { url: string; isYoutube: boolean; thumbnail?: string }[] {
  const videos: { url: string; isYoutube: boolean; thumbnail?: string }[] = [];
  if (p.youtube_url) videos.push({ url: p.youtube_url, isYoutube: true, thumbnail: getYoutubeThumbnail(p.youtube_url) });
  if (p.youtube_url_2) videos.push({ url: p.youtube_url_2, isYoutube: true, thumbnail: getYoutubeThumbnail(p.youtube_url_2) });
  if (p.demo_video_url) videos.push({ url: resolveVideoUrl(p.demo_video_url), isYoutube: false });
  return videos;
}

interface VideoEntry {
  program: Program;
  url: string;
  isYoutube: boolean;
  thumbnail?: string;
}

// ─── Hero Video Player ────────────────────────────────────────────
function HeroVideo({ entry }: { entry: VideoEntry }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
    setPlaying(true);
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  if (entry.isYoutube) {
    const id = getYoutubeId(entry.url);
    return (
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=1&loop=1&playlist=${id}&rel=0`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group">
      <video
        ref={videoRef}
        src={entry.url}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Play/pause center (hover only) */}
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label={playing ? 'Pause video' : 'Play video'}
      >
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
          {playing
            ? <span className="flex gap-1.5"><span className="w-1.5 h-5 bg-white rounded-sm" /><span className="w-1.5 h-5 bg-white rounded-sm" /></span>
            : <Play className="w-6 h-6 text-white fill-white ml-1" />
          }
        </div>
      </button>

      {/* Bottom info + controls */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 bg-[#F0A500] text-[#162058] text-[10px] font-black px-2.5 py-1 rounded-full mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#162058] animate-pulse" />
            VIDEO UNGGULAN
          </span>
          <p className="text-white font-bold text-lg drop-shadow-lg leading-snug line-clamp-2">
            {entry.program.title}
          </p>
          <p className="text-white/60 text-xs mt-1">{TYPE_LABELS[entry.program.type]}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className="w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            title={muted ? 'Aktifkan suara' : 'Matikan suara'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            title={isFullscreen ? 'Keluar layar penuh' : 'Layar penuh'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
          <Link
            href={`/program/${entry.program.slug}`}
            className="flex items-center gap-1.5 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold text-xs px-4 py-2 rounded-full transition-colors"
          >
            Info Program <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Video Card ────────────────────────────────────────────────────
function VideoCard({ entry }: { entry: VideoEntry }) {
  const brandColor = BRAND_COLORS[entry.program.brand ?? 'aji-institute'] ?? '#162058';
  const brandLabel = BRAND_LABELS[entry.program.brand ?? 'aji-institute'] ?? 'Aji Institute';

  const handleOpen = () => {
    window.open(entry.isYoutube ? entry.url : entry.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleOpen}
      className="group text-left bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {entry.isYoutube && entry.thumbnail ? (
          <img
            src={entry.thumbnail}
            alt={entry.program.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const id = getYoutubeId(entry.url);
              if (id) (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
            }}
          />
        ) : (
          <video
            src={entry.url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            preload="metadata"
          />
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            {entry.isYoutube
              ? <YoutubeLogo className="w-5 h-5 text-red-600" />
              : <Play className="w-5 h-5 text-[#162058] fill-[#162058] ml-0.5" />
            }
          </div>
        </div>

        {/* Brand badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full"
            style={{ backgroundColor: brandColor }}
          >
            {brandLabel}
          </span>
        </div>

        {entry.isYoutube && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
              <YoutubeLogo className="w-2.5 h-2.5" /> YouTube
            </span>
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="p-4">
        <p className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#162058] transition-colors">
          {entry.program.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{TYPE_LABELS[entry.program.type]}</span>
          <span className="flex items-center gap-1 text-[#2348A8] text-xs font-semibold">
            Tonton <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </button>
  );
}

// ─── Main Export ─────────────────────────────────────────────────
export default function VideoPage() {
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['programs-all-video'],
    queryFn: () => programsApi.list({}).then((r) => r.data.data as Program[]),
  });

  const allVideoEntries: VideoEntry[] = (data ?? []).flatMap((program) =>
    getVideosFromProgram(program).map((v) => ({ program, ...v }))
  );

  // Hero: ambil dari program yang is_video_hero=true di admin (lokal MP4 diutamakan)
  const heroEntry =
    allVideoEntries.find((e) => e.program.is_video_hero && !e.isYoutube) ??
    allVideoEntries.find((e) => e.program.is_video_hero) ??
    allVideoEntries.find((e) => !e.isYoutube) ??
    allVideoEntries[0] ??
    null;

  const availableBrands = Array.from(
    new Set(allVideoEntries.map((e) => e.program.brand ?? 'aji-institute'))
  );

  const filtered = allVideoEntries.filter((e) => {
    const matchBrand = activeBrand === 'all' || e.program.brand === activeBrand;
    const matchSearch = search === '' || e.program.title.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  const gridEntries = filtered.filter(
    (e) => !(heroEntry && e.url === heroEntry.url && e.program.id === heroEntry.program.id)
  );

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* ── HEADER ── */}
      <div className="bg-[#162058] pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">Video</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#F0A500]/20 rounded-xl flex items-center justify-center">
              <VideoIcon className="w-5 h-5 text-[#F0A500]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Video Pelatihan</h1>
          </div>
          <p className="text-white/60 text-sm max-w-xl">
            Kumpulan video dan rekaman sesi pelatihan Aji Institute — statistika, riset, dan pengembangan akademik.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── HERO VIDEO ── */}
        {isLoading ? (
          <div className="w-full aspect-video bg-gray-200 rounded-2xl animate-pulse mb-10" />
        ) : heroEntry ? (
          <div className="mb-12">
            <p className="text-xs font-bold text-[#2348A8] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F0A500] animate-pulse inline-block" />
              Video Unggulan
            </p>
            <HeroVideo entry={heroEntry} />
          </div>
        ) : null}

        {/* ── FILTER & SEARCH ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            {(['all', ...availableBrands] as string[]).map((brand) => (
              <button
                key={brand}
                id={`filter-${brand}`}
                onClick={() => setActiveBrand(brand)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold border transition-all',
                  activeBrand === brand
                    ? 'text-white border-transparent shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                )}
                style={
                  activeBrand === brand
                    ? { backgroundColor: brand === 'all' ? '#162058' : BRAND_COLORS[brand] ?? '#162058', borderColor: 'transparent' }
                    : {}
                }
              >
                {brand === 'all' ? 'Semua' : (BRAND_LABELS[brand] ?? brand)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="video-search"
              type="text"
              placeholder="Cari video..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-full bg-white focus:outline-none focus:border-[#162058] focus:ring-2 focus:ring-[#162058]/10 w-full sm:w-52 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── VIDEO GRID ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl aspect-video animate-pulse" />
            ))}
          </div>
        ) : gridEntries.length > 0 ? (
          <>
            <p className="text-sm text-gray-400 mb-5">{gridEntries.length} video ditemukan</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridEntries.map((entry, i) => (
                <VideoCard key={`${entry.program.id}-${i}`} entry={entry} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <VideoIcon className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-600 font-semibold mb-1">Belum ada video</p>
            <p className="text-gray-400 text-sm">
              {search ? `Tidak ada video untuk "${search}"` : 'Belum ada video untuk kategori ini.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
