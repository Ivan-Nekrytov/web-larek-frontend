# Web Larek Frontend

Учебный проект интернет-магазина.  
Реализован каталог товаров, корзина, оформление заказа и взаимодействие с API.

Структура проекта
src/
├── components/
│   ├── base/               # базовые утилиты и события
│   │   └── events.ts
│   ├── models/             # слой данных (хранилища, API)
│   │   ├── ApiClient.ts
│   │   ├── CatalogStore.ts
│   │   ├── CartStore.ts
│   │   └── CheckoutStore.ts
│   └── views/              # представления (UI-компоненты)
│       ├── Card.ts
│       ├── CardPreview.ts
│       ├── Basket.ts
│       ├── FormOrder.ts
│       ├── FormContacts.ts
│       ├── Modal.ts
│       └── Success.ts
├── scss/                   # стили
│   └── styles.scss
├── types/                  # типы данных
│   └── api.ts
├── utils/                  # утилиты
│   ├── constants.ts
│   └── utils.ts
└── index.ts                # точка входа

Архитектура

Проект реализован в архитектурном стиле MVP (Model-View-Presenter).

Модель (Models)

ApiClient — работа с API.

CatalogStore — хранение и управление каталогом.

CartStore — корзина (добавление, удаление, подсчёт суммы и количества).

CheckoutStore — хранение данных заказа.

Представления (Views)

Card — карточка товара в каталоге.

CardPreview — модальное окно превью товара с кнопкой добавления/удаления.

Basket — корзина (список товаров, кнопка оформления).

FormOrder — форма выбора оплаты и адреса.

FormContacts — форма ввода email и телефона.

Modal — базовое модальное окно (методы open, close, setContent).

Success — окно успешного оформления заказа.

Связь

EventBus реализует обмен событиями между модулями.

index.ts — главный файл, который связывает модели и представления через события.