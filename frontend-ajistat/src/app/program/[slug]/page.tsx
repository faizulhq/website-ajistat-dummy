import { notFound } from 'next/navigation';
import { ALL_PROGRAMS, getProgramBySlug } from '@/lib/config';
import ProgramDetailClient from './program-detail-client';

export async function generateStaticParams() {
  return ALL_PROGRAMS.map((p) => ({ slug: p.slug }));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();
  return <ProgramDetailClient program={program} />;
}
