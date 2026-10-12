# Сайт на Selectel: как это устроено и как поднять заново

Основной сайт `ansudakov.ru` работает на сервере Selectel (VDS-2, Москва, Ubuntu 24.04), DNS-зона тоже в Selectel.
Vercel держит запасную копию на `sdkv.vercel.app` (закрыта от индексации в `next.config.ts`).

## Как сайт попадает на сервер
`git push` в `main` запускает `.github/workflows/deploy-selectel.yml`: сборка в статичные файлы (`STATIC_EXPORT=1`,
фото сжимаются скриптом `scripts/optimize-images.mjs`), загрузка в `/var/www/releases/<время>-<коммит>`,
переключение ссылки `/var/www/current`. Хранятся 5 последних релизов. Откат: переставить ссылку на предыдущую папку.

Секрет репозитория: `SELECTEL_DEPLOY_KEY` (приватный ключ пользователя `deploy`, права только на запись файлов сайта).

## Что на сервере (чтобы поднять такой же заново, около 15 минут)
1. Создать VDS в Selectel (Москва, Ubuntu 24.04, от 1 vCPU / 1 ГБ), доступ по SSH-ключу.
2. `ufw allow 22,80,443/tcp && ufw enable`, отключить вход по паролю (`PasswordAuthentication no` в `/etc/ssh/sshd_config.d/`).
3. Поставить Caddy (официальный репозиторий), положить `infra/selectel/Caddyfile` в `/etc/caddy/Caddyfile`, `systemctl reload caddy`.
   Сертификаты Let's Encrypt Caddy выпускает и продлевает сам (DNS должен смотреть на сервер).
4. Пользователь `deploy` без sudo: `adduser --disabled-password deploy`, в `~deploy/.ssh/authorized_keys` публичный ключ
   с опциями `no-pty,no-port-forwarding,no-agent-forwarding,no-X11-forwarding`; каталоги `/var/www/releases` и `/var/www` принадлежат `deploy`.
5. Автообновления безопасности: `apt install unattended-upgrades`.
6. В DNS-зоне (Selectel DNS) поменять запись A у `@` и `www` на новый IP; в workflow обновить `SERVER_HOST` и отпечаток `SERVER_HOST_KEY`
   (`ssh-keyscan -t ed25519 <ip>`).

## DNS
Серверы имён: `a/b/c/d.ns.selectel.ru` (указаны у регистратора reg.ru). Записи: A для `@` и `www`, две TXT-записи
подтверждения прав (Google Search Console, Яндекс Вебмастер). Автопродление домена в reg.ru требует карту или баланс.

## Оплата
Сервер 250 ₽ в месяц, автопополнение включено в личном кабинете Selectel.
