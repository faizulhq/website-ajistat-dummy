import axios, { type InternalAxiosRequestConfig } from 'axios';

/**
 * Pilih base URL API:
 * - Browser (termasuk via Cloudflare HTTPS): gunakan SAME-ORIGIN /api
 *   → Next.js akan proxy ke Django di server-side (aman, tidak ada mixed-content)
 * - SSR di server: langsung ke Django localhost
 */
function getApiBase(): string {
  // Gunakan backend lokal (Django) saat development agar perubahan lokal terbaca
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000/api';
  }
  return 'https://api.aji-institute.com/api';
}

const api = axios.create({
  // Tidak ada baseURL statis — di-set dinamis di interceptor
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// ─── Request interceptor: set baseURL + JWT token ─────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Set baseURL setiap request (penting: instance dibuat saat SSR tapi dipakai di browser)
  config.baseURL = getApiBase();

  // Attach JWT token jika ada
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

// ─── Response interceptor: auto-refresh JWT ───────────────────
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) throw new Error('No refresh token');
        const { data } = await axios.post(`${getApiBase()}/auth/refresh/`, { refresh });
        localStorage.setItem('access_token', data.access);
        original.headers['Authorization'] = `Bearer ${data.access}`;
        return api(original);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Redirect ke homepage — sesi habis, user perlu login ulang jika ingin akses fitur member
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(err);
  }
);

// ─── Auth ─────────────────────────────────────────────────────
export const authApi = {
  register: (data: { email: string; name: string; phone?: string; password: string }) =>
    api.post('/auth/register/', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login/', data),
  me: () => api.get('/auth/me/'),
};

// ─── Programs ─────────────────────────────────────────────────────
export const programsApi = {
  list: (params?: { type?: string; search?: string; featured?: boolean }) =>
    api.get('/programs/', { params }),
  detail: (slug: string) => api.get(`/programs/${slug}/`),
  testimonials: () => api.get('/programs/testimonials/all/'),
};

// ─── Blog ───────────────────────────────────────────────────────────
export const blogApi = {
  list: (params?: { category?: string }) =>
    api.get('/blog/', { params }),
};

// ─── Announcements ──────────────────────────────────────────────
export const announcementsApi = {
  active: () => api.get('/announcements/'),
};

// ─── Cart ─────────────────────────────────────────────────────
export const cartApi = {
  get: () => api.get('/cart/'),
  add: (program_id: number) => api.post('/cart/', { program_id }),
  remove: (item_id: number) => api.delete(`/cart/${item_id}/`),
};

// ─── Orders ───────────────────────────────────────────────────
export const ordersApi = {
  checkout: (notes?: string) => api.post('/checkout/', { notes }),
  list: () => api.get('/orders/'),
};

export default api;
