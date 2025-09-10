import type { PaymentMethod } from '../../types';
import type { OrderStage1, OrderStage2 } from '../../types';

export class CheckoutStore {
  stage1: OrderStage1 = { payment: null, address: '' };
  stage2: OrderStage2 = { email: '', phone: '' };

  setPayment(p: PaymentMethod) { this.stage1.payment = p; }
  setAddress(a: string) { this.stage1.address = a?.trim(); }
  setEmail(e: string) { this.stage2.email = e?.trim(); }
  setPhone(p: string) { this.stage2.phone = p?.trim(); }

  get validStage1() { return Boolean(this.stage1.payment && this.stage1.address.length > 3); }
  get validStage2() { return Boolean(this.isEmail(this.stage2.email) && this.normalizePhone(this.stage2.phone).length >= 10); }

  reset() {
    this.stage1 = { payment: null, address: '' };
    this.stage2 = { email: '', phone: '' };
  }

  private isEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  private normalizePhone(v: string) { return String(v || '').replace(/\D/g, ''); }
}