export class Success {
  private template: HTMLTemplateElement;
  private element: HTMLElement;
  private totalEl: HTMLElement;
  private closeButton: HTMLButtonElement;

  constructor(
    template: HTMLTemplateElement,
    private onClose?: () => void
  ) {
    this.template = template;
    this.element = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.totalEl = this.element.querySelector('.success__total')!;
    this.closeButton = this.element.querySelector('.success__close') as HTMLButtonElement;

    this.closeButton.onclick = () => this.onClose?.();
  }

  render(total: number): HTMLElement {
    this.totalEl.textContent = `${total} ₽`;
    return this.element;
  }
}
