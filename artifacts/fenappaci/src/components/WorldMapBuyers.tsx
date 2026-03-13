import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line, ZoomableGroup } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Buyer {
  id: string;
  nameFr: string;
  nameEn: string;
  coords: [number, number];
  flag: string;
  productsFr: string;
  productsEn: string;
  volumeFr: string;
  volumeEn: string;
  color: string;
}

const IVORY_COAST: [number, number] = [-5.5, 7.5];

const BUYERS: Buyer[] = [
  { id: 'fr', nameFr: 'France', nameEn: 'France', coords: [2, 46.5], flag: '🇫🇷', productsFr: 'Cacao, Café, Huile de Palme', productsEn: 'Cocoa, Coffee, Palm Oil', volumeFr: '15 000+ tonnes/an', volumeEn: '15,000+ tonnes/year', color: '#3b82f6' },
  { id: 'de', nameFr: 'Allemagne', nameEn: 'Germany', coords: [10, 51], flag: '🇩🇪', productsFr: 'Cacao, Noix de Cajou', productsEn: 'Cocoa, Cashew Nuts', volumeFr: '8 000+ tonnes/an', volumeEn: '8,000+ tonnes/year', color: '#8b5cf6' },
  { id: 'nl', nameFr: 'Pays-Bas', nameEn: 'Netherlands', coords: [5, 52.3], flag: '🇳🇱', productsFr: 'Cacao, Huile de Palme', productsEn: 'Cocoa, Palm Oil', volumeFr: '12 000+ tonnes/an', volumeEn: '12,000+ tonnes/year', color: '#f97316' },
  { id: 'be', nameFr: 'Belgique', nameEn: 'Belgium', coords: [4.5, 50.5], flag: '🇧🇪', productsFr: 'Chocolat, Cacao', productsEn: 'Chocolate, Cocoa', volumeFr: '5 000+ tonnes/an', volumeEn: '5,000+ tonnes/year', color: '#eab308' },
  { id: 'es', nameFr: 'Espagne', nameEn: 'Spain', coords: [-4, 40], flag: '🇪🇸', productsFr: 'Café, Fruits', productsEn: 'Coffee, Fruits', volumeFr: '3 000+ tonnes/an', volumeEn: '3,000+ tonnes/year', color: '#ef4444' },
  { id: 'ae', nameFr: 'Émirats Arabes', nameEn: 'UAE', coords: [54, 24], flag: '🇦🇪', productsFr: 'Noix de Cajou, Épices', productsEn: 'Cashew, Spices', volumeFr: '6 000+ tonnes/an', volumeEn: '6,000+ tonnes/year', color: '#06b6d4' },
  { id: 'in', nameFr: 'Inde', nameEn: 'India', coords: [79, 21], flag: '🇮🇳', productsFr: 'Noix de Cajou Brutes', productsEn: 'Raw Cashew Nuts', volumeFr: '20 000+ tonnes/an', volumeEn: '20,000+ tonnes/year', color: '#f97316' },
  { id: 'cn', nameFr: 'Chine', nameEn: 'China', coords: [104, 35], flag: '🇨🇳', productsFr: 'Cacao, Huile de Palme, Cajou', productsEn: 'Cocoa, Palm Oil, Cashew', volumeFr: '10 000+ tonnes/an', volumeEn: '10,000+ tonnes/year', color: '#ef4444' },
  { id: 'vn', nameFr: 'Vietnam', nameEn: 'Vietnam', coords: [108, 14], flag: '🇻🇳', productsFr: 'Noix de Cajou Brutes', productsEn: 'Raw Cashew Nuts', volumeFr: '18 000+ tonnes/an', volumeEn: '18,000+ tonnes/year', color: '#22c55e' },
  { id: 'us', nameFr: 'États-Unis', nameEn: 'United States', coords: [-98, 38], flag: '🇺🇸', productsFr: 'Cacao Premium, Cajou', productsEn: 'Premium Cocoa, Cashew', volumeFr: '9 000+ tonnes/an', volumeEn: '9,000+ tonnes/year', color: '#3b82f6' },
  { id: 'ma', nameFr: 'Maroc', nameEn: 'Morocco', coords: [-6, 32], flag: '🇲🇦', productsFr: 'Fruits, Légumes', productsEn: 'Fruits, Vegetables', volumeFr: '4 000+ tonnes/an', volumeEn: '4,000+ tonnes/year', color: '#22c55e' },
  { id: 'za', nameFr: 'Afrique du Sud', nameEn: 'South Africa', coords: [25, -29], flag: '🇿🇦', productsFr: 'Fruits Tropicaux, Épices', productsEn: 'Tropical Fruits, Spices', volumeFr: '2 500+ tonnes/an', volumeEn: '2,500+ tonnes/year', color: '#a3e635' },
];

function AnimatedArc({ from, to, color }: { from: [number,number]; to: [number,number]; color: string }) {
  return (
    <Line
      from={from}
      to={to}
      stroke={color}
      strokeWidth={1.2}
      strokeOpacity={0.55}
      strokeLinecap="round"
      strokeDasharray="6 4"
    />
  );
}

