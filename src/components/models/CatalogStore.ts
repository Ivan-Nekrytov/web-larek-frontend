import { ApiProduct } from '../../types/api';

export interface CatalogItem extends ApiProduct {}

export class CatalogStore {
  private itemsMap: Map<string, CatalogItem> = new Map();
  private cdnUrl: string;

  constructor(cdnUrl: string) {
    this.cdnUrl = cdnUrl;
  }

  load(items: ApiProduct[]) {
    this.itemsMap.clear();
    items.forEach((item) => {
      this.itemsMap.set(item.id, {
        ...item,
        image: item.image ? `${this.cdnUrl}${item.image}` : '',
      });
    });
  }

  getById(id: string): CatalogItem | undefined {
    return this.itemsMap.get(id);
  }

  get items(): CatalogItem[] {
    return Array.from(this.itemsMap.values());
  }
}
