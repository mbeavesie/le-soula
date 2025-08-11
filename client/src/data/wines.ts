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
      awards: [
        { title: 'Wine Spectator', score: '92 points', year: '2023' },
        { title: 'Decanter', score: '94 points', year: '2023' }
      ],
      quote: 'A wine of remarkable precision and altitude-driven character',
      quotesource: 'Jancis Robinson MW'
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
      awards: [
        { title: 'Wine Spectator', score: '92 points', year: '2023' },
        { title: 'Decanter', score: '94 points', year: '2023' }
      ],
      quote: 'Un vin d\'une précision remarquable et d\'un caractère marqué par l\'altitude',
      quotesource: 'Jancis Robinson MW'
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
      awards: [
        { title: 'Robert Parker', score: '95 points', year: '2022' },
        { title: 'Revue du Vin de France', score: '17/20', year: '2022' }
      ],
      quote: 'A masterful expression of high-altitude terroir and organic viticulture',
      quotesource: 'Michel Bettane'
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
      awards: [
        { title: 'Robert Parker', score: '95 points', year: '2022' },
        { title: 'Revue du Vin de France', score: '17/20', year: '2022' }
      ],
      quote: 'Une expression magistrale du terroir d\'altitude et de la viticulture biologique',
      quotesource: 'Michel Bettane'
    }
  },
  {
    slug: 'maceration',
    img: macerationImage,
    tech: '/tech-sheets/maceration-du-soula.pdf',
    images: [macerationImage, macerationImage2, bottleImage],
    en: {
      name: 'La Macération du Soula',
      vintage: '2023',
      note: 'Extended skin contact. Wild fermentation. Mountain expression in its purest form.',
      tastingNotes: {
        sight: 'Amber-gold with copper highlights, showcasing extended skin contact',
        nose: 'Dried apricots, orange peel, mountain herbs, and complex phenolic depth',
        palate: 'Rich texture with tannic structure, wild fermentation character, and extraordinary length'
      },
      awards: [
        { title: 'Natural Wine Company', score: 'Outstanding', year: '2023' },
        { title: 'The World of Fine Wine', score: 'Exceptional', year: '2023' }
      ],
      quote: 'A profound meditation on natural winemaking and terroir expression',
      quotesource: 'Alice Feiring'
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
      awards: [
        { title: 'Natural Wine Company', score: 'Exceptionnel', year: '2023' },
        { title: 'The World of Fine Wine', score: 'Remarquable', year: '2023' }
      ],
      quote: 'Une méditation profonde sur la vinification naturelle et l\'expression du terroir',
      quotesource: 'Alice Feiring'
    }
  },
  {
    slug: 'trigone',
    img: trigoneImage,
    tech: '/tech-sheets/trigone.pdf',
    images: [trigoneImage, vineyardImage, awardsImage],
    en: {
      name: 'Trigone',
      vintage: 'Non-Vintage',
      note: 'Solera-style perpetual blend. Multiple vintages, textural depth. Savoury complexity, remarkable persistence.',
      tastingNotes: {
        sight: 'Deep golden color with brilliant clarity, reflecting years of patient development',
        nose: 'Honeyed complexity, dried fruits, nuts, and subtle oxidative notes from solera aging',
        palate: 'Extraordinary depth and concentration, with layers of flavor unfolding endlessly'
      },
      awards: [
        { title: 'Wine & Spirits', score: '96 points', year: '2024' },
        { title: 'La Revue du Vin de France', score: '18/20', year: '2024' }
      ],
      quote: 'A wine of unprecedented complexity and emotional resonance',
      quotesource: 'Rajat Parr'
    },
    fr: {
      name: 'Trigone',
      vintage: 'Sans Millésime',
      note: 'Assemblage perpétuel en solera. Plusieurs millésimes, profondeur texturale. Complexité savoureuse, persistance remarquable.',
      tastingNotes: {
        sight: 'Couleur dorée profonde d\'une clarté brillante, reflet d\'années de développement patient',
        nose: 'Complexité miellée, fruits secs, noix et notes oxydatives subtiles du vieillissement en solera',
        palate: 'Profondeur et concentration extraordinaires, avec des couches de saveurs se déployant à l\'infini'
      },
      awards: [
        { title: 'Wine & Spirits', score: '96 points', year: '2024' },
        { title: 'La Revue du Vin de France', score: '18/20', year: '2024' }
      ],
      quote: 'Un vin d\'une complexité et d\'une résonance émotionnelle sans précédent',
      quotesource: 'Rajat Parr'
    }
  }
];
