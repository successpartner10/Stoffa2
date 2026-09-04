import React from 'react';
import { Check, Plus, ShoppingBag, Star, X } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { Product } from '../types';

export const ProductComparisonModal: React.FC = () => {
  const {
    comparisonList,
    removeFromComparison,
    clearComparison,
    isComparisonOpen,
    setIsComparisonOpen,
    formatPrice,
    activeCurrency,
    addToCart,
    products,
    addToComparison,
    setSelectedProductModal,
    t,
  } = useCommerce();

  if (!isComparisonOpen || comparisonList.length === 0) return null;

  const productA = comparisonList[0];
  const productB = comparisonList.length > 1 ? comparisonList[1] : null;

  // Unselected products to easily pick a second comparison product
  const availableToCompare = products.filter(
    (p) => !comparisonList.some((item) => item.id === p.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-stone-200 shadow-2xl p-6 sm:p-8 text-stone-900 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold">
              Atelier Étoile • Curated Spec Comparison
            </div>
            <h2 className="font-serif text-2xl font-medium text-stone-900">
              Side-by-Side Architectural Comparison
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearComparison}
              className="text-xs text-stone-500 hover:text-stone-900 underline font-medium px-2 py-1"
            >
              Clear Both
            </button>
            <button
              onClick={() => setIsComparisonOpen(false)}
              className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              aria-label="Close Comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Product A */}
          <div className="rounded-xl border border-stone-200 p-5 bg-stone-50/50 flex flex-col justify-between relative">
            <button
              onClick={() => removeFromComparison(productA.id)}
              className="absolute top-3 right-3 p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors"
              title="Remove from comparison"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white border border-stone-200">
                <img
                  src={productA.images[0]}
                  alt={productA.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-stone-400 font-semibold">
                  {productA.category}
                </span>
                <h3 className="font-serif text-lg font-medium text-stone-900 mt-0.5">
                  {productA.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-1">{productA.subtitle}</p>
              </div>

              {/* Specs Table */}
              <div className="space-y-2.5 text-xs border-t border-stone-200/80 pt-3">
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500 font-mono">Price ({activeCurrency.code}):</span>
                  <span className="font-mono font-bold text-stone-900">
                    {formatPrice(productA.priceUSD)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500 font-mono">Rating:</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{productA.rating} / 5.0 ({productA.reviewCount})</span>
                  </span>
                </div>
                <div className="py-1 border-b border-stone-200/60">
                  <span className="text-stone-500 font-mono block mb-0.5">Materials:</span>
                  <span className="text-stone-800 font-light">{productA.materials}</span>
                </div>
                <div className="py-1 border-b border-stone-200/60">
                  <span className="text-stone-500 font-mono block mb-0.5">Craft & Last Dimensions:</span>
                  <span className="text-stone-800 font-light">
                    {productA.category.toLowerCase().includes('bag')
                      ? '34cm x 26cm x 12cm • Reinforced base • 1.1kg'
                      : 'Kitten heel 45mm / Stiletto 75mm • Hand-sculpted Italian beechwood last'}
                  </span>
                </div>
                <div className="py-1">
                  <span className="text-stone-500 font-mono block mb-1">Available Sizes:</span>
                  <div className="flex flex-wrap gap-1">
                    {productA.sizes.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-stone-300 text-stone-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-stone-200 flex items-center gap-2">
              <button
                onClick={() => {
                  addToCart(productA, productA.sizes[0], productA.colors[0], 1);
                  setIsComparisonOpen(false);
                }}
                className="flex-1 py-2.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add Piece A</span>
              </button>
              <button
                onClick={() => {
                  setSelectedProductModal(productA);
                  setIsComparisonOpen(false);
                }}
                className="py-2.5 px-3 rounded-lg border border-stone-300 hover:bg-stone-100 text-xs font-medium text-stone-700 transition-colors"
              >
                Inspect
              </button>
            </div>
          </div>

          {/* Product B or Picker */}
          {productB ? (
            <div className="rounded-xl border border-stone-200 p-5 bg-stone-50/50 flex flex-col justify-between relative">
              <button
                onClick={() => removeFromComparison(productB.id)}
                className="absolute top-3 right-3 p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors"
                title="Remove from comparison"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white border border-stone-200">
                  <img
                    src={productB.images[0]}
                    alt={productB.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-stone-400 font-semibold">
                    {productB.category}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-stone-900 mt-0.5">
                    {productB.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-1">{productB.subtitle}</p>
                </div>

                {/* Specs Table */}
                <div className="space-y-2.5 text-xs border-t border-stone-200/80 pt-3">
                  <div className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-500 font-mono">Price ({activeCurrency.code}):</span>
                    <span className="font-mono font-bold text-stone-900">
                      {formatPrice(productB.priceUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-500 font-mono">Rating:</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{productB.rating} / 5.0 ({productB.reviewCount})</span>
                    </span>
                  </div>
                  <div className="py-1 border-b border-stone-200/60">
                    <span className="text-stone-500 font-mono block mb-0.5">Materials:</span>
                    <span className="text-stone-800 font-light">{productB.materials}</span>
                  </div>
                  <div className="py-1 border-b border-stone-200/60">
                    <span className="text-stone-500 font-mono block mb-0.5">Craft & Last Dimensions:</span>
                    <span className="text-stone-800 font-light">
                      {productB.category.toLowerCase().includes('bag')
                        ? '36cm x 28cm x 14cm • Reinforced base • 1.2kg'
                        : 'Sculpted curve 50mm • Full calf-lining • Tuscan buffed sole'}
                    </span>
                  </div>
                  <div className="py-1">
                    <span className="text-stone-500 font-mono block mb-1">Available Sizes:</span>
                    <div className="flex flex-wrap gap-1">
                      {productB.sizes.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-stone-300 text-stone-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-200 flex items-center gap-2">
                <button
                  onClick={() => {
                    addToCart(productB, productB.sizes[0], productB.colors[0], 1);
                    setIsComparisonOpen(false);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Piece B</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedProductModal(productB);
                    setIsComparisonOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-lg border border-stone-300 hover:bg-stone-100 text-xs font-medium text-stone-700 transition-colors"
                >
                  Inspect
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-stone-300 p-6 flex flex-col items-center justify-center text-center bg-stone-50/30">
              <div className="w-12 h-12 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-500 mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-base font-medium text-stone-800">
                Select a Second Piece to Compare
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mb-4">
                Choose another silhouette to review side-by-side materials, heights, and pricing.
              </p>
              <div className="w-full max-h-56 overflow-y-auto space-y-2 text-left">
                {availableToCompare.slice(0, 5).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToComparison(p)}
                    className="w-full p-2 rounded-lg bg-white border border-stone-200 hover:border-stone-400 flex items-center gap-3 transition-colors text-xs"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded shrink-0"
                    />
                    <div className="flex-1 truncate text-left">
                      <div className="font-medium text-stone-900 truncate">{p.title}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{formatPrice(p.priceUSD)}</div>
                    </div>
                    <span className="text-[10px] text-amber-800 font-semibold px-2 py-0.5 bg-amber-50 rounded border border-amber-200 shrink-0">
                      + Add
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
