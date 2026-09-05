import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  Ruler,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Plus,
  Minus,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { Product } from '../types';
import { formatStoffaDisplayTitle } from './CategoryCollectionSection';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    setIsCartOpen,
    formatPrice,
    activeCampaign,
    shareProduct,
    products,
    setSelectedCategory,
    t,
  } = useCommerce();

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedProductModal]);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '38 (US 7.5)');
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0] || { name: 'Champagne Gold', hex: '#D4AF37' }
  );
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'craft' | 'shipping'>('details');

  // Normalize image angles
  const angles =
    product.angles && product.angles.length > 0
      ? product.angles
      : product.images.map((url, i) => ({
          url,
          label: i === 0 ? 'Main Editorial' : i === 1 ? 'Detail View' : 'Side Angle',
          tag: i === 0 ? 'Front' : i === 1 ? 'Detail' : 'Side',
          isAiImage: false,
        }));

  const activeAngle = angles[selectedAngleIndex] || angles[0];
  const { mainTitle, colorTitle } = formatStoffaDisplayTitle(product);

  const discountRate = activeCampaign ? activeCampaign.discountPercent / 100 : 0;
  const originalPriceUSD =
    product.originalPriceUSD ||
    (product.badge?.includes('OFF') || product.badge?.includes('SALE')
      ? Math.round(product.priceUSD * 1.35)
      : undefined);
  const isSale = originalPriceUSD !== undefined || discountRate > 0;

  const handleNextAngle = () => {
    setSelectedAngleIndex((prev) => (prev + 1) % angles.length);
  };

  const handlePrevAngle = () => {
    setSelectedAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = async () => {
    await shareProduct(product);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // Related products recommendation
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  return (
    <div id="product-detail-fullpage" className="w-full bg-white text-stone-900 animate-in fade-in duration-300">
      {/* Top Utility Nav / Breadcrumbs Bar */}
      <div className="border-b border-stone-200 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            id="back-to-collection-btn"
            onClick={() => setSelectedProductModal(null)}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-stone-900 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-stone-900 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Collection</span>
          </button>

          {/* Breadcrumb path */}
          <nav className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600">
            <span
              onClick={() => {
                setSelectedProductModal(null);
                setSelectedCategory('All');
              }}
              className="hover:text-stone-950 cursor-pointer"
            >
              Home
            </span>
            <span>/</span>
            <span
              onClick={() => {
                setSelectedProductModal(null);
                setSelectedCategory(product.category);
              }}
              className="hover:text-stone-950 cursor-pointer"
            >
              {product.category}
            </span>
            <span>/</span>
            <span className="text-stone-950 truncate max-w-[200px]">{mainTitle}</span>
          </nav>

          <button
            id="share-product-btn"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-stone-950 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-stone-800" />
            <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Full Page 2-Column Luxury Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Full Page Gallery (Thumbnails Strip + Large High-Resolution Stage) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
            {/* Thumbnail Column */}
            {angles.length > 1 && (
              <div className="order-2 sm:order-1 flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[640px] no-scrollbar py-1">
                {angles.map((angle, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAngleIndex(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all p-0.5 bg-stone-50 cursor-pointer ${
                      selectedAngleIndex === idx
                        ? 'border-stone-950 ring-2 ring-stone-950/20'
                        : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={angle.url}
                      alt={angle.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Display Image */}
            <div className="order-1 sm:order-2 flex-1 relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group">
              <img
                src={activeAngle.url}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
              />

              {/* Prev / Next Arrows */}
              {angles.length > 1 && (
                <>
                  <button
                    onClick={handlePrevAngle}
                    className="absolute start-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md transition-all hover:scale-110 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextAngle}
                    className="absolute end-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md transition-all hover:scale-110 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badge Overlay */}
              <div className="absolute top-4 start-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-950 text-white shadow-xs">
                  {product.badge || 'HANDCRAFTED EXCLUSIVE'}
                </span>
                {product.collection && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-stone-900 border border-stone-200 shadow-xs">
                    {product.collection}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details, Specifications & Purchase Section */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Header: Title, Category & Reviews */}
            <div className="space-y-2 border-b border-stone-200 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-600">
                  {product.category} &bull; STÖFFA STYLE
                </span>
                <div className="flex items-center gap-1.5 text-stone-900 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-stone-500 font-normal">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-950 font-bold tracking-tight">
                {mainTitle}
              </h1>

              {colorTitle && (
                <p className="text-base sm:text-lg text-stone-700 font-medium">
                  {colorTitle}
                </p>
              )}

              {/* Pricing in USD */}
              <div className="flex items-baseline gap-3 pt-3">
                <span className="text-3xl font-extrabold font-mono text-stone-950">
                  {formatPrice(product.priceUSD)}
                </span>
                {isSale && originalPriceUSD && (
                  <>
                    <span className="text-lg font-mono text-stone-400 line-through">
                      {formatPrice(originalPriceUSD)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
                      Save {Math.round(((originalPriceUSD - product.priceUSD) / originalPriceUSD) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-stone-500 font-mono">
                Taxes included • Free express shipping on orders over $150
              </p>
            </div>

            {/* Color Swatch Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5 border-b border-stone-200 pb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold uppercase tracking-wider text-stone-900">
                    Color: <span className="text-stone-950 font-extrabold">{selectedColor.name}</span>
                  </span>
                  <span className="text-xs text-stone-500 font-medium">{product.colors.length} shades</span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {product.colors.map((clr) => (
                    <button
                      key={clr.name}
                      onClick={() => setSelectedColor(clr)}
                      className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 flex items-center justify-center cursor-pointer ${
                        selectedColor.name === clr.name
                          ? 'border-stone-950 ring-2 ring-stone-950/30 scale-110'
                          : 'border-stone-300 hover:border-stone-600'
                      }`}
                      title={clr.name}
                    >
                      <span
                        className="w-full h-full rounded-full border border-stone-200/50 block shadow-inner"
                        style={{ backgroundColor: clr.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector with US / EU conversions */}
            <div className="space-y-2.5 border-b border-stone-200 pb-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold uppercase tracking-wider text-stone-900">
                  Select Size: <span className="font-extrabold text-stone-950">{selectedSize}</span>
                </span>
                <div className="flex items-center gap-1 text-xs text-stone-600 font-medium">
                  <Ruler className="w-3.5 h-3.5 text-stone-700" />
                  <span>Fits True to Size</span>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold tracking-wider transition-all border cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-stone-950 text-white border-stone-950 shadow-sm'
                        : 'bg-white text-stone-900 border-stone-300 hover:border-stone-800'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-stone-300 rounded-xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-700 hover:text-black cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono font-bold text-base text-stone-950">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-stone-700 hover:text-black cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  id="product-detail-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-xl bg-stone-950 hover:bg-black text-white font-bold text-sm uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{added ? 'Added to Cart!' : `Add to Cart • ${formatPrice(product.priceUSD * quantity)}`}</span>
                </button>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 text-center">
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <Truck className="w-5 h-5 mx-auto text-stone-800" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Express Delivery</p>
                <p className="text-[10px] text-stone-500 font-medium">Ships in 2-4 business days</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <RotateCcw className="w-5 h-5 mx-auto text-stone-800" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Complimentary Returns</p>
                <p className="text-[10px] text-stone-500 font-medium">30 days exchange window</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <ShieldCheck className="w-5 h-5 mx-auto text-stone-800" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Artisanal Guarantee</p>
                <p className="text-[10px] text-stone-500 font-medium">Handcrafted in Mumbai</p>
              </div>
            </div>

            {/* Editorial Accordion / Tabs */}
            <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-200">
              {/* Tab: Description */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'details' ? ('' as any) : 'details')}
                  className="w-full py-3.5 px-4 text-left font-bold text-xs uppercase tracking-[0.14em] text-stone-900 flex items-center justify-between hover:bg-stone-50 cursor-pointer"
                >
                  <span>Description & Silhouette</span>
                  <span>{activeTab === 'details' ? '−' : '+'}</span>
                </button>
                {activeTab === 'details' && (
                  <div className="p-4 bg-stone-50/50 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    {product.heelHeight && (
                      <p className="font-semibold text-stone-900">
                        Heel Height: <span className="font-normal">{product.heelHeight}</span>
                      </p>
                    )}
                    {product.materials && (
                      <p className="font-semibold text-stone-900">
                        Materials: <span className="font-normal">{product.materials}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Tab: Craftsmanship */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'craft' ? ('' as any) : 'craft')}
                  className="w-full py-3.5 px-4 text-left font-bold text-xs uppercase tracking-[0.14em] text-stone-900 flex items-center justify-between hover:bg-stone-50 cursor-pointer"
                >
                  <span>Craftsmanship & Comfort</span>
                  <span>{activeTab === 'craft' ? '−' : '+'}</span>
                </button>
                {activeTab === 'craft' && (
                  <div className="p-4 bg-stone-50/50 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2">
                    <p>
                      Each pair is engineered with Stöffa Style&apos;s signature dual-density memory foam footbed, wrapped in supple metallic leather. Handcrafted by master artisans with over 20 years of bespoke shoe-making heritage.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab: Shipping & Returns */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'shipping' ? ('' as any) : 'shipping')}
                  className="w-full py-3.5 px-4 text-left font-bold text-xs uppercase tracking-[0.14em] text-stone-900 flex items-center justify-between hover:bg-stone-50 cursor-pointer"
                >
                  <span>Worldwide Shipping & Returns</span>
                  <span>{activeTab === 'shipping' ? '−' : '+'}</span>
                </button>
                {activeTab === 'shipping' && (
                  <div className="p-4 bg-stone-50/50 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2">
                    <p>
                      All international shipments are dispatched via DHL Express with complete end-to-end tracking. Delivery typically arrives within 3-5 business days across the United States, Europe, and UAE.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t-2 border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 tracking-tight">
                You May Also Like
              </h2>
              <button
                onClick={() => setSelectedProductModal(null)}
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-900 hover:text-black underline cursor-pointer"
              >
                View Full Collection →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => {
                const relTitles = formatStoffaDisplayTitle(rel);
                return (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProductModal(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative">
                      <img
                        src={rel.images[0]}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300"
                      />
                      {rel.badge && (
                        <span className="absolute top-2 start-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-950 text-white">
                          {rel.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-serif font-bold text-stone-950 group-hover:underline">
                        {relTitles.mainTitle}
                      </h3>
                      <p className="text-xs text-stone-500 font-mono font-bold">
                        {formatPrice(rel.priceUSD)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
