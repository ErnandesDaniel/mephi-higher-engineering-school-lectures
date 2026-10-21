# Vite: карточки из базы

Источник: `lecture-1/database.db` → таблицы `web_pages` и `web_pages_cards`.

Всего: 28 страниц, 143 карточки — три блока: **Vite** (10/85), **Vite+** (13/46), **Oxc** (5/12).

Формат: **Q** — вопрос, **A** — ответ; нумерация Q/A своя внутри каждой страницы.


---

## Vite

Страниц: 10 · карточек: 85


### Создание проекта через Vite

`https://vite.dev/guide/` · 2 карточки


**Q1.** Как создать проект через Vite?

**A1.** `npm create vite@latest`.


**Q2.** Как установить Vite в существующий проект?

**A2.** `npm install -D vite`.


### Vite config

`https://vite.dev/config/` · 10 карточек


**Q1.** Как называется файл конфига Vite для TS-проекта?

**A1.** `vite.config.ts`.


**Q2.** Как выглядит минимальный конфиг Vite для TS-проекта?

**A2.** `import { defineConfig } from 'vite'; export default defineConfig({});`


**Q3.** Что экспортирует `vite.config.ts`, если конфиг зависит от команды?

**A3.** Функцию: `export default defineConfig(({ command }) => ({ ... }))`.


**Q4.** Чему равно `command` при запуске `vite` (dev-режим)?

**A4.** `serve`.


**Q5.** Чему равно `command` при запуске `vite build`?

**A5.** `build`.


**Q6.** Почему `.env` недоступны в `vite.config.ts` через `process.env`?

**A6.** Vite откладывает загрузку `.env`: набор файлов зависит от самого конфига.


**Q7.** Что доступно в `process.env` внутри `vite.config.ts`?

**A7.** Только переменные окружения операционной системы.


**Q8.** Что такое `process.env` в Node.js?

**A8.** Глобальный объект Node.js с переменными окружения процесса.


**Q9.** Какая функция Vite вручную загружает переменные из `.env`?

**A9.** Функция `loadEnv`. Пример: `const env = loadEnv(mode, process.cwd(), '')`.


**Q10.** Что возвращает `process.cwd()` в Node.js?

**A10.** Текущий рабочий каталог процесса Node.js.


### Vite config shared options

`https://vite.dev/config/shared-options` · 34 карточки


**Q1.** Что задаёт опция `root` в конфиге Vite?

**A1.** Папку, в которой находится файл `index.html`.


**Q2.** Чему равно значение по умолчанию у `root` в Vite?

**A2.** Каталог запуска команды, `process.cwd()`.


**Q3.** Зачем нужна опция `base` в Vite?

**A3.** Чтобы приложение работало при деплое в подпапку, а не в корень домена.


**Q4.** Чему равно значение по умолчанию у `base` в Vite?

**A4.** `'/'`.


**Q5.** Как `base` влияет на сборку в Vite?

**A5.** Подставляет префикс во все пути и задаёт `import.meta.env.BASE_URL`.


**Q6.** Как `base` влияет на dev-сервер в Vite?

**A6.** Поднимает сервер по этому же пути, например `localhost:5173/app/`.


**Q7.** Что делает опция `define` в конфиге Vite?

**A7.** Заменяет идентификаторы в коде на этапе сборки (аналог `#define` в C).


**Q8.** Как `define` работает в dev-режиме в Vite?

**A8.** Добавляет свойство в `globalThis`.


**Q9.** Как `define` работает в сборке в Vite?

**A9.** Меняет код на уровне AST, подставляя значение вместо идентификатора.


**Q10.** В чём подводный камень `define` со строковыми значениями в Vite?

**A10.** Значения подставляются как есть — строки нужно оборачивать в `JSON.stringify`.


**Q11.** Как типизировать глобалы из `define` для TypeScript в Vite?

**A11.** Объявить их в `vite-env.d.ts`.


**Q12.** Что задаёт опция `plugins` в Vite?

**A12.** Массив плагинов.


**Q13.** Как Vite обрабатывает `false`/`null`/`undefined` в `plugins`?

**A13.** Игнорирует — удобно для `isDev && plugin()`.


**Q14.** Как Vite обрабатывает вложенные массивы в `plugins`?

**A14.** Распаковывает их.


**Q15.** Как Vite обрабатывает Promise в `plugins`?

**A15.** Дожидается разрешения промиса перед запуском.


**Q16.** Что задаёт опция `publicDir` в Vite?

**A16.** Папку статичных ассетов, которые отдаются как есть (favicon и т.п.).


