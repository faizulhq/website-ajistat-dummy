import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BRAND } from '@/lib/config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: 'Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional. AjiStat, AjiBiz, AjiPR, AjiDigi, AjiLanguage.',
  keywords: [
    'aji institute', 'ajistat', 'statistika', 'analisis data', 'SPSS', 'SmartPLS',
    'pelatihan profesional', 'pengembangan kompetensi', 'AjiBiz', 'AjiPR', 'AjiDigi', 'AjiLanguage',
    'metodologi penelitian', 'konsultasi riset', 'skripsi', 'tesis'
  ],
  openGraph: {
    title: BRAND.name,
    description: BRAND.tagline,
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Providers>
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
