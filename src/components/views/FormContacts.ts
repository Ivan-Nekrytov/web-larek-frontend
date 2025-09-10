export class FormContacts {
  private template: HTMLTemplateElement;
  private element: HTMLElement;
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;
  private submitButton: HTMLButtonElement;

  constructor(
    template: HTMLTemplateElement,
    private onSubmit?: (data: { email: string; phone: string }) => void
  ) {
    this.template = template;
    this.element = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.emailInput = this.element.querySelector('input[name="email"]')!;
    this.phoneInput = this.element.querySelector('input[name="phone"]')!;
    this.submitButton = this.element.querySelector('button[type="submit"]') as HTMLButtonElement;

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = this.emailInput.value.trim();
      const phone = this.phoneInput.value.trim();
      if (email && phone) {
        this.onSubmit?.({ email, phone });
      }
    });
  }

  render(): HTMLElement {
    return this.element;
  }
}
