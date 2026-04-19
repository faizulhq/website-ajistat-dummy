// AjiStat — Divisi Statistik & Riset Aji Institute
export const BRAND = {
  name: 'AjiStat',
  fullName: 'AjiStat by Aji Institute',
  tagline: 'Konsultasi & Olah Data Statistik Profesional',
  parent: 'Aji Institute',
  legalName: 'PT. Amanah Jñāna Insani',
};

export const CONTACT = {
  whatsapp: '6285195564668',
  whatsappDisplay: '+62 851-9556-4668',
  email: 'info@aji-institute.id',
  address: 'Kompleks Bandung Indah Raya Blok C7 No.1, Bandung',
};

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.aji-institute.com';

export function WA_LINK(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}
