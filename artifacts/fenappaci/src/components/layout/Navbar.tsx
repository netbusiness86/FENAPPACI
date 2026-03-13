import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/products', label: t('nav.products') },
    { href: '/investment', label: t('nav.investment') },
    { href: '/partnership', label: t('nav.partnership') },
    { href: '/export', label: t('nav.export') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-primary/30 transition-all">
              <span className="font-display font-bold text-xl">F</span>
            </div>
            <span className={`font-display font-bold text-2xl tracking-tight transition-colors ${isScrolled ? 'text-foreground' : 'text-white drop-shadow-md'}`}>
              FENAPPACI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location === link.href 
                    ? 'text-secondary' 
                    : isScrolled ? 'text-foreground/80' : 'text-white/90 drop-shadow-sm hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
              }`}
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            <Link href="/request">
              <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full shadow-lg shadow-secondary/20 font-semibold px-6">
                {t('nav.request_quote')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className={`flex items-center gap-1 text-sm font-medium ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? 'text-foreground' : 'text-white'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b shadow-xl p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-md text-base font-medium ${
                location === link.href ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/request" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white mt-2">
              {t('nav.request_quote')}
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
