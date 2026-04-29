import type { Metadata } from 'next';
import { Open_Sans, Ubuntu } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CompanyConfigProvider } from '@/components/CompanyConfigProvider';
import { WelcomePopup } from '@/components/WelcomePopup';

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
    'analisis data', 'metodologi penelitian', 'R Studio', 'Python', 'EViews', 'STATA',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', rel: 'shortcut icon' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'AjiStat',
  },
  openGraph: {
    title: 'AjiStat — Konsultasi & Olah Data Statistik Profesional',
    description: 'Mitra riset terpercaya untuk 5.000+ klien akademik dan profesional. SPSS, SmartPLS, NVivo, R, Python.',
    url: 'https://ajistat.aji-institute.com',
    siteName: 'AjiStat',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AjiStat — Konsultasi & Olah Data Statistik Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AjiStat — Konsultasi & Olah Data Statistik Profesional',
    description: 'Mitra riset terpercaya untuk 5.000+ klien akademik dan profesional.',
    images: ['/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'AjiStat',
  parentOrganization: { '@type': 'Organization', name: 'Aji Institute' },
  url: 'https://ajistat.aji-institute.com',
  logo: 'https://ajistat.aji-institute.com/og-image.png',
  description: 'Mitra riset statistik terpercaya untuk 5.000+ klien akademik dan profesional. Konsultasi, bootcamp, short class, dan private class SPSS, SmartPLS, R, Python, NVivo.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-823-1934-1735',
    contactType: 'customer service',
    availableLanguage: 'Indonesian',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan AjiStat',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Bootcamp Statistika' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Short Class Statistika' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Private Class Statistika' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Konsultasi & Jasa Olah Data' } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${openSans.variable} ${ubuntu.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <CompanyConfigProvider>
          <WelcomePopup site="ajistat" />
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
