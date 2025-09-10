import { ApiProduct, OrderRequest, OrderResponse } from './api';

export interface IApiClient {
  getProductList(): Promise<ApiProduct[]>;
  getProductById(id: string): Promise<ApiProduct>;
  createOrder(order: OrderRequest): Promise<OrderResponse>;
}