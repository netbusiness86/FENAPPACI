import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, Globe, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://pixabay.com/get/g8fb6356491179b897ac95128fabf3c1068e07ddfb2b9683b21b30070965bf3b0a58082ec0be17b677b741dc3afa252f6527b65544566a2d962b50ed67b17f874_1280.jpg"
            alt="Agriculture Fields"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              FENAPPACI
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              {t('home.hero.title')}
            </h1>

            <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-light">
              {t('home.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/30">
                  {t('home.btn.products')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/partnership">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md text-lg h-14 px-8 rounded-full">
                  {t('home.btn.partner')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {[
            { label: t('home.stats.producers'), value: '500+', icon: Users },
            { label: t('home.stats.countries'), value: '30+', icon: Globe },
            { label: t('home.stats.experience'), value: '15+', icon: TrendingUp },
            { label: t('home.stats.products'), value: '50+', icon: CheckCircle2 },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center card-hover-effect"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">{stat.value}</h3>
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('home.features.quality.title'),
                desc: t('home.features.quality.desc'),
                img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop"
              },
              {
                title: t('home.features.network.title'),
                desc: t('home.features.network.desc'),
                img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=500&h=300&fit=crop"
              },
              {
                title: t('home.features.sustainable.title'),
                desc: t('home.features.sustainable.desc'),
                img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                <div className="h-48 overflow-hidden">
                  <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('https://pixabay.com/get/g57fb3ca7daef5d47e730c9cff3eb62dd12301941767ca7dca0691e7f6020cf0283c9dcb407b4b35f56dbd9c6801ca9c4f2a6bad5d018e0c6db9b501849467f2d_1280.png')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-primary-foreground/90 mb-10">{t('home.cta.subtitle')}</p>
          <Link href="/request">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-10 h-16 text-lg rounded-full shadow-2xl shadow-secondary/30">
              {t('home.cta.btn')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
