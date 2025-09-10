import { ApiProduct } from '../../types/api';

export class CartStore {
  private items: Map<string, ApiProduct> = new Map();

  add(product: ApiProduct) {
    this.items.set(product.id, product);
  }

  remove(id: string) {
    this.items.delete(id);
  }

  has(id: string): boolean {
    return this.items.has(id);
  }

  clear() {
    this.items.clear();
  }

  list(): ApiProduct[] {
    return Array.from(this.items.values());
  }

  ids(): string[] {
    return Array.from(this.items.keys());
  }

  get count(): number {
    return this.items.size;
  }

  get total(): number {
    return Array.from(this.items.values()).reduce((sum, item) => {
      return sum + (item.price || 0);
    }, 0);
  }
}
