import { lazy, Suspense } from 'react';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, Globe, TrendingUp, Users, Star, ChevronRight, Sprout, ShieldCheck, Handshake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
const Logo3D = lazy(() => import('@/components/Logo3D'));

const TESTIMONIALS = [
  {
    name: 'Jean-Pierre Moreau',
    company: 'Groupe Moreau Import, France',
    avatar: '🇫🇷',
    textFr: "FENAPPACI est un partenaire fiable. La qualité du cacao que nous recevons de Côte d'Ivoire est exceptionnelle. Je recommande vivement.",
    textEn: "FENAPPACI is a reliable partner. The quality of cocoa we receive from Ivory Coast is exceptional. I highly recommend them.",
  },
  {
    name: 'Ahmed Al-Rashid',
    company: 'Gulf Agricultural Traders, UAE',
    avatar: '🇦🇪',
    textFr: "Nous importons des noix de cajou depuis 3 ans avec FENAPPACI. Ponctualité, qualité et professionnalisme — une équipe de haut niveau.",
    textEn: "We have been importing cashew nuts for 3 years with FENAPPACI. Punctuality, quality and professionalism — a top-level team.",
  },
  {
    name: 'Brigitte Kowalski',
    company: 'EuroAgri GmbH, Germany',
    avatar: '🇩🇪',
    textFr: "Partenariat solide depuis 5 ans. FENAPPACI connecte parfaitement les producteurs locaux aux marchés européens avec une traçabilité exemplaire.",
    textEn: "Solid partnership for 5 years. FENAPPACI perfectly connects local producers to European markets with exemplary traceability.",
  },
];

const ANNOUNCEMENTS_FR = [
  '🌍 FENAPPACI ouvre ses marchés à de nouveaux partenaires internationaux pour la campagne 2025',
  '🍫 Nouvelle récolte de cacao disponible — Qualité Premium A1 — Contactez-nous pour les tarifs',
  '🌰 Stock exceptionnel de noix de cajou brutes — Disponible immédiatement à l\'export',
  '📢 FENAPPACI participe au Salon International de l\'Agriculture à Paris — Rencontrez nos équipes',
  '🤝 Opportunités d\'investissement agricole en Côte d\'Ivoire — Rejoignez notre réseau',
];
const ANNOUNCEMENTS_EN = [
  '🌍 FENAPPACI opens its markets to new international partners for the 2025 season',
  '🍫 New cocoa harvest available — Premium Quality A1 — Contact us for pricing',
  '🌰 Exceptional stock of raw cashew nuts — Available immediately for export',
  '📢 FENAPPACI participates in the International Agriculture Fair in Paris — Meet our teams',
  '🤝 Agricultural investment opportunities in Ivory Coast — Join our network',
];

