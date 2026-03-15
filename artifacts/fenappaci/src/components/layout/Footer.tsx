import { Link } from 'wouter';
import { Facebook, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { lang, t } = useLanguage();

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about-fenappaci', label: t('nav.about') },
    { path: '/agricultural-products', label: t('nav.products') },
    { path: '/market-prices', label: t('nav.market') },
    { path: '/invest-ivory-coast', label: t('nav.investment') },
    { path: '/export-ivory-coast', label: t('nav.export') },
    { path: '/partnerships', label: t('nav.partnership') },
    { path: '/news', label: t('nav.news') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-green-800 text-white">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand column */}
          <div className="space-y-5 lg:col-span-1">
            <div>
              <div className="inline-block rounded-full overflow-hidden border-2 border-green-600 bg-white shadow-lg shadow-green-900/30"
                style={{ width: 72, height: 72 }}>
                <img
                  src="/images/fenappaci-logo-transparent.png"
                  alt="FENAPPACI Logo"
                  className="w-full h-full object-cover logo-spin-slow"
                />
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com/Fenappaci"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/2250749012725"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">{t('footer.quick_links')}</h4>
            <ul className="space-y-2.5">
              {quickLinks.slice(0, 6).map(link => (
                <li key={link.path}>
                  <Link href={link.path} className="text-green-200 hover:text-orange-300 transition-colors flex items-center gap-1.5 text-sm group">
                    <ChevronRight className="w-3.5 h-3.5 text-orange-400 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">{lang === 'fr' ? 'Nos Services' : 'Our Services'}</h4>
            <ul className="space-y-2.5">
              {quickLinks.slice(6).map(link => (
                <li key={link.path}>
                  <Link href={link.path} className="text-green-200 hover:text-orange-300 transition-colors flex items-center gap-1.5 text-sm group">
                    <ChevronRight className="w-3.5 h-3.5 text-orange-400 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/request-purchase" className="text-green-200 hover:text-orange-300 transition-colors flex items-center gap-1.5 text-sm group">
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {t('nav.request_quote')}
                </Link>
              </li>
              <li>
                <Link href="/market-prices" className="text-green-200 hover:text-orange-300 transition-colors flex items-center gap-1.5 text-sm group">
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {t('nav.market')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">{t('footer.contact')}</h4>
            <div className="space-y-4 text-green-200 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Abidjan Cocody Angré Château<br />
                  Immeuble BATIM<br />
                  2ème Étage – Porte 216<br />
                  Côte d'Ivoire
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+2250749012725" className="hover:text-white transition-colors">+225 07 49 01 27 25</a>
                  <a href="tel:+2250545079715" className="hover:text-white transition-colors">+225 05 45 07 97 15</a>
                  <a href="tel:+2250507329884" className="hover:text-white transition-colors">+225 05 07 32 98 84</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400 shrink-0" />
                <a href="mailto:info@fenappaci.com" className="hover:text-white transition-colors">
                  info@fenappaci.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-green-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FENAPPACI. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-orange-300 transition-colors">Admin</Link>
            <span>|</span>
            <a href="mailto:info@fenappaci.com" className="hover:text-orange-300 transition-colors">info@fenappaci.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
