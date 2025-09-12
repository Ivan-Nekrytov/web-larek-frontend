import { ApiProduct } from '../../types';
import { BasketItem } from './BasketItem';
import { IEvents } from '../base/events';

export class Basket {
  private container: HTMLElement;
  private listEl: HTMLElement;
  private totalEl: HTMLElement;
  private orderBtn: HTMLButtonElement | null;

  constructor(private events: IEvents, private template: HTMLTemplateElement) {
    this.container = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.listEl = this.container.querySelector('.basket__list') as HTMLElement;
    const totalQuery =
      this.container.querySelector('.basket__total') ||
      this.container.querySelector('.basket__price');
    this.totalEl = totalQuery as HTMLElement;

    // кнопка "Оформить"
    this.orderBtn = this.container.querySelector('.basket__button') as HTMLButtonElement;
    if (this.orderBtn) {
      this.orderBtn.addEventListener('click', () => {
        this.events.emit('order:open');
      });
    }

    // Fallbacks
    if (!this.listEl) {
      this.listEl = document.createElement('ul');
      this.listEl.className = 'basket__list';
      this.container.appendChild(this.listEl);
    }

    if (!this.totalEl) {
      const actions = this.container.querySelector('.modal__actions') || this.container;
      this.totalEl = document.createElement('span');
      this.totalEl.className = 'basket__total';
      actions.appendChild(this.totalEl);
    }
  }

  render(items: ApiProduct[], total: number): HTMLElement {
    this.listEl.innerHTML = '';

    items.forEach((item, index) => {
      const basketItem = new BasketItem(this.events);
      const basketItemEl = basketItem.render({
        ...item,
        index: index + 1,
      });
      this.listEl.appendChild(basketItemEl);
    });

    this.totalEl.textContent = `${total} ₽`;
    return this.container;
  }
}
