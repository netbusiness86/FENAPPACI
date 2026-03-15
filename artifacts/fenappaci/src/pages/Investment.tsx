import { PageHero } from "@/components/layout/PageHero";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BarChart3, Factory, ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

export default function Investment() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleFr="Investir en Agriculture – Côte d'Ivoire | FENAPPACI"
        titleEn="Invest in Agriculture – Ivory Coast | FENAPPACI"
        descFr="Investissez dans l'agriculture ivoirienne avec FENAPPACI. Opportunités d'investissement dans le cacao, les noix de cajou, le café et les cultures d'exportation en Côte d'Ivoire."
        descEn="Invest in Ivorian agriculture with FENAPPACI. Investment opportunities in cocoa, cashew nuts, coffee and export crops in Ivory Coast."
        canonical="/invest-ivory-coast"
        keywordsFr="investissement agricole Côte d'Ivoire, investir cacao Afrique, opportunités agricoles Abidjan, financement agriculture ivoirienne"
        keywordsEn="agricultural investment Ivory Coast, invest cocoa Africa, agricultural opportunities Abidjan, Ivorian agriculture financing"
      />
      <PageHero
        title={t('investment.hero.title')}
        subtitle={t('investment.hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=1920&h=1080&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              {t('investment.why.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('investment.why.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('investment.card.growth.title'), desc: t('investment.card.growth.desc'), icon: BarChart3 },
              { title: t('investment.card.gov.title'), desc: t('investment.card.gov.desc'), icon: ShieldCheck },
              { title: t('investment.card.agro.title'), desc: t('investment.card.agro.desc'), icon: Factory },
              { title: t('investment.card.infra.title'), desc: t('investment.card.infra.desc'), icon: Zap },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{t('investment.sectors.title')}</h2>
              <div className="space-y-8 mt-10">
                {[
                  { title: t('investment.sector.cacao.title'), desc: t('investment.sector.cacao.desc') },
                  { title: t('investment.sector.cashew.title'), desc: t('investment.sector.cashew.desc') },
                  { title: t('investment.sector.tech.title'), desc: t('investment.sector.tech.desc') },
                ].map((sector, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 bg-secondary rounded-full shrink-0"></div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{sector.title}</h4>
                      <p className="text-gray-400">{sector.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop" alt="Processing Facility" className="rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 bg-primary/20 rounded-2xl mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-6">{t('investment.cta.title')}</h2>
          <p className="text-lg text-muted-foreground mb-8">{t('investment.cta.desc')}</p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-full">
              {t('investment.cta.btn')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
