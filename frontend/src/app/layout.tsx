import type { Metadata } from 'next';
import { Open_Sans, Ubuntu } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { CompanyConfigProvider } from '@/components/CompanyConfigProvider';
import { WelcomePopup } from '@/components/WelcomePopup';
import { BRAND } from '@/lib/config';

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
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: 'Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional. AjiStat, AjiBiz, AjiComm, AjiAI, AjiLingua.',
  keywords: [
    'aji institute', 'ajistat', 'statistika', 'analisis data', 'SPSS', 'SmartPLS',
    'pelatihan profesional', 'pengembangan kompetensi', 'AjiBiz', 'AjiComm', 'AjiAI', 'AjiLingua',
    'metodologi penelitian', 'konsultasi riset', 'skripsi', 'tesis',
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
    title: 'Aji Institute',
  },
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: 'Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional — AjiStat, AjiBiz, AjiComm, AjiAI, AjiLingua.',
    url: 'https://aji-institute.com',
    siteName: 'Aji Institute',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aji Institute — Platform Pelatihan & Konsultasi Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: 'Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional.',
    images: ['/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Aji Institute',
  alternateName: 'PT. Amanah Jñāna Insani',
  url: 'https://aji-institute.com',
  logo: 'https://aji-institute.com/og-image.png',
  description: 'Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional — AjiStat, AjiBiz, AjiComm, AjiAI, AjiLingua.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kompleks Bandung Indah Raya Blok C7 No.1',
    addressLocality: 'Bandung',
    addressCountry: 'ID',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-851-9556-4668',
    contactType: 'customer service',
    availableLanguage: 'Indonesian',
  },
  sameAs: [
    'https://www.instagram.com/ajiinstitute.id',
    'https://ajistat.aji-institute.com',
  ],
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
        <Providers>
          <CompanyConfigProvider>
            <WelcomePopup site="main" />
            <AnnouncementBar />
            <Navbar />
            <main
              className="min-h-screen transition-[padding-top] duration-200"
              style={{ paddingTop: 'calc(4.5rem + var(--ann-h, 0px))' }}
            >
              {children}
            </main>
            <Footer />
          </CompanyConfigProvider>
        </Providers>
      </body>
    </html>
  );
}
