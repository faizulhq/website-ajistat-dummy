import { notFound } from 'next/navigation';
import { fetchProgram, fetchAllSlugs } from '@/lib/api';
import { ALL_PROGRAMS } from '@/lib/config';
import ProgramDetailClient from './program-detail-client';

// Kombinasi slug dari API + static fallback
export async function generateStaticParams() {
  const apiSlugs = await fetchAllSlugs();
  const staticSlugs = ALL_PROGRAMS.map((p) => p.slug);
  const allSlugs = Array.from(new Set([...apiSlugs, ...staticSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Coba ambil dari API dulu
  const program = await fetchProgram(slug);
  if (!program) notFound();

  return <ProgramDetailClient program={program} />;
}
