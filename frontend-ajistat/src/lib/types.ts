// ─── API Program (dari backend Django) ────────────────────────────────────────
export interface ApiProgram {
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
  is_featured: boolean;
  // Detail only
  description?: string;
  curriculum?: string[];
  demo_video_url?: string;
}

// Label status untuk tampilan
export const STATUS_LABEL: Record<ApiProgram['status'], string> = {
  upcoming: 'Akan Dilaksanakan',
  ongoing: 'Sedang Berlangsung',
  recorded: 'Tersedia Rekaman',
};

export const STATUS_COLOR: Record<ApiProgram['status'], string> = {
  upcoming: 'bg-amber-100 text-amber-700',
  ongoing:  'bg-green-100 text-green-700',
  recorded: 'bg-blue-100 text-blue-700',
};
