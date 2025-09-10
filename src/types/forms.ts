import type { PaymentMethod } from './api';

export interface OrderFormState {
  payment: PaymentMethod | null;
  address: string;
  valid: boolean;
  error?: string;
}

export interface ContactsFormState {
  email: string;
  phone: string;
  valid: boolean;
  error?: string;
}