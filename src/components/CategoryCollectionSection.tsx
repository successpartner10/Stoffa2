import React, { useState } from 'react';
import {
  ChevronDown,
  SlidersHorizontal,
  X,
  Check,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { Product } from '../types';

interface CategoryCollectionSectionProps {
  categoryTitle: string;
  onBackToHome?: () => void;
}

export function formatStoffaDisplayTitle(product: Product): { mainTitle: string; colorTitle: string } {
  const colorName = product.colors && product.colors[0] ? product.colors[0].name.toUpperCase() : '';
  let upper = product.title.toUpperCase();

  // Clean brand noise
  upper = upper.replace(/^STOFFA\s+STYLE\s+/i, '').replace(/^STOFFA\s+/i, '');

  if (upper.includes(' - ')) {
    const parts = upper.split(' - ');
    return { mainTitle: parts[0].trim(), colorTitle: parts[1]?.trim() || colorName };
  }

  if (colorName && upper.endsWith(` ${colorName}`)) {
    const base = upper.substring(0, upper.length - colorName.length - 1).trim();
    return { mainTitle: base, colorTitle: colorName };
  }

  return { mainTitle: upper, colorTitle: colorName };
}

export const CategoryCollectionSection: React.FC<CategoryCollectionSectionProps> = ({
  categoryTitle,
  onBackToHome,
}) => {
  const {
    products,
    formatPrice,
    setSelectedProductModal,
    sortBy,
    setSortBy,
    selectedSizeFilter,
    setSelectedSizeFilter,
    setSelectedCategory,
    activeCampaign,
  } = useCommerce();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>('all');
  const [selectedHeelFilter, setSelectedHeelFilter] = useState<string>('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>('all');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  // Normalize categoryTitle matching
  const normalizedTitle = categoryTitle.toLowerCase().trim();

  // Filter products matching this section using authentic Stöffa Style attributes
  const matchingProducts = products.filter((p) => {
    const pCat = p.category.toLowerCase();
    const pCollection = (p.collection || '').toLowerCase();
    const pTitle = p.title.toLowerCase();
    const pColors = p.colors.map((c) => c.name.toLowerCase());
    const pSubtitle = (p.subtitle || '').toLowerCase();

    if (normalizedTitle === 'all') return true;

    // 1. Resort '26 / Resort Edit
    if (normalizedTitle.includes('resort')) {
      return (
        pCollection.includes('wedge') ||
        pCat.includes('shoe') ||
        pColors.some((c) => ['gold', 'champagne', 'rose gold', 'pewter', 'silver', 'camel', 'taupe', 'bronze'].includes(c)) ||
        pTitle.includes('wedge') ||
        pTitle.includes('flat')
      );
    }

    // 2. The Navy Edit
    if (normalizedTitle.includes('navy') || normalizedTitle.includes('ink')) {
      return (
        pColors.some((c) => c.includes('navy') || c.includes('ink') || c.includes('blue')) ||
        pTitle.includes('ink') ||
        pTitle.includes('navy') ||
        pTitle.includes('blue')
      );
    }

    // 3. Soft Neutrals
    if (normalizedTitle.includes('neutral')) {
      return (
        pColors.some((c) => ['taupe', 'camel', 'blush', 'cork', 'champagne', 'gold', 'grey', 'gray'].some((n) => c.includes(n))) ||
        pTitle.includes('taupe') ||
        pTitle.includes('camel') ||
        pTitle.includes('skin') ||
        pTitle.includes('cork')
      );
    }

    // 4. Kaftans / Resort Slip-on Pairings
    if (normalizedTitle.includes('kaftan')) {
      return (
        pTitle.includes('tassel') ||
        pTitle.includes('skin') ||
        pTitle.includes('classic') ||
        pCollection.includes('flat') ||
        pCollection.includes('low wedge')
      );
    }

    // 5. Beach-to-Table Dresses / Dresses
    if (normalizedTitle.includes('dress')) {
      return (
        pCollection.includes('high wedge') ||
        pCollection.includes('higher wedge') ||
        pCollection.includes('block') ||
        pTitle.includes('high k wedge') ||
        pTitle.includes('block heel')
      );
    }

    // 6. Katie Couric Collection / Celebrity Edit
    if (normalizedTitle.includes('katie') || normalizedTitle.includes('celebrity')) {
      return (
        Boolean(p.badge?.includes('WORN')) ||
        pSubtitle.includes('worn by') ||
        pSubtitle.includes('madhuri') ||
        pSubtitle.includes('kareena') ||
        pSubtitle.includes('alia') ||
        p.isBestSeller
      );
    }

    // 7. What to Pack for Vacation
    if (normalizedTitle.includes('pack') || normalizedTitle.includes('vacation')) {
      return (
        pCollection.includes('flat') ||
        pCollection.includes('low wedge') ||
        pCat.includes('bag') ||
        pTitle.includes('flat') ||
        pTitle.includes('cork') ||
        pTitle.includes('potli')
      );
    }

    // 8. Eyelets / Embroidered & Zardozi
    if (normalizedTitle.includes('eyelet')) {
      return (
        pTitle.includes('border') ||
        pTitle.includes('tassel') ||
        pTitle.includes('braid') ||
        pTitle.includes('multi') ||
        pCat.includes('bag')
      );
    }

    // 9. Occasion / Bridal / Crystal
    if (normalizedTitle.includes('occasion')) {
      return (
        pTitle.includes('crystal') ||
        pTitle.includes('bridal') ||
        pTitle.includes('embellished') ||
        pOccasionsMatch(p, 'wedding') ||
        pOccasionsMatch(p, 'festive')
      );
    }

    // 10. Labor Day Style Guide
    if (normalizedTitle.includes('labor day')) {
      return (
        pColors.some((c) => ['antique gold', 'pewter', 'slate', 'chocolate', 'black', 'maroon'].some((n) => c.includes(n))) ||
        pTitle.includes('antique') ||
        pTitle.includes('pewter') ||
        pTitle.includes('black')
      );
    }

    // 11. Just In / New Arrivals
    if (normalizedTitle.includes('just in') || normalizedTitle.includes('new arrival')) {
      return p.isNewArrival;
    }

    // 12. Best Sellers
    if (normalizedTitle.includes('best seller')) {
      return p.isBestSeller;
    }

    // 13. Separates / Everyday Classics
    if (normalizedTitle.includes('separate')) {
      return pCollection.includes('flat') || pCollection.includes('low wedge') || pTitle.includes('flat');
    }

    // 14. Accessories / Bags & Potlis
    if (normalizedTitle.includes('accessori') || normalizedTitle.includes('bag')) {
      return pCat.includes('bag') || pTitle.includes('potli') || pTitle.includes('clutch') || pTitle.includes('tote');
    }

    // 15. Mommy & Me
    if (normalizedTitle.includes('mommy')) {
      return pTitle.includes('bridal') || pTitle.includes('classic') || pTitle.includes('crystal');
    }

    // 16. Men's
    if (normalizedTitle.includes("men")) {
      return pTitle.includes('flat') || pColors.some((c) => ['black', 'taupe', 'camel', 'navy', 'ink'].includes(c));
    }

    // 17. Sale
    if (normalizedTitle.includes('sale')) {
      return Boolean(p.originalPriceUSD && p.originalPriceUSD > p.priceUSD) || Boolean(p.badge?.includes('SALE') || p.badge?.includes('OFF'));
    }

    // Direct text search across title, category, collection, materials
    return (
      pCat.includes(normalizedTitle) ||
      pCollection.includes(normalizedTitle) ||
      pTitle.includes(normalizedTitle) ||
      pColors.some((c) => c.includes(normalizedTitle))
    );
  });

  function pOccasionsMatch(p: Product, occ: string): boolean {
    return Array.isArray(p.occasions) && p.occasions.includes(occ as any);
  }

  // Fallback to all if matching filtered empty
  const baseList = matchingProducts.length > 0 ? matchingProducts : products;

  // Apply Heel Height filter
  let displayProducts = baseList;
  if (selectedHeelFilter !== 'all') {
    displayProducts = displayProducts.filter((p) => {
      const col = (p.collection || '').toLowerCase();
      const title = p.title.toLowerCase();
      if (selectedHeelFilter === 'flats') return col.includes('flat') || title.includes('flat');
      if (selectedHeelFilter === 'low-wedge') return col.includes('low') || title.includes('2.25') || title.includes('low');
      if (selectedHeelFilter === 'high-wedge') return col.includes('3.5') || (title.includes('high') && !title.includes('higher'));
      if (selectedHeelFilter === 'higher-wedge') return col.includes('4.25') || title.includes('higher') || title.includes('4.5');
      if (selectedHeelFilter === 'block-heel') return col.includes('block') || title.includes('block');
      if (selectedHeelFilter === 'bags') return p.category.toLowerCase().includes('bag') || title.includes('potli');
      return true;
    });
  }

  // Apply color filter
  if (selectedColorFilter !== 'all') {
    displayProducts = displayProducts.filter((p) =>
      p.colors.some((c) => c.name.toLowerCase().includes(selectedColorFilter.toLowerCase()))
    );
  }

  // Apply size filter
  if (selectedSizeFilter !== 'all') {
    displayProducts = displayProducts.filter((p) => p.sizes.includes(selectedSizeFilter));
  }

  // Apply price filter
  if (selectedPriceFilter !== 'all') {
    displayProducts = displayProducts.filter((p) => {
      if (selectedPriceFilter === 'under-50') return p.priceUSD < 50;
      if (selectedPriceFilter === '50-75') return p.priceUSD >= 50 && p.priceUSD <= 75;
      if (selectedPriceFilter === 'over-75') return p.priceUSD > 75;
      return true;
    });
  }

  // Apply sorting
  displayProducts = [...displayProducts].sort((a, b) => {
    if (sortBy === 'price-low-to-high') return a.priceUSD - b.priceUSD;
    if (sortBy === 'price-high-to-low') return b.priceUSD - a.priceUSD;
    if (sortBy === 'newest') {
      if (a.isNewArrival && !b.isNewArrival) return -1;
      if (!a.isNewArrival && b.isNewArrival) return 1;
      return b.id.localeCompare(a.id);
    }
    return 0; // featured
  });

  const activeFiltersCount =
    (selectedColorFilter !== 'all' ? 1 : 0) +
    (selectedSizeFilter !== 'all' ? 1 : 0) +
    (selectedHeelFilter !== 'all' ? 1 : 0) +
    (selectedPriceFilter !== 'all' ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedColorFilter('all');
    setSelectedSizeFilter('all');
    setSelectedHeelFilter('all');
    setSelectedPriceFilter('all');
  };

  const getSortLabel = (sortVal: string) => {
    switch (sortVal) {
      case 'price-low-to-high':
        return 'Price: Low to High';
      case 'price-high-to-low':
        return 'Price: High to Low';
      case 'newest':
        return 'Date: New to Old';
      case 'best-selling':
        return 'Best Selling';
      default:
        return 'Featured';
    }
  };

  return (
    <section id="category-products-section" className="w-full bg-white py-6 sm:py-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Collection Title matching the screenshot */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-800 text-center font-normal tracking-wide my-4 sm:my-8">
          {categoryTitle}
        </h1>

        {/* Filter and Sort Row (Filter > on left, Featured ⌄ on right) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-8">
          {/* Left: Filter Toggle */}
          <button
            id="category-filter-toggle-btn"
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-950 font-medium transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
            <span>Filter {activeFiltersCount > 0 ? `(${activeFiltersCount})` : '>'}</span>
          </button>

          {/* Right: Featured Sort Menu */}
          <div className="relative">
            <button
              id="category-sort-btn"
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="flex items-center gap-1 text-xs text-slate-700 hover:text-slate-950 font-medium transition-colors cursor-pointer"
            >
              <span>{getSortLabel(sortBy)}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isSortMenuOpen && (
              <div className="absolute end-0 top-full mt-1.5 w-44 bg-white border border-slate-200 shadow-lg py-1.5 z-40 animate-in fade-in">
                {[
                  { value: 'featured', label: 'Featured' },
                  { value: 'best-selling', label: 'Best Selling' },
                  { value: 'price-low-to-high', label: 'Price: Low to High' },
                  { value: 'price-high-to-low', label: 'Price: High to Low' },
                  { value: 'newest', label: 'Date: New to Old' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value as any);
                      setIsSortMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors block cursor-pointer ${
                      sortBy === opt.value
                        ? 'bg-slate-50 font-semibold text-[#0d3b46]'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Drawer / Expandable Options */}
        {isFilterDrawerOpen && (
          <div className="mb-8 p-5 rounded-xl bg-[#faf9f6] border border-slate-200/80 shadow-2xs space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-800">
                Refine {categoryTitle} ({displayProducts.length} pieces)
              </span>
              <button
                onClick={resetAllFilters}
                className="text-xs text-slate-600 hover:text-slate-950 underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
              {/* Heel Height */}
              <div>
                <span className="text-slate-500 uppercase tracking-wider block mb-2 font-medium text-[10px]">
                  Silhouette / Height
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Heights' },
                    { id: 'high-wedge', label: 'High Wedge (3.5")' },
                    { id: 'higher-wedge', label: 'Higher Wedge (4.25")' },
                    { id: 'low-wedge', label: 'Low Wedge (2.25")' },
                    { id: 'flats', label: 'Flats' },
                    { id: 'block-heel', label: 'Block Heels' },
                    { id: 'bags', label: 'Potlis & Bags' },
                  ].map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHeelFilter(h.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer border ${
                        selectedHeelFilter === h.id
                          ? 'bg-[#0d3b46] text-white border-[#0d3b46] font-medium'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <span className="text-slate-500 uppercase tracking-wider block mb-2 font-medium text-[10px]">
                  Color Shade
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'gold', 'champagne', 'rose gold', 'silver', 'pewter', 'black', 'taupe', 'navy', 'camel', 'maroon'].map((clr) => (
                    <button
                      key={clr}
                      onClick={() => setSelectedColorFilter(clr)}
                      className={`px-2.5 py-1 rounded-md text-[11px] capitalize transition-all cursor-pointer border ${
                        selectedColorFilter === clr
                          ? 'bg-[#0d3b46] text-white border-[#0d3b46] font-medium'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <span className="text-slate-500 uppercase tracking-wider block mb-2 font-medium text-[10px]">
                  Shoe Size
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Sizes' },
                    { id: '36 (US 5.5)', label: '36 (5.5)' },
                    { id: '37 (US 6.5)', label: '37 (6.5)' },
                    { id: '38 (US 7.5)', label: '38 (7.5)' },
                    { id: '39 (US 8.5)', label: '39 (8.5)' },
                    { id: '40 (US 9.5)', label: '40 (9.5)' },
                    { id: '41 (US 10.5)', label: '41 (10.5)' },
                  ].map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSizeFilter(sz.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer border ${
                        selectedSizeFilter === sz.id
                          ? 'bg-[#0d3b46] text-white border-[#0d3b46] font-medium'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <span className="text-slate-500 uppercase tracking-wider block mb-2 font-medium text-[10px]">
                  Price
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'under-50', label: 'Under $50' },
                    { id: '50-75', label: '$50 - $75' },
                    { id: 'over-75', label: 'Over $75' },
                  ].map((pr) => (
                    <button
                      key={pr.id}
                      onClick={() => setSelectedPriceFilter(pr.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer border ${
                        selectedPriceFilter === pr.id
                          ? 'bg-[#0d3b46] text-white border-[#0d3b46] font-medium'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Symmetrical 4-Column Product Grid (Matches Screenshot: 4 items per row, edge balanced) */}
        {displayProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <h3 className="font-serif text-lg text-slate-700">No pieces match this specific combination</h3>
            <p className="text-xs text-slate-500">Try resetting filters to explore all handcrafted Stöffa styles.</p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 bg-[#0d3b46] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {displayProducts.map((product) => {
              const hasOriginalPrice =
                Boolean(product.originalPriceUSD && product.originalPriceUSD > product.priceUSD) ||
                Boolean(activeCampaign) ||
                Boolean(product.badge?.includes('SALE') || product.badge?.includes('OFF'));
              const originalPrice = product.originalPriceUSD || Math.round(product.priceUSD * 1.6);
              const discountPercent = hasOriginalPrice
                ? Math.round(((originalPrice - product.priceUSD) / originalPrice) * 100) || 59
                : 0;

              const displayTitle = formatStoffaDisplayTitle(product);

              return (
                <div
                  key={product.id}
                  id={`cat-product-${product.id}`}
                  onClick={() => setSelectedProductModal(product)}
                  className="group bg-white flex flex-col cursor-pointer transition-all text-left"
                >
                  {/* Image Frame (Aspect 3/4, tall portrait shot as in screenshot) */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f4f2ee]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-104"
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={`${product.title} secondary angle`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}

                    {/* Teal Sale Badge matching screenshot (e.g. 59% off, 60% off) */}
                    {hasOriginalPrice && (
                      <div className="absolute top-2.5 left-2.5 bg-[#249ea0] text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 shadow-xs">
                        {discountPercent}% off
                      </div>
                    )}
                  </div>

                  {/* Product Metadata formatted as in screenshot */}
                  <div className="pt-2.5 pb-1">
                    {/* Title in Uppercase tracking format: e.g. CLASSIC HIGH K WEDGE / INK */}
                    <div className="text-[11px] sm:text-xs text-slate-800 tracking-[0.06em] uppercase font-normal line-clamp-1">
                      {displayTitle.mainTitle} {displayTitle.colorTitle ? `/ ${displayTitle.colorTitle}` : ''}
                    </div>

                    {/* Price line matching screenshot */}
                    <div className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm mt-0.5">
                      <span className="text-slate-900 font-normal">
                        {formatPrice(product.priceUSD)}
                      </span>
                      {hasOriginalPrice ? (
                        <>
                          <span className="text-slate-400 line-through text-xs font-normal">
                            {formatPrice(originalPrice)}
                          </span>
                          <span className="text-[#b91c1c] text-[10px] sm:text-[11px] font-bold tracking-wider">
                            FINAL SALE
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
