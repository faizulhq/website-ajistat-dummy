'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { ordersApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Order } from '@/lib/types';

const STATUS_CONFIG = {
  pending: { label: 'Menunggu Pembayaran', icon: Clock, color: 'bg-amber-50 text-amber-600 border-amber-200' },
  paid: { label: 'Lunas', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  cancelled: { label: 'Dibatalkan', icon: XCircle, color: 'bg-red-50 text-red-600 border-red-200' },
};

export default function OrdersPage() {
  const { isAuthenticated, user } = useAuthStore();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: () => ordersApi.list().then((r) => r.data),
    enabled: isAuthenticated(),
  });

  if (!isAuthenticated()) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-5xl mb-4">🔒</p>
        <Link href="/login" className="bg-[#0B7AB5] text-white px-6 py-3 rounded-xl font-semibold">Masuk</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0B7AB5] flex items-center justify-center text-white font-bold">
            {user?.avatar}
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-gray-900">Pesanan Saya</h1>
            <p className="text-sm text-gray-500">{user?.name} · {user?.email}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}</div>
        ) : !orders || orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum ada pesanan</h3>
            <p className="text-gray-400 text-sm mb-6">Mulai belajar dengan mendaftar program pilihan Anda.</p>
            <Link href="/bootcamp" className="bg-[#0B7AB5] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1AAEE0] transition-colors">
              Jelajahi Program
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
              const StatusIcon = status.icon;
              return (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Order #{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.created_at)}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${status.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" /> {status.label}
                    </span>
                  </div>
                  <div className="px-6 py-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start py-2 text-sm">
                        <p className="text-gray-700 flex-1 pr-4">{item.program_title}</p>
                        <p className="text-gray-500 shrink-0">{formatPrice(item.price_at_purchase)}</p>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-100">
                      <span className="text-sm font-semibold text-gray-700">Total</span>
                      <span className="font-bold text-[#1AAEE0]">{formatPrice(order.total_price)}</span>
                    </div>
                    {order.status === 'pending' && (
                      <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                        💬 Tim kami akan menghubungi Anda di WhatsApp untuk panduan pembayaran.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
