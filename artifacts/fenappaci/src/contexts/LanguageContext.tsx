import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.about': { fr: 'À Propos', en: 'About Us' },
  'nav.products': { fr: 'Produits', en: 'Products' },
  'nav.investment': { fr: 'Investissement', en: 'Investment' },
  'nav.partnership': { fr: 'Partenariat', en: 'Partnership' },
  'nav.export': { fr: 'Exportation', en: 'Export' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.request_quote': { fr: 'Demander un Devis', en: 'Request Quote' },

  // Home
  'home.hero.title': { 
    fr: 'Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d\'Ivoire', 
    en: 'National Federation of Agricultural Producers & Promoters of Côte d\'Ivoire' 
  },
  'home.hero.subtitle': { 
    fr: 'Connecter les producteurs agricoles de Côte d\'Ivoire avec les acheteurs et investisseurs internationaux.', 
    en: 'Connecting agricultural producers in Ivory Coast with international buyers and investors.' 
  },
  'home.btn.products': { fr: 'Voir nos Produits', en: 'View Products' },
  'home.btn.partner': { fr: 'Devenir Partenaire', en: 'Become a Partner' },
  'home.stats.producers': { fr: 'Producteurs', en: 'Producers' },
  'home.stats.countries': { fr: 'Pays d\'Export', en: 'Countries' },
  'home.stats.experience': { fr: 'Années d\'Expérience', en: 'Years Experience' },
  'home.stats.products': { fr: 'Produits', en: 'Products' },

  // General 
  'general.read_more': { fr: 'Lire la suite', en: 'Read more' },
  'general.submit': { fr: 'Soumettre', en: 'Submit' },
  'general.sending': { fr: 'Envoi en cours...', en: 'Sending...' },
  'general.success': { fr: 'Succès!', en: 'Success!' },
  'general.error': { fr: 'Erreur', en: 'Error' },

  // Products
  'products.title': { fr: 'Nos Produits Agricoles', en: 'Our Agricultural Products' },
  'products.subtitle': { fr: 'Une qualité exceptionnelle directement de nos producteurs à travers la Côte d\'Ivoire.', en: 'Exceptional quality directly from our producers across Ivory Coast.' },
  'products.cat.all': { fr: 'Tous les produits', en: 'All Products' },
  'products.cat.export': { fr: 'Cultures d\'Exportation', en: 'Export Crops' },
  'products.cat.fruits': { fr: 'Fruits', en: 'Fruits' },
  'products.cat.food': { fr: 'Cultures Vivrières', en: 'Food Crops' },
  'products.cat.vegetables': { fr: 'Légumes', en: 'Vegetables' },
  'products.available': { fr: 'Disponible pour l\'Export', en: 'Available for Export' },
  'products.request': { fr: 'Demander un Achat', en: 'Request Purchase' },

  // Form
  'form.fullname': { fr: 'Nom Complet', en: 'Full Name' },
  'form.company': { fr: 'Nom de l\'Entreprise', en: 'Company Name' },
  'form.country': { fr: 'Pays', en: 'Country' },
  'form.email': { fr: 'Email', en: 'Email' },
  'form.phone': { fr: 'Téléphone / WhatsApp', en: 'Phone / WhatsApp' },
  'form.product': { fr: 'Produit Souhaité', en: 'Product Interested In' },
  'form.quantity': { fr: 'Quantité', en: 'Quantity' },
  'form.destination': { fr: 'Lieu de Livraison', en: 'Delivery Destination' },
  'form.message': { fr: 'Message Supplémentaire', en: 'Additional Message' },

  // Footer
  'footer.desc': { fr: 'Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d\'Ivoire.', en: 'National Federation of Agricultural Producers & Promoters of Côte d\'Ivoire.' },
  'footer.quick_links': { fr: 'Liens Rapides', en: 'Quick Links' },
  'footer.contact': { fr: 'Nous Contacter', en: 'Contact Us' },
  'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('fr');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key missing: ${key}`);
      return key;
    }
    return translations[key][lang];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
