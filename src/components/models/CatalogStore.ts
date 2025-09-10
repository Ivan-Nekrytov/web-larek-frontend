import { CatalogItem } from '../../types';

export class CatalogStore {
  private items: CatalogItem[] = [];

  setProducts(products: CatalogItem[]) {
    this.items = products;
  }

  getProducts(): CatalogItem[] {
    return this.items;
  }

  getProduct(id: string): CatalogItem | undefined {
    return this.items.find(p => p.id === id);
  }
}
