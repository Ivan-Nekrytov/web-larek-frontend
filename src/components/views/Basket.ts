import { ensureElement } from '../../utils/utils';

export class Basket {
  protected template: HTMLTemplateElement;
  protected templateItem: HTMLTemplateElement;
  protected onSubmit: () => void;
  protected onRemove: (id: string) => void;

  constructor(
    tpl: HTMLTemplateElement,
    tplItem: HTMLTemplateElement,
    onSubmit: () => void,
    onRemove: (id: string) => void
  ) {
    this.template = tpl;
    this.templateItem = tplItem;
    this.onSubmit = onSubmit;
    this.onRemove = onRemove;
  }

  render(items: { id: string; title: string; price: number }[], total: number): HTMLElement {
    const node = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;

    const list = ensureElement<HTMLElement>('.basket__list', node);
    list.innerHTML = '';

    items.forEach((item) => {
      const basketItem = this.templateItem.content.firstElementChild!.cloneNode(true) as HTMLElement;
      const title = ensureElement<HTMLElement>('.card__title', basketItem);
      const price = ensureElement<HTMLElement>('.card__price', basketItem);
      const removeBtn = ensureElement<HTMLButtonElement>('.card__remove', basketItem);

      title.textContent = item.title;
      price.textContent = `${item.price} синапсов`;

      removeBtn.addEventListener('click', () => this.onRemove(item.id));

      list.appendChild(basketItem);
    });

    const totalEl = ensureElement<HTMLElement>('.basket__price', node);
    totalEl.textContent = `${total} синапсов`;

    const submitBtn = ensureElement<HTMLButtonElement>('.basket__button', node);
    submitBtn.addEventListener('click', () => this.onSubmit());

    return node;
  }
}
