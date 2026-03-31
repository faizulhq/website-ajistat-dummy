import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Target, Eye, Heart, MessageCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Profil, visi misi, dan nilai inti Aji Institute — PT. Amanah Jana Insani.',
};

const MILESTONES = [
  { year: '2020', title: 'Berdiri', desc: 'Aji Institute lahir sebagai konsultan statistik personal.' },
  { year: '2021', title: 'Program Pertama', desc: 'Bootcamp SPSS pertama dengan 30 peserta mahasiswa S2.' },
  { year: '2022', title: 'Ekspansi Digital', desc: 'Kelas mulai diselenggarakan sepenuhnya via Zoom & online.' },
  { year: '2023', title: '300+ Alumni', desc: 'Mencapai 300+ alumni dari berbagai universitas di Indonesia.' },
  { year: '2024', title: 'Multi-Divisi', desc: 'Ekspansi ke 5 divisi program: Stat, Business, Speaking, Digital, Language.' },
  { year: '2025', title: 'Rebranding', desc: 'Resmi menjadi Aji Institute dengan identitas korporat yang kuat.' },
];

const TEAM = [
  { name: 'Tim Fasilitator AjiStat', role: 'Konsultan Statistik & Peneliti', initials: 'AS', desc: 'Berpengalaman dalam analisis data SPSS, SmartPLS, AMOS, R, dan Python untuk riset akademik dan industri.' },
  { name: 'Tim Fasilitator Business', role: 'Business & Management Trainer', initials: 'BZ', desc: 'Praktisi bisnis dan manajemen dengan latar belakang MBA dan pengalaman korporat lebih dari 10 tahun.' },
  { name: 'Tim Fasilitator Speaking', role: 'Public Speaking Coach', initials: 'SP', desc: 'Trainer komunikasi bersertifikat dengan keahlian presentasi, negosiasi, dan kepemimpinan.' },
];

export default function TentangPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#054E7A] to-[#1090C8] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav className="flex justify-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/80">Tentang Kami</span>
          </nav>
          <span className="inline-block bg-[#47C2EA]/20 border border-[#47C2EA]/30 text-[#47C2EA] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            🏛️ PT. Amanah Jana Insani
          </span>
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-bold text-white mb-6">
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
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Profil Perusahaan</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900 mb-5">
              Mitra Terpercaya untuk Riset dan Kompetensi Anda
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Aji Institute</strong> adalah platform pendidikan dan pengembangan kompetensi profesional yang dikelola oleh <strong>PT. Amanah Jana Insani</strong>. Kami hadir untuk menjawab kebutuhan masyarakat Indonesia akan pelatihan berkualitas tinggi di bidang statistik, riset, bisnis, komunikasi, dan teknologi.
              </p>
              <p>
                Didirikan atas dasar kepedulian terhadap kualitas riset Indonesia, Aji Institute telah berkembang menjadi salah satu lembaga pelatihan data dan statistik terpercaya dengan ratusan alumni dari berbagai universitas dan institusi di seluruh Indonesia.
              </p>
              <p>
                Nama "AJI" bukan sekadar singkatan, tetapi merupakan cerminan nilai inti yang kami pegang: <strong>Amanah</strong> (integritas), <strong>Jana</strong> (ilmiah & analitis), dan <strong>Insani</strong> (humanis & empatik).
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Alumni Terlatih', color: 'bg-blue-50 border-blue-100' },
              { value: '30+', label: 'Program Aktif', color: 'bg-amber-50 border-amber-100' },
              { value: '10+', label: 'Fasilitator Expert', color: 'bg-green-50 border-green-100' },
              { value: '5th', label: 'Tahun Pengalaman', color: 'bg-purple-50 border-purple-100' },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.color} border rounded-2xl p-6 text-center`}>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Visi & Misi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#1AAEE0]/10 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-[#1AAEE0]" />
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

      {/* Core Values */}
      <section className="py-20 bg-[#054E7A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#47C2EA] text-sm font-semibold uppercase tracking-widest mb-3">Nilai Inti</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white">
              AJI — Tiga Pilar yang Menopang Kami
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { letter: 'A', name: 'Amanah', icon: Heart, color: 'from-blue-500 to-blue-700', desc: 'Menjunjung tinggi integritas, kejujuran, dan tanggung jawab dalam setiap layanan yang kami berikan. Kepercayaan Anda adalah amanah terbesar kami.' },
              { letter: 'J', name: 'Jana', icon: Target, color: 'from-amber-500 to-amber-700', desc: 'Berpikir kritis, analitis, berbasis data, dan berorientasi pada kebenaran ilmiah. Setiap keputusan kami didukung oleh bukti dan pengetahuan yang sahih.' },
              { letter: 'I', name: 'Insani', icon: Heart, color: 'from-green-500 to-green-700', desc: 'Mengutamakan pendekatan humanis, empatik, dan pengembangan manusia seutuhnya. Setiap peserta adalah individu unik yang berhak mendapat perhatian penuh.' },
            ].map((val) => (
              <div key={val.letter} className="bg-white/8 border border-white/15 rounded-2xl p-8">
                <div className={`w-14 h-14 bg-gradient-to-br ${val.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-5`}>
                  {val.letter}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{val.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Tim Kami</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Fasilitator Berpengalaman</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B7AB5] to-[#1AAEE0] flex items-center justify-center text-white font-bold text-xl mb-5">
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#1AAEE0] text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Perjalanan Kami</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Milestone Aji Institute</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex gap-6 relative">
                  <div className="w-12 h-12 bg-[#0B7AB5] rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 z-10">
                    {m.year}
                  </div>
                  <div className="pt-2">
                    <p className="font-semibold text-gray-900">{m.title}</p>
                    <p className="text-gray-500 text-sm mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B7AB5]">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white mb-4">
            Siap Bergabung dengan Komunitas Aji Institute?
          </h2>
          <p className="text-white/60 mb-8">Hubungi tim kami untuk informasi program yang paling sesuai dengan kebutuhan Anda.</p>
          <a href={WA_LINK('Halo Aji Institute, saya ingin tahu lebih lanjut tentang program yang tersedia')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-bold px-8 py-3.5 rounded-xl transition-colors">
            <MessageCircle className="w-4 h-4" /> Hubungi Kami Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
