import huilePalme from '@assets/huile-de-palme_1773494708885.jpeg';
import sojaVert from '@assets/2513237_uploaded_image1_1596578638_1773494722841.jpg';
import sojaBlancImg from '@assets/554204_1773494740722.jpg';
import rocouImg from '@assets/main.jpg_large_1773494740819.jpg';
import gengembreImg from '@assets/shutterstock-2259537229-min-scaled-1_1773494740889.jpg';
import laitueImg from '@assets/laitue_frise_vert_1773494740944.jpg';
import aubergineImg from '@assets/12086942_1773494741009.jpg';
import pimentImg from '@assets/Les-bienfaits-du-piment-sur-la-sante_1773494759594.jpg';
import pommeDeTermeImg from '@assets/white-e1563480325829_1773494778661.jpg';
import igname from '@assets/igname-yam-tevi-igname-blanc-koliko_1773494778731.jpeg';
import maisImg from '@assets/grains_1773494778818.jpg';
import placaliImg from '@assets/701200_1773494778871.jpg';
import pastequeImg from '@assets/composition-fruits-isolee_23-2151856344_1773494778919.jpg';
import melonImg from '@assets/7c9d5e80-786a-11f0-8071-1788c7e8ae0e.jpg_1773494802946.webp';
import avocatImg from '@assets/avocados-1081695_19201-800x533_1773494803038.jpg';
import mangueImg from '@assets/Sans-titre-75_1773494803091.jpg';
import plantainImg from '@assets/istockphoto-1126717193-170667a_1773494803135.jpg';
import kolaImg from '@assets/AdobeStock_18586675_1773494803179.jpeg';
import cotonImg from '@assets/coton-environnement_1773494803227.jpg';
import ananasImg from '@assets/shutterstock_124270765_ananas_comprese_1773495814051.jpg';
import mandarineImg from '@assets/tangerines-1721633_1920-800x533_1773495814102.jpg';
import taroImg from '@assets/taro_1773495814138.jpg';
import maisBlanImg from '@assets/Mais-blanc-AdobeStock_487904876-scaled.jpeg_1773495814181.webp';

export type Category = 'export' | 'fruits' | 'food' | 'vegetables';

export interface Product {
  id: string;
  name: { fr: string; en: string };
  category: Category;
  image: string;
  description: { fr: string; en: string };
}

const u = (id: string) => `https://images.unsplash.com/${id}?w=600&h=400&fit=crop&auto=format`;
const lf = (kw: string, seed: number) => `https://loremflickr.com/600/400/${kw}?lock=${seed}`;

