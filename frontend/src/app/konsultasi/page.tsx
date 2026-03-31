'use client';

import { useState } from 'react';
import { CheckCircle, MessageSquare, BarChart3, Database, FileText, PieChart, Users, Building, Laptop, Target } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const SERVICES = [
  'Konsultasi statistik dan metodologi penelitian',
  'Olah data penelitian',
  'Analisis data kuantitatif',
  'Analisis data kualitatif dengan NVivo',
  'Uji statistik untuk skripsi, tesis, dan disertasi',
  'Analisis regresi, uji hipotesis, SEM, dan model penelitian',
  'Interpretasi hasil analisis',
  'Pendampingan riset akademik',
  'Penyusunan laporan hasil analisis',
  'Konsultasi data untuk kebutuhan institusi dan bisnis'
];

const SOFTWARES = ['SPSS', 'SmartPLS', 'AMOS', 'LISREL', 'EViews', 'R', 'Python', 'NVivo'];

const TARGET_LAYANAN = [
  'Mahasiswa', 'Dosen', 'Peneliti', 'Akademisi', 'Instansi pemerintah', 'Lembaga pendidikan', 'Perusahaan', 'UMKM'
];

export default function KonsultasiPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', programType: '', software: '', desc: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    // Format message to WhatsApp
    const message = `Halo Tim AjiStat! Saya ingin berkonsultasi mengenai olah data/riset.
Nama: ${form.name}
Email: ${form.email}
Kebutuhan Layanan: ${form.programType}
Software yang dibutuhkan: ${form.software}
Detail / Topik Riset: ${form.desc}`;
    window.open(WA_LINK(message), '_blank');
    setSent(true); 
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#054E7A] via-[#0B7AB5] to-[#1AAEE0] border-b-4 border-[#F0A500] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[#F0A500] text-sm font-bold uppercase tracking-widest mb-3 block">Layanan AjiStat by Aji Institute</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Konsultasi Statistik & Olah Data Profesional
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            AjiStat adalah mitra profesional Anda yang membantu memperoleh hasil analisis yang akurat, sistematis, terpercaya, dan mudah dipahami, baik untuk kebutuhan akademik, institusi, maupun bisnis.
          </p>
        </div>
      </div>

      {/* KEUNGGULAN SECTION */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
            {[
              { label: 'Terpercaya', desc: 'Profesional & Berpengalaman' },
              { label: 'Akurat', desc: 'Sesuai Kaidah Metodologi' },
              { label: 'Sistematis', desc: 'Mudah Dipahami' },
              { label: 'Rahasia', desc: 'Keamanan Data Transparan' }
            ].map((k, i) => (
              <div key={i} className="px-4">
                <h4 className="font-bold text-[#1AAEE0] text-lg">{k.label}</h4>
                <p className="text-gray-500 text-sm mt-1">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYANAN DETAIL */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Layanan Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Berbagai layanan profesional yang dirancang untuk memenuhi kebutuhan olah data kuantitatif dan kualitatif.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#1AAEE0]" />
                </div>
                <p className="font-semibold text-gray-800 leading-snug">{s}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#054E7A] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-6">Software & Tools yang Digunakan</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {SOFTWARES.map((sw) => (
                <span key={sw} className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm font-semibold tracking-wide backdrop-blur-sm">
                  {sw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TARGET & KLIEN */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Target Layanan</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {TARGET_LAYANAN.map((t) => (
              <div key={t} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-full text-gray-700 font-medium whitespace-nowrap">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAKET HARGA */}
      <section className="py-20 bg-[#054E7A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#47C2EA] text-sm font-bold uppercase tracking-widest mb-3">Estimasi Harga</p>
            <h2 className="text-3xl font-black text-white mb-4">Paket Layanan Konsultasi</h2>
            <p className="text-white/60 max-w-xl mx-auto">Harga disesuaikan dengan kompleksitas, kedalaman analisis, dan kebutuhan spesifik klien. Konsultasikan terlebih dahulu untuk penawaran terbaik.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: 'Lite',
                price: 'Rp 3 jt+',
                tagline: 'Mulai dari',
                desc: 'Untuk kebutuhan olah data sederhana, analisis deskriptif, atau konsultasi metodologi awal.',
                features: ['Uji statistik dasar', 'Analisis deskriptif', 'Output & interpretasi singkat', 'Revisi 1x'],
                cta: 'Konsultasi Sekarang',
                highlight: false,
              },
              {
                tier: 'Professional',
                price: 'Rp 8 jt+',
                tagline: 'Mulai dari',
                desc: 'Untuk penelitian akademik skripsi, tesis, atau analisis SEM, mediasi, moderasi yang lebih kompleks.',
                features: ['Analisis lanjutan (SEM, PLS, AMOS)', 'Interpretasi detail & laporan', 'Pendampingan revisi', 'Prioritas respons'],
                cta: 'Pilih Paket Ini',
                highlight: true,
              },
              {
                tier: 'Enterprise',
                price: 'Rp 15 jt+',
                tagline: 'Mulai dari',
                desc: 'Untuk disertasi, riset institusional, atau proyek analisis data skala besar dengan kebutuhan khusus.',
                features: ['Analisis data kompleks multi-metode', 'Laporan lengkap berstandar jurnal', 'Pendampingan intensif penuh', 'Konsultasi tak terbatas'],
                cta: 'Diskusikan Proyek',
                highlight: false,
              },
            ].map((pkg) => (
              <div key={pkg.tier}
                className={`rounded-3xl p-8 flex flex-col gap-5 ${pkg.highlight ? 'bg-[#F0A500] text-[#054E7A]' : 'bg-white/5 border border-white/10 text-white'}`}>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${pkg.highlight ? 'text-[#054E7A]/60' : 'text-white/40'}`}>{pkg.tagline}</p>
                  <p className="text-4xl font-black mb-1">{pkg.price}</p>
                  <p className={`text-xs font-semibold uppercase tracking-widest ${pkg.highlight ? 'text-[#054E7A]/70' : 'text-white/50'}`}>{pkg.tier}</p>
                </div>
                <p className={`text-sm leading-relaxed ${pkg.highlight ? 'text-[#054E7A]/75' : 'text-white/60'}`}>{pkg.desc}</p>
                <ul className="space-y-2 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${pkg.highlight ? 'text-[#054E7A]' : 'text-white/80'}`}>
                      <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${pkg.highlight ? 'bg-[#054E7A]/20 text-[#054E7A]' : 'bg-white/10 text-white'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/6285892605592?text=Halo%20Tim%20AjiStat%2C%20saya%20tertarik%20dengan%20Paket%20${encodeURIComponent(pkg.tier)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-colors ${pkg.highlight ? 'bg-[#054E7A] text-white hover:bg-[#0B7AB5]' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM KONSULTASI KHUSUS */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Ajukan Konsultasi Anda</h2>
            <p className="text-gray-500">Isi formulir berikut dan tim AjiStat akan menghubungi Anda untuk menawarkan solusi olah data yang tepat sesuai metodologi.</p>
          </div>
          
          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 text-center shadow-lg">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <p className="font-black text-gray-900 text-2xl mb-2">Permintaan Berhasil Dibuat!</p>
              <p className="text-gray-600 mb-6">Klik tombol di bawah ini jika WhatsApp tidak otomatis terbuka untuk melanjutkan pengiriman pesan ke tim kami.</p>
              <button onClick={() => window.open(WA_LINK('Halo, saya sudah mengisi form konsultasi di website.'), '_blank')} className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700">Lanjutkan ke WhatsApp</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Nama Lengkap</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#1AAEE0] focus:ring-2 focus:ring-[#1AAEE0]/20 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Nomor WhatsApp</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#1AAEE0] focus:ring-2 focus:ring-[#1AAEE0]/20 transition-all" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Jenis Layanan yang Dibutuhkan</label>
                <select required value={form.programType} onChange={(e) => setForm({ ...form, programType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#1AAEE0] focus:ring-2 focus:ring-[#1AAEE0]/20 transition-all appearance-none cursor-pointer">
                  <option value="" disabled>-- Pilih Jenis Layanan --</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Software (Jika Ada Spesifikasi)</label>
                <input type="text" value={form.software} onChange={(e) => setForm({ ...form, software: e.target.value })} placeholder="Contoh: Sangat butuh SmartPLS 4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#1AAEE0] focus:ring-2 focus:ring-[#1AAEE0]/20 transition-all" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Ceritakan Tujuan / Topik Anda</label>
                <textarea rows={4} required value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Ceritakan metodologi Anda, hambatan yang sedang dialami (misal data tidak normal), atau target jadwal sidang Anda..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#1AAEE0] focus:ring-2 focus:ring-[#1AAEE0]/20 transition-all resize-none" />
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-r from-[#054E7A] to-[#1AAEE0] hover:opacity-90 text-white font-black py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" /> Konsultasikan Sekarang via WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