export default function Home() {
  const { lang, t } = useLanguage();
  const announcements = lang === 'fr' ? ANNOUNCEMENTS_FR : ANNOUNCEMENTS_EN;

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleFr="Exportateur Agricole Côte d'Ivoire – Cacao, Cajou, Café"
        titleEn="Agricultural Export Company Ivory Coast – Cocoa, Cashew, Coffee"
        descFr="FENAPPACI exporte le cacao, les noix de cajou, le café et les fruits tropicaux de Côte d'Ivoire vers les marchés internationaux. Acheteurs, investisseurs – rejoignez notre réseau."
        descEn="FENAPPACI exports cocoa, cashew nuts, coffee and tropical fruits from Ivory Coast to international markets. Buyers, investors – join our network."
        canonical="/"
        keywordsFr="exportateur agricole Côte d'Ivoire, cacao Côte d'Ivoire, noix de cajou Afrique, café ivoirien, FENAPPACI, produits agricoles Côte d'Ivoire, export Abidjan"
        keywordsEn="agricultural export Ivory Coast, cocoa exporters Africa, cashew nuts suppliers Ivory Coast, FENAPPACI, agricultural products Ivory Coast, export Abidjan"
      />

      {/* Scrolling Announcement Bar */}
      <div className="bg-green-700 text-white text-sm py-2 overflow-hidden sticky top-0 z-40">
        <div className="flex items-center gap-0 animate-marquee whitespace-nowrap">
          {[...announcements, ...announcements].map((msg, i) => (
            <span key={i} className="inline-flex items-center mx-8 font-medium">
              {msg}
              <span className="mx-8 text-green-300">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section — Orange gradient */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop&auto=format"
            alt="Agricultural Fields Ivory Coast"
            className="w-full h-full object-cover object-center"
          />
          {/* Orange-tinted gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/85 via-orange-700/70 to-green-900/60" />
        </div>

        {/* Agricultural floating particles */}
        {[
          { emoji: '🌿', left: '5%',  delay: '0s',  duration: '12s', size: '1.8rem' },
          { emoji: '🌾', left: '15%', delay: '2s',  duration: '14s', size: '1.4rem' },
          { emoji: '☕', left: '25%', delay: '5s',  duration: '11s', size: '1.6rem' },
          { emoji: '🍃', left: '38%', delay: '1s',  duration: '13s', size: '1.2rem' },
          { emoji: '🌰', left: '50%', delay: '7s',  duration: '15s', size: '1.5rem' },
          { emoji: '🌴', left: '62%', delay: '3s',  duration: '12s', size: '1.7rem' },
          { emoji: '🍫', left: '75%', delay: '9s',  duration: '14s', size: '1.4rem' },
          { emoji: '🌿', left: '85%', delay: '4s',  duration: '11s', size: '1.3rem' },
          { emoji: '🌸', left: '92%', delay: '6s',  duration: '13s', size: '1.6rem' },
          { emoji: '🍌', left: '45%', delay: '11s', duration: '16s', size: '1.4rem' },
        ].map((p, i) => (
          <span
            key={i}
            className="agri-particle select-none"
            style={{
              left: p.left,
              bottom: '-5%',
              animationDelay: p.delay,
              animationDuration: p.duration,
              fontSize: p.size,
            }}
          >
            {p.emoji}
          </span>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10">

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/30 backdrop-blur-md border border-orange-300/40 text-orange-100 text-sm font-semibold mb-6 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                Côte d'Ivoire — Afrique de l'Ouest
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-4 drop-shadow-lg">
                FENAPPACI
              </h1>

              <p className="text-2xl md:text-3xl text-orange-100 font-semibold mb-4 leading-snug">
                {t('home.hero.company_type')}
              </p>

              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl font-light leading-relaxed">
                {t('home.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <Link href="/agricultural-products">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-base h-14 px-8 rounded-full shadow-xl shadow-orange-900/40 font-semibold">
                    {t('home.btn.products')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/request-purchase">
                  <Button size="lg" className="bg-white hover:bg-orange-50 text-orange-700 text-base h-14 px-8 rounded-full shadow-xl font-semibold border-0">
                    {t('home.btn.request')}
                  </Button>
                </Link>
                <Link href="/partnerships">
                  <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white/40 text-base h-14 px-8 rounded-full backdrop-blur-md font-semibold">
                    {t('home.btn.partner')}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: 3D logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex flex-col items-center gap-4 flex-shrink-0"
            >
              {/* Glow backdrop */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-orange-500/25 blur-3xl scale-150" />
                <Suspense fallback={
                  <div className="w-72 h-72 rounded-full bg-white/10 animate-pulse flex items-center justify-center">
                    <img src="/images/fenappaci-logo-transparent.png" alt="FENAPPACI" className="w-52 h-52 object-contain opacity-40 logo-spin-slow" />
                  </div>
                }>
                  <Logo3D size={290} />
                </Suspense>
              </div>
              <div className="text-center">
                <p className="text-orange-200 text-xs font-semibold uppercase tracking-widest opacity-70">
                  Production · Export · Qualité
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Stats Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {[
            { label: t('home.stats.producers'), value: '500+', icon: Users, color: 'text-orange-500' },
            { label: t('home.stats.countries'), value: '30+', icon: Globe, color: 'text-green-600' },
            { label: t('home.stats.experience'), value: '15+', icon: TrendingUp, color: 'text-orange-500' },
            { label: t('home.stats.products'), value: '35+', icon: CheckCircle2, color: 'text-green-600' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why FENAPPACI */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider">
              {t('home.why.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                color: 'bg-orange-500',
                title: t('home.features.quality.title'),
                desc: t('home.features.quality.desc'),
                img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop&auto=format"
              },
              {
                icon: Globe,
                color: 'bg-green-600',
                title: t('home.features.network.title'),
                desc: t('home.features.network.desc'),
                img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=500&h=300&fit=crop&auto=format"
              },
              {
                icon: Sprout,
                color: 'bg-orange-500',
                title: t('home.features.sustainable.title'),
                desc: t('home.features.sustainable.desc'),
                img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop&auto=format"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className={`absolute bottom-4 left-4 w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-3 uppercase tracking-wider">
                {t('home.products.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">{t('home.products.title')}</h2>
            </div>
            <Link href="/agricultural-products">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 rounded-full px-6 flex-shrink-0">
                {t('home.products.all')} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: '🍫', name: lang === 'fr' ? 'Cacao' : 'Cocoa', href: '/products?cat=export' },
              { icon: '☕', name: lang === 'fr' ? 'Café' : 'Coffee', href: '/products?cat=export' },
              { icon: '🌰', name: lang === 'fr' ? 'Noix de Cajou' : 'Cashew', href: '/products?cat=export' },
              { icon: '🌴', name: lang === 'fr' ? 'Huile de Palme' : 'Palm Oil', href: '/products?cat=export' },
              { icon: '🍌', name: lang === 'fr' ? 'Banane Plantain' : 'Plantain', href: '/products?cat=fruits' },
              { icon: '🥭', name: lang === 'fr' ? 'Mangue' : 'Mango', href: '/products?cat=fruits' },
              { icon: '🍉', name: lang === 'fr' ? 'Pastèque' : 'Watermelon', href: '/products?cat=fruits' },
              { icon: '🌾', name: lang === 'fr' ? 'Riz' : 'Rice', href: '/products?cat=food' },
              { icon: '🌽', name: lang === 'fr' ? 'Maïs' : 'Corn', href: '/products?cat=food' },
              { icon: '🍠', name: lang === 'fr' ? 'Igname' : 'Yam', href: '/products?cat=food' },
              { icon: '🌶️', name: lang === 'fr' ? 'Piment' : 'Chili', href: '/products?cat=vegetables' },
              { icon: '🫚', name: lang === 'fr' ? 'Gingembre' : 'Ginger', href: '/products?cat=vegetables' },
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <div className="flex flex-col items-center p-4 bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-2xl transition-all duration-200 cursor-pointer group text-center">
                  <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-200">{item.icon}</span>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-700 leading-tight">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider">
              {t('home.testimonials.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">{t('home.testimonials.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed flex-grow italic text-sm mb-6">
                  "{lang === 'fr' ? t_.textFr : t_.textEn}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <span className="text-3xl">{t_.avatar}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t_.name}</p>
                    <p className="text-xs text-gray-500">{t_.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Activities Strip */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">{t('home.activities.label')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Sprout, label: lang === 'fr' ? 'Production Agricole' : 'Agricultural Production', color: 'text-green-600 bg-green-50' },
              { icon: Globe, label: lang === 'fr' ? 'Export International' : 'International Export', color: 'text-orange-600 bg-orange-50' },
              { icon: Handshake, label: lang === 'fr' ? 'Partenariat & Investissement' : 'Partnership & Investment', color: 'text-green-600 bg-green-50' },
              { icon: TrendingUp, label: lang === 'fr' ? 'Commercialisation' : 'Commercialization', color: 'text-orange-600 bg-orange-50' },
            ].map((act, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${act.color}`}>
                  <act.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{act.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-green-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-green-100/90 mb-10 max-w-2xl mx-auto">{t('home.cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request-purchase">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-10 h-14 text-base rounded-full shadow-2xl shadow-orange-900/30 font-semibold">
                {t('home.cta.btn')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-10 h-14 text-base rounded-full font-semibold">
                {t('home.cta.contact')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
