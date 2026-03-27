'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { cartApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const qc = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get().then((r) => r.data),
    enabled: isAuthenticated(),
  });

  const removeMutation = useMutation({
    mutationFn: (itemId: number) => cartApi.remove(itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });

  if (!isAuthenticated()) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <p className="text-5xl mb-4">🔒</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Masuk untuk Melihat Keranjang</h2>
        <p className="text-gray-500 mb-6">Anda perlu login untuk mengelola keranjang belanja.</p>
        <Link href="/login" className="bg-[#162660] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#2568B5] transition-colors">
          Masuk Sekarang
        </Link>
      </div>
    );
  }

  if (isLoading) return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />)}
    </div>
  );

  const items = cart?.items ?? [];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-6 h-6 text-[#2568B5]" />
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900">Keranjang Saya</h1>
          <span className="bg-gray-100 text-gray-500 text-sm font-semibold px-2.5 py-0.5 rounded-full">{items.length} item</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <p className="text-5xl mb-4">🛒</p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Keranjang masih kosong</h3>
            <p className="text-gray-400 text-sm mb-6">Tambahkan program yang Anda minati ke keranjang.</p>
            <Link href="/bootcamp" className="bg-[#162660] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#2568B5] transition-colors">
              Jelajahi Program
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Items */}
            {items.map((item: { id: number; program: { id: number; title: string; type: string; price: number; thumbnail_color: string; duration: string; facilitator_name: string } }) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-4 p-4 sm:p-5 items-start">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white/30 font-black text-2xl shrink-0"
                  style={{ background: `linear-gradient(135deg, ${item.program.thumbnail_color}, ${item.program.thumbnail_color}aa)` }}>
                  AJI
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block bg-blue-50 text-[#2568B5] text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5">
                    {item.program.type === 'bootcamp' ? 'Bootcamp' : 'Short Class'}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{item.program.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.program.duration} · {item.program.facilitator_name}</p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <p className="font-bold text-[#2568B5]">{formatPrice(item.program.price)}</p>
                  <button onClick={() => removeMutation.mutate(item.id)}
                    disabled={removeMutation.isPending}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Subtotal ({items.length} program)</span>
                <span className="font-bold text-gray-900 text-lg">{formatPrice(cart?.total ?? 0)}</span>
              </div>
              <p className="text-xs text-gray-400 mb-5">Harga sudah termasuk semua materi, rekaman, dan sertifikat.</p>
              <button onClick={() => router.push('/checkout')}
                className="w-full flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-200">
                Lanjut ke Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
