import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { STOFFA_BRAND_ASSETS } from '../data/stoffaMediaAssets';

export const Hero: React.FC = () => {
  const { formatPrice, activeCurrency, setSelectedCategory } = useCommerce();

  const handleShopCollection = () => {
    setSelectedCategory('All');
    const el = document.getElementById('category-products-section') || document.getElementById('symmetrical-edits');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCelebrity = () => {
    const el = document.getElementById('celebrity-spotting-rail') || document.getElementById('category-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* High-Impact Hero Banner directly from stoffastyle.com */}
      <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center">
        {/* Background Image from stoffastyle.com */}
        <img
          src={STOFFA_BRAND_ASSETS.heroBanner}
          alt="Stoffa Style New Arrivals Banner from stoffastyle.com"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
        />

        {/* Soft harmonious gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-slate-950/75" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-slate-950/60" />

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24 flex flex-col items-center">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <img
              src={STOFFA_BRAND_ASSETS.logo}
              alt="Stoffa Style Logo"
              className="h-4 w-auto brightness-0 invert"
            />
            <span className="font-semibold tracking-widest">HANDCRAFTED IN MUMBAI &bull; STOFFASTYLE.COM</span>
          </div>

          {/* Headline */}
          <div className="space-y-2 mb-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-white font-medium drop-shadow-md">
              <span className="italic font-light">Stoffa</span> Style
            </h1>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-amber-200 font-semibold drop-shadow-xs">
              ✦ ICONIC KOLHAPURI WEDGES, ARTISANAL FLATS & EMBELLISHED POTLIS ✦
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-200 max-w-xl font-light leading-relaxed mb-8 drop-shadow-xs">
            Handcrafted luxury footwear and accessories designed and manufactured in-house in Mumbai. Retailed from our flagship store and over 50 designer boutiques across India.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-shop-collection-btn"
              onClick={handleShopCollection}
              className="px-8 py-3.5 rounded-full bg-amber-100 text-slate-950 hover:bg-white font-semibold text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer"
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-explore-sale-btn"
              onClick={handleExploreCelebrity}
              className="px-8 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md font-semibold text-xs tracking-widest uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>CELEBRITY SPOTTING</span>
            </button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-200 font-mono">
            <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Handcrafted In-House</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Dual-Density Memory Foam</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
              <span className="font-bold text-amber-200">{activeCurrency.code}</span>
              <span>Global Currency Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
