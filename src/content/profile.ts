export const profile = {
  name: "Matteo Sanchez",
  role: "Géomaticien",
  baseline: "Je fais parler les données géographiques, en cartes et en outils.",
  location: "Nîmes, Occitanie",
  coords: { lat: 43.8367, lng: 4.3601 },
  email: "sanchez.matteopro@gmail.com",
  github: "https://github.com/DonSanchitoo",
  // À renseigner : le lien s'affiche dès qu'il est rempli.
  linkedin: "",
  intro:
    "Géomaticien depuis 2025, je mène des projets SIG de bout en bout : l'expression du besoin avec les équipes métier, l'analyse spatiale, le développement des outils (Python, PostGIS, QGIS, web), puis la formation des utilisateurs. J'aime les sujets où une carte bien faite et un outil bien pensé font gagner des journées à quelqu'un.",
};

export type Step = {
  period: string;
  title: string;
  org: string;
  place: string;
  points: string[];
};

export const journey: Step[] = [
  {
    period: "Sept. 2025 → aujourd'hui",
    title: "Géomaticien · Cartographe",
    org: "Groupe de transport et logistique",
    place: "Gard",
    points: [
      "Pilotage de projets SIG, de la conception au bilan, avec des profils métier variés.",
      "Développement de plugins QGIS et d'applications web et mobiles : préparation des convois, collecte terrain, navigation embarquée.",
      "Administration et fiabilisation des bases de données géographiques.",
      "Formation et accompagnement des utilisateurs.",
    ],
  },
  {
    period: "Févr. → août 2025",
    title: "Stage chef de projet SIG · développement Python",
    org: "Producteur d'énergie renouvelable",
    place: "Lyon",
    points: [
      "Applications Python SIG pour les ingénieurs hydrauliciens (dont HydroLine).",
      "Cahier des charges, spécifications et participation à un appel d'offres.",
      "Formations auprès d'utilisateurs non spécialistes.",
    ],
  },
  {
    period: "Juin → août 2024",
    title: "Photo-interprète",
    org: "Organisme public de paiement agricole",
    place: "Montpellier",
    points: ["Contrôle de l'occupation du sol sur images satellites pour les aides de la PAC."],
  },
  {
    period: "2023 → 2025",
    title: "Master Géomatique",
    org: "Faculté des Sciences",
    place: "Montpellier",
    points: ["Analyse spatiale, bases de données géographiques, cartographie, développement SIG."],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Analyser", items: ["QGIS", "ArcGIS Pro", "Analyse spatiale", "Photo-interprétation", "Réseaux et isochrones"] },
  { group: "Structurer", items: ["PostgreSQL / PostGIS", "SQL", "BD TOPO", "Qualité et interopérabilité"] },
  { group: "Diffuser", items: ["GeoServer", "ArcGIS Enterprise", "Survey123", "Leaflet", "OpenLayers", "MapLibre"] },
  { group: "Développer", items: ["Python", "PyQGIS", "FastAPI", "JavaScript / TypeScript", "React", "Node.js", "Docker"] },
  { group: "Cartographier", items: ["Sémiologie graphique", "Adobe Illustrator", "Relief et estompage", "Mise en page d'atlas"] },
];
