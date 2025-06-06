# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
Архитектура проекта

    Приложение построено по архитектурному паттерну MVP (Model-View-Presenter).
    Код разделён на три основных слоя:

        Model — управляет данными (товары, корзина, заказ).
        View — отвечает за отображение компонентов интерфейса и работу с DOM.
        Presenter — связывает View и Model, обрабатывает действия пользователя.

  Основные компоненты

    Model:

          ProductModel — представляет товар, содержит его характеристики.
          CartModel — управляет содержимым корзины.
          OrderModel — хранит информацию о заказе.

    View:

          ProductCardView — карточка товара.
          CartView — окно с корзиной.
          CheckoutStep1View, CheckoutStep2View — шаги оформления заказа.
          ModalView, FormView — базовые компоненты для повторного использования.

    Presenter:

          ProductListPresenter — отвечает за отображение списка товаров.
          CartPresenter — обрабатывает действия пользователя в корзине.
          CheckoutPresenter — управляет процессом оформления заказа.

    Утилиты:

          EventEmitter — реализует событийную модель.
          ApiClient — выполняет HTTP-запросы к серверу.

    Типы данных:

        Типы и интерфейсы хранятся в директории src/types/. В проекте описаны:

          Объекты, приходящие от API.
          Объекты, отображаемые на экране.
          Интерфейсы моделей, отображений и API-клиента.
          Перечисления событий и их интерфейсы (для брокера событий).

    Взаимодействие компонентов

          Presenter слушает события от View и обновляет Model.
          Изменения Model передаются обратно в View через события или колбэки.
          View отображает актуальное состояние на основе данных Model. 
          

Компоненты и структура проекта
    Models (src/models/)

        CartModel: управляет состоянием корзины: добавление, удаление товаров, расчёт суммы.
        ProductModel (если будет): отвечает за выбор и хранение текущего товара.

    Views (src/components/)

        CardComponent: отображает карточку товара. Подписывается на событие клика и отправляет сигнал в Presenter.
        ModalComponent: базовый компонент модального окна.
        CartView: отображает содержимое корзины.
        CheckoutStep1View / CheckoutStep2View: формы для оформления заказа (шаги 1 и 2).

    Event Broker (src/services/events.ts)

        EventEmitter: реализует подписку и отправку пользовательских событий между слоями. Позволяет изолировать части приложения.

          on(event: string, callback: Function): void;
          emit(event: string, data?: unknown): void;
          off(event: string, callback: Function): void;

    API-клиент (src/services/api.ts)

        Отвечает за получение товаров с сервера и отправку заказов.

          getProducts(): Promise<ApiProduct[]>;
          postOrder(order: ApiOrder): Promise<{ id: string }>;

    Презентеры / Контроллеры (src/pages/)

        CatalogPage: управляет отображением каталога и взаимодействием между карточками и корзиной.
        CheckoutPage: управляет переходами между шагами оформления заказа.
        Используют EventEmitter и модели данных.

Типы данных

    В проекте используется типизация всех сущностей и действий. Ниже описаны ключевые типы и интерфейсы.

    Типы данных от API (api.ts)

        export interface ApiProduct {
          id: string;
          title: string;
          description: string;
          price: number;
          category: string;
          image: string;
        }

        export interface ApiOrder {
          payment: string; // "online" | "cash"
          address: string;
          email: string;
          phone: string;
          items: string[];
        }

        Эти типы описывают, что возвращает сервер (ApiProduct) и что отправляется на сервер при оформлении заказа (ApiOrder).

    Типы моделей (models.ts)

        export interface Product extends ApiProduct {
          isInCart: boolean;
        }

        export interface CartItem {
          id: string;
          title: string;
          price: number;
        }

        Типы моделей отражают данные в приложении. Например, Product расширяет ApiProduct, добавляя признак isInCart, чтобы отразить локальное состояние.

    Типы отображений (views.ts)

        export interface IView {
          render(data: unknown): void;
          show(): void;
          hide(): void;
        }

        Интерфейс IView описывает базовое поведение компонентов отображения.

    Событийная система

        В проекте используется брокер событий (`EventEmitter`) для связи между слоями приложения.  
        Все события типизированы через `EventType` и `EventPayloadMap`.

      
        export type EventType =
                | 'product:select'
                | 'cart:add'
                | 'cart:remove'
                | 'cart:clear'
                | 'order:submit'
                | 'order:success'
                | 'order:error'
                | 'modal:open'
                | 'modal:close'

        export interface EventPayloadMap {
                'product:select': { id: string }
                'cart:add': { product: Product }
                'cart:remove': { id: string }
                'cart:clear': void
                'order:submit': { data: ApiOrder }
                'order:success': { id: string }
                'order:error': { message: string }
                'modal:open': { content: HTMLElement }
                'modal:close': void
        }

        Примеры использования
        Событие	                Эмитит	                Обрабатывает	        Назначение
        product:select	        ProductCardView	        ModalPresenter	        Открыть карточку товара
        cart:add	        ProductCardView	        CartPresenter	        Добавить товар в корзину
        cart:remove	        CartView	        CartPresenter	        Удалить товар из корзины
        cart:clear	        OrderModel	        CartPresenter	        Очистить корзину после успешного заказа
        order:submit	        OrderFormView	        OrderPresenter	        Отправить заказ
        order:success	        OrderModel	        SuccessOrderView	Показать сообщение об успешном заказе
        order:error	        OrderModel	        OrderFormView	        Показать ошибки валидации
        modal:open	        Любой компонент	        ModalView	        Показать модалку с переданным содержимым
        modal:close	        ModalView, кнопка	ModalView	        Закрыть текущее модальное окно

    API-клиент (api-client.ts)

        export interface IApiClient {
          getProductList(): Promise<ApiProduct[]>;
          getProductById(id: string): Promise<ApiProduct>;
          createOrder(order: ApiOrder): Promise<{ id: string }>;
        }

        Интерфейс IApiClient описывает взаимодействие с сервером. В проекте реализуется его конкретная реализация.


