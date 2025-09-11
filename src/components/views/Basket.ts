import { ApiProduct } from '../../types';

export class Basket {
  private template: HTMLTemplateElement;
  private itemTemplate: HTMLTemplateElement;
  private element: HTMLElement;
  private listEl: HTMLElement;
  private totalEl: HTMLElement;
  private orderButton: HTMLButtonElement;

  constructor(
    template: HTMLTemplateElement,
    itemTemplate: HTMLTemplateElement,
    private onCheckout?: () => void,
    private onRemove?: (id: string) => void
  ) {
    this.template = template;
    this.itemTemplate = itemTemplate;
    this.element = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.listEl = this.element.querySelector('.basket__list')!;
    this.totalEl = this.element.querySelector('.basket__price')!;
    this.orderButton = this.element.querySelector('.basket__order') as HTMLButtonElement;
  }

  render(items: ApiProduct[], total: number): HTMLElement {
    this.listEl.innerHTML = '';

    items.forEach((item) => {
      const node = this.itemTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
      node.querySelector('.card__title')!.textContent = item.title;
      node.querySelector('.card__price')!.textContent = item.price ? `${item.price} ₽` : 'Бесценно';
      node.querySelector('.card__delete')!.addEventListener('click', () => this.onRemove?.(item.id));
      this.listEl.appendChild(node);
    });

    this.totalEl.textContent = `${total} ₽`;
    this.orderButton.disabled = items.length === 0;
    this.orderButton.onclick = () => this.onCheckout?.();

    return this.element;
  }
}
