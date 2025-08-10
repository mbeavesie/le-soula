import blancImage from "@assets/IMGP4704 Large_1754838107419.jpeg";
import rougeImage from "@assets/IMGP4740 Large_1754838139700.jpeg";
import macerationImage from "@assets/IMGP4569_1754838166013.png";

export const wines = [
  {
    slug: 'blanc',
    img: blancImage,
    tech: '#',
    en: {
      name: 'Le Soula Blanc',
      vintage: '',
      note: 'Grenache Gris, Macabeu, Vermentino. Saline precision from altitude. Fresh, mineral, persistent.'
    },
    fr: {
      name: 'Le Soula Blanc',
      vintage: '',
      note: 'Grenache Gris, Macabeu, Vermentino. Précision saline de l\'altitude. Frais, minéral, persistant.'
    }
  },
  {
    slug: 'rouge',
    img: rougeImage,
    tech: '#',
    en: {
      name: 'Le Soula Rouge',
      vintage: '',
      note: 'Syrah, Carignan from schist soils. Spiced, fresh, mountain-driven. Fine tannins with aromatic lift.'
    },
    fr: {
      name: 'Le Soula Rouge',
      vintage: '',
      note: 'Syrah, Carignan sur sols schisteux. Épicé, frais, montagnard. Tanins fins avec élévation aromatique.'
    }
  },
  {
    slug: 'maceration',
    img: macerationImage,
    tech: '#',
    en: {
      name: 'La Macération du Soula',
      vintage: '',
      note: 'Extended skin contact. Wild fermentation. Mountain expression in its purest form.'
    },
    fr: {
      name: 'La Macération du Soula',
      vintage: '',
      note: 'Macération pelliculaire prolongée. Fermentation sauvage. Expression montagnarde à l\'état pur.'
    }
  },
  {
    slug: 'trigone',
    img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    tech: '#',
    en: {
      name: 'Trigone',
      vintage: '',
      note: 'Solera-style perpetual blend. Multiple vintages, textural depth. Savoury complexity, remarkable persistence.'
    },
    fr: {
      name: 'Trigone',
      vintage: '',
      note: 'Assemblage perpétuel en solera. Plusieurs millésimes, profondeur texturale. Complexité savoureuse, persistance remarquable.'
    }
  }
];
