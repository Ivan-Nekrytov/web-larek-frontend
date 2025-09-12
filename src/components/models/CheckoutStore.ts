import type { PaymentMethod } from '../../types';
import type { OrderStage1, OrderStage2 } from '../../types';

export class CheckoutStore {
  stage1: OrderStage1 = { payment: null, address: '' };
  stage2: OrderStage2 = { email: '', phone: '' };

  setPayment(p: PaymentMethod) { this.stage1.payment = p; }
  setAddress(a: string) { this.stage1.address = a?.trim(); }
  setEmail(e: string) { this.stage2.email = e?.trim(); }
  setPhone(p: string) { this.stage2.phone = p?.trim(); }

  get validStage1() {
  const errors: string[] = [];

  if (!this.stage1.payment) {
    errors.push('Выберите способ оплаты');
  }

  if (!this.stage1.address || this.stage1.address.length <= 3) {
    errors.push('Укажите корректный адрес');
  }

  return {
    isValid: errors.length === 0,
    errors: errors.join('. ')
  };
}
  get validStage2() {
  const errors: string[] = [];

  if (!this.stage2.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.stage2.email)) {
    errors.push('Укажите корректный email');
  }

  if (!this.stage2.phone || this.stage2.phone.replace(/\D/g, '').length < 10) {
    errors.push('Укажите корректный номер телефона');
  }

  return {
    isValid: errors.length === 0,
    errors: errors.join('. ')
  };
}

  reset() {
    this.stage1 = { payment: null, address: '' };
    this.stage2 = { email: '', phone: '' };
  }

  private isEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  private normalizePhone(v: string) { return String(v || '').replace(/\D/g, ''); }
}