export type Category = 'export' | 'fruits' | 'food' | 'vegetables';

export interface Product {
  id: string;
  name: { fr: string; en: string };
  category: Category;
  image: string;
  description: { fr: string; en: string };
}

export const products: Product[] = [
  // Export Crops
  {
    id: 'cacao',
    name: { fr: 'Cacao / Fèves de Cacao', en: 'Cacao / Cocoa Beans' },
    category: 'export',
    // cocoa beans in hands
    image: 'https://images.unsplash.com/photo-1616035071197-0f8a924400dd?w=600&h=400&fit=crop',
    description: {
      fr: 'Fèves de cacao de première qualité, séchées au soleil, idéales pour la production de chocolat.',
      en: 'Premium quality sun-dried cocoa beans, ideal for fine chocolate production.'
    }
  },
  {
    id: 'coffee',
    name: { fr: 'Café', en: 'Coffee' },
    category: 'export',
    // coffee beans
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&h=400&fit=crop',
    description: {
      fr: 'Grains de café robusta riches et aromatiques cultivés dans les hautes terres.',
      en: 'Rich and aromatic robusta coffee beans grown in the highlands.'
    }
  },
  {
    id: 'cashew',
    name: { fr: 'Noix de Cajou', en: 'Cashew Nuts' },
    category: 'export',
    // cashew nuts
    image: 'https://images.unsplash.com/photo-1599507137350-0a2561b3ad2b?w=600&h=400&fit=crop',
    description: {
      fr: 'Noix de cajou brutes et transformées de haute qualité.',
      en: 'High quality raw and processed cashew nuts.'
    }
  },
  {
    id: 'palm-oil',
    name: { fr: 'Huile de Palme', en: 'Palm Oil' },
    category: 'export',
    // palm oil / fruits
    image: 'https://images.unsplash.com/photo-1632778144081-30c12853de15?w=600&h=400&fit=crop',
    description: {
      fr: 'Huile de palme brute et raffinée issue de plantations durables.',
      en: 'Crude and refined palm oil from sustainable plantations.'
    }
  },
  {
    id: 'rubber',
    name: { fr: 'Hévéa / Caoutchouc', en: 'Rubber' },
    category: 'export',
    // rubber tree
    image: 'https://images.unsplash.com/photo-1532153259564-9844e1160a2b?w=600&h=400&fit=crop',
    description: {
      fr: 'Caoutchouc naturel brut pour applications industrielles.',
      en: 'Raw natural rubber for industrial applications.'
    }
  },
  {
    id: 'cotton',
    name: { fr: 'Coton', en: 'Cotton' },
    category: 'export',
    // cotton plant
    image: 'https://images.unsplash.com/photo-1595000720641-5a8274712ccb?w=600&h=400&fit=crop',
    description: {
      fr: 'Fibres de coton pur de haute qualité pour le textile.',
      en: 'High-quality pure cotton fibers for textiles.'
    }
  },
  
  // Fruits
  {
    id: 'plantain',
    name: { fr: 'Banane Plantain', en: 'Plantain' },
    category: 'fruits',
    // plantains
    image: 'https://images.unsplash.com/photo-1627471780587-f8319fdb96f0?w=600&h=400&fit=crop',
    description: {
      fr: 'Bananes plantains fraîches de Côte d\'Ivoire.',
      en: 'Fresh plantain bananas from Ivory Coast.'
    }
  },
  {
    id: 'mango',
    name: { fr: 'Mangue', en: 'Mango' },
    category: 'fruits',
    // fresh mangoes
    image: 'https://images.unsplash.com/photo-1553279768-865429fd01a5?w=600&h=400&fit=crop',
    description: {
      fr: 'Mangues Kent et Amélie, douces et juteuses.',
      en: 'Sweet and juicy Kent and Amelie mangoes.'
    }
  },
  {
    id: 'papaya',
    name: { fr: 'Papaye', en: 'Papaya' },
    category: 'fruits',
    // papaya
    image: 'https://images.unsplash.com/photo-1517282009859-f000eca3bca2?w=600&h=400&fit=crop',
    description: {
      fr: 'Papayes tropicales fraîches, riches en vitamines.',
      en: 'Fresh tropical papayas, rich in vitamins.'
    }
  },
  {
    id: 'avocado',
    name: { fr: 'Avocat', en: 'Avocado' },
    category: 'fruits',
    // avocado
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=400&fit=crop',
    description: {
      fr: 'Avocats crémeux de qualité supérieure.',
      en: 'Premium quality creamy avocados.'
    }
  },

  // Food Crops
  {
    id: 'cassava',
    name: { fr: 'Manioc', en: 'Cassava' },
    category: 'food',
    // cassava root
    image: 'https://images.unsplash.com/photo-1658428459419-f9c3ffbb1a36?w=600&h=400&fit=crop',
    description: {
      fr: 'Racines de manioc fraîches pour consommation ou transformation.',
      en: 'Fresh cassava roots for consumption or processing.'
    }
  },
  {
    id: 'rice',
    name: { fr: 'Riz', en: 'Rice' },
    category: 'food',
    // rice grains
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
    description: {
      fr: 'Riz local de haute qualité.',
      en: 'High quality local rice.'
    }
  },
  {
    id: 'yam',
    name: { fr: 'Igname', en: 'Yam' },
    category: 'food',
    // yam tubers
    image: 'https://images.unsplash.com/photo-1596482181747-9755ebbc7df2?w=600&h=400&fit=crop',
    description: {
      fr: 'Tubercules d\'igname, base de l\'alimentation locale.',
      en: 'Yam tubers, a staple of the local diet.'
    }
  },

  // Vegetables
  {
    id: 'chili',
    name: { fr: 'Piment', en: 'Chili Pepper' },
    category: 'vegetables',
    // chili peppers
    image: 'https://images.unsplash.com/photo-1588015469502-c0e86aa4899c?w=600&h=400&fit=crop',
    description: {
      fr: 'Piments rouges et verts forts et savoureux.',
      en: 'Spicy and flavorful red and green chili peppers.'
    }
  },
  {
    id: 'ginger',
    name: { fr: 'Gingembre', en: 'Ginger' },
    category: 'vegetables',
    // ginger root
    image: 'https://images.unsplash.com/photo-1615486171448-4fb324e41ba4?w=600&h=400&fit=crop',
    description: {
      fr: 'Racines de gingembre fraîches, aromatiques et piquantes.',
      en: 'Fresh, aromatic and spicy ginger roots.'
    }
  }
];
