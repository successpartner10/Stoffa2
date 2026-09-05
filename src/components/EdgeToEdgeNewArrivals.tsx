import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { Product } from '../types';

export const EdgeToEdgeNewArrivals: React.FC = () => {
  const { products, formatPrice, addToCart, setSelectedProductModal, t } = useCommerce();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [justAddedId, setJustAddedId] = React.useState<string | null>(null);

  // Filter new arrivals or top products
  const newArrivals = products.filter((p) => p.isNewArrival || p.badge?.includes('NEW') || p.id.startsWith('ww_'));

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0] || { name: 'Natural', hex: '#E5E7EB' };
    addToCart(product, defaultSize, defaultColor, 1);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1600);
  };

  return (
    <section className="w-full bg-white py-12 border-b border-amber-100 overflow-hidden">
      {/* Edge-to-Edge Container Header */}
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Latest Drops &bull; stoffastyle.com</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 font-medium tracking-tight">
            New Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5">
            Scroll right to preview our latest handcrafted Kolhapuri wedges, braided flats, and bridal edits.
          </p>
        </div>

        {/* Carousel Arrow Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            id="new-arrivals-scroll-left"
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-full border border-amber-200 bg-white hover:bg-amber-50 text-slate-800 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            id="new-arrivals-scroll-right"
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-full border border-amber-200 bg-white hover:bg-amber-50 text-slate-800 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Full-bleed Edge-to-Edge Horizontal Scroll Rail */}
      <div
        ref={scrollContainerRef}
        className="w-full flex items-stretch gap-5 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-12 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {newArrivals.map((product) => {
          const isAdded = justAddedId === product.id;
          const displayImage = product.images[0];

          return (
            <div
              key={product.id}
              onClick={() => setSelectedProductModal(product)}
              className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl border border-sky-100/90 hover:border-sky-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Product Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-sky-50">
                <img
                  src={displayImage}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Badge */}
                <div className="absolute top-3 start-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-900 text-white shadow-xs">
                    {product.badge || 'NEW ARRIVAL'}
                  </span>
                </div>

                {/* Quick Add Overlay on Hover */}
                <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className={`w-full py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-sky-900 hover:bg-sky-800 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-sky-800 font-semibold block mb-0.5">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-base text-slate-900 font-medium group-hover:text-sky-800 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 font-light mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                {/* Color Dots and Price */}
                <div className="flex items-center justify-between pt-2 border-t border-sky-50">
                  <div className="flex items-center gap-1.5">
                    {product.colors.slice(0, 3).map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-[9px] text-slate-400 font-mono">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      {formatPrice(product.priceUSD)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
