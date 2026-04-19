'use client';

import { useState, useEffect, useRef } from 'react';
import { BRAND, CONTACT, WA_LINK, API_BASE } from '@/lib/config';

/* ──── Data ──── */
const SERVICES = [
  {
    icon: '📊',
    title: 'Konsultasi Data',
    desc: 'Pendampingan profesional untuk kebutuhan olah data penelitian Anda — dari metodologi hingga interpretasi hasil yang siap dipresentasikan.',
    tags: ['Kuantitatif', 'Kualitatif', 'Campuran'],
    href: WA_LINK('Halo Tim AjiStat, saya ingin konsultasi olah data'),
  },
  {
    icon: '🎓',
    title: 'Kelas Privat',
    desc: 'Pembelajaran 1-on-1 sesuai jadwal dan kebutuhan Anda. Langsung praktik software statistik dengan pendampingan intensif dari fasilitator expert.',
    tags: ['Jadwal Fleksibel', '1-on-1', 'Praktik Langsung'],
    href: WA_LINK('Halo Tim AjiStat, saya ingin mendaftar Kelas Privat'),
  },
  {
    icon: '🚀',
    title: 'Bootcamp',
    desc: 'Program pelatihan intensif terstruktur. Pelajari satu software/metode secara mendalam dalam waktu singkat bersama komunitas peserta lainnya.',
    tags: ['Intensif', 'Bersertifikat', 'Komunitas'],
    href: WA_LINK('Halo Tim AjiStat, saya ingin info Bootcamp'),
  },
];

const SOFTWARES = [
  { icon: '📉', name: 'SPSS' },
  { icon: '⚙️', name: 'SmartPLS' },
  { icon: '🔷', name: 'AMOS' },
  { icon: '🔵', name: 'LISREL' },
  { icon: '📈', name: 'EViews' },
  { icon: '🐍', name: 'Python' },
  { icon: '🎯', name: 'R Studio' },
  { icon: '🌿', name: 'NVivo' },
  { icon: '📋', name: 'STATA' },
  { icon: '🔬', name: 'Minitab' },
  { icon: '📦', name: 'SAS' },
  { icon: '🧮', name: 'JASP' },
];

const TOPICS = [
  'Validasi & Reliabilitas', 'MSI (Method of Successive Intervals)', 'Analisis Regresi',
  'Korelasi', 'Design Experiment', 'SEM (Structural Equation Modeling)',
  'Statistika Nonparametrik', 'Analisis Faktor', 'MDS & PCA', 'Cluster Analysis',
  'Path Analysis', 'Service Quality', 'Time Series Analysis', 'Teknik Sampling',
  'Statistik Deskriptif', 'Conjoint Analysis', 'SEM-PLS', 'SEM-AMOS',
  'Uji Hipotesis', 'Mediasi & Moderasi', 'ANOVA', 'Uji Beda',
  'NVivo (Kualitatif)', 'Content Analysis',
];

const TARGET_MARKET = [
  { emoji: '🎓', name: 'Mahasiswa S1', desc: 'Skripsi & tugas akhir' },
  { emoji: '🎓', name: 'Mahasiswa S2', desc: 'Tesis & penelitian magister' },
  { emoji: '🎓', name: 'Mahasiswa S3', desc: 'Disertasi & riset doktoral' },
  { emoji: '🔬', name: 'Peneliti', desc: 'Riset akademik & publikasi' },
  { emoji: '📚', name: 'Dosen', desc: 'Penelitian & pengabdian' },
  { emoji: '🏢', name: 'Perusahaan', desc: 'Riset pasar & data bisnis' },
];

const STATS = [
  { num: '5.000+', label: 'Klien Terbantu', icon: '🤝' },
  { num: '10+', label: 'Software Dikuasai', icon: '💻' },
  { num: '2015', label: 'Berpengalaman Sejak', icon: '📅' },
  { num: '24 Jam', label: 'Siap Membantu', icon: '⚡' },
];

/* ──── Types ──── */
interface Program {
  id: number;
  slug: string;
  title: string;
  type: string;
  description: string;
  price: number;
  original_price: number;
  brand: string;
}

/* ──── Helper ──── */
function formatPrice(p: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
}

function typeLabel(t: string) {
  const map: Record<string, string> = {
    bootcamp: 'Bootcamp', 'short-class': 'Short Class', 'private-class': 'Kelas Privat',
  };
  return map[t] ?? t;
}

