import React, { useState } from 'react';
import {
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Heart,
  RotateCcw,
  Ruler,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { SeashellLogo } from './SeashellLogo';

export const ProductModal: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    formatPrice,
    activeCurrency,
    activeCampaign,
    shareProduct,
    addToComparison,
    setIsComparisonOpen,
    setIsB2BModalOpen,
    setB2BTargetProduct,
  } = useCommerce();

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Natural', hex: '#E5E7EB' });
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'fabric' | 'shipping'>('description');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // Normalize angles array
  const rawAngles =
    product.angles && product.angles.length > 0
      ? product.angles
      : product.images.map((url, i) => ({
          url,
          label: i === 0 ? 'Studio Hero' : i === 1 ? 'Detail Angle' : 'Side Profile',
          tag: i === 0 ? 'Front' : i === 1 ? 'Detail' : 'Side',
          isAiImage: false,
        }));

  const angles = rawAngles.filter(
    (a) =>
      !a.url.includes('Madhuri') &&
      !a.url.includes('Karina') &&
      !a.url.includes('Kareena') &&
      !a.url.includes('Alia') &&
      !a.url.includes('RASHMIKA') &&
      !a.url.includes('SHREYA') &&
      !a.url.includes('SONALI') &&
      !a.url.includes('KARISHMA') &&
      !a.url.includes('Genelia') &&
      !a.url.includes('BHAVANA')
  );

  const activeAngle = angles[selectedAngleIndex] || angles[0];

  const discountRate = activeCampaign ? activeCampaign.discountPercent / 100 : 0;
  const originalPriceUSD = product.originalPriceUSD || (product.badge?.includes('OFF') ? Math.round(product.priceUSD * 1.4) : undefined);
  const isSale = originalPriceUSD !== undefined || discountRate > 0;

  const handleNextAngle = () => {
    setSelectedAngleIndex((prev) => (prev + 1) % angles.length);
  };

  const handlePrevAngle = () => {
    setSelectedAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
  };

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleShare = async () => {
    const res = await shareProduct(product);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
      onClick={() => setSelectedProductModal(null)}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-3xl bg-white border border-sky-100 shadow-2xl text-slate-900 p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row: Breadcrumb & Close Button */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-sky-100">
          <nav className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span className="hover:text-sky-800 cursor-pointer" onClick={() => setSelectedProductModal(null)}>
              Home
            </span>
            <span>/</span>
            <span className="text-sky-800 font-semibold">{product.category}</span>
            <span>/</span>
            <span className="text-slate-800 truncate max-w-[200px] sm:max-w-[320px] font-medium">
              {product.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share product"
              className="p-2 rounded-full text-slate-500 hover:text-sky-900 hover:bg-sky-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProductModal(null)}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Amazon & Wayfair Style Two-Column Layout: Fits at a glance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Vertical Thumbnails + Main View */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Vertical Thumbnail Strip (Amazon style) */}
            <div className="order-2 sm:order-1 flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[460px] no-scrollbar py-1">
              {angles.map((angle, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAngleIndex(idx)}
                  className={`w-14 h-18 sm:w-16 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-slate-50 cursor-pointer ${
                    selectedAngleIndex === idx
                      ? 'border-sky-800 ring-2 ring-sky-800/20 shadow-sm'
                      : 'border-slate-200 hover:border-sky-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={angle.url}
                    alt={angle.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom & Navigation */}
            <div className="order-1 sm:order-2 flex-1 relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-sky-50/60 border border-sky-100 group shadow-inner">
              <img
                src={activeAngle.url}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-103"
              />

              {/* Prev / Next Arrows */}
              {angles.length > 1 && (
                <>
                  <button
                    onClick={handlePrevAngle}
                    className="absolute start-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-all hover:scale-105"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextAngle}
                    className="absolute end-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-all hover:scale-105"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Top Badges */}
              <div className="absolute top-3 start-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-950 text-white shadow-xs">
                  {product.badge || 'RESORT FAVOURITE'}
                </span>
                {product.collection && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-sky-950 backdrop-blur-xs border border-sky-100 shadow-xs">
                    {product.collection}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Buying Actions (Compact, Fits at a Glance) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs text-sky-800 font-mono mb-1">
                <span className="uppercase font-bold tracking-wider">{product.category}</span>
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 text-[11px]">({product.reviewCount} reviews)</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 font-semibold leading-tight">
                {product.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3 pt-3 border-t border-sky-100">
                <span className="text-2xl font-bold font-mono text-slate-900">
                  {formatPrice(product.priceUSD)}
                </span>
              </div>

              {/* Color Swatch Picker */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-slate-700 font-medium">
                    Color: <span className="font-bold text-sky-950">{selectedColor.name}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">({product.colors.length} choices)</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((clr) => (
                    <button
                      key={clr.name}
                      onClick={() => setSelectedColor(clr)}
                      className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 flex items-center justify-center cursor-pointer ${
                        selectedColor.name === clr.name
                          ? 'border-sky-900 ring-2 ring-sky-900/30 scale-110'
                          : 'border-slate-300 hover:border-sky-400'
                      }`}
                      title={clr.name}
                    >
                      <span
                        className="w-full h-full rounded-full shadow-2xs"
                        style={{ backgroundColor: clr.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-slate-700 font-medium">
                    Size: <span className="font-bold text-sky-950">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-[11px] text-sky-800 hover:text-sky-950 font-semibold flex items-center gap-1 underline cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-sky-900 bg-sky-900 text-white font-bold shadow-xs'
                          : 'border-sky-200 bg-white text-slate-700 hover:border-sky-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Buy Button Row */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-sky-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-slate-600 hover:bg-sky-50 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2.5 text-slate-600 hover:bg-sky-50 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Cart Button (Harmonious Blue) */}
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 px-6 rounded-2xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-sky-900 hover:bg-sky-800 text-white'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO CART &bull; {formatPrice(product.priceUSD * quantity)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Secondary Actions: Wholesale & Compare */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setB2BTargetProduct(product);
                      setIsB2BModalOpen(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl border border-sky-200 hover:bg-sky-50 text-sky-900 text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Wholesale Inquiry</span>
                  </button>
                  <button
                    onClick={() => {
                      addToComparison(product);
                      setIsComparisonOpen(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl border border-sky-200 hover:bg-sky-50 text-sky-900 text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                    <span>Compare Silhouette</span>
                  </button>
                </div>
              </div>

              {/* Wayfair / Amazon Style Trust Strip */}
              <div className="mt-4 pt-3 border-t border-sky-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-mono">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-700" />
                  <span>Free express delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-sky-700" />
                  <span>30-day effortless returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
                  <span>Guaranteed authentic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <SeashellLogo size={14} />
                  <span>Bali artisan heritage</span>
                </div>
              </div>

              {/* Compact Accordion Tabs */}
              <div className="mt-4 pt-3 border-t border-sky-100">
                <div className="flex border-b border-sky-100">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-2 pe-4 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                      activeTab === 'description'
                        ? 'border-sky-900 text-sky-950'
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-2 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                      activeTab === 'fabric'
                        ? 'border-sky-900 text-sky-950'
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Details & Care
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 ps-4 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-sky-900 text-sky-950'
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Shipping & Returns
                  </button>
                </div>

                <div className="pt-2 text-xs text-slate-600 font-light leading-relaxed">
                  {activeTab === 'description' && (
                    <p>{product.description}</p>
                  )}
                  {activeTab === 'fabric' && (
                    <div className="space-y-1">
                      <p><span className="font-semibold text-slate-800">Materials:</span> {product.materials}</p>
                      <p><span className="font-semibold text-slate-800">Care:</span> Hand wash cold or dry clean for best longevity. Hang to dry in shade.</p>
                      <p><span className="font-semibold text-slate-800">Origin:</span> Ethically handcrafted with Bali artisans.</p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-1">
                      <p>Complimentary DHL / Air Express shipping on orders over $150.</p>
                      <p>Pre-paid domestic returns within 30 days of delivery.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Size Chart Modal Helper */}
        {isSizeChartOpen && (
          <div
            className="fixed inset-0 z-60 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setIsSizeChartOpen(false)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-sky-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <h3 className="font-serif text-lg text-slate-900 font-semibold">
                  {product.category.includes('Shoe') || product.category.includes('Heel') ? 'Footwear Size Chart' : 'Resort Dress Size Guide'}
                </h3>
                <button
                  onClick={() => setIsSizeChartOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 overflow-x-auto text-xs font-mono">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-sky-100 text-sky-900 font-bold">
                      <th className="py-2 pe-3">Size</th>
                      <th className="py-2 px-3">Bust / Length</th>
                      <th className="py-2 px-3">Waist</th>
                      <th className="py-2 ps-3">Fit Advice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-50 text-slate-600">
                    <tr><td className="py-2 pe-3 font-bold">XXS / 0</td><td className="py-2 px-3">30-32&quot;</td><td className="py-2 px-3">24-25&quot;</td><td className="py-2 ps-3">True to size</td></tr>
                    <tr><td className="py-2 pe-3 font-bold">XS / 2-4</td><td className="py-2 px-3">32-34&quot;</td><td className="py-2 px-3">26-27&quot;</td><td className="py-2 ps-3">Relaxed drape</td></tr>
                    <tr><td className="py-2 pe-3 font-bold">S / 4-6</td><td className="py-2 px-3">34-36&quot;</td><td className="py-2 px-3">28-29&quot;</td><td className="py-2 ps-3">Standard fit</td></tr>
                    <tr><td className="py-2 pe-3 font-bold">M / 8-10</td><td className="py-2 px-3">36-38&quot;</td><td className="py-2 px-3">30-32&quot;</td><td className="py-2 ps-3">Comfortable</td></tr>
                    <tr><td className="py-2 pe-3 font-bold">L / 12-14</td><td className="py-2 px-3">39-41&quot;</td><td className="py-2 px-3">33-35&quot;</td><td className="py-2 ps-3">Flowing silhouette</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-3 border-t border-sky-100 flex justify-end">
                <button
                  onClick={() => setIsSizeChartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-sky-900 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
