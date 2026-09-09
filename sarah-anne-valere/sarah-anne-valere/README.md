# Sarah-Anne Valère — prototype de site e-commerce

## Ce que contient ce livrable

Un **prototype haute fidélité, fonctionnel côté navigateur**, de la boutique en ligne Sarah-Anne Valère : 11 pages HTML statiques, une feuille de style et trois scripts JavaScript. Tout s'exécute directement dans le navigateur, sans serveur ni base de données — le panier, la liste d'envies et l'authentification sont simulés avec `localStorage` afin que vous puissiez tester l'intégralité du parcours (navigation, filtres, ajout au panier, tunnel de commande, compte client) dès maintenant, en ouvrant simplement `index.html`.

**Ce que ce livrable n'est pas** : un site prêt pour une mise en production réelle avec paiement, stock et comptes clients persistants. Cela nécessite un backend (serveur + base de données + intégrations tierces), qui ne peut pas s'exécuter dans ce prototype statique. La section 3 ci-dessous détaille précisément ce qu'il faudrait construire, avec un schéma de base de données prêt à l'emploi.

## 1. Structure des fichiers

```
sav/
├── index.html              Accueil
├── boutique.html            Catalogue avec filtres (catégorie, peau, ingrédient, prix)
├── produit.html              Fiche produit dynamique (?id=slug-produit)
├── panier.html                Panier + tunnel de commande en 4 étapes
├── compte.html                 Connexion / inscription / espace client
├── a-propos.html                Histoire, frise chronologique, engagements, certifications
├── blog.html                     Journal (liste d'articles + filtre par catégorie)
├── article.html                   Article de blog dynamique (?id=slug-article)
├── contact.html                    Formulaire de contact + FAQ
├── mentions-legales.html
├── confidentialite.html
├── css/style.css                   Système de design complet (une seule feuille)
└── js/
    ├── data.js                     Catalogue produits, avis, articles (base simulée)
    ├── cart.js                     Logique panier / envies / promo / notifications
    └── main.js                     Comportements d'interface (menus, onglets, accordéons)
```

## 2. Mettre en ligne le prototype tel quel

Ces fichiers sont 100% statiques : ils peuvent être déposés sur n'importe quel hébergement statique (Netlify, Vercel, GitHub Pages, un simple bucket S3 + CloudFront, ou votre hébergement mutuel actuel). Aucune étape de build n'est requise. C'est suffisant pour présenter le design à des parties prenantes ou faire tester le parcours utilisateur, mais **pas pour vendre réellement**, faute de paiement et de stock réels.

## 3. Ce qu'il faut ajouter pour une mise en production réelle

### 3.1 Schéma de base de données (PostgreSQL, à adapter)

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  mot_de_passe_hash TEXT NOT NULL,
  prenom TEXT, nom TEXT, telephone TEXT,
  accepte_marketing BOOLEAN DEFAULT FALSE,
  cree_le TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE adresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  libelle TEXT, ligne1 TEXT, ligne2 TEXT,
  ville TEXT, code_postal TEXT, pays TEXT,
  par_defaut BOOLEAN DEFAULT FALSE
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE produits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  categorie_id INT REFERENCES categories(id),
  prix_centimes INT NOT NULL,
  description TEXT, mode_emploi JSONB, ingredients_liste TEXT,
  types_peau TEXT[], ingredients_cles TEXT[],
  stock INT NOT NULL DEFAULT 0,
  actif BOOLEAN DEFAULT TRUE,
  cree_le TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE produit_images (
  id SERIAL PRIMARY KEY,
  produit_id UUID REFERENCES produits(id),
  url TEXT NOT NULL, position INT DEFAULT 0
);

CREATE TABLE avis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produit_id UUID REFERENCES produits(id),
  client_id UUID REFERENCES clients(id),
  note INT CHECK (note BETWEEN 1 AND 5),
  texte TEXT, cree_le TIMESTAMPTZ DEFAULT now(),
  verifie BOOLEAN DEFAULT FALSE  -- achat confirmé
);

CREATE TABLE codes_promo (
  code TEXT PRIMARY KEY,
  taux_reduction NUMERIC(4,3),        -- ex. 0.10 pour 10%
  montant_min_centimes INT DEFAULT 0,
  expire_le TIMESTAMPTZ,
  usage_max INT, usage_actuel INT DEFAULT 0
);

CREATE TABLE commandes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero TEXT UNIQUE NOT NULL,          -- ex. SAV-482913
  client_id UUID REFERENCES clients(id),
  statut TEXT CHECK (statut IN ('en_attente','payee','preparation','expediee','livree','annulee','remboursee')),
  adresse_livraison JSONB,
  sous_total_centimes INT, remise_centimes INT DEFAULT 0,
  frais_livraison_centimes INT, total_centimes INT,
  code_promo TEXT REFERENCES codes_promo(code),
  transporteur TEXT, numero_suivi TEXT,
  paiement_provider TEXT,              -- 'stripe' | 'paypal'
  paiement_reference TEXT,             -- id de transaction externe
  cree_le TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE commande_lignes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commande_id UUID REFERENCES commandes(id),
  produit_id UUID REFERENCES produits(id),
  quantite INT NOT NULL,
  prix_unitaire_centimes INT NOT NULL
);

