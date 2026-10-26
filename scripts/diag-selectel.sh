#!/usr/bin/env bash
# Собирает диагностику для поддержки Selectel. Запускать на своём компьютере в момент,
# когда через VPN сайт не открывается:  bash scripts/diag-selectel.sh
# Результат: diag-output.txt (текстовый файл, его можно приложить к тикету).
IP=161.104.46.49
DOMAIN=ansudakov.ru
OUT="$(cd "$(dirname "$0")/.." && pwd)/diag-output.txt"

{
  echo "=== Время (МСК): $(TZ=Europe/Moscow date '+%Y-%m-%d %H:%M:%S')"
  echo "=== Мой внешний IP (источник SOURCE_IP):"
  curl -s --max-time 8 https://api.ipify.org || curl -s --max-time 8 https://ifconfig.me || echo "не удалось определить (сайты определения IP тоже могут не открываться)"
  echo; echo "=== Назначение DESTINATION_IP: $IP ($DOMAIN)"

  echo; echo "=== 1. ICMP: ping 100 пакетов (около 20 секунд)"
  ping -c 100 -i 0.2 "$IP" 2>&1 | tail -4

  echo; echo "=== 2. Трассировка до сервера"
  if command -v mtr >/dev/null; then sudo mtr -bwzrc 100 -n "$IP" 2>&1 | tail -25; else traceroute -n -w 2 -q 2 "$IP" 2>&1 | tail -25; fi

  echo; echo "=== 3. TCP-проверка портов"
  for p in 22 80 443; do nc -vz -w 5 "$IP" "$p" 2>&1; done

  echo; echo "=== 4. curl -Iv http"
  curl -Iv --max-time 15 "http://$DOMAIN" 2>&1 | head -30
  echo; echo "=== 5. curl -Iv https"
  curl -Iv --max-time 15 "https://$DOMAIN" 2>&1 | head -40

  echo; echo "=== 6. ssh -v (до проверки ключа)"
  ssh -v -o ConnectTimeout=10 -o BatchMode=yes -o StrictHostKeyChecking=no "root@$IP" true 2>&1 | head -25

  echo; echo "=== 7. nmap"
  if command -v nmap >/dev/null; then nmap -Pn -p 22,80,443 "$IP"; else echo "nmap не установлен (brew install nmap), пропускаю"; fi
} 2>&1 | tee "$OUT"

echo
echo "Готово. Файл: $OUT"
