import { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const IVORY_COAST: [number, number] = [-5.5, 7.5];

interface Buyer {
  id: string;
  nameFr: string;
  nameEn: string;
  coords: [number, number];
  flag: string;
  productsFr: string[];
  productsEn: string[];
  volumeFr: string;
  volumeEn: string;
  color: string;
  partnersFr?: string;
  partnersEn?: string;
}

const BUYERS: Buyer[] = [
  { id: 'fr', nameFr: 'France', nameEn: 'France', coords: [2, 46.5], flag: '🇫🇷', productsFr: ['Cacao', 'Café', 'Huile de Palme', 'Noix de Cajou'], productsEn: ['Cocoa', 'Coffee', 'Palm Oil', 'Cashew'], volumeFr: '15 000+ tonnes/an', volumeEn: '15,000+ t/year', color: '#3b82f6', partnersFr: 'Barry Callebaut, Nestlé France', partnersEn: 'Barry Callebaut, Nestlé France' },
  { id: 'de', nameFr: 'Allemagne', nameEn: 'Germany', coords: [10, 51], flag: '🇩🇪', productsFr: ['Cacao', 'Noix de Cajou', 'Café'], productsEn: ['Cocoa', 'Cashew Nuts', 'Coffee'], volumeFr: '8 000+ tonnes/an', volumeEn: '8,000+ t/year', color: '#8b5cf6', partnersFr: 'Meiji, Lindt Deutschland', partnersEn: 'Meiji, Lindt Deutschland' },
  { id: 'nl', nameFr: 'Pays-Bas', nameEn: 'Netherlands', coords: [5, 52.3], flag: '🇳🇱', productsFr: ['Cacao', 'Huile de Palme'], productsEn: ['Cocoa', 'Palm Oil'], volumeFr: '12 000+ tonnes/an', volumeEn: '12,000+ t/year', color: '#f97316' },
  { id: 'be', nameFr: 'Belgique', nameEn: 'Belgium', coords: [4.5, 50.5], flag: '🇧🇪', productsFr: ['Cacao', 'Beurre de Cacao'], productsEn: ['Cocoa', 'Cocoa Butter'], volumeFr: '5 000+ tonnes/an', volumeEn: '5,000+ t/year', color: '#eab308' },
  { id: 'es', nameFr: 'Espagne', nameEn: 'Spain', coords: [-4, 40], flag: '🇪🇸', productsFr: ['Café', 'Fruits Tropicaux'], productsEn: ['Coffee', 'Tropical Fruits'], volumeFr: '3 000+ tonnes/an', volumeEn: '3,000+ t/year', color: '#ef4444' },
  { id: 'it', nameFr: 'Italie', nameEn: 'Italy', coords: [12, 43], flag: '🇮🇹', productsFr: ['Cacao', 'Café Premium'], productsEn: ['Cocoa', 'Premium Coffee'], volumeFr: '4 500+ tonnes/an', volumeEn: '4,500+ t/year', color: '#22d3ee' },
  { id: 'gb', nameFr: 'Royaume-Uni', nameEn: 'United Kingdom', coords: [-1, 54], flag: '🇬🇧', productsFr: ['Cacao', 'Noix de Cajou'], productsEn: ['Cocoa', 'Cashew Nuts'], volumeFr: '6 000+ tonnes/an', volumeEn: '6,000+ t/year', color: '#a78bfa' },
  { id: 'ae', nameFr: 'Émirats Arabes', nameEn: 'UAE', coords: [54, 24], flag: '🇦🇪', productsFr: ['Noix de Cajou', 'Épices', 'Mangue'], productsEn: ['Cashew', 'Spices', 'Mango'], volumeFr: '6 000+ tonnes/an', volumeEn: '6,000+ t/year', color: '#06b6d4' },
  { id: 'sa', nameFr: 'Arabie Saoudite', nameEn: 'Saudi Arabia', coords: [45, 24], flag: '🇸🇦', productsFr: ['Noix de Cajou', 'Fruits'], productsEn: ['Cashew', 'Fruits'], volumeFr: '3 500+ tonnes/an', volumeEn: '3,500+ t/year', color: '#84cc16' },
  { id: 'tr', nameFr: 'Turquie', nameEn: 'Turkey', coords: [35, 39], flag: '🇹🇷', productsFr: ['Cacao', 'Noix de Cajou'], productsEn: ['Cocoa', 'Cashew'], volumeFr: '4 000+ tonnes/an', volumeEn: '4,000+ t/year', color: '#f472b6' },
  { id: 'in', nameFr: 'Inde', nameEn: 'India', coords: [79, 21], flag: '🇮🇳', productsFr: ['Noix de Cajou Brutes', 'Caoutchouc'], productsEn: ['Raw Cashew Nuts', 'Rubber'], volumeFr: '20 000+ tonnes/an', volumeEn: '20,000+ t/year', color: '#f97316' },
  { id: 'cn', nameFr: 'Chine', nameEn: 'China', coords: [104, 35], flag: '🇨🇳', productsFr: ['Cacao', 'Huile de Palme', 'Cajou', 'Caoutchouc'], productsEn: ['Cocoa', 'Palm Oil', 'Cashew', 'Rubber'], volumeFr: '10 000+ tonnes/an', volumeEn: '10,000+ t/year', color: '#ef4444' },
  { id: 'vn', nameFr: 'Vietnam', nameEn: 'Vietnam', coords: [108, 14], flag: '🇻🇳', productsFr: ['Noix de Cajou Brutes', 'Poivre'], productsEn: ['Raw Cashew Nuts', 'Pepper'], volumeFr: '18 000+ tonnes/an', volumeEn: '18,000+ t/year', color: '#22c55e' },
  { id: 'jp', nameFr: 'Japon', nameEn: 'Japan', coords: [138, 36], flag: '🇯🇵', productsFr: ['Cacao Premium', 'Cajou'], productsEn: ['Premium Cocoa', 'Cashew'], volumeFr: '3 000+ tonnes/an', volumeEn: '3,000+ t/year', color: '#f43f5e' },
  { id: 'us', nameFr: 'États-Unis', nameEn: 'United States', coords: [-98, 38], flag: '🇺🇸', productsFr: ['Cacao Premium', 'Cajou Bio', 'Café'], productsEn: ['Premium Cocoa', 'Organic Cashew', 'Coffee'], volumeFr: '9 000+ tonnes/an', volumeEn: '9,000+ t/year', color: '#3b82f6' },
  { id: 'ma', nameFr: 'Maroc', nameEn: 'Morocco', coords: [-6, 32], flag: '🇲🇦', productsFr: ['Fruits', 'Légumes'], productsEn: ['Fruits', 'Vegetables'], volumeFr: '4 000+ tonnes/an', volumeEn: '4,000+ t/year', color: '#22c55e' },
  { id: 'za', nameFr: 'Afrique du Sud', nameEn: 'South Africa', coords: [25, -29], flag: '🇿🇦', productsFr: ['Fruits Tropicaux', 'Épices'], productsEn: ['Tropical Fruits', 'Spices'], volumeFr: '2 500+ tonnes/an', volumeEn: '2,500+ t/year', color: '#a3e635' },
];

/* ── Animated airplane flying along a bezier arc ── */
function AnimatedPlane({
  from, to, color, delay = 0,
}: { from: [number, number]; to: [number, number]; color: string; delay?: number }) {
  const [t, setT] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const DURATION = 4200;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    function step(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const prog = Math.min(elapsed / DURATION, 1);
      setT(prog);
      if (prog < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        timeoutId = setTimeout(() => {
          startRef.current = null;
          setT(0);
          rafRef.current = requestAnimationFrame(step);
        }, 2800);
      }
    }
    const init = setTimeout(() => {
      rafRef.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(init);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafRef.current);
    };
  }, [delay]);

  if (t <= 0 || t >= 1) return null;

  // Quadratic bezier with upward arc
  const midX = (from[0] + to[0]) / 2;
  const midY = Math.min(from[1], to[1]) - 22;
  const px = (1 - t) ** 2 * from[0] + 2 * (1 - t) * t * midX + t ** 2 * to[0];
  const py = (1 - t) ** 2 * from[1] + 2 * (1 - t) * t * midY + t ** 2 * to[1];

  return (
    <Marker coordinates={[px, py]}>
      <g>
        <circle r={3} fill={color} opacity={0.15} />
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: '9px', pointerEvents: 'none', userSelect: 'none' }}
        >
          ✈
        </text>
      </g>
    </Marker>
  );
}