Взаимодействие компонентов

    В архитектуре используется паттерн MVP (Model-View-Presenter) с брокером событий для слабой связанности. Компоненты приложения взаимодействуют через событийную шину (EventEmitter), а не напрямую.

    Модель (Model)
      Модель отвечает за данные приложения:

        загрузку товаров с сервера;
        отслеживание содержимого корзины;
        создание заказа.

        Примеры классов: ProductModel, CartModel.
        Модели не знают о представлении и презентере.

    Представление (View)
      Отображает состояние интерфейса. Умеет только показывать и скрывать элементы и обновлять данные.

        Примеры: ProductCardView, CartView, OrderFormView.
        Не знает о бизнес-логике или других частях приложения.

    Презентер (Presenter)
      Соединяет модель и представление. Реагирует на события от пользователя и меняет модель и/или представление.

        Пример: AppPresenter, который управляет переключением экранов, получением данных и оформлением заказа.
        Брокер событий

        Для обмена событиями используется EventEmitter. Это позволяет:

            моделям сообщать об изменениях (например, "товар добавлен в корзину");
            представлениям реагировать на действия пользователя ("пользователь нажал кнопку");
            презентеру подписываться на оба источника событий и координировать их.

      Такой подход делает систему модульной и гибкой.

Компоненты отображения (View)

    Компоненты отображения отвечают за работу с DOM-элементами и предоставляют методы для обновления интерфейса. Каждый компонент имеет строго ограниченную зону ответственности и не содержит бизнес-логики.

      Базовый компонент View

        Родительский абстрактный класс для всех компонентов интерфейса. Содержит общие методы:

            поиск элементов в шаблоне;
            показ и скрытие;
            подписка на события;
            рендеринг HTML.

        Это позволяет избежать дублирования кода и соблюдать принцип переиспользуемости.

    ProductCardView

        Назначение:  
                Отображает одну карточку товара: изображение, название, цену, кнопку «Купить». Эмитит события при клике.

                Конструктор:
                     constructor(container: HTMLElement, emitter: EventEmitter)

                Поля:

                        private container: HTMLElement
                        private product: Product
                        private emitter: EventEmitter

                Методы:

                        render(product: Product): void // Отображает товар в карточке

                        bindEvents(): void // Навешивает обработчики клика

                        show(): void
                        hide(): void



    ProductListView

        Контейнер для списка карточек. Умеет:

            отрисовывать массив товаров;
            очищать список;
            обновлять содержимое.

    CartView

        Назначение:  
                Отображает модальное окно корзины со списком товаров и общей суммой. Показывает/скрывает окно. Управляет кликами по кнопкам "убрать", "оформить заказ".

                Конструктор:
                        constructor(container: HTMLElement, emitter: EventEmitter)

                Поля:

                        private container: HTMLElement
                        private emitter: EventEmitter

                Методы:

                        render(items: CartItem[]): void // Отображает товары в корзине

                     show(): void
                        hide(): void

                        bindEvents(): void // Назначает обработчики кликов

                        setTotal(price: number): void // Обновляет отображение суммы

    ModalView

                Назначение:  
                        Базовый компонент для отображения модальных окон. Позволяет вставлять внутрь любое содержимое.

                Конструктор:
                        constructor(container: HTMLElement)

                Поля:

                        private container: HTMLElement
                        private content: HTMLElement

                Методы:

                        setContent(content: HTMLElement): void // Заменяет содержимое модального окна

                        open(): void
                        close(): void
                        bindCloseEvents(): void // Назначает закрытие по крестику и клику вне окна

    OrderFormView

        Назначение:  
                Представляет форму заказа: два шага (адрес и способ оплаты, контактные данные). Отображает поля, ошибки, управляет валидацией внешне (UI).

                Конструктор:
                        constructor(step: 1 | 2, emitter: EventEmitter)

                Поля:

                        private step: 1 | 2
                        private emitter: EventEmitter
                        private errors: Record<string, string>

                Методы:

                        render(data?: Record<string, string>): void // Отображает форму (с полями и ошибками)

                        getData(): Record<string, string> // Возвращает значения полей

                        setErrors(errors: Record<string, string>): void // Показывает ошибки, полученные от модели

                        show(): void
                        hide(): void

        HeaderView
                Назначение:  
                        Отображает кнопку «Корзина» с количеством товаров. Эмитит событие при клике по кнопке.

                Конструктор:
                        constructor(container: HTMLElement, emitter: EventEmitter)

                Поля:

                        private container: HTMLElement
                        private counter: HTMLElement
                        private emitter: EventEmitter

                Методы:

                        updateCounter(count: number): void // Обновляет счётчик товаров

                        bindEvents(): void // Назначает обработчик на кнопку

                        show(): void
                        hide(): void                        

        SuccessOrderView

                Назначение:
                        Модальное окно с сообщением об успешном заказе. Отображает номер заказа и кнопку «Продолжить».

                Конструктор:
                        constructor(container: HTMLElement)

                Поля:

                        private container: HTMLElement

                Методы:

                        render(orderId: string): void // Показывает сообщение и номер заказа

                        bindEvents(): void // Назначает обработчик на кнопку

                        show(): void
                        hide(): void


