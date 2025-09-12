import { CatalogItem } from '../models/CatalogStore';

export class CardPreview {
  private element: HTMLElement;
  private titleEl: HTMLElement | null;
  private descriptionEl: HTMLElement | null;
  private priceEl: HTMLElement | null;
  private imgEl: HTMLImageElement | null;
  private buttonEl: HTMLButtonElement | null;

  private onToggle: (() => void) | null = null;

  constructor(template: HTMLTemplateElement, private product: CatalogItem, private inCart: boolean) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.titleEl = this.element.querySelector('.card__title');
    this.descriptionEl = this.element.querySelector('.card__description');
    this.priceEl = this.element.querySelector('.card__price');
    this.imgEl = this.element.querySelector('.card__image');
    this.buttonEl = this.element.querySelector('.card__button');

    if (this.buttonEl) {
      this.buttonEl.addEventListener('click', () => {
        if (this.onToggle) this.onToggle();
      });
    }
  }

  setOnToggle(handler: () => void) {
    this.onToggle = handler;
  }

  render(): HTMLElement {
    if (this.titleEl) this.titleEl.textContent = this.product.title;
    if (this.descriptionEl) this.descriptionEl.textContent = this.product.description;
    if (this.priceEl) this.priceEl.textContent = this.product.price + ' синапсов';
    if (this.imgEl) this.imgEl.src = this.product.image;

    if (this.buttonEl) {
      this.buttonEl.textContent = this.inCart ? 'Убрать из корзины' : 'В корзину';
    }

    return this.element;
  }
}
