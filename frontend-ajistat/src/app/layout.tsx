import type { Metadata } from 'next';
import { Open_Sans, Ubuntu } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CompanyConfigProvider } from '@/components/CompanyConfigProvider';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});
const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'AjiStat — Konsultasi & Olah Data Statistik Profesional',
    template: '%s | AjiStat',
  },
  description:
    'AjiStat by Aji Institute: konsultasi statistik, olah data penelitian, kelas privat, bootcamp & short class. SPSS, SmartPLS, NVivo, R, Python untuk skripsi, tesis, disertasi.',
  keywords: [
    'konsultasi statistik', 'olah data', 'SPSS', 'SmartPLS', 'NVivo', 'SEM',
    'skripsi', 'tesis', 'disertasi', 'AjiStat', 'Aji Institute',
  ],
  openGraph: {
    title: 'AjiStat — Konsultasi & Olah Data Statistik',
    description: 'Mitra riset terpercaya untuk 5.000+ klien akademik dan profesional.',
    url: 'https://ajistat.aji-institute.com',
    siteName: 'AjiStat',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${openSans.variable} ${ubuntu.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <CompanyConfigProvider>
          <Navbar />
          <main className="min-h-screen" style={{ paddingTop: '72px' }}>
            {children}
          </main>
          <Footer />
        </CompanyConfigProvider>
      </body>
    </html>
  );
}
