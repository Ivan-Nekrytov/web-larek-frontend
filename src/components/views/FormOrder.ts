export class FormOrder {
  private template: HTMLTemplateElement;
  private onSubmit: (data: { payment: string; address: string }) => void;
  private selectedPayment: string | null = null;

  constructor(
    template: HTMLTemplateElement,
    onSubmit: (data: { payment: string; address: string }) => void
  ) {
    this.template = template;
    this.onSubmit = onSubmit;
  }

  render(): HTMLElement {
    const element = this.template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    const form = element as HTMLFormElement;

    const cardBtn = form.querySelector<HTMLButtonElement>('button[name="card"]')!;
    const cashBtn = form.querySelector<HTMLButtonElement>('button[name="cash"]')!;
    const addressInput = form.querySelector<HTMLInputElement>('input[name="address"]')!;
    const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    const updateSubmitState = () => {
      submitBtn.disabled = !(this.selectedPayment && addressInput.value.trim());
    };

    // обработка выбора оплаты
    cardBtn.addEventListener('click', () => {
      this.selectedPayment = 'online';
      cardBtn.classList.add('button_alt-active');
      cashBtn.classList.remove('button_alt-active');
      updateSubmitState();
    });

    cashBtn.addEventListener('click', () => {
      this.selectedPayment = 'onDelivery';
      cashBtn.classList.add('button_alt-active');
      cardBtn.classList.remove('button_alt-active');
      updateSubmitState();
    });

    // обработка адреса
    addressInput.addEventListener('input', updateSubmitState);

    // сабмит
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.selectedPayment) return;
      const address = addressInput.value.trim();
      this.onSubmit({ payment: this.selectedPayment, address });
    });

    return element;
  }
}
