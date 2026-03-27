'use client';

import { Users, Clock, CheckCircle, MessageSquare, Award, Zap, Target, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const CORE_VALUES = [
  {
    code: 'A',
    name: 'Amanah',
    color: 'from-[#0C1A45] to-[#162660]',
    accentColor: 'bg-[#4FA8D8]',
    badge: 'text-[#4FA8D8]',
    desc: 'Kami berkomitmen memberikan layanan yang jujur, transparan, dan dapat dipercaya. Setiap program dirancang berdasarkan standar akademis yang tinggi.',
    icon: ShieldCheck,
  },
  {
    code: 'J',
    name: 'Jana',
    color: 'from-[#162660] to-[#2568B5]',
    accentColor: 'bg-[#F0A500]',
    badge: 'text-[#F0A500]',
    desc: 'Bersama membangun ekosistem riset yang inklusif. Kami percaya kolaborasi antara mahasiswa, peneliti, dan praktisi menciptakan inovasi nyata.',
    icon: Users,
  },
  {
    code: 'I',
    name: 'Insani',
    color: 'from-[#2568B5] to-[#1e4fa0]',
    accentColor: 'bg-emerald-400',
    badge: 'text-emerald-300',
    desc: 'Layanan yang memanusiakan. Kami memahami tantangan nyata yang dihadapi peneliti dan hadir sebagai mitra belajar, bukan sekadar penyedia kursus.',
    icon: Target,
  },
];

const SUB_BRANDS = [
  {
    name: 'AJI Learning',
    icon: '🎓',
    desc: 'Platform pelatihan intensif untuk statistik & metodologi penelitian',
    color: 'border-[#4FA8D8]/30 bg-[#4FA8D8]/5 hover:bg-[#4FA8D8]/10',
    badge: 'bg-[#4FA8D8]/20 text-[#4FA8D8]',
  },
  {
    name: 'AJI Statistik',
    icon: '📊',
    desc: 'Layanan konsultasi analisis data untuk skripsi, tesis, dan disertasi',
    color: 'border-[#2568B5]/30 bg-[#2568B5]/5 hover:bg-[#2568B5]/10',
    badge: 'bg-[#2568B5]/20 text-[#2568B5]',
  },
  {
    name: 'AJI EduLab',
    icon: '🔬',
    desc: 'Laboratorium digital untuk riset kolaboratif berbasis data nyata',
    color: 'border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10',
    badge: 'bg-purple-500/20 text-purple-600',
  },
  {
    name: 'AJI Private Class',
    icon: '🎯',
    desc: 'Mentoring personal 1-on-1 dengan kurikulum yang disesuaikan sepenuhnya',
    color: 'border-[#F0A500]/30 bg-[#F0A500]/5 hover:bg-[#F0A500]/10',
    badge: 'bg-[#F0A500]/20 text-[#C8870A]',
  },
];

const benefits = [
  'Jadwal 100% fleksibel sesuai waktu Anda',
  'Kurikulum disesuaikan dengan kebutuhan spesifik',
  '1-on-1 langsung dengan instruktur berpengalaman',
  'Rekaman setiap sesi untuk review ulang kapan saja',
  'Konsultasi tambahan via chat selama program berjalan',
  'Sertifikat resmi AJI setelah menyelesaikan program',
];

const packages = [
  {
    name: 'Starter',
    icon: '🌱',
    sessions: '4 Sesi',
    hours: '8 Jam',
    price: 600000,
    desc: 'Ideal untuk pemula yang ingin menguasai satu tools analisis spesifik.',
    features: ['4 sesi live 1-on-1', 'Rekaman semua sesi', 'Materi & dataset', 'Konsultasi chat 7 hari'],
  },
  {
    name: 'Standard',
    icon: '🚀',
    sessions: '8 Sesi',
    hours: '16 Jam',
    price: 1100000,
    desc: 'Paling diminati. Komprehensif dari konsep dasar hingga analisis mandiri.',
    features: ['8 sesi live 1-on-1', 'Rekaman semua sesi', 'Materi & dataset lengkap', 'Konsultasi chat 30 hari', 'Review & feedback laporan'],
    popular: true,
  },
  {
    name: 'Intensive',
    icon: '💎',
    sessions: '12 Sesi',
    hours: '24 Jam',
    price: 1500000,
    desc: 'Mentoring komprehensif untuk skripsi, tesis, atau disertasi hingga tuntas.',
    features: ['12 sesi live 1-on-1', 'Rekaman semua sesi', 'Materi & dataset + template', 'Konsultasi chat 60 hari', 'Review laporan tak terbatas', 'Sertifikat premium AJI'],
  },
];

export default function PrivateClassPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', notes: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-linear-to-br from-[#0C1A45] via-[#162660] to-[#1e4fa0] relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex justify-center gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Private Class</span>
          </nav>

          <span className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            🎯 AJI Private Class — Mentoring Personal
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Belajar Lebih Cepat dengan<br />
            <span className="text-[#F0A500]">Bimbingan 1-on-1</span> yang Personal
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Program mentoring personal langsung bersama instruktur ahli AJI.
            Kurikulum, jadwal, dan kecepatan belajar disesuaikan sepenuhnya dengan kebutuhan dan target riset Anda.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: '🗓️', text: 'Jadwal 100% Fleksibel' },
              { icon: '📋', text: 'Kurikulum Custom' },
              { icon: '🔴', text: 'Sesi Live via Zoom' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5">
                <span>{item.icon}</span>
                <span className="text-white/80 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CORE VALUES ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#162660]/5 border border-[#162660]/10 text-[#162660] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Nilai Inti Kami
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Dibangun di Atas Tiga Pilar Utama
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Singkatan <strong>AJI</strong> bukan sekadar nama — ini adalah janji kami kepada setiap peserta yang mempercayakan perjalanan risetnya bersama kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_VALUES.map((cv) => (
              <div key={cv.code} className={`bg-gradient-to-br ${cv.color} rounded-2xl p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-4 right-4 text-white/10 text-6xl font-black select-none">{cv.code}</div>
                <div className="relative">
                  <div className={`w-12 h-12 ${cv.accentColor} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <cv.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{cv.name}</h3>
                  <p className={`text-xs font-semibold mb-3 ${cv.badge}`}>Nilai Utama AJI</p>
                  <p className="text-white/70 text-sm leading-relaxed">{cv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUB-BRANDS ─── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ekosistem AJI</h2>
            <p className="text-gray-500 text-sm">Empat sub-brand yang saling melengkapi untuk mendukung perjalanan riset Anda</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUB_BRANDS.map((brand) => (
              <div key={brand.name} className={`rounded-2xl p-5 border transition-all duration-200 ${brand.color}`}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{brand.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">{brand.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${brand.badge}`}>AJI</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{brand.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-[#2568B5] uppercase tracking-widest mb-3 block">Kenapa Private Class?</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Belajar Sesuai Ritme & Kebutuhan Anda</h2>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Award key={i} className="w-5 h-5 text-[#F0A500] fill-[#F0A500]" />)}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed italic mb-5">
              &ldquo;Private class AJI benar-benar game changer. Dalam 8 sesi saja saya sudah bisa analisis SEM sendiri dan tesis saya selesai tepat waktu. Fasilitatornya sabar dan sangat memahami kebutuhan saya.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#162660] to-[#4FA8D8] flex items-center justify-center text-white font-bold text-sm">RA</div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Rina Andriani</p>
                <p className="text-xs text-gray-500">Mahasiswa S2 Manajemen, UGM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Paket yang Sesuai</h2>
            <p className="text-gray-500 text-sm">Semua paket sudah termasuk rekaman, materi, dan sertifikat resmi AJI</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`bg-white rounded-2xl border p-6 relative transition-all ${
                  pkg.popular
                    ? 'border-[#2568B5] shadow-xl shadow-blue-100 scale-[1.02]'
                    : 'border-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F0A500] text-[#0C1A45] text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    ⭐ Paling Populer
                  </div>
                )}
                <div className="text-3xl mb-3">{pkg.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  {pkg.sessions} ({pkg.hours})
                </p>
                <p className="text-2xl font-bold text-[#2568B5] mb-2">
                  Rp {pkg.price.toLocaleString('id-ID')}
                </p>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#konsultasi-form"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    pkg.popular
                      ? 'bg-[#162660] text-white hover:bg-[#2568B5]'
                      : 'border border-gray-200 text-gray-700 hover:border-[#2568B5] hover:text-[#2568B5]'
                  }`}
                >
                  Daftar Paket {pkg.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section id="konsultasi-form" className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Daftarkan Diri Anda</h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            Tim kami akan menghubungi Anda via WhatsApp dalam 1×24 jam untuk konfirmasi jadwal dan detail program.
          </p>
          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
              <p className="text-4xl mb-4">🎉</p>
              <p className="font-bold text-emerald-700 text-lg mb-1">Pendaftaran Berhasil Dikirim!</p>
              <p className="text-sm text-emerald-600">Tim AJI akan segera menghubungi Anda via WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-lg rounded-2xl p-8 space-y-4">
              {[
                { key: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'Ahmad Fauzan' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'email@contoh.com' },
                { key: 'phone', label: 'Nomor WhatsApp', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
                { key: 'topic', label: 'Topik / Tools yang Ingin Dipelajari', type: 'text', placeholder: 'Misal: SmartPLS untuk tesis manajemen' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5">{label}</label>
                  <input
                    type={type}
                    required
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] focus:ring-2 focus:ring-[#2568B5]/10 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5">Catatan Tambahan</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Ceritakan kondisi penelitian Anda saat ini..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] focus:ring-2 focus:ring-[#2568B5]/10 resize-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Kirim Pendaftaran
              </button>
              <p className="text-center text-xs text-gray-400">
                🔒 Data Anda aman dan tidak akan dibagikan kepada pihak ketiga
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#0C1A45] py-14">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-[#4FA8D8] text-sm font-semibold uppercase tracking-widest mb-3">Masih Ragu?</p>
          <h2 className="text-2xl font-bold text-white mb-4">Konsultasi Gratis Sebelum Mendaftar</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Ceritakan kebutuhan riset Anda dan tim AJI akan merekomendasikan paket yang paling tepat, tanpa tekanan untuk langsung mendaftar.
          </p>
          <a
            href="/konsultasi"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            <Zap className="w-4 h-4" />
            Konsultasi Gratis Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
