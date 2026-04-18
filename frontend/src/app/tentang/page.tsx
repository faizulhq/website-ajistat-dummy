import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Target, Eye, MessageCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import { CompanyStats } from './CompanyStats';
import { TeamCards } from './TeamCards';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Profil, visi misi, dan nilai inti Aji Institute — PT. Amanah Jñāna Insani.',
};

const MILESTONES = [
  { year: '2015', title: 'Berdiri', desc: 'Aji Institute lahir sebagai konsultan statistik dan riset personal untuk membantu mahasiswa dan peneliti.' },
  { year: '2022', title: 'Ekspansi Digital', desc: 'Kelas mulai diselenggarakan sepenuhnya via Zoom & online, menjangkau seluruh Indonesia.' },
  { year: '2023', title: 'Pertumbuhan Pesat', desc: 'Jumlah klien dan peserta pelatihan meningkat signifikan. Program AjiStat menjadi layanan konsultasi statistik yang paling diminati.' },
  { year: '2025', title: '5.000+ Klien Terbantu', desc: 'Ribuan klien dari berbagai universitas dan institusi berhasil terbantu melalui layanan konsultasi olah data, skripsi, tesis, dan riset institusional tim AjiStat.' },
  { year: '2025', title: 'Rebranding & Ekosistem Baru', desc: 'Akhir 2025 — logo, identitas visual, dan website baru diluncurkan. Multi-divisi (AjiStat, AjiBiz, AjiPR, AjiDigi, AjiLangua) mulai dioperasikan secara penuh.' },
  { year: '2026', title: 'Resmi PT. Amanah Jñāna Insani', desc: 'Aji Institute resmi beroperasi di bawah PT. Amanah Jñāna Insani dengan struktur korporat, multi-program terintegrasi, dan ekosistem layanan profesional yang lengkap.' },
];



// ── Makna AJI (dipindahkan dari beranda) ──────────────────────────────────────
const AJI_PILLARS = [
  {
    letter: 'A',
    name: 'Amanah',
    tagline: 'Integritas & Kepercayaan',
    desc: 'Integritas, kejujuran, dan tanggung jawab dalam setiap layanan kami. Kepercayaan Anda adalah amanah terbesar kami.',
    accent: '#4A72D4',
  },
  {
    letter: 'J',
    name: 'Jñāna',
    tagline: 'Ilmiah & Analitis',
    desc: 'Berpikir kritis, ilmiah, analitis, berbasis data dan kebenaran ilmiah. Kami percaya ilmu pengetahuan adalah fondasi kemajuan.',
    accent: '#F0A500',
  },
  {
    letter: 'I',
    name: 'Insani',
    tagline: 'Humanis & Empatik',
    desc: 'Humanis, empatik, dan pengembangan manusia seutuhnya. Setiap peserta adalah individu yang berhak tumbuh dan berkembang.',
    accent: '#4ade80',
  },
];

