import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, Target, Eye } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={t('nav.about')}
        subtitle={t('about.hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1599839619722-39751411ea63?w=1920&h=1080&fit=crop"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">{t('about.who.title')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t('about.who.p1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t('about.who.p2')}
              </p>
              <div className="flex gap-4">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <h4 className="font-bold text-primary text-2xl mb-1">15+</h4>
                  <span className="text-sm text-muted-foreground font-medium">{t('about.years')}</span>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                  <h4 className="font-bold text-secondary text-2xl mb-1">10k+</h4>
                  <span className="text-sm text-muted-foreground font-medium">{t('about.farmers')}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop"
                alt="Farmers"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-foreground">{t('about.certified')}</h5>
                    <p className="text-sm text-muted-foreground">{t('about.quality')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-border/50 card-hover-effect">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">{t('about.vision.title')}</h3>
              <p className="text-lg text-muted-foreground">
                {t('about.vision.desc')}
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-border/50 card-hover-effect">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">{t('about.mission.title')}</h3>
              <ul className="space-y-4 text-lg text-muted-foreground">
                {[
                  t('about.mission.1'),
                  t('about.mission.2'),
                  t('about.mission.3'),
                  t('about.mission.4'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
