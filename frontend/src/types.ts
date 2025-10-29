export interface Slot {
  id: number;
  date: string; // ISO date
  time: string; // e.g., "09:00"
  price: number;
  capacity: number;
  booked: number;
}

export interface Experience {
  id: number;
  title: string;
  description: string;
  location: string;
  duration: string;
  image_url: string;
  starting_price: number;
  slots: Slot[];
}

export interface BookingRequest {
  experienceId: string;
  slotId: string;
  name: string;
  email: string;
  phone?: string;
  promoCode?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message?: string;
}