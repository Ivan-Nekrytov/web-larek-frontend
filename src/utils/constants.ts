export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;
export const CURRENCY = 'синапсов';
export const CATEGORIES = {
  SOFT: 'софт-скил',
  HARD: 'хард-скил',
  OTHER: 'другое',
  ADDITIONAL: 'дополнительное',
  BUTTON: 'кнопка',
} as const;

export const CATEGORY_CLASS_MAP: Record<string, string> = {
  [CATEGORIES.SOFT]: 'card__category_soft',
  [CATEGORIES.HARD]: 'card__category_hard',
  [CATEGORIES.OTHER]: 'card__category_other',
  [CATEGORIES.ADDITIONAL]: 'card__category_additional',
  [CATEGORIES.BUTTON]: 'card__category_button',
};

export const settings = {

};