Модели данных (Model)

    Модели содержат бизнес-логику и обрабатывают данные, не завися от пользовательского интерфейса. Они взаимодействуют с API и уведомляют другие компоненты через события (EventEmitter).

    ProductModel

        Назначение:  
                Модель хранения и доступа к каталогу товаров. Загружает список с сервера, предоставляет методы доступа к данным.


        Конструктор:
                constructor(api: IApiClient)

        Поля:
                private products: Product[]  // Список всех товаров

        Методы:
                loadProducts(): Promise<void>  // Загружает товары с сервера и сохраняет в поле products.

                getAll(): Product[]  // Возвращает список всех товаров.

                getById(id: string): Product | undefined  // Возвращает товар по его ID.

    CartModel

        Назначение:  
                Модель управления корзиной. Хранит список добавленных товаров, рассчитывает общую стоимость, управляет добавлением и удалением.

        Конструктор:
                constructor()

        Поля:
                private items: CartItem[]  // Товары в корзине

        Методы:
                addItem(item: CartItem): void  // Добавляет товар в корзину. Если товар уже есть — не добавляет повторно.

                removeItem(productId: string): void // Удаляет товар по его ID.

                clear(): void  // Очищает всю корзину.

                getItems(): CartItem[]  // Возвращает текущие товары в корзине.

                getTotal(): number  // Возвращает общую стоимость всех товаров.

                isInCart(productId: string): boolean  // Проверяет, добавлен ли товар в корзину.

        Также отправляет события: cart:updated, cart:cleared.

    OrderModel

        Назначение:  
                Модель оформления заказа. Хранит данные из формы, валидирует их, отправляет заказ на сервер.
            
        Конструктор:
                constructor(api: IApiClient)

        Поля:
                private payment: 'online' | 'cash'
                private address: string
                private email: string
                private phone: string
                private items: string[]  // ID товаров

        Методы:

                setStep1(data: { payment: 'online' | 'cash'; address: string }): void  // Сохраняет способ оплаты и адрес.

                setStep2(data: { email: string; phone: string }): void  // Сохраняет контактные данные.

                validate(): { valid: boolean; errors: Record<string, string> }  // Проверяет все поля. Возвращает статус и ошибки по полям.

                submit(): Promise<{ id: string }>  // Отправляет заказ на сервер через API.

        Также генерирует события: order:submitted, order:error.

    ApiClient

        Назначение:
                Класс для выполнения сетевых запросов к серверу. Обёртка над HTTP API. Используется моделями (`ProductModel`, `OrderModel`), но не зависит от интерфейса.

        Конструктор:
                constructor(baseUrl: string)

        Поля:
                private baseUrl: string  // Базовый адрес API

        Методы:

                getProductList(): Promise<ApiProduct[]> // Загружает список товаров

                getProductById(id: string): Promise<ApiProduct> // Загружает один товар по ID

                createOrder(order: ApiOrder): Promise<{ id: string }> // Отправляет заказ на сервер

