import { ApiProduct } from '../../types';
import { IEvents } from '../base/events';

export class BasketItem {
  constructor(private events: IEvents) {}

  render(data: ApiProduct & { index: number }): HTMLElement {
    const el = document.createElement('li');
    el.classList.add('basket__item');

    el.innerHTML = `
      <span class="basket__index">${data.index}.</span>
      <span class="basket__title">${data.title}</span>
      <span class="basket__price">${data.price} ₽</span>
      <button class="basket__remove" aria-label="Удалить товар">×</button>
    `;

    const removeBtn = el.querySelector('.basket__remove');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        this.events.emit('basket:remove', data.id);
      });
    }

    return el;
  }
}
