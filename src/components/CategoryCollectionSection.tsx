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

    if (normalizedTitle === 'all' || normalizedTitle === 'home') return true;

    // 1. Low wedges - 2.5 inch (from handwritten note)
    if (
      normalizedTitle.includes('2.5') ||
      normalizedTitle.includes('low wedge') ||
      normalizedTitle === 'low wedges - 2.5 inch'
    ) {
      return (
        pCollection.includes('low wedge') ||
        pTitle.includes('2.5') ||
        pTitle.includes('low') ||
        pCollection.includes('low')
      );
    }

    // 3. Higher wedge - 4.25 inch (check BEFORE high wedges to avoid collisions)
    if (
      normalizedTitle.includes('4.25') ||
      normalizedTitle.includes('higher wedge') ||
      normalizedTitle === 'higher wedge - 4.25 inch'
    ) {
      return (
        pCollection.includes('higher wedge') ||
        pTitle.includes('4.25') ||
        pTitle.includes('higher')
      );
    }

    // 2. High wedges - 3.5 inch (from handwritten note)
    if (
      normalizedTitle.includes('3.5') ||
      normalizedTitle.includes('high wedge') ||
      normalizedTitle === 'high wedges - 3.5 inch'
    ) {
      return (
        (pCollection.includes('high wedge') ||
          pTitle.includes('3.5') ||
          pTitle.includes('high k') ||
          pTitle.includes('classic high')) &&
        !pCollection.includes('higher') &&
        !pTitle.includes('higher') &&
        !pTitle.includes('4.25')
      );
    }

    // 4. Block Heels (from handwritten note)
    if (normalizedTitle.includes('block') || normalizedTitle === 'block heels') {
      return pCollection.includes('block') || pTitle.includes('block');
    }

    // 5. Flats (from handwritten note)
    if (
      normalizedTitle.includes('flat') ||
      normalizedTitle.includes('kolhapuri') ||
      normalizedTitle === 'flats'
    ) {
      return (
        pCollection.includes('flat') ||
        pCat.includes('flat') ||
        pTitle.includes('flat') ||
        pTitle.includes('kolhapuri')
      );
    }

    // Shoes (All Footwear)
    if (normalizedTitle === 'shoes' || normalizedTitle === 'footwear') {
      return !pCat.includes('bag') && !pTitle.includes('bag') && !pTitle.includes('potli');
    }

    // Bags & Handcrafted Totes
    if (normalizedTitle.includes('bag') || normalizedTitle.includes('tote') || normalizedTitle.includes('potli')) {
      return (
        pCat.includes('bag') ||
        pCat.includes('accessories') ||
        pTitle.includes('bag') ||
        pTitle.includes('potli') ||
        pTitle.includes('clutch') ||
        pTitle.includes('tote')
      );
    }

    // Just In / Latest Arrivals
    if (
      normalizedTitle.includes('latest') ||
      normalizedTitle.includes('new arrival') ||
      normalizedTitle.includes('just in')
    ) {
      return p.isNewArrival || Boolean(p.badge?.includes('NEW'));
    }

    // Collections
    if (normalizedTitle === 'collections') {
      return true;
    }

    // Ready to Ship
    if (normalizedTitle.includes('ready to ship') || normalizedTitle.includes('ready')) {
      return p.inventory ? Object.values(p.inventory).some((qty) => Number(qty) > 0) : true;
    }

    // Sale
    if (normalizedTitle.includes('sale')) {
      return (
        Boolean(p.originalPriceUSD && p.originalPriceUSD > p.priceUSD) ||
        Boolean(p.badge?.includes('SALE') || p.badge?.includes('OFF')) ||
        p.priceUSD <= 80
      );
    }

    // Heels & Wedges general
    if (normalizedTitle.includes('heel') || normalizedTitle.includes('wedge')) {
      return (
        pCat.includes('heel') ||
        pCat.includes('shoe') ||
        pCollection.includes('wedge') ||
        pCollection.includes('block') ||
        pTitle.includes('wedge') ||
        pTitle.includes('heel') ||
        pTitle.includes('pump')
      );
    }

    // Bridal Wedges
    if (normalizedTitle.includes('bridal')) {
      return (
        pTitle.includes('crystal') ||
        pTitle.includes('bridal') ||
        pTitle.includes('champagne') ||
        pTitle.includes('gold') ||
        pTitle.includes('rose gold') ||
        pTitle.includes('silver')
      );
    }

    // Occasion Collection
    if (normalizedTitle.includes('occasion')) {
      return (
        pTitle.includes('crystal') ||
        pTitle.includes('bridal') ||
        pTitle.includes('embellished') ||
        pOccasionsMatch(p, 'wedding') ||
        pOccasionsMatch(p, 'prom') ||
        pOccasionsMatch(p, 'cocktail') ||
        pOccasionsMatch(p, 'festive')
      );
    }

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
        <div className="text-center my-6 sm:my-10 space-y-2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-950 font-bold tracking-tight">
            {categoryTitle}
          </h1>
          <p className="text-sm sm:text-base text-stone-700 font-semibold max-w-2xl mx-auto">
            Handcrafted luxury footwear &amp; accessories • Exclusively priced in USD
          </p>
        </div>

        {/* Collection Status and Sort Bar (Filter removed completely as requested) */}
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-4 mb-8">
          {/* Left: Total Pieces Count */}
          <div className="text-sm sm:text-base font-bold uppercase tracking-[0.14em] text-stone-900">
            <span>{displayProducts.length} Exclusive Styles</span>
          </div>

          {/* Right: Featured Sort Menu */}
          <div className="relative">
            <button
              id="category-sort-btn"
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="flex items-center gap-2 text-sm sm:text-base text-stone-950 hover:text-black font-bold transition-colors cursor-pointer"
            >
              <span>{getSortLabel(sortBy)}</span>
              <ChevronDown className="w-4 h-4 text-stone-900" />
            </button>

            {isSortMenuOpen && (
              <div className="absolute end-0 top-full mt-2 w-52 bg-white border-2 border-stone-300 shadow-xl py-2 z-40 rounded-xl">
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
                    className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors block cursor-pointer ${
                      sortBy === opt.value
                        ? 'bg-stone-100 text-stone-950 font-extrabold'
                        : 'text-stone-800 hover:bg-stone-50 hover:text-stone-950'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

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
                       <div className="absolute top-2.5 left-2.5 bg-[#249ea0] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm">
                        {discountPercent}% off
                      </div>
                    )}
                  </div>

                  {/* Product Metadata formatted with bigger and darker fonts */}
                  <div className="pt-3.5 pb-2">
                    {/* Title in Uppercase tracking format: e.g. CLASSIC HIGH K WEDGE / INK */}
                    <div className="text-sm sm:text-base md:text-lg text-stone-950 tracking-[0.06em] uppercase font-bold line-clamp-1 group-hover:text-amber-950 transition-colors">
                      {displayTitle.mainTitle} {displayTitle.colorTitle ? `/ ${displayTitle.colorTitle}` : ''}
                    </div>

                    {/* Price line with bigger and darker fonts */}
                    <div className="flex items-center flex-wrap gap-2 text-base sm:text-lg md:text-xl mt-1.5">
                      <span className="text-stone-950 font-extrabold tracking-tight">
                        {formatPrice(product.priceUSD)}
                      </span>
                      {hasOriginalPrice ? (
                        <>
                          <span className="text-stone-400 line-through text-xs sm:text-sm font-semibold">
                            {formatPrice(originalPrice)}
                          </span>
                          <span className="text-rose-700 text-xs sm:text-sm font-extrabold tracking-wider bg-rose-50 px-1.5 py-0.5 rounded">
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
