import React, { useState } from 'react';
import {
  Building2,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Copy,
  RotateCcw,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { Product } from '../types';

interface ProductModalContentProps {
  product: Product;
}

const ProductModalContent: React.FC<ProductModalContentProps> = ({ product }) => {
  const {
    products,
    setSelectedProductModal,
    addToCart,
    formatPrice,
    activeCurrency,
    activeCampaign,
    selectedOccasion,
    setSelectedOccasion,
    shareProduct,
    addToComparison,
    setIsComparisonOpen,
    setIsB2BModalOpen,
    setB2BTargetProduct,
    t,
  } = useCommerce();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '38');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Normalize angles array
  const angles = product.angles && product.angles.length > 0
    ? product.angles
    : product.images.map((url, i) => ({
        url,
        label: i === 0 ? 'Studio Hero' : i === 1 ? 'Profile Angle' : 'Detail View',
        tag: i === 0 ? 'Front' : i === 1 ? 'Side' : 'Detail',
        isAiImage: i >= 3,
      }));

  const activeAngle = angles[selectedAngleIndex] || angles[0];
  const isShoes = !product.category.toLowerCase().includes('bag') && !product.category.toLowerCase().includes('tote');

  const discountRate = activeCampaign ? activeCampaign.discountPercent / 100 : 0;
  const discountedPriceUSD = product.priceUSD * (1 - discountRate);

  // Recommended products in same category or complementary silhouettes
  const recommendedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleNextAngle = () => {
    setSelectedAngleIndex((prev) => (prev + 1) % angles.length);
  };

  const handlePrevAngle = () => {
    setSelectedAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
  };

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = async () => {
    const url = shareProduct(product.id);
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2200);
  };

  const handleOpenB2B = () => {
    setB2BTargetProduct(product);
    setIsB2BModalOpen(true);
  };

  const handleOpenCompare = () => {
    addToComparison(product);
    setIsComparisonOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-stone-200 shadow-2xl text-stone-900 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Gallery: 1 Big Image + Angles */}
          <div className="lg:col-span-7 space-y-3">
            {/* 1 Big Product Image - 100% Pure Stöffa photo with no text or box overlay */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner group">
              <img
                src={activeAngle.url}
                alt={`${product.title} - ${activeAngle.label}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
            </div>

            {/* Navigation & Angle Info - Cleanly placed BELOW the image */}
            {angles.length > 1 && (
              <div className="flex items-center justify-between px-3 py-2 bg-stone-50 rounded-xl border border-stone-200/80">
                <button
                  type="button"
                  onClick={handlePrevAngle}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-200 flex items-center gap-1 transition-colors shadow-2xs"
                  title="Previous Angle"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-center">
                  <div className="text-xs font-serif font-medium text-stone-900">
                    {activeAngle.label}
                  </div>
                  <div className="text-[10px] font-mono text-stone-500">
                    View {selectedAngleIndex + 1} of {angles.length}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextAngle}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-200 flex items-center gap-1 transition-colors shadow-2xs"
                  title="Next Angle"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Authentic Stöffa Perspectives Thumbnail Row - Clean, no badges on images */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-600 font-semibold flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-stone-500" />
                  <span>Atelier Perspectives</span>
                </span>
                <span className="text-[11px] text-stone-500 font-mono">
                  Select view to inspect
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                {angles.map((angle, idx) => {
                  const isSelected = selectedAngleIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAngleIndex(idx)}
                      className={`group/thumb relative rounded-xl overflow-hidden border-2 transition-all p-0.5 text-left flex flex-col ${
                        isSelected
                          ? 'border-stone-900 ring-2 ring-stone-900/20 shadow-md bg-stone-50'
                          : 'border-stone-200 hover:border-stone-400 opacity-75 hover:opacity-100 bg-white'
                      }`}
                    >
                      <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-stone-100 relative">
                        <img
                          src={angle.url}
                          alt={angle.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-1 sm:p-1.5 flex flex-col">
                        <span className="text-[10px] font-medium text-stone-800 line-clamp-1 leading-tight">
                          {angle.tag || angle.label}
                        </span>
                        <span className="text-[9px] text-stone-400 uppercase tracking-tighter">
                          View {idx + 1}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Product Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
                <span className="uppercase tracking-widest text-stone-900 font-semibold flex items-center gap-1.5">
                  <span className="text-amber-900 font-bold bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                    {product.brand || 'Stöffa'}
                  </span>
                  <span>{product.category}</span>
                </span>
                <div className="flex items-center gap-1 text-amber-600 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-stone-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium leading-tight">
                {product.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-light mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-baseline justify-between">
              <div>
                <div className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">
                  {activeCurrency.name} ({activeCurrency.code})
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  {activeCampaign ? (
                    <>
                      <span className="text-2xl font-bold font-mono text-emerald-800">
                        {formatPrice(discountedPriceUSD)}
                      </span>
                      <span className="text-sm font-mono text-stone-400 line-through">
                        {formatPrice(product.priceUSD)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold font-mono text-stone-900">
                      {formatPrice(product.priceUSD)}
                    </span>
                  )}
                </div>
              </div>

              {activeCampaign && (
                <div className="text-right">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-300">
                    -{activeCampaign.discountPercent}% VIP Code
                  </span>
                  <div className="text-[10px] text-stone-500 mt-1">
                    Via {activeCampaign.creatorName}
                  </div>
                </div>
              )}
            </div>

            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-stone-500">Color:</span>
                <span className="text-stone-900 font-medium">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedColor.name === c.name
                        ? 'border-stone-900 bg-stone-100 text-stone-900 font-medium'
                        : 'border-stone-200 bg-white text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-stone-500">{t('select_size')}:</span>
                <span className="text-stone-700 hover:underline cursor-pointer text-[11px] font-medium">
                  Shoe & Bag Dimension Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => {
                  const stock = product.inventory[sz] || 4;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-1 rounded-lg text-xs font-mono text-center border transition-all ${
                        selectedSize === sz
                          ? 'border-stone-900 bg-stone-900 text-white font-bold shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      <div>{sz}</div>
                      <div className="text-[9px] text-stone-400 font-normal">
                        {stock <= 2 ? 'Low stock' : 'In stock'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                id="modal-add-to-bag-btn"
                onClick={handleAdd}
                className="w-full py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>{t('added_to_bag')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('add_to_bag')}</span>
                  </>
                )}
              </button>

              {/* Utility Row: Share, B2B, Compare */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="modal-share-btn"
                  onClick={handleShare}
                  className="py-2.5 px-2 rounded-lg border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  title="Generate shareable product link"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-stone-500" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <button
                  id="modal-compare-btn"
                  onClick={handleOpenCompare}
                  className="py-2.5 px-2 rounded-lg border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  title="Compare specs with another piece"
                >
                  <Columns2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Compare</span>
                </button>

                <button
                  id="modal-b2b-btn"
                  onClick={handleOpenB2B}
                  className="py-2.5 px-2 rounded-lg border border-amber-300 hover:border-amber-400 bg-amber-50/80 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  title="Wholesale bulk purchasing"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Wholesale</span>
                </button>
              </div>
            </div>

            {/* Item Details & Assurance */}
            <div className="pt-4 border-t border-stone-200 space-y-3 text-xs text-stone-600">
              {/* Occasion Suitability */}
              {product.occasions && product.occasions.length > 0 && (
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-stone-900 font-semibold">
                      Curated For Events & Occasions
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">Antler & Juun.J Edit</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {product.occasions.map((occId) => (
                      <button
                        key={occId}
                        onClick={() => {
                          setSelectedOccasion(occId);
                          setSelectedProductModal(null);
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider transition-colors ${
                          selectedOccasion === occId
                            ? 'bg-stone-900 text-white font-semibold'
                            : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-300'
                        }`}
                        title="Click to view all pieces tailored for this occasion"
                      >
                        {t(`occ_${occId}`) || occId}
                      </button>
                    ))}
                  </div>
                  {product.occasionNote && (
                    <p className="text-[11px] text-stone-600 italic font-light pt-1 border-t border-stone-200/60">
                      &bull; {product.occasionNote}
                    </p>
                  )}
                </div>
              )}

              <div>
                <strong className="text-stone-900 block mb-1">Craft Description</strong>
                <p className="font-light leading-relaxed">{product.description}</p>
              </div>

              <div>
                <strong className="text-stone-900 block mb-1">Materials & Provenance</strong>
                <p className="font-light">{product.materials}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <Truck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span className="text-[11px]">Free Worldwide Express Delivery</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <RotateCcw className="w-4 h-4 text-stone-900 shrink-0" />
                  <span className="text-[11px]">Complimentary 30-Day Returns</span>
                </div>
              </div>

              {/* Recommended for You Section */}
              <div className="pt-5 border-t border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-serif font-semibold text-stone-900">
                    Recommended Complementary Pieces
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">Curated Pairings</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {recommendedProducts.map((rec) => (
                    <button
                      key={rec.id}
                      onClick={() => {
                        setSelectedProductModal(rec);
                        setSelectedAngleIndex(0);
                      }}
                      className="text-left group/rec p-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all flex flex-col justify-between"
                    >
                      <div className="aspect-square rounded overflow-hidden bg-white border border-stone-200/80 mb-1.5">
                        <img
                          src={rec.images[0]}
                          alt={rec.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/rec:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <div className="font-serif text-[11px] font-medium text-stone-900 line-clamp-1 group-hover/rec:text-stone-700">
                          {rec.title}
                        </div>
                        <div className="font-mono text-[10px] text-stone-500 mt-0.5">
                          {formatPrice(rec.priceUSD)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductModal: React.FC = () => {
  const { selectedProductModal } = useCommerce();

  if (!selectedProductModal) return null;

  return (
    <ProductModalContent
      key={selectedProductModal.id}
      product={selectedProductModal}
    />
  );
};