CREATE TABLE newsletter_abonnes (
  email TEXT PRIMARY KEY,
  inscrit_le TIMESTAMPTZ DEFAULT now(),
  actif BOOLEAN DEFAULT TRUE
);
```

Index recommandés : `produits(categorie_id)`, `produits(actif)`, `commandes(client_id)`, `commandes(statut)`, `avis(produit_id)`.

### 3.2 API à construire (REST ou GraphQL)

| Domaine | Endpoints clés |
|---|---|
| Catalogue | `GET /produits` (filtres query params), `GET /produits/:slug`, `GET /produits/:id/avis` |
| Panier | Géré côté client jusqu'au checkout, puis `POST /commandes` |
| Paiement | `POST /paiements/intention` (Stripe PaymentIntent) ou `POST /paiements/paypal/commande` |
| Comptes | `POST /auth/inscription`, `POST /auth/connexion`, `GET /clients/me/commandes`, `GET/POST /clients/me/envies` |
| Avis | `POST /produits/:id/avis` (réservé aux acheteurs vérifiés) |
| Promo | `POST /codes-promo/verifier` |
| Newsletter | `POST /newsletter/abonnement` |

### 3.3 Paiement (Stripe recommandé, PayPal en complément)

- Créer un `PaymentIntent` côté serveur au moment où le client passe à l'étape « Paiement » ; ne jamais manipuler de numéro de carte côté client (Stripe Elements ou Stripe Checkout s'en charge).
- Webhook `payment_intent.succeeded` → passer la commande au statut `payee` et décrémenter le stock de façon atomique (transaction SQL) pour éviter la survente.
- Ajouter PayPal via PayPal Checkout SDK comme second bouton de paiement.
- Ne jamais stocker de numéro de carte : c'est le rôle du prestataire (conformité PCI-DSS).

### 3.4 Gestion des stocks en temps réel

- Le stock vit en base (`produits.stock`), décrémenté dans la même transaction que la validation de paiement.
- Afficher un stock bas ou une rupture directement depuis cette colonne (le prototype simule déjà l'affichage « il ne reste que X unités »).
- Pour plusieurs canaux de vente (boutique physique, marketplace), un webhook de synchronisation d'inventaire est recommandé.

### 3.5 SEO & analytics

- Rendre les pages produit et blog en SSR ou pré-rendues (Next.js, Astro, Nuxt) plutôt qu'en pur client-side, pour l'indexation.
- Ajouter des données structurées `schema.org/Product` (prix, disponibilité, note) sur chaque fiche produit.
- Générer un `sitemap.xml` et un `robots.txt`.
- Brancher Google Analytics 4 ou Plausible, avec suivi d'événements e-commerce (`add_to_cart`, `begin_checkout`, `purchase`).

### 3.6 Recommandations produits

Le prototype affiche une suggestion simple (même catégorie ou ingrédient commun). Une vraie recommandation « intelligente » utiliserait l'historique d'achat et de navigation agrégé (ex. règles d'association ou un service comme Algolia Recommend / AWS Personalize).

## 4. Ce qui fonctionne déjà dans le prototype

- Filtrage multi-critères en direct (catégorie, type de peau, ingrédient, budget) sur la page Boutique
- Fiche produit avec galerie zoomable, onglets, avis, suggestions complémentaires
- Panier persistant (localStorage), tunnel de commande à 4 étapes avec code promo simulé (`BIENVENUE10`, `ATELIER15`)
- Espace client (connexion/inscription simulées), historique de commandes fictif, liste d'envies persistante
- Blog avec filtre par catégorie et articles dynamiques
- Formulaire de contact et FAQ en accordéon
- Newsletter (simulation), mentions légales et politique de confidentialité (trames à faire valider juridiquement)
- Responsive complet (mobile, tablette, desktop), focus clavier visible, `prefers-reduced-motion` respecté

## 5. Prochaines étapes suggérées

1. Choisir une stack backend (ex. Node/Express ou Django + PostgreSQL) et implémenter le schéma ci-dessus.
2. Intégrer Stripe (paiement) en environnement de test avant la mise en production.
3. Remplacer les images Unsplash de démonstration par les photographies produit réelles de la marque.
4. Faire relire les pages légales par un juriste (droit de la consommation, RGPD).
5. Brancher un CMS headless (ex. Sanity, Contentful) pour que l'équipe marketing puisse publier les articles du Journal sans toucher au code.
