import { CATEGORY_CLASS_MAP, CATEGORIES } from '../utils/constants';

export function applyCategory(el: HTMLElement | null, category?: string) {
  if (!el) return;

  el.className = 'card__category';

  const normalized = category ?? CATEGORIES.OTHER;

  el.textContent = normalized;

  const cls = CATEGORY_CLASS_MAP[normalized] || CATEGORY_CLASS_MAP[CATEGORIES.OTHER];
  el.classList.add(cls);
}