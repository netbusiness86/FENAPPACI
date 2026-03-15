import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── Close mobile menu on route change ── */
  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { href: '/',                    label: t('nav.home'),          icon: '🏠' },
    { href: '/about-fenappaci',     label: t('nav.about'),         icon: '🏢' },
    { href: '/agricultural-products', label: t('nav.products'),    icon: '🌿' },
    { href: '/export-ivory-coast',  label: t('nav.export'),        icon: '🚢' },
    { href: '/invest-ivory-coast',  label: t('nav.investment'),    icon: '📈' },
    { href: '/partnerships',        label: t('nav.partnership'),   icon: '🤝' },
    { href: '/request-purchase',    label: lang === 'fr' ? 'Commander' : 'Order', icon: '🛒' },
    { href: '/market-prices',       label: t('nav.market'),        icon: '📊' },
    { href: '/news',                label: t('nav.news'),          icon: '📰' },
    { href: '/contact',             label: t('nav.contact'),       icon: '✉️' },
  ];

  const isActive = (href: string) =>
    location === href || (href !== '/' && location.startsWith(href));

  /* ── Gliding active indicator ── */
  useEffect(() => {
    const activeLink = navLinks.find(l => isActive(l.href));
    if (!activeLink || !navRef.current) return;
    const el = linkRefs.current[activeLink.href];
    const nav = navRef.current.getBoundingClientRect();
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setActiveIndicator({ left: rect.left - nav.left, width: rect.width, opacity: 1 });
  }, [location, isScrolled]);

  /* ── Style helpers ── */
  const scrolledNav = isScrolled;

  const linkClass = (href: string) => {
    const active = isActive(href);
    const base = 'relative px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-all duration-200 rounded-lg group';
    if (active) {
      return `${base} ${scrolledNav ? 'text-orange-600' : 'text-orange-300'}`;
    }
    return `${base} ${scrolledNav ? 'text-green-800 hover:text-white hover:bg-green-700' : 'text-white/90 hover:text-white hover:bg-white/15'}`;
  };

  return (
    <>
      {/* ════════════════════ MAIN HEADER ════════════════════ */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolledNav
            ? 'top-0 bg-white/97 backdrop-blur-xl shadow-lg shadow-black/8 border-b border-gray-100'
            : 'top-0 bg-transparent'
        }`}
      >
        {/* Top accent line */}
        <div className={`h-0.5 bg-gradient-to-r from-orange-500 via-green-600 to-orange-500 transition-opacity duration-300 ${scrolledNav ? 'opacity-100' : 'opacity-0'}`} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0 mr-2">
              <div
                className={`relative rounded-full transition-all duration-300 flex-shrink-0 overflow-hidden
                  ${scrolledNav
                    ? 'border-2 border-orange-300 bg-white shadow-md shadow-orange-100 group-hover:shadow-orange-200 group-hover:scale-105'
                    : 'border-2 border-white/40 bg-white/15 backdrop-blur-sm group-hover:border-white/70 group-hover:scale-105'
                  }`}
                style={{ width: 44, height: 44 }}
              >
                <img
                  src="/images/fenappaci-logo-transparent.png"
                  alt="FENAPPACI"
                  className="w-full h-full object-cover logo-spin"
                  draggable={false}
                />
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-full bg-orange-400/0 group-hover:bg-orange-400/10 transition-all duration-300" />
              </div>
              <span className={`hidden md:block font-display font-bold text-sm tracking-wide transition-colors duration-300 ${scrolledNav ? 'text-green-800' : 'text-white'}`}>
                FENAPPACI
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav
              ref={navRef}
              className="hidden xl:flex items-center gap-0.5 flex-1 relative"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => { linkRefs.current[link.href] = el; }}
                  className={linkClass(link.href)}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2.5 right-2.5 h-0.5 rounded-full bg-orange-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* ── Actions: lang + CTA ── */}
            <div className="hidden xl:flex items-center gap-2 flex-shrink-0 ml-auto">
              {/* FR | EN toggle */}
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border transition-all duration-200 ${
                  scrolledNav
                    ? 'border-green-200 text-green-800 hover:bg-green-700 hover:text-white hover:border-green-700'
                    : 'border-white/30 text-white hover:bg-white/20 hover:border-white/50'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>FR</span>
                <span className={scrolledNav ? 'text-gray-300' : 'text-white/40'}>|</span>
                <span>EN</span>
              </button>

              {/* Quote CTA */}
              <Link href="/request-purchase">
                <button className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold rounded-full shadow-md shadow-orange-200 hover:shadow-orange-300 transition-all duration-200 hover:scale-105">
                  {t('nav.request_quote')}
                </button>
              </Link>
            </div>

            {/* ── Mobile controls ── */}
            <div className="xl:hidden flex items-center gap-2 ml-auto">
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-lg border transition-all ${
                  scrolledNav ? 'border-green-200 text-green-800' : 'border-white/30 text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {lang.toUpperCase()}
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className={`p-2 rounded-lg transition-colors ${scrolledNav ? 'text-green-800 hover:bg-green-50' : 'text-white hover:bg-white/10'}`}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ════════════════════ FULLSCREEN MOBILE MENU ════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.9 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm xl:hidden flex flex-col"
              style={{ background: 'linear-gradient(160deg, #14532d 0%, #166534 40%, #1a3326 100%)' }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-orange-400 overflow-hidden bg-white">
                    <img src="/images/fenappaci-logo-transparent.png" alt="FENAPPACI" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-display font-bold text-sm leading-tight">FENAPPACI</p>
                    <p className="text-green-300 text-[10px] leading-tight">Côte d'Ivoire</p>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                          isActive(link.href)
                            ? 'bg-orange-500 text-white'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="text-xl w-7 text-center">{link.icon}</span>
                        <span className="flex-1 font-semibold text-sm">{link.label}</span>
                        {isActive(link.href) ? (
                          <span className="w-2 h-2 rounded-full bg-white/80" />
                        ) : (
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Panel footer */}
              <div className="px-6 py-5 border-t border-white/10 space-y-3">
                {/* Language */}
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-green-300" />
                  <span className="text-green-300 text-xs font-semibold">{lang === 'fr' ? 'Langue' : 'Language'}</span>
                  <div className="flex gap-1 ml-auto">
                    {(['fr', 'en'] as const).map(l => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          lang === l ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link href="/request-purchase" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-900/40 transition-all text-sm flex items-center justify-center gap-2">
                    <span>🛒</span>
                    {t('nav.request_quote')}
                  </button>
                </Link>

                <p className="text-center text-[10px] text-white/30">
                  fenappaci.com · {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