export default function WorldMapBuyers() {
  const { lang } = useLanguage();
  const [hoveredBuyer, setHoveredBuyer] = useState<Buyer | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [visibleArcs, setVisibleArcs] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    BUYERS.forEach((b, i) => {
      setTimeout(() => setVisibleArcs(prev => [...prev, b.id]), i * 150);
    });
  }, []);

  return (
    <div className="relative w-full">

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
        <button
          onClick={() => setZoom(z => Math.min(z + 0.3, 3))}
          className="w-8 h-8 bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-white rounded-lg text-sm font-bold flex items-center justify-center transition-all"
        >+</button>
        <button
          onClick={() => setZoom(z => Math.max(z - 0.3, 1))}
          className="w-8 h-8 bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-white rounded-lg text-sm font-bold flex items-center justify-center transition-all"
        >−</button>
        <button
          onClick={() => setZoom(1)}
          className="w-8 h-8 bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-white rounded-lg text-xs flex items-center justify-center transition-all"
          title="Reset"
        >↺</button>
      </div>

      {/* Map */}
      <div
        className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
        style={{ height: 500 }}
      >
        <ComposableMap
          projection="geoEquirectangular"
          projectionConfig={{ scale: 148, center: [18, 12] }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Countries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a3326"
                  stroke="#2d5040"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#243d30', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Arc lines */}
          {BUYERS.filter(b => visibleArcs.includes(b.id)).map(buyer => (
            <Line
              key={buyer.id}
              from={IVORY_COAST}
              to={buyer.coords}
              stroke={buyer.color}
              strokeWidth={hoveredBuyer?.id === buyer.id ? 2 : 1}
              strokeOpacity={hoveredBuyer?.id === buyer.id ? 0.9 : 0.4}
              strokeLinecap="round"
              strokeDasharray="5 4"
            />
          ))}

          {/* Animated planes */}
          {BUYERS.map((buyer, i) => (
            <AnimatedPlane
              key={buyer.id}
              from={IVORY_COAST}
              to={buyer.coords}
              color={buyer.color}
              delay={i * 800}
            />
          ))}

          {/* Buyer markers */}
          {BUYERS.map(buyer => (
            <Marker
              key={buyer.id}
              coordinates={buyer.coords}
              onMouseEnter={(e) => {
                const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                setHoveredBuyer(buyer);
              }}
              onMouseLeave={() => setHoveredBuyer(null)}
              onClick={() => setSelectedBuyer(selectedBuyer?.id === buyer.id ? null : buyer)}
            >
              <circle r={14} fill={buyer.color} fillOpacity={0.07} className="pulse-ring" />
              <circle r={11} fill={buyer.color} fillOpacity={0.12} className="pulse-ring-delay" />
              <circle
                r={hoveredBuyer?.id === buyer.id || selectedBuyer?.id === buyer.id ? 8 : 5.5}
                fill={buyer.color}
                stroke={selectedBuyer?.id === buyer.id ? '#ffffff' : 'rgba(255,255,255,0.7)'}
                strokeWidth={selectedBuyer?.id === buyer.id ? 2 : 1.5}
                style={{ cursor: 'pointer', transition: 'r 0.2s ease, fill 0.2s ease' }}
              />
              <text
                textAnchor="middle"
                y={-13}
                style={{ fontSize: '11px', cursor: 'pointer', userSelect: 'none', pointerEvents: 'none' }}
              >
                {buyer.flag}
              </text>
            </Marker>
          ))}

          {/* Ivory Coast origin */}
          <Marker coordinates={IVORY_COAST}>
            <circle r={16} fill="#f97316" fillOpacity={0.12} className="pulse-ring" />
            <circle r={12} fill="#f97316" fillOpacity={0.18} className="pulse-ring-delay" />
            <circle r={9} fill="#f97316" stroke="white" strokeWidth={2.5} />
            <text textAnchor="middle" y={-16} style={{ fontSize: '14px', userSelect: 'none', pointerEvents: 'none' }}>🇨🇮</text>
            <text textAnchor="middle" y={22} style={{ fontSize: '8px', fontWeight: '700', fill: '#fdba74', letterSpacing: '0.06em', userSelect: 'none', pointerEvents: 'none' }}>FENAPPACI</text>
          </Marker>
        </ComposableMap>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredBuyer && !selectedBuyer && (
            <motion.div
              key={hoveredBuyer.id}
              initial={{ opacity: 0, scale: 0.88, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 bg-slate-900/96 backdrop-blur-md border border-slate-600 rounded-2xl px-4 py-3 shadow-2xl min-w-[210px] pointer-events-none"
              style={{
                left: Math.min(tooltipPos.x + 14, 660),
                top: Math.max(tooltipPos.y - 90, 8),
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{hoveredBuyer.flag}</span>
                <div>
                  <p className="font-bold text-white text-sm leading-tight">{lang === 'fr' ? hoveredBuyer.nameFr : hoveredBuyer.nameEn}</p>
                  <p className="text-[10px] text-slate-400">{lang === 'fr' ? 'Cliquer pour détails' : 'Click for details'}</p>
                </div>
              </div>
              <div className="text-xs text-slate-300 mb-1">
                <span style={{ color: hoveredBuyer.color }} className="font-semibold">
                  {lang === 'fr' ? 'Volume: ' : 'Volume: '}
                </span>
                {lang === 'fr' ? hoveredBuyer.volumeFr : hoveredBuyer.volumeEn}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {(lang === 'fr' ? hoveredBuyer.productsFr : hoveredBuyer.productsEn).slice(0, 3).map((p, i) => (
                  <span key={i} className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{p}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top badge */}
        <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          🌍 {BUYERS.length}+ {lang === 'fr' ? 'pays acheteurs' : 'buyer countries'}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-16 flex items-center gap-3 bg-slate-900/85 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            {lang === 'fr' ? 'Origine CI' : 'CI Origin'}
          </div>
          <div className="w-px h-3 bg-slate-600" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs">✈</span>
            {lang === 'fr' ? 'Vol en cours' : 'In flight'}
          </div>
          <div className="w-px h-3 bg-slate-600" />
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-5 border-t-2 border-dashed border-blue-400" />
            {lang === 'fr' ? 'Route export' : 'Export route'}
          </div>
        </div>
      </div>

      {/* ── Country detail panel ── */}
      <AnimatePresence>
        {selectedBuyer && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="mt-4 bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl"
          >
            <div className="p-5 flex flex-col md:flex-row gap-5 items-start">

              {/* Flag + country */}
              <div className="flex items-center gap-4 min-w-fit">
                <span className="text-5xl">{selectedBuyer.flag}</span>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {lang === 'fr' ? selectedBuyer.nameFr : selectedBuyer.nameEn}
                  </h3>
                  <p className="text-sm text-orange-400 font-semibold">{lang === 'fr' ? selectedBuyer.volumeFr : selectedBuyer.volumeEn}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px self-stretch bg-slate-700" />

              {/* Products */}
              <div className="flex-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                  {lang === 'fr' ? 'Produits exportés' : 'Exported products'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'fr' ? selectedBuyer.productsFr : selectedBuyer.productsEn).map((p, i) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1.5 rounded-full font-medium border"
                      style={{ background: selectedBuyer.color + '22', color: selectedBuyer.color, borderColor: selectedBuyer.color + '44' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                {(selectedBuyer.partnersFr || selectedBuyer.partnersEn) && (
                  <p className="text-xs text-slate-500 mt-3">
                    <span className="text-slate-400 font-semibold">{lang === 'fr' ? 'Partenaires: ' : 'Partners: '}</span>
                    {lang === 'fr' ? selectedBuyer.partnersFr : selectedBuyer.partnersEn}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px self-stretch bg-slate-700" />

              {/* Stats + CTA */}
              <div className="flex flex-col gap-2 min-w-fit items-end">
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-1">{lang === 'fr' ? 'Route d\'export' : 'Export route'}</p>
                  <p className="text-sm text-slate-300 font-semibold flex items-center gap-1">
                    🇨🇮 <span className="text-slate-500">→</span> {selectedBuyer.flag}
                  </p>
                </div>
                <a
                  href="/request"
                  className="mt-2 px-4 py-2 rounded-xl text-sm font-bold text-white text-center transition-all hover:opacity-90"
                  style={{ background: selectedBuyer.color }}
                >
                  {lang === 'fr' ? 'Exporter vers ce pays' : 'Export to this country'}
                </a>
                <button
                  onClick={() => setSelectedBuyer(null)}
                  className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-all"
                >
                  <X size={12} /> {lang === 'fr' ? 'Fermer' : 'Close'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Country cards strip */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {BUYERS.map((buyer, i) => (
          <motion.button
            key={buyer.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelectedBuyer(selectedBuyer?.id === buyer.id ? null : buyer)}
            className={`bg-white rounded-xl border p-3 text-center hover:shadow-md transition-all cursor-pointer text-left ${
              selectedBuyer?.id === buyer.id ? 'border-orange-400 shadow-md shadow-orange-100' : 'border-gray-100 hover:border-orange-200'
            }`}
          >
            <div className="text-2xl mb-1 text-center">{buyer.flag}</div>
            <div className="text-xs font-bold text-gray-800 text-center">{lang === 'fr' ? buyer.nameFr : buyer.nameEn}</div>
            <div className="text-[10px] text-gray-400 mt-0.5 truncate text-center">{(lang === 'fr' ? buyer.productsFr : buyer.productsEn)[0]}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
