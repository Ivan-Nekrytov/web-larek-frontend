import { Api } from '../base/api';
import { ApiProduct, ApiList, OrderRequest, OrderResponse } from '../../types';
import { API_URL, CDN_URL } from '../../utils/constants';

export class ApiClient extends Api {
  constructor() {
    super(API_URL, CDN_URL);
  }

  async getProducts(): Promise<ApiProduct[]> {
    const res = await this.get<ApiList<ApiProduct>>('/products');
    return res.items;
  }

  async order(data: OrderRequest): Promise<OrderResponse> {
    return this.post<OrderResponse>('/order', data);
  }
}
