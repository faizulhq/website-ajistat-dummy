import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Program } from '@/lib/types';

/**
 * Deteksi apakah program ini milik AjiStat.
 */
function isAjiStatProgram(tags: string[], brand?: string): boolean {
  if (brand === 'aji-institute') return false;
  const t = tags.map((s) => s.toLowerCase());
  const otherDivisions = ['ajibiz', 'ajicomm', 'ajiai', 'ajilingua'];
  return t.includes('ajistat') || !t.some((tag) => otherDivisions.includes(tag));
}

// Base API URL
const API =
  typeof window !== 'undefined' && process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : (process.env.NEXT_PUBLIC_API_URL || 'https://api.aji-institute.com');

interface Props {
  program: Program;
}

const TYPE_CONFIG = {
  'bootcamp': { label: 'Bootcamp', color: 'bg-[#1B3A8C] text-white' },
  'short-class': { label: 'Short Class', color: 'bg-[#F0A500] text-[#1B3A8C]' },
  'private-class': { label: 'Private Class', color: 'bg-[#2348A8] text-white' },
  'in-house-training': { label: 'In-House', color: 'bg-teal-600 text-white' }
};

export function PromoCard({ program }: Props) {
  const typeConf = TYPE_CONFIG[program.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG['bootcamp'];
  const discount = program.original_price
    ? Math.round((1 - program.price / program.original_price) * 100)
    : null;

  const isAjiStat = isAjiStatProgram(program.tags, program.brand);
  const cardHref = isAjiStat
    ? `https://ajistat.aji-institute.com/program/${program.slug}`
    : `/program/${program.slug}`;
  const isExternal = isAjiStat;

  const formatPrice = (price: number | string) => {
    const num = Number(price);
    if (num === 0 || isNaN(num)) return 'Hubungi Admin';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const cardClassName = "group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden";

  const cardContent = (
    <>
      {/* Gambar Flyer / Image Section */}
      <div className="relative aspect-video w-full bg-gray-100 overflow-hidden shrink-0 border-b border-gray-100">
        {program.image ? (
          <Image
            src={program.image.startsWith('http') ? program.image : `${API}${program.image}`}
            alt={program.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center p-6"
            style={{ background: `linear-gradient(135deg, ${program.thumbnail_color} 0%, ${program.thumbnail_color}bb 60%, #1B3A8C 100%)` }}
          >
            <span className="text-white/10 text-7xl font-black tracking-tighter select-none">AJI</span>
          </div>
        )}
        
        {/* Badges on top of image */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={cn('text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg uppercase tracking-wide', typeConf.color)}>
            {typeConf.label}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1 relative bg-white">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {program.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] bg-[#162058]/5 border border-[#162058]/10 text-[#162058] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-black text-gray-900 text-base leading-snug mb-4 group-hover:text-[#1B3A8C] transition-colors line-clamp-2">
          {program.title}
        </h3>

        {/* Meta Data Block */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100 mt-auto mb-4 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]">
          {program.schedule && (
            <div className="flex items-center gap-3 pb-2.5 border-b border-gray-100 mb-2.5">
              <div className="w-6 h-6 rounded-md bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5 text-[#1B3A8C]" />
              </div>
              <p className="font-semibold text-gray-700 text-xs leading-tight line-clamp-1" title={program.schedule}>
                {program.schedule}
              </p>
            </div>
          )}
          {program.duration && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#1B3A8C]" />
              </div>
              <span className="font-medium text-gray-600 text-xs">{program.duration}</span>
            </div>
          )}
        </div>

        {/* Price & CTA Button */}
        <div className="mt-1 flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-red-300" /> Harga
            </span>
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                {Number(program.price) === 0 ? (
                  <span className="text-[15px] font-black text-[#162058] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Hubungi Admin
                  </span>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#162058]">{formatPrice(program.price)}</span>
                      {discount && (
                        <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-md border border-red-100">
                          -{discount}%
                        </span>
                      )}
                    </div>
                    {program.original_price && (
                      <span className="text-[10px] text-gray-400 font-medium line-through">{formatPrice(program.original_price)}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Full width button below price */}
          <div className="w-full bg-gradient-to-r from-[#162058] to-[#162058] hover:from-[#1D2A74] hover:to-[#111A4D] text-[#F0A500] font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-[0_6px_16px_rgba(22,32,88,0.35)] hover:-translate-y-0.5 text-[18px]">
            Daftar <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={cardHref} target="_blank" rel="noopener noreferrer" className={cardClassName}>
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={cardHref} className={cardClassName}>
      {cardContent}
    </Link>
  );
}
