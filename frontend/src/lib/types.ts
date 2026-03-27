// ─── Program ──────────────────────────────────────────────────
export interface Program {
  id: number;
  title: string;
  slug: string;
  type: 'bootcamp' | 'short-class' | 'private-class';
  status: 'upcoming' | 'ongoing' | 'recorded';
  price: number;
  original_price: number | null;
  tags: string[];
  duration: string;
  schedule: string;
  facilitator_name: string;
  facilitator_title?: string;
  facilitator_bio?: string;
  facilitator_avatar?: string;
  thumbnail_color: string;
  is_featured: boolean;
  // Detail only
  description?: string;
  curriculum?: string[];
  demo_video_url?: string;
  testimonials?: Testimonial[];
}

// ─── Testimonial ──────────────────────────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  program_name: string;
  rating: number;
  comment: string;
  avatar: string;
}

// ─── User ─────────────────────────────────────────────────────
export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'student' | 'admin';
  avatar: string;
}

// ─── Cart ─────────────────────────────────────────────────────
export interface CartItem {
  id: number;
  program: Program;
  added_at: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
  item_count: number;
}

// ─── Order ────────────────────────────────────────────────────
export interface OrderItem {
  id: number;
  program_title: string;
  price_at_purchase: number;
}

export interface Order {
  id: number;
  total_price: number;
  status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
  notes: string;
  items: OrderItem[];
}

// ─── API Response ─────────────────────────────────────────────
export interface ProgramsResponse {
  total: number;
  data: Program[];
}