**Q17.** Чему равно значение по умолчанию у `publicDir` в Vite?

**A17.** `public`.


**Q18.** Как `publicDir` работает в dev-режиме в Vite?

**A18.** Файлы доступны по корню `/`.


**Q19.** Как `publicDir` работает в сборке в Vite?

**A19.** Копируется в корень `outDir` (`dist`).


**Q20.** Что делает `publicDir: false` в Vite?

**A20.** Отключает обслуживание и копирование статической папки.


**Q21.** Что делает опция `resolve.extensions` в Vite?

**A21.** Позволяет опускать расширения файлов в операторах `import`.


**Q22.** Чему равно значение по умолчанию у `resolve.extensions` в Vite?

**A22.** `['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']`.


**Q23.** Как в Vite `resolve.extensions` выбирает расширение, если подходит несколько файлов?

**A23.** По порядку в списке — побеждает расширение, стоящее раньше.


**Q24.** Что делает опция `resolve.tsconfigPaths` в Vite?

**A24.** Включает алиасы из `compilerOptions.paths` в tsconfig.json.


**Q25.** Чему равно значение по умолчанию у `resolve.tsconfigPaths` в Vite?

**A25.** `false`.


**Q26.** Что делает опция `clearScreen` в Vite?

**A26.** Включает очистку терминала при логах и пересборках.


**Q27.** Чему равно значение по умолчанию у `clearScreen` в Vite?

**A27.** `true`.


**Q28.** Зачем отключают `clearScreen` в Vite?

**A28.** Чтобы не терять историю логов при HMR.


**Q29.** Что задаёт опция `envDir` в Vite?

**A29.** Папку, из которой Vite грузит `.env`-файлы.


**Q30.** Чему равно значение по умолчанию у `envDir` в Vite?

**A30.** `root` (корень проекта).


**Q31.** Какое значение `envDir` отключает загрузку `.env` в Vite?

**A31.** `false`.


**Q32.** Что задаёт опция `envPrefix` в Vite?

**A32.** Префикс переменных, доступных в клиенте через `import.meta.env`.


**Q33.** Чему равно значение по умолчанию у `envPrefix` в Vite?

**A33.** `'VITE_'`.


**Q34.** Зачем менять `envPrefix` в Vite?

**A34.** Чтобы защитить серверные секреты от попадания в клиентский бандл.


### Vite config Dev server options

`https://vite.dev/config/server-options` · 11 карточек


**Q1.** Чему равно значение по умолчанию у `server.port` в Vite?

**A1.** `5173`.


**Q2.** Что делает `server.strictPort` в Vite?

**A2.** Запрещает занимать другой порт: если указанный занят, сервер не запустится.


**Q3.** Что задаёт `server.https` в Vite?

**A3.** Включает TLS/HTTP2 для dev-сервера; принимает `{ key, cert }` или плагин `@vitejs/plugin-basic-ssl`.


**Q4.** Что делает `server.open` в Vite?

**A4.** Открывает приложение в браузере при старте dev-сервера.


**Q5.** Что означает строковое значение `server.open` в Vite?

**A5.** Путь (pathname), который нужно открыть в браузере.


**Q6.** Что настраивает `server.cors` в Vite?

**A6.** CORS для dev-сервера.


**Q7.** Какие значения принимает `server.cors` в Vite?

**A7.** `true` (любой origin) или объект настроек, как CORS-middleware.


**Q8.** Что делает `server.proxy` в Vite?

**A8.** Перенаправляет запросы dev-сервера на другой сервер (бэкенд), обходя CORS.


**Q9.** Что делает `server.forwardConsole` в Vite?

**A9.** Перенаправляет события консоли браузера в терминал Vite.


**Q10.** Какое значение `server.forwardConsole` включает перенаправление в Vite?

**A10.** `true`.


**Q11.** В каком сценарии полезен `server.forwardConsole` в Vite?

**A11.** При разработке с AI-агентами — им становятся видны ошибки клиента.


### vite plugin basic ssl

`https://github.com/vitejs/vite-plugin-basic-ssl` · 1 карточка


**Q1.** Как подключить `@vitejs/plugin-basic-ssl` в Vite?

**A1.** Добавить `basicSsl()` в `plugins`:
```
import basicSsl from '@vitejs/plugin-basic-ssl';
export default { plugins: [basicSsl()] };
```


### Vite plugins

`https://vite.dev/plugins/` · 1 карточка


**Q1.** Как называется плагин Vite для работы с React?

**A1.** `@vitejs/plugin-react`.


### Vite dep-pre-bundling

`https://vite.dev/guide/dep-pre-bundling` · 1 карточка


