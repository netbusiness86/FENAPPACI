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
  'home.stats.countries': { fr: 'Pays d\'Export', en: 'Export Countries' },
  'home.stats.experience': { fr: 'Années d\'Expérience', en: 'Years Experience' },
  'home.stats.products': { fr: 'Produits', en: 'Products' },

  // Home Features Section
  'home.features.title': { fr: 'Excellence dans l\'Export Agricole', en: 'Excellence in Agricultural Export' },
  'home.features.subtitle': {
    fr: 'Nous connectons les agriculteurs locaux aux marchés mondiaux, en garantissant une qualité premium et des pratiques durables à chaque étape.',
    en: 'We connect local farmers with global markets, ensuring premium quality and sustainable practices at every step.'
  },
  'home.features.quality.title': { fr: 'Qualité Premium', en: 'Premium Quality' },
  'home.features.quality.desc': {
    fr: 'Processus stricts de contrôle qualité garantissant que seuls les meilleurs produits atteignent les marchés internationaux.',
    en: 'Strict quality control processes ensuring only the best produce reaches international markets.'
  },
  'home.features.network.title': { fr: 'Réseau Mondial', en: 'Global Network' },
  'home.features.network.desc': {
    fr: 'Réseau logistique et de distribution étendu couvrant plus de 30 pays à travers le monde.',
    en: 'Extensive logistics and distribution network spanning across 30+ countries worldwide.'
  },
  'home.features.sustainable.title': { fr: 'Agriculture Durable', en: 'Sustainable Farming' },
  'home.features.sustainable.desc': {
    fr: 'Soutien aux agriculteurs locaux avec des techniques modernes pour une agriculture respectueuse de l\'environnement.',
    en: 'Supporting local farmers with modern techniques for environmentally friendly agriculture.'
  },

  // Home CTA
  'home.cta.title': { fr: 'Prêt à Importer des Produits Premium ?', en: 'Ready to Import Premium Products?' },
  'home.cta.subtitle': {
    fr: 'Rejoignez notre réseau d\'acheteurs internationaux et découvrez les meilleurs produits agricoles de Côte d\'Ivoire.',
    en: 'Join our network of international buyers and experience the finest agricultural produce from Ivory Coast.'
  },
  'home.cta.btn': { fr: 'Demander un Devis Maintenant', en: 'Request a Quote Today' },

  // General
  'general.read_more': { fr: 'Lire la suite', en: 'Read more' },
  'general.submit': { fr: 'Envoyer', en: 'Submit' },
  'general.sending': { fr: 'Envoi en cours...', en: 'Sending...' },
  'general.success': { fr: 'Succès !', en: 'Success!' },
  'general.error': { fr: 'Erreur', en: 'Error' },

  // Products
  'products.title': { fr: 'Nos Produits Agricoles', en: 'Our Agricultural Products' },
  'products.subtitle': {
    fr: 'Une qualité exceptionnelle directement de nos producteurs à travers la Côte d\'Ivoire.',
    en: 'Exceptional quality directly from our producers across Ivory Coast.'
  },
  'products.cat.all': { fr: 'Tous les produits', en: 'All Products' },
  'products.cat.export': { fr: 'Cultures d\'Exportation', en: 'Export Crops' },
  'products.cat.fruits': { fr: 'Fruits', en: 'Fruits' },
  'products.cat.food': { fr: 'Cultures Vivrières', en: 'Food Crops' },
  'products.cat.vegetables': { fr: 'Légumes', en: 'Vegetables' },
  'products.available': { fr: 'Disponible à l\'Export', en: 'Available for Export' },
  'products.request': { fr: 'Demander un Achat', en: 'Request Purchase' },
  'products.search': { fr: 'Rechercher des produits...', en: 'Search products...' },
  'products.notfound.title': { fr: 'Aucun produit trouvé', en: 'No products found' },
  'products.notfound.desc': { fr: 'Essayez d\'ajuster votre recherche ou vos filtres', en: 'Try adjusting your search or filters' },

  // About
  'about.hero.subtitle': {
    fr: 'Pilotant la modernisation agricole et facilitant le commerce mondial depuis la Côte d\'Ivoire vers le monde.',
    en: 'Driving agricultural modernization and facilitating global trade from Côte d\'Ivoire to the world.'
  },
  'about.who.title': { fr: 'Qui Sommes-Nous', en: 'Who We Are' },
  'about.who.p1': {
    fr: 'FENAPPACI (Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d\'Ivoire) est l\'organisation de référence représentant et organisant les producteurs agricoles de Côte d\'Ivoire.',
    en: 'FENAPPACI (Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d\'Ivoire) is the premier organization representing and organizing agricultural producers in Ivory Coast.'
  },
  'about.who.p2': {
    fr: 'Nous servons de pont essentiel entre les communautés agricoles locales et les marchés internationaux, garantissant un commerce équitable, une qualité premium et une croissance durable pour le secteur agricole.',
    en: 'We serve as the vital bridge between local farming communities and international markets, ensuring fair trade, premium quality, and sustainable growth for the agricultural sector.'
  },
  'about.years': { fr: 'Années d\'Activité', en: 'Years Active' },
  'about.farmers': { fr: 'Agriculteurs Soutenus', en: 'Farmers Supported' },
  'about.certified': { fr: 'Certifié', en: 'Certified' },
  'about.quality': { fr: 'Export de Qualité', en: 'Quality Export' },
  'about.vision.title': { fr: 'Notre Vision', en: 'Our Vision' },
  'about.vision.desc': {
    fr: 'Moderniser l\'agriculture en Côte d\'Ivoire, la transformer en un secteur hautement efficient, durable et mondialement compétitif qui apporte prospérité aux communautés locales.',
    en: 'To modernize agriculture in Ivory Coast, transforming it into a highly efficient, sustainable, and globally competitive sector that brings prosperity to local communities.'
  },
  'about.mission.title': { fr: 'Notre Mission', en: 'Our Mission' },
  'about.mission.1': { fr: 'Organiser et autonomiser les producteurs agricoles', en: 'Organize and empower agricultural producers' },
  'about.mission.2': { fr: 'Promouvoir l\'investissement international et domestique', en: 'Promote international and domestic investment' },
  'about.mission.3': { fr: 'Faciliter les exportations mondiales sans friction', en: 'Facilitate seamless global exports' },
  'about.mission.4': { fr: 'Développer des partenariats commerciaux internationaux solides', en: 'Develop strong international trade partnerships' },

  // Investment
  'investment.hero.title': { fr: 'Investissement Agricole', en: 'Agricultural Investment' },
  'investment.hero.subtitle': {
    fr: 'Découvrez des opportunités d\'investissement à haut rendement dans le secteur agricole florissant de Côte d\'Ivoire.',
    en: 'Discover high-yield investment opportunities in Ivory Coast\'s booming agricultural sector.'
  },
  'investment.why.title': { fr: 'Pourquoi Investir en Côte d\'Ivoire ?', en: 'Why Invest in Ivory Coast?' },
  'investment.why.desc': {
    fr: 'En tant que premier producteur mondial de cacao et grand exportateur de noix de cajou, de café et d\'huile de palme, la Côte d\'Ivoire offre des opportunités inégalées pour les investisseurs agricoles.',
    en: 'As the world\'s leading producer of cocoa and a major exporter of cashew nuts, coffee, and palm oil, Ivory Coast offers unparalleled opportunities for agricultural investors looking for sustainable growth.'
  },
  'investment.card.growth.title': { fr: 'Fort Potentiel de Croissance', en: 'High Growth Potential' },
  'investment.card.growth.desc': { fr: 'Marchés en expansion rapide pour les produits agricoles bruts et transformés.', en: 'Rapidly expanding markets for raw and processed agricultural goods.' },
  'investment.card.gov.title': { fr: 'Soutien Gouvernemental', en: 'Government Support' },
  'investment.card.gov.desc': { fr: 'Incitations fiscales et politiques favorables pour les investissements directs étrangers.', en: 'Favorable tax incentives and policies for foreign direct investment.' },
  'investment.card.agro.title': { fr: 'Agro-Industrie', en: 'Agro-Processing' },
  'investment.card.agro.desc': { fr: 'Énorme potentiel dans le secteur de la transformation à valeur ajoutée localement.', en: 'Massive potential in the value-added processing sector locally.' },
  'investment.card.infra.title': { fr: 'Infrastructure', en: 'Infrastructure' },
  'investment.card.infra.desc': { fr: 'Modernisation des ports et réseaux de transport facilitant l\'export mondial.', en: 'Modernizing ports and transport networks facilitating global export.' },
  'investment.sectors.title': { fr: 'Secteurs Clés d\'Investissement', en: 'Key Investment Sectors' },
  'investment.sector.cacao.title': { fr: 'Chaîne de Valeur du Cacao', en: 'Cacao Value Chain' },
  'investment.sector.cacao.desc': { fr: 'Investissement dans la production locale de chocolat, les installations de transformation et les technologies agricoles durables.', en: 'Investment in local chocolate production, processing facilities, and sustainable farming tech.' },
  'investment.sector.cashew.title': { fr: 'Transformation de la Noix de Cajou', en: 'Cashew Processing' },
  'investment.sector.cashew.desc': { fr: 'Forte demande pour des usines de transformation localisées avant l\'exportation des noix brutes.', en: 'High demand for localized processing plants to transform raw nuts before export.' },
  'investment.sector.tech.title': { fr: 'Technologies Agricoles Modernes', en: 'Modern Farming Tech' },
  'investment.sector.tech.desc': { fr: 'Systèmes d\'irrigation, mécanisation et solutions agricoles intelligentes pour les coopératives locales.', en: 'Irrigation systems, mechanization, and smart farming solutions for local cooperatives.' },
  'investment.cta.title': { fr: 'Prêt à Explorer les Opportunités ?', en: 'Ready to Explore Opportunities?' },
  'investment.cta.desc': { fr: 'Contactez notre équipe de conseil en investissement pour obtenir des rapports de marché détaillés et discuter de projets potentiels.', en: 'Contact our investment advisory team to get detailed market reports and discuss potential projects.' },
  'investment.cta.btn': { fr: 'Contacter l\'Équipe Investissement', en: 'Contact Investment Team' },

  // Partnership
  'partnership.hero.title': { fr: 'Partenariat', en: 'Partner With Us' },
  'partnership.hero.subtitle': {
    fr: 'Construisez des relations solides et mutuellement bénéfiques avec le premier réseau agricole de Côte d\'Ivoire.',
    en: 'Build strong, mutually beneficial relationships with Ivory Coast\'s leading agricultural network.'
  },
  'partnership.types.title': { fr: 'Types de Partenariats', en: 'Types of Partnerships' },
  'partnership.types.desc': {
    fr: 'Nous proposons des modèles de partenariat flexibles adaptés à différents objectifs commerciaux, du commerce direct aux investissements stratégiques à long terme.',
    en: 'We offer flexible partnership models designed to suit different business objectives, from direct trade to strategic long-term investments.'
  },
  'partnership.trade.title': { fr: 'Partenaire Commercial', en: 'Trade Partner' },
  'partnership.trade.desc': { fr: 'Pour les importateurs, grossistes et distributeurs internationaux à la recherche d\'un approvisionnement agricole fiable et de haute qualité.', en: 'For international importers, wholesalers, and distributors looking for reliable, high-quality agricultural supply.' },
  'partnership.invest.title': { fr: 'Partenaire Investisseur', en: 'Investment Partner' },
  'partnership.invest.desc': { fr: 'Pour les entités souhaitant investir dans la mécanisation agricole, les usines de transformation ou les technologies agricoles.', en: 'For entities looking to invest in farm mechanization, processing plants, or agricultural technology.' },
  'partnership.strategic.title': { fr: 'Partenaire Stratégique / ONG', en: 'Strategic / NGO Partner' },
  'partnership.strategic.desc': { fr: 'Pour les organisations axées sur l\'agriculture durable, le commerce équitable et le développement des communautés rurales.', en: 'For organizations focused on sustainable farming, fair trade, and rural community development.' },
  'partnership.discuss': { fr: 'Discuter du Partenariat', en: 'Discuss Partnership' },
  'partnership.process.title': { fr: 'Le Processus de Partenariat', en: 'The Partnership Process' },
  'partnership.process.1': { fr: 'Soumettez une demande initiale décrivant vos objectifs commerciaux.', en: 'Submit an initial inquiry outlining your business objectives.' },
  'partnership.process.2': { fr: 'Appel de consultation avec nos spécialistes en commerce/investissement.', en: 'Consultation call with our trade/investment specialists.' },
  'partnership.process.3': { fr: 'Diligence raisonnable et visites de sites (optionnel mais recommandé).', en: 'Due diligence and site visits (optional but recommended).' },
  'partnership.process.4': { fr: 'Signature d\'un Mémorandum d\'Entente (MoU) ou de Contrats Commerciaux.', en: 'Signing of Memorandum of Understanding (MoU) or Trade Contracts.' },
  'partnership.process.5': { fr: 'Mise en œuvre et gestion continue de la relation.', en: 'Implementation and ongoing relationship management.' },
  'partnership.cta.btn': { fr: 'Lancer le Processus', en: 'Start the Process' },

  // Export
  'export.hero.title': { fr: 'Processus d\'Exportation', en: 'Export Process' },
  'export.hero.subtitle': {
    fr: 'Logistique d\'exportation fluide, transparente et conforme aux normes mondiales, du Port d\'Abidjan à votre destination.',
    en: 'Seamless, transparent, and globally compliant export logistics from the Port of Abidjan to your destination.'
  },
  'export.how.title': { fr: 'Comment Nous Exportons', en: 'How We Export' },
  'export.how.desc': {
    fr: 'FENAPPACI gère les complexités du commerce international à votre place. Notre processus rationalisé garantit que vos marchandises arrivent à temps et en parfait état.',
    en: 'FENAPPACI handles the complexities of international trade so you don\'t have to. Our streamlined process ensures your goods arrive on time and in perfect condition.'
  },
  'export.step1.title': { fr: '1. Commande & Documentation', en: '1. Order & Documentation' },
  'export.step1.desc': { fr: 'Signature du contrat, émission de lettre de crédit et préparation des factures pro-forma.', en: 'Contract signing, LC issuance, and preparation of proforma invoices.' },
  'export.step2.title': { fr: '2. Inspection Qualité', en: '2. Quality Inspection' },
  'export.step2.desc': { fr: 'Vérification qualité SGS ou par une société indépendante avant le chargement.', en: 'SGS or independent quality verification before loading.' },
  'export.step3.title': { fr: '3. Emballage & Mise en Conteneur', en: '3. Packaging & Stuffing' },
  'export.step3.desc': { fr: 'Emballage sécurisé selon les normes internationales.', en: 'Secure packaging according to international standards.' },
  'export.step4.title': { fr: '4. Expédition & Logistique', en: '4. Shipping & Logistics' },
  'export.step4.desc': { fr: 'Expédition FOB ou CIF via le port autonome d\'Abidjan.', en: 'FOB or CIF shipping via the autonomous port of Abidjan.' },
  'export.docs.title': { fr: 'Documentation Requise', en: 'Required Documentation' },
  'export.doc.1': { fr: 'Facture Commerciale', en: 'Commercial Invoice' },
  'export.doc.2': { fr: 'Connaissement (B/L)', en: 'Bill of Lading (B/L)' },
  'export.doc.3': { fr: 'Certificat d\'Origine', en: 'Certificate of Origin' },
  'export.doc.4': { fr: 'Certificat Phytosanitaire', en: 'Phytosanitary Certificate' },
  'export.doc.5': { fr: 'Certificat de Fumigation', en: 'Fumigation Certificate' },
  'export.doc.6': { fr: 'Certificat Qualité & Poids (SGS)', en: 'Quality & Weight Certificate (SGS)' },
  'export.doc.7': { fr: 'Liste de Colisage', en: 'Packing List' },
  'export.doc.8': { fr: 'Déclaration d\'Exportation', en: 'Export Declaration' },
  'export.map.title': { fr: 'Portée Mondiale', en: 'Global Reach' },
  'export.map.desc': {
    fr: 'Nous exportons actuellement nos produits agricoles premium vers plus de 30 pays en Europe, en Asie et sur le continent américain.',
    en: 'We currently export our premium agricultural products to over 30 countries across Europe, Asia, and the Americas.'
  },
  'export.map.label': { fr: 'La CI Connectée au Monde', en: 'Connecting CI to the World' },

  // Contact
  'contact.hero.title': { fr: 'Nous Contacter', en: 'Contact Us' },
  'contact.hero.subtitle': {
    fr: 'Contactez notre équipe à Abidjan pour toute demande concernant les produits, les partenariats ou les investissements.',
    en: 'Get in touch with our team in Abidjan for any inquiries regarding products, partnerships, or investments.'
  },
  'contact.office.title': { fr: 'Siège Social', en: 'Head Office' },
  'contact.location.label': { fr: 'Adresse', en: 'Location' },
  'contact.phone.label': { fr: 'Téléphone / WhatsApp', en: 'Phone / WhatsApp' },
  'contact.email.label': { fr: 'Email', en: 'Email' },
  'contact.hours.label': { fr: 'Heures d\'Ouverture', en: 'Business Hours' },
  'contact.hours.weekdays': { fr: 'Lundi - Vendredi : 8h00 - 17h00 (GMT)', en: 'Monday - Friday: 8:00 AM - 5:00 PM (GMT)' },
  'contact.hours.saturday': { fr: 'Samedi : 9h00 - 13h00 (GMT)', en: 'Saturday: 9:00 AM - 1:00 PM (GMT)' },
  'contact.form.title': { fr: 'Envoyez-nous un Message', en: 'Send us a Message' },
  'contact.form.firstname': { fr: 'Prénom', en: 'First Name' },
  'contact.form.lastname': { fr: 'Nom', en: 'Last Name' },
  'contact.form.email': { fr: 'Email', en: 'Email' },
  'contact.form.subject': { fr: 'Sujet', en: 'Subject' },
  'contact.form.message': { fr: 'Message', en: 'Message' },
  'contact.form.send': { fr: 'Envoyer le Message', en: 'Send Message' },
  'contact.form.sending': { fr: 'Envoi en cours...', en: 'Sending...' },
  'contact.toast.title': { fr: 'Message Envoyé', en: 'Message Sent' },
  'contact.toast.desc': { fr: 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.', en: 'Thank you for contacting us. We will get back to you shortly.' },

  // Request
  'request.hero.title': { fr: 'Demande d\'Achat', en: 'Request Purchase' },
  'request.hero.subtitle': {
    fr: 'Soumettez vos besoins pour recevoir un devis personnalisé et les détails d\'exportation.',
    en: 'Submit your requirements to receive a customized quote and export details.'
  },
  'request.success.title': { fr: 'Demande Envoyée avec Succès !', en: 'Request Sent Successfully!' },
  'request.success.desc': {
    fr: 'Merci pour votre intérêt. Notre équipe export examinera votre demande et vous contactera dans les 24 heures.',
    en: 'Thank you for your interest. Our export team will review your request and contact you within 24 hours.'
  },
  'request.success.btn': { fr: 'Soumettre une Autre Demande', en: 'Submit Another Request' },
  'request.submit': { fr: 'Envoyer la Demande', en: 'Submit Request' },
  'request.toast.success': { fr: 'Votre demande d\'achat a été soumise avec succès. Nous vous contacterons bientôt.', en: 'Your purchase request has been submitted successfully. We will contact you soon.' },
  'request.toast.error': { fr: 'Échec de l\'envoi. Veuillez réessayer.', en: 'Failed to submit request. Please try again.' },
  'request.placeholder.product': { fr: 'ex. Fèves de Cacao', en: 'e.g. Cacao Beans' },
  'request.placeholder.quantity': { fr: 'ex. 20 Tonnes / 1 Conteneur', en: 'e.g. 20 Tons / 1 Container' },
  'request.placeholder.destination': { fr: 'Port / Ville', en: 'Port / City' },
  'request.placeholder.message': { fr: 'Précisez vos besoins spécifiques, conditionnement, délais...', en: 'Tell us more about your specific requirements, packaging needs, or timeline...' },

  // Form fields
  'form.fullname': { fr: 'Nom Complet', en: 'Full Name' },
  'form.company': { fr: 'Nom de l\'Entreprise', en: 'Company Name' },
  'form.country': { fr: 'Pays', en: 'Country' },
  'form.email': { fr: 'Email', en: 'Email' },
  'form.phone': { fr: 'Téléphone / WhatsApp', en: 'Phone / WhatsApp' },
  'form.product': { fr: 'Produit Souhaité', en: 'Product Interested In' },
  'form.quantity': { fr: 'Quantité', en: 'Quantity' },
  'form.destination': { fr: 'Lieu de Livraison', en: 'Delivery Destination' },
  'form.message': { fr: 'Message Supplémentaire', en: 'Additional Message' },

  // Validation messages
  'validation.name': { fr: 'Le nom est requis', en: 'Name is required' },
  'validation.country': { fr: 'Le pays est requis', en: 'Country is required' },
  'validation.email': { fr: 'Adresse email invalide', en: 'Invalid email address' },
  'validation.phone': { fr: 'Le numéro de téléphone est requis', en: 'Phone number is required' },
  'validation.product': { fr: 'Le produit est requis', en: 'Product is required' },
  'validation.quantity': { fr: 'La quantité est requise', en: 'Quantity is required' },
  'validation.destination': { fr: 'La destination est requise', en: 'Destination is required' },

  // Navigation - Market
  'nav.market': { fr: 'Marché', en: 'Market' },

  // Market Prices Page
  'market.live_badge': { fr: 'Données en Temps Réel', en: 'Live Data' },
  'market.title': { fr: 'Prix des Matières Premières Agricoles', en: 'Agricultural Commodity Prices' },
  'market.subtitle': {
    fr: 'Suivez les prix du marché mondial pour les principales cultures agricoles d\'Afrique de l\'Ouest.',
    en: 'Track global market prices for major West African agricultural commodities.'
  },
  'market.rising': { fr: 'En hausse', en: 'Rising' },
  'market.falling': { fr: 'En baisse', en: 'Falling' },
  'market.commodities': { fr: 'Produits', en: 'Commodities' },
  'market.last_updated': { fr: 'Dernière mise à jour', en: 'Last updated' },
  'market.refresh_in': { fr: 'Actualisation dans', en: 'Refresh in' },
  'market.refresh': { fr: 'Actualiser', en: 'Refresh' },
  'market.initializing': {
    fr: 'Initialisation des données de marché...',
    en: 'Initializing market data...'
  },
  'market.disclaimer': {
    fr: 'Les prix affichés sont indicatifs et basés sur les marchés internationaux. Ils peuvent différer des prix locaux.',
    en: 'Displayed prices are indicative and based on international markets. They may differ from local prices.'
  },

  // Market Insights
  'market.insights.title': { fr: 'Analyse du Marché', en: 'Market Insights' },
  'market.insights.subtitle': {
    fr: 'Tendances et opportunités pour les exportateurs ivoiriens',
    en: 'Trends and opportunities for Ivorian exporters'
  },
  'market.insight.cocoa.title': { fr: 'Demande Mondiale de Cacao', en: 'Global Cocoa Demand' },
  'market.insight.cocoa.desc': {
    fr: 'La Côte d\'Ivoire est le premier producteur mondial de cacao avec plus de 40% de la production globale. La demande mondiale reste soutenue par la croissance des marchés asiatiques et la montée du chocolat premium.',
    en: 'Ivory Coast is the world\'s leading cocoa producer with over 40% of global output. Global demand remains strong driven by Asian market growth and the rise of premium chocolate.'
  },
  'market.insight.cocoa.trend': { fr: 'Forte demande — opportunité d\'exportation', en: 'High demand — export opportunity' },
  'market.insight.cashew.title': { fr: 'Tendances Noix de Cajou', en: 'Cashew Market Trends' },
  'market.insight.cashew.desc': {
    fr: 'La Côte d\'Ivoire est le premier exportateur africain de noix de cajou brutes. Les marchés asiatiques, notamment l\'Inde et le Vietnam, sont les principaux transformateurs. La transformation locale est en forte croissance.',
    en: 'Ivory Coast is Africa\'s top raw cashew exporter. Asian markets, notably India and Vietnam, are key processors. Local processing is growing rapidly.'
  },
  'market.insight.cashew.trend': { fr: 'Marché en expansion mondiale', en: 'Globally expanding market' },
  'market.insight.export.title': { fr: 'Opportunités d\'Exportation', en: 'Export Opportunities' },
  'market.insight.export.desc': {
    fr: 'L\'Afrique de l\'Ouest offre d\'importantes opportunités d\'exportation vers l\'Europe, l\'Amérique du Nord et l\'Asie. La FENAPPACI facilite les connexions directes entre producteurs locaux et acheteurs internationaux.',
    en: 'West Africa offers significant export opportunities to Europe, North America and Asia. FENAPPACI facilitates direct connections between local producers and international buyers.'
  },
  'market.insight.export.trend': { fr: 'Accès direct aux marchés internationaux', en: 'Direct access to international markets' },

  // Market CTA
  'market.cta.title': { fr: 'Intéressé par nos Produits ?', en: 'Interested in Our Products?' },
  'market.cta.desc': {
    fr: 'Contactez-nous pour obtenir des prix à l\'exportation personnalisés et découvrir comment la FENAPPACI peut répondre à vos besoins d\'approvisionnement.',
    en: 'Contact us for personalized export pricing and discover how FENAPPACI can meet your sourcing needs.'
  },
  'market.cta.btn': { fr: 'Demander un Devis', en: 'Request a Quote' },

  // Admin Market
  'admin.market.title': { fr: 'Gestion des Prix du Marché', en: 'Market Price Management' },
  'admin.market.subtitle': { fr: 'Mettre à jour les prix des matières premières', en: 'Update commodity prices' },

  // Footer
  'footer.desc': {
    fr: 'Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d\'Ivoire.',
    en: 'National Federation of Agricultural Producers & Promoters of Côte d\'Ivoire.'
  },
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
