export class FormOrder {
  private template: HTMLTemplateElement;
  private onSubmit: (data: { payment: string; address: string }) => void;

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

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const payment = (form.querySelector('[name="payment"]:checked') as HTMLInputElement)?.value;
      const address = (form.querySelector('[name="address"]') as HTMLInputElement)?.value;
      this.onSubmit({ payment, address });
    });

    return element;
  }
}
