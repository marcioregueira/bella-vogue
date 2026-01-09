export enum Category {
  HAIR = 'Cabelo',
  NAILS = 'Unhas',
  SPA = 'Spa & Relaxamento',
  MAKEUP = 'Maquiagem'
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMin: number;
  category: Category;
  imageUrl: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingDetails {
  serviceId: string;
  date: Date | null;
  timeSlot: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}