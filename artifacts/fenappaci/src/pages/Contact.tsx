import { lazy, Suspense, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
const Logo3D = lazy(() => import('@/components/Logo3D'));

export default function Contact() {
  const { toast } = useToast();
  const { t, lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t('contact.toast.title'),
        description: t('contact.toast.desc'),
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageHero
        title={t('contact.hero.title')}
        subtitle={t('contact.hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format"
      />

      {/* ── Brand Identity Section with Large Rotating Logo ── */}
      <section className="py-20 bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">

          {/* 3D Logo */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-400/20 blur-3xl scale-150 animate-pulse" />
              <Suspense fallback={
                <div className="w-52 h-52 rounded-full bg-white/10 animate-pulse flex items-center justify-center">
                  <img src="/images/fenappaci-logo-transparent.png" alt="FENAPPACI" className="w-40 h-40 object-contain opacity-50 logo-spin" />
                </div>
              }>
                <Logo3D size={220} interactive={false} />
              </Suspense>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">FENAPPACI</h2>
          <p className="text-green-200 text-lg mb-2">
            {lang === 'fr'
              ? 'Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d\'Ivoire'
              : 'National Federation of Agricultural Producers & Promoters of Ivory Coast'}
          </p>
          <p className="text-orange-300 font-semibold tracking-wide text-sm uppercase">
            {lang === 'fr' ? 'Production · Commercialisation · Exportation' : 'Production · Commercialization · Export'}
          </p>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 text-left hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-orange-300" />
                <span className="font-semibold text-white text-sm">{t('contact.location.label')}</span>
              </div>
              <p className="text-green-200 text-sm leading-relaxed">
                Abidjan Cocody Angré Château<br />
                Immeuble BATIM<br />
                2ème Étage – Porte 216
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 text-left hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-orange-300" />
                <span className="font-semibold text-white text-sm">{t('contact.phone.label')}</span>
              </div>
              <div className="flex flex-col text-green-200 text-sm gap-1">
                <a href="tel:+2250749012725" className="hover:text-white transition-colors">+225 07 49 01 27 25</a>
                <a href="tel:+2250545079715" className="hover:text-white transition-colors">+225 05 45 07 97 15</a>
                <a href="tel:+2250507329884" className="hover:text-white transition-colors">+225 05 07 32 98 84</a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 text-left hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-orange-300" />
                <span className="font-semibold text-white text-sm">{t('contact.email.label')}</span>
              </div>
              <a href="mailto:info@fenappaci.com" className="text-green-200 hover:text-white transition-colors text-sm">
                info@fenappaci.com
              </a>
              <div className="mt-3 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-orange-300" />
                <a href="https://facebook.com/Fenappaci" target="_blank" rel="noreferrer" className="text-green-200 hover:text-white transition-colors text-sm">
                  Fenappaci
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form + Office Info ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">{t('contact.office.title')}</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">{t('contact.location.label')}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Abidjan Cocody Angré Château<br />
                    Immeuble BATIM – 2ème Étage – Porte 216<br />
                    Côte d'Ivoire
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">{t('contact.phone.label')}</h4>
                  <div className="flex flex-col text-muted-foreground gap-1">
                    <a href="tel:+2250749012725" className="hover:text-orange-600 transition-colors">+225 07 49 01 27 25</a>
                    <a href="tel:+2250545079715" className="hover:text-orange-600 transition-colors">+225 05 45 07 97 15</a>
                    <a href="tel:+2250507329884" className="hover:text-orange-600 transition-colors">+225 05 07 32 98 84</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">{t('contact.email.label')}</h4>
                  <a href="mailto:info@fenappaci.com" className="text-muted-foreground hover:text-orange-600 transition-colors">
                    info@fenappaci.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Facebook className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Facebook</h4>
                  <a href="https://facebook.com/Fenappaci" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Fenappaci
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">{t('contact.hours.label')}</h4>
                  <p className="text-muted-foreground">
                    {t('contact.hours.weekdays')}<br />
                    {t('contact.hours.saturday')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-orange-200 flex-shrink-0">
                <img src="/images/fenappaci-logo-transparent.png" alt="FENAPPACI" className="w-full h-full object-cover logo-spin-card" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t('contact.form.title')}</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t('contact.form.firstname')}</label>
                  <Input required className="bg-gray-50 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t('contact.form.lastname')}</label>
                  <Input required className="bg-gray-50 h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('contact.form.email')}</label>
                <Input type="email" required className="bg-gray-50 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('contact.form.subject')}</label>
                <Input required className="bg-gray-50 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('contact.form.message')}</label>
                <Textarea required className="bg-gray-50 min-h-[130px]" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white h-14 rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
              </Button>
            </form>
          </div>

        </div>

        {/* Map */}
        <div className="mt-20 rounded-3xl overflow-hidden shadow-lg h-[400px] border border-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1852922115684!2d-3.993077685244588!3d5.396347396085526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1935c1cdcf4f5%3A0x631eb092c22ec2db!2sAngr%C3%A9%20Ch%C3%A2teau!5e0!3m2!1sfr!2sfr!4v1655000000000!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="FENAPPACI Office Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
