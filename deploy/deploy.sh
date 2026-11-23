#!/usr/bin/env bash
# Deploy na VPS: envia o código local para /opt/premium e reconstrói o container.
# Rodar no Git Bash, na raiz do projeto:  bash deploy/deploy.sh
# Não mexe no Easypanel nem nos outros sistemas da VPS; só no container "premium".
set -euo pipefail

ALVO="${ALVO:-root@31.97.90.77}"
CHAVE="${CHAVE:-$HOME/.ssh/premium_vps}"
SSH=(ssh -i "$CHAVE" -o IdentitiesOnly=yes "$ALVO")
PACOTE="$(mktemp -t premium-XXXXXX).tgz"

# Empacota o projeto (sem node_modules, dist, .git e imagens de referência)
tar -czf "$PACOTE" \
  --exclude=node_modules --exclude=dist --exclude=.git \
  --exclude='*.tsbuildinfo' --exclude='referencia*.jpeg' .

scp -i "$CHAVE" -o IdentitiesOnly=yes "$PACOTE" "$ALVO:/tmp/premium.tgz"
rm -f "$PACOTE"

"${SSH[@]}" 'set -e
  mkdir -p /opt/premium
  find /opt/premium -mindepth 1 -delete
  tar -xzf /tmp/premium.tgz -C /opt/premium
  rm -f /tmp/premium.tgz
  cd /opt/premium
  docker compose -f docker-compose.vps.yml up -d --build
  docker image prune -f >/dev/null
  sleep 2
  curl -fsS -o /dev/null -w "Site respondeu HTTP %{http_code} na porta 3300\n" http://127.0.0.1:3300/'
