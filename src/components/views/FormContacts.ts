export class FormContacts {
  private template: HTMLTemplateElement;
  private element: HTMLElement;
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;
  private submitButton: HTMLButtonElement;
  private errorsEl: HTMLElement;

  constructor(
    template: HTMLTemplateElement,
    private onSubmit?: (data: { email: string; phone: string }) => void
  ) {
    this.template = template;
    this.element = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.emailInput = this.element.querySelector('input[name="email"]')!;
    this.phoneInput = this.element.querySelector('input[name="phone"]')!;
    this.submitButton = this.element.querySelector('button[type="submit"]') as HTMLButtonElement;
    this.errorsEl = this.element.querySelector('.form__errors')!;

    const validate = () => {
      let errors: string[] = [];

      if (!this.emailInput.value.trim()) {
        errors.push('Введите email');
      } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(this.emailInput.value.trim())) {
        errors.push('Некорректный email');
      }

      if (!this.phoneInput.value.trim()) {
        errors.push('Введите телефон');
      } else if (!/^\+?\d{10,15}$/.test(this.phoneInput.value.trim())) {
        errors.push('Некорректный телефон');
      }

      if (errors.length > 0) {
        this.submitButton.disabled = true;
        this.errorsEl.textContent = errors.join('. ');
      } else {
        this.submitButton.disabled = false;
        this.errorsEl.textContent = '';
      }
    };

    this.emailInput.addEventListener('input', validate);
    this.phoneInput.addEventListener('input', validate);

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      validate();
      if (!this.submitButton.disabled) {
        const email = this.emailInput.value.trim();
        const phone = this.phoneInput.value.trim();
        this.onSubmit?.({ email, phone });
      }
    });
  }

  render(): HTMLElement {
    return this.element;
  }
}
