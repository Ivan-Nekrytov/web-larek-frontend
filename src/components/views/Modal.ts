export class Modal {
  private root: HTMLElement;
  private content: HTMLElement;
  private closeBtn: HTMLButtonElement | null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.content = this.root.querySelector('.modal__content')!;
    this.closeBtn = this.root.querySelector('.modal__close');

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.root.addEventListener('click', (e) => {
      if (e.target === this.root) {
        this.close();
      }
    });
  }

  setContent(content: HTMLElement) {
    this.content.innerHTML = '';
    this.content.append(content);
  }

  open() {
    this.root.classList.add('modal_active');
  }

  close() {
    this.root.classList.remove('modal_active');
  }
}