export const products: Product[] = [
  // === CULTURES D'EXPORTATION ===
  {
    id: 'cacao',
    name: { fr: 'Cacao / Fèves de Cacao', en: 'Cacao / Cocoa Beans' },
    category: 'export',
    image: lf('cocoa,beans,chocolate', 1),
    description: {
      fr: 'Fèves de cacao de première qualité, séchées au soleil, idéales pour la production de chocolat fin.',
      en: 'Premium quality sun-dried cocoa beans, ideal for fine chocolate production.'
    }
  },
  {
    id: 'coffee',
    name: { fr: 'Café', en: 'Coffee' },
    category: 'export',
    image: u('photo-1559525839-b184a4d698c7'),
    description: {
      fr: 'Grains de café robusta riches et aromatiques cultivés dans les hautes terres ivoiriennes.',
      en: 'Rich and aromatic robusta coffee beans grown in the Ivorian highlands.'
    }
  },
  {
    id: 'cashew',
    name: { fr: 'Noix de Cajou', en: 'Cashew Nuts' },
    category: 'export',
    image: lf('cashew,nuts,africa', 2),
    description: {
      fr: 'Noix de cajou brutes et transformées de haute qualité, issues des meilleures plantations.',
      en: 'High quality raw and processed cashew nuts from the best plantations.'
    }
  },
  {
    id: 'palm-oil',
    name: { fr: 'Huile de Palme', en: 'Palm Oil' },
    category: 'export',
    image: huilePalme,
    description: {
      fr: 'Huile de palme brute et raffinée issue de plantations durables certifiées.',
      en: 'Crude and refined palm oil from certified sustainable plantations.'
    }
  },
  {
    id: 'rubber',
    name: { fr: 'Hévéa / Caoutchouc', en: 'Rubber' },
    category: 'export',
    image: lf('rubber,latex,tree', 4),
    description: {
      fr: 'Caoutchouc naturel brut de haute qualité pour applications industrielles mondiales.',
      en: 'High quality raw natural rubber for global industrial applications.'
    }
  },
  {
    id: 'cotton',
    name: { fr: 'Coton', en: 'Cotton' },
    category: 'export',
    image: cotonImg,
    description: {
      fr: 'Fibres de coton pur de haute qualité pour l\'industrie textile internationale.',
      en: 'High-quality pure cotton fibers for the international textile industry.'
    }
  },
  {
    id: 'cola',
    name: { fr: 'Noix de Cola', en: 'Cola Nut' },
    category: 'export',
    image: kolaImg,
    description: {
      fr: 'Noix de cola fraîches et séchées, utilisées en pharmacopée traditionnelle et boissons.',
      en: 'Fresh and dried cola nuts used in traditional pharmacopoeia and beverages.'
    }
  },

  // === FRUITS ===
  {
    id: 'plantain',
    name: { fr: 'Banane Plantain', en: 'Plantain' },
    category: 'fruits',
    image: plantainImg,
    description: {
      fr: 'Bananes plantains fraîches, vertes ou mûres, cultivées en Côte d\'Ivoire.',
      en: 'Fresh plantain bananas, green or ripe, grown in Ivory Coast.'
    }
  },
  {
    id: 'banana',
    name: { fr: 'Banane Douce', en: 'Banana' },
    category: 'fruits',
    image: u('photo-1603833665858-e61d17a86224'),
    description: {
      fr: 'Bananes douces fraîches, sucrées et riches en potassium.',
      en: 'Fresh sweet bananas, sugary and rich in potassium.'
    }
  },
  {
    id: 'papaya',
    name: { fr: 'Papaye', en: 'Papaya' },
    category: 'fruits',
    image: u('photo-1526318472351-c75fcf070305'),
    description: {
      fr: 'Papayes tropicales fraîches, riches en vitamines A et C.',
      en: 'Fresh tropical papayas, rich in vitamins A and C.'
    }
  },
  {
    id: 'mango',
    name: { fr: 'Mangue', en: 'Mango' },
    category: 'fruits',
    image: mangueImg,
    description: {
      fr: 'Mangues Kent et Amélie, douces, juteuses et parfumées.',
      en: 'Sweet, juicy and fragrant Kent and Amelie mangoes.'
    }
  },
  {
    id: 'avocado',
    name: { fr: 'Avocat', en: 'Avocado' },
    category: 'fruits',
    image: avocatImg,
    description: {
      fr: 'Avocats crémeux de qualité supérieure, riches en bonnes graisses.',
      en: 'Premium quality creamy avocados, rich in healthy fats.'
    }
  },
  {
    id: 'orange',
    name: { fr: 'Orange', en: 'Orange' },
    category: 'fruits',
    image: u('photo-1547514701-42782101795e'),
    description: {
      fr: 'Oranges juteuses et sucrées, riches en vitamine C.',
      en: 'Juicy and sweet oranges, rich in vitamin C.'
    }
  },
  {
    id: 'mandarin',
    name: { fr: 'Mandarine', en: 'Mandarin' },
    category: 'fruits',
    image: mandarineImg,
    description: {
      fr: 'Mandarines fraîches, faciles à éplucher et délicieusement sucrées.',
      en: 'Fresh mandarins, easy to peel and deliciously sweet.'
    }
  },
  {
    id: 'lemon',
    name: { fr: 'Citron', en: 'Lemon' },
    category: 'fruits',
    image: lf('lemon,citrus,fresh', 10),
    description: {
      fr: 'Citrons frais et acidulés, parfaits pour la cuisine et les boissons.',
      en: 'Fresh and tangy lemons, perfect for cooking and beverages.'
    }
  },
  {
    id: 'melon',
    name: { fr: 'Melon', en: 'Melon' },
    category: 'fruits',
    image: melonImg,
    description: {
      fr: 'Melons sucrés et parfumés, cultivés sous le soleil d\'Afrique.',
      en: 'Sweet and fragrant melons grown under the African sun.'
    }
  },
  {
    id: 'watermelon',
    name: { fr: 'Pastèque', en: 'Watermelon' },
    category: 'fruits',
    image: pastequeImg,
    description: {
      fr: 'Pastèques rafraîchissantes et sucrées, idéales pour les marchés d\'exportation.',
      en: 'Refreshing and sweet watermelons, ideal for export markets.'
    }
  },

  {
    id: 'pineapple',
    name: { fr: 'Ananas', en: 'Pineapple' },
    category: 'fruits',
    image: ananasImg,
    description: {
      fr: 'Ananas sucrés et juteux, cultivés en Côte d\'Ivoire, riches en vitamines et enzymes.',
      en: 'Sweet and juicy pineapples grown in Ivory Coast, rich in vitamins and enzymes.'
    }
  },

  // === CULTURES VIVRIÈRES ===
  {
    id: 'rice',
    name: { fr: 'Riz', en: 'Rice' },
    category: 'food',
    image: u('photo-1586201375761-83865001e31c'),
    description: {
      fr: 'Riz local de haute qualité, cultivé dans les plaines ivoiriennes.',
      en: 'High quality local rice cultivated in the Ivorian plains.'
    }
  },
  {
    id: 'cassava',
    name: { fr: 'Manioc', en: 'Cassava' },
    category: 'food',
    image: u('photo-1518977676601-b53f82aba655'),
    description: {
      fr: 'Racines de manioc fraîches pour consommation directe ou transformation industrielle.',
      en: 'Fresh cassava roots for direct consumption or industrial processing.'
    }
  },
  {
    id: 'placali',
    name: { fr: 'Placali (Pâte de Manioc)', en: 'Placali (Cassava Paste)' },
    category: 'food',
    image: placaliImg,
    description: {
      fr: 'Pâte de manioc fermentée, aliment traditionnel ivoirien très prisé.',
      en: 'Fermented cassava paste, a highly prized traditional Ivorian food.'
    }
  },
  {
    id: 'yellow-corn',
    name: { fr: 'Maïs Jaune', en: 'Yellow Corn' },
    category: 'food',
    image: maisImg,
    description: {
      fr: 'Maïs jaune séché, riche en amidon, pour l\'alimentation humaine et animale.',
      en: 'Dried yellow corn, starch-rich, for human and animal consumption.'
    }
  },
  {
    id: 'white-corn',
    name: { fr: 'Maïs Blanc', en: 'White Corn' },
    category: 'food',
    image: maisBlanImg,
    description: {
      fr: 'Maïs blanc de qualité supérieure, utilisé dans la fabrication de farine et de semoule.',
      en: 'Superior quality white corn used in the manufacture of flour and semolina.'
    }
  },
  {
    id: 'yam',
    name: { fr: 'Igname', en: 'Yam' },
    category: 'food',
    image: igname,
    description: {
      fr: 'Tubercules d\'igname, base de l\'alimentation en Côte d\'Ivoire.',
      en: 'Yam tubers, a staple of the diet in Ivory Coast.'
    }
  },
  {
    id: 'taro',
    name: { fr: 'Taro', en: 'Taro' },
    category: 'food',
    image: taroImg,
    description: {
      fr: 'Taro frais, riche en fibres et en minéraux essentiels.',
      en: 'Fresh taro, rich in fiber and essential minerals.'
    }
  },
  {
    id: 'potato',
    name: { fr: 'Pomme de Terre', en: 'Potato' },
    category: 'food',
    image: pommeDeTermeImg,
    description: {
      fr: 'Pommes de terre fraîches de qualité, cultivées en altitude.',
      en: 'Quality fresh potatoes grown at altitude.'
    }
  },

  // === LÉGUMES ===
  {
    id: 'chili',
    name: { fr: 'Piment', en: 'Chili Pepper' },
    category: 'vegetables',
    image: pimentImg,
    description: {
      fr: 'Piments rouges et verts forts et savoureux, frais ou séchés.',
      en: 'Spicy and flavorful red and green chili peppers, fresh or dried.'
    }
  },
  {
    id: 'eggplant',
    name: { fr: 'Aubergine', en: 'Eggplant' },
    category: 'vegetables',
    image: aubergineImg,
    description: {
      fr: 'Aubergines fraîches et fermes, idéales pour la cuisine africaine et internationale.',
      en: 'Fresh and firm eggplants, ideal for African and international cuisine.'
    }
  },
  {
    id: 'okra',
    name: { fr: 'Gombo', en: 'Okra' },
    category: 'vegetables',
    image: u('photo-1601379760883-1bb497c558c1'),
    description: {
      fr: 'Gombos frais et tendres, très utilisés dans les sauces traditionnelles ivoiriennes.',
      en: 'Fresh and tender okra, widely used in traditional Ivorian sauces.'
    }
  },
  {
    id: 'lettuce',
    name: { fr: 'Laitue', en: 'Lettuce' },
    category: 'vegetables',
    image: laitueImg,
    description: {
      fr: 'Laitues fraîches et croquantes, cultivées sans pesticides.',
      en: 'Fresh and crispy lettuces, grown without pesticides.'
    }
  },
  {
    id: 'ginger',
    name: { fr: 'Gingembre', en: 'Ginger' },
    category: 'vegetables',
    image: gengembreImg,
    description: {
      fr: 'Racines de gingembre fraîches, aromatiques et piquantes.',
      en: 'Fresh, aromatic and spicy ginger roots.'
    }
  },
  {
    id: 'rocou',
    name: { fr: 'Rocou (Annatto)', en: 'Rocou (Annatto)' },
    category: 'vegetables',
    image: rocouImg,
    description: {
      fr: 'Graines de rocou utilisées comme colorant naturel et épice dans la cuisine.',
      en: 'Rocou seeds used as a natural colorant and spice in cooking.'
    }
  },
  {
    id: 'soybean-white',
    name: { fr: 'Soja Blanc', en: 'White Soybean' },
    category: 'vegetables',
    image: sojaBlancImg,
    description: {
      fr: 'Graines de soja blanc séchées, riches en protéines végétales de haute qualité.',
      en: 'Dried white soybeans, rich in high quality plant proteins.'
    }
  },
  {
    id: 'soybean-green',
    name: { fr: 'Soja Vert (Edamame)', en: 'Green Soybean (Edamame)' },
    category: 'vegetables',
    image: sojaVert,
    description: {
      fr: 'Gousses de soja vert frais, riches en protéines et en vitamines.',
      en: 'Fresh green soybean pods, rich in proteins and vitamins.'
    }
  },
];
