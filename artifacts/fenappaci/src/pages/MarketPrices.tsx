import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, RefreshCw, Clock, BarChart3, Globe, Sprout, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface CommodityPrice {
  id: number;
  nameEn: string;
  nameFr: string;
  symbol: string;
  icon: string;
  price: number;
  unit: string;
  unitFr: string;
  changePercent: number;
  simulatedPrice: number;
  simulatedChange: number;
  sparkline: number[];
  updatedAt: string;
}

interface PricesResponse {
  prices: CommodityPrice[];
  lastUpdated: string;
}

const MARKET_INSIGHTS = [
  {
    icon: '🍫',
    keyFr: 'market.insight.cocoa.title',
    descFr: 'market.insight.cocoa.desc',
  },
  {
    icon: '🌰',
    keyFr: 'market.insight.cashew.title',
    descFr: 'market.insight.cashew.desc',
  },
  {
    icon: '🌍',
    keyFr: 'market.insight.export.title',
    descFr: 'market.insight.export.desc',
  },
];

function PriceCard({ item, lang }: { item: CommodityPrice; lang: string }) {
  const name = lang === 'fr' ? item.nameFr : item.nameEn;
  const unit = lang === 'fr' ? item.unitFr : item.unit;
  const change = item.simulatedChange;
  const price = item.simulatedPrice;
  const isUp = change >= 0;

  const sparkData = item.sparkline.map((v, i) => ({ v, i }));

  const formatPrice = (p: number) => {
    if (p < 10) return p.toFixed(4);
    if (p < 100) return p.toFixed(2);
    return p.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-300 overflow-hidden group">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{name}</h3>
              <span className="text-xs text-gray-400 font-mono">{item.symbol}</span>
            </div>
          </div>
          <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
            isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}>
            {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isUp ? '+' : ''}{change.toFixed(2)}%
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-gray-900 font-mono">
              {unit.startsWith('USD') ? '$' : ''}{formatPrice(price)}
            </span>
          </div>
          <span className="text-xs text-gray-400">{unit}</span>
        </div>

        <div className="h-16 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <defs>
                <linearGradient id={`grad-${item.symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isUp ? '#16a34a' : '#dc2626'} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={isUp ? '#16a34a' : '#dc2626'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
                      ${formatPrice(payload[0].value as number)}
                    </div>
                  ) : null
                }
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke={isUp ? '#16a34a' : '#dc2626'}
                strokeWidth={1.5}
                fill={`url(#grad-${item.symbol})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`h-1 ${isUp ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`} />
    </div>
  );
}

export default function MarketPrices() {
  const { lang, t } = useLanguage();
  const [data, setData] = useState<PricesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [seeding, setSeeding] = useState(false);

  const fetchPrices = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await fetch(`${API_BASE}/api/commodity-prices`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();

      if (json.prices?.length === 0) {
        setSeeding(true);
        await fetch(`${API_BASE}/api/admin/commodity-prices/seed`, { method: 'POST' });
        setSeeding(false);
        const res2 = await fetch(`${API_BASE}/api/commodity-prices`);
        const json2 = await res2.json();
        setData(json2);
      } else {
        setData(json);
      }
      setError(null);
      setCountdown(120);
    } catch {
      setError(lang === 'fr' ? 'Impossible de charger les prix.' : 'Failed to load prices.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          fetchPrices();
          return 120;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchPrices]);

  const formatLastUpdated = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  const upCount = data?.prices.filter(p => p.simulatedChange >= 0).length ?? 0;
  const downCount = data?.prices.filter(p => p.simulatedChange < 0).length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        titleFr="Prix du Marché – Cacao, Cajou, Café Côte d'Ivoire | FENAPPACI"
        titleEn="Market Prices – Cocoa, Cashew, Coffee Ivory Coast | FENAPPACI"
        descFr="Suivez en temps réel les prix du marché des produits agricoles ivoiriens : cacao, noix de cajou, café, hévéa, huile de palme. Données actualisées pour importateurs et acheteurs."
        descEn="Follow real-time market prices of Ivorian agricultural products: cocoa, cashew nuts, coffee, rubber, palm oil. Updated data for importers and buyers."
        canonical="/market-prices"
        keywordsFr="prix cacao Côte d'Ivoire, prix noix de cajou Afrique, cours café ivoirien, prix marché agricole Abidjan"
        keywordsEn="cocoa price Ivory Coast, cashew nuts price Africa, Ivorian coffee price, agricultural market prices Abidjan"
      />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">
                  {t('market.live_badge')}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">
                {t('market.title')}
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl">
                {t('market.subtitle')}
              </p>
            </div>

            {/* Market Overview mini stats */}
            {data && (
              <div className="flex gap-4 flex-shrink-0">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                  <div className="text-2xl font-bold text-green-400">{upCount}</div>
                  <div className="text-xs text-gray-300 mt-1 flex items-center gap-1 justify-center">
                    <TrendingUp className="w-3 h-3" /> {t('market.rising')}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                  <div className="text-2xl font-bold text-red-400">{downCount}</div>
                  <div className="text-xs text-gray-300 mt-1 flex items-center gap-1 justify-center">
                    <TrendingDown className="w-3 h-3" /> {t('market.falling')}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                  <div className="text-2xl font-bold text-orange-400">{data.prices.length}</div>
                  <div className="text-xs text-gray-300 mt-1">{t('market.commodities')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="bg-white border-b shadow-sm sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 text-orange-500" />
            {data && <span>{t('market.last_updated')}: <strong className="text-gray-800">{formatLastUpdated(data.lastUpdated)}</strong></span>}
            <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-mono">
              {t('market.refresh_in')} {countdown}s
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPrices(true)}
            disabled={refreshing}
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {t('market.refresh')}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Seeding notice */}
        {seeding && (
          <div className="mb-8 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3 text-orange-800">
            <RefreshCw className="w-5 h-5 animate-spin flex-shrink-0 text-orange-500" />
            <span className="text-sm">{t('market.initializing')}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Price Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-gray-200 rounded-xl" />
                  <div>
                    <div className="h-4 w-28 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-7 w-24 bg-gray-200 rounded mb-1" />
                <div className="h-16 bg-gray-100 rounded mt-3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data?.prices.map((item) => (
              <PriceCard key={item.id} item={item} lang={lang} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        {data && (
          <p className="mt-6 text-center text-xs text-gray-400">
            {t('market.disclaimer')}
          </p>
        )}

        {/* Market Insights */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">{t('market.insights.title')}</h2>
              <p className="text-sm text-gray-500">{t('market.insights.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cocoa Insight */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-orange-100 p-6">
              <div className="text-4xl mb-4">🍫</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t('market.insight.cocoa.title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('market.insight.cocoa.desc')}</p>
              <div className="mt-4 pt-4 border-t border-orange-100">
                <div className="flex items-center gap-2 text-xs text-orange-700 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {t('market.insight.cocoa.trend')}
                </div>
              </div>
            </div>

            {/* Cashew Insight */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
              <div className="text-4xl mb-4">🌰</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t('market.insight.cashew.title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('market.insight.cashew.desc')}</p>
              <div className="mt-4 pt-4 border-t border-green-100">
                <div className="flex items-center gap-2 text-xs text-green-700 font-medium">
                  <Globe className="w-3.5 h-3.5" />
                  {t('market.insight.cashew.trend')}
                </div>
              </div>
            </div>

            {/* Export Opportunities */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t('market.insight.export.title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('market.insight.export.desc')}</p>
              <div className="mt-4 pt-4 border-t border-blue-100">
                <div className="flex items-center gap-2 text-xs text-blue-700 font-medium">
                  <Sprout className="w-3.5 h-3.5" />
                  {t('market.insight.export.trend')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 text-white text-center shadow-xl shadow-orange-200">
          <h2 className="text-3xl font-display font-bold mb-3">{t('market.cta.title')}</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">{t('market.cta.desc')}</p>
          <a href="/request-purchase">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-full px-10 shadow-lg">
              {t('market.cta.btn')}
            </Button>
          </a>
        </section>
      </div>
    </div>
  );
}
