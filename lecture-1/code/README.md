# Стартовый проект: Vite+ · TanStack Router · TanStack Query · Oxlint/Oxfmt

Минимальный, но полноценный шаблон для лекции «Современные технологии сборки, линтинга и роутинга во фронтенд-приложениях». Демонстрирует интеграцию **TanStack Query** с **TanStack Router**: запросы, мутации, оптимистичные обновления, prefetch, инвалидация, зависимые запросы.

## Стек

- **Vite+** (`vite-plus`) — dev-сервер, сборка, единый CLI `vp`
- **TanStack Router** — типобезопасная маршрутизация (файловая)
- **TanStack Query** — серверное состояние: кеш, мутации, инвалидация
- **Oxlint / Oxfmt** — линтинг и форматирование (через `vp lint` / `vp fmt`)

## Требования

- Node.js 20+
- npm 10+ или bun

## Установка и запуск

```bash
bun install
bun run dev          # dev-сервер на http://localhost:3000
```

## Скрипты

| Скрипт | Команда | Описание |
|---|---|---|
| `dev` | `vp dev` | dev-сервер |
| `build` | `vp build` | сборка в `dist/` |
| `preview` | `vp preview` | предпросмотр сборки |
| `lint` | `vp lint` | линтинг (Oxlint) |
| `fmt` | `vp fmt` | форматирование (Oxfmt) |
| `check` | `vp check` | fmt + lint + типы за один проход |
| `typecheck` | `tsc -b` | проверка типов |

## Демо-приложение: «Посты»

Мок-API в `src/api/posts.ts` (in-memory данные с задержкой). Страницы:

- `/` — список постов: `useInfiniteQuery` («загрузить ещё»), поиск через search params (`?q=`), удаление, prefetch детали при наведении, `refetch`.
- `/posts/$postId` — деталь поста + комментарии: `loader` с `ensureQueryData` (prefetch при переходе), `useQuery` для поста и комментариев, удаление с инвалидацией.
- `/editor` — создание и редактирование поста (одна страница, режим определяется по `?id=`): `useMutation` с `onSuccess`, инвалидация списка, переход на список после сохранения.

Фичи TanStack Query, которые показаны: `staleTime`/`gcTime`, `queryKey`, `invalidateQueries`, `prefetchQuery`, `ensureQueryData`, `cancelQueries`, `setQueryData`, optimistic updates (ранее), dependent queries (enabled), infinite query.

## Docker

Сборка и запуск через nginx:

```bash
docker build -t lecture-1-starter .
docker run --rm -p 8080:8080 lecture-1-starter
```

Приложение будет доступно на http://localhost:8080.

## Структура

```
src/
├── main.tsx
├── lib/queryClient.ts
├── api/posts.ts
└── routes/
    ├── __root.tsx
    ├── index.tsx
    ├── new.tsx
    └── posts.$postId.tsx
```
