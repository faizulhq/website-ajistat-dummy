import Link from 'next/link';
import { fetchPrograms } from '@/lib/api';
import { BOOTCAMP_PROGRAMS } from '@/lib/config';
import type { ApiProgram } from '@/lib/types';
import { STATUS_LABEL, STATUS_COLOR } from '@/lib/types';

function formatPrice(p: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
  }).format(p);
}

function ProgramCard({ p }: { p: ApiProgram }) {
  const discount = p.original_price
    ? Math.round((1 - p.price / p.original_price) * 100)
    : null;
  return (
    <Link href={`/program/${p.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="h-32 relative flex items-center justify-center"
        style={{ backgroundColor: p.thumbnail_color || '#162058' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="relative text-center px-4">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Bootcamp Intensif</p>
          <p className="text-white font-black text-lg leading-tight line-clamp-2 mt-1">{p.title}</p>
        </div>
        {p.is_featured && (
          <span className="absolute top-3 left-3 text-[10px] font-black bg-[#F0A500] text-[#162058] px-2 py-0.5 rounded-full">
            Unggulan
          </span>
        )}
        <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLOR[p.status]}`}>
          {STATUS_LABEL[p.status]}
        </span>
      </div>
      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-semibold bg-[#162058]/8 text-[#162058] px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
        <p className="text-gray-500 text-xs mb-1">Durasi: <span className="text-gray-700 font-medium">{p.duration}</span></p>
        <p className="text-gray-500 text-xs mb-4">Fasilitator: <span className="text-gray-700 font-medium">{p.facilitator_name}</span></p>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <p className="text-[#162058] font-black text-lg">{formatPrice(p.price)}</p>
            {discount && <span className="text-xs text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">-{discount}%</span>}
          </div>
          {p.original_price && (
            <p className="text-gray-300 text-xs line-through mb-3">{formatPrice(p.original_price)}</p>
          )}
          <span className="block w-full text-center bg-[#162058] group-hover:bg-[#2348A8] text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
            Lihat Detail
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BootcampPage() {
  // Fetch dari API, fallback ke static
  let programs: ApiProgram[] = await fetchPrograms({ type: 'bootcamp' });

  // Jika API tidak tersedia saat build, pakai data statis sebagai fallback
  if (programs.length === 0) {
    programs = BOOTCAMP_PROGRAMS.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      type: 'bootcamp' as const,
      status: 'upcoming' as const,
      price: p.price,
      original_price: p.originalPrice,
      tags: p.tags,
      duration: p.duration,
      schedule: p.status ?? 'Akan Datang',
      facilitator_name: p.facilitator,
      facilitator_bio: p.facilitatorBio,
      thumbnail_color: '#162058',
      is_featured: false,
      description: p.description,
      curriculum: p.curriculum,
    }));
  }

  return (
    <>
      {/* HERO */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="flex gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/80">Bootcamp</span>
          </nav>
          <span className="inline-block text-xs font-bold text-[#F0A500] bg-[#F0A500]/10 border border-[#F0A500]/30 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Program Intensif AjiStat
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Bootcamp Statistik
          </h1>
          <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
            Program pelatihan intensif 3–5 hari. Kuasai satu software atau metode analisis data secara mendalam — dari teori hingga praktik nyata.
          </p>
        </div>
      </div>

      {/* PROGRAM LIST */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {programs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-semibold mb-2">Belum ada program tersedia</p>
              <p className="text-sm">Segera hadir — pantau terus atau hubungi kami via WhatsApp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => <ProgramCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
