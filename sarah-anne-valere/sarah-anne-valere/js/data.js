/* ===========================================================
   SARAH-ANNE VALÈRE — données produits (base simulée)
   En production : ces données proviennent d'une API (voir README §3)
   =========================================================== */

const PRODUITS = [
  {
    id: "serum-eclat-absolu",
    nom: "Sérum Éclat Absolu",
    categorie: "Soins visage",
    prix: 78,
    note: 4.8,
    avisNb: 142,
    peaux: ["Tous types", "Terne"],
    ingredients: ["Vitamine C", "Rose de mai"],
    phare: true,
    stock: 34,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Un concentré lumière à la vitamine C stabilisée et à l'absolu de rose de mai, pour un teint visiblement unifié dès quatre semaines. Texture fluide, non collante, qui se glisse sous la crème de jour comme sous le fond de teint.",
    modeEmploi: [
      "Le matin, sur peau nettoyée et séchée",
      "Trois gouttes, visage et cou",
      "Laisser pénétrer 60 secondes avant la crème",
      "Toujours faire suivre d'une protection solaire"
    ],
    ingredientsListe: "Aqua, Acide Ascorbique (10%), Rosa Centifolia Flower Extract, Glycérine végétale, Acide Hyaluronique, Vitamine E, Acide Férulique."
  },
  {
    id: "creme-nuit-regenerante",
    nom: "Crème Nuit Régénérante",
    categorie: "Soins visage",
    prix: 92,
    note: 4.9,
    avisNb: 98,
    peaux: ["Sèche", "Mature"],
    ingredients: ["Figue de barbarie", "Rétinol doux"],
    phare: true,
    stock: 21,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=900&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Riche sans être dense, cette crème de nuit associe l'huile de figue de barbarie à un rétinol doux encapsulé pour accompagner le renouvellement cellulaire pendant le sommeil, sans tirailler la peau au réveil.",
    modeEmploi: [
      "Le soir, en dernière étape de routine",
      "Une noisette, en mouvements ascendants",
      "Éviter le contour des yeux",
      "Débuter à raison de 3 soirs par semaine"
    ],
    ingredientsListe: "Aqua, Opuntia Ficus-Indica Seed Oil, Rétinol encapsulé (0,3%), Beurre de karité, Squalane végétal, Céramides."
  },
  {
    id: "huile-seche-sublimatrice",
    nom: "Huile Sèche Sublimatrice",
    categorie: "Soins corps",
    prix: 58,
    note: 4.7,
    avisNb: 76,
    peaux: ["Tous types"],
    ingredients: ["Argan", "Néroli"],
    phare: true,
    stock: 40,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=900&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595425964272-3a3b7f0a099e?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Une brume d'huile sèche à l'argan du Maroc et à la fleur de néroli, absorbée en quelques secondes, qui laisse le grain de peau satiné et délicatement parfumé sans film gras.",
    modeEmploi: ["Après la douche, sur peau encore humide", "Deux à trois pressions par zone", "Masser jusqu'à absorption complète"],
    ingredientsListe: "Argania Spinosa Kernel Oil, Citrus Aurantium Flower Oil, Vitamine E, Squalane végétal."
  },
  {
    id: "eau-de-parfum-aurore-doree",
    nom: "Eau de Parfum Aurore Dorée",
    categorie: "Parfums",
    prix: 135,
    note: 4.9,
    avisNb: 210,
    peaux: ["Tous types"],
    ingredients: ["Néroli", "Bois de santal"],
    phare: true,
    stock: 18,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Sillage doré construit autour du néroli de Tunisie, d'un cœur de fleur d'oranger et d'un fond de bois de santal — une signature chaude, lumineuse, pensée pour durer du matin au soir.",
    modeEmploi: ["Vaporiser sur les points de pulsation", "Poignets, cou, intérieur des coudes", "Ne pas frotter les poignets entre eux"],
    ingredientsListe: "Alcohol Denat., Parfum (Fragrance), Citrus Aurantium Flower Oil, Santalum Album Oil, Limonene, Linalool."
  },
  {
    id: "baume-levres-nourrissant",
    nom: "Baume Lèvres Nourrissant",
    categorie: "Soins visage",
    prix: 24,
    note: 4.6,
    avisNb: 63,
    peaux: ["Tous types", "Sensible"],
    ingredients: ["Beurre de karité"],
    phare: false,
    stock: 55,
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=900&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=900&auto=format&fit=crop"],
    description: "Un baume fondant au beurre de karité brut et à la cire d'abeille, pour des lèvres nourries en continu — au format nomade.",
    modeEmploi: ["À appliquer autant que nécessaire", "Idéal avant le coucher"],
    ingredientsListe: "Butyrospermum Parkii Butter, Cera Alba, Ricinus Communis Seed Oil, Tocopherol."
  },
  {
    id: "masque-argile-purifiant",
    nom: "Masque Argile Purifiant",
    categorie: "Soins visage",
    prix: 46,
    note: 4.5,
    avisNb: 51,
    peaux: ["Mixte", "Grasse"],
    ingredients: ["Argile verte", "Centella asiatica"],
    phare: false,
    stock: 29,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?q=80&w=900&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?q=80&w=900&auto=format&fit=crop"],
    description: "Argile verte et centella asiatica resserrent les pores et matifient sans dessécher — un rituel hebdomadaire pour un teint net.",
    modeEmploi: ["Une à deux fois par semaine", "Couche fine, éviter le contour des yeux", "Laisser poser 10 minutes, rincer à l'eau tiède"],
    ingredientsListe: "Montmorillonite, Centella Asiatica Extract, Aloe Barbadensis Leaf Juice, Glycérine végétale."
  },
  {
    id: "contour-yeux-veloute",
    nom: "Contour des Yeux Velouté",
    categorie: "Soins visage",
    prix: 64,
    note: 4.7,
    avisNb: 84,
    peaux: ["Tous types", "Mature"],
    ingredients: ["Acide hyaluronique", "Caféine"],
    phare: false,
    stock: 26,
    image: "https://images.unsplash.com/photo-1620917669809-2f27c9f97e0f?q=80&w=900&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1620917669809-2f27c9f97e0f?q=80&w=900&auto=format&fit=crop"],
    description: "Un soin léger à l'acide hyaluronique et à la caféine, roulé à froid, pour repulper et défatiguer le regard dès le réveil.",
    modeEmploi: ["Matin et soir", "Tapoter en partant de l'angle interne", "Ne pas frotter"],
    ingredientsListe: "Aqua, Sodium Hyaluronate, Caffeine, Panthenol, Extrait de camomille."
  },
  {
    id: "coffret-rituel-signature",
    nom: "Coffret Rituel Signature",
    categorie: "Rituels",
    prix: 165,
    note: 5.0,
    avisNb: 39,
    peaux: ["Tous types"],
    ingredients: ["Rose de mai", "Argan"],
    phare: false,
    stock: 15,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=900&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=900&auto=format&fit=crop"],
    description: "Le Sérum Éclat Absolu, la Crème Nuit Régénérante et l'Huile Sèche Sublimatrice, réunis dans un coffret en coton recyclé — le rituel complet de la maison, en édition cadeau.",
    modeEmploi: ["Voir le mode d'emploi de chaque soin inclus"],
    ingredientsListe: "Voir chaque produit du coffret."
  },
  {
    id: "lait-demaquillant-doux",
    nom: "Lait Démaquillant Doux",
    categorie: "Soins visage",
    prix: 38,
    note: 4.6,
    avisNb: 47,
    peaux: ["Sensible", "Sèche"],
    ingredients: ["Camomille", "Avoine"],
    phare: false,
    stock: 48,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=900&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=900&auto=format&fit=crop"],
    description: "Une texture lait qui dissout le maquillage et les impuretés du jour sans décaper, apaisée à la camomille et à l'avoine colloïdale.",
    modeEmploi: ["Matin et soir", "Masser sur peau sèche", "Retirer au coton ou à l'eau tiède"],
    ingredientsListe: "Aqua, Avena Sativa Kernel Extract, Chamomilla Recutita Flower Extract, Glycérine végétale."
  },
  {
    id: "brume-fixante-fleur-oranger",
    nom: "Brume Fixante Fleur d'Oranger",
    categorie: "Parfums",
    prix: 32,
    note: 4.4,
    avisNb: 28,
    peaux: ["Tous types"],
    ingredients: ["Fleur d'oranger"],
    phare: false,
    stock: 60,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop"],
    description: "Brume légère à l'eau de fleur d'oranger, à vaporiser sur le maquillage pour fixer et rafraîchir, ou sur les cheveux en fin de journée.",
    modeEmploi: ["Vaporiser à 20 cm du visage, yeux fermés"],
    ingredientsListe: "Aqua, Citrus Aurantium Flower Water, Glycérine végétale, parfum naturel."
  }
];