export default function TentangPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#162058] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav className="flex justify-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/80">Tentang Kami</span>
          </nav>
          <span className="inline-block bg-[#4A72D4]/20 border border-[#4A72D4]/30 text-[#4A72D4] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            🏛️ PT. Amanah Jñāna Insani
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Tentang <span className="text-[#F0A500]">Aji Institute</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Center for Research, Data, and Professional Development — platform pelatihan dan konsultasi profesional yang berkomitmen pada kualitas, integritas, dan dampak nyata.
          </p>
        </div>
      </div>

      {/* Profil */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Profil Perusahaan</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Mitra Terpercaya untuk Riset dan Kompetensi Anda
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Aji Institute</strong> adalah platform pendidikan dan pengembangan kompetensi profesional yang dikelola oleh <strong>PT. Amanah Jñāna Insani</strong>. Kami hadir untuk menjawab kebutuhan masyarakat Indonesia akan pelatihan berkualitas tinggi di bidang statistik, riset, bisnis, komunikasi, dan teknologi.
              </p>
              <p>
                Didirikan atas dasar kepedulian terhadap kualitas riset Indonesia, Aji Institute telah berkembang menjadi salah satu lembaga pelatihan data dan statistik terpercaya dengan ribuan alumni dari berbagai universitas dan institusi di seluruh Indonesia.
              </p>
              <p>
                Nama &quot;AJI&quot; bukan sekadar singkatan, tetapi merupakan cerminan nilai inti yang kami pegang: <strong>Amanah</strong> (integritas), <strong>Jñāna</strong> (ilmiah &amp; analitis), dan <strong>Insani</strong> (humanis &amp; empatik).
              </p>
            </div>
          </div>
          <CompanyStats />
        </div>
      </section>

      {/* ── Makna AJI (dipindahkan dari beranda) ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Nilai Inti Kami</p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
              Makna di Balik{' '}
              <span className="bg-gradient-to-r from-[#1B3A8C] to-[#2348A8] bg-clip-text text-transparent">AJI</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Kiri — A J I */}
            <div className="bg-gradient-to-b from-[#162058] via-[#1B3A8C] to-[#1B3A8C] flex flex-col">
              {AJI_PILLARS.map((pillar, idx) => (
                <div key={pillar.letter}
                  className={`flex items-center gap-6 p-8 md:p-10 ${idx < AJI_PILLARS.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <span className="text-8xl md:text-9xl font-black leading-none w-24 shrink-0 text-center"
                    style={{ color: pillar.accent }}>
                    {pillar.letter}
                  </span>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">{pillar.tagline}</p>
                    <h3 className="text-2xl font-black text-white">{pillar.name}</h3>
                    <p className="text-white/60 text-sm mt-2 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Kanan */}
            <div className="bg-white flex flex-col justify-center p-8 md:p-12">
              <p className="text-[#2348A8] text-xs font-bold uppercase tracking-widest mb-3">Mengapa Aji Institute?</p>
              <h3 className="text-3xl font-black text-gray-900 mb-6 leading-snug">
                Lebih dari Sekadar<br />
                <span className="text-[#2348A8]">Tempat Belajar</span>
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Aji Institute berdiri di atas komitmen untuk mencetak individu yang tidak hanya kompeten secara teknis,
                tetapi juga berintegritas, kritis, dan siap berkontribusi nyata bagi masyarakat.
              </p>
              <a href={WA_LINK('Halo, saya ingin tahu lebih lanjut tentang Aji Institute')}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#1B3A8C] hover:bg-[#2348A8] text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                Hubungi Kami Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Visi &amp; Misi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#2348A8]/10 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-[#2348A8]" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-4">Visi</h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi pusat pengembangan kompetensi dan riset terdepan di Indonesia yang melahirkan generasi peneliti, profesional, dan pemimpin yang kompeten, berintegritas, dan berdampak.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#F0A500]/10 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#F0A500]" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-4">Misi</h3>
              <ul className="space-y-2">
                {[
                  'Menyelenggarakan program pelatihan berkualitas tinggi yang relevan dengan kebutuhan industri dan akademik',
                  'Menghadirkan fasilitator berpengalaman yang mendampingi peserta secara personal dan profesional',
                  'Mendorong budaya riset berbasis data di Indonesia melalui edukasi yang aksesibel',
                  'Membangun ekosistem kerja sama antar institusi untuk kemajuan pendidikan nasional',
                ].map((misi, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#F0A500] shrink-0 mt-0.5" />
                    {misi}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tim — Elegant Cards with Modal */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#2348A8] text-xs font-bold uppercase tracking-[0.2em] mb-3">Tim Kami</p>
            <h2 className="text-3xl font-bold text-gray-900">Fasilitator Berpengalaman</h2>
            <p className="text-gray-500 text-sm mt-2">Klik kartu untuk melihat detail keahlian masing-masing divisi.</p>
          </div>
          <TeamCards />
        </div>
      </section>

      {/* Milestone — Dot timeline with year pill */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <p className="text-[#2348A8] text-xs font-bold uppercase tracking-[0.2em] mb-3">Perjalanan Kami</p>
            <h2 className="text-3xl font-bold text-gray-900">Milestone Aji Institute</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gray-200" />
            <div className="space-y-8">
              {MILESTONES.map((m) => (
                <div key={m.title} className="flex gap-5 relative items-start">
                  <div className="relative shrink-0 flex items-center justify-center mt-[9px]">
                    <div className="w-[11px] h-[11px] rounded-full bg-[#1B3A8C] ring-4 ring-white z-10" />
                  </div>
                  <div className="pb-2">
                    <span className="inline-block bg-[#1B3A8C] text-white text-[11px] font-bold tracking-widest px-3 py-0.5 rounded-full mb-2">
                      {m.year}
                    </span>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{m.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#162058]">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-4">
            Siap Bergabung dengan Komunitas Aji Institute?
          </h2>
          <p className="text-white/60 mb-8">Hubungi tim kami untuk informasi layanan yang paling sesuai dengan kebutuhan Anda.</p>
          <a href={WA_LINK('Halo Aji Institute, saya ingin tahu lebih lanjut tentang layanan yang tersedia')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-bold px-8 py-3.5 rounded-xl transition-colors">
            <MessageCircle className="w-4 h-4" /> Hubungi Kami Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
