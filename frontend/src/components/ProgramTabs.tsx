'use client';

/**
 * Shared ProgramTabs component — Ant Design Tabs + ProgramCard grid
 * Digunakan di halaman program (ajistat, ajibiz, dll.) dan halaman layanan (bootcamp, short-class, dll.)
 *
 * Mode "byFormat": tab = Bootcamp | Short Class | Private Class | In-House Training
 *   → cards di-filter per format layanan
 *
 * Mode "byProgram": tab = AjiStat | AjiBiz | AjiComm | AjiAI | AjiLingua
 *   → cards di-filter per program divisi
 */

import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { ConfigProvider, Tabs } from 'antd';
import type { Program } from '@/lib/types';
import { WA_LINK } from '@/lib/config';

type Mode = 'byFormat' | 'byProgram';

interface ProgramTabsProps {
  mode: Mode;
  /** For mode=byFormat: filter only this program's cards (e.g., only ajistat cards) */
  programFilter?: (p: Program) => boolean;
  /** For mode=byProgram: filter only this format type (e.g., only bootcamp) */
  formatFilter?: string; // e.g. 'bootcamp'
  queryKey: string;
}

const FORMAT_TABS = [
  { key: 'bootcamp', label: 'Bootcamp', type: 'bootcamp' },
  { key: 'short-class', label: 'Short Class', type: 'short-class' },
  { key: 'private-class', label: 'Private Class', type: 'private-class' },
  { key: 'in-house', label: 'In-House Training', type: 'in-house-training' },
];

const PROGRAM_TABS = [
  { key: 'ajistat', label: 'AjiStat', filter: (p: Program) => !p.tags.some((t) => ['ajibiz','ajicomm','ajiai','ajilingua'].includes(t.toLowerCase())) },
  { key: 'ajibiz', label: 'AjiBiz', filter: (p: Program) => p.tags.some((t) => t.toLowerCase() === 'ajibiz') },
  { key: 'ajicomm', label: 'AjiComm', filter: (p: Program) => p.tags.some((t) => t.toLowerCase() === 'ajicomm') },
  { key: 'ajiai', label: 'AjiAI', filter: (p: Program) => p.tags.some((t) => t.toLowerCase() === 'ajiai') },
  { key: 'ajilingua', label: 'AjiLingua', filter: (p: Program) => p.tags.some((t) => t.toLowerCase() === 'ajilingua') },
];

function EmptyState({ type, waMsg }: { type: string; waMsg: string }) {
  return (
    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
      <p className="text-4xl mb-4">🔔</p>
      <p className="font-bold text-gray-800 text-lg mb-2">Segera Hadir!</p>
      <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
        Layanan <strong>{type}</strong> sedang dipersiapkan. Hubungi kami untuk informasi jadwal berikutnya.
      </p>
      <a
        href={WA_LINK(waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#162058] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#1B3A8C] transition-colors"
      >
        💬 Tanya via WhatsApp
      </a>
    </div>
  );
}

function CardGrid({ programs, isLoading, emptyLabel, waMsg }: {
  programs: Program[];
  isLoading: boolean;
  emptyLabel: string;
  waMsg: string;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)}
      </div>
    );
  }
  if (programs.length === 0) {
    return <EmptyState type={emptyLabel} waMsg={waMsg} />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((p) => <ProgramCard key={p.id} program={p} />)}
    </div>
  );
}

export function ProgramTabsByFormat({ programFilter, queryKey }: {
  programFilter: (p: Program) => boolean;
  queryKey: string;
}) {
  const { data: raw, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => programsApi.list().then((r) => {
      const arr = r.data?.data ?? r.data;
      return (Array.isArray(arr) ? arr : []) as Program[];
    }),
  });

  const all = (raw ?? []).filter(programFilter);

  const items = FORMAT_TABS.map((tab) => {
    const filtered = all.filter((p) => p.type?.toLowerCase() === tab.type);
    return {
      key: tab.key,
      label: tab.label,
      children: (
        <div className="pt-8">
          <CardGrid
            programs={filtered}
            isLoading={isLoading}
            emptyLabel={tab.label.replace(/^.{2}/, '').trim()}
            waMsg={`Halo, saya ingin tahu jadwal ${tab.label.replace(/^.{2}/, '').trim()} berikutnya`}
          />
        </div>
      ),
    };
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: '#F0A500',
            itemActiveColor: '#162058',
            itemSelectedColor: '#162058',
            itemHoverColor: '#2348A8',
            titleFontSize: 14,
          },
        },
      }}
    >
      <Tabs defaultActiveKey="bootcamp" items={items} size="large" />
    </ConfigProvider>
  );
}

export function ProgramTabsByProgram({ formatFilter, queryKey }: {
  formatFilter: string;
  queryKey: string;
}) {
  const { data: raw, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => programsApi.list().then((r) => {
      const arr = r.data?.data ?? r.data;
      return (Array.isArray(arr) ? arr : []) as Program[];
    }),
  });

  const allByFormat = (raw ?? []).filter((p) => p.type?.toLowerCase() === formatFilter);

  const items = PROGRAM_TABS.map((tab) => {
    const filtered = allByFormat.filter(tab.filter);
    return {
      key: tab.key,
      label: tab.label,
      children: (
        <div className="pt-8">
          <CardGrid
            programs={filtered}
            isLoading={isLoading}
            emptyLabel={tab.label.replace(/^.{3}/, '').trim()}
            waMsg={`Halo, saya ingin tahu jadwal ${formatFilter} dari program ${tab.label.replace(/^.{3}/, '').trim()}`}
          />
        </div>
      ),
    };
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: '#F0A500',
            itemActiveColor: '#162058',
            itemSelectedColor: '#162058',
            itemHoverColor: '#2348A8',
            titleFontSize: 14,
          },
        },
      }}
    >
      <Tabs defaultActiveKey="ajistat" items={items} size="large" />
    </ConfigProvider>
  );
}