**Q1.** Где Vite кеширует предварительно упакованные зависимости?

**A1.** В `node_modules/.vite`.


### Vite assets

`https://vite.dev/guide/assets` · 2 карточки


**Q1.** Во что Vite превращает `import imgUrl from './img.png'` при сборке?

**A1.** В URL-адрес файла.


**Q2.** Где можно использовать `imgUrl` из импорта картинки в Vite?

**A2.** Как обычный URL, например в атрибуте `src` тега `<img>`.


### Vite env and mode

`https://vite.dev/guide/env-and-mode` · 20 карточек


**Q1.** Каким префиксом должны начинаться переменные в `.env`-файлах Vite, чтобы попасть в клиентский код?

**A1.** `VITE_`.


**Q2.** В каком типе приходят `.env`-переменные в `import.meta.env` в Vite?

**A2.** Всегда `string`, даже если в `.env` записано число или булево.


**Q3.** Как сравнить `.env`-переменную с булевым значением в Vite?

**A3.** Явным приведением: `import.meta.env.VITE_F === 'true'`.


**Q4.** Каким синтаксисом в Vite доступны `.env`-переменные в клиенте?

**A4.** `import.meta.env`.


**Q5.** Что вернёт `import.meta.env.DB_PASSWORD` в Vite, если у переменной нет префикса `VITE_`?

**A5.** `undefined`.


**Q6.** В каком порядке приоритета загружаются `.env`-файлы в Vite?

**A6.** `.env.[mode].local` → `.env.[mode]` → `.env.local` → `.env`.


**Q7.** Что содержит `import.meta.env.MODE` в Vite?

**A7.** Текущий режим (`development` или `production`).


**Q8.** Что содержит `import.meta.env.BASE_URL` в Vite?

**A8.** Базовый URL приложения (из опции `base`).


**Q9.** Что содержит `import.meta.env.PROD` в Vite?

**A9.** `true` в продакшен-сборке.


**Q10.** Что содержит `import.meta.env.DEV` в Vite?

**A10.** `true` в режиме разработки.


**Q11.** Что содержит `import.meta.env.SSR` в Vite?

**A11.** `true` при серверном рендеринге.


**Q12.** Чем по типу отличаются пользовательские `.env`-переменные от встроенных `import.meta.env` в Vite?

**A12.** Кастомные — всегда `string`, встроенные (`PROD`/`DEV`/`SSR`) — boolean.


**Q13.** Что такое `import.meta` в JavaScript?

**A13.** Объект с метаданными текущего ESM-модуля.


**Q14.** Что такое `import.meta.env` в Vite?

**A14.** Объект с доступными переменными окружения, который создаёт Vite.


**Q15.** Что такое `ImportMetaEnv` в TypeScript в контексте Vite?

**A15.** Интерфейс, описывающий структуру объекта `import.meta.env`.


**Q16.** Что TypeScript знает про `import.meta.env` по умолчанию в Vite?

**A16.** Только встроенные поля Vite: `MODE`, `DEV`, `PROD`, `BASE_URL`, `SSR`.


**Q17.** Что будет при обращении к `import.meta.env.VITE_APP_TITLE` в Vite без типизации?

**A17.** Ошибка типа: TypeScript не знает эту переменную.


**Q18.** В каком файле типизируют кастомные `.env`-переменные Vite?

**A18.** В `src/vite-env.d.ts`.


**Q19.** Как типизировать `import.meta.env.VITE_APP_TITLE` в Vite?

**A19.** Расширить интерфейсы в `src/vite-env.d.ts`:
```
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```


**Q20.** Что подключает директива `/// <reference types="vite/client" />`?

**A20.** Типы встроенных `import.meta.env` и ассетов Vite.


### Vite features

`https://vite-docs.ru/guide/features` · 3 карточки


**Q1.** Нужны ли Vite-плагины для работы с `.scss`/`.sass`/`.less`/`.styl`?

**A1.** Нет, поддержка препроцессоров встроена.


**Q2.** Что нужно установить для работы препроцессора в Vite?

**A2.** Сам препроцессор как dev-зависимость, например `npm install -D sass`.


**Q3.** Как Vite улучшает `@import` для Sass/Less?

**A3.** Учитывает алиасы, настроенные в Vite.


---

## Vite+

Страниц: 13 · карточек: 46


### Vite+ главная страница

`https://viteplus.dev/guide/` · 1 карточка


**Q1.** Из чего состоит Vite+?

**A1.** Из глобального CLI `vp` и локального пакета `vite-plus` в каждом проекте.


