'use client';

import { useState } from 'react';
import { CheckCircle, MessageSquare, BarChart3, FileText, Database } from 'lucide-react';

const services = [
  { icon: BarChart3, title: 'Analisis Data Statistik', desc: 'SPSS, SmartPLS, R, Python — uji asumsi, regresi, SEM, hingga interpretasi.' },
  { icon: FileText, title: 'Pendampingan Skripsi/Tesis', desc: 'Bab I–V, dari perumusan masalah, metodologi, analisis, hingga sidang.' },
  { icon: Database, title: 'Pengolahan Data Primer', desc: 'Pembersihan data, koding variabel, imputasi missing value.' },
];

export default function KonsultasiPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', desc: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1A45] via-[#162660] to-[#1e4fa0] border-b-4 border-[#4FA8D8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-4">
            💬 Konsultasi AJI Statistik
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Konsultasi analisis data dan pendampingan riset langsung bersama tim ahli kami. Mulai dari pemilihan metode hingga interpretasi hasil.
          </p>
        </div>
      </div>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900 text-center mb-10">Layanan Konsultasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {services.map((s) => (
              <div key={s.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-[#2568B5]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* What you get */}
          <div className="bg-gradient-to-br from-[#162660] to-[#2568B5] rounded-2xl p-8 text-white mb-12">
            <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold mb-5">Yang Anda Dapatkan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Sesi konsultasi via Zoom (1 sesi = 90 menit)', 'Laporan hasil analisis + interpretasi', 'File syntax / script yang digunakan', 'Panduan penulisan hasil di laporan', 'Follow-up konsultasi via WhatsApp 7 hari'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#4FA8D8] shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900 text-center mb-2">Ajukan Konsultasi</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Gratis konsultasi awal 15 menit. Tim kami akan membalas dalam 24 jam.</p>
          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
              <p className="text-4xl mb-3">✅</p>
              <p className="font-semibold text-emerald-700 text-lg">Permintaan konsultasi diterima!</p>
              <p className="text-sm text-emerald-600 mt-2">Tim AJI Statistik akan menghubungi Anda via WhatsApp dalam 24 jam.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 space-y-4">
              {[
                { key: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'Ahmad Fauzan' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'email@contoh.com' },
                { key: 'phone', label: 'Nomor WhatsApp', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
                { key: 'service', label: 'Jenis Kebutuhan', type: 'text', placeholder: 'Misal: analisis data SmartPLS untuk tesis' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5">{label}</label>
                  <input type={type} required value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] focus:ring-2 focus:ring-[#2568B5]/10" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5">Ceritakan Kebutuhan Anda</label>
                <textarea rows={4} required value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Jelaskan penelitian Anda, tools yang dimiliki, dan output yang diinginkan..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] resize-none" />
              </div>
              <button type="submit" className="w-full bg-[#162660] hover:bg-[#2568B5] text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> Kirim Permintaan Konsultasi
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
