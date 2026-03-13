import { Link } from 'wouter';
import { Facebook, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/images/fenappaci-logo.png"
                alt="FENAPPACI Logo"
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com/Fenappaci" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">{t('footer.quick_links')}</h4>
            <ul className="space-y-3">
              {[
                { path: '/about', label: t('nav.about') },
                { path: '/products', label: t('nav.products') },
                { path: '/investment', label: t('nav.investment') },
                { path: '/export', label: t('nav.export') },
              ].map(link => (
                <li key={link.path}>
                  <Link href={link.path} className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2 text-sm group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-lg mb-6">{t('footer.contact')}</h4>
            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Abidjan Cocody Angré Château<br />Immeuble BATIM – 2nd Floor – Door 216<br />Côte d'Ivoire</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span>+225 07 49 01 27 25</span>
                  <span>+225 05 45 07 97 15</span>
                  <span>+225 05 07 32 98 84</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@fenappaci.com" className="hover:text-white transition-colors">
                  info@fenappaci.com
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center md:flex md:justify-between md:items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} FENAPPACI. {t('footer.rights')}</p>
          <div className="mt-4 md:mt-0 flex gap-4 justify-center">
            <Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
