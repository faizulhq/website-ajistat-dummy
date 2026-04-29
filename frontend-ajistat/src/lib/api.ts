import type { ApiProgram } from './types';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.aji-institute.com';

// Filter program yang termasuk divisi AjiStat
const AJISTAT_FILTER = (p: ApiProgram) =>
  !p.tags.some((t) =>
    ['ajibiz', 'ajicomm', 'ajiai', 'ajilingua'].includes(t.toLowerCase())
  );

/** Fetch dengan timeout (default 8 detik) agar build tidak hang */
async function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal, next: { revalidate: false } });
  } finally {
    clearTimeout(timer);
  }
}

// ─── Fetch list program ────────────────────────────────────────────────────────
export async function fetchPrograms(params?: {
  type?: string;
}): Promise<ApiProgram[]> {
  try {
    const url = new URL(`${API_BASE}/api/programs/`);
    if (params?.type) url.searchParams.set('type', params.type);

    const res = await fetchWithTimeout(url.toString());
    if (!res.ok) return [];

    const json = await res.json();
    const list: ApiProgram[] = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    return list.filter(AJISTAT_FILTER);
  } catch {
    return [];
  }
}

// ─── Fetch satu program by slug ────────────────────────────────────────────────
export async function fetchProgram(slug: string): Promise<ApiProgram | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/programs/${slug}/`);
    if (!res.ok) return null;
    return res.json() as Promise<ApiProgram>;
  } catch {
    return null;
  }
}

// ─── Fetch semua slug (untuk generateStaticParams) ────────────────────────────
export async function fetchAllSlugs(): Promise<string[]> {
  const programs = await fetchPrograms();
  return programs.map((p) => p.slug);
}
