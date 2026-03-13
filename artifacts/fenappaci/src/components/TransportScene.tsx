import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

/* ── Ocean wave path ── */
const WAVE =
  'M0,40 C120,80 240,0 360,40 C480,80 600,0 720,40 C840,80 960,0 1080,40 C1200,80 1320,0 1440,40 L1440,100 L0,100 Z';

/* ── Airplane SVG ── */
function PlaneIcon({ size = 22, color = '#f97316' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

/* ── Ship SVG ── */
function ShipIcon({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="10" y="30" width="44" height="18" rx="4" fill="#1e40af" />
      <rect x="22" y="20" width="10" height="12" rx="2" fill="#3b82f6" />
      <rect x="34" y="24" width="8" height="8" rx="1" fill="#3b82f6" />
      <rect x="28" y="12" width="3" height="10" fill="#94a3b8" />
      <rect x="14" y="32" width="6" height="6" rx="1" fill="#93c5fd" />
      <rect x="22" y="32" width="6" height="6" rx="1" fill="#93c5fd" />
      <rect x="30" y="32" width="6" height="6" rx="1" fill="#93c5fd" />
    </svg>
  );
}

/* ── Container Truck SVG ── */
function TruckIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 80 44">
      <rect x="2" y="8" width="50" height="26" rx="3" fill="#f97316" />
      <rect x="52" y="16" width="26" height="18" rx="2" fill="#ea580c" />
      <rect x="54" y="18" width="10" height="10" rx="1" fill="#7dd3fc" />
      <circle cx="15" cy="38" r="6" fill="#1e293b" />
      <circle cx="15" cy="38" r="3" fill="#64748b" />
      <circle cx="55" cy="38" r="6" fill="#1e293b" />
      <circle cx="55" cy="38" r="3" fill="#64748b" />
      <circle cx="68" cy="38" r="6" fill="#1e293b" />
      <circle cx="68" cy="38" r="3" fill="#64748b" />
    </svg>
  );
}

/* ── Route Step ── */
function RouteStep({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <p className="text-white text-xs font-bold text-center leading-tight">{label}</p>
      <p className="text-white/50 text-[10px] text-center">{sub}</p>
    </div>
  );
}

