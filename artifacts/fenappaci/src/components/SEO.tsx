import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

const BASE_URL = 'https://fenappaci.com';
const DEFAULT_OG = '/images/fenappaci-logo-email.png';

interface SEOProps {
  titleFr?: string;
  titleEn?: string;
  descFr?: string;
  descEn?: string;
  canonical?: string;
  keywordsFr?: string;
  keywordsEn?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'product';
  schema?: object | object[];
}

export default function SEO({
  titleFr,
  titleEn,
  descFr,
  descEn,
  canonical,
  keywordsFr,
  keywordsEn,
  ogImage,
  type = 'website',
  schema,
}: SEOProps) {
  const { lang } = useLanguage();

  const rawTitle = lang === 'fr'
    ? (titleFr || 'Exportateur Agricole en Côte d\'Ivoire')
    : (titleEn || 'Agricultural Export Company in Ivory Coast');

  const fullTitle = `${rawTitle} | FENAPPACI`;

  const defaultDescFr = 'FENAPPACI exporte le cacao, les noix de cajou, le café, les fruits tropicaux et produits agricoles de Côte d\'Ivoire vers les marchés internationaux. Producteurs & Promoteurs basés à Abidjan.';
  const defaultDescEn = 'FENAPPACI exports cocoa, cashew nuts, coffee, tropical fruits and agricultural products from Ivory Coast to international markets. Agricultural producers & exporters based in Abidjan.';

  const desc = lang === 'fr' ? (descFr || defaultDescFr) : (descEn || defaultDescEn);
  const keywords = lang === 'fr' ? keywordsFr : keywordsEn;
  const canonicalUrl = `${BASE_URL}${canonical || '/'}`;
  const ogImageUrl = `${BASE_URL}${ogImage || DEFAULT_OG}`;

  const schemas = schema
    ? Array.isArray(schema) ? schema : [schema]
    : [];

  return (
    <Helmet>
      <html lang={lang === 'fr' ? 'fr' : 'en'} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="FENAPPACI" />
      <meta name="geo.region" content="CI" />
      <meta name="geo.placename" content="Abidjan, Côte d'Ivoire" />

      <link rel="alternate" hrefLang="fr" href={`${BASE_URL}${canonical || '/'}`} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}${canonical || '/'}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${canonical || '/'}`} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="FENAPPACI" />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_CI' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:site" content="@fenappaci" />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
