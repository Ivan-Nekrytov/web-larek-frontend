import { CatalogItem } from '../models/CatalogStore';
import { applyCategory } from '../../utils/category';
import { CURRENCY } from '../../utils/constants';
import { formatPrice } from '../../utils/utils';

export class Card {
  private element: HTMLElement;
  private titleEl: HTMLElement | null;
  private priceEl: HTMLElement | null;
  private imgEl: HTMLImageElement | null;
  private categoryEl: HTMLElement | null;

  constructor(
    template: HTMLTemplateElement,
    private onClick: (id: string) => void
  ) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.titleEl = this.element.querySelector('.card__title');
    this.priceEl = this.element.querySelector('.card__price');
    this.imgEl = this.element.querySelector('.card__image');
    this.categoryEl = this.element.querySelector('.card__category');
  }

  render(item: CatalogItem): HTMLElement {
   if (this.titleEl) {
   if (item.title.startsWith('Кнопка ')) {
    const parts = item.title.split(' ');
    this.titleEl.innerHTML = parts[0] + '<br>' + parts.slice(1).join(' ');
  } else {
    this.titleEl.textContent = item.title;
  }
}
    if (this.priceEl) this.priceEl.textContent = formatPrice(item.price);
    if (this.imgEl) this.imgEl.src = item.image;

    applyCategory(this.categoryEl, item.category);

    this.element.onclick = () => this.onClick(item.id);

    return this.element;
  }
}
