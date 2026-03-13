import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, Target, Eye, Globe } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* hero about agriculture plantation */}
      <PageHero 
        title={t('nav.about')}
        subtitle="Driving agricultural modernization and facilitating global trade from Côte d'Ivoire to the world."
        backgroundImage="https://images.unsplash.com/photo-1599839619722-39751411ea63?w=1920&h=1080&fit=crop"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Who We Are</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                FENAPPACI (Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d'Ivoire) is the premier organization representing and organizing agricultural producers in Ivory Coast.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We serve as the vital bridge between local farming communities and international markets, ensuring fair trade, premium quality, and sustainable growth for the agricultural sector.
              </p>
              <div className="flex gap-4">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <h4 className="font-bold text-primary text-2xl mb-1">15+</h4>
                  <span className="text-sm text-muted-foreground font-medium">Years Active</span>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                  <h4 className="font-bold text-secondary text-2xl mb-1">10k+</h4>
                  <span className="text-sm text-muted-foreground font-medium">Farmers Supported</span>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* diverse farmers */}
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
                    <h5 className="font-bold text-foreground">Certified</h5>
                    <p className="text-sm text-muted-foreground">Quality Export</p>
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
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-lg text-muted-foreground">
                To modernize agriculture in Ivory Coast, transforming it into a highly efficient, sustainable, and globally competitive sector that brings prosperity to local communities.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-border/50 card-hover-effect">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">Our Mission</h3>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  Organize and empower agricultural producers
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  Promote international and domestic investment
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  Facilitate seamless global exports
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  Develop strong international trade partnerships
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
