'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft, Clock, Calendar, User, CheckCircle, Play,
  ShoppingCart, Star, Target, BookOpen, Trophy, MessageCircle,
  Zap, Users, Layers, GraduationCap
} from 'lucide-react';
import { programsApi, cartApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { formatPrice, STATUS_LABELS, STATUS_COLORS, cn } from '@/lib/utils';
import type { Program } from '@/lib/types';

interface Props { params: Promise<{ slug: string }> }

const TYPE_LABEL: Record<string, string> = {
  bootcamp: '🎓 Bootcamp Intensif',
  'short-class': '⚡ Short Class',
  'private-class': '🎯 Private Class',
};

// Fallback "what you'll learn" points when curriculum is empty
const DEFAULT_LEARN_POINTS = [
  'Memahami konsep dasar dan teori yang relevan',
  'Praktik langsung dengan data riset nyata',
  'Menginterpreasikan hasil analisis secara akademis',
  'Menyusun laporan & visualisasi yang profesional',
  'Trouble-shooting error yang umum ditemui',
  'Mengaplikasikan ilmu langsung ke penelitian Anda',
];

export default function ProgramDetailPage({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const qc = useQueryClient();

  const { data: program, isLoading, isError } = useQuery<Program>({
    queryKey: ['program', slug],
    queryFn: () => programsApi.detail(slug).then((r) => r.data),
  });

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get().then((r) => r.data),
    enabled: isAuthenticated(),
  });

  const inCart = cart?.items?.some((i: { program: { id: number } }) => i.program.id === program?.id) ?? false;

  const addMutation = useMutation({
    mutationFn: () => cartApi.add(program!.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });

  const handleAddToCart = () => {
    if (!isAuthenticated()) { router.push('/login'); return; }
    if (!inCart) addMutation.mutate();
    else router.push('/cart');
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Halo AJI, saya tertarik mendaftar program: *${program?.title}*. Mohon info lebih lanjut.`);
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
  };

  if (isLoading) return (
    <div className="max-w-5xl mx-auto px-4 py-24 space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`h-${i === 0 ? 12 : 8} bg-gray-100 rounded-xl animate-pulse`} />
      ))}
    </div>
  );

  if (isError || !program) return (
    <div className="flex flex-col items-center justify-center py-32 text-gray-400">
      <p className="text-5xl mb-4">😕</p>
      <p className="font-medium text-gray-500 mb-1">Program tidak ditemukan</p>
      <button onClick={() => router.back()} className="mt-4 text-sm text-[#2568B5] hover:underline">← Kembali</button>
    </div>
  );

  const discount = program.original_price
    ? Math.round((1 - program.price / program.original_price) * 100)
    : null;

  const learnPoints = (program.curriculum && program.curriculum.length >= 4)
    ? program.curriculum.slice(0, 6)
    : DEFAULT_LEARN_POINTS;

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ─── HERO ─── */}
      <div className="bg-gradient-to-br from-[#0C1A45] via-[#162660] to-[#1a3a8a] py-16 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4FA8D8] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F0A500] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Kembali ke Katalog
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="bg-[#F0A500] text-[#0C1A45] text-xs font-bold px-3 py-1.5 rounded-full">
              {TYPE_LABEL[program.type] ?? program.type}
            </span>
            <span className={cn('text-xs font-bold px-3 py-1.5 rounded-full', STATUS_COLORS[program.status])}>
              {STATUS_LABELS[program.status]}
            </span>
            {program.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="bg-white/10 border border-white/20 text-white/70 text-xs px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-[2rem] font-bold text-white mb-5 max-w-3xl leading-snug">
            {program.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-5 text-white/60 text-sm">
            {program.duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#4FA8D8]" />{program.duration}
              </span>
            )}
            {program.schedule && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#4FA8D8]" />{program.schedule}
              </span>
            )}
            {program.facilitator_name && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#4FA8D8]" />{program.facilitator_name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ─── CONTENT + SIDEBAR ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Main Content ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Video Demo */}
            {program.demo_video_url && (
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#2568B5]" />
                  <h2 className="font-semibold text-gray-900">Video Preview Program</h2>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={program.demo_video_url}
                    title="Video Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Apa yang Akan Dipelajari — Grid */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#2568B5]" />
                </div>
                <h2 className="font-semibold text-gray-900 text-lg">Apa yang Akan Anda Pelajari</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {learnPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-blue-50/60 rounded-xl p-3 border border-blue-100/60">
                    <CheckCircle className="w-4 h-4 text-[#2568B5] shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deskripsi */}
            {program.description && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Layers className="w-4 h-4 text-purple-600" />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-lg">Deskripsi Program</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>
            )}

            {/* Kurikulum */}
            {program.curriculum && program.curriculum.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-lg">Kurikulum Lengkap</h2>
                </div>
                <div className="space-y-2.5">
                  {program.curriculum.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                      <div className="w-7 h-7 rounded-lg bg-[#162660] flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Untuk Siapa */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-600" />
                </div>
                <h2 className="font-semibold text-gray-900 text-lg">Program Ini Untuk Siapa?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: '🎓', text: 'Mahasiswa S1–S3 yang sedang mengerjakan skripsi, tesis, atau disertasi' },
                  { icon: '🔬', text: 'Peneliti dan dosen yang ingin meningkatkan kompetensi analisis data' },
                  { icon: '💼', text: 'Praktisi dan profesional yang membutuhkan skill riset untuk karir' },
                  { icon: '📊', text: 'Siapa saja yang ingin menguasai tools statistik & metodologi penelitian' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/70 transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Yang Akan Anda Dapatkan */}
            <div className="bg-gradient-to-br from-[#0C1A45] to-[#1e4fa0] rounded-2xl p-6 border border-blue-800/50">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-[#F0A500]" />
                </div>
                <h2 className="font-semibold text-white text-lg">Yang Akan Anda Dapatkan</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: '🏆', label: 'Sertifikat Kelulusan', desc: 'Sertifikat resmi dari AJI yang dapat digunakan untuk portofolio' },
                  { icon: '📹', label: 'Rekaman Full Sesi', desc: 'Akses rekaman seumur hidup untuk direview kapan saja' },
                  { icon: '📦', label: 'Dataset & Template', desc: 'Dataset latihan dan template laporan siap pakai' },
                  { icon: '💬', label: 'Grup Diskusi', desc: 'Akses grup komunitas alumni untuk tanya jawab lanjutan' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fasilitator */}
            {program.facilitator_name && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-lg">Profil Fasilitator</h2>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#162660] to-[#4FA8D8] flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {program.facilitator_avatar || program.facilitator_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">{program.facilitator_name}</p>
                    {program.facilitator_title && (
                      <p className="text-[#2568B5] text-sm mb-2.5">{program.facilitator_title}</p>
                    )}
                    {program.facilitator_bio && (
                      <p className="text-gray-500 text-sm leading-relaxed">{program.facilitator_bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Testimoni */}
            {program.testimonials && program.testimonials.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-lg">Ulasan Peserta</h2>
                </div>
                <div className="space-y-4">
                  {program.testimonials.map((t) => (
                    <div key={t.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex gap-0.5 mb-2.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-3.5 h-3.5',
                              i < t.rating ? 'fill-[#F0A500] text-[#F0A500]' : 'fill-gray-200 text-gray-200'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm italic mb-3 leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2568B5] to-[#162660] flex items-center justify-center text-white text-xs font-bold">
                          {t.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{t.name}</p>
                          <p className="text-xs text-gray-400">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Sticky Purchase Card ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
              {/* Price header */}
              <div className="bg-gradient-to-br from-[#0C1A45] to-[#162660] px-6 py-5">
                {program.original_price && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-white/50 line-through">{formatPrice(program.original_price)}</span>
                    {discount && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
                    )}
                  </div>
                )}
                <p className="text-3xl font-bold text-white">{formatPrice(program.price)}</p>
                <p className="text-white/50 text-xs mt-1">Harga sudah termasuk semua materi & sertifikat</p>
              </div>

              <div className="p-6 space-y-3">
                {/* Cart Button */}
                <button
                  id="btn-add-to-cart"
                  onClick={handleAddToCart}
                  disabled={addMutation.isPending}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95',
                    inCart
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-[#162660] text-white hover:bg-[#2568B5]'
                  )}
                >
                  {inCart ? (
                    <><CheckCircle className="w-4 h-4" /> Lihat Keranjang</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4" /> {addMutation.isPending ? 'Menambahkan...' : 'Tambah ke Keranjang'}</>
                  )}
                </button>

                {/* WhatsApp Button */}
                <button
                  id="btn-whatsapp"
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe5b] transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanya via WhatsApp
                </button>

                {/* Checklist */}
                <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-500">
                  {[
                    { icon: Clock, text: program.duration ? `Durasi: ${program.duration}` : 'Durasi fleksibel' },
                    { icon: Calendar, text: program.schedule ? `Jadwal: ${program.schedule}` : 'Jadwal menyesuaikan' },
                    { icon: Zap, text: 'Rekaman sesi tersedia seumur hidup' },
                    { icon: Trophy, text: 'Sertifikat kelulusan resmi AJI' },
                    { icon: BookOpen, text: 'Materi & dataset disediakan lengkap' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-[#2568B5] shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs text-gray-400 pt-2">
                  🔒 Pembayaran aman & terenkripsi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
