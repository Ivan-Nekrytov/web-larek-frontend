import { CatalogItem } from '../models/CatalogStore';

export class Card {
  private element: HTMLElement;
  private titleEl: HTMLElement | null;
  private priceEl: HTMLElement | null;
  private imgEl: HTMLImageElement | null;

  constructor(
    template: HTMLTemplateElement,
    private onClick: (id: string) => void
  ) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.titleEl = this.element.querySelector('.card__title');
    this.priceEl = this.element.querySelector('.card__price');
    this.imgEl = this.element.querySelector('.card__image');
  }

  render(item: CatalogItem): HTMLElement {
    if (this.titleEl) this.titleEl.textContent = item.title;
    if (this.priceEl) this.priceEl.textContent = item.price + ' ₽';
    if (this.imgEl) this.imgEl.src = item.image;

    this.element.onclick = () => this.onClick(item.id);

    return this.element;
  }
}
