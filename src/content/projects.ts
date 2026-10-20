// Contenu des études de cas. Règle : aucun nom d'employeur ou de client,
// aucune URL interne, aucune personne. On décrit le problème et la solution.

export type FlowStep = { label: string; detail?: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  kind: "Plugin QGIS" | "Application web" | "Automatisation" | "Application mobile" | "Analyse spatiale";
  year: string;
  status: string;
  /** Position dans le récit « de la donnée au camion » (1 à 3). */
  chain?: 1 | 2 | 3;
  featured?: boolean;
  published: boolean;
  context: string;
  problem: string;
  solution: string[];
  highlights: { value: string; label: string }[];
  stack: string[];
  flow: FlowStep[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "iautor",
    title: "iAutor",
    tagline: "D'un arrêté de transport exceptionnel en PDF à un itinéraire vectorisé, en quelques minutes.",
    kind: "Application web",
    year: "2026",
    status: "Prototype, présenté en interne",
    featured: true,
    published: true,
    context:
      "Un convoi exceptionnel ne roule pas où il veut : son itinéraire est imposé par un arrêté, rédigé comme une liste de routes, de communes et de carrefours. Le service des autorisations d'un groupe de transport devait retracer ces itinéraires à la main, sur carte, pour chaque dossier.",
    problem:
      "Retracer un itinéraire à partir d'un texte, c'est long et c'est là que naissent les erreurs. Une mauvaise bifurcation, et un convoi de plus de 4 m se retrouve face à un pont trop bas. La demande interne était forte, alimentée par des heurts d'ouvrages.",
    solution: [
      "Un moteur Python lit le PDF du Cerfa ou de l'arrêté et en extrait le tableau d'itinéraire, ligne par ligne.",
      "Chaque ligne est recalée sur le graphe routier de la BD TOPO de l'IGN (PostGIS), avec un algorithme de Viterbi par sens de circulation.",
      "Chaque tronçon reçoit un statut de confiance : certain, déduit, à confirmer, ambigu, introuvable, trou. Le moteur valide seul ce qui est sûr.",
      "L'agent ne tranche que le reste, sur une carte d'édition (React + OpenLayers, Plan IGN en Lambert 93) : sections aller/retour, liaison de bouts, fins de trajet calculées par un moteur de routage poids lourds.",
      "Export direct en GeoJSON, KML, GPX, CSV et JSON pour les outils de navigation.",
    ],
    highlights: [
      { value: "6", label: "statuts de confiance par tronçon" },
      { value: "232", label: "tests automatisés (pytest + Vitest)" },
      { value: "5", label: "formats d'export" },
    ],
    stack: ["Python", "FastAPI", "PostGIS", "BD TOPO", "React 19", "OpenLayers 10", "Géoplateforme IGN", "Docker", "GitLab CI"],
    flow: [
      { label: "PDF", detail: "Cerfa / arrêté" },
      { label: "Extraction", detail: "tableau d'itinéraire" },
      { label: "Recalage", detail: "graphe BD TOPO · Viterbi" },
      { label: "Statuts", detail: "certain → introuvable" },
      { label: "Validation", detail: "l'agent tranche sur carte" },
      { label: "Exports", detail: "GeoJSON · KML · GPX" },
    ],
  },
  {
    slug: "bridge-analyzer",
    title: "Bridge Analyzer",
    tagline: "Qualifier des centaines de ponts depuis son bureau, avant d'envoyer une équipe sur le terrain.",
    kind: "Plugin QGIS",
    year: "2026",
    status: "En production",
    chain: 1,
    published: true,
    context:
      "Pour connaître la hauteur réelle sous les ponts d'un réseau routier, un transporteur organise des campagnes de mesure sur le terrain. Encore faut-il savoir quels ouvrages mesurer : une extraction PostGIS sort des milliers de candidats, dont beaucoup sont des faux positifs.",
    problem:
      "Envoyer une équipe mesurer un « pont » qui est en fait un passage à niveau, ou un ouvrage déjà limité par un panneau, coûte une journée. Il fallait trier les candidats en amont, vite, sans quitter QGIS.",
    solution: [
      "Une interface en trois volets synchronisés : Street View sur l'ouvrage, canvas QGIS centré sur le point, flux des contraintes poids lourds d'un fournisseur de données de routage.",
      "Trois boutons pour qualifier : ouvrage valide (hauteur par défaut de 4,30 m en attendant la mesure), panneau B12 repéré (saisie intelligente : « 233 » devient 2,33 m), ou point à contrôler.",
      "Une détection autoroute propose 4,50 m quand la réglementation le permet.",
      "Annulation, saut à un identifiant ou à un point de la carte, replacement d'un ouvrage sur le réseau, statistiques de session.",
    ],
    highlights: [
      { value: "3", label: "vues synchronisées" },
      { value: "1 clic", label: "par ouvrage qualifié" },
      { value: "4,30 / 4,50 m", label: "règles de gabarit intégrées" },
    ],
    stack: ["Python", "PyQGIS", "Qt", "PostGIS", "Street View", "API de routage PL"],
    flow: [
      { label: "Extraction PostGIS", detail: "ouvrages candidats" },
      { label: "Street View", detail: "contrôle visuel, panneaux B12" },
      { label: "Contraintes PL", detail: "hauteurs déjà connues" },
      { label: "Qualification", detail: "valide · B12 · à contrôler" },
      { label: "Base de collecte", detail: "prête pour la campagne" },
    ],
  },
  {
    slug: "ogp-management",
    title: "OGP Management",
    tagline: "Planifier, suivre et corriger les campagnes de mesure de hauteurs sous ponts.",
    kind: "Application web",
    year: "2026",
    status: "En production, refonte UX livrée",
    chain: 2,
    published: true,
    context:
      "Une fois les ponts qualifiés, il faut organiser la collecte : qui mesure quoi, dans quel ordre, quel jour. Deux profils travaillent ensemble : les managers qui préparent les trajets, les collecteurs qui roulent et mesurent.",
    problem:
      "Préparer une tournée à la main (choisir les ouvrages, ordonner le trajet, l'exporter vers le GPS, puis réintégrer les mesures) prenait un temps énorme et laissait passer des oublis.",
    solution: [
      "Sélection des ouvrages à mesurer au polygone sur la carte, choix du départ et de l'arrivée, découpage automatique en trajets (par nombre de points ou par jour), avec option anti-chevauchement.",
      "Calcul d'itinéraire via un moteur de routage (OSRM ou routage poids lourds), export KML, SHP ou JSON pour la navigation embarquée.",
      "Suivi du cycle de vie de chaque trajet en 6 états, de « généré » à « terminé ».",
      "Retour terrain : import des mesures, correction sur carte (déplacer, dupliquer, qualifier un oubli), puis validation finale.",
      "Tableau de bord par manager, collecteur et semaine, avec rapport PDF. Import de données externes (CSV, Shapefile, base distante chiffrée).",
      "Refonte complète de l'interface : barre latérale, création guidée en 4 étapes, fiche trajet, sans toucher à un seul des 57 appels d'API.",
    ],
    highlights: [
      { value: "6", label: "états dans le cycle de vie d'un trajet" },
      { value: "57", label: "appels d'API préservés pendant la refonte" },
      { value: "36", label: "points de recette validés" },
    ],
    stack: ["JavaScript", "Leaflet", "PHP", "PostgreSQL", "Python", "OSRM", "Chart.js", "Docker", "GitLab CI"],
    flow: [
      { label: "Sélection", detail: "ouvrages au polygone" },
      { label: "Génération", detail: "trajets optimisés" },
      { label: "Export", detail: "KML · SHP · JSON GPS" },
      { label: "Terrain", detail: "mesures des collecteurs" },
      { label: "Correction", detail: "contrôle sur carte" },
      { label: "Dashboard", detail: "avancement · rapport PDF" },
    ],
  },
  {
    slug: "sygicconnect",
    title: "SygicConnect",
    tagline: "Envoyer un itinéraire du bureau à la tablette du conducteur, sans câble ni manipulation.",
    kind: "Application mobile",
    year: "2026",
    status: "v1.5, déploiement Docker Swarm",
    chain: 3,
    published: true,
    context:
      "Les conducteurs naviguent avec une application GPS poids lourds sur des tablettes durcies. Les trajets préparés au bureau devaient y être copiés à la main, appareil par appareil.",
    problem:
      "Copier des fichiers sur une tablette demande de la récupérer physiquement. Impossible de savoir à distance quels trajets sont installés, ni si l'appareil est en ligne.",
    solution: [
      "Une API Node/Express reçoit un trajet ou un lot de points d'intérêt et le pousse vers la bonne tablette.",
      "Une application Android (Java) se synchronise, range chaque fichier dans le bon dossier de l'application GPS et remonte son inventaire, sa batterie et l'état de navigation.",
      "Un tableau de bord web : flotte, enrôlement des tablettes avec validation admin, messagerie vers les conducteurs, rapports de support avec photos.",
      "Audit de sécurité complet : vol de jeton à l'enrôlement, XSS stockée et clé dans l'URL corrigés. Jeton par appareil, image Docker non-root.",
      "Choix RGPD assumé : suppression de la télémétrie GPS. On affiche le trajet prévu, jamais la position du conducteur.",
    ],
    highlights: [
      { value: "101", label: "tests automatisés" },
      { value: "0", label: "vulnérabilité npm (contre 1 critique au départ)" },
      { value: "0", label: "position conducteur transmise (RGPD)" },
    ],
    stack: ["Node.js", "Express", "Android (Java)", "Leaflet", "Docker Swarm", "HAProxy", "VPN"],
    flow: [
      { label: "Outil de tournées", detail: "trajet + POI" },
      { label: "API", detail: "clé admin · jeton par appareil" },
      { label: "Serveur", detail: "Docker Swarm derrière VPN" },
      { label: "Tablette", detail: "sync + rangement auto" },
      { label: "GPS poids lourds", detail: "le conducteur roule" },
    ],
  },
  {
    slug: "automate-survey123",
    title: "Automate Survey123",
    tagline: "Les rapports de maintenance terrain arrivent tout seuls, en PDF, dans la bonne boîte mail.",
    kind: "Automatisation",
    year: "2025",
    status: "En production",
    published: true,
    context:
      "Des techniciens remplissent des formulaires de maintenance préventive sur le terrain avec ArcGIS Survey123 : anomalies, photos, signatures. Les responsables d'agence devaient ensuite aller chercher l'information.",
    problem:
      "Les données existaient, mais personne ne les recevait sous une forme lisible. Les anomalies urgentes pouvaient attendre des jours.",
    solution: [
      "Un orchestrateur Python interroge chaque jour les couches ArcGIS pour détecter les nouvelles saisies.",
      "Il génère un rapport PDF fidèle (HTML rendu par Chrome headless) avec en-têtes, photos redimensionnées et signatures détourées.",
      "Les anomalies sont triées (urgent, à programmer, non conforme) et le rapport part par mail à l'agence concernée, retrouvée via son code.",
      "Historique anti-doublon basé sur les identifiants ArcGIS, logs en rotation, déploiement en CI.",
    ],
    highlights: [
      { value: "0", label: "action manuelle par rapport" },
      { value: "3", label: "niveaux de priorité des anomalies" },
      { value: "1×/jour", label: "synchronisation automatique" },
    ],
    stack: ["Python", "ArcGIS API", "Survey123", "Selenium", "SMTP", "GitLab CI"],
    flow: [
      { label: "Survey123", detail: "saisie terrain" },
      { label: "ArcGIS", detail: "détection des nouveautés" },
      { label: "PDF", detail: "photos · signatures" },
      { label: "Tri", detail: "urgent · à programmer" },
      { label: "Mail", detail: "à la bonne agence" },
    ],
  },
  {
    slug: "hydroline",
    title: "HydroLine",
    tagline: "Tracer talwegs, crêtes et ruptures de pente sur un MNT, assisté par l'algorithme.",
    kind: "Plugin QGIS",
    year: "2025",
    status: "Open source",
    published: true,
    context:
      "Pour modéliser l'écoulement d'une rivière en 1D ou 2D, les ingénieurs hydrauliciens dessinent des lignes caractéristiques sur le modèle numérique de terrain : fonds de lit, crêtes de digue, ruptures de pente.",
    problem:
      "Ces lignes se tracent à la main, point par point, en lisant le relief. C'est lent, et la précision dépend de l'œil de chacun.",
    solution: [
      "Des outils de tracé qui suivent le terrain : le curseur « colle » au point bas (talweg), au point haut (crête) ou à la rupture de pente.",
      "Prolongement automatique de profils en travers et fenêtre de profil d'élévation en temps réel.",
      "Fonctionne sur MNT raster et TIN, calculs lourds en threads pour garder QGIS fluide.",
    ],
    highlights: [
      { value: "4", label: "outils de tracé assisté" },
      { value: "1D · 2D", label: "modélisations préparées" },
      { value: "MIT", label: "code ouvert sur GitHub" },
    ],
    stack: ["Python", "PyQGIS", "GDAL", "NumPy", "SciPy", "pyqtgraph", "Shapely"],
    flow: [
      { label: "MNT", detail: "raster ou TIN" },
      { label: "Tracé assisté", detail: "talweg · crête · rupture" },
      { label: "Profils", detail: "en travers, en direct" },
      { label: "Modèle hydraulique", detail: "1D / 2D" },
    ],
    links: [{ label: "Code source", href: "https://github.com/DonSanchitoo/hydroline" }],
  },
  {
    slug: "carte-accessibilite",
    title: "Carte d'accessibilité",
    tagline: "Combien de salariés passeront au-delà de 45 minutes de trajet si l'entreprise déménage ?",
    kind: "Analyse spatiale",
    year: "2026",
    status: "Démo, données personnelles fictives",
    published: true,
    context:
      "Une entreprise qui déménage, ou ouvre un site, doit mesurer l'impact sur les trajets de ses équipes, en voiture comme en transports en commun. C'est aussi la base d'un plan de mobilité employeur.",
    problem:
      "Les temps de trajet en transports en commun dépendent des horaires réels, pas seulement de la distance. Une carte à vol d'oiseau ne répond pas à la question.",
    solution: [
      "250 collaborateurs simulés à partir du carroyage INSEE (200 m), affectés à trois sites par un modèle gravitaire.",
      "Matrices de temps voiture (OpenRouteService) et transports en commun horaires (r5py sur 4 réseaux GTFS réels).",
      "Isochrones 15, 30 et 45 min, heatmap agrégée à 1 km pour qu'aucune personne ne soit identifiable.",
      "Scénario de déménagement chiffré, carte HTML autonome légère (0,13 Mo) et classeur Excel de résultats.",
    ],
    highlights: [
      { value: "81 → 86 %", label: "au-delà de 45 min en TC après déménagement" },
      { value: "−13 min", label: "en moyenne en transports en commun" },
      { value: "17 266", label: "points de grille pour les isochrones TC" },
    ],
    stack: ["Python", "geopandas", "r5py", "GTFS", "OpenRouteService", "INSEE Filosofi", "Leaflet"],
    flow: [
      { label: "Carroyage INSEE", detail: "population 25-64 ans" },
      { label: "Collaborateurs", detail: "modèle gravitaire" },
      { label: "Matrices", detail: "voiture · TC horaires" },
      { label: "Isochrones", detail: "15 · 30 · 45 min" },
      { label: "Scénario", detail: "avant / après" },
    ],
  },
  {
    slug: "formulaire-rh",
    title: "Formulaire RH",
    tagline: "À compléter.",
    kind: "Automatisation",
    year: "2026",
    status: "Brouillon",
    published: false,
    context: "",
    problem: "",
    solution: [],
    highlights: [],
    stack: ["Python"],
    flow: [],
  },
];

export const publishedProjects = projects.filter((p) => p.published);
export const chainProjects = publishedProjects
  .filter((p) => p.chain)
  .sort((a, b) => (a.chain ?? 0) - (b.chain ?? 0));
export const getProject = (slug: string) => publishedProjects.find((p) => p.slug === slug);
