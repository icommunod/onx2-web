# OnX2 Web

Site OnX2 (landing page C-UAS) — Next.js 16 + React 19 + Tailwind 4.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:5173`.

Pages disponibles :

- `/` — landing page OnX2
- `/societe/onx2/website` — console de déploiement (tableau de bord IONOS +
  générateur de pipeline Git → GitHub Actions)

## Build

```bash
npm run build
```

## Déploiement

Le déploiement vers l'hébergement IONOS est automatisé : chaque `git push` sur
la branche `main` déclenche le workflow `.github/workflows/deploy.yml`.

Voir le guide complet : [DEPLOIEMENT.md](./DEPLOIEMENT.md)
