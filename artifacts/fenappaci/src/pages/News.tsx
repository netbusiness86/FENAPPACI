import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';
import { Calendar, Tag, ArrowRight, Megaphone, Leaf, Handshake, TrendingUp, Globe } from 'lucide-react';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';

type ArticleCategory = 'campaign' | 'export' | 'partnership' | 'company' | 'market';

interface Article {
  id: number;
  category: ArticleCategory;
  date: string;
  image: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'campaign',
    date: '2025-03-10',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&h=500&fit=crop&auto=format',
    titleFr: 'Lancement de la Campagne Cacao 2025 — FENAPPACI mobilise ses producteurs',
    titleEn: '2025 Cocoa Campaign Launch — FENAPPACI Mobilizes Its Producers',
    excerptFr: "FENAPPACI lance officiellement la campagne de collecte et d'exportation de cacao 2025. Plus de 500 producteurs sont mobilisés dans les régions de Divo, Daloa et San-Pédro pour garantir une qualité premium pour les marchés internationaux.",
    excerptEn: "FENAPPACI officially launches the 2025 cocoa collection and export campaign. More than 500 producers are mobilized in the regions of Divo, Daloa and San-Pedro to guarantee premium quality for international markets.",
  },
  {
    id: 2,
    category: 'export',
    date: '2025-02-28',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?w=800&h=500&fit=crop&auto=format',
    titleFr: 'FENAPPACI exporte 2000 tonnes de noix de cajou vers l\'Asie',
    titleEn: 'FENAPPACI Exports 2,000 Tonnes of Cashew Nuts to Asia',
    excerptFr: "Un nouveau contrat majeur a été signé avec des partenaires asiatiques pour l'exportation de 2000 tonnes de noix de cajou brutes de haute qualité produites en Côte d'Ivoire.",
    excerptEn: "A major new contract has been signed with Asian partners for the export of 2,000 tonnes of high-quality raw cashew nuts produced in Ivory Coast.",
  },
  {
    id: 3,
    category: 'partnership',
    date: '2025-02-15',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop&auto=format',
    titleFr: 'Nouveau partenariat stratégique avec un groupe européen d\'import-export',
    titleEn: 'New Strategic Partnership with a European Import-Export Group',
    excerptFr: "FENAPPACI annonce un accord de partenariat stratégique avec un groupe européen spécialisé dans l'import-export de matières premières agricoles, ouvrant de nouvelles perspectives pour les producteurs ivoiriens.",
    excerptEn: "FENAPPACI announces a strategic partnership agreement with a European group specializing in the import-export of agricultural raw materials, opening new perspectives for Ivorian producers.",
  },
  {
    id: 4,
    category: 'market',
    date: '2025-02-01',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop&auto=format',
    titleFr: 'Analyse : Le Prix du Cacao atteint des Niveaux Historiques en 2025',
    titleEn: 'Analysis: Cocoa Prices Reach Historic Levels in 2025',
    excerptFr: "Le prix du cacao a atteint des niveaux sans précédent sur les marchés internationaux. FENAPPACI analyse les opportunités pour les producteurs ivoiriens et les acheteurs internationaux dans ce contexte favorable.",
    excerptEn: "Cocoa prices have reached unprecedented levels on international markets. FENAPPACI analyzes opportunities for Ivorian producers and international buyers in this favorable context.",
  },
  {
    id: 5,
    category: 'company',
    date: '2025-01-20',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=500&fit=crop&auto=format',
    titleFr: 'FENAPPACI forme 300 agriculteurs aux techniques d\'agriculture durable',
    titleEn: 'FENAPPACI Trains 300 Farmers in Sustainable Farming Techniques',
    excerptFr: "Dans le cadre de son programme de développement agricole, FENAPPACI a organisé une série de formations pour 300 agriculteurs sur les meilleures pratiques d'agriculture durable et d'amélioration des rendements.",
    excerptEn: "As part of its agricultural development program, FENAPPACI organized a series of training sessions for 300 farmers on best practices in sustainable agriculture and yield improvement.",
  },
  {
    id: 6,
    category: 'campaign',
    date: '2025-01-10',
    image: 'https://loremflickr.com/800/500/palm,oil,plantation?lock=101',
    titleFr: 'Campagne Huile de Palme : FENAPPACI soutient les petits producteurs',
    titleEn: 'Palm Oil Campaign: FENAPPACI Supports Small-Scale Producers',
    excerptFr: "FENAPPACI lance une campagne de soutien aux petits producteurs d'huile de palme en Côte d'Ivoire, avec un programme d'accompagnement technique et de mise en marché à l'international.",
    excerptEn: "FENAPPACI launches a support campaign for small-scale palm oil producers in Ivory Coast, with a technical assistance program and international market access.",
  },
];

