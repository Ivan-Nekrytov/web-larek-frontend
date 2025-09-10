export class Modal {
  private root: HTMLElement;
  private container: HTMLElement;
  private content: HTMLElement;
  private closeBtn: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.container = this.root.querySelector('.modal__container') as HTMLElement;
    this.content = this.root.querySelector('.modal__content') as HTMLElement;
    this.closeBtn = this.root.querySelector('.modal__close') as HTMLElement;

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);

    this.container.addEventListener('click', (e) => e.stopPropagation());
    this.root.addEventListener('click', this.onOverlayClick);
    this.closeBtn.addEventListener('click', this.onCloseClick);
  }

  private onOverlayClick() {
    this.close();
  }

  private onCloseClick() {
    this.close();
  }

  public setContent(content: HTMLElement): void {
    this.content.innerHTML = '';
    this.content.append(content);
  }

  public open(): void {
    this.root.classList.add('modal_active');
  }

  public close(): void {
    this.root.classList.remove('modal_active');
    this.content.innerHTML = '';
  }
}
