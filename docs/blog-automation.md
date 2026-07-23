# Blog IA — rédaction automatique avec relecture humaine

L'IA rédige les articles ; **rien n'est publié sans validation humaine**.

Le fournisseur par défaut est **Gemini**, dont l'offre gratuite couvre très
largement un article par semaine (aucune carte bancaire requise).

## Mise en route

Ajoutez dans `.env.local` (ou dans les variables d'environnement de l'hébergeur) :

```
GEMINI_API_KEY=...                # gratuit : https://aistudio.google.com/apikey
BLOG_ADMIN_PASSWORD=...           # 8 caractères minimum
CRON_SECRET=...                   # openssl rand -hex 32
```

⚠️ Sur l'offre **gratuite** de Google, les requêtes et les réponses peuvent être
utilisées par Google pour améliorer ses modèles. Le contenu envoyé ici se limite
au brief éditorial et à la liste publique des destinations, mais il faut le savoir.

### Changer de moteur

```
BLOG_AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
```

C'est la seule chose à modifier : prompt, garde-fous, relecture et publication
sont identiques quel que soit le moteur.

Puis ouvrez **`/admin/blog`**.

## Le flux

1. **Génération** — bouton « Générer » dans `/admin/blog`, avec ou sans sujet imposé ;
   ou automatiquement via le cron (voir plus bas).
2. **Brouillon** — l'article est enregistré dans `content/blog/<slug>.json` avec
   `status: "draft"`. Il n'apparaît **ni** sur `/blog`, **ni** sur `/blog/<slug>`
   (404), **ni** dans le sitemap.
3. **Relecture** — dépliez la fiche pour corriger titre, résumé et paragraphes.
4. **Publication** — bouton « Publier ». L'article devient visible immédiatement
   (`revalidatePath`), sans redéploiement. « Retirer » le repasse en brouillon.

## Génération planifiée

`GET`/`POST /api/cron/blog`, protégé par `CRON_SECRET` :

```bash
curl -X POST https://rajaindiatour.fr/api/cron/blog \
     -H "Authorization: Bearer $CRON_SECRET"
```

Le cron **ne crée que des brouillons** et s'arrête à 5 brouillons non relus.

- **Vercel** : déjà configuré dans `vercel.json` — tous les lundis à 7 h.
- **Ailleurs** : n'importe quel cron (cPanel, GitHub Actions) appelant l'URL ci-dessus.

## Garde-fous donnés au modèle

Le prompt système (`lib/blog/prompt.ts`) interdit d'inventer prix, avis clients,
noms d'hôtels, statistiques ou numéros de licence, impose le vouvoiement, et limite
l'image d'illustration à une liste de fichiers réellement présents dans `/public`.
Ces règles réduisent le risque sans le supprimer : **relisez toujours avant de publier.**

## Architecture

| Fichier | Rôle |
| --- | --- |
| `lib/blog/generate.ts` | Choisit le moteur et assemble le brouillon |
| `lib/blog/prompt.ts` | Brief éditorial, garde-fous, schéma de sortie, validation |
| `lib/blog/providers/gemini.ts` | Appel Gemini (défaut, gratuit) |
| `lib/blog/providers/anthropic.ts` | Appel Claude (optionnel) |
| `lib/blog/store.ts` | Stockage des articles — **seul** module qui touche au disque |
| `lib/blog/posts.ts` | Fusion articles statiques + articles publiés, pour le site public |
| `lib/blog/auth.ts` | Session admin (cookie httpOnly) |
| `app/admin/blog/` | Interface de relecture |
| `app/api/admin/blog/` | Génération, édition, publication, suppression |
| `app/api/cron/blog/` | Génération planifiée |

## Hébergement — à savoir

Le stockage est **sur disque** (`content/blog/`). Cela fonctionne en local et sur
tout serveur Node persistant (VPS, cPanel Node).

**Sur Vercel, le système de fichiers est en lecture seule** : la génération et la
publication échoueront. Il faut alors remplacer les cinq fonctions de
`lib/blog/store.ts` par un stockage externe (Vercel KV, Postgres, Supabase…) —
c'est le seul fichier à réécrire, tout le reste passe par lui.
