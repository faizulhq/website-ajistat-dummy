import { notFound } from 'next/navigation';
import { fetchProgram, fetchAllSlugs } from '@/lib/api';
import { ALL_PROGRAMS } from '@/lib/config';
import ProgramDetailClient from './program-detail-client';
import type { ApiProgram } from '@/lib/types';

// Selalu return slug — kombinasi API + static agar tidak pernah return []
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

  // Coba API dulu (max 8 detik karena ada timeout di fetchWithTimeout)
  let program: ApiProgram | null = await fetchProgram(slug);

  // Fallback ke static config jika API tidak ada datanya
  if (!program) {
    const staticData = ALL_PROGRAMS.find((p) => p.slug === slug);
    if (staticData) {
      program = {
        id: staticData.id,
        title: staticData.title,
        slug: staticData.slug,
        type: staticData.type as ApiProgram['type'],
        description: staticData.description,
        price: staticData.price,
        original_price: staticData.originalPrice ?? null,
        status: (staticData.status as ApiProgram['status']) ?? 'upcoming',
        tags: staticData.tags,
        curriculum: staticData.curriculum ?? [],
        facilitator_name: staticData.facilitator ?? '',
        facilitator_title: '',
        facilitator_bio: staticData.facilitatorBio ?? '',
        facilitator_avatar: '',
        demo_video_url: staticData.previewVideo ?? '',
        thumbnail_color: '#162660',
        brand: 'ajistat',
        duration: staticData.duration ?? '',
        schedule: '',
        is_featured: false,
      } as ApiProgram;
    }
  }

  if (!program) notFound();

  return <ProgramDetailClient program={program!} />;
}
