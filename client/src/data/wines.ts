import blancImage from "@assets/IMGP4704 Large_1754838107419.jpeg";
import rougeImage from "@assets/IMGP4740 Large_1754838139700.jpeg";
import macerationImage from "@assets/IMGP4569_1754838166013.png";
import trigoneImage from "@assets/trigone.png";
import vineyardImage from "@assets/Le Soula-100_1754824026402.jpg";
import bottleImage from "@assets/IMGP4504_1754838189146.png";
import awardsImage from "@assets/Revue de vins_1754837341373.png";
import blancBottle1 from "@assets/4_1754899531019.png";
import blancBottle2 from "@assets/post2_1754899553486.png";
import macerationImage2 from "@assets/IMG_7161_1754899905690.jpeg";
import trigoneImage2 from "@assets/trigone_bottle_tree.png";
import trigoneImage3 from "@assets/IMGP4516_1754900198055.png";
import roseImage from "@assets/le-rose-du-soula-2022_1754900347150.png";

export const wines = [
  {
    slug: 'blanc',
    img: blancImage,
    tech: '/tech-sheets/le-soula-blanc.pdf',
    images: [blancImage, blancBottle1, blancBottle2],
    en: {
      name: 'Le Soula Blanc',
      vintage: '2023',
      note: 'Grenache Gris, Macabeu, Vermentino. Saline precision from altitude. Fresh, mineral, persistent.',
      tastingNotes: {
        sight: 'Pale gold with brilliant clarity, reflecting mountain purity',
        nose: 'White flowers, citrus zest, and mineral stones with hints of Mediterranean herbs',
        palate: 'Crisp and elegant with saline minerality, fresh acidity, and a long, pure finish'
      },
      awards: [],
      quote: '',
      quotesource: ''
    },
    fr: {
      name: 'Le Soula Blanc',
      vintage: '2023',
      note: 'Grenache Gris, Macabeu, Vermentino. Précision saline de l\'altitude. Frais, minéral, persistant.',
      tastingNotes: {
        sight: 'Or pâle d\'une clarté brillante, reflet de la pureté montagnarde',
        nose: 'Fleurs blanches, zestes d\'agrumes et pierres minérales avec des notes d\'herbes méditerranéennes',
        palate: 'Net et élégant avec une minéralité saline, une acidité fraîche et une finale longue et pure'
      },
      awards: [],
      quote: '',
      quotesource: ''
    }
  },
  {
    slug: 'rouge',
    img: rougeImage,
    tech: '/tech-sheets/le-soula-rouge.pdf',
    images: [rougeImage, vineyardImage, awardsImage],
    en: {
      name: 'Le Soula Rouge',
      vintage: '2022',
      note: 'Syrah, Carignan from schist soils. Spiced, fresh, mountain-driven. Fine tannins with aromatic lift.',
      tastingNotes: {
        sight: 'Deep ruby color with purple reflections, expressing mountain intensity',
        nose: 'Black pepper, wild herbs, red berries, and underlying schist minerality',
        palate: 'Structured yet elegant, with fine-grained tannins and a spicy, persistent finish'
      },
      awards: [],
      quote: '',
      quotesource: ''
    },
    fr: {
      name: 'Le Soula Rouge',
      vintage: '2022',
      note: 'Syrah, Carignan sur sols schisteux. Épicé, frais, montagnard. Tanins fins avec élévation aromatique.',
      tastingNotes: {
        sight: 'Couleur rubis profond aux reflets violacés, exprimant l\'intensité montagnarde',
        nose: 'Poivre noir, herbes sauvages, fruits rouges et minéralité schisteuse sous-jacente',
        palate: 'Structuré mais élégant, avec des tanins fins et une finale épicée et persistante'
      },
      awards: [],
      quote: '',
      quotesource: ''
    }
  },
  {
    slug: 'maceration',
    img: macerationImage,
    tech: '/tech-sheets/maceration-du-soula.pdf',
    images: [macerationImage, macerationImage2, vineyardImage],
    en: {
      name: 'La Macération du Soula',
      vintage: '2023',
      note: 'Extended skin contact. Wild fermentation. Mountain expression in its purest form.',
      tastingNotes: {
        sight: 'Amber-gold with copper highlights, showcasing extended skin contact',
        nose: 'Dried apricots, orange peel, mountain herbs, and complex phenolic depth',
        palate: 'Rich texture with tannic structure, wild fermentation character, and extraordinary length'
      },
      awards: [],
      quote: '',
      quotesource: ''
    },
    fr: {
      name: 'La Macération du Soula',
      vintage: '2023',
      note: 'Macération pelliculaire prolongée. Fermentation sauvage. Expression montagnarde à l\'état pur.',
      tastingNotes: {
        sight: 'Or ambré aux reflets cuivrés, témoignant de la macération pelliculaire prolongée',
        nose: 'Abricots secs, zeste d\'orange, herbes de montagne et profondeur phénolique complexe',
        palate: 'Texture riche avec structure tannique, caractère de fermentation sauvage et longueur extraordinaire'
      },
      awards: [],
      quote: '',
      quotesource: ''
    }
  },
  {
    slug: 'trigone',
    img: trigoneImage,
    tech: '/tech-sheets/trigone.pdf',
    techRouge: 'https://cdn.sanity.io/files/9cvkgqfs/production/7688560c34828752848f3d2f48f907d562ab422b.pdf',
    images: [trigoneImage, trigoneImage2, trigoneImage3],
    en: {
      name: 'Trigone',
      vintage: 'Non-Vintage',
      note: 'A perpetual blend across multiple vintages, made in both white and red. Textural depth, savoury complexity, remarkable persistence.',
      tastingNotes: {
        sight: 'Deep golden color with brilliant clarity, reflecting years of patient development',
        nose: 'Honeyed complexity, dried fruits, nuts, and subtle oxidative notes from the perpetual blend',
        palate: 'Extraordinary depth and concentration, with layers of flavor unfolding endlessly'
      },
      tastingNotesRouge: {
        sight: 'Deep ruby with violet reflections, vivid and inviting',
        nose: 'Dark berries, violets and garrigue, lifted by the pepper of whole-bunch Syrah over crushed granite',
        palate: 'Supple and full of energy — old-vine Carignan depth, fine tannins, mountain freshness and a long, savoury finish'
      },
      awards: [],
      quote: '',
      quotesource: ''
    },
    fr: {
      name: 'Trigone',
      vintage: 'Sans Millésime',
      note: 'Assemblage perpétuel de plusieurs millésimes, décliné en blanc et en rouge. Profondeur texturale, complexité savoureuse, persistance remarquable.',
      tastingNotes: {
        sight: 'Couleur dorée profonde d\'une clarté brillante, reflet d\'années de développement patient',
        nose: 'Complexité miellée, fruits secs, noix et notes oxydatives subtiles de l\'assemblage perpétuel',
        palate: 'Profondeur et concentration extraordinaires, avec des couches de saveurs se déployant à l\'infini'
      },
      tastingNotesRouge: {
        sight: 'Rubis profond aux reflets violets, éclatant et engageant',
        nose: 'Fruits noirs, violette et garrigue, portés par le poivre de la Syrah en grappes entières, sur un fond de granit',
        palate: 'Souple et plein d\'énergie — la profondeur des vieux carignans, tannins fins, fraîcheur d\'altitude et longue finale savoureuse'
      },
      awards: [],
      quote: '',
      quotesource: ''
    }
  },
  {
    slug: 'rose',
    img: roseImage,
    tech: '/tech-sheets/le-rose-du-soula.pdf',
    images: [roseImage, vineyardImage],
    en: {
      name: 'Le Rosé du Soula',
      vintage: '2022',
      note: '100% Syrah from high-altitude terroir. Limited production of 1300 bottles. Biodynamic viticulture with natural vinification.',
      tastingNotes: {
        sight: 'Delicate salmon pink color with brilliant clarity, reflecting pure mountain expression',
        nose: 'Fresh red berries, wild herbs, and mineral precision from granite and gneiss soils',
        palate: 'Crisp and elegant with saline minerality, vibrant acidity, and a long, refined finish'
      },
      awards: [],
      quote: '',
      quotesource: ''
    },
    fr: {
      name: 'Le Rosé du Soula',
      vintage: '2022',
      note: '100% Syrah de terroir d\'altitude. Production limitée de 1300 bouteilles. Viticulture biodynamique avec vinification naturelle.',
      tastingNotes: {
        sight: 'Couleur saumon délicat d\'une clarté brillante, reflet d\'une expression montagnarde pure',
        nose: 'Fruits rouges frais, herbes sauvages et précision minérale des sols granitiques et gneissiques',
        palate: 'Net et élégant avec une minéralité saline, une acidité vive et une finale longue et raffinée'
      },
      awards: [],
      quote: '',
      quotesource: ''
    }
  }
];
