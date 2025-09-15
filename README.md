# Веб-ларёк

**Веб-ларёк** — демонстрационное frontend-приложение на TypeScript.  
Позволяет просматривать каталог товаров, открывать карточку в модальном окне, добавлять товары в корзину и оформлять заказ через пошаговую форму.

---

## Технологии
- TypeScript
- Webpack
- SCSS (BEM-подход)
- Нативный DOM API
- Архитектура на основе разделения на модели, представления и событийную шину

---

## Установка и запуск

### Требования
- Node.js версии 14 или выше
- npm или yarn

### Установка зависимостей
```bash
npm install
# или
yarn
Запуск в режиме разработки
bash
Копировать код
npm run dev
Сборка проекта
bash
Копировать код
npm run build
Артефакты сборки будут находиться в папке dist/.

Дополнительные команды
npm run lint — проверка кода линтером

npm run lint:fix — автоматическое исправление ошибок линтера

npm run format — форматирование кода с помощью Prettier

Структура проекта
csharp
Копировать код
src/
  components/
    base/       # Базовые классы (Api, EventBus и др.)
    models/     # Логика данных: CatalogStore, CartStore, CheckoutStore, ApiClient
    views/      # UI-компоненты: модальные окна, карточки, формы
  common.blocks/ # SCSS-блоки (BEM)
  utils/        # Вспомогательные функции
  types/        # Описания типов и интерфейсов
  index.ts      # Точка входа в приложение
webpack.config.js
tsconfig.json
Архитектура
Приложение разделено на несколько слоёв:

Модель (stores) — хранение и управление состоянием (каталог, корзина, данные заказа).

Отображение (views) — компоненты, отвечающие за работу с DOM и UI.

Коммуникация — через шину событий EventBus, что обеспечивает слабую связность.

API-слой — отдельные классы для работы с сервером (Api, ApiClient).

Основные классы и интерфейс
Api
Файл: components/base/api.ts

Базовый класс для HTTP-запросов.

Методы: get<T>(path), post<T>(path, body), request<T>(path, options).

ApiClient
Файл: components/models/ApiClient.ts

Работа с сервером на уровне приложения.

Методы: getProducts(), getProduct(id), createOrder(order).

EventBus
Файл: components/base/events.ts

Реализует pub/sub для событий.

Методы: on, off, once, emit.

CatalogStore
Хранит список товаров.

Методы: load(items), getById(id), геттер items.

CartStore
Управление корзиной.

Методы: add(product), remove(id), clear(), геттеры count, total.

CheckoutStore
Хранит данные заказа (оплата, адрес, контакты).

Методы: setPayment, setAddress, setEmail, setPhone, reset.

Modal
Управление модальными окнами.

Методы: setContent(element), open(), close().

Card / CardPreview
Компоненты карточки товара.

Отображение в списке и в модальном окне с детальной информацией.

Basket и BasketButton
Отображение корзины и кнопки корзины.

Поддержка счётчика, списка товаров, итоговой суммы.

FormOrder / FormContacts / Success
Формы оформления заказа по шагам: выбор оплаты и адреса, ввод контактов, подтверждение заказа.

Типы данных
Типы описаны в директории src/types/. Основные:

ApiProduct — товар (id, title, description, image, price, category)

OrderRequest — данные заказа

OrderResponse — ответ сервера

PaymentMethod — способ оплаты

IApiClient — интерфейс клиента API

Логика работы приложения
При запуске загружается список товаров через ApiClient.getProducts().

Данные сохраняются в CatalogStore и отображаются компонентом Catalog.

При клике на карточку товара открывается модальное окно CardPreview.

Пользователь может добавить/удалить товар из корзины (CartStore).

Кнопка корзины (BasketButton) показывает количество товаров, а модальное окно Basket — список и итоговую стоимость.

При оформлении заказа открываются формы (FormOrder, FormContacts), после чего запрос отправляется на сервер.

При успешном заказе корзина очищается, и отображается окно Success.