import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, Target, Eye, Sprout, Globe, Handshake, TrendingUp, Package, Users, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const ACTIVITIES = [
  {
    icon: Sprout,
    color: 'bg-green-100 text-green-700',
    titleFr: 'Production Agricole',
    titleEn: 'Agricultural Production',
    descFr: 'Encadrement et soutien des producteurs agricoles à travers la Côte d\'Ivoire pour garantir des rendements optimaux et des produits de qualité premium.',
    descEn: 'Supporting agricultural producers across Ivory Coast to ensure optimal yields and premium quality products.',
  },
  {
    icon: Package,
    color: 'bg-orange-100 text-orange-700',
    titleFr: 'Commercialisation',
    titleEn: 'Commercialization',
    descFr: 'Mise en marché des produits agricoles ivoiriens sur les marchés locaux, régionaux et internationaux avec une logistique maîtrisée.',
    descEn: 'Marketing Ivorian agricultural products on local, regional and international markets with controlled logistics.',
  },
  {
    icon: Globe,
    color: 'bg-blue-100 text-blue-700',
    titleFr: 'Export International',
    titleEn: 'International Export',
    descFr: 'Organisation et gestion des opérations d\'exportation vers plus de 30 pays, en conformité avec les normes phytosanitaires et douanières internationales.',
    descEn: 'Organization and management of export operations to over 30 countries, in compliance with international phytosanitary and customs standards.',
  },
  {
    icon: Handshake,
    color: 'bg-purple-100 text-purple-700',
    titleFr: 'Partenariats Stratégiques',
    titleEn: 'Strategic Partnerships',
    descFr: 'Développement de partenariats durables avec des acheteurs, investisseurs et organisations agricoles internationaux pour renforcer la filière.',
    descEn: 'Developing sustainable partnerships with international buyers, investors and agricultural organizations to strengthen the sector.',
  },
  {
    icon: TrendingUp,
    color: 'bg-yellow-100 text-yellow-700',
    titleFr: 'Promotion de l\'Investissement',
    titleEn: 'Investment Promotion',
    descFr: 'Accompagnement des investisseurs dans leurs projets agricoles en Côte d\'Ivoire, de la structuration jusqu\'à la mise en oeuvre.',
    descEn: 'Supporting investors in their agricultural projects in Ivory Coast, from structuring to implementation.',
  },
  {
    icon: Leaf,
    color: 'bg-green-100 text-green-700',
    titleFr: 'Agriculture Durable',
    titleEn: 'Sustainable Agriculture',
    descFr: 'Promotion des pratiques agricoles durables et formation des producteurs aux techniques modernes respectueuses de l\'environnement.',
    descEn: 'Promoting sustainable agricultural practices and training producers in modern, environmentally friendly techniques.',
  },
];

export default function About() {
  const { lang, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={t('nav.about')}
        subtitle={t('about.hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&h=1080&fit=crop&auto=format"
      />

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-5 uppercase tracking-wider">
                {lang === 'fr' ? 'Présentation de l\'entreprise' : 'Company Presentation'}
              </span>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">{t('about.who.title')}</h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-5">
                {t('about.who.p1')}
              </p>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                {t('about.who.p2')}
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-orange-600 text-2xl mb-1">15+</h4>
                  <span className="text-sm text-gray-500 font-medium">{t('about.years')}</span>
                </div>
                <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-green-600 text-2xl mb-1">10k+</h4>
                  <span className="text-sm text-gray-500 font-medium">{t('about.farmers')}</span>
                </div>
                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-blue-600 text-2xl mb-1">30+</h4>
                  <span className="text-sm text-gray-500 font-medium">{lang === 'fr' ? 'Pays d\'export' : 'Export countries'}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&h=600&fit=crop&auto=format"
                alt="FENAPPACI Farmers"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{t('about.certified')}</h5>
                    <p className="text-xs text-gray-500">{t('about.quality')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              {lang === 'fr' ? 'Vision & Mission' : 'Vision & Mission'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{t('about.vision.title')}</h3>
              <p className="text-lg text-gray-500 leading-relaxed">
                {lang === 'fr'
                  ? 'Devenir la fédération agricole de référence en Afrique de l\'Ouest, reconnue pour son rôle moteur dans la production, la commercialisation et l\'exportation de produits agricoles de qualité mondiale.'
                  : 'To become the leading agricultural federation in West Africa, recognized for its driving role in the production, commercialization and export of world-class agricultural products.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white p-10 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{t('about.mission.title')}</h3>
              <ul className="space-y-3 text-gray-500">
                {[
                  lang === 'fr' ? 'Promouvoir et développer la production agricole ivoirienne' : 'Promote and develop Ivorian agricultural production',
                  lang === 'fr' ? 'Connecter les agriculteurs locaux aux acheteurs internationaux' : 'Connect local farmers to international buyers',
                  lang === 'fr' ? 'Développer les marchés d\'exportation pour les produits ivoiriens' : 'Develop export markets for Ivorian products',
                  lang === 'fr' ? 'Attirer les investissements agricoles en Côte d\'Ivoire' : 'Attract agricultural investment to Ivory Coast',
                  lang === 'fr' ? 'Renforcer les capacités des producteurs locaux' : 'Strengthen the capacities of local producers',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider">
              {lang === 'fr' ? 'Nos Activités' : 'Our Activities'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              {lang === 'fr' ? 'Ce que Nous Faisons' : 'What We Do'}
            </h2>
            <p className="text-lg text-gray-500">
              {lang === 'fr'
                ? 'FENAPPACI couvre toute la chaîne de valeur agricole, de la production à l\'exportation, pour offrir les meilleures solutions à ses membres et partenaires.'
                : 'FENAPPACI covers the entire agricultural value chain, from production to export, to offer the best solutions to its members and partners.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {ACTIVITIES.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg hover:border-orange-100 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${act.color}`}>
                  <act.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {lang === 'fr' ? act.titleFr : act.titleEn}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {lang === 'fr' ? act.descFr : act.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Trust signals */}
      <section className="py-20 bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: '500+', label: lang === 'fr' ? 'Producteurs membres' : 'Member producers' },
              { icon: Globe, value: '30+', label: lang === 'fr' ? 'Pays d\'export' : 'Export countries' },
              { icon: Package, value: '35+', label: lang === 'fr' ? 'Produits agricoles' : 'Agricultural products' },
              { icon: Award, value: '15+', label: lang === 'fr' ? 'Années d\'expérience' : 'Years of experience' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl mx-auto flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-orange-300" />
                </div>
                <div className="text-4xl font-display font-bold text-white mb-1">{s.value}</div>
                <div className="text-green-200 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
            {lang === 'fr' ? 'Travailler avec FENAPPACI' : 'Work with FENAPPACI'}
          </h2>
          <p className="text-gray-500 mb-7">
            {lang === 'fr'
              ? 'Rejoignez notre réseau international d\'acheteurs, investisseurs et partenaires agricoles.'
              : 'Join our international network of buyers, investors and agricultural partners.'}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 h-12">
                {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Button>
            </Link>
            <Link href="/partnership">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 rounded-full px-8 h-12">
                {lang === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
