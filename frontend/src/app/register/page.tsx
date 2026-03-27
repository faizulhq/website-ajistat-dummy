'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErrors({});
    try {
      const { data } = await authApi.register(form);
      setAuth(data.user, data.access, data.refresh);
      router.push('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: Record<string, string[]> } };
        const raw = axiosErr.response?.data ?? {};
        const parsed: Record<string, string> = {};
        Object.entries(raw).forEach(([k, v]) => { parsed[k] = Array.isArray(v) ? v[0] : String(v); });
        setErrors(parsed);
      }
    } finally { setLoading(false); }
  };

  const fields = [
    { key: 'name', label: 'Nama Lengkap', icon: User, type: 'text', placeholder: 'Ahmad Fauzan' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'name@email.com' },
    { key: 'phone', label: 'Nomor WhatsApp (opsional)', icon: Phone, type: 'tel', placeholder: '08xx-xxxx-xxxx' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1A45] via-[#162660] to-[#1e4fa0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#162660] rounded-2xl mb-4">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900">Buat Akun AjiStat</h1>
            <p className="text-gray-500 text-sm mt-1">Sudah punya akun? <Link href="/login" className="text-[#2568B5] font-semibold hover:underline">Masuk di sini</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={type} value={form[key as keyof typeof form]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder} required={key !== 'phone'}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] focus:ring-2 focus:ring-[#2568B5]/10" />
                </div>
                {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showPw ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => set('password', e.target.value)} placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] focus:ring-2 focus:ring-[#2568B5]/10" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {errors.non_field_errors && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{errors.non_field_errors}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-[#162660] hover:bg-[#2568B5] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 mt-2">
              {loading ? 'Mendaftarkan...' : 'Buat Akun →'}
            </button>
            <p className="text-center text-xs text-gray-400">
              Dengan mendaftar, Anda menyetujui Syarat & Ketentuan kami.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
