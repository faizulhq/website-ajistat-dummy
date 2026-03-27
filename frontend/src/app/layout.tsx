import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: { default: 'AjiStat — Aji Mitra Statistika', template: '%s — Aji Mitra Statistika' },
  description: 'Platform edukasi statistika, analisis data, dan metodologi penelitian terpercaya. Bootcamp, short class, private class, dan konsultasi riset.',
  keywords: ['statistika', 'analisis data', 'SPSS', 'SmartPLS', 'metodologi penelitian', 'skripsi', 'tesis'],
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
