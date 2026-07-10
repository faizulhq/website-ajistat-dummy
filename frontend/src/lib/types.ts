// ─── Program Documentation ────────────────────────────────────
export interface ProgramDocumentationImage {
  id: number;
  image: string;    // absolute URL dari Django media
  caption: string;
  order: number;
}

// ─── Program ──────────────────────────────────────────────────
export interface Program {
  id: number;
  title: string;
  slug: string;
  type: 'bootcamp' | 'short-class' | 'private-class' | 'in-house-training';
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
  image?: string | null;
  is_featured: boolean;
  brand?: 'aji-institute' | 'ajistat' | 'ajibiz' | 'ajicomm' | 'ajiai' | 'ajilingua';
  show_documentation?: boolean;
  show_rundown?: boolean;
  registration_link?: string;

  documentation_images?: ProgramDocumentationImage[];
  // Detail only
  description?: string;
  curriculum?: string[];
  rundown?: { day: string; time: string; label: string; note: string }[];
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

// ─── Riset Project ────────────────────────────────────────────
export interface RisetProject {
  id: number;
  title: string;
  slug: string;
  client: string;
  description: string;
  scope: string[];
  methodology: string[];
  location: string;
  year: number | null;
  status: 'ongoing' | 'completed';
  image: string | null;
  is_featured: boolean;
  is_published: boolean;
  order: number;
  created_at: string;
}

export interface RisetProjectsResponse {
  total: number;
  data: RisetProject[];
}
