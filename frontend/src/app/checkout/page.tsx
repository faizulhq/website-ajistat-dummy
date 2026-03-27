'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, ShieldCheck } from 'lucide-react';

declare global {
  interface Window {
    snap: any;
  }
}

import { cartApi, ordersApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const qc = useQueryClient();
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get().then((r) => r.data),
    enabled: isAuthenticated(),
  });

  // Load Midtrans Snap Script
  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = 'SB-Mid-client-YOUR_CLIENT_KEY'; // Ganti dengan Client Key asli di production
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkoutMutation = useMutation({
    mutationFn: () => ordersApi.checkout(notes),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['cart'] });
      
      const snapToken = res.data.snap_token;
      const order = res.data.order;

      if (snapToken && window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function () {
            setOrderId(order.id);
            setDone(true);
          },
          onPending: function () {
            setOrderId(order.id);
            setDone(true);
          },
          onError: function () {
            alert('Pembayaran gagal atau dibatalkan jaringan.');
          },
          onClose: function () {
            alert('Anda menutup popup pembayaran sebelum menyelesaikan transaksi.');
            // Tetap arahkan ke pesanan karena order sudah terbuat di database (status pending)
            setOrderId(order.id);
            setDone(true);
          }
        });
      } else {
        // Fallback jika tidak ada midtrans token
        setOrderId(order.id);
        setDone(true);
      }
    },
    onError: () => {
      alert("Gagal melakukan checkout. Periksa koneksi atau coba lagi nanti.");
    }
  });

  if (!isAuthenticated()) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-5xl mb-4">🔒</p>
        <h2 className="text-xl font-bold mb-4">Masuk untuk melanjutkan</h2>
        <Link href="/login" className="bg-[#162660] text-white px-6 py-3 rounded-xl font-semibold">Masuk</Link>
      </div>
    );
  }

  if (done) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900 mb-2">Pesanan Berhasil! 🎉</h2>
        <p className="text-gray-500 mb-2">Order #{orderId} telah kami terima.</p>
        <p className="text-gray-400 text-sm mb-8">Tim AjiStat akan menghubungi Anda melalui WhatsApp untuk konfirmasi pembayaran dan jadwal kelas.</p>
        <div className="flex gap-3">
          <Link href="/orders" className="flex-1 bg-[#162660] text-white font-semibold py-3 rounded-xl hover:bg-[#2568B5] transition-colors text-sm text-center">
            Lihat Pesanan
          </Link>
          <Link href="/" className="flex-1 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm text-center">
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );

  const items = cart?.items ?? [];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-5">Data Peserta</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
                  <p className="mt-1.5 px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-100">{user?.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                  <p className="mt-1.5 px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-100">{user?.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">WhatsApp (dari profil)</label>
                  <p className="mt-1.5 px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-100">{user?.phone || 'Belum diisi'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Catatan (opsional)</h2>
              <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Pertanyaan atau kebutuhan khusus..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] resize-none" />
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
              <h2 className="font-semibold text-gray-900 mb-5">Ringkasan Pesanan</h2>
              {isLoading ? (
                <div className="space-y-3">{[...Array(2)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}</div>
              ) : (
                <div className="space-y-3 mb-5">
                  {items.map((item: { id: number; program: { title: string; price: number } }) => (
                    <div key={item.id} className="flex justify-between items-start gap-3">
                      <p className="text-sm text-gray-700 line-clamp-2 flex-1">{item.program.title}</p>
                      <p className="text-sm font-semibold text-gray-900 shrink-0">{formatPrice(item.program.price)}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-[#2568B5]">{formatPrice(cart?.total ?? 0)}</span>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 text-xs text-blue-700">
                💳 Anda akan diarahkan ke Pop-up Pembayaran (Midtrans) setelah klik konfirmasi. Berbagai metode tersedia (Gopay, VA Bank, QRIS, dll).
              </div>

              <button
                onClick={() => checkoutMutation.mutate()}
                disabled={checkoutMutation.isPending || items.length === 0}
                className="w-full bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold py-3.5 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {checkoutMutation.isPending ? 'Memproses...' : '✅ Konfirmasi Pesanan'}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Data Anda aman dan terlindungi
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
