import React from 'react';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AffiliatePortal } from './components/affiliate/AffiliatePortal';
import { CampaignBanner } from './components/CampaignBanner';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { OccasionDiscovery } from './components/OccasionDiscovery';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CommerceProvider, useCommerce } from './context/CommerceContext';
import { Compass, Filter, RotateCcw, Sparkles } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedOccasion,
    setSelectedOccasion,
    clearFilters,
    t,
    activeCurrency,
    activeLanguage,
  } = useCommerce();

  const categories = [
    'All',
    'Shoes',
    'Bags',
    'Heels',
    'Boots',
    'Flats & Loafers',
    'Totes',
    'Shoulder Bags',
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'All':
        return t('all_categories');
      case 'Shoes':
        return t('category_shoes');
      case 'Bags':
        return t('category_bags');
      case 'Heels':
        return t('category_heels');
      case 'Boots':
        return t('category_boots');
      case 'Flats & Loafers':
        return t('category_flats');
      case 'Totes':
      case 'Shoulder Bags':
        return t('category_totes');
      default:
        return cat;
    }
  };

  // Combine Category and Occasion filtering
  let filteredProducts = products;

  if (selectedCategory !== 'All') {
    if (selectedCategory === 'Shoes') {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.category === 'Shoes' ||
          p.category === 'Heels' ||
          p.category === 'Boots' ||
          p.category === 'Flats & Loafers'
      );
    } else if (selectedCategory === 'Bags') {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.category === 'Bags' ||
          p.category === 'Totes' ||
          p.category === 'Shoulder Bags'
      );
    } else {
      filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
    }
  }

  if (selectedOccasion !== 'all') {
    filteredProducts = filteredProducts.filter(
      (p) => p.occasions && p.occasions.includes(selectedOccasion)
    );
  }

  return (
    <div className="bg-[#faf9f6]">
      {/* Editorial Hero */}
      <Hero />

      {/* Antler & Juun.J Curated Occasions & Event Showcase */}
      <OccasionDiscovery />

      {/* Main Shoe & Bag Collection Section */}
      <section
        id="collection-grid"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10 scroll-mt-20"
      >
        {/* Category Filter Tabs & Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-widest mb-1 font-semibold">
              <Compass className="w-3.5 h-3.5 text-stone-700" />
              <span>Autumn / Winter 2026 Footwear & Leather Edition</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium tracking-tight">
              Women&apos;s Shoes & Architectural Bags
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Real-time checkout in <strong>{activeCurrency.code}</strong> &bull; Localized for{' '}
              <strong>{activeLanguage.name}</strong> &bull; Showing {filteredProducts.length} pieces
            </p>
          </div>

          {/* Silhouette Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white font-semibold shadow-sm'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid with Quick Buy buttons */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4 max-w-lg mx-auto">
            <Filter className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="font-serif text-xl text-stone-900">No items match this combination</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We couldn&apos;t find any pieces matching this specific occasion and silhouette.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Editorial Craftsmanship Footnote */}
        <div className="p-8 rounded-2xl bg-white border border-stone-200 text-center max-w-3xl mx-auto space-y-3 shadow-xs">
          <span className="text-stone-500 text-xs font-mono uppercase tracking-widest block font-semibold">
            Florentine Craftsmanship & Tuscan Tanning
          </span>
          <h3 className="font-serif text-xl text-stone-900 font-medium">
            Handmade in Small Certified Workshops
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-light max-w-xl mx-auto">
            From sculpted Italian nappa leather slingbacks to hand-stitched vegetable-tanned box calfskin bags, every piece is shaped over ergonomic lasts for exceptional comfort and lasting beauty.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-[11px] text-stone-500 font-mono">
            <span>&bull; 30-Day Fit Guarantee</span>
            <span>&bull; Free Express Courier</span>
            <span>&bull; 100% LWG Gold Certified Tanneries</span>
          </div>
        </div>
      </section>
    </div>
  );
};

const MainAppLayout: React.FC = () => {
  const { viewMode } = useCommerce();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Social Campaign Attribution Simulator Banner */}
      <CampaignBanner />

      {/* Main Content Router */}
      <main className="flex-1">
        {viewMode === 'storefront' && <StorefrontContent />}
        {viewMode === 'admin' && <AdminDashboard />}
        {viewMode === 'affiliate_portal' && <AffiliatePortal />}
      </main>

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />

      {/* Brand Footer in light mode */}
      <footer className="bg-white border-t border-stone-200 text-stone-500 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-serif text-lg tracking-widest text-stone-900 uppercase block font-semibold">
              ATELIER ÉTOILE
            </span>
            <p className="text-[11px] text-stone-500 font-light">
              Women&apos;s High-End Shoes & Bags &bull; Next-Gen Social Campaign & Affiliate Attribution Engine
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-stone-500">
            <span>Stripe Encrypted Payouts</span>
            <span>&bull;</span>
            <span>1-Click Multi-Currency (CAD, USD, EUR...)</span>
            <span>&bull;</span>
            <span>1-Click Localization</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CommerceProvider>
      <MainAppLayout />
    </CommerceProvider>
  );
}
