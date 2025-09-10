import { CatalogItem } from '../../types';

export class Card {
  private template: HTMLTemplateElement;
  private onClick: (id: string) => void;

  constructor(template: HTMLTemplateElement, onClick: (id: string) => void) {
    this.template = template;
    this.onClick = onClick;
  }

  render(product: CatalogItem): HTMLElement {
    const card = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;

    const title = card.querySelector('.card__title');
    const price = card.querySelector('.card__price');
    const image = card.querySelector<HTMLImageElement>('.card__image');

    if (title) title.textContent = product.title;
    if (price) price.textContent = product.price ? `${product.price} ₽` : 'Бесплатно';
    if (image) image.src = product.image;

    card.addEventListener('click', () => this.onClick(product.id));
    return card;
  }
}
