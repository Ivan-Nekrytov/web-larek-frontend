import { CURRENCY } from "../../utils/constants";

export class Success {
  private element: HTMLElement;
  private closeButton: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, onClose: () => void) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.closeButton = this.element.querySelector('.order-success__close')!;
    this.closeButton.onclick = onClose;
  }

  render(total: number): HTMLElement {
    this.element.querySelector('.order-success__description')!.textContent = `Списано ${total} ${CURRENCY}`;
    return this.element;
  }
}

