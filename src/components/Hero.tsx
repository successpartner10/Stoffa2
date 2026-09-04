import React, { useState } from 'react';
import { ArrowRight, Camera, Compass, ShieldCheck, Sparkles } from 'lucide-react';
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

  const heroProduct = products[0];

  const heroAngles = [
    {
      url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85',
      label: 'Studio Hero',
      tag: 'Front View',
    },
    {
      url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85',
      label: 'Architectural Profile',
      tag: 'Side Contour',
    },
    {
      url: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85',
      label: 'Hand-Turned Leather Sole',
      tag: 'Craft Detail',
    },
    {
      url: AI_MEDIA_ASSETS.shoesDenimCu,
      label: 'AI On-Model: Denim Jeans CU',
      tag: '✨ AI Editorial',
      isAi: true,
      desc: 'American women legs & feet with cropped raw-hem blue jeans',
    },
    {
      url: AI_MEDIA_ASSETS.shoesLegsDress,
      label: 'AI On-Model: Dress Lookbook',
      tag: '✨ AI Lookbook',
      isAi: true,
      desc: 'American women legs & feet with silk slip dress & kitten heel',
    },
  ];

  const activeAngle = heroAngles[activeHeroAngleIndex] || heroAngles[0];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-xs font-mono text-stone-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-stone-900" />
              <span>{t('hero_eyebrow')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.12] text-stone-900 font-medium">
              {t('hero_title')}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl">
              {t('hero_subtitle')}
            </p>

            {/* Antler & Juun.J Curated Event Shortcuts */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-medium flex items-center gap-1.5">
                <span>Direct Event Curation:</span>
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
                    className="px-3 py-1 rounded-full bg-white hover:bg-stone-900 hover:text-white border border-stone-300 text-xs font-mono tracking-wider text-stone-700 transition-all shadow-2xs"
                  >
                    {item.label} &rarr;
                  </button>
                ))}
              </div>
            </div>

            {/* Value Props Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-700">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 shadow-xs font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-900" />
                Stripe Direct Checkout
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 shadow-xs font-mono text-[11px]">
                <span className="text-stone-900 font-bold">{activeCurrency.code}</span>
                Real-time currency ({activeCurrency.symbol})
              </span>
              {activeCampaign && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 font-medium font-mono text-[11px]">
                  <span>-{activeCampaign.discountPercent}% VIP Code Active</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
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
                className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-stone-600" />
                <span>Browse by Occasion (13)</span>
              </button>
            </div>
          </div>

          {/* Right Editorial Spotlight Card: 1 Big Image + 3-4 More Angles (with AI On-Model) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-3">
              <div
                onClick={() => heroProduct && setSelectedProductModal(heroProduct)}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl border border-stone-200 bg-stone-100 cursor-pointer group"
              >
                <img
                  src={activeAngle.url}
                  alt={activeAngle.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/15 to-transparent pointer-events-none"></div>

                {/* Top Angle Badge */}
                <div className="absolute top-4 start-4 z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm flex items-center gap-1.5 ${
                      activeAngle.isAi
                        ? 'bg-amber-900/90 text-amber-100 border border-amber-500/50'
                        : 'bg-stone-900/80 text-white border border-stone-700/50'
                    }`}
                  >
                    {activeAngle.isAi && <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                    <span>{activeAngle.label}</span>
                  </span>
                </div>

                {/* Bottom Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 flex items-center justify-between shadow-lg">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-semibold flex items-center gap-1.5">
                      <span>Featured Footwear</span>
                      {activeAngle.isAi && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                          AI Model Fit
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-serif font-medium text-stone-900 truncate max-w-[190px]">
                      The Pointed Slingback Pump
                    </div>
                    {activeAngle.desc && (
                      <div className="text-[10px] text-stone-600 font-light truncate max-w-[210px]">
                        {activeAngle.desc}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-stone-500">In {activeCurrency.code}</div>
                    <div className="text-sm font-semibold text-stone-900 font-mono">
                      {formatPrice(460)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 or 4 More Angles Thumbnail Selector */}
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500 shrink-0 font-medium">
                  <Camera className="w-3.5 h-3.5 text-stone-400" />
                  <span className="hidden sm:inline">Angles:</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {heroAngles.map((angle, idx) => {
                    const isSelected = activeHeroAngleIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveHeroAngleIndex(idx)}
                        className={`relative w-10 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          isSelected
                            ? 'border-stone-900 ring-2 ring-stone-900/30 scale-105 shadow-xs'
                            : 'border-stone-200 opacity-65 hover:opacity-100'
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
      </div>
    </section>
  );
};
