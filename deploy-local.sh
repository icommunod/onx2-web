#!/bin/bash
# Deploy Onx2 → IONOS depuis votre Mac
# Usage: ./deploy-local.sh
# Configurez IONOS_HOST ci-dessous avec le hostname FTP de votre panel IONOS

IONOS_HOST="${IONOS_HOST:-REMPLACER_PAR_HOSTNAME_FTP}"
IONOS_USER="u115594766"
IONOS_PORT="21"

echo "🔨 Build Next.js..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "📦 Contenu ./out/ :"
ls out/ | head -10

echo "🚀 Déploiement FTPS vers $IONOS_HOST..."
lftp -c "
  set ftp:ssl-force true;
  set ftp:ssl-protect-data true;
  set ssl:verify-certificate false;
  set net:timeout 30;
  set net:max-retries 3;
  open ftp://$IONOS_USER@$IONOS_HOST:$IONOS_PORT;
  mirror -R --delete --verbose ./out/ /;
  bye
"

echo "✅ Déployé sur https://home61303.ionos.fr/"
