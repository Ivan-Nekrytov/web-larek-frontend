import type { PaymentMethod } from './api';

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;       
  price: number | null; 
}


export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderStage1 {
  payment: PaymentMethod | null;
  address: string;
}

export interface OrderStage2 {
  email: string;
  phone: string;
}