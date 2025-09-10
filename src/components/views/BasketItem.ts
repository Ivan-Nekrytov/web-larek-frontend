export class BasketItem {
  private el: HTMLElement;
  private titleEl: HTMLElement;
  private priceEl: HTMLElement;
  private indexEl: HTMLElement;
  private deleteBtn: HTMLButtonElement;

  constructor(private template: HTMLTemplateElement, private onDelete: () => void) {
    this.el = this.template.content.querySelector('.basket__item')!.cloneNode(true) as HTMLElement;
    this.titleEl = this.el.querySelector('.card__title') as HTMLElement;
    this.priceEl = this.el.querySelector('.card__price') as HTMLElement;
    this.indexEl = this.el.querySelector('.basket__item-index') as HTMLElement;
    this.deleteBtn = this.el.querySelector('.basket__item-delete') as HTMLButtonElement;
    this.deleteBtn.onclick = () => this.onDelete();
  }

  mount(parent: HTMLElement) { parent.append(this.el); }

  update(index: number, title: string, price: number) {
    this.indexEl.textContent = String(index);
    this.titleEl.textContent = title;
    this.priceEl.textContent = `${price} синапсов`;
  }
}