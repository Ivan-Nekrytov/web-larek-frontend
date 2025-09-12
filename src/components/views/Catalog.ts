import { ApiProduct } from '../../types';
import { Card } from './Card';

export class Catalog {
  private container: HTMLElement;
  private tplCard: HTMLTemplateElement;

  constructor(container: HTMLElement, tplCard: HTMLTemplateElement) {
    this.container = container;
    this.tplCard = tplCard;
  }

  render(items: ApiProduct[], onCardClick: (id: string) => void) {
    this.container.innerHTML = '';
    items.forEach((item) => {
      const card = new Card(this.tplCard, onCardClick);
      this.container.append(card.render(item));
    });
  }
}
