import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#054E7A] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Logo-like badge */}
        <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <span className="text-white font-black text-3xl">AJI</span>
        </div>

        <p className="text-[#F0A500] text-6xl font-black mb-4">404</p>
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          Halaman yang Anda cari tidak ada atau telah dipindahkan. Mungkin Anda tertarik melihat program pelatihan kami?
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/"
            className="bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-bold px-6 py-3 rounded-xl transition-colors">
            🏠 Kembali ke Beranda
          </Link>
          <Link href="/bootcamp"
            className="bg-white/10 border border-white/25 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            🎓 Lihat Program
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          {[
            { label: 'Bootcamp', href: '/bootcamp' },
            { label: 'Short Class', href: '/short-class' },
            { label: 'Konsultasi', href: '/konsultasi' },
            { label: 'Tentang Kami', href: '/tentang' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              className="text-white/40 hover:text-[#47C2EA] transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
