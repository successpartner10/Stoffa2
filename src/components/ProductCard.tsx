import React, { useState } from 'react';
import {
  AlertCircle,
  Building2,
  Check,
  Columns2,
  Eye,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    activeCurrency,
    activeCampaign,
    addToCart,
    setSelectedProductModal,
    selectedOccasion,
    setSelectedOccasion,
    comparisonList,
    addToComparison,
    removeFromComparison,
    setIsComparisonOpen,
    setIsB2BModalOpen,
    setB2BTargetProduct,
    t,
  } = useCommerce();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isQuickBuying, setIsQuickBuying] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Collect angles: prefer product.angles if defined, fallback to product.images
  const angles = product.angles && product.angles.length > 0
    ? product.angles
    : product.images.map((url, i) => ({
        url,
        label: i === 0 ? 'Studio Hero' : i === 1 ? 'Profile Angle' : 'Detail View',
        tag: i === 0 ? 'Front' : i === 1 ? 'Side' : 'Detail',
        isAiImage: i >= 3,
      }));

  const activeAngle = angles[activeAngleIndex] || angles[0];
  const isShoes = !product.category.toLowerCase().includes('bag') && !product.category.toLowerCase().includes('tote');

  const discountRate = activeCampaign ? activeCampaign.discountPercent / 100 : 0;
  const discountedPriceUSD = product.priceUSD * (1 - discountRate);

  const isCompared = comparisonList.some((p) => p.id === product.id);

  // Inventory & Low Stock Calculation
  const currentSizeInventory = product.inventory[selectedSize] ?? 4;
  const isLowStock = currentSizeInventory < 3;

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickBuying(true);

    // Add directly to cart without leaving the collection page
    addToCart(product, selectedSize, selectedColor, 1);

    setJustAdded(true);
    setTimeout(() => {
      setIsQuickBuying(false);
      setJustAdded(false);
    }, 1800);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  const handleOpenB2B = (e: React.MouseEvent) => {
    e.stopPropagation();
    setB2BTargetProduct(product);
    setIsB2BModalOpen(true);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProductModal(product)}
      className="group relative rounded-xl bg-white border border-stone-200/90 hover:border-stone-400 hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
    >
      {/* 1 Big Product Image Container - Pure Stöffa photography with no text or box overlay */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <img
          src={activeAngle.url}
          alt={`${product.title} - ${activeAngle.label}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Angles Thumbnail Strip - Pure image thumbnails without text or boxes */}
      {angles.length > 1 && (
        <div
          className="px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-stone-100 bg-stone-50/70"
          onClick={(e) => e.stopPropagation()}
        >
          {angles.map((angle, idx) => {
            const isSelected = activeAngleIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setActiveAngleIndex(idx)}
                onClick={() => setActiveAngleIndex(idx)}
                title={angle.label}
                className={`shrink-0 w-8 h-10 rounded-md overflow-hidden border transition-all ${
                  isSelected
                    ? 'border-stone-900 ring-2 ring-stone-900/30 scale-105 shadow-2xs'
                    : 'border-stone-200 opacity-65 hover:opacity-100 hover:border-stone-400'
                }`}
              >
                <img
                  src={angle.url}
                  alt={angle.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Status Badges in Card Body (Cleanly placed in details, not on image) */}
          {(product.isNewArrival || product.isBestSeller || activeCampaign || isLowStock) && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {product.isNewArrival && (
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-stone-900 text-stone-50">
                  New Arrival
                </span>
              )}
              {product.isBestSeller && (
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-700 text-white">
                  Best Seller
                </span>
              )}
              {activeCampaign && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-emerald-700 text-white">
                  -{activeCampaign.discountPercent}% VIP
                </span>
              )}
              {isLowStock && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" />
                  <span>Low Stock ({currentSizeInventory})</span>
                </span>
              )}
            </div>
          )}

          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="uppercase tracking-wider font-mono font-medium flex items-center gap-1.5">
              <span className="text-stone-900 font-bold bg-stone-100 px-1.5 py-0.5 rounded text-[10px]">
                {product.brand || 'Stöffa'}
              </span>
              <span>{product.category}</span>
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium group-hover:text-stone-700 transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>

          {/* Architectural Occasion Tagging */}
          {product.occasions && product.occasions.length > 0 && (
            <div
              className="mt-2.5 flex items-center gap-1.5 flex-wrap"
              onClick={(e) => e.stopPropagation()}
            >
              {product.occasions.slice(0, 3).map((occId) => {
                const isActive = selectedOccasion === occId;
                return (
                  <button
                    key={occId}
                    onClick={() => setSelectedOccasion(occId)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider transition-colors uppercase ${
                      isActive
                        ? 'bg-stone-900 text-white font-semibold shadow-2xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200/80'
                    }`}
                    title={`Filter by occasion: ${t(`occ_${occId}`) || occId}`}
                  >
                    {t(`occ_${occId}`) || occId}
                  </button>
                );
              })}
              {product.occasions.length > 3 && (
                <span className="text-[10px] font-mono text-stone-400">
                  +{product.occasions.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Occasion Styling Note */}
          {product.occasionNote && (
            <p className="text-[11px] text-stone-500 italic mt-1.5 line-clamp-1 font-light border-l-2 border-stone-300 pl-2">
              {product.occasionNote}
            </p>
          )}
        </div>

        {/* Color Options */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <span className="text-[11px] text-stone-400">Color:</span>
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-stone-900 ring-offset-1 scale-110'
                    : 'border-stone-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Size Selection Pills with inventory indication */}
        <div
          className="flex items-center gap-1.5 flex-wrap pt-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[10px] uppercase font-mono text-stone-400 mr-0.5">Size:</span>
          {product.sizes.map((sz) => {
            const stock = product.inventory[sz] ?? 4;
            return (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors relative ${
                  selectedSize === sz
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 border border-stone-200/80'
                }`}
                title={`${sz}: ${stock < 3 ? `Low Stock (${stock} left)` : 'In Stock'}`}
              >
                <span>{sz}</span>
                {stock < 3 && (
                  <span className="inline-block w-1 h-1 rounded-full bg-amber-500 ml-1 mb-1"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Price & Quick Buy Button */}
        <div className="pt-3 border-t border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col">
            {activeCampaign ? (
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-base font-bold text-emerald-800">
                  {formatPrice(discountedPriceUSD)}
                </span>
                <span className="font-mono text-xs text-stone-400 line-through">
                  {formatPrice(product.priceUSD)}
                </span>
              </div>
            ) : (
              <span className="font-mono text-base font-semibold text-stone-900">
                {formatPrice(product.priceUSD)}
              </span>
            )}
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">
              {activeCurrency.code} ({activeCurrency.symbol})
            </span>
          </div>

          {/* Quick Buy Action Button */}
          <button
            id={`quick-buy-${product.id}`}
            onClick={handleQuickBuy}
            disabled={isQuickBuying}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
              justAdded
                ? 'bg-emerald-700 text-white ring-2 ring-emerald-500'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
            title="Instantly add item to bag without leaving the collection page"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white animate-in zoom-in" />
                <span>{t('added_to_bag')}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t('quick_buy')}</span>
              </>
            )}
          </button>
        </div>

        {/* Secondary Actions (Compare, Wholesale, View) */}
        <div
          className="pt-2 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleToggleCompare}
            className={`flex items-center gap-1 hover:text-stone-900 transition-colors ${
              isCompared ? 'text-amber-700 font-semibold' : ''
            }`}
          >
            <Columns2 className="w-3 h-3" />
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>
          <button
            type="button"
            onClick={handleOpenB2B}
            className="flex items-center gap-1 hover:text-stone-900 transition-colors"
          >
            <Building2 className="w-3 h-3 text-stone-400" />
            <span>Wholesale</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedProductModal(product)}
            className="flex items-center gap-1 hover:text-stone-900 font-medium transition-colors"
          >
            <Eye className="w-3 h-3 text-stone-400" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
