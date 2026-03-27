import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const STATUS_LABELS: Record<string, string> = {
  upcoming: 'Akan Datang',
  ongoing: 'Berlangsung',
  recorded: 'Rekaman',
};

export const STATUS_COLORS: Record<string, string> = {
  upcoming: 'bg-emerald-100 text-emerald-700',
  ongoing: 'bg-amber-100 text-amber-700',
  recorded: 'bg-slate-100 text-slate-600',
};

export const TYPE_LABELS: Record<string, string> = {
  bootcamp: 'Bootcamp',
  'short-class': 'Short Class',
  'private-class': 'Private Class',
};
