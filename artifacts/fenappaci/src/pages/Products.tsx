import { useState } from "react";
import { Link } from "wouter";
import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { products, Category } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";

export default function Products() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === 'all' || p.category === activeTab;
    const matchesSearch = p.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const categories = [
    { id: 'all', label: t('products.cat.all') },
    { id: 'export', label: t('products.cat.export') },
    { id: 'fruits', label: t('products.cat.fruits') },
    { id: 'food', label: t('products.cat.food') },
    { id: 'vegetables', label: t('products.cat.vegetables') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageHero
        title={t('products.title')}
        subtitle={t('products.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&h=1080&fit=crop"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as Category | 'all')}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === cat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-muted-foreground border border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder={t('products.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white rounded-full border-gray-200 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name[lang]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 hover:bg-primary text-white backdrop-blur-sm shadow-sm">
                        {t('products.available')}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                      {categories.find(c => c.id === product.category)?.label}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{product.name[lang]}</h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-6 line-clamp-3">
                      {product.description[lang]}
                    </p>
                    <Link href={`/request?product=${encodeURIComponent(product.name.fr)}`}>
                      <Button className="w-full bg-foreground hover:bg-primary text-white transition-colors group-hover:shadow-md">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('products.request')}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground">{t('products.notfound.title')}</h3>
              <p className="text-muted-foreground mt-2">{t('products.notfound.desc')}</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
