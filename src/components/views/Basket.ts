import { ApiProduct } from '../../types';
import { IEvents } from '../base/events';
import { CURRENCY } from '../../utils/constants';

export class Basket {
  private container: HTMLElement;
  private totalEl: HTMLElement;
  private orderBtn: HTMLButtonElement | null;
  private emptyMessage: HTMLElement | null; // 👈 добавили ссылку

  constructor(private events: IEvents, private template: HTMLTemplateElement) {
    this.container = template.content.firstElementChild!.cloneNode(true) as HTMLElement;

    const totalQuery =
      this.container.querySelector('.basket__total') ||
      this.container.querySelector('.basket__price');
    this.totalEl = totalQuery as HTMLElement;

    if (!this.totalEl) {
      const actions = this.container.querySelector('.modal__actions') || this.container;
      this.totalEl = document.createElement('span');
      this.totalEl.className = 'basket__total';
      actions.appendChild(this.totalEl);
    }

    this.orderBtn = this.container.querySelector('.basket__button') as HTMLButtonElement;
    if (this.orderBtn) {
      this.orderBtn.addEventListener('click', () => {
        this.events.emit('order:open');
      });
    }

    this.emptyMessage = this.container.querySelector('.basket__empty') as HTMLElement;
  }

  render(items: ApiProduct[], total: number): HTMLElement {
    if (this.totalEl) {
      this.totalEl.textContent = `${total} ${CURRENCY}`;
    }

    if (this.orderBtn) {
      this.orderBtn.disabled = items.length === 0;
    }

    if (this.emptyMessage) {
      this.emptyMessage.hidden = items.length !== 0;
    }

    return this.container;
  }
}
