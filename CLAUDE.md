# demenageur-template — Guide du projet

## Stack technique

- **Framework :** Next.js 15 (App Router) + React 19 + TypeScript strict
- **Style :** Tailwind CSS 4 + Shadcn/UI (New York style)
- **Animations :** Framer Motion 12
- **Icons :** Lucide React
- **Validation :** Zod
- **Fonts :** Playfair Display (headings) + DM Sans (body)

## Structure des données

Toutes les données du site (entreprise, services, réalisations, équipe, témoignages, blog) se trouvent dans `/src/data/`.
Pour modifier le contenu, éditez ces fichiers — pas les composants.

## Conventions importantes

- Utiliser `"use client"` **uniquement** si le composant utilise des hooks ou des événements
- Toujours utiliser `next/image` avec `fill` et `sizes`
- Les routes dynamiques (`[slug]`) doivent utiliser `await params` (Next.js 15)
- Ne pas modifier les fichiers générés dans `/src/components/ui/` sans raison valable
- Respecter les variables CSS OKLch pour les couleurs — ne pas hardcoder de couleurs hex

## Palette de couleurs

```
Primary (Navy) : oklch(35% 0.12 255)
Accent (Amber) : oklch(72% 0.18 65)
```

## Identité de l'entreprise

Toutes les informations de l'entreprise (nom, telephone, email, adresse, etc.) sont centralisees dans `/src/config/client.config.ts`.
Modifier ce fichier unique pour personnaliser le site — ne pas hardcoder ces valeurs dans les composants.

## Déploiement

Le site est déployé sur Vercel (`cdg1` — région Paris).
Variables d'environnement requises :
- `NEXT_PUBLIC_SITE_URL` — URL de production
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — pour la carte (optionnel)
- `RESEND_API_KEY` — pour l'envoi des emails du formulaire de contact

## Images

Les images sont à déposer dans `/public/images/` dans les sous-dossiers :
- `services/` — 1200×800 px
- `realisations/` — 1200×900 px
- `team/` — 600×800 px (portrait)
- `blog/` — 1200×675 px (16:9)
- Racine : `hero-main.jpg`, `hero-about.jpg`, `cta-bg.jpg`, `og-image.jpg`

Voir le plan pour les prompts AI complets de chaque image.