/* ──── Main Page ──── */
export default function AjiStatPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [form, setForm] = useState({ name: '', phone: '', service: '', topic: '', desc: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/programs/?brand=ajistat`)
      .then((r) => r.json())
      .then((data) => setPrograms(Array.isArray(data) ? data : data.results ?? []))
      .catch(() => setPrograms([]));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Halo Tim AjiStat! Saya ingin konsultasi.
Nama: ${form.name}
WhatsApp: ${form.phone}
Layanan: ${form.service}
Topik/Software: ${form.topic}
Detail: ${form.desc}`;
    window.open(WA_LINK(msg), '_blank');
    setSent(true);
  }

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="navbar">
        <a href="#" className="navbar-brand">
          <div className="navbar-logo-box">AS</div>
          <div>
            <div className="navbar-title">{BRAND.name}</div>
            <div className="navbar-sub">by {BRAND.parent}</div>
          </div>
        </a>
        <a href={WA_LINK('Halo AjiStat, saya ingin konsultasi')} target="_blank" rel="noopener noreferrer" className="navbar-wa">
          <span>💬</span>
          <span>Konsultasi Gratis</span>
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero" id="beranda">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Divisi Statistik & Riset — Aji Institute
          </div>
          <h1 className="hero-h1">
            Konsultasi &<br />
            <span>Olah Data Statistik</span><br />
            <em>Profesional</em>
          </h1>
          <p className="hero-p">
            AjiStat adalah mitra riset terpercaya Anda. Kami melayani pengolahan dan analisis data
            penelitian kuantitatif &amp; kualitatif — untuk skripsi, tesis, disertasi, dan riset institusional.
          </p>
          <div className="hero-ctas">
            <a href={WA_LINK('Halo Tim AjiStat, saya ingin konsultasi olah data')} target="_blank" rel="noopener noreferrer" className="btn-primary">
              💬 Konsultasi Sekarang
            </a>
            <a href="#program" className="btn-secondary">
              🎯 Lihat Program
            </a>
          </div>
        </div>

        {/* Trust strip inside hero bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <div className="trust-strip">
            <div className="trust-strip-inner">
              {['5.000+ Klien Terbantu', 'Respons dalam 24 Jam', 'Sejak 2015', '100% Kerahasiaan Data', 'Mahasiswa S1 — S3'].map((t) => (
                <div className="trust-item" key={t}>
                  <span className="trust-dot" />
                  <span className="trust-text">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats-section">
        <div className="section-inner">
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="services-section" id="layanan">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Layanan Kami</div>
            <h2 className="section-h2">Solusi Lengkap untuk Riset Anda</h2>
            <p className="section-p">Dari konsultasi awal hingga laporan final — kami dampingi setiap tahap penelitian Anda.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-tags">
                  {s.tags.map((t) => <span className="service-tag" key={t}>{t}</span>)}
                </div>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="service-cta">
                  Daftar Sekarang →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOFTWARE ─── */}
      <section className="software-section" id="software">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Software & Tools</div>
            <h2 className="section-h2">Menguasai 12+ Software Statistik</h2>
            <p className="section-p">Tim kami terlatih dan berpengalaman menggunakan software statistik terkemuka di bidang akademik dan profesional.</p>
          </div>
          <div className="software-grid">
            {SOFTWARES.map((s) => (
              <div className="software-card" key={s.name}>
                <div className="software-icon">{s.icon}</div>
                <div className="software-name">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOPICS ─── */}
      <section className="topics-section" id="topik">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: 'rgba(240,165,0,0.8)' }}>Topik Statistika</div>
            <h2 className="section-h2">Cakupan Analisis yang Luas</h2>
            <p className="section-p">Kami menguasai berbagai metode dan teknik analisis statistik — dari dasar hingga lanjutan.</p>
          </div>
          <div className="topics-grid">
            {TOPICS.map((t) => (
              <span className="topic-chip" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TARGET ─── */}
      <section className="target-section" id="target">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Untuk Siapa?</div>
            <h2 className="section-h2">Melayani Berbagai Kalangan</h2>
            <p className="section-p">AjiStat dirancang untuk membantu siapa saja yang membutuhkan analisis data yang akurat dan terpercaya.</p>
          </div>
          <div className="target-grid">
            {TARGET_MARKET.map((t) => (
              <div className="target-card" key={t.name}>
                <div className="target-emoji">{t.emoji}</div>
                <div className="target-name">{t.name}</div>
                <div className="target-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      {programs.length > 0 && (
        <section className="programs-section" id="program">
          <div className="section-inner">
            <div className="section-header">
              <div className="section-eyebrow">Program AjiStat</div>
              <h2 className="section-h2">Pilih Program yang Tepat</h2>
              <p className="section-p">Berbagai program terstruktur untuk meningkatkan kemampuan analisis data Anda.</p>
            </div>
            <div className="programs-grid">
              {programs.map((p) => (
                <div className="program-card" key={p.id}>
                  <div className="program-card-header">
                    <span className="program-type-badge">{typeLabel(p.type)}</span>
                    <div className="program-title">{p.title}</div>
                  </div>
                  <div className="program-card-body">
                    <div className="program-desc">{p.description?.slice(0, 120)}...</div>
                    <div className="program-meta">
                      <div>
                        {p.original_price > p.price && (
                          <div className="program-orig">{formatPrice(p.original_price)}</div>
                        )}
                        <div className="program-price">{formatPrice(p.price)}</div>
                      </div>
                      <a href={WA_LINK(`Halo Tim AjiStat, saya tertarik dengan program: ${p.title}`)} target="_blank" rel="noopener noreferrer" className="program-cta">
                        Daftar →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FORM ─── */}
      <section className="form-section" id="konsultasi">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Konsultasi Gratis</div>
            <h2 className="section-h2">Ceritakan Kebutuhan Anda</h2>
            <p className="section-p">Isi formulir berikut dan tim AjiStat akan menghubungi Anda melalui WhatsApp secepatnya.</p>
          </div>
          <div className="form-wrapper">
            {sent ? (
              <div className="form-success">
                <div className="form-success-icon">✅</div>
                <h3>Permintaan Terkirim!</h3>
                <p>Klik tombol di bawah jika WhatsApp tidak otomatis terbuka.</p>
                <a href={WA_LINK('Halo AjiStat, saya sudah mengisi form konsultasi di website.')} target="_blank" rel="noopener noreferrer"
                  className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex', textDecoration: 'none' }}>
                  💬 Buka WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap</label>
                    <input required type="text" className="form-input" placeholder="Nama Anda"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp</label>
                    <input required type="tel" className="form-input" placeholder="08xx-xxxx-xxxx"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Layanan yang Dibutuhkan</label>
                    <select required className="form-select"
                      value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                      <option value="">-- Pilih Layanan --</option>
                      <option>Konsultasi Data</option>
                      <option>Kelas Privat</option>
                      <option>Bootcamp</option>
                      <option>Konsultasi Metodologi</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Software / Topik</label>
                    <input type="text" className="form-input" placeholder="Contoh: SmartPLS, SEM, NVivo"
                      value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
                  </div>
                  <div className="form-group full">
                    <label className="form-label">Ceritakan Kebutuhan Anda</label>
                    <textarea required className="form-textarea"
                      placeholder="Jelaskan topik penelitian, hambatan yang dihadapi, atau target jadwal Anda..."
                      value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
                  </div>
                </div>
                <button type="submit" className="form-submit" style={{ marginTop: '1.5rem' }}>
                  💬 Konsultasikan via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-name">AjiStat</div>
              <div className="footer-brand-sub">by Aji Institute — {BRAND.legalName}</div>
              <div className="footer-brand-tagline">
                Mitra riset terpercaya untuk mahasiswa, peneliti, dan profesional Indonesia.
              </div>
            </div>
            <div className="footer-links">
              <h4>Layanan</h4>
              <ul>
                <li><a href="#layanan">Konsultasi Data</a></li>
                <li><a href="#layanan">Kelas Privat</a></li>
                <li><a href="#layanan">Bootcamp</a></li>
                <li><a href="#software">Software & Tools</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Kontak</h4>
              <ul>
                <li><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">{CONTACT.whatsappDisplay}</a></li>
                <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li><a href="https://aji-institute.com" target="_blank" rel="noopener noreferrer">aji-institute.com</a></li>
              </ul>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <div className="footer-copy">
              © {new Date().getFullYear()} AjiStat by Aji Institute — {BRAND.legalName}. Hak cipta dilindungi.
            </div>
            <a href={WA_LINK('Halo Tim AjiStat, saya ingin konsultasi')} target="_blank" rel="noopener noreferrer" className="footer-wa">
              💬 {CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
