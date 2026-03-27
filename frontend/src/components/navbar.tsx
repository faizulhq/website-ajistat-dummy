'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, LogOut, User, BookOpen, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/auth-store';
import { cartApi } from '@/lib/api';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/bootcamp', label: 'Bootcamp' },
  { href: '/short-class', label: 'Short Class' },
  { href: '/private-class', label: 'Private Class' },
  { href: '/konsultasi', label: 'Konsultasi' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();

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

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0C1A45] border-b border-[#4FA8D8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-white rounded-lg px-2 py-1 shadow-md">
              <Image src="/logo.png" alt="AjiStat" width={40} height={28} className="h-7" style={{ width: 'auto' }} />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">Aji Mitra Statistika</p>
              <p className="text-[#4FA8D8] text-xs">PT. Amanah Jana Insani</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-white/10 text-white'
                    : 'text-white/75 hover:text-white hover:bg-white/8'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F0A500] text-[#0C1A45] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated() ? (
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link href="/orders" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <BookOpen className="w-4 h-4" /> Pesanan Saya
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="text-white/80 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  Masuk
                </Link>
                <Link href="/register" className="bg-[#F0A500] text-[#0C1A45] text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-[#C8870A] transition-colors">
                  Daftar
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
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
        <div className="md:hidden bg-[#0C1A45] border-t border-white/10 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-lg text-sm font-medium',
                pathname === link.href ? 'bg-white/10 text-white' : 'text-white/75 hover:text-white hover:bg-white/8'
              )}>
              {link.label}
            </Link>
          ))}
          {!isAuthenticated() && (
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
        </div>
      )}
    </nav>
  );
}
