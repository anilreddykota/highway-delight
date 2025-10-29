export interface Experience {
  id: number;
  title: string;
  description: string;
  about?: string;
  starting_price: number;
  max_count: number;
  location: string;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Slot {
  id: number;
  experience_id: number;
  date: Date;
  time: string;
  price: number;
  capacity: number;
  booked: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Booking {
  id: number;
  experience_id: number;
  slot_id: number;
  name: string;
  email: string;
  phone?: string;
  promo_code?: string;
  total_price: number;
  status: 'confirmed' | 'cancelled';
  created_at?: Date;
}

export interface PromoCode {
  id: number;
  code: string;
  discount_amount: number;
  valid_from: Date;
  valid_until?: Date;
  max_uses?: number;
  times_used: number;
  created_at?: Date;
}