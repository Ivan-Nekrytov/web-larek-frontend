export interface ApiProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number | null;
  category?: string;
}

export interface ApiList<T> {
  total: number;
  items: T[];
}

export type PaymentMethod = 'online' | 'cash';

export interface OrderRequest {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface OrderResponse {
  id: string;
  total: number;
}