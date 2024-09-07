[![Netlify Status](https://api.netlify.com/api/v1/badges/2a668cd5-3654-4c56-a540-19a633e37d11/deploy-status)](https://app.netlify.com/sites/praktikum-timur233/deploys)


## Проектная работа 3-й спринт

Ссылка на развернутое приложение: https://praktikum-timur233.netlify.app/

Ссылка на макет Figma: https://www.figma.com/design/oTk9ZR7RWDP9qwCUY03H1q/Practicum-sprint-1?node-id=0-1&t=opYGE62FZeSNiRjx-1

## Описание

- Макет отрисовал отталкиваясь от представленного макета на курсе и собственных наработок.
- Отверстал все страницы по макету, на главную добавил список ссылок на все страницы для удобной навигации. По возможности старался выносить некоторые блоки, которые возможно будут использоваться где-то еще в проекте в отдельные компоненты. 
- Подключил шаблонизатор Handlebars. Так как я использовал подход при котором компиляция и рендеринг происходит на сервере, пришлось разместить все компоненты сайта в одной папке.
- Внедрил компонентный подход, классы Сomponent, EventBus, PropsManager
- Добавил класс для работы с сервером. HTTPTransport, HTTPResponse
- Добавил в проект линтеры Eslint, Stylelint
- Создал класс для работы страниц
- Внедрил АПИ чата 
- Пересмотрел список страниц
- Дополнил нужными компонентами (preloader, modal)

## Структура проекта

```bash
project-root/
│
├── src/
│   ├── api
│   │   ├── AuthAPI.ts
│   │   ├── BaseAPI.ts
│   │   ├── ChatsAPI.ts
│   │   ├── MessingerWS.ts
│   │   ├── types.ts
│   │   ├── UserAPI.ts
│   │   └── ResourcesAPI.ts
│   ├── components/
│   │   ├── auth-form/
│   │   │   ├── auth-form.scss
│   │   │   ├── auth-form.tmpl.ts
│   │   │   └── auth-form.ts
│   │   ├── button
│   │   ├── change-avatar
│   │   ├── change-data-form
│   │   ├── form-group
│   │   └── user-data-form
│   ├── layout/
│   │   └── main/
│   │   │   ├── main.scss
│   │   │   ├── main.tmpl.ts
│   │   │   └── main.ts
│   ├── modules/
│   │   ├── error-message/
│   │   │   ├── error-message.scss
│   │   │   ├── error-message.tmpl.ts
│   │   │   └── error-message.ts
│   │   ├── profile-navigation
│   │   └── site-navigation
│   ├── pages/
│   │   ├── messenger/
│   │   │   ├── components/
│   │   │   ├── modules/
│   │   │   │   └── module/
│   │   │   │       └── components/
│   │   │   └── PageMessenger.ts
│   │   ├── error-not-found
│   │   ├── error-server
│   │   ├── settings
│   │   ├── settings-change-data
│   │   ├── settings-change-password
│   │   ├── sign-in
│   │   └── sign-up
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── index.html
│   └── index.ts
│
├── static/
│   ├── assets/
│   │   └── icons.svg
│   └── favicon.png
│
├── dist/
├── node_modules/
│
├── README.md
├── .gitignore
├── .editorconfig
├── .eslintignore
├── .eslintrc.cjs
├── stylelint.config.cjs
├── netlify.toml
├── vite-plugin-handlebars.d.ts
├── vite.config.ts
├── tsconfig.json
├── package-lock.json
└── package.json
```

## Стек

- ViteJS
- Handlebars
- SCSS
- SVG
- Eslint, Stylelint

## Установка проекта

```bash
npm install
```

## Основные команды

```bash
npm run lint — запуск линтеров
npm run dev — запуск версии для разработчика
npm run start — запуск проекта
npm run build — сборка стабильной версии
```
