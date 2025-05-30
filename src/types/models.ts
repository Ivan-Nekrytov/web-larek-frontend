// Элемент корзины в модели
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CartModel {
  items: CartItem[];
  getTotal(): number;
  addItem(item: CartItem): void;
  removeItem(id: string): void;
  clear(): void;
}