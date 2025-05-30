import { ApiProduct, ApiOrder } from './api';

export interface IApiClient {
  getProductList(): Promise<ApiProduct[]>;
  getProductById(id: string): Promise<ApiProduct>;
  createOrder(order: ApiOrder): Promise<{ id: string }>;
}