const CATEGORIES: { id: ArticleCategory | 'all'; labelFr: string; labelEn: string; icon: typeof Megaphone }[] = [
  { id: 'all', labelFr: 'Tout', labelEn: 'All', icon: Globe },
  { id: 'campaign', labelFr: 'Campagnes', labelEn: 'Campaigns', icon: Megaphone },
  { id: 'export', labelFr: 'Export', labelEn: 'Export', icon: Globe },
  { id: 'partnership', labelFr: 'Partenariat', labelEn: 'Partnership', icon: Handshake },
  { id: 'company', labelFr: 'Entreprise', labelEn: 'Company', icon: Leaf },
  { id: 'market', labelFr: 'Marché', labelEn: 'Market', icon: TrendingUp },
];

const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  campaign: 'bg-orange-100 text-orange-700',
  export: 'bg-blue-100 text-blue-700',
  partnership: 'bg-purple-100 text-purple-700',
  company: 'bg-green-100 text-green-700',
  market: 'bg-yellow-100 text-yellow-800',
};

export default function News() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all');

  const filtered = ARTICLES.filter(a => activeCategory === 'all' || a.category === activeCategory);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCategoryLabel = (cat: ArticleCategory) => {
    const c = CATEGORIES.find(c => c.id === cat);
    return lang === 'fr' ? c?.labelFr : c?.labelEn;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleFr="Actualités Agricoles Côte d'Ivoire – FENAPPACI News"
        titleEn="Agricultural News Ivory Coast – FENAPPACI News"
        descFr="Dernières actualités de FENAPPACI et du secteur agricole ivoirien. Campagnes, marchés, partenariats et exportations de cacao, cajou et café."
        descEn="Latest news from FENAPPACI and the Ivorian agricultural sector. Campaigns, markets, partnerships and exports of cocoa, cashew and coffee."
        canonical="/news"
        keywordsFr="actualités agricoles Côte d'Ivoire, news FENAPPACI, marché cacao, campagne cajou Afrique"
        keywordsEn="agricultural news Ivory Coast, FENAPPACI news, cocoa market, cashew campaign Africa"
      />
      <PageHero
        title={t('news.title')}
        subtitle={t('news.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop&auto=format"
      />

      {/* Announcement ticker */}
      <div className="bg-orange-500 text-white py-3 overflow-hidden">
        <div className="flex items-center gap-0 animate-marquee whitespace-nowrap">
          {[
            lang === 'fr' ? '📢 Campagne Cacao 2025 en cours — Qualité Premium disponible' : '📢 2025 Cocoa Campaign underway — Premium Quality available',
            lang === 'fr' ? '🌰 Stock noix de cajou disponible — Contactez-nous' : '🌰 Cashew stock available — Contact us',
            lang === 'fr' ? '🤝 Nouvelles opportunités de partenariat — Rejoignez notre réseau' : '🤝 New partnership opportunities — Join our network',
            lang === 'fr' ? '📈 Prix du cacao au plus haut — Opportunité d\'exportation historique' : '📈 Cocoa prices at all-time high — Historic export opportunity',
          ].concat(
            lang === 'fr' ? ['📢 Campagne Cacao 2025 en cours — Qualité Premium disponible', '🌰 Stock noix de cajou disponible — Contactez-nous'] : ['📢 2025 Cocoa Campaign underway — Premium Quality available', '🌰 Cashew stock available — Contact us']
          ).map((msg, i) => (
            <span key={i} className="inline-flex items-center mx-8 font-semibold text-sm">
              {msg}
              <span className="mx-8 text-orange-200">●</span>
            </span>
          ))}
        </div>
      </div>

      <section className="py-16 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-700'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {lang === 'fr' ? cat.labelFr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Featured article (first one) */}
          {filtered.length > 0 && (
            <div className="mb-10 bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img
                    src={filtered[0].image}
                    alt={lang === 'fr' ? filtered[0].titleFr : filtered[0].titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[filtered[0].category]}`}>
                      {getCategoryLabel(filtered[0].category)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(filtered[0].date)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 leading-tight">
                    {lang === 'fr' ? filtered[0].titleFr : filtered[0].titleEn}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    {lang === 'fr' ? filtered[0].excerptFr : filtered[0].excerptEn}
                  </p>
                  <Link href="/contact">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-7 self-start">
                      {t('news.read_more')} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Article grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.slice(1).map(article => (
              <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="h-52 overflow-hidden">
                  <img
                    src={article.image}
                    alt={lang === 'fr' ? article.titleFr : article.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[article.category]}`}>
                      {getCategoryLabel(article.category)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(article.date)}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3 leading-snug flex-grow line-clamp-2">
                    {lang === 'fr' ? article.titleFr : article.titleEn}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                    {lang === 'fr' ? article.excerptFr : article.excerptEn}
                  </p>
                  <Link href="/contact">
                    <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 h-auto text-sm font-semibold">
                      {t('news.read_more')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">{lang === 'fr' ? 'Aucun article dans cette catégorie.' : 'No articles in this category.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-3">{t('news.cta.title')}</h2>
          <p className="text-green-200 mb-8 text-lg">{t('news.cta.desc')}</p>
          <Link href="/contact">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-10 h-14 font-semibold shadow-xl shadow-orange-900/30">
              {t('news.cta.btn')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
