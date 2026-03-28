'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, LogOut, BookOpen, ChevronDown, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/auth-store';
import { cartApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import { SUB_BRANDS, WA_LINK, CONTACT } from '@/lib/config';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get().then((r) => r.data),
    enabled: isAuthenticated(),
    staleTime: 30_000,
  });

  const cartCount = cart?.item_count ?? 0;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  const mainLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/layanan', label: 'Layanan' },
    { href: '/kerja-sama', label: 'Kerja Sama' },
    { href: '/blog', label: 'Blog' },
    { href: '/tentang', label: 'Tentang' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0C1A45] border-b border-[#4FA8D8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Aji Institute"
                width={48}
                height={34}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">Aji Institute</p>
              <p className="text-[#4FA8D8] text-[10px]">PT. Amanah Jana Insani</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {/* Beranda */}
            <Link
              href="/"
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === '/' ? 'bg-white/10 text-white' : 'text-white/75 hover:text-white hover:bg-white/8'
              )}
            >
              Beranda
            </Link>

            {/* Program Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setProgramOpen(!programOpen)}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  programOpen ? 'bg-white/10 text-white' : 'text-white/75 hover:text-white hover:bg-white/8'
                )}
              >
                Program
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', programOpen && 'rotate-180')} />
              </button>

              {programOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#0d1f52] border border-white/15 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-2 mb-1">
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Divisi Program</p>
                  </div>
                  {SUB_BRANDS.map((brand) => (
                    <Link
                      key={brand.id}
                      href={brand.href}
                      onClick={() => setProgramOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/8 transition-colors group"
                    >
                      <span className="text-xl">{brand.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold group-hover:text-[#4FA8D8] transition-colors">
                          {brand.name}
                        </p>
                        <p className="text-white/40 text-xs truncate">{brand.label}</p>
                      </div>
                      {!brand.available && (
                        <span className="text-[10px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full shrink-0">Soon</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other main links */}
            {mainLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href ? 'bg-white/10 text-white' : 'text-white/75 hover:text-white hover:bg-white/8'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* WhatsApp CTA */}
            <a
              href={WA_LINK('Halo, saya ingin konsultasi program Aji Institute')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Konsultasi
            </a>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F0A500] text-[#0C1A45] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {mounted && isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2568B5] flex items-center justify-center text-white text-xs font-bold">
                    {user?.avatar}
                  </div>
                  <span className="hidden sm:block text-white text-sm font-medium">{user?.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link href="/orders" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <BookOpen className="w-4 h-4" /> Pesanan Saya
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : mounted ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login"
                  className="text-white/80 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  Masuk
                </Link>
                <Link href="/register"
                  className="bg-[#F0A500] text-[#0C1A45] text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-[#C8870A] transition-colors">
                  Daftar
                </Link>
              </div>
            ) : null}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-white/75 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d1f52] border-t border-white/10 px-4 py-3 space-y-1">
          <Link href="/" onClick={() => setMobileOpen(false)}
            className={cn('block px-3 py-2 rounded-lg text-sm font-medium', pathname === '/' ? 'bg-white/10 text-white' : 'text-white/75 hover:text-white')}>
            Beranda
          </Link>

          {/* Mobile Program Accordion */}
          <button
            onClick={() => setMobileProgramOpen(!mobileProgramOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-white/75 hover:text-white"
          >
            <span>Program</span>
            <ChevronDown className={cn('w-4 h-4 transition-transform', mobileProgramOpen && 'rotate-180')} />
          </button>
          {mobileProgramOpen && (
            <div className="ml-3 pl-3 border-l border-white/15 space-y-1">
              {SUB_BRANDS.map((brand) => (
                <Link key={brand.id} href={brand.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/65 hover:text-white hover:bg-white/8">
                  <span>{brand.icon}</span>
                  <span>{brand.name}</span>
                  {!brand.available && <span className="text-[10px] text-white/30 ml-auto">Soon</span>}
                </Link>
              ))}
            </div>
          )}

          {mainLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn('block px-3 py-2 rounded-lg text-sm font-medium',
                pathname === link.href ? 'bg-white/10 text-white' : 'text-white/75 hover:text-white hover:bg-white/8')}>
              {link.label}
            </Link>
          ))}

          {mounted && !isAuthenticated() && (
            <div className="flex gap-2 pt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2 text-white/80 border border-white/20 rounded-lg text-sm">
                Masuk
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2 bg-[#F0A500] text-[#0C1A45] font-semibold rounded-lg text-sm">
                Daftar
              </Link>
            </div>
          )}

          <a href={WA_LINK('Halo, saya ingin konsultasi program Aji Institute')}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-2 py-2.5 bg-green-600 text-white font-semibold rounded-lg text-sm">
            <MessageCircle className="w-4 h-4" /> Konsultasi Gratis
          </a>
        </div>
      )}
    </nav>
  );
}
