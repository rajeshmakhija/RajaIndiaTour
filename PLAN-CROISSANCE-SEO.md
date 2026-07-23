# Raja India Tour — Plan complet : site professionnel, SEO & croissance

**Domaine :** [rajaindiatour.fr](https://rajaindiatour.fr)  
**Redirect :** rajaindiatour.com → rajaindiatour.fr (301)  
**Durée :** 12 semaines  
**Marché cible :** voyageurs français planifiant un voyage en Inde  
**Langue :** 100 % français natif (pas de traduction anglaise)

---

## Comment transformer ce site en agence professionnelle et visible sur Google France

Un site de voyage qui convertit et se positionne sur Google repose sur **quatre piliers** :

### 1. Confiance & conversion (E-E-A-T)
- **Expertise** : Raja guide agréé, 25 ans d’expérience, texte personnel authentique (pas de ton agence générique).
- **Expérience** : photos réelles, avis clients français, numéros WhatsApp directs, devis sous 24h.
- **Autorité** : agrément gouvernement indien, mentions légales, CGV, politique RGPD.
- **Fiabilité** : HTTPS, domaine `.fr`, prix en EUR, dates au format français.

### 2. Architecture SEO programmatique
- Des **centaines de pages longue traîne** ciblant des requêtes précises :  
  `voyage rajasthan 10 jours`, `circuit inde pas cher`, `guide francophone inde`, etc.
- Structure en **clusters** : hub destination → villes → variantes de circuits → FAQ locale.
- Chaque page : **title, meta, H1, schema JSON-LD, maillage interne**, contenu unique.

### 3. Contenu éditorial & outils
- Blog français (visa, budget, quand partir, sécurité, culture).
- Outils interactifs : planificateur IA, calculateur budget, recherche vols, trip builder.
- Landing pages campagnes ads (`/lp/*`) avec un seul CTA pour maximiser le taux de conversion.

### 4. Monétisation & suivi
- Stripe (acompte 30 % en EUR) → réservation en ligne → reçus PDF.
- GA4 + Search Console + suivi des leads (formulaire, WhatsApp, paiements).
- A/B tests homepage, backlinks presse/blogs voyage FR.

---

## État actuel (Phase 1 — en cours)

| Élément | Statut |
|---------|--------|
| Next.js 15 + Tailwind v4 + TypeScript | ✅ Fait |
| Design blanc, rouge & bleu (logo RajaIndiaTour) | ✅ Fait |
| Landing : hero vidéo, à propos, trust bar, destinations, circuits | ✅ Fait |
| Trip builder 3 étapes + planificateur IA + vols | ✅ Fait |
| WhatsApp dual (IA + Raja) | ✅ Fait |
| Pages légales (CGV, confidentialité, mentions) | ✅ Fait |
| Sitemap, robots, schema JSON-LD | ✅ Fait |
| Déploiement Vercel + domaine `.fr` | ⏳ À faire |
| Redirect 301 `.com` → `.fr` | ⏳ À faire |
| GA4 + Search Console | ⏳ À faire |
| Photos réelles Raja + numéro WhatsApp réel | ⏳ À fournir |

---

## Vue d’ensemble par phases

| Phase | Semaines | Objectif | Résultat attendu |
|-------|----------|----------|------------------|
| **1 — Fondations & MVP** | 1–2 | Site live qui convertit | Launch |
| **2 — SEO & contenu pilote** | 3–4 | Premières pages Google | 25+ pages indexées |
| **3 — Scale & monétisation** | 5–8 | Volume SEO + paiements | 150+ pages + Stripe |
| **4 — Outils & checkout** | 9–10 | Réservation en ligne | Checkout EUR intégré |
| **5 — Croissance** | 11–12 | Page 1 Google France | Backlinks + optimisation |

---

## PHASE 1 — Fondations & MVP (Semaines 1–2)

**Objectif :** Remplacer l’ancienne présence web par un site professionnel qui accroche et convertit dès les 3 premières secondes.

### Livrables

- [x] Next.js 15 + Tailwind + design system (blanc, rouge `#c2185b`, bleu `#0056a6`)
- [x] Landing page :
  - Hero vidéo + panneau valeurs
  - Section À propos (texte Raja)
  - Trust bar
  - Grille destinations
  - Circuits vedettes
  - Trip builder 3 étapes
  - Planificateur IA (estimation EUR)
  - Recherche vols (géoloc ou Paris CDG → Delhi J+20)
  - Meet Raja, avis, FAQ, CTA final
- [x] Formulaire contact + API email (Resend)
- [x] Widget WhatsApp dual (assistant IA + contact direct Raja)
- [x] Pages légales (CGV, confidentialité, mentions légales) — conformité RGPD
- [x] Fondation SEO (metadata, sitemap.xml, robots.txt, JSON-LD)
- [ ] Déploiement Vercel sur `rajaindiatour.fr`
- [ ] Redirect 301 `rajaindiatour.com` → `rajaindiatour.fr`
- [ ] GA4 + Google Search Console

### Critères de succès

- Site live en HTTPS
- Formulaire envoie les emails
- WhatsApp fonctionnel
- Temps de chargement < 3 s depuis Paris (LCP mobile)
- Score Lighthouse mobile ≥ 85

### Prérequis avant go-live

| Élément | Responsable |
|---------|-------------|
| Domaine `.fr` configuré (DNS → Vercel) | Raja / hébergeur |
| Photo professionnelle Raja | Raja |
| Numéro WhatsApp réel | Raja |
| Email contact (`contact@rajaindiatour.fr`) | Raja |
| Clé API Resend (emails) | Technique |
| Clé API OpenAI (chat IA — optionnel) | Technique |

---

## PHASE 2 — Architecture SEO & contenu pilote (Semaines 3–4)

**Objectif :** Construire le moteur SEO capable de générer 150+ pages de qualité.

### Livrables

1. **Recherche mots-clés** (2 000–5 000 requêtes françaises)
   - Intent : informationnel, commercial, transactionnel
   - Priorité : Rajasthan, Kerala, Triangle d’Or, Ladakh, Goa
   - Longue traîne : durée + budget + style (`voyage inde 2 semaines pas cher`)

2. **Modèle de contenu JSON**
   ```json
   {
     "destination": "rajasthan",
     "city": "jaipur",
     "circuit_slug": "voyage-rajasthan-12-jours",
     "duration_days": 12,
     "price_from_eur": 2450,
     "highlights": [],
     "itinerary": [],
     "faq": [],
     "meta_title": "",
     "meta_description": "",
     "schema": "TouristTrip"
   }
   ```

3. **Templates programmatiques**
   - `/destinations/[slug]/` — hub destination
   - `/destinations/[slug]/[ville]/` — pages villes
   - `/circuits/[slug]/` — fiches circuit détaillées
   - `/blog/[slug]/` — articles éditoriaux

4. **Cluster pilote Rajasthan**
   - Hub : `/destinations/rajasthan/`
   - Villes : Jaipur, Jodhpur, Udaipur
   - 10 variantes : 7j, 10j, 12j, 15j, luxe, économique, famille, lune de miel…

5. **5 hubs destinations**
   - Rajasthan, Kerala, Ladakh, Goa, Triangle d’Or

6. **10 pages longue traîne** (exemples)
   - `voyage inde pas cher`
   - `circuit rajasthan 10 jours`
   - `guide francophone inde`
   - `voyage inde en famille`
   - `quand partir en inde`

7. **Sanity CMS** + 5 articles blog prioritaires
   - Visa Inde pour Français
   - Budget voyage Inde 2026
   - Meilleure période pour visiter le Rajasthan
   - Sécurité voyage Inde
   - Inde : premiers pas pour débutants

8. **Page `/avis/`** — 10+ témoignages français structurés (schema `Review`)

### SEO technique (chaque page)

- `title` unique ≤ 60 caractères
- `meta description` unique ≤ 155 caractères
- H1 unique, hiérarchie H2/H3
- URL canonique + `hreflang="fr"`
- JSON-LD : `TravelAgency`, `TouristTrip`, `FAQPage`, `BreadcrumbList`
- Images : alt text FR, WebP, lazy load
- Maillage interne : hub → spoke → CTA contact

### Critères de succès

- 25+ pages indexables dans le sitemap
- Métadonnées et schema uniques sur chaque page
- Maillage interne actif (min. 3 liens internes par page)
- Première soumission sitemap dans Search Console

---

## PHASE 3 — Scale SEO, paiements & landing pages ads (Semaines 5–8)

**Objectif :** Passer à l’échelle du contenu et commencer à encaisser les acomptes.

### Livrables

1. **100–150 pages circuits**
   - 12 variantes × 14 destinations
   - Génération depuis le modèle JSON + revue humaine Raja

2. **Clusters destinations complets**
   - Villes, FAQ locale, meilleure période, budget moyen

3. **8 articles blog supplémentaires** (2/semaine)

4. **Landing pages campagnes** (`/lp/*`)
   - `/lp/devis-gratuit` — CTA unique formulaire
   - `/lp/voyage-rajasthan` — campagne Google Ads Rajasthan
   - `/lp/circuit-pas-cher` — intention prix

5. **Stripe Payment Links**
   - Raja envoie lien acompte 30 % par email/WhatsApp
   - Webhooks Stripe → email confirmation français
   - Montants en EUR, CGV acceptées avant paiement

6. **20+ avis clients** intégrés (homepage + `/avis/`)

7. **A/B tests homepage** — 3 variantes copy hero

### Calendrier hebdomadaire

| Semaine | Pages | Extra |
|---------|-------|-------|
| S5 | 30 circuits | Stripe live |
| S6 | 30 circuits | `/lp/devis-gratuit` |
| S7 | 30 circuits | `/lp/voyage-rajasthan` |
| S8 | 30 circuits | Avis + A/B tests |

### Critères de succès

- 150+ URLs dans le sitemap
- Premier paiement test réussi
- 10+ impressions Search Console sur requêtes cibles
- Taux de conversion formulaire ≥ 3 %

---

## PHASE 4 — Checkout intégré, outils & IA avancée (Semaines 9–10)

**Objectif :** Transformer les leads en réservations avec des outils interactifs et un parcours paiement fluide.

### Livrables

1. **Checkout Stripe intégré** — `/reservation/paiement/`
2. **Bouton « Réserver et payer l’acompte »** sur les circuits à prix fixe
3. **Panel admin Raja** — `/admin/devis/` pour créer des liens de paiement
4. **Reçus PDF français** après paiement
5. **Calculateur budget** — `/outils/calculateur-budget/`
6. **Planificateur itinéraire** — pré-remplit le formulaire contact
7. **Assistant IA RAG** — entraîné sur les 150+ pages du site
8. **Vérificateur visa Inde** — `/outils/visa-inde/`
9. **Guides saisonniers** — mousson, Diwali, Holi

### Parcours réservation

```
Devis gratuit → Raja envoie devis personnalisé → Client accepte
  → Acompte 30 % (Stripe) → Reçu PDF
  → Lien solde 70 % envoyé 30 jours avant le départ
```

### Critères de succès

- Parcours paiement complet testé bout en bout
- Admin accessible et sécurisé (auth Raja)
- Assistant IA répond avec infos du site (pas d’hallucination prix)

---

## PHASE 5 — Croissance, backlinks & optimisation (Semaines 11–12)

**Objectif :** Accélérer les classements et optimiser ce qui fonctionne.

### Livrables

1. **Outreach backlinks** — 15 blogs / médias voyage français
2. **Optimisation Search Console** — pages à fort impressions, faible CTR
3. **Audit Core Web Vitals** — Lighthouse 90+ mobile
4. **Newsletter** — capture email + contenu voyage Inde
5. **Partenariat affiliation vols** (Skyscanner / Kayak)
6. **Processus collecte avis** post-voyage (email automatique J+7)
7. **Rapport 90 jours** — KPIs + plan trimestre suivant

### Objectifs 90 jours

| KPI | Cible |
|-----|-------|
| Pages indexées | 150+ |
| Classement « voyage inde » | Top 30 |
| Leads / mois | 20+ |
| Acomptes / mois | 5+ |
| Backlinks français | 10+ |
| Taux de rebond homepage | < 45 % |

---

## Calendrier semaine par semaine

| Semaine | Phase | Actions clés |
|---------|-------|--------------|
| **S1** | 1 | Scaffold, design system, Hero + TrustBar + À propos |
| **S2** | 1 | Trip builder, vols, chat, déploiement `.fr` |
| **S3** | 2 | Mots-clés, modèle JSON, templates |
| **S4** | 2 | Cluster Rajasthan, 5 hubs, blog, avis |
| **S5** | 3 | 30 pages + Stripe Payment Links |
| **S6** | 3 | 30 pages + landing `/lp/devis-gratuit` |
| **S7** | 3 | 30 pages + landing `/lp/voyage-rajasthan` |
| **S8** | 3 | 30 pages finales + A/B tests |
| **S9** | 4 | Checkout intégré + admin devis |
| **S10** | 4 | Calculateurs + IA RAG avancée |
| **S11** | 5 | Backlinks + Search Console |
| **S12** | 5 | Audit performance + rapport 90 jours |

---

## Stack technique recommandée

| Couche | Choix | Raison |
|--------|-------|--------|
| Framework | Next.js 15 App Router | SEO SSR/SSG, performance, Vercel |
| Styles | Tailwind CSS v4 | Rapide, cohérent avec design system |
| CMS | Sanity (Phase 2) | Blog + contenu éditable par Raja |
| Emails | Resend | Transactionnel, délivrabilité |
| Paiements | Stripe (Inde / EUR) | Acomptes 30 %, webhooks, PDF |
| Analytics | GA4 + Search Console | Trafic, conversions, SEO |
| Hébergement | Vercel | Edge, HTTPS, preview branches |
| IA | OpenAI + RAG (Phase 4) | Assistant WhatsApp / chat site |

---

## Structure URL cible (150+ pages)

```
/                                    → Landing conversion
/a-propos/                           → Histoire Raja (E-E-A-T)
/contact/                            → Formulaire principal
/destinations/                       → Index destinations
/destinations/rajasthan/             → Hub Rajasthan
/destinations/rajasthan/jaipur/      → Ville
/circuits/                           → Index circuits
/circuits/voyage-rajasthan-12-jours/ → Fiche circuit SEO
/blog/                               → Articles éditoriaux
/blog/visa-inde-francais/            → Article longue traîne
/avis/                               → Témoignages clients
/outils/calculateur-budget/          → Outil interactif
/outils/visa-inde/                   → Outil visa
/lp/devis-gratuit/                   → Landing Google Ads
/lp/voyage-rajasthan/                → Landing campagne
/reservation/paiement/               → Checkout Stripe
```

---

## Règles SEO contenu (français natif)

1. **Une requête principale par page** — pas de cannibalisation.
2. **Contenu minimum 800 mots** sur les pages circuits et destinations.
3. **Prix toujours en EUR** avec fourchette (« à partir de X € »).
4. **Ton personnel Raja** — « Je vous propose… », pas « Nous offrons… ».
5. **CTA répété** : devis gratuit, WhatsApp, planificateur IA.
6. **Pas de contenu dupliqué** entre `.fr` et `.com` (redirect total).
7. **Images réelles** prioritaires sur stock Unsplash (Phase 2).

---

## Checklist go-live immédiate (fin Phase 1)

- [ ] Configurer variables d’environnement production (`.env`)
  - `NEXT_PUBLIC_SITE_URL=https://rajaindiatour.fr`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER=...`
  - `CONTACT_EMAIL=contact@rajaindiatour.fr`
  - `RESEND_API_KEY=...`
- [ ] Déployer sur Vercel
- [ ] Pointer DNS `rajaindiatour.fr` vers Vercel
- [ ] Redirect 301 `rajaindiatour.com` → `rajaindiatour.fr`
- [ ] Soumettre sitemap dans Google Search Console
- [ ] Installer GA4
- [ ] Remplacer images placeholder par photos Raja
- [ ] Tester formulaire, WhatsApp, planificateur, vols sur mobile

---

## Prochaines étapes recommandées (Semaine 3)

1. Lancer la recherche mots-clés (Ahrefs / Semrush / Google Keyword Planner FR).
2. Définir le schéma JSON des circuits dans `lib/data/`.
3. Créer le premier template `/circuits/[slug]/page.tsx`.
4. Publier le cluster Rajasthan (hub + 3 villes + 3 circuits).
5. Connecter Sanity pour le blog.
6. Fournir à Raja : WhatsApp, photos, validation des textes circuits.

---

*Document de référence — Raja India Tour · rajaindiatour.fr · Mis à jour : juillet 2026*
