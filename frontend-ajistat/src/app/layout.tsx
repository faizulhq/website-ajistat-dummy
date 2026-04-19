import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'AjiStat — Konsultasi & Olah Data Statistik Profesional',
  description:
    'AjiStat by Aji Institute: layanan konsultasi statistik, olah data penelitian, kelas privat, dan bootcamp untuk mahasiswa, peneliti, dosen, dan perusahaan. SPSS, SmartPLS, NVivo, R, Python.',
  keywords: 'konsultasi statistik, olah data, SPSS, SmartPLS, NVivo, SEM, skripsi, tesis, disertasi, AjiStat, Aji Institute',
  openGraph: {
    title: 'AjiStat — Konsultasi & Olah Data Statistik Profesional',
    description: 'Mitra riset terpercaya untuk 5.000+ klien akademik dan profesional.',
    url: 'https://ajistat.aji-institute.com',
    siteName: 'AjiStat',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