export default function WorldMapBuyers() {
  const { lang } = useLanguage();
  const [hoveredBuyer, setHoveredBuyer] = useState<Buyer | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [visibleArcs, setVisibleArcs] = useState<string[]>([]);

  useEffect(() => {
    BUYERS.forEach((b, i) => {
      setTimeout(() => {
        setVisibleArcs(prev => [...prev, b.id]);
      }, i * 200);
    });
  }, []);

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
        style={{ height: 480 }}
      >
        <ComposableMap
          projection="geoEquirectangular"
          projectionConfig={{ scale: 140, center: [20, 15] }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={1}>
            {/* Countries */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1e3a2e"
                    stroke="#2d5040"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#2d5040', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Animated arcs from CI to each buyer */}
            {BUYERS.filter(b => visibleArcs.includes(b.id)).map(buyer => (
              <AnimatedArc
                key={buyer.id}
                from={IVORY_COAST}
                to={buyer.coords}
                color={buyer.color}
              />
            ))}

            {/* Buyer country markers */}
            {BUYERS.map(buyer => (
              <Marker
                key={buyer.id}
                coordinates={buyer.coords}
                onMouseEnter={(e) => {
                  const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                  if (rect) {
                    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }
                  setHoveredBuyer(buyer);
                }}
                onMouseLeave={() => setHoveredBuyer(null)}
              >
                {/* Pulse rings */}
                <circle r={12} fill={buyer.color} fillOpacity={0.08} className="pulse-ring" />
                <circle r={10} fill={buyer.color} fillOpacity={0.12} className="pulse-ring-delay" />
                {/* Main dot */}
                <circle
                  r={hoveredBuyer?.id === buyer.id ? 7 : 5}
                  fill={buyer.color}
                  stroke="white"
                  strokeWidth={1.5}
                  style={{ cursor: 'pointer', transition: 'r 0.2s ease' }}
                />
                {/* Flag */}
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{ fontSize: '11px', cursor: 'pointer', userSelect: 'none' }}
                >
                  {buyer.flag}
                </text>
              </Marker>
            ))}

            {/* Ivory Coast origin marker */}
            <Marker coordinates={IVORY_COAST}>
              <circle r={14} fill="#f97316" fillOpacity={0.15} className="pulse-ring" />
              <circle r={10} fill="#f97316" fillOpacity={0.2} className="pulse-ring-delay" />
              <circle r={8} fill="#f97316" stroke="white" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={-14}
                style={{ fontSize: '13px', fontWeight: 'bold', userSelect: 'none' }}
              >
                🇨🇮
              </text>
              <text
                textAnchor="middle"
                y={20}
                style={{
                  fontSize: '8px',
                  fontWeight: '700',
                  fill: '#fdba74',
                  letterSpacing: '0.05em',
                  textShadow: '0 1px 2px #000',
                  userSelect: 'none',
                }}
              >
                FENAPPACI
              </text>
            </Marker>
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredBuyer && (
            <motion.div
              key={hoveredBuyer.id}
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 bg-slate-900/95 backdrop-blur-md border border-slate-600 rounded-xl px-4 py-3 shadow-2xl min-w-[200px] pointer-events-none"
              style={{
                left: Math.min(tooltipPos.x + 10, 600),
                top: Math.max(tooltipPos.y - 80, 10),
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{hoveredBuyer.flag}</span>
                <span className="font-bold text-white text-sm">
                  {lang === 'fr' ? hoveredBuyer.nameFr : hoveredBuyer.nameEn}
                </span>
              </div>
              <div className="text-xs text-slate-300 mb-1">
                <span className="text-orange-400 font-semibold">
                  {lang === 'fr' ? 'Produits: ' : 'Products: '}
                </span>
                {lang === 'fr' ? hoveredBuyer.productsFr : hoveredBuyer.productsEn}
              </div>
              <div className="text-xs">
                <span className="text-green-400 font-semibold">
                  {lang === 'fr' ? 'Volume: ' : 'Volume: '}
                </span>
                <span className="text-slate-200">
                  {lang === 'fr' ? hoveredBuyer.volumeFr : hoveredBuyer.volumeEn}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-slate-900/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
            <span className="text-xs text-slate-300">
              {lang === 'fr' ? 'Côte d\'Ivoire (origine)' : 'Ivory Coast (origin)'}
            </span>
          </div>
          <div className="w-px h-4 bg-slate-600" />
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-5 border-t-2 border-dashed border-blue-400" />
            <span className="text-xs text-slate-300">
              {lang === 'fr' ? 'Route d\'exportation' : 'Export route'}
            </span>
          </div>
        </div>

        {/* Top badge */}
        <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          🌍 {BUYERS.length}+ {lang === 'fr' ? 'pays acheteurs' : 'buyer countries'}
        </div>
      </div>

      {/* Buyer country cards strip */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {BUYERS.map((buyer, i) => (
          <motion.div
            key={buyer.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 p-3 text-center hover:shadow-md hover:border-orange-200 transition-all cursor-default"
          >
            <div className="text-2xl mb-1">{buyer.flag}</div>
            <div className="text-xs font-bold text-gray-800">
              {lang === 'fr' ? buyer.nameFr : buyer.nameEn}
            </div>
            <div className="text-xs text-gray-400 mt-0.5 truncate">
              {lang === 'fr' ? buyer.productsFr.split(',')[0] : buyer.productsEn.split(',')[0]}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
