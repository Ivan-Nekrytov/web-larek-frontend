import { CatalogItem } from '../models/CatalogStore';
import { applyCategory } from '../../utils/category';
import { CURRENCY } from '../../utils/constants';
import { formatPrice } from '../../utils/utils';

export class CardPreview {
  private element: HTMLElement;
  private titleEl: HTMLElement | null;
  private descriptionEl: HTMLElement | null;
  private priceEl: HTMLElement | null;
  private imgEl: HTMLImageElement | null;
  private buttonEl: HTMLButtonElement | null;
  private categoryEl: HTMLElement | null;

  private onToggle: (() => void) | null = null;

  constructor(
    template: HTMLTemplateElement,
    private product: CatalogItem,
    private inCart: boolean
  ) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.titleEl = this.element.querySelector('.card__title');
    this.descriptionEl = this.element.querySelector('.card__text');
    this.priceEl = this.element.querySelector('.card__price');
    this.imgEl = this.element.querySelector('.card__image');
    this.buttonEl = this.element.querySelector('.card__button');
    this.categoryEl = this.element.querySelector('.card__category');

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
    if (this.priceEl) this.priceEl.textContent = formatPrice(this.product.price);
    if (this.imgEl) this.imgEl.src = this.product.image;

    applyCategory(this.categoryEl, this.product.category);

   if (this.buttonEl) {
   if (this.product.price === null) {
    this.buttonEl.textContent = 'Недоступно';
    this.buttonEl.disabled = true;
  } else {
      this.buttonEl.textContent = this.inCart ? 'Удалить из корзины' : 'Купить';
    this.buttonEl.disabled = false;
  }
}

    return this.element;
  }
}