const AVIS = {
  "serum-eclat-absolu": [
    { auteur: "Camille D.", note: 5, date: "12 juillet 2026", texte: "Le teint est visiblement plus lumineux après trois semaines. Texture parfaite, pas grasse." },
    { auteur: "Aïcha K.", note: 5, date: "2 juin 2026", texte: "J'ai essayé beaucoup de sérums vitamine C, celui-ci ne pique pas et sent très bon." },
    { auteur: "Marion T.", note: 4, date: "18 mai 2026", texte: "Très bon produit, seul bémol le flacon se vide vite si on est généreuse." }
  ],
  "creme-nuit-regenerante": [
    { auteur: "Sophie L.", note: 5, date: "3 août 2026", texte: "Ma peau mature n'a jamais été aussi souple au réveil. Un vrai coup de cœur." },
    { auteur: "Nadia B.", note: 5, date: "20 juillet 2026", texte: "Le rétinol doux tient sa promesse : aucune irritation même en usage quotidien." }
  ],
  "eau-de-parfum-aurore-doree": [
    { auteur: "Elise M.", note: 5, date: "15 juillet 2026", texte: "Tient toute la journée et je reçois des compliments à chaque fois." },
    { auteur: "Yasmine R.", note: 5, date: "9 juin 2026", texte: "Sillage chaud et élégant, sans être entêtant. Mon parfum de signature désormais." }
  ]
};

