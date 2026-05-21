#!/bin/bash
# Déploiement LOCAL direct vers IONOS (marche depuis votre Mac)
# Usage: ./deploy-local.sh [preprod|prod]
# Le hostname FTP doit être rempli depuis IONOS panel → FTP → Serveur FTP

ENV=${1:-preprod}
IONOS_HOST="${IONOS_HOST:-REMPLACER_PAR_HOSTNAME_FTP_IONOS}"
IONOS_USER="u115594766"

if [ "$ENV" = "prod" ]; then
  DOMAIN="onx2.fr"
  BRANCH="main"
else
  DOMAIN="onx2.eu"
  BRANCH="develop"
fi

echo "🔨 Build Next.js pour $ENV ($DOMAIN)..."
NEXT_PUBLIC_ENV=$ENV NEXT_PUBLIC_SITE_URL="https://$DOMAIN" npm run build || exit 1

echo "📦 ./out/ prêt : $(du -sh out/ | cut -f1)"

echo "🚀 Déploiement FTPS vers $IONOS_HOST..."
lftp -c "
  set ftp:ssl-force true;
  set ftp:ssl-protect-data true;
  set ssl:verify-certificate false;
  set net:timeout 30;
  set net:max-retries 3;
  open ftp://$IONOS_USER@$IONOS_HOST:21;
  mirror -R --delete --verbose ./out/ /;
  bye
" && echo "✅ Déployé sur https://$DOMAIN/" || echo "❌ Échec — vérifiez IONOS_HOST et la restriction IP"
