'use client';

import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Users } from 'lucide-react';
import { formatPrice, STATUS_LABELS, STATUS_COLORS, cn } from '@/lib/utils';
import type { Program } from '@/lib/types';

interface Props { program: Program; }

const TYPE_CONFIG = {
  'bootcamp': { label: 'Bootcamp Intensif', color: 'bg-[#162660] text-white', icon: '🎓' },
  'short-class': { label: 'Short Class', color: 'bg-[#F0A500] text-[#0C1A45]', icon: '⚡' },
  'private-class': { label: 'Private Class', color: 'bg-purple-700 text-white', icon: '🎯' },
};

export function ProgramCard({ program }: Props) {
  const typeConf = TYPE_CONFIG[program.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG['bootcamp'];
  const discount = program.original_price
    ? Math.round((1 - program.price / program.original_price) * 100)
    : null;

  return (
    <Link
      href={`/program/${program.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
    >
      {/* Color Banner */}
      <div
        className="relative h-36 flex items-end justify-between px-5 pb-4"
        style={{ background: `linear-gradient(135deg, ${program.thumbnail_color} 0%, ${program.thumbnail_color}bb 60%, #1e4fa0 100%)` }}
      >
        {/* Decorative AJI watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/10 text-8xl font-black select-none tracking-tighter">AJI</span>
        </div>

        <div className="relative flex items-center gap-2">
          <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', typeConf.color)}>
            {typeConf.icon} {typeConf.label}
          </span>
        </div>

        <div className="relative">
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', STATUS_COLORS[program.status])}>
            {STATUS_LABELS[program.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {program.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-blue-50 text-[#2568B5] font-medium px-2 py-0.5 rounded-full border border-blue-100">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#2568B5] transition-colors">
          {program.title}
        </h3>

        {/* Short Description */}
        {program.description && (
          <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
            {program.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-col gap-1.5 mb-4 mt-auto">
          {program.duration && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 text-[#2568B5] shrink-0" />
              <span>{program.duration}</span>
            </div>
          )}
          {program.schedule && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5 text-[#2568B5] shrink-0" />
              <span>{program.schedule}</span>
            </div>
          )}
          {program.facilitator_name && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5 text-[#2568B5] shrink-0" />
              <span>{program.facilitator_name}</span>
            </div>
          )}
        </div>

        {/* Price + CTA */}
        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
          <div>
            {program.original_price && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(program.original_price)}</p>
            )}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#162660]">{formatPrice(program.price)}</span>
              {discount && (
                <span className="bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded">-{discount}%</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-[#2568B5] group-hover:gap-2 transition-all">
            Lihat <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
