#!/bin/bash

# Load NVM if you used NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

set -e  # para o script se qualquer comando falhar

echo "→ Entrando na pasta do projeto..."
cd /home/deploy/app

echo "→ Atualizando o código..."
git pull origin develop

echo "→ Instalando dependências..."
npm install --production

echo "→ Fazendo o build..."
npm run build

echo "→ Reiniciando a aplicação..."
pm2 restart api

echo "✓ Deploy concluído!"