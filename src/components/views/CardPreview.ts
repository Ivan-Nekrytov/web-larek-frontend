import { CatalogItem } from '../../types';

export class CardPreview {
  private template: HTMLTemplateElement;
  private product: CatalogItem;
  private inCart: boolean;
  private onToggle: (() => void) | null = null;

  constructor(template: HTMLTemplateElement, product: CatalogItem, inCart: boolean) {
    this.template = template;
    this.product = product;
    this.inCart = inCart;
  }

  setOnToggle(handler: () => void) {
    this.onToggle = handler;
  }

  render(): HTMLElement {
    const element = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;

    const title = element.querySelector('.card__title');
    const description = element.querySelector('.card__description');
    const price = element.querySelector('.card__price');
    const image = element.querySelector<HTMLImageElement>('.card__image');
    const button = element.querySelector<HTMLButtonElement>('.card__button');

    if (title) title.textContent = this.product.title;
    if (description) description.textContent = this.product.description;
    if (price) price.textContent = this.product.price ? `${this.product.price} ₽` : 'Бесплатно';
    if (image) image.src = this.product.image;
    if (button) {
      button.textContent = this.inCart ? 'Удалить из корзины' : 'Добавить в корзину';
      button.addEventListener('click', () => this.onToggle?.());
    }

    return element;
  }
}
