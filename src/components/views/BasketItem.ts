import { ApiProduct } from '../../types';
import { IEvents } from '../base/events';
import { CURRENCY } from '../../utils/constants';

export class BasketItem {
  constructor(private events: IEvents, private template: HTMLTemplateElement) {}

  render(data: ApiProduct & { index: number }): HTMLElement {
    const el = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    const indexEl = el.querySelector('.basket__item-index');
    if (indexEl) indexEl.textContent = `${data.index}.`;
    const titleEl = el.querySelector('.card__title');
    if (titleEl) titleEl.textContent = data.title;
    const priceEl = el.querySelector('.card__price');
    if (priceEl) priceEl.textContent = `${data.price} ${CURRENCY}`;
    const removeBtn = el.querySelector('.basket__item-delete');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
    this.events.emit('cart:remove', { id: data.id });
    });
    }

    return el;
  }
}
