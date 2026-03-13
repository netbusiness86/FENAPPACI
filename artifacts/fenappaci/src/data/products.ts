export type Category = 'export' | 'fruits' | 'food' | 'vegetables';

export interface Product {
  id: string;
  name: { fr: string; en: string };
  category: Category;
  image: string;
  description: { fr: string; en: string };
}

// Helper: Unsplash CDN (tested working IDs)
const u = (id: string) => `https://images.unsplash.com/${id}?w=600&h=400&fit=crop&auto=format`;
// Helper: Loremflickr keyword images (always show relevant content)
const lf = (keywords: string, seed: number) => `https://loremflickr.com/600/400/${keywords}?lock=${seed}`;

export const products: Product[] = [
  // === CULTURES D'EXPORTATION ===
  {
    id: 'cacao',
    name: { fr: 'Cacao / Fèves de Cacao', en: 'Cacao / Cocoa Beans' },
    category: 'export',
    image: lf('cocoa,beans', 1),
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
    image: lf('cashew,nuts', 2),
    description: {
      fr: 'Noix de cajou brutes et transformées de haute qualité, issues des meilleures plantations.',
      en: 'High quality raw and processed cashew nuts from the best plantations.'
    }
  },
  {
    id: 'palm-oil',
    name: { fr: 'Huile de Palme', en: 'Palm Oil' },
    category: 'export',
    image: lf('palm,oil,fruit', 3),
    description: {
      fr: 'Huile de palme brute et raffinée issue de plantations durables certifiées.',
      en: 'Crude and refined palm oil from certified sustainable plantations.'
    }
  },
  {
    id: 'rubber',
    name: { fr: 'Hévéa / Caoutchouc', en: 'Rubber' },
    category: 'export',
    image: lf('rubber,tree,latex', 4),
    description: {
      fr: 'Caoutchouc naturel brut de haute qualité pour applications industrielles mondiales.',
      en: 'High quality raw natural rubber for global industrial applications.'
    }
  },
  {
    id: 'cotton',
    name: { fr: 'Coton', en: 'Cotton' },
    category: 'export',
    image: lf('cotton,plant', 5),
    description: {
      fr: 'Fibres de coton pur de haute qualité pour l\'industrie textile internationale.',
      en: 'High-quality pure cotton fibers for the international textile industry.'
    }
  },
  {
    id: 'cola',
    name: { fr: 'Noix de Cola', en: 'Cola Nut' },
    category: 'export',
    image: lf('kola,nut', 6),
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
    image: lf('plantain,banana', 7),
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
    image: lf('papaya,tropical', 8),
    description: {
      fr: 'Papayes tropicales fraîches, riches en vitamines A et C.',
      en: 'Fresh tropical papayas, rich in vitamins A and C.'
    }
  },
  {
    id: 'mango',
    name: { fr: 'Mangue', en: 'Mango' },
    category: 'fruits',
    image: lf('mango,fruit', 9),
    description: {
      fr: 'Mangues Kent et Amélie, douces, juteuses et parfumées.',
      en: 'Sweet, juicy and fragrant Kent and Amelie mangoes.'
    }
  },
  {
    id: 'avocado',
    name: { fr: 'Avocat', en: 'Avocado' },
    category: 'fruits',
    image: u('photo-1523049673857-eb18f1d7b578'),
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
    image: u('photo-1490885578174-acda8905c2c6'),
    description: {
      fr: 'Mandarines fraîches, faciles à éplucher et délicieusement sucrées.',
      en: 'Fresh mandarins, easy to peel and deliciously sweet.'
    }
  },
  {
    id: 'lemon',
    name: { fr: 'Citron', en: 'Lemon' },
    category: 'fruits',
    image: lf('lemon,citrus', 10),
    description: {
      fr: 'Citrons frais et acidulés, parfaits pour la cuisine et les boissons.',
      en: 'Fresh and tangy lemons, perfect for cooking and beverages.'
    }
  },
  {
    id: 'melon',
    name: { fr: 'Melon', en: 'Melon' },
    category: 'fruits',
    image: lf('melon,cantaloupe', 11),
    description: {
      fr: 'Melons sucrés et parfumés, cultivés sous le soleil d\'Afrique.',
      en: 'Sweet and fragrant melons grown under the African sun.'
    }
  },
  {
    id: 'watermelon',
    name: { fr: 'Pastèque', en: 'Watermelon' },
    category: 'fruits',
    image: u('photo-1502741224143-90386d7f8c82'),
    description: {
      fr: 'Pastèques rafraîchissantes et sucrées, idéales pour les marchés d\'exportation.',
      en: 'Refreshing and sweet watermelons, ideal for export markets.'
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
    image: lf('cassava,tapioca', 12),
    description: {
      fr: 'Racines de manioc fraîches pour consommation directe ou transformation industrielle.',
      en: 'Fresh cassava roots for direct consumption or industrial processing.'
    }
  },
  {
    id: 'placali',
    name: { fr: 'Placali (Pâte de Manioc)', en: 'Placali (Cassava Paste)' },
    category: 'food',
    image: lf('cassava,paste,food', 13),
    description: {
      fr: 'Pâte de manioc fermentée, aliment traditionnel ivoirien très prisé.',
      en: 'Fermented cassava paste, a highly prized traditional Ivorian food.'
    }
  },
  {
    id: 'yellow-corn',
    name: { fr: 'Maïs Jaune', en: 'Yellow Corn' },
    category: 'food',
    image: lf('corn,maize,yellow', 14),
    description: {
      fr: 'Maïs jaune séché, riche en amidon, pour l\'alimentation humaine et animale.',
      en: 'Dried yellow corn, starch-rich, for human and animal consumption.'
    }
  },
  {
    id: 'white-corn',
    name: { fr: 'Maïs Blanc', en: 'White Corn' },
    category: 'food',
    image: u('photo-1569870499705-504209102861'),
    description: {
      fr: 'Maïs blanc de qualité supérieure, utilisé dans la fabrication de farine et de semoule.',
      en: 'Superior quality white corn used in the manufacture of flour and semolina.'
    }
  },
  {
    id: 'yam',
    name: { fr: 'Igname', en: 'Yam' },
    category: 'food',
    image: lf('yam,tuber', 15),
    description: {
      fr: 'Tubercules d\'igname, base de l\'alimentation en Côte d\'Ivoire.',
      en: 'Yam tubers, a staple of the diet in Ivory Coast.'
    }
  },
  {
    id: 'taro',
    name: { fr: 'Taro', en: 'Taro' },
    category: 'food',
    image: u('photo-1618897996318-5a901fa6ca71'),
    description: {
      fr: 'Taro frais, riche en fibres et en minéraux essentiels.',
      en: 'Fresh taro, rich in fiber and essential minerals.'
    }
  },
  {
    id: 'potato',
    name: { fr: 'Pomme de Terre', en: 'Potato' },
    category: 'food',
    image: lf('potato,vegetable', 16),
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
    image: lf('chili,pepper,red', 17),
    description: {
      fr: 'Piments rouges et verts forts et savoureux, frais ou séchés.',
      en: 'Spicy and flavorful red and green chili peppers, fresh or dried.'
    }
  },
  {
    id: 'eggplant',
    name: { fr: 'Aubergine', en: 'Eggplant' },
    category: 'vegetables',
    image: u('photo-1606756790138-261d2b21cd75'),
    description: {
      fr: 'Aubergines fraîches et fermes, idéales pour la cuisine africaine et internationale.',
      en: 'Fresh and firm eggplants, ideal for African and international cuisine.'
    }
  },
  {
    id: 'okra',
    name: { fr: 'Gombo', en: 'Okra' },
    category: 'vegetables',
    image: lf('okra,vegetable', 18),
    description: {
      fr: 'Gombos frais et tendres, très utilisés dans les sauces traditionnelles ivoiriennes.',
      en: 'Fresh and tender okra, widely used in traditional Ivorian sauces.'
    }
  },
  {
    id: 'lettuce',
    name: { fr: 'Laitue', en: 'Lettuce' },
    category: 'vegetables',
    image: lf('lettuce,green,salad', 19),
    description: {
      fr: 'Laitues fraîches et croquantes, cultivées sans pesticides.',
      en: 'Fresh and crispy lettuces, grown without pesticides.'
    }
  },
  {
    id: 'ginger',
    name: { fr: 'Gingembre', en: 'Ginger' },
    category: 'vegetables',
    image: lf('ginger,root,spice', 20),
    description: {
      fr: 'Racines de gingembre fraîches, aromatiques et piquantes.',
      en: 'Fresh, aromatic and spicy ginger roots.'
    }
  },
  {
    id: 'rocou',
    name: { fr: 'Rocou (Annatto)', en: 'Rocou (Annatto)' },
    category: 'vegetables',
    image: lf('annatto,spice,seeds', 21),
    description: {
      fr: 'Graines de rocou utilisées comme colorant naturel et épice dans la cuisine.',
      en: 'Rocou seeds used as a natural colorant and spice in cooking.'
    }
  },
  {
    id: 'soybean-white',
    name: { fr: 'Soja Blanc', en: 'White Soybean' },
    category: 'vegetables',
    image: lf('soybean,legume', 22),
    description: {
      fr: 'Graines de soja blanc séchées, riches en protéines végétales de haute qualité.',
      en: 'Dried white soybeans, rich in high quality plant proteins.'
    }
  },
  {
    id: 'soybean-green',
    name: { fr: 'Soja Vert (Edamame)', en: 'Green Soybean (Edamame)' },
    category: 'vegetables',
    image: u('photo-1590779033100-9f60a05a013d'),
    description: {
      fr: 'Gousses de soja vert frais, riches en protéines et en vitamines.',
      en: 'Fresh green soybean pods, rich in proteins and vitamins.'
    }
  },
];
