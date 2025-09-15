import { validateContact } from './Validator';

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

    const validateAndSet = () => {
      const data = {
        email: this.emailInput.value.trim(),
        phone: this.phoneInput.value.trim(),
      };
      const errors = validateContact(data);
      this.setErrors(errors);
    };

    this.emailInput.addEventListener('input', validateAndSet);
    this.phoneInput.addEventListener('input', validateAndSet);

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      validateAndSet();
      if (!this.submitButton.disabled) {
        const email = this.emailInput.value.trim();
        const phone = this.phoneInput.value.trim();
        this.onSubmit?.({ email, phone });
      }
    });

    validateAndSet();
  }

  setErrors(errors: string[]) {
    if (errors.length > 0) {
      this.submitButton.disabled = true;
      this.errorsEl.textContent = errors.join('. ');
    } else {
      this.submitButton.disabled = false;
      this.errorsEl.textContent = '';
    }
  }

  render(): HTMLElement {
    return this.element;
  }
}