const ARTICLES = [
  {
    id: "rituels-selon-saisons",
    titre: "Les rituels de soin selon les saisons",
    categorie: "Routine",
    date: "28 août 2026",
    dureeLecture: "5 min",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop",
    extrait: "Pourquoi votre peau ne demande pas la même chose en janvier qu'en juillet — et comment ajuster sa routine sans tout changer.",
    contenu: [
      "La peau est un organe vivant, qui réagit à l'humidité de l'air, aux écarts de température et à l'exposition au soleil. Ce que nous appelons une « routine idéale » n'existe donc pas dans l'absolu : elle se module au fil des saisons.",
      "En hiver, l'air sec et le chauffage fragilisent la barrière cutanée. C'est le moment de privilégier des textures plus riches, comme notre Crème Nuit Régénérante, et de réduire temporairement les actifs exfoliants.",
      "L'été inverse la logique : la production de sébum augmente, la peau respire moins bien sous des textures lourdes. Une brume, une huile sèche à absorption rapide et une protection solaire quotidienne suffisent souvent à l'essentiel.",
      "Le vrai luxe n'est pas d'accumuler les produits, mais de savoir écouter ce que sa peau demande, semaine après semaine."
    ]
  },
  {
    id: "comprendre-sa-peau",
    titre: "Comprendre sa peau : bien choisir sa routine",
    categorie: "Conseils",
    date: "14 août 2026",
    dureeLecture: "6 min",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    extrait: "Sèche, mixte, sensible, mature : un petit guide pour identifier son type de peau et construire une routine qui lui correspond vraiment.",
    contenu: [
      "Avant de choisir un produit, il est utile de comprendre ce que traverse sa peau. Une peau sèche manque de lipides, une peau grasse en produit en excès, une peau sensible réagit vite aux changements — et la plupart des peaux sont en réalité mixtes.",
      "Le test le plus simple : nettoyer son visage, ne rien appliquer, et observer après une heure. Zones qui tiraillent, zones qui brillent : la carte de votre peau est là.",
      "Une routine efficace tient en trois étapes non négociables — nettoyer, hydrater, protéger — et en actifs ciblés ajoutés progressivement, un à la fois, pour identifier ce qui fonctionne réellement."
    ]
  },
  {
    id: "art-du-parfum",
    titre: "L'art du parfum : composer sa signature olfactive",
    categorie: "Parfumerie",
    date: "2 août 2026",
    dureeLecture: "4 min",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
    extrait: "Notes de tête, de cœur, de fond : comprendre la structure d'un parfum pour mieux choisir celui qui vous ressemble.",
    contenu: [
      "Un parfum se lit dans le temps. Les notes de tête, volatiles, s'évaporent en quelques minutes ; les notes de cœur forment l'identité du parfum pendant plusieurs heures ; les notes de fond, plus lourdes, sont ce qui reste sur la peau en fin de journée.",
      "Aurore Dorée a été construit sur cette tension entre fraîcheur et chaleur : le néroli en tête, la fleur d'oranger au cœur, le bois de santal en fond.",
      "Pour choisir un parfum, mieux vaut le porter sur la peau plusieurs heures avant de trancher : c'est la note de fond, et non l'impression du premier instant, qui devient votre signature."
    ]
  },
  {
    id: "cruelty-free-vegan-naturel",
    titre: "Cruelty-free, vegan, naturel : que signifient vraiment ces engagements ?",
    categorie: "Engagements",
    date: "19 juillet 2026",
    dureeLecture: "5 min",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200&auto=format&fit=crop",
    extrait: "Ces mots sont partout en cosmétique. Voici ce qu'ils recouvrent précisément, et ce que nous nous engageons à vérifier avant chaque lancement.",
    contenu: [
      "« Cruelty-free » signifie qu'aucun test sur les animaux n'a été réalisé, ni par la marque ni par ses fournisseurs, à aucune étape de développement — nous le faisons certifier de manière indépendante.",
      "« Vegan » va plus loin : aucun ingrédient d'origine animale n'entre dans la formule, y compris la cire d'abeille ou le miel, souvent présents en cosmétique sans que cela soit visible au premier regard.",
      "« Naturel » est le terme le plus flou du secteur, car non réglementé. Chez Sarah-Anne Valère, nous publions pour chaque produit le pourcentage exact d'ingrédients d'origine naturelle plutôt que d'utiliser le mot seul."
    ]
  }
];
