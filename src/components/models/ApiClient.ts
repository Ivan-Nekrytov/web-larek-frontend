import { Api, ApiListResponse } from '../base/api';
import type { ApiProduct, OrderRequest, OrderResponse } from '../../types';

export class ApiClient extends Api {
  async getProducts(): Promise<ApiProduct[]> {
    const data = await this.get<ApiListResponse<ApiProduct>>('/product/');
    return data.items ?? [];
  }
  async getProduct(id: string): Promise<ApiProduct> {
    return this.get<ApiProduct>(`/product/${id}`);
  }
  async createOrder(order: OrderRequest): Promise<OrderResponse> {
    return this.post<OrderResponse>('/order', order);
  }
}