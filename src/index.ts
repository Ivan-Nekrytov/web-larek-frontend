import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement } from './utils/utils';
import { EventBus } from './components/base/events';
import { ApiClient } from './components/models/ApiClient';
import { CatalogStore } from './components/models/CatalogStore';
import { CartStore } from './components/models/CartStore';
import { CheckoutStore } from './components/models/CheckoutStore';
import { Card } from './components/views/Card';
import { CardPreview } from './components/views/CardPreview';
import { Basket } from './components/views/Basket';
import { FormOrder } from './components/views/FormOrder';
import { FormContacts } from './components/views/FormContacts';
import { Modal } from './components/views/Modal';
import { Success } from './components/views/Success';
import { PaymentMethod } from './types/api';
import { BasketButton } from './components/views/BasketButton';
import { Catalog } from './components/views/Catalog';

const gallery = ensureElement<HTMLElement>('.gallery');
const basketButtonEl = ensureElement<HTMLButtonElement>('.header__basket');
const basketCounterEl = ensureElement<HTMLElement>('.header__basket-counter');
const basketButton = new BasketButton(basketButtonEl, basketCounterEl);
const modalRoot = ensureElement<HTMLElement>('#modal-container');

const tplCard = ensureElement<HTMLTemplateElement>('#card-catalog');
const tplPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const tplBasket = ensureElement<HTMLTemplateElement>('#basket');
const tplBasketItem = ensureElement<HTMLTemplateElement>('#card-basket');
const tplOrder = ensureElement<HTMLTemplateElement>('#order');
const tplContacts = ensureElement<HTMLTemplateElement>('#contacts');
const tplSuccess = ensureElement<HTMLTemplateElement>('#success');


const events = new EventBus();
const api = new ApiClient(API_URL, CDN_URL);
const catalog = new CatalogStore(CDN_URL);
const cart = new CartStore();
const checkout = new CheckoutStore();
const modal = new Modal(modalRoot);
const basket = new Basket(events, tplBasket);
const catalogView = new Catalog(gallery, tplCard);

basketButton.updateCounter(cart.count);

api.getProducts()
  .then((items) => {
    catalog.load(items);
    catalogView.render(catalog.items, (id) => events.emit('card:open', { id }));
  })
  .catch((err) => {
    console.error(err);
    gallery.innerHTML = '<p class="gallery__empty">Не удалось загрузить каталог</p>';
  });

basketButton.onClick(() => events.emit('cart:open'));

events.on('card:open', ({ id }: { id: string }) => {
  const item = catalog.getById(id);
  if (!item) return;

  const preview = new CardPreview(tplPreview, item, cart.has(id));
  preview.setOnToggle(() => {
    if (cart.has(id)) {
      cart.remove(id);
    } else {
      cart.add(item);
    }
    basketButton.updateCounter(cart.count);

    // перерисовать превью после изменения
    const updatedPreview = new CardPreview(tplPreview, item, cart.has(id));
    updatedPreview.setOnToggle(preview['onToggle']!);
    modal.setContent(updatedPreview.render());
  });

  modal.setContent(preview.render());
  modal.open();
});

events.on('cart:open', () => {
  modal.setContent(basket.render(cart.list(), cart.total));
  modal.open();
});

events.on('order:open', () => {
  const form = new FormOrder(tplOrder, ({ payment, address }) => {
    checkout.setPayment(payment as PaymentMethod);
    checkout.setAddress(address);
    events.emit('contacts:open');
  });
  modal.setContent(form.render());
  modal.open();
});

events.on('contacts:open', () => {
  const form = new FormContacts(tplContacts, ({ email, phone }) => {
    checkout.setEmail(email);
    checkout.setPhone(phone);

    const order = {
      payment: checkout.stage1.payment!,
      email: checkout.stage2.email,
      phone: checkout.stage2.phone,
      address: checkout.stage1.address,
      total: cart.total,
      items: cart.ids(),
    };

    api
      .createOrder(order)
      .then((res) => {
        const success = new Success(tplSuccess, () => {
          modal.close();
        });
        modal.setContent(success.render(res.total));
        modal.open();
        cart.clear();
        checkout.reset();
        basketButton.updateCounter(cart.count);
      })
      .catch((err) => {
        console.error(err);
        alert('Не удалось оформить заказ');
      });
  });
  modal.setContent(form.render());
  modal.open();
});

events.on('modal:close', () => modal.close());

basketButton.updateCounter(cart.count);
