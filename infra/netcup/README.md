# Тестовый VPS в netcup

VPS заказан 9 ноября 2026 года и в тот же день стал production-сервером `ansudakov.ru`.
Старый сервер Selectel временно сохранён как резерв для отката.

## Сервер

- Тариф: VPS 500 G12.5
- Локация: Nuremberg, Germany
- Срок и биллинг: 1 месяц
- Цена: 9,18 € в месяц
- Ресурсы: 2 vCPU, 4 ГБ RAM, 64 ГБ SSD
- Система: Debian 13 (trixie), minimal
- IPv4: `62.83.93.155`
- IPv6: `2a03:4000:13:11a9:c8eb:81ff:fe32:143e`
- Hostname: `v2202611455186555958.ultrasrv.de`
- Production: https://ansudakov.ru/
- Проверка по IP: http://62.83.93.155/

## Панели управления

- Customer Control Panel (CCP): https://www.customercontrolpanel.de/
- Server Control Panel (SCP): https://www.servercontrolpanel.de/SCP/
- Локальные логины и пароли: `infra/netcup/credentials.local.md` — файл намеренно исключён из Git.

## SSH

Подключение по отдельному ключу проекта:

```bash
ssh -i infra/netcup/deploy_key.local \
  -o UserKnownHostsFile=infra/netcup/known_hosts.local \
  root@62.83.93.155
```

Локальные `deploy_key.local`, `deploy_key.local.pub` и `known_hosts.local` исключены из Git.

Проверенные netcup отпечатки хост-ключей:

- RSA: `SHA256:7QKif/3QgdMQsDRPgDvAzWgRXP20HJ7ZRhB5vjM6Z8U`
- ECDSA: `SHA256:kTVPehkU4tg27tH81LGaC2rTMOGDdPEEDg4bKLn0Mi4`
- ED25519: `SHA256:Jqz//1nuyWSZaH+4M1ocUov8qqPQ53JOlB89GmP+SK8`

При первом подключении сверить показанный ED25519-отпечаток с указанным выше. Затем добавить отдельный SSH-ключ проекта, проверить вход по нему и только после этого отключать вход `root` по паролю.

## Оплата и заказ

- Номер заказа: `54532061`
- Инвойс: `nc-5816692`
- Сумма: 9,18 €
- Инвойс оплачен 9 ноября 2026 года картой через Stripe.
- Карта сохранена в netcup как платёжный способ и применена к существующим и будущим счетам.

## Важно

На сервере предустановлена firewall policy `netcup Mail Block`, блокирующая входящий и исходящий SMTP. Для сайта это не мешает. Не удалять её без необходимости отправлять почту непосредственно с VPS.

## Текущее production-размещение

- Caddy обслуживает `ansudakov.ru` и автоматически управляет сертификатами Let's Encrypt.
- `www.ansudakov.ru` перенаправляется на основной адрес.
- Активный релиз: символическая ссылка `/var/www/current` на каталог в `/var/www/releases/`.
- Production-конфигурация Caddy совпадает с `infra/selectel/Caddyfile`.
- DNS A для `@` и `www`: `62.83.93.155`, TTL 300 секунд; DNS-зона остаётся в Selectel.
- GitHub Actions подготовлен для выкладки на netcup отдельным пользователем `deploy` без sudo.

Перенос проверен по HTTPS: основной адрес отвечает `200`, `www` — редиректом `307` на основной адрес.
