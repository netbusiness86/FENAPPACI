import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Route {
  product: string;
  emoji: string;
  destinations: Array<{
    region: string;
    regionEn: string;
    countries: string;
    flag: string;
    x: number;
    y: number;
  }>;
  color: string;
}

const ROUTES: Route[] = [
  {
    product: 'Cacao',
    emoji: '🍫',
    color: '#92400e',
    destinations: [
      { region: 'Europe', regionEn: 'Europe', countries: 'France, Allemagne, Pays-Bas, Belgique', flag: '🇪🇺', x: 52, y: 22 },
      { region: 'Amérique du Nord', regionEn: 'North America', countries: 'USA, Canada', flag: '🇺🇸', x: 20, y: 28 },
    ],
  },
  {
    product: 'Noix de Cajou',
    emoji: '🥜',
    color: '#d97706',
    destinations: [
      { region: 'Asie du Sud', regionEn: 'South Asia', countries: 'Inde, Vietnam', flag: '🇮🇳', x: 72, y: 42 },
      { region: 'Asie de l\'Est', regionEn: 'East Asia', countries: 'Chine, Japon', flag: '🇨🇳', x: 80, y: 32 },
    ],
  },
  {
    product: 'Café',
    emoji: '☕',
    color: '#7c3aed',
    destinations: [
      { region: 'Europe', regionEn: 'Europe', countries: 'Italie, France, Espagne', flag: '🇮🇹', x: 52, y: 26 },
      { region: 'Moyen-Orient', regionEn: 'Middle East', countries: 'Émirats, Arabie Saoudite', flag: '🇦🇪', x: 64, y: 38 },
    ],
  },
  {
    product: 'Mangue',
    emoji: '🥭',
    color: '#16a34a',
    destinations: [
      { region: 'Moyen-Orient', regionEn: 'Middle East', countries: 'Émirats, Bahrein, Oman', flag: '🇦🇪', x: 64, y: 38 },
      { region: 'Europe', regionEn: 'Europe', countries: 'France, Allemagne', flag: '🇫🇷', x: 50, y: 22 },
    ],
  },
  {
    product: 'Huile de Palme',
    emoji: '🌴',
    color: '#0ea5e9',
    destinations: [
      { region: 'Asie', regionEn: 'Asia', countries: 'Chine, Pakistan, Bangladesh', flag: '🇨🇳', x: 78, y: 38 },
      { region: 'Europe', regionEn: 'Europe', countries: 'Pays-Bas, Belgique', flag: '🇳🇱', x: 51, y: 21 },
    ],
  },
  {
    product: 'Hévéa (Caoutchouc)',
    emoji: '🌿',
    color: '#65a30d',
    destinations: [
      { region: 'Asie de l\'Est', regionEn: 'East Asia', countries: 'Chine, Japon, Corée du Sud', flag: '🇨🇳', x: 80, y: 32 },
    ],
  },
];

/* Ivory Coast position on the simplified SVG map */
const CI_X = 48;
const CI_Y = 50;

function MiniMap({ route, active }: { route: Route; active: boolean }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-800" style={{ height: 160 }}>
      {/* World silhouette (very simplified SVG continents) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 70" preserveAspectRatio="none">
        {/* Continent blobs (simplified) */}
        {/* Africa */}
        <ellipse cx="50" cy="52" rx="8" ry="12" fill="#1e3a2e" />
        {/* Europe */}
        <ellipse cx="51" cy="28" rx="7" ry="5" fill="#1e3a2e" />
        {/* Asia */}
        <ellipse cx="72" cy="35" rx="14" ry="10" fill="#1e3a2e" />
        {/* Americas */}
        <ellipse cx="22" cy="38" rx="8" ry="14" fill="#1e3a2e" />
        {/* Australia */}
        <ellipse cx="82" cy="58" rx="5" ry="4" fill="#1e3a2e" />
      </svg>

      {/* Animated arcs */}
      {active && route.destinations.map((dest, i) => (
        <svg key={i} className="absolute inset-0 w-full h-full" viewBox="0 0 100 70" preserveAspectRatio="none">
          <motion.line
            x1={CI_X} y1={CI_Y} x2={dest.x} y2={dest.y}
            stroke={route.color}
            strokeWidth="0.8"
            strokeDasharray="2 2"
            strokeOpacity="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: i * 0.3, ease: 'easeOut' }}
          />
          {/* Animated dot */}
          <motion.circle
            cx={CI_X} cy={CI_Y} r="0.8"
            fill={route.color}
            initial={{ cx: CI_X, cy: CI_Y, opacity: 0 }}
            animate={{ cx: dest.x, cy: dest.y, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.3, repeat: Infinity, repeatDelay: 1.5 }}
          />
          {/* Destination pin */}
          <motion.circle
            cx={dest.x} cy={dest.y} r="1.5"
            fill={route.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + i * 0.3, duration: 0.4 }}
          />
        </svg>
      ))}

      {/* CI origin marker */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: `${CI_X}%`, top: `${CI_Y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <span style={{ fontSize: 14 }}>🇨🇮</span>
      </div>

      {/* Destination flags */}
      {active && route.destinations.map((dest, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${dest.x}%`, top: `${dest.y}%`, transform: 'translate(-50%, -100%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 + i * 0.3, duration: 0.5, type: 'spring' }}
        >
          <span style={{ fontSize: 12 }}>{dest.flag}</span>
        </motion.div>
      ))}

      {/* Product badge */}
      <div
        className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-bold"
        style={{ background: route.color + 'cc' }}
      >
        <span>{route.emoji}</span>
        <span>{route.product}</span>
      </div>
    </div>
  );
}

export default function ProductExportRoutes() {
  const { lang } = useLanguage();
  const [activeRoute, setActiveRoute] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider border border-orange-500/30">
            🌍 {lang === 'fr' ? 'Routes par produit' : 'Routes by product'}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            {lang === 'fr' ? 'Où Vont Nos Produits ?' : 'Where Do Our Products Go?'}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Chaque produit agricole a ses marchés cibles. Sélectionnez un produit pour visualiser ses routes d\'exportation.'
              : 'Each agricultural product has its target markets. Select a product to visualize its export routes.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left: product selector */}
          <div className="flex flex-col gap-2">
            {ROUTES.map((route, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveRoute(i)}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
                  activeRoute === i
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-slate-700 bg-slate-800/60 hover:border-slate-600'
                }`}
              >
                <span className="text-3xl">{route.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm">{route.product}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {route.destinations.map(d => lang === 'fr' ? d.region : d.regionEn).join(' · ')}
                  </p>
                </div>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: route.color, boxShadow: activeRoute === i ? `0 0 8px ${route.color}` : 'none' }}
                />
              </motion.button>
            ))}
          </div>

          {/* Right: map + destinations */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoute}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <MiniMap route={ROUTES[activeRoute]} active />

                {/* Destination details */}
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {ROUTES[activeRoute].destinations.map((dest, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 border border-slate-700"
                    >
                      <span className="text-2xl">{dest.flag}</span>
                      <div>
                        <p className="text-white font-bold text-sm">
                          {lang === 'fr' ? dest.region : dest.regionEn}
                        </p>
                        <p className="text-slate-400 text-xs">{dest.countries}</p>
                      </div>
                      <div
                        className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        style={{ background: ROUTES[activeRoute].color + '33', color: ROUTES[activeRoute].color }}
                      >
                        ✈
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
