import { PageHero } from "@/components/layout/PageHero";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Handshake, Globe2, Briefcase, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Partnership() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={t('partnership.hero.title')}
        subtitle={t('partnership.hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">{t('partnership.types.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('partnership.types.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe2,
                title: t('partnership.trade.title'),
                desc: t('partnership.trade.desc'),
                color: "bg-blue-50 text-blue-600 border-blue-100"
              },
              {
                icon: Briefcase,
                title: t('partnership.invest.title'),
                desc: t('partnership.invest.desc'),
                color: "bg-green-50 text-green-600 border-green-100"
              },
              {
                icon: Handshake,
                title: t('partnership.strategic.title'),
                desc: t('partnership.strategic.desc'),
                color: "bg-orange-50 text-orange-600 border-orange-100"
              }
            ].map((type, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${type.color} card-hover-effect`}>
                <type.icon className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">{type.title}</h3>
                <p className="text-foreground/70 mb-8">{type.desc}</p>
                <Link href="/contact" className="inline-flex items-center font-semibold hover:underline">
                  {t('partnership.discuss')} <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://pixabay.com/get/g3377e8f4728da7b6d5c1b1a04502b6b574422d19b7eccaf6bb3118bdf1c7344f9f67c423d0091ddfa06500b8333433b5815956e6fdb8cbf8f2fda854f4c7ab0c_1280.jpg')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">{t('partnership.process.title')}</h2>

          <div className="space-y-6 text-left max-w-2xl mx-auto">
            {[
              t('partnership.process.1'),
              t('partnership.process.2'),
              t('partnership.process.3'),
              t('partnership.process.4'),
              t('partnership.process.5'),
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <p className="text-lg">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/request">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 h-14 px-8 rounded-full text-lg shadow-xl">
                {t('partnership.cta.btn')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
