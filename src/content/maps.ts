export type MapWork = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  style: "Relief" | "Atlas vintage";
  image: string;
  width: number;
  height: number;
  /** Emprise approximative, affichée en marge comme sur une vraie carte. */
  extent: string;
  description: string;
  choices: string[];
  sources: string[];
  tools: string[];
};

export const maps: MapWork[] = [
  {
    slug: "bali",
    title: "Bali",
    subtitle: "Indonésie, relief et bathymétrie",
    year: "2025",
    style: "Relief",
    image: "/maps/bali.webp",
    width: 2000,
    height: 1414,
    extent: "114,3° – 115,8° E · 7,9° – 8,8° S",
    description:
      "Une île volcanique où le relief fait tout le récit : les caldeiras du Batur et du Bratan, le cône de l'Agung, la forêt du parc de Bali Barat. Le fond marin prolonge la lecture avec les isobathes du détroit de Lombok.",
    choices: [
      "Ombrage multidirectionnel sur MNT à 30 m, accentué pour faire ressortir les caldeiras.",
      "Teintes issues de l'occupation du sol (forêt en vert, cultures et savanes en ocre) plutôt qu'une palette hypsométrique classique.",
      "Mer volontairement neutre, gris clair, pour que les terres portent le contraste.",
      "Toponymie en capitales espacées pour les mers, italique pour les îles : une hiérarchie d'atlas.",
    ],
    sources: ["SRTM 30 m (élévation)", "GEBCO 2024 (bathymétrie)", "OpenStreetMap", "ESA WorldCover 2021"],
    tools: ["QGIS", "Adobe Illustrator"],
  },
  {
    slug: "nederland",
    title: "Nederland",
    subtitle: "Pays-Bas, réseau et urbanisation",
    year: "2023",
    style: "Atlas vintage",
    image: "/maps/nederland.webp",
    width: 1188,
    height: 1634,
    extent: "3,3° – 7,2° E · 50,7° – 53,6° N",
    description:
      "Un pays dessiné par l'eau : polders, IJsselmeer, delta de Zélande. Le réseau routier dense et les aires urbaines racontent la Randstad.",
    choices: [
      "Papier vieilli et écriture manuscrite pour un rendu d'atlas ancien, sans sacrifier la lisibilité.",
      "Hiérarchie routière en trois niveaux, villes classées par population.",
      "Frontière en pointillés ocre, reprise sur toute la série.",
    ],
    sources: ["OpenStreetMap", "Données de population"],
    tools: ["QGIS", "Adobe Illustrator"],
  },
  {
    slug: "espana",
    title: "España",
    subtitle: "Espagne, relief, réseau et régions",
    year: "2023",
    style: "Atlas vintage",
    image: "/maps/espana.webp",
    width: 1830,
    height: 1312,
    extent: "9,5° O – 4,5° E · 35,5° – 44° N",
    description:
      "La Meseta au centre, les cordillères en couronne, et Madrid au milieu d'un réseau en étoile. Les communautés autonomes sont posées en capitales espacées.",
    choices: [
      "Estompage léger sous le réseau : le relief explique le tracé des routes sans l'écraser.",
      "Mer en bleu-vert profond pour isoler la péninsule et les Baléares.",
      "Légende en cartouche, même gabarit que toute la série.",
    ],
    sources: ["OpenStreetMap", "MNT", "Données de population"],
    tools: ["QGIS", "Adobe Illustrator"],
  },
  {
    slug: "romania",
    title: "România",
    subtitle: "Roumanie, arc des Carpates",
    year: "2023",
    style: "Atlas vintage",
    image: "/maps/romania.webp",
    width: 1810,
    height: 1246,
    extent: "20,2° – 29,7° E · 43,6° – 48,3° N",
    description:
      "L'arc des Carpates enserre la Transylvanie ; au sud la plaine du Danube, à l'est son delta. Les noms de massifs suivent la courbure des reliefs.",
    choices: [
      "Toponymes des massifs courbés le long des crêtes pour épouser l'arc carpatique.",
      "Hydrographie fine en bleu, du réseau principal jusqu'au delta.",
      "Pays voisins en aplat neutre pour concentrer le regard.",
    ],
    sources: ["OpenStreetMap", "MNT", "Données de population"],
    tools: ["QGIS", "Adobe Illustrator"],
  },
];

export const getMap = (slug: string) => maps.find((m) => m.slug === slug);
