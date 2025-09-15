import { CURRENCY } from './constants';

export function ensureElement<T extends Element>(selector: string, parent: ParentNode = document): T {
  const el = parent.querySelector(selector);
  if (!el) {
    throw new Error(`Element not found: ${selector}`);
  }
  return el as T;
}

export function cloneTemplate<T extends HTMLElement = HTMLElement>(tpl: HTMLTemplateElement): T {
  const fragment = tpl.content.cloneNode(true) as DocumentFragment;
  const node = fragment.firstElementChild as T | null;
  if (!node) throw new Error('Template is empty');
  return node;
}


export function formatPrice(price: number | null): string {
  return price === null ? 'Бесценно' : `${price} ${CURRENCY}`;
}