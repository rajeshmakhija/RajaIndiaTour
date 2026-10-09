# Blog IA — publication automatique tous les trois jours

Le cron publie un article automatiquement tous les trois jours calendaires à 07:00 UTC. L'interface `/admin/blog` permet toujours de créer des brouillons et de corriger ou retirer un article publié.

Le fournisseur par défaut est **Gemini**. Les limites et tarifs dépendent du compte et du modèle utilisés.

## Mise en route

Ajoutez dans `.env.local` (ou dans les variables d'environnement de l'hébergeur) :

```
GEMINI_API_KEY=...                # https://aistudio.google.com/apikey
BLOG_ADMIN_PASSWORD=...           # 8 caractères minimum
CRON_SECRET=...                   # openssl rand -hex 32
# GEMINI_MODEL=gemini-3.8-flash
# GEMINI_FALLBACK_MODELS=gemini-3.5-flash-lite
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

1. **Cron** — Vercel appelle `/api/cron/blog` chaque jour à 07:00 UTC. L'endpoint publie le troisième jour calendaire suivant le dernier article automatique. Le premier appel après la mise en service publie immédiatement.
2. **Mot-clé** — les sujets existants sont écartés ; Gemini choisit une requête longue traîne pertinente parmi les opportunités restantes. Si cette sélection échoue, la première opportunité inutilisée est retenue. Quand la liste est épuisée, Gemini propose de nouveaux sujets et rejette ceux qui ressemblent aux articles existants. Ce choix ne repose pas sur des données de volume de recherche.
3. **Rédaction** — Gemini essaie `GEMINI_MODEL`, puis chaque modèle de `GEMINI_FALLBACK_MODELS` dans l'ordre. Le modèle effectivement utilisé est enregistré dans l'article. Une clé API invalide arrête les essais.
4. **Publication** — l'article est enregistré avec `status: "published"`, puis le blog et le sitemap sont revalidés. En cas d'échec de génération ou d'enregistrement, aucun article n'est publié ; le prochain cron réessaie.
5. **Administration** — le bouton « Générer » dans `/admin/blog` crée toujours un brouillon à relire. Les articles automatiques peuvent aussi être corrigés ou retirés dans cette interface.

## Publication planifiée

`GET`/`POST /api/cron/blog`, protégé par `CRON_SECRET` :

```bash
curl -X POST https://rajaindiatour.fr/api/cron/blog \
     -H "Authorization: Bearer $CRON_SECRET"
```

Le cron est protégé par `CRON_SECRET`. Sur Vercel, créez aussi un Blob Store privé et ajoutez `BLOB_READ_WRITE_TOKEN` avant l'activation. Sans stockage persistant, l'endpoint refuse de générer un article. Chaque jour dispose d'un verrou d'écriture pour empêcher deux appels simultanés de publier deux articles. Pour un autre hébergeur, appelez l'URL chaque jour ; la règle des trois jours est appliquée côté serveur.

La publication est automatique : vérifiez régulièrement les articles pour corriger une éventuelle erreur factuelle. Les sujets sensibles aux changements (visa, vaccins, tarifs) demandent une attention particulière.

## Garde-fous donnés au modèle

Le prompt système (`lib/blog/prompt.ts`) interdit d'inventer prix, avis clients,
noms d'hôtels, statistiques ou numéros de licence, impose le vouvoiement, et limite
l'image d'illustration à une liste de fichiers réellement présents dans `/public`.
Ces règles réduisent le risque sans le supprimer : **contrôlez les articles publiés.**

## Architecture

| Fichier | Rôle |
| --- | --- |
| `lib/blog/generate.ts` | Choisit le moteur et assemble le brouillon |
| `lib/blog/keywords.ts` | Prépare les opportunités de mots-clés et exclut les sujets proches |
| `lib/blog/prompt.ts` | Brief éditorial, garde-fous, schéma de sortie, validation |
| `lib/blog/providers/gemini.ts` | Appel Gemini (défaut) |
| `lib/blog/providers/anthropic.ts` | Appel Claude (optionnel) |
| `lib/blog/store.ts` | Stockage des articles — **seul** module qui touche au disque |
| `lib/blog/posts.ts` | Fusion articles statiques + articles publiés, pour le site public |
| `lib/blog/auth.ts` | Session admin (cookie httpOnly) |
| `app/admin/blog/` | Interface de relecture |
| `app/api/admin/blog/` | Génération, édition, publication, suppression |
| `app/api/cron/blog/` | Publication planifiée et contrôle des trois jours |

## Hébergement — à savoir

**En local** : stockage sur disque (`content/blog/`).

**Sur Vercel** : le disque est en lecture seule. Le store utilise **Vercel Blob**
(store **privé**) quand `BLOB_READ_WRITE_TOKEN` est défini.

1. Vercel Dashboard → **Storage** → **Blob** → Create (**Private**)
2. Connectez le store au projet (ajoute `BLOB_READ_WRITE_TOKEN` automatiquement)
3. Redéployez

Sans ce jeton, `/admin/blog` s'ouvre mais génération / publication échouent.
Gardez le store en **Private** — le code lit/écrit via le SDK authentifié.
