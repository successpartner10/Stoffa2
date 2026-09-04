import React, { useState } from 'react';
import {
  ArrowRight,
  Camera,
  Compass,
  Expand,
  Eye,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { AI_MEDIA_ASSETS } from '../data/productMedia';

export const Hero: React.FC = () => {
  const {
    t,
    activeCurrency,
    formatPrice,
    activeCampaign,
    setSelectedOccasion,
    setSelectedProductModal,
    products,
  } = useCommerce();

  const [activeHeroAngleIndex, setActiveHeroAngleIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const heroProduct = products[0];

  const heroAngles = [
    {
      url: AI_MEDIA_ASSETS.stoffaBaboucheOnModel,
      label: 'On-Model: The Suede Babouche Slipper',
      tag: '✨ Lookbook 01',
      isAi: true,
      title: 'The Stöffa Suede Slip-On Babouche',
      desc: 'High-fashion model wearing the chocolate brown suede collapsible-heel babouche with relaxed cropped ivory linen trousers',
      productId: 'stoffa_01',
      price: 480,
      badge: 'Runway Look 01',
    },
    {
      url: AI_MEDIA_ASSETS.stoffaToteOnModel,
      label: 'On-Model: Soft Foldover Nappa Carryall',
      tag: '✨ Lookbook 02',
      isAi: true,
      title: 'The Stöffa Soft Foldover Nappa Carryall Tote',
      desc: 'Model carrying the cognac soft foldover lamb nappa tote over shoulder with fluid sand linen trench in Florence',
      productId: 'stoffa_02',
      price: 720,
      badge: 'Gallery Edition',
    },
    {
      url: AI_MEDIA_ASSETS.stoffaBootOnModel,
      label: 'On-Model: Pleated Elastic-Gore Chelsea Boot',
      tag: '✨ Lookbook 03',
      isAi: true,
      title: 'The Stöffa Pleated Elastic-Gore Boot',
      desc: 'Model wearing the rich walnut calfskin Chelsea boots with micro-pleated stretch gore and tailored ankle wool trousers',
      productId: 'stoffa_03',
      price: 680,
      badge: 'Milan Street Style',
    },
    {
      url: AI_MEDIA_ASSETS.stoffaLoaferOnModel,
      label: 'On-Model: Deconstructed Penny Loafer',
      tag: '✨ Lookbook 04',
      isAi: true,
      title: 'The Stöffa Deconstructed Penny Loafer',
      desc: 'Model wearing the dark taupe glove-soft reverse suede penny loafers in an Italian modernist art gallery',
      productId: 'stoffa_06',
      price: 540,
      badge: 'Artisanal Loafer',
    },
    {
      url: AI_MEDIA_ASSETS.stoffaWeekenderOnModel,
      label: 'On-Model: Suede Weekender Duffel',
      tag: '✨ Lookbook 05',
      isAi: true,
      title: 'The Stöffa Water-Repellent Suede Weekender Duffel',
      desc: 'Luxury travel look: Model holding the bitter chocolate hydrophobic suede duffel with bridle leather harness straps',
      productId: 'stoffa_05',
      price: 950,
      badge: 'Travel Collection',
    },
    {
      url: AI_MEDIA_ASSETS.shoesDenimCu,
      label: 'On-Model: Sculptural Pointed Slingback',
      tag: '✨ Lookbook 06',
      isAi: true,
      title: 'The Stöffa Sculptural Pointed Slingback',
      desc: 'Model feet styled in the 50mm architectural kitten heel slingbacks with cropped raw-hem denim',
      productId: 'stoffa_04',
      price: 490,
      badge: 'Architectural Heel',
    },
  ];

  const activeAngle = heroAngles[activeHeroAngleIndex] || heroAngles[0];
  const activeProduct = products.find((p) => p.id === activeAngle.productId) || heroProduct;

  const scrollToOccasions = () => {
    const el = document.getElementById('occasions-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOccasionJump = (occId: string) => {
    setSelectedOccasion(occId);
    scrollToCollection();
  };

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* Main Grid: Editorial Story + Interactive Haute Couture Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline, Occasion Direct Shortcuts & Value Props */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-mono font-medium shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>HAUTE COUTURE FOOTWEAR & LEATHER COLLECTION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.1] text-stone-900 font-medium">
              Sartorial Sculptures in Motion
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl">
              Impeccably tailored silhouettes, architectural leather goods, and hand-lasted pointed slingbacks. Designed with timeless Stoffa understated elegance for modern women of discerning taste.
            </p>

            {/* Antler & Juun.J Curated Event Shortcuts */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-1.5">
                <span>Curated Event Lookbooks:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'prom', label: t('occ_prom') || 'Prom & Gala' },
                  { id: 'wedding', label: t('occ_wedding') || 'Wedding & Bridal' },
                  { id: 'beach', label: t('occ_beach') || 'Beach Party' },
                  { id: 'cocktail', label: t('occ_cocktail') || 'Cocktail Soirée' },
                  { id: 'vacation', label: t('occ_vacation') || 'Vacation Jetset' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleOccasionJump(item.id)}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-900 hover:text-white border border-stone-300 text-xs font-mono tracking-wider text-stone-700 transition-all shadow-2xs"
                  >
                    {item.label} &rarr;
                  </button>
                ))}
              </div>
            </div>

            {/* Value Props & Currency Status */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-700">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 shadow-2xs font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-900" />
                Stripe Direct Secure Checkout
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 shadow-2xs font-mono text-[11px]">
                <span className="text-stone-900 font-bold">{activeCurrency.code}</span>
                Real-time currency ({activeCurrency.symbol})
              </span>
              {activeCampaign && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 font-medium font-mono text-[11px]">
                  <span>-{activeCampaign.discountPercent}% VIP Code Active</span>
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="hero-shop-collection-btn"
                onClick={scrollToCollection}
                className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                <span>{t('shop_collection')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToOccasions}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 shadow-2xs"
              >
                <Compass className="w-4 h-4 text-stone-600" />
                <span>Browse by Occasion (13)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Haute Couture Spotlight Card with Angles & Zoom */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-3">
              <div
                className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-stone-200 bg-stone-900 group"
              >
                <img
                  src={activeAngle.url}
                  alt={activeAngle.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none"></div>

                {/* Top Badge & Zoom Button */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-stone-900/85 text-white border border-stone-700/60 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>{activeAngle.badge || activeAngle.tag}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomOpen(true);
                    }}
                    className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md border border-stone-700/60 shadow-sm transition-colors"
                    title="View 4x Ultra HD High-Res"
                  >
                    <Expand className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Floating Card: Styled Product Details & Quick Inspect */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xl space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-semibold">
                        HAUTE COUTURE LOOKBOOK &bull; ATELIER ÉTOILE
                      </div>
                      <h4 className="text-sm font-serif font-semibold text-stone-900 leading-tight">
                        {activeAngle.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 font-light mt-0.5 line-clamp-2">
                        {activeAngle.desc}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-stone-400 font-mono">Curated Piece</div>
                      <div className="text-sm font-semibold text-stone-900 font-mono">
                        {formatPrice(activeAngle.price)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between border-t border-stone-100">
                    <button
                      onClick={() => activeProduct && setSelectedProductModal(activeProduct)}
                      className="text-xs text-stone-900 font-medium hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect {activeProduct?.title ? activeProduct.title.replace('The Stöffa ', '') : 'Product'}</span>
                    </button>
                    <span className="text-[10px] font-mono text-stone-400">
                      4x Retina HD &bull; Italian Craft
                    </span>
                  </div>
                </div>
              </div>

              {/* Angle Thumbnails Selector */}
              <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500 shrink-0 font-medium">
                  <Camera className="w-3.5 h-3.5 text-stone-700" />
                  <span className="hidden sm:inline">Couture Views:</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {heroAngles.map((angle, idx) => {
                    const isSelected = activeHeroAngleIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveHeroAngleIndex(idx)}
                        className={`relative w-12 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          isSelected
                            ? 'border-stone-900 ring-2 ring-stone-900/30 scale-105 shadow-sm'
                            : 'border-stone-200 opacity-60 hover:opacity-100'
                        }`}
                        title={angle.label}
                      >
                        <img
                          src={angle.url}
                          alt={angle.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {angle.isAi && (
                          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-bl-sm flex items-center justify-center">
                            <span className="w-1 h-1 bg-white rounded-full"></span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <span className="text-[11px] font-mono text-stone-400 shrink-0">
                  {activeHeroAngleIndex + 1}/{heroAngles.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Haute Couture Campaign Editorial Lookbook Strip (3 High-Fashion Vignettes) */}
        <div className="pt-6 border-t border-stone-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
                Haute Couture Campaign Vignettes &bull; Autumn / Winter 2026
              </div>
              <h3 className="text-xl font-serif text-stone-900 font-medium">
                The Stoffa Wardrobe: Handcrafted Footwear & Sculptural Bags
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Photographed on location in Florence & Milan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vignette 1: Suede Babouche */}
            <div
              onClick={() => setActiveHeroAngleIndex(0)}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-900 border border-stone-200 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={AI_MEDIA_ASSETS.stoffaBaboucheOnModel}
                alt="The Stöffa Suede Babouche Slipper On-Model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
              <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                  Look 01 &bull; Florence Courtyard
                </span>
                <h5 className="font-serif text-sm font-medium leading-snug">
                  The Suede Slip-On Babouche
                </h5>
                <p className="text-[10px] text-stone-300 font-light truncate">
                  Model wearing chocolate suede collapsible-heel slippers with cropped ivory linen trousers
                </p>
              </div>
            </div>

            {/* Vignette 2: Soft Foldover Tote */}
            <div
              onClick={() => setActiveHeroAngleIndex(1)}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-900 border border-stone-200 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={AI_MEDIA_ASSETS.stoffaToteOnModel}
                alt="The Stöffa Soft Foldover Nappa Carryall Tote On-Model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
              <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                  Look 02 &bull; Colonnade Promenade
                </span>
                <h5 className="font-serif text-sm font-medium leading-snug">
                  The Soft Foldover Nappa Carryall
                </h5>
                <p className="text-[10px] text-stone-300 font-light truncate">
                  Model carrying the cognac lamb nappa tote over shoulder with fluid sand linen trench
                </p>
              </div>
            </div>

            {/* Vignette 3: Pleated Elastic-Gore Boot */}
            <div
              onClick={() => setActiveHeroAngleIndex(2)}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-900 border border-stone-200 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={AI_MEDIA_ASSETS.stoffaBootOnModel}
                alt="The Stöffa Pleated Elastic-Gore Chelsea Boot On-Model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
              <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                  Look 03 &bull; Milan Street Style
                </span>
                <h5 className="font-serif text-sm font-medium leading-snug">
                  The Pleated Elastic-Gore Boot
                </h5>
                <p className="text-[10px] text-stone-300 font-light truncate">
                  Model wearing walnut calfskin Chelsea boots with micro-pleated stretch gore
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen 4x Retina HD Zoom Modal */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-stone-800 text-white">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  4X ULTRA HD RETINA LOOKBOOK
                </span>
                <h4 className="font-serif text-lg font-medium">{activeAngle.title}</h4>
              </div>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-mono transition-colors"
              >
                Close &times;
              </button>
            </div>

            <div className="relative flex-1 overflow-auto p-2 flex items-center justify-center bg-stone-950">
              <img
                src={activeAngle.url}
                alt={activeAngle.label}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="p-3.5 bg-stone-900 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
              <span>{activeAngle.desc}</span>
              <span className="font-mono text-stone-300 font-semibold">
                Price: {formatPrice(activeAngle.price)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
