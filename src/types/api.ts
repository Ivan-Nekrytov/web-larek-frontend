// Описание товара, получаемого с сервера
export interface ApiProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

// Заказ, отправляемый на сервер
export interface ApiOrder {
  payment: string;
  address: string;
  email: string;
  phone: string;
  items: string[]; // id товаров
}