### Vite+ Installing Dependencies

`https://viteplus.dev/guide/install` · 6 карточек


**Q1.** Как в Vite+ добавить пакет?

**A1.** `vp add <pkg>`.


**Q2.** Как в Vite+ добавить dev-пакет?

**A2.** `vp add -D <pkg>`.


**Q3.** Как в Vite+ удалить пакет?

**A3.** `vp remove <pkg>`.


**Q4.** Как в Vite+ обновить зависимости?

**A4.** `vp update`.


**Q5.** Как в Vite+ задать менеджер пакетов для проекта?

**A5.** Полем `devEngines.packageManager` в package.json.


**Q6.** Как в Vite+ указать точную версию менеджера пакетов?

**A6.** Полем `packageManager` в package.json, например `bun@1.1.20`.


### Vite+ Dev

`https://viteplus.dev/guide/dev` · 2 карточки


**Q1.** Как в Vite+ запустить dev-сервер?

**A1.** `vp dev`.


**Q2.** Где в Vite+ находится конфигурация?

**A2.** В стандартном файле `vite.config.ts`.


### Vite+ Check

`https://viteplus.dev/guide/check` · 2 карточки


**Q1.** Какая команда Vite+ объединяет форматирование, линтинг и проверку типов?

**A1.** `vp check`.


**Q2.** Как в Vite+ включить автоисправление для `vp check`?

**A2.** Флагом `--fix`: `vp check --fix`.


### Vite+ Lint

`https://viteplus.dev/guide/lint` · 8 карточек


**Q1.** Какая команда Vite+ запускает линтинг?

**A1.** `vp lint`.


**Q2.** Как включить автоисправление в `vp lint` в Vite+?

**A2.** Флагом `--fix`: `vp lint --fix`.


**Q3.** Что делает опция `typeCheck` у `vp lint` в Vite+?

**A3.** Запускает компилятор TypeScript во время линтинга.


**Q4.** Что делает опция `typeAware` у `vp lint` в Vite+?

**A4.** Ищет логические ошибки на основе типов.


**Q5.** На каком инструменте основан `vp lint` в Vite+?

**A5.** Oxlint.


**Q6.** Где размещать конфиг `vp lint` при использовании Vite+?

**A6.** В `vite.config.ts`, в блоке `lint`.


**Q7.** Где не стоит размещать конфиг `vp lint` при использовании Vite+?

**A7.** В `oxlint.config.ts`.


**Q8.** Как выглядит базовая конфигурация линтера в Vite+?

**A8.** Блок `lint` в vite.config:
```
export default defineConfig({
  lint: { ignorePatterns: ['dist/**'] },
});
```


### Vite+ Format

`https://viteplus.dev/guide/fmt` · 5 карточек


**Q1.** Какая команда Vite+ форматирует код?

**A1.** `vp fmt`.


**Q2.** Как записать отформатированный код в файлы через `vp fmt` в Vite+?

**A2.** `vp fmt . --write`.


**Q3.** На каком инструменте основан `vp fmt` в Vite+?

**A3.** Oxfmt.


**Q4.** Где размещать конфиг `vp fmt` при использовании Vite+?

**A4.** В `vite.config.ts`, в блоке `fmt`.


**Q5.** Где не стоит размещать конфиг `vp fmt` при использовании Vite+?

**A5.** В `oxfmt.config.ts`.


### Vite+ Test

`https://viteplus.dev/guide/test` · 4 карточки


**Q1.** Какая команда Vite+ запускает тесты?

**A1.** `vp test`.


**Q2.** На какой библиотеке основаны тесты Vite+?

**A2.** Vitest.


**Q3.** Где размещать конфиг `vp test` при использовании Vite+?

**A3.** В `vite.config.ts`, в блоке `test`.


**Q4.** Где не стоит размещать конфиг `vp test` при использовании Vite+?

**A4.** В `vitest.config.ts`.


### Vite+ Run

`https://viteplus.dev/guide/run` · 6 карточек


**Q1.** Какая команда Vite+ запускает скрипты из package.json?

**A1.** `vp run <script-name>`.


**Q2.** Чем `vp dev` отличается от `vp run dev` в Vite+?

**A2.** `vp dev` — встроенная команда, `vp run dev` запускает скрипт `dev` из package.json.


**Q3.** Как в Vite+ определить задачу в конфиге?

**A3.** В `vite.config.ts`, в блоке `run.tasks`:
```
export default defineConfig({
  run: {
    tasks: {
      build: { command: 'vp build', dependsOn: ['lint'] },
    },
  },
});
```


