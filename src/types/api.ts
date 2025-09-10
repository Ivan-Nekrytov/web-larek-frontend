export interface ApiProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number | null;
}

export interface ApiList<T> {
  total: number;
  items: T[];
}

export interface OrderRequest {
  payment: 'cash' | 'online';
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

export type PaymentMethod = 'cash' | 'online';
