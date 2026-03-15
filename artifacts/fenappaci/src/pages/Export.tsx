import { PageHero } from "@/components/layout/PageHero";
import { Ship, FileText, CheckSquare, PackageCheck, Anchor, Globe, TrendingUp, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import WorldMapBuyers from "@/components/WorldMapBuyers";
import TransportScene from "@/components/TransportScene";
import ProductExportRoutes from "@/components/ProductExportRoutes";
import SEO from "@/components/SEO";

export default function Export() {
  const { lang, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleFr="Export Agricole Côte d'Ivoire – Solutions d'Exportation FENAPPACI"
        titleEn="Agricultural Export Ivory Coast – FENAPPACI Export Solutions"
        descFr="FENAPPACI organise l'export de produits agricoles de Côte d'Ivoire vers 30+ pays. Transport maritime, aérien et terrestre. Conformité phytosanitaire et douanière internationale."
        descEn="FENAPPACI organizes agricultural product exports from Ivory Coast to 30+ countries. Sea, air and land transport. International phytosanitary and customs compliance."
        canonical="/export-ivory-coast"
        keywordsFr="export agricole Côte d'Ivoire, exportation cacao, transport maritime Abidjan, logistique export Afrique, normes phytosanitaires export"
        keywordsEn="agricultural export Ivory Coast, cocoa export logistics, maritime transport Abidjan, Africa export logistics, phytosanitary standards export"
      />
      <PageHero
        title={t('export.hero.title')}
        subtitle={t('export.hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?w=1920&h=1080&fit=crop&auto=format"
      />

      {/* ── Export Stats Banner ── */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
            {[
              { icon: Globe, value: '30+', label: lang === 'fr' ? 'Pays acheteurs' : 'Buyer countries' },
              { icon: Package, value: '80k+', label: lang === 'fr' ? 'Tonnes exportées/an' : 'Tonnes exported/year' },
              { icon: Ship, value: '200+', label: lang === 'fr' ? 'Conteneurs/an' : 'Containers/year' },
              { icon: TrendingUp, value: '35+', label: lang === 'fr' ? 'Produits à l\'export' : 'Export products' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <s.icon className="w-6 h-6 mb-1 opacity-80" />
                <div className="text-2xl font-display font-bold">{s.value}</div>
                <div className="text-sm text-white/80">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Export — Steps ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider">
              {lang === 'fr' ? 'Notre processus' : 'Our process'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">{t('export.how.title')}</h2>
            <p className="text-lg text-gray-500">
              {t('export.how.desc')}
            </p>
          </div>

          {/* Animated shipping pipeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-200 via-green-300 to-orange-200" />
            {/* Animated traveling dot */}
            <div className="hidden md:block absolute top-[43px] left-[12.5%]" style={{
              width: '75%',
              height: '4px',
              overflow: 'visible',
            }}>
              <motion.div
                className="w-4 h-4 rounded-full bg-orange-500 shadow-lg shadow-orange-400/60 -mt-1.5"
                animate={{ x: ['0%', '85%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                style={{ boxShadow: '0 0 12px 4px rgba(249,115,22,0.5)' }}
              />
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: FileText, title: t('export.step1.title'), desc: t('export.step1.desc'), color: 'bg-orange-500' },
                { icon: CheckSquare, title: t('export.step2.title'), desc: t('export.step2.desc'), color: 'bg-green-600' },
                { icon: PackageCheck, title: t('export.step3.title'), desc: t('export.step3.desc'), color: 'bg-orange-500' },
                { icon: Ship, title: t('export.step4.title'), desc: t('export.step4.desc'), color: 'bg-green-600' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 relative mt-8 md:mt-0 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 ${step.color} text-white rounded-full flex items-center justify-center absolute -top-8 left-8 shadow-lg border-4 border-white`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="absolute -top-4 right-6 text-3xl font-display font-bold text-gray-100 select-none">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Animated Ship Scene ── */}
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-green-950 overflow-hidden relative">
        {/* Ocean waves */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 overflow-hidden">
          <svg viewBox="0 0 1440 96" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,48 C180,96 360,0 540,48 C720,96 900,0 1080,48 C1260,96 1440,0 1440,48 L1440,96 L0,96 Z"
              fill="#22c55e"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left: Port of Abidjan info */}
            <div className="text-white max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <Anchor className="w-8 h-8 text-orange-400" />
                <span className="text-orange-400 font-bold uppercase tracking-widest text-sm">
                  {lang === 'fr' ? 'Port Autonome d\'Abidjan' : 'Port of Abidjan'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {lang === 'fr' ? 'Expédition FOB & CIF depuis Abidjan' : 'FOB & CIF Shipping from Abidjan'}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                {lang === 'fr'
                  ? 'FENAPPACI assure toute la logistique d\'export depuis le Port Autonome d\'Abidjan, l\'un des ports les plus modernes d\'Afrique de l\'Ouest. Conteneurs réfrigérés, en vrac ou en sac selon vos besoins.'
                  : 'FENAPPACI manages all export logistics from the Port of Abidjan, one of the most modern ports in West Africa. Refrigerated containers, bulk or bagged according to your needs.'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: lang === 'fr' ? 'Délai moyen' : 'Average lead time', value: '14–21 jours' },
                  { label: lang === 'fr' ? 'Incoterms' : 'Incoterms', value: 'FOB · CIF · CFR' },
                  { label: lang === 'fr' ? 'Conditionnement' : 'Packaging', value: 'Sac · Vrac · FCL' },
                  { label: lang === 'fr' ? 'Paiement' : 'Payment', value: 'LC · TT · DP' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <p className="text-slate-400 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white font-bold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Animated ship illustration */}
            <div className="relative flex items-center justify-center w-72 h-48 flex-shrink-0">
              {/* Ocean background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-900/40 to-blue-950/60 border border-blue-800/30 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-950/80 to-transparent" />
              </div>
              {/* Animated ship */}
              <motion.div
                className="relative z-10 text-6xl"
                animate={{
                  y: [0, -8, 0, -5, 0],
                  rotate: [-2, 2, -1, 2, -2],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                🚢
              </motion.div>
              {/* Wake effect */}
              <motion.div
                className="absolute bottom-8 left-0 right-0 flex justify-center gap-1"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-0.5 bg-blue-400/50 rounded-full"
                    style={{ width: `${20 + i * 10}px`, marginLeft: i * 2 }} />
                ))}
              </motion.div>
              {/* Destination label */}
              <div className="absolute top-3 right-3 bg-orange-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                🌍 Export
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Required Documentation ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">{t('export.docs.title')}</h2>
            <p className="text-gray-500">
              {lang === 'fr' ? 'Tous les documents nécessaires pour une exportation conforme.' : 'All documents required for compliant export.'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                t('export.doc.1'), t('export.doc.2'), t('export.doc.3'), t('export.doc.4'),
                t('export.doc.5'), t('export.doc.6'), t('export.doc.7'), t('export.doc.8'),
              ].map((doc, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className="font-medium text-gray-800 text-sm">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Live Transport Animations ── */}
      <TransportScene />

      {/* ── Interactive World Map of Buyers ── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider border border-orange-500/30">
              🛰 {lang === 'fr' ? 'Réseau Mondial' : 'Global Network'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{t('export.map.title')}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {lang === 'fr'
                ? 'Survolez un pays pour découvrir les produits exportés et les volumes. FENAPPACI exporte vers plus de 30 pays à travers le monde.'
                : 'Hover over a country to discover the exported products and volumes. FENAPPACI exports to more than 30 countries worldwide.'}
            </p>
          </div>
          <WorldMapBuyers />
        </div>
      </section>

      {/* ── Product Export Routes ── */}
      <ProductExportRoutes />

      {/* ── Export CTA ── */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Ship className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-display font-bold mb-3">
            {lang === 'fr' ? 'Prêt à Importer depuis la Côte d\'Ivoire ?' : 'Ready to Import from Ivory Coast?'}
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            {lang === 'fr'
              ? 'Contactez notre équipe export pour obtenir un devis FOB/CIF personnalisé.'
              : 'Contact our export team for a personalized FOB/CIF quote.'}
          </p>
          <Link href="/request-purchase">
            <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-50 rounded-full px-10 h-14 font-bold shadow-xl">
              {lang === 'fr' ? 'Demander un Devis Export' : 'Request Export Quote'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
