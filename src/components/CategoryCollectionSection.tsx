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
  onBackToCollections?: () => void;
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
  onBackToCollections,
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

  // Helper functions for strict classification:
  // Strictly separates shoes from bags: no bags when under shoes, no shoes when in bags
  const isBagProduct = (p: Product): boolean => {
    const cat = (p.category || '').toLowerCase();
    const col = (p.collection || '').toLowerCase();
    const title = (p.title || '').toLowerCase();
    if (cat === 'bags' || col.includes('bags & potlis') || col.includes('bag')) return true;
    if (/\b(bag|bags|potli|potlis|clutch|clutches|tote|totes|handbag|handbags)\b/i.test(title)) {
      if (!title.includes('baguette flats') && !title.includes('baguette low') && !title.includes('baguette high')) {
        return true;
      }
    }
    return false;
  };

  const isShoeProduct = (p: Product): boolean => !isBagProduct(p);

  // Normalize categoryTitle matching
  const normalizedTitle = categoryTitle.toLowerCase().trim();

  // Filter products matching this section using authentic Stöffa Style attributes
  const matchingProducts = products.filter((p) => {
    const pCat = p.category.toLowerCase();
    const pCollection = (p.collection || '').toLowerCase();
    const pTitle = p.title.toLowerCase();
    const pColors = p.colors.map((c) => c.name.toLowerCase());
    const pSubtitle = (p.subtitle || '').toLowerCase();
    const occs = (p.occasions || []).map((o) => o.toLowerCase());
    const badge = (p.badge || '').toLowerCase();

    if (normalizedTitle === 'all' || normalizedTitle === 'home') return true;

    // ==========================================
    // 1. STRICT SHOE SUB-MENUS (NO BAGS ALLOWED)
    // ==========================================

    // 1a. Low wedges - 2.5 inch
    if (
      normalizedTitle.includes('2.5') ||
      normalizedTitle.includes('low wedge') ||
      normalizedTitle === 'low wedges - 2.5 inch'
    ) {
      if (!isShoeProduct(p)) return false;
      return (
        pCollection.includes('low wedge') ||
        pTitle.includes('2.5') ||
        pTitle.includes('2.25') ||
        pCollection.includes('low') ||
        (pTitle.includes('low') && pTitle.includes('wedge'))
      );
    }

    // 1b. Higher wedge - 4.25 inch (check BEFORE high wedges to avoid collisions)
    if (
      normalizedTitle.includes('4.25') ||
      normalizedTitle.includes('higher wedge') ||
      normalizedTitle === 'higher wedge - 4.25 inch'
    ) {
      if (!isShoeProduct(p)) return false;
      return (
        pCollection.includes('higher wedge') ||
        pTitle.includes('4.25') ||
        pTitle.includes('higher')
      );
    }

    // 1c. High wedges - 3.5 inch
    if (
      normalizedTitle.includes('3.5') ||
      normalizedTitle.includes('high wedge') ||
      normalizedTitle === 'high wedges - 3.5 inch'
    ) {
      if (!isShoeProduct(p)) return false;
      return (
        (pCollection.includes('high wedge') ||
          pTitle.includes('3.5') ||
          pTitle.includes('high k') ||
          pTitle.includes('classic high') ||
          (pTitle.includes('high') && pTitle.includes('wedge'))) &&
        !pCollection.includes('higher') &&
        !pTitle.includes('higher') &&
        !pTitle.includes('4.25')
      );
    }

    // 1d. Block Heels
    if (normalizedTitle.includes('block') || normalizedTitle === 'block heels') {
      if (!isShoeProduct(p)) return false;
      return pCollection.includes('block') || pTitle.includes('block');
    }

    // 1e. Flats (Strictly flats and loafers, no bags like Border Flat Bag)
    if (
      normalizedTitle === 'flats' ||
      normalizedTitle.includes('kolhapuri') ||
      normalizedTitle === 'flats & loafers'
    ) {
      if (!isShoeProduct(p)) return false;
      return (
        pCollection.includes('flat') ||
        pCat.includes('flat') ||
        pTitle.includes('flat') ||
        pTitle.includes('kolhapuri')
      );
    }

    // 1f. Shoes / Footwear general category (ALL shoes, STRICTLY NO bags)
    if (normalizedTitle === 'shoes' || normalizedTitle === 'footwear') {
      return isShoeProduct(p);
    }

    // ==========================================
    // 2. STRICT BAGS & ACCESSORIES (NO SHOES)
    // ==========================================
    if (
      normalizedTitle === 'bags' ||
      normalizedTitle === 'bags & potlis' ||
      normalizedTitle.includes('potli') ||
      normalizedTitle.includes('clutch') ||
      normalizedTitle.includes('tote') ||
      normalizedTitle === 'accessories'
    ) {
      return isBagProduct(p);
    }

    // ==========================================
    // 3. THE 14 USER-REQUESTED CURATED COLLECTIONS
    // ==========================================

    // Collection 1: Bride on Her Feet (Comfortable bridal footwear for standing & dancing)
    if (normalizedTitle === 'bride on her feet') {
      if (!isShoeProduct(p)) return false;
      return (
        badge.includes('bridal') ||
        pTitle.includes('bridal') ||
        pTitle.includes('crystal') ||
        pCollection.includes('low wedge') ||
        pCollection.includes('kolhapuri flats') ||
        pColors.some((c) => ['champagne', 'gold', 'light gold', 'rose gold', 'silver', 'white'].includes(c))
      ) && (occs.includes('wedding') || pCollection.includes('wedge') || pCollection.includes('flat'));
    }

    // Collection 2: Mother of the Bride (Refined low wedges, block heels, metallic accessories)
    if (normalizedTitle === 'mother of the bride') {
      return (
        pCollection.includes('low wedge') ||
        pCollection.includes('block') ||
        pTitle.includes('border clutch') ||
        pTitle.includes('border flat bag') ||
        pColors.some((c) => ['champagne', 'pewter', 'antique', 'silver', 'gold', 'light gold'].includes(c))
      ) && (pCollection.includes('low') || pCollection.includes('block') || isBagProduct(p) || pTitle.includes('classic'));
    }

    // Collection 3: The Bridesmaid Edit (Festive flats, block heels, shimmering potlis)
    if (normalizedTitle === 'the bridesmaid edit') {
      return (
        pCollection.includes('kolhapuri flats') ||
        pCollection.includes('block') ||
        pTitle.includes('potli') ||
        pTitle.includes('baguette') ||
        pColors.some((c) => ['rose gold', 'champagne', 'light gold', 'pink', 'gold'].includes(c))
      );
    }

    // Collection 4: The Destination Bride (Outdoor/resort wedding wedges, lawn/sand-friendly, braided)
    if (normalizedTitle === 'the destination bride') {
      return (
        pCollection.includes('wedge') &&
        (pColors.some((c) => ['gold', 'rose gold', 'champagne', 'light gold', 'tan', 'camel'].includes(c)) ||
          pTitle.includes('bridal') ||
          pTitle.includes('braided') ||
          pTitle.includes('tassel') ||
          occs.includes('resort'))
      );
    }

    // Collection: The Sangeet Ceremony (Dance-floor comfort, festive sparkle, low wedges, block heels, shimmering potlis)
    if (normalizedTitle === 'the sangeet ceremony' || normalizedTitle.includes('sangeet')) {
      return (
        pCollection.includes('low wedge') ||
        pCollection.includes('block') ||
        pCollection.includes('kolhapuri flats') ||
        pTitle.includes('crystal') ||
        pTitle.includes('baguette') ||
        pTitle.includes('potli') ||
        pTitle.includes('clutch')
      ) && (
        pColors.some((c) => ['gold', 'rose gold', 'champagne', 'light gold', 'silver', 'pewter', 'antique gold', 'pink'].includes(c)) ||
        occs.includes('wedding') ||
        occs.includes('festive') ||
        occs.includes('party') ||
        isBagProduct(p)
      );
    }

    // Collection 5: Something Blue (Navy, ink, blue tones & icy silver crystal pairings)
    if (normalizedTitle === 'something blue') {
      return (
        pColors.some((c) => c.includes('navy') || c.includes('blue') || c.includes('ink') || c.includes('silver') || c.includes('pewter')) ||
        pTitle.includes('navy') ||
        pTitle.includes('ink') ||
        pTitle.includes('blue') ||
        pTitle.includes('silver') ||
        pTitle.includes('pewter')
      );
    }

    // Collection 6: Prom Night (High wedges, baguette crystal flats & heels, glam clutches)
    if (normalizedTitle === 'prom night') {
      return (
        pCollection.includes('high wedge') ||
        pCollection.includes('higher wedge') ||
        pTitle.includes('crystal') ||
        pTitle.includes('baguette') ||
        pTitle.includes('clutch') ||
        pColors.some((c) => ['rose gold', 'silver', 'gold', 'light gold'].includes(c))
      );
    }

    // Collection 7: Quinceañera Glam (Princess crystal embellishments, rose gold, celebratory potlis)
    if (
      normalizedTitle === 'quinceañera glam' ||
      normalizedTitle.includes('quinceanera') ||
      normalizedTitle.includes('quinceañera')
    ) {
      return (
        pTitle.includes('crystal') ||
        pTitle.includes('embellished') ||
        pTitle.includes('potli') ||
        pColors.some((c) => ['rose gold', 'gold', 'light gold', 'champagne'].includes(c))
      );
    }

    // Collection 8: Cruise Ready (Effortless resort comfort, braided slide flats, 2.5" wedges, warm neutrals)
    if (normalizedTitle === 'cruise ready') {
      return (
        pCollection.includes('low wedge') ||
        pCollection.includes('kolhapuri flats') ||
        pTitle.includes('braided') ||
        pTitle.includes('tassel') ||
        pColors.some((c) => ['camel', 'tan', 'taupe', 'gold', 'light gold'].includes(c))
      );
    }

    // Collection 9: The Holiday Edit (Festive golds, rich pewter, black crystal, statement potlis)
    if (normalizedTitle === 'the holiday edit') {
      return (
        pTitle.includes('potli') ||
        pTitle.includes('crystal') ||
        pColors.some((c) => ['black', 'pewter', 'gold', 'antique'].includes(c)) ||
        badge.includes('best')
      );
    }

    // Collection 10: Garden Party (Grass-stable block heels, low wedges, airy flats, neutral tones)
    if (normalizedTitle === 'garden party') {
      return (
        pCollection.includes('block') ||
        pCollection.includes('low wedge') ||
        (pCollection.includes('flat') &&
          (pColors.some((c) => ['camel', 'tan', 'taupe', 'light gold', 'rose gold'].includes(c)) ||
            pTitle.includes('braided')))
      );
    }

    // Collection 11: Red Carpet Ready (Celebrity-worn statement pieces, crystal drama, sculptural wedges)
    if (normalizedTitle === 'red carpet ready') {
      return (
        badge.includes('worn by') ||
        pTitle.includes('crystal') ||
        pCollection.includes('higher wedge') ||
        pSubtitle.includes('worn by') ||
        badge.includes('bridal edit')
      );
    }

    // Collection 12: Christmas Brunch (Warm festive metallics, champagne flats, border holiday bags & block heels)
    if (normalizedTitle === 'christmas brunch') {
      return (
        pCollection.includes('block') ||
        (pCollection.includes('flat') && pColors.some((c) => ['gold', 'champagne', 'light gold'].includes(c))) ||
        pTitle.includes('border') ||
        pTitle.includes('potli')
      );
    }

    // Collection 13: Girls' Night Out (Chic block heels, metallic flats, party clutches & potlis)
    if (normalizedTitle === "girls' night out" || normalizedTitle.includes('girls')) {
      return (
        pCollection.includes('block') ||
        isBagProduct(p) ||
        pTitle.includes('baguette') ||
        pColors.some((c) => ['black', 'rose gold', 'silver', 'gold'].includes(c))
      );
    }

    // Collection 14: Date Night (Romantic 2.5" wedges, sleek block heels, black, rose gold & clutches)
    if (normalizedTitle === 'date night') {
      return (
        pCollection.includes('low wedge') ||
        pCollection.includes('block') ||
        isBagProduct(p) ||
        pColors.some((c) => ['black', 'rose gold', 'champagne', 'pewter'].includes(c))
      );
    }

    // ==========================================
    // 4. GENERAL CATEGORIES & EDITORIAL
    // ==========================================

    // Collections overview
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

    // Just In / New Arrivals
    if (
      normalizedTitle.includes('latest') ||
      normalizedTitle.includes('new arrival') ||
      normalizedTitle.includes('just in')
    ) {
      return p.isNewArrival || Boolean(p.badge?.includes('NEW'));
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

  const getCategorySubtitle = (title: string): string => {
    const norm = title.toLowerCase().trim();
    if (norm === 'flats' || norm.includes('kolhapuri')) {
      return 'Handcrafted artisanal Kolhapuri flats & slides • Pure comfort on everyday feet';
    }
    if (norm.includes('2.5') || norm.includes('low wedge')) {
      return 'Signature 2.5" low wedges with dual-density memory foam for effortless all-day wear';
    }
    if (norm.includes('3.5') || norm.includes('high wedge')) {
      return 'Sculptural 3.5" high wedges pairing classic elevation with balanced comfort';
    }
    if (norm.includes('4.25') || norm.includes('higher wedge')) {
      return 'Statement 4.25" higher wedges engineered for celebratory height and stability';
    }
    if (norm.includes('block')) {
      return 'Handcrafted stable block heels offering contemporary structure and timeless poise';
    }
    if (norm === 'shoes' || norm === 'footwear') {
      return 'Exquisite handcrafted Indian footwear • Wedges, block heels, and Kolhapuri flats';
    }
    if (norm === 'bags' || norm.includes('bag') || norm.includes('potli')) {
      return 'Intricately embroidered border clutches, potlis, and handcrafted luxury evening bags';
    }
    if (norm === 'bride on her feet') {
      return 'Made for the long day, the dance floor and everything after — from the aisle to the after party.';
    }
    if (norm === 'mother of the bride') {
      return 'All the glam, with comfort for the long hours';
    }
    if (norm === 'the bridesmaid edit') {
      return 'Made to complement the bride, without holding you back from the dance floor.';
    }
    if (norm === 'the destination bride') {
      return 'Glamour that travels — from the ceremony to cocktails by the sea.';
    }
    if (norm === 'the sangeet ceremony' || norm.includes('sangeet')) {
      return 'Color and dance a match made in heaven.';
    }
    if (norm === 'something blue') {
      return 'A little blue, a lot of personality — your something blue, with a twist';
    }
    if (norm === 'prom night') {
      return 'The shoes that make the entrance — and keep you dancing all night';
    }
    if (norm === 'quinceañera glam' || norm.includes('quinceanera') || norm.includes('quinceañera')) {
      return 'For her big moment, with the glamour to match every dance.';
    }
    if (norm === 'cruise ready') {
      return 'From daytime exploring to sunset cocktails — one wardrobe, every occasion';
    }
    if (norm === 'the holiday edit') {
      return 'Lightweight in your baggage and versatile glam on your feet';
    }
    if (norm === 'garden party') {
      return 'Glam on the lawns , Height without the stumble.';
    }
    if (norm === 'red carpet ready') {
      return 'Make the entrance. Own the moment. Stay out late.';
    }
    if (norm === 'christmas brunch') {
      return 'Sparkle in comfort indoors,  as hostess or guest.';
    }
    if (norm === "girls' night out" || norm.includes('girls')) {
      return 'Made for the plans that start with “just one drink” and end much later';
    }
    if (norm === 'date night') {
      return 'A little extra glamour, wherever the night takes you.';
    }
    return 'Handcrafted luxury footwear & accessories • Exclusively priced in USD';
  };

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
        
        {/* Navigation Breadcrumb / Back Action */}
        <div className="flex items-center gap-3 mb-4">
          {onBackToCollections && (
            <button
              id="back-to-collections-directory-btn"
              onClick={onBackToCollections}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Collections</span>
            </button>
          )}
          {onBackToHome && (
            <button
              id="back-to-home-btn"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-[0.14em] text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <span>Home</span>
            </button>
          )}
        </div>

        {/* Centered Collection Title matching the screenshot */}
        <div className="text-center my-6 sm:my-10 space-y-2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-950 font-bold tracking-tight">
            {categoryTitle}
          </h1>
          <p className="text-sm sm:text-base text-stone-700 font-semibold max-w-2xl mx-auto">
            {getCategorySubtitle(categoryTitle)}
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
