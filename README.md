# Portfolio — Matteo Sanchez, géomaticien

Site portfolio « Atlas » : cartographie et développement SIG.

- **Next.js 16** (App Router, pages statiques) + **Tailwind CSS 4**
- **MapLibre GL 6** : hero en relief 3D (MNT Terrarium, courbes de niveau calculées dans le navigateur, OpenFreeMap). Aucune clé d'API.
- **OpenSeadragon** : zoom profond sur les cartes de l'atlas
- **Supabase** : messages du formulaire de contact
- Déploiement **Vercel**

## Développer

```bash
npm install
npm run dev
```

`predev` / `prebuild` copient le worker MapLibre dans `public/vendor/` (ignoré par git).

## Contenu

Tout le contenu est dans `src/content/` :

| Fichier | Contenu |
|---|---|
| `projects.ts` | études de cas (`published: false` pour masquer un brouillon) |
| `maps.ts` | planches de l'atlas, images dans `public/maps/` |
| `profile.ts` | identité, parcours, compétences, lien LinkedIn |

Règle d'anonymisation des projets : aucun nom d'employeur ou de client, aucune URL interne, aucune personne, aucune clé.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | clé publique (soumise aux règles RLS) |
| `NEXT_PUBLIC_SITE_URL` | URL publique, pour les métadonnées |

Sans Supabase, le site fonctionne et le formulaire renvoie vers l'e-mail.

## Base de données

Le schéma est dans `supabase/migrations/`. La table `messages` accepte les insertions anonymes ; aucun rôle API ne peut la lire. Les messages se consultent dans le tableau de bord Supabase (Table Editor → `messages`).
