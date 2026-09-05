import React, { useState } from 'react';
import {
  ArrowRight,
  Camera,
  Compass,
  Expand,
  Eye,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

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
      url: 'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/sto657G_9.jpg?v=1788565811',
      label: 'On-Model: Skin Crossfront High Wedge Gold',
      tag: '✨ Stöffa Icon 01',
      isAi: false,
      title: 'Skin Crossfront High Wedge Gold',
      desc: 'Signature 3.5-inch high wedge with hand-braided natural jute dori and golden metallic toe loop on cushioned memory footbed',
      productId: 'skin-crossfront-3-5-inch-wedge-gold',
      price: 50,
      badge: 'Bestseller Wedge',
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_E_102_A_0c22a07a-6eaa-4552-9f36-c6d20543e1fd.jpg?v=1788565964',
      label: 'On-Model: Classic High K Wedge Ink',
      tag: '✨ Stöffa Icon 02',
      isAi: false,
      title: 'Classic High K Wedge Ink',
      desc: 'Artisanal Kolhapuri high wedge in midnight ink black with gold-woven accents and non-skid rubber sole',
      productId: 'classic-high-k-wedge-ink',
      price: 48,
      badge: 'Signature Kolhapuri',
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_A_112_A_f60cac26-3fc5-4da9-8f0a-16fbb36386f0.jpg?v=1788565915',
      label: 'On-Model: Crystal Higher K Wedge Champagne',
      tag: '✨ Stöffa Bridal 03',
      isAi: false,
      title: 'Crystal Higher K Wedge Champagne & Silver',
      desc: '4.5-inch glamorous bridal high wedge with pavé crystal encrusted straps and balanced front platform',
      productId: 'crystal-higher-k-wedge-silver',
      price: 60,
      badge: 'Bridal Collection',
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB170_C_CHAMPAGNE_6_fbe5f1bb-99c4-4f55-9b0b-2649613a2f8a.jpg?v=1788565845',
      label: 'On-Model: Crystal Low Wedge Champagne',
      tag: '✨ Stöffa Festive 04',
      isAi: false,
      title: 'Crystal Low Wedge Champagne',
      desc: '2.25-inch low wedge with braided champagne strap and sparkling crystal highlights for effortless day-to-night wear',
      productId: 'crystal-braid-2-25-inch-wedge-champagne',
      price: 52,
      badge: 'Festive Low Wedge',
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO645TAUPE_9_8622f6da-827c-47bc-ad6a-2d4d3ec85a53.jpg?v=1788565833',
      label: 'On-Model: Tassel K Flats Taupe',
      tag: '✨ Stöffa Everyday 05',
      isAi: false,
      title: 'Tassel K Flats Taupe',
      desc: 'Handcrafted Kolhapuri flat with playful tiered braided tassels and ultra-soft memory cushioning',
      productId: 'tassel-k-flats-taupe',
      price: 45,
      badge: 'Everyday Comfort',
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_111_A_6d1e2743-656d-41c8-9e50-bda91f83a522.jpg?v=1788565982',
      label: 'On-Model: Classic K Block Heel Camel & Black',
      tag: '✨ Stöffa Modern 06',
      isAi: false,
      title: 'Classic K Block Heel Camel & Black',
      desc: '2.25-inch ergonomic flared block heel with traditional Kolhapuri strap engineering for all-day celebrations',
      productId: 'classic-k-block-heel-black',
      price: 48,
      badge: 'Architectural Block',
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
              <span>STÖFFA STYLE &bull; AUTHENTIC ARTISANAL FOOTWEAR</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.1] text-stone-900 font-medium">
              Handcrafted Elegance in Every Step
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl">
              Authentic Stöffa Style handcrafted footwear (stoffastyle.com). Featuring signature Kolhapuri high &amp; low wedges, bridal pavé crystal platforms, and cushioned flats engineered with memory-foam footbeds and non-skid soles for effortless celebrations.
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
          {/* Right Column: Stöffa Spotlight Card with Clean Image (NO text or box on image) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-3">
              {/* Pure Stöffa Image Container - completely clean with zero overlays */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-stone-200 bg-stone-100 group">
                <img
                  src={activeAngle.url}
                  alt={activeAngle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Product Details Card - positioned neatly BELOW the image */}
              <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-sm space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-semibold">
                      STÖFFA ATELIER &bull; HANDCRAFTED FOOTWEAR
                    </div>
                    <h4 className="text-base font-serif font-semibold text-stone-900 leading-tight mt-0.5">
                      {activeAngle.title}
                    </h4>
                    <p className="text-xs text-stone-600 font-light mt-1 line-clamp-2">
                      {activeAngle.desc}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 mb-1 rounded text-[10px] uppercase font-bold tracking-wider bg-stone-900 text-stone-100">
                      {activeAngle.badge}
                    </span>
                    <div className="text-base font-semibold text-stone-900 font-mono">
                      {formatPrice(activeAngle.price)}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                  <button
                    onClick={() => activeProduct && setSelectedProductModal(activeProduct)}
                    className="text-xs text-stone-900 font-medium hover:underline flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect {activeProduct?.title ? activeProduct.title.replace('The Stöffa ', '') : 'Product'}</span>
                  </button>

                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="text-xs text-stone-600 hover:text-stone-950 font-mono flex items-center gap-1"
                  >
                    <Expand className="w-3.5 h-3.5" />
                    <span>Full Screen</span>
                  </button>
                </div>
              </div>

              {/* Angle Thumbnails Selector - clean thumbnails without dots/badges */}
              <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500 shrink-0 font-medium">
                  <Camera className="w-3.5 h-3.5 text-stone-700" />
                  <span className="hidden sm:inline">Stöffa Views:</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {heroAngles.map((angle, idx) => {
                    const isSelected = activeHeroAngleIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveHeroAngleIndex(idx)}
                        className={`w-12 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          isSelected
                            ? 'border-stone-900 ring-2 ring-stone-900/30 scale-105 shadow-sm'
                            : 'border-stone-200 opacity-60 hover:opacity-100'
                        }`}
                        title={angle.title}
                      >
                        <img
                          src={angle.url}
                          alt={angle.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
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

        {/* Stöffa Editorial Lookbook Strip - Clean images with details below */}
        <div className="pt-6 border-t border-stone-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
                Stöffa Atelier Highlights &bull; Iconic Silhouettes
              </div>
              <h3 className="text-xl font-serif text-stone-900 font-medium">
                Signature Handcrafted Footwear
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Pure Stöffa Handmade Artistry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroAngles.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveHeroAngleIndex(idx);
                  const p = products.find((prod) => prod.id === item.productId);
                  if (p) setSelectedProductModal(p);
                }}
                className="group rounded-2xl overflow-hidden bg-white border border-stone-200 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                {/* 100% Pure Stöffa photo without any text or box overlay */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                {/* Clean text in card body BELOW image */}
                <div className="p-4 space-y-1 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                      Featured 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-900">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <h5 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-stone-600 font-light line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
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
