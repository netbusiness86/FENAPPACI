import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/products', label: t('nav.products') },
    { href: '/export', label: t('nav.export') },
    { href: '/investment', label: t('nav.investment') },
    { href: '/partnership', label: t('nav.partnership') },
    { href: '/marche', label: t('nav.market') },
    { href: '/news', label: t('nav.news') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => location === href || (href !== '/' && location.startsWith(href));

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'top-0 glass-nav py-3 shadow-sm' : 'top-8 bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <img
              src="/images/fenappaci-logo-transparent.png"
              alt="FENAPPACI"
              className={`h-12 w-auto drop-shadow transition-all duration-300 group-hover:scale-105 ${isScrolled ? '' : 'brightness-0 invert'}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  isActive(link.href)
                    ? 'text-orange-400 font-semibold'
                    : isScrolled
                    ? 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className={`flex items-center gap-1.5 text-sm font-bold transition-colors px-3 py-2 rounded-lg ${
                isScrolled ? 'text-gray-700 hover:text-orange-600 hover:bg-orange-50' : 'text-white hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4" />
              {lang === 'fr' ? 'FR | EN' : 'EN | FR'}
            </button>
            <Link href="/request">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md px-5 h-9 text-sm font-semibold">
                {t('nav.request_quote')}
              </Button>
            </Link>
          </div>

          {/* Mobile row */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className={`flex items-center gap-1 text-sm font-bold ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? 'text-gray-700' : 'text-white'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive(link.href)
                    ? 'bg-orange-50 text-orange-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/request" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                {t('nav.request_quote')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
