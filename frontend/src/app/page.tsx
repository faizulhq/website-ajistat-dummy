'use client';

/**
 * Halaman Beranda — src/app/page.tsx
 */

import { HeroSlider }            from './_sections/HeroSlider';
import { AjiMeaningStrip }       from './_sections/AjiMeaningStrip';
import { StatsStrip }            from './_sections/StatsStrip';
import { ProgramGridSection, FeaturedPrograms } from './_sections/FeaturedPrograms';
import { KonsultasiPreview, CtaKerjaSama }      from './_sections/KonsultasiPreview';
import { ToolsGrid }             from './_sections/ToolsGrid';
import { VideoPreviewSection }   from './_sections/VideoPreviewSection';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AjiMeaningStrip />
      <StatsStrip />
      <ProgramGridSection />
      <FeaturedPrograms />
      <VideoPreviewSection />
      <KonsultasiPreview />
      <ToolsGrid />
      <CtaKerjaSama />
    </>
  );
}