export default function TransportScene() {
  const { lang } = useLanguage();

  return (
    <div className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0f172a 0%, #0a2540 40%, #0d3d2a 100%)' }}>

      {/* ═══════════════════ TOP SECTION — AIR ROUTES ═══════════════════ */}
      <div className="relative h-40 overflow-hidden">
        {/* Sky gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #1e3a5f 0%, #0f2744 100%)' }} />

        {/* Stars */}
        {[...Array(28)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 19 + 7) % 60}%`,
              opacity: 0.5 + (i % 5) * 0.1,
            }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* ── Airplane 1: CI → Europe ── */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 160" preserveAspectRatio="none">
          <motion.path
            d="M 80,120 Q 300,20 600,60"
            fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="6 5" strokeOpacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />
          <motion.path
            d="M 80,120 Q 500,10 920,80"
            fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 5" strokeOpacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 3.5, ease: 'easeOut', delay: 0.5 }}
          />
        </svg>

        {/* ── Flying plane 1 ── */}
        <motion.div
          className="absolute top-0 left-0"
          animate={{
            offsetDistance: ['0%', '100%'],
          }}
          style={{
            offsetPath: "path('M 80,120 Q 300,20 600,60')",
            offsetRotate: 'auto',
          }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
        >
          <PlaneIcon size={18} color="#f97316" />
        </motion.div>

        {/* ── Flying plane 2 ── */}
        <motion.div
          className="absolute top-0 left-0"
          animate={{ offsetDistance: ['0%', '100%'] }}
          style={{
            offsetPath: "path('M 80,120 Q 500,10 920,80')",
            offsetRotate: 'auto',
          }}
          transition={{ duration: 7, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut', delay: 2 }}
        >
          <PlaneIcon size={16} color="#60a5fa" />
        </motion.div>

        {/* Origin label */}
        <div className="absolute bottom-4 left-16 text-[10px] text-orange-400 font-bold flex items-center gap-1">
          <span className="text-sm">🇨🇮</span> Abidjan
        </div>
      </div>

      {/* ═══════════════════ OCEAN SECTION — CARGO SHIPS ═══════════════════ */}
      <div className="relative h-48 overflow-hidden">
        {/* Ocean gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0c4a6e 0%, #075985 40%, #0e7490 100%)' }} />

        {/* Wave layers */}
        {[0, 1, 2].map(i => (
          <motion.svg
            key={i}
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{ height: 60, opacity: 0.15 + i * 0.1, bottom: i * 8 }}
            animate={{ x: [0, -(100 + i * 40), 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d={WAVE} fill="#7dd3fc" />
          </motion.svg>
        ))}

        {/* ── Cargo Ship 1 ── */}
        <motion.div
          className="absolute"
          style={{ bottom: 28 }}
          animate={{ x: ['-120px', '110vw'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 0 }}
        >
          <motion.div animate={{ y: [0, -4, 0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <ShipIcon size={46} />
          </motion.div>
          {/* Wake */}
          <motion.div
            className="absolute -left-8 bottom-2 flex gap-1 opacity-40"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {[24, 18, 12, 8].map((w, j) => (
              <div key={j} className="bg-blue-200/60 rounded-full" style={{ width: w, height: 3 }} />
            ))}
          </motion.div>
          <div className="text-[9px] text-blue-200 font-bold text-center mt-0.5">MV FENAPPACI I</div>
        </motion.div>

        {/* ── Cargo Ship 2 ── */}
        <motion.div
          className="absolute"
          style={{ bottom: 22 }}
          animate={{ x: ['-120px', '110vw'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear', delay: 8 }}
        >
          <motion.div animate={{ y: [0, -5, 0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <ShipIcon size={36} />
          </motion.div>
          <div className="text-[9px] text-blue-200 font-bold text-center mt-0.5">MV CÔTE D'IVOIRE</div>
        </motion.div>

        {/* Floating containers */}
        {['📦', '🧃', '🛢️'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-lg"
            style={{ bottom: 32, left: `${20 + i * 30}%`, opacity: 0.6 }}
            animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Route label */}
        <div className="absolute top-4 right-6 text-xs text-cyan-300 font-semibold opacity-80">
          🌊 {lang === 'fr' ? 'Routes maritimes internationales' : 'International maritime routes'}
        </div>
      </div>

      {/* ═══════════════════ ROAD SECTION — TRUCKS ═══════════════════ */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />

        {/* Road markings */}
        <div className="absolute top-1/2 left-0 right-0 flex" style={{ transform: 'translateY(-50%)' }}>
          <motion.div
            className="flex gap-6 shrink-0"
            animate={{ x: [0, -200] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-12 h-1 bg-yellow-400/50 rounded-full" />
            ))}
          </motion.div>
        </div>

        {/* ── Truck 1 ── */}
        <motion.div
          className="absolute"
          style={{ top: '20%' }}
          animate={{ x: ['-160px', '110vw'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 0 }}
        >
          <TruckIcon size={56} />
        </motion.div>

        {/* ── Truck 2 ── */}
        <motion.div
          className="absolute"
          style={{ top: '30%' }}
          animate={{ x: ['-160px', '110vw'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 5 }}
        >
          <TruckIcon size={42} />
        </motion.div>

        {/* Road label */}
        <div className="absolute bottom-2 right-6 text-[10px] text-slate-400 font-semibold">
          🚛 {lang === 'fr' ? 'Transport terrestre' : 'Ground transport'}
        </div>
      </div>

      {/* ═══════════════════ ROUTE STEPS STRIP ═══════════════════ */}
      <div className="px-6 py-6 bg-gradient-to-r from-green-950 via-slate-900 to-green-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-2">
            <RouteStep icon="🌿" label={lang === 'fr' ? 'Champ' : 'Farm'} sub="Côte d'Ivoire" />

            <motion.div
              className="flex-1 h-px border-t-2 border-dashed border-orange-500/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <RouteStep icon="🏭" label={lang === 'fr' ? 'Traitement' : 'Processing'} sub="Abidjan" />

            <motion.div className="flex-1 h-px border-t-2 border-dashed border-orange-500/50"
              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />

            <RouteStep icon="📦" label={lang === 'fr' ? 'Emballage' : 'Packaging'} sub={lang === 'fr' ? 'Entrepôt' : 'Warehouse'} />

            <motion.div className="flex-1 h-px border-t-2 border-dashed border-orange-500/50"
              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />

            <RouteStep icon="🚢" label={lang === 'fr' ? 'Expédition' : 'Shipping'} sub="Port d'Abidjan" />

            <motion.div className="flex-1 h-px border-t-2 border-dashed border-orange-500/50"
              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />

            <RouteStep icon="🌍" label={lang === 'fr' ? 'Destination' : 'Destination'} sub={lang === 'fr' ? '30+ pays' : '30+ countries'} />
          </div>
        </div>
      </div>
    </div>
  );
}
