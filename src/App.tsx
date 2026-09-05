import React from 'react';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AffiliatePortal } from './components/affiliate/AffiliatePortal';
import { B2BOrderModal } from './components/B2BOrderModal';
import { Breadcrumbs } from './components/Breadcrumbs';
import { CampaignBanner } from './components/CampaignBanner';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Hero } from './components/Hero';
import { LanguageWarningModal } from './components/LanguageWarningModal';
import { Navbar } from './components/Navbar';
import { OccasionDiscovery } from './components/OccasionDiscovery';
import { OrderTrackerFooter } from './components/OrderTrackerFooter';
import { ProductCard } from './components/ProductCard';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { ProductModal } from './components/ProductModal';
import { QuotaAlertBanner } from './components/QuotaAlertBanner';
import { CommerceProvider, useCommerce } from './context/CommerceContext';
import { SortOption } from './types';
import { matchProductSearch, normalizeSearch } from './utils/search';
import {
  ArrowUpDown,
  BookOpen,
  Check,
  Compass,
  Filter,
  Layers,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedOccasion,
    setSelectedOccasion,
    brandFilter,
    setBrandFilter,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    selectedSizeFilter,
    setSelectedSizeFilter,
    clearFilters,
    storytellingText,
    t,
    activeCurrency,
    activeLanguage,
    comparisonList,
    setIsComparisonOpen,
  } = useCommerce();

  const categories = [
    'All',
    'Shoes',
    'Heels',
    'Flats & Loafers',
  ];

  const sizeOptions = ['all', '36', '37', '38', '39', '40', '41'];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'All':
        return t('all_categories') || 'All Footwear';
      case 'Shoes':
        return t('category_shoes') || 'All Shoes';
      case 'Heels':
        return t('category_heels') || 'Wedges & Heels';
      case 'Flats & Loafers':
        return t('category_flats') || 'Kolhapuri Flats';
      default:
        return cat;
    }
  };

  // 0. Filter by Brand (Stöffa Only)
  let filteredProducts = products;
  if (brandFilter && brandFilter !== 'all') {
    filteredProducts = filteredProducts.filter((p) => p.brand === brandFilter);
  }

  // 1. Filter by Category
  if (selectedCategory !== 'All') {
    if (selectedCategory === 'Shoes') {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.category === 'Shoes' ||
          p.category === 'Heels' ||
          p.category === 'Boots' ||
          p.category === 'Flats & Loafers'
      );
    } else {
      filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
    }
  }

  // 2. Filter by Occasion
  if (selectedOccasion !== 'all') {
    filteredProducts = filteredProducts.filter(
      (p) => p.occasions && p.occasions.includes(selectedOccasion)
    );
  }

  // Precompute global matches across the full catalog for this search query
  const globalSearchMatches =
    searchTerm && searchTerm.trim()
      ? products.filter((p) => matchProductSearch(p, searchTerm))
      : [];

  // 3. Filter by Search Query (accent-insensitive, diacritic-agnostic, multi-token)
  if (searchTerm && searchTerm.trim()) {
    filteredProducts = filteredProducts.filter((p) =>
      matchProductSearch(p, searchTerm)
    );
  }

  // 4. Filter by Size
  if (selectedSizeFilter !== 'all') {
    filteredProducts = filteredProducts.filter((p) =>
      p.sizes.includes(selectedSizeFilter)
    );
  }

  // 5. Apply Sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-to-high') {
      return a.priceUSD - b.priceUSD;
    }
    if (sortBy === 'price-high-to-low') {
      return b.priceUSD - a.priceUSD;
    }
    if (sortBy === 'newest') {
      if (a.isNewArrival && !b.isNewArrival) return -1;
      if (!a.isNewArrival && b.isNewArrival) return 1;
      return b.id.localeCompare(a.id);
    }
    // 'featured' maintains default curated editorial sequence
    return 0;
  });

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedOccasion !== 'all' ||
    Boolean(searchTerm) ||
    selectedSizeFilter !== 'all' ||
    sortBy !== 'featured' ||
    brandFilter !== 'Stöffa';

  return (
    <div className="bg-[#faf9f6]">
      {/* Editorial Hero */}
      <Hero />

      {/* Antler & Juun.J Curated Occasions & Event Showcase */}
      <OccasionDiscovery />

      {/* Main Shoe & Bag Collection Section */}
      <section
        id="collection-grid"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 scroll-mt-20"
      >
        {/* Seasonal Storytelling Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-2xs relative overflow-hidden">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-stone-700" />
              <span>STÖFFA STYLE &bull; ARTISANAL FOOTWEAR ATELIER</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium leading-snug">
              &ldquo;{storytellingText}&rdquo;
            </h3>
            <p className="text-xs text-stone-500 font-light">
              Handcrafted in India with non-skid rubber outsoles, ergonomic memory-foam cushioning, and ethical vegan leathers.
            </p>
          </div>
        </div>

        {/* Collection Header & Silhouette Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-widest mb-1 font-semibold">
              <Compass className="w-3.5 h-3.5 text-stone-700" />
              <span>Artisanal Kolhapuri Wedges &amp; Festive Heels</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium tracking-tight">
              Stöffa Style Footwear Collection
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Real-time checkout in <strong>{activeCurrency.code}</strong> &bull; Localized for{' '}
              <strong>{activeLanguage.name}</strong> &bull; Showing {filteredProducts.length} Stöffa pieces
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Brand Filter Toggle: Stöffa Only */}
            <div className="flex items-center p-1 rounded-full bg-stone-100 border border-stone-300 text-xs font-mono font-medium shadow-2xs">
              <button
                id="brand-filter-stoffa-btn"
                onClick={() => setBrandFilter('Stöffa')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  brandFilter === 'Stöffa'
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Stöffa Only</span>
              </button>
              <button
                id="brand-filter-all-btn"
                onClick={() => setBrandFilter('all')}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  brandFilter === 'all'
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Brands
              </button>
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
                      ? 'bg-stone-900 text-white font-semibold shadow-xs'
                      : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls Bar: Size Filter Pills, Sorting Dropdown & Active Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          {/* Left: Size Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono uppercase text-stone-500 font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-stone-700" />
              <span>Sizes:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {sizeOptions.map((sz) => {
                const isSelected = selectedSizeFilter === sz;
                return (
                  <button
                    key={sz}
                    id={`size-filter-${sz.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedSizeFilter(sz)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white font-bold shadow-2xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {sz === 'all' ? 'All Sizes' : sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Sorting Selector & Reset */}
          <div className="flex items-center gap-3 self-end lg:self-auto flex-wrap">
            {/* Compare Bar Button if items added */}
            {comparisonList.length > 0 && (
              <button
                id="open-comparison-pill-btn"
                onClick={() => setIsComparisonOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare ({comparisonList.length}/2)</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-500 uppercase flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-700" />
                <span>Sort:</span>
              </span>
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-sans text-stone-800 focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              >
                <option value="featured">Featured (Editorial Curated)</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="newest">New Arrivals First</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                id="clear-all-filters-btn"
                onClick={clearFilters}
                className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-mono transition-colors"
                title="Reset all search, category, and size filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Indicators Bar */}
        {(brandFilter === 'Stöffa' || searchTerm || selectedSizeFilter !== 'all' || selectedOccasion !== 'all' || selectedCategory !== 'All') && (
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-stone-600">
            <span className="text-stone-400">Active Filters:</span>
            {brandFilter === 'Stöffa' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300 font-semibold shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Brand: Stöffa Only ({filteredProducts.length})</span>
                <button
                  onClick={() => setBrandFilter('all')}
                  className="hover:text-amber-950 ml-0.5"
                  title="Show all brands"
                  aria-label="Remove brand filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800">
                <Search className="w-3 h-3 text-stone-500" />
                <span>&ldquo;{searchTerm}&rdquo;</span>
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:text-stone-900"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSizeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800">
                <span>Size: {selectedSizeFilter}</span>
                <button
                  onClick={() => setSelectedSizeFilter('all')}
                  className="hover:text-stone-900"
                  aria-label="Clear size filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedOccasion !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800">
                <span>Occasion: {selectedOccasion}</span>
                <button
                  onClick={() => setSelectedOccasion('all')}
                  className="hover:text-stone-900"
                  aria-label="Clear occasion filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid with Quick Buy buttons */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4 max-w-lg mx-auto shadow-xs">
            <Filter className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="font-serif text-xl text-stone-900">
              {globalSearchMatches.length > 0
                ? `Found ${globalSearchMatches.length} ${globalSearchMatches.length === 1 ? 'piece' : 'pieces'} matching "${searchTerm}" in other categories`
                : 'No matching pieces found'}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              {globalSearchMatches.length > 0
                ? `Your search for "${searchTerm}" matched items in the catalog, but they are currently hidden by active category "${selectedCategory}" or occasion filters.`
                : `We couldn't find any pieces matching "${searchTerm || 'your filters'}". Try searching for "suede", "babouche", "boot", "tote", or "loafer".`}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {globalSearchMatches.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedOccasion('all');
                    setSelectedSizeFilter('all');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>View All {globalSearchMatches.length} Results</span>
                </button>
              )}
              <button
                onClick={clearFilters}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 text-stone-800 text-xs uppercase tracking-widest font-semibold hover:bg-stone-200 border border-stone-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
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

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs />

      {/* Main Content Router */}
      <main className="flex-1">
        {viewMode === 'storefront' && <StorefrontContent />}
        {viewMode === 'admin' && <AdminDashboard />}
        {viewMode === 'affiliate_portal' && <AffiliatePortal />}
      </main>

      {/* Global Modals & Drawers */}
      <ProductModal />
      <ProductComparisonModal />
      <B2BOrderModal />
      <LanguageWarningModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerFooter />
      <QuotaAlertBanner />

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