**Q4.** Как в Vite+ указать зависимость одной задачи от другой?

**A4.** Через поле `dependsOn` у задачи.


**Q5.** Как запустить задачу из конфига Vite+?

**A5.** `vp run <task-name>`.


**Q6.** Что такое задача (task) в Vite+?

**A6.** Именованный скрипт, состояние которого Vite+ кеширует по входным и выходным файлам.


### Vite+ Running Binaries

`https://viteplus.dev/guide/vpx` · 1 карточка


**Q1.** Какой аналог `npx`/`bunx` есть в Vite+?

**A1.** `vpx`.


### Vite+ Build

`https://viteplus.dev/guide/build` · 1 карточка


**Q1.** Какая команда Vite+ собирает проект?

**A1.** `vp build`.


### Vite+ Upgrade

`https://viteplus.dev/guide/upgrade` · 1 карточка


**Q1.** Как обновить глобальный Vite+ (`vp`)?

**A1.** `vp upgrade`.


### Vite+ CI

`https://viteplus.dev/guide/ci` · 1 карточка


**Q1.** Что использовать для интеграции Vite+ в CI?

**A1.** `voidzero-dev/setup-vp`.


### Vite+ Commit Hooks

`https://viteplus.dev/guide/commit-hooks` · 8 карточек


**Q1.** Как в Vite+ включить Git-хуки?

**A1.** `vp hooks enable`.


**Q2.** Как в Vite+ выключить Git-хуки?

**A2.** `vp hooks disable`.


**Q3.** Как в Vite+ проверить статус Git-хуков?

**A3.** `vp hooks status`.


**Q4.** Где в Vite+ лежат скрипты Git-хуков?

**A4.** В папке `.vite-hooks` в корне проекта.


**Q5.** Нужно ли коммитить папку `.vite-hooks`?

**A5.** Да, чтобы хуки были одинаковыми у всех.


**Q6.** Как настроить хук pre-commit в Vite+?

**A6.** Создать файл `.vite-hooks/pre-commit` с командой `vp staged`.


**Q7.** Какая команда Vite+ проверяет только изменённые файлы перед коммитом?

**A7.** `vp staged`.


**Q8.** Как в Vite+ настроить `vp staged` через `vp check --fix` для TS?

**A8.** Блоком `staged` в vite.config: `staged: { '*.{js,ts,tsx}': 'vp check --fix' }`.


---

## Oxc

Страниц: 5 · карточек: 12


### What is Oxc?

`https://oxc.rs/docs/guide/what-is-oxc.html` · 1 карточка


**Q1.** Что такое Oxc?

**A1.** Набор высокопроизводительных инструментов для JavaScript и TypeScript, написанных на Rust.


### Oxlint

`https://oxc.rs/docs/guide/usage/linter.html` · 4 карточки


**Q1.** Что такое Oxlint?

**A1.** Высокопроизводительный линтер для JS/TS на стеке Oxc, совместимый с ESLint.


**Q2.** Какую версию TypeScript использует Oxlint?

**A2.** tsgo, он же TypeScript 7.


**Q3.** Как установить Oxlint через npm?

**A3.** `npm install -D oxlint`.


**Q4.** Как задать npm-скрипты для Oxlint?

**A4.** `"lint": "oxlint"` для проверки и `"lint:fix": "oxlint --fix"` для фикса.


### Oxlint Quickstart

`https://oxc.rs/docs/guide/usage/linter/quickstart.html` · 2 карточки


**Q1.** Как инициализировать конфиг Oxlint?

**A1.** `oxlint --init`.


**Q2.** Как называется файл конфига Oxlint?

**A2.** `.oxlintrc.json` или `oxlint.config.ts`.


### Oxlint Configuration

`https://oxc.rs/docs/guide/usage/linter/config.html` · 1 карточка


**Q1.** Как выглядит базовый конфиг Oxlint?

**A1.** `import { defineConfig } from 'oxlint'; export default defineConfig({});`


### Oxlint Built-in Plugins

`https://oxc.rs/docs/guide/usage/linter/plugins.html` · 4 карточки


**Q1.** Что такое плагин в Oxlint?

**A1.** Именованная группа правил; его включение делает правила доступными.


**Q2.** Как включить встроенные плагины в конфиге Oxlint?

**A2.** Указать их в поле `plugins`, например `plugins: ['import']`.


**Q3.** Что делает запись `plugins` в конфиге Oxlint?

**A3.** Переопределяет плагины, включённые по умолчанию.


**Q4.** Включён ли плагин eslint в Oxlint по умолчанию?

**A4.** Да, он подключает основные правила ESLint.
