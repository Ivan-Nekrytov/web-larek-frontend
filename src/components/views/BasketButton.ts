export class BasketButton {
  private counter: HTMLElement;
  private button: HTMLElement;

  constructor(button: HTMLElement, counter: HTMLElement) {
    this.button = button;
    this.counter = counter;
  }

  updateCounter(count: number) {
    this.counter.textContent = String(count);
  }

  onClick(handler: () => void) {
    this.button.addEventListener('click', handler);
  }
}
