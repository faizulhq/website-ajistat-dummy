/**
 * Server Component wrapper untuk /program/[slug]
 *
 * generateStaticParams dipanggil saat `npm run build`.
 * Sekarang OTOMATIS: mengambil semua slug langsung dari Backend API,
 * bukan lagi hardcode manual. Tambah program baru di Django Admin
 * → jalankan `npm run build` → halaman baru terbuat otomatis!
 */
import type { Metadata } from 'next';
import ProgramDetailClient from './program-detail-client';

// ─── SEO: Metadata dinamis per program ───────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api' : 'https://api.aji-institute.com/api';
    const res = await fetch(`${baseUrl}/programs/${slug}/`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
    });
    if (res.ok) {
      const program = await res.json();
      return {
        title: program.title,
        description: program.description?.slice(0, 160) || `Detail program ${program.title} di Aji Institute.`,
        openGraph: {
          title: `${program.title} | Aji Institute`,
          description: program.description?.slice(0, 160),
          type: 'website',
        },
      };
    }
  } catch {
    // Fallback jika API tidak bisa dijangkau saat build
  }

  // Fallback metadata dari slug
  const readableTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: readableTitle,
    description: `Informasi lengkap program ${readableTitle} di Aji Institute.`,
  };
}



// Slug cadangan jika API tidak bisa dijangkau saat build (misal: offline)
const FALLBACK_SLUGS = [
  'bootcamp-analisis-spss', 'bootcamp-smartpls', 'bootcamp-rstudio',
  'private-analisis-spss', 'private-smartpls', 'private-rstudio', 'private-python-data',
  'short-uji-instrumen-spss', 'short-regresi-spss', 'short-visualisasi-python',
  'short-penulisan-artikel', 'short-statistika-dasar', 'bootcamp-ajibiz-business-plan',
  'short-ajibiz-digital-marketing', 'bootcamp-ajicomm-corpcomm', 'short-ajicomm-press-release',
  'bootcamp-ajiai-mern', 'short-ajiai-uiux', 'bootcamp-ajilinguage-toefl',
  'private-ajilinguage-academic',
];

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api' : 'https://api.aji-institute.com/api';
    const res = await fetch(`${baseUrl}/programs/slugs/`, {
      // Jangan cache: kita ingin data terbaru setiap kali build
      cache: 'no-store',
      // Timeout 10 detik agar build tidak hang jika server lambat
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const json: { slugs: string[] } = await res.json();
    const slugs = json.slugs ?? [];

    if (slugs.length === 0) throw new Error('API returned empty slugs');

    console.log(`✅ generateStaticParams: ${slugs.length} program slug(s) fetched from API`);
    return slugs.map((slug) => ({ slug }));

  } catch (err) {
    console.warn('⚠️  generateStaticParams: gagal fetch dari API, pakai fallback statis.', err);
    return FALLBACK_SLUGS.map((slug) => ({ slug }));
  }
}

export default function ProgramDetailPage() {
  return <ProgramDetailClient />;
}
