# ilyamedve.dev

Новая версия персонального сайта на Astro. Проект находится в разработке и
**не развёрнут в production**. Текущий публичный legacy-сайт продолжает жить
отдельно на <https://legacy.ilyamedve.dev>.

## Что уже есть

- Astro 6, MDX и sitemap.
- Hero и заготовка блока «О себе».
- Компоненты проектов, социальных ссылок и footer; проекты и footer пока
  отключены на главной странице.
- Multi-stage Dockerfile: сборка в Node и раздача статики через nginx.

## Почему проект пока не развёрнут

Текущая конфигурация не готова к production:

- Dockerfile копирует `nginx/nginx.conf`, которого в репозитории нет, поэтому
  Docker build останавливается на этом шаге.
- `npm run build` запускает `astro check`, но `@astrojs/check` и TypeScript не
  объявлены в `package.json`; чистая non-interactive сборка пока не
  воспроизводима.
- Compose публикует `8080:8080` напрямую, не подключает контейнер к внешней
  `caddy_net` и не содержит Caddy labels. Поэтому глобальный reverse proxy не
  может направить на него `ilyamedve.dev`.
- В `astro.config.mjs` не задан production `site`, необходимый для корректных
  canonical URL и sitemap.
- Блок `Me.astro` пока пуст, а `Projects` и `Footer` закомментированы. Ссылки на
  social preview в `SEO.astro` указывают на отсутствующий `static/main_screen.png`.

Поэтому Compose-файл должен оставаться в разделе non-autostart реестра
`../../scripts/bootstrap/production-stacks.yml` до устранения этих пунктов.

## Планируемое production-направление

1. Довести содержимое главной: заполнить «О себе», вернуть проекты и footer,
   выровнять размеры изображений, проверить шрифты и адаптивность.
2. Сделать чистую сборку воспроизводимой: явно объявить build/check
   зависимости, добавить nginx-конфигурацию и проверить `npm ci && npm run build`.
3. Задать `site: https://ilyamedve.dev`, перенести OG-изображение в локальные
   assets и проверить canonical, sitemap и social preview.
4. Подключить контейнер к внешней `caddy_net`, убрать публикацию host-порта,
   оставить внутренний `expose` и добавить Caddy labels:
   `ilyamedve.dev` — канонический сайт, `www.ilyamedve.dev` — постоянный
   редирект на apex. `legacy.ilyamedve.dev` остаётся отдельным архивным сайтом.
5. После успешных build и HTTP/TLS smoke checks перенести стек из
   non-autostart в ordered production-список реестра.

## Локальная разработка

Требуется Node.js из `.nvmrc`.

```bash
npm ci
npm run dev
```

Перед production-деплоем обязательны:

```bash
npm run build
docker compose config --quiet
```