Взаимодействие частей приложения

    Общая архитектура

    Приложение реализовано в архитектурном паттерне MVP (Model–View–Presenter):

        Model (Модель): хранит и управляет состоянием данных (например, корзина).
        View (Представление): отображает данные и предоставляет интерфейс взаимодействия с пользователем.
        Presenter (Презентер): соединяет модель и представление, управляет логикой взаимодействий.

    Основные сущности и их взаимодействие

        Пользователь взаимодействует с View (например, нажимает кнопку "Добавить в корзину").
        View отправляет событие (например, cart:add), которое обрабатывается Presenter'ом.
        Presenter вызывает соответствующий метод у Model, чтобы изменить данные (например, cartModel.addItem()).
        После обновления модели Presenter передаёт обновлённые данные обратно во View через render().
        View обновляет интерфейс.

    Поток данных

    Пример: пользователь добавляет товар в корзину.

    [Пользователь кликает по товару]
              ↓
    [ProductCardView] → отправляет → событие 'cart:add'
              ↓
    [CartPresenter] → вызывает → cartModel.addItem()
              ↓
    [CartModel] → обновляет список items
              ↓
    [CartPresenter] → вызывает → cartView.render(items)
              ↓
    [CartView] → обновляет отображение корзины

    Связь через события

    Взаимодействие между компонентами реализовано через событийную систему:

        События описаны в файле src/types/events.ts.

        Каждый тип события (EventType) связан с определёнными данными (EventPayloadMap).

        Presenter подписывается на события и реагирует на них.

        Это обеспечивает слабое связывание между частями приложения.

    Разделение ответственности

      Слой	          Назначение

      Model	          Хранит бизнес-логику (например, управление корзиной).
      View	          Отвечает за отображение данных и сбор пользовательского ввода.
      Presenter	      Управляет бизнес-логикой, обновляет модель и представление.
      ApiClient	      Выполняет запросы к серверу, не зависит от UI или модели.
      Типы	          Описывают данные, интерфейсы и события; обеспечивают безопасность типов.

Структура компонентов и моделей данных

    Проект построен по архитектуре MVP (Model-View-Presenter), и включает в себя следующие ключевые элементы:

    Модели (Model)

        Модели отвечают за бизнес-логику и хранение состояния.

            CartItem — интерфейс одного элемента в корзине. Содержит id, title, price и quantity.
            CartModel — интерфейс модели корзины. Позволяет добавлять, удалять и очищать товары, а также считать общую сумму.

    Отображения (View)

        Отвечают за взаимодействие с DOM: отображение данных, показ/скрытие UI.

            View — базовый интерфейс всех представлений. Содержит методы render(data), show(), hide().

    API

        Слой для общения с сервером, не зависящий от UI.

            IApiClient — интерфейс API-клиента. Содержит методы getProductList(), getProductById(id), createOrder(order).
            ApiProduct — структура товара, приходящего с сервера.
            ApiOrder — структура заказа, отправляемого на сервер.

    Брокер событий

        Позволяет частям приложения общаться между собой, не зная друг о друге напрямую.

            EventType — список возможных событий (например, product:select, cart:add).
            EventPayloadMap — типы данных, которые передаются с каждым событием.

    Презентеры (управляющий слой)

        Презентеры связывают модели и представления: получают события от View, вызывают методы моделей, обновляют UI.


Интерфейс API-клиента

      Интерфейс `IApiClient` описывает контракт взаимодействия с сервером. Он выделен отдельно от реализации, чтобы повысить гибкость и соблюсти принципы слабой связанности.

        interface IApiClient {
          getProductList(): Promise<ApiProduct[]>;
          getProductById(id: string): Promise<ApiProduct>;
          createOrder(order: ApiOrder): Promise<{ id: string }>;
        }

    Методы:

        getProductList() — получает список всех товаров.
        getProductById(id) — получает подробную информацию о товаре.
        createOrder(order) — оформляет заказ, отправляя данные пользователя и корзины.

      Интерфейс используется в модели заказа и модели каталога, чтобы те не зависели напрямую от реализации клиента. Это позволяет легко подменить API на мок в тестах или на другую версию сервера.