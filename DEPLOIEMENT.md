# Guide de déploiement — OnX2 Web vers IONOS

Pipeline : **VS Code (local) → GitHub → GitHub Actions → SFTP/FTPS → Webspace IONOS**.

Une console interactive est disponible dans le projet à l'adresse
`http://localhost:5173/societe/onx2/website`. Elle reproduit la configuration
IONOS et **génère automatiquement** les commandes, les secrets et le contenu de
`deploy.yml` à partir de vos informations. Ce guide en est la version texte.

---

## État actuel du projet

| Élément | État |
| --- | --- |
| Dépôt Git initialisé (branche `main`) | ✅ Fait |
| Commit initial | ✅ Fait |
| Workflow `.github/workflows/deploy.yml` | ✅ Créé |
| Remote GitHub (`origin`) | ⬜ À configurer — étape 2 |
| Secrets IONOS sur GitHub | ⬜ À créer — étape 3 |

---

## Étape 1 — Récupérer les identifiants SFTP / SSH IONOS

Dans la console IONOS : **Menu → Hébergement → section « SFTP & SSH » →
Configurer / Gérer**.

Les identifiants SSH se trouvent dans la section **Détails techniques** de
l'hébergement. Vous y obtenez :

- le **nom d'utilisateur SSH** (identifiant généré par IONOS) ;
- l'**hôte SSH/SFTP** (de la forme `homeXXXXXX.1and1-data.host`) ;
- le **port** (`22` pour SSH/SFTP, `21` pour FTP/FTPS) ;
- le **mot de passe SSH** ;
- le **répertoire racine** du webspace.

---

## Étape 2 — Connecter le dépôt local à GitHub

1. Créez un dépôt vide sur GitHub (sans README ni `.gitignore`).
2. Dans le dossier du projet (`~/Desktop/onx2_web`), reliez-le au dépôt distant.
   `git init` et le commit initial sont **déjà faits** — commencez donc à
   `git remote add origin` :

```bash
git remote add origin https://github.com/VOTRE-COMPTE/onx2-web.git
git branch -M main
git push -u origin main
```

Séquence complète (si vous repartez de zéro) :

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/onx2-web.git
git push -u origin main
```

---

## Étape 3 — Créer les secrets GitHub Actions

Dans GitHub : **Settings → Secrets and variables → Actions → New repository
secret**. Créez ces quatre secrets :

| Nom du secret | Valeur |
| --- | --- |
| `IONOS_HOST` | `homeXXXXXX.1and1-data.host` |
| `IONOS_USER` | votre identifiant SSH IONOS |
| `IONOS_PASSWORD` | votre mot de passe SSH |
| `IONOS_PORT` | `22` (SFTP) ou `21` (FTPS) |

Le workflow lit ces valeurs via `secrets.IONOS_*` sans jamais les exposer.

---

## Étape 4 — Le workflow GitHub Actions

Le fichier `.github/workflows/deploy.yml` est déjà présent. Il se déclenche à
chaque `git push` sur `main` (et peut aussi être lancé manuellement depuis
l'onglet **Actions**).

**Important sur le protocole :** `FTP-Deploy-Action` utilise FTP/FTPS
(port 21). Le port 22 correspond à SSH/SFTP. Si vous déployez en SFTP sur le
port 22, utilisez plutôt une action SFTP — la console de déploiement génère les
deux variantes (FTPS et SFTP).

**Cas Next.js :** un webspace IONOS sert des fichiers statiques (HTML, CSS, JS,
PHP), pas une application Node. Pour déployer ce projet Next.js sur le webspace,
ajoutez `output: "export"` dans `next.config.ts` afin de générer un site
statique dans `./out`, puis activez l'étape de build du workflow et réglez
`local-dir` sur `./out/`.

---

## Étape 5 — Workflow quotidien et retour en arrière

Modifier et publier le site :

```bash
git add .
git commit -m "modif page contact"
git push origin main
# → GitHub Actions se déclenche et déploie automatiquement sur IONOS
```

Annuler le dernier commit (rollback sûr) :

```bash
git log --oneline
git revert HEAD
git push origin main
```

Revenir à un commit précis :

```bash
git revert abc1234
git push origin main
```

Tester sur une branche séparée avant la production :

```bash
git checkout -b feature/nouvelle-page
# ... vos modifications ...
git push origin feature/nouvelle-page
git checkout main
git merge feature/nouvelle-page
git push origin main
```

---

## Console de déploiement intégrée

Pour générer commandes, secrets et `deploy.yml` à partir de vos propres
identifiants, lancez le projet (`npm run dev`) et ouvrez :

```
http://localhost:5173/societe/onx2/website
```
