import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Gift,
  Globe,
  Search,
  ShoppingBag,
  Sliders,
  Sparkles,
  User,
  Users,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { STOFFA_BRAND_ASSETS } from '../data/stoffaMediaAssets';
import { SeashellLogo } from './SeashellLogo';

interface NavItem {
  label: string;
  categoryFilter?: string;
  dropdown?: { label: string; filter: string; description?: string }[];
  isHighlight?: boolean;
}

export const Navbar: React.FC = () => {
  const {
    currencies,
    activeCurrency,
    setCurrency,
    cart,
    setIsCartOpen,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    setIsB2BModalOpen,
    setIsTrackingModalOpen,
    t,
  } = useCommerce();

  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const enabledCurrencies = currencies.filter((c) => c.isEnabled);

  const navItems: NavItem[] = [
    {
      label: 'JUST IN',
      categoryFilter: 'Just In',
    },
    {
      label: 'BEST SELLERS',
      categoryFilter: 'Best Sellers',
    },
    {
      label: 'RESORT',
      categoryFilter: "Resort '26",
    },
    {
      label: 'DRESSES',
      categoryFilter: 'Dresses',
    },
    {
      label: 'SEPARATES',
      categoryFilter: 'Separates',
    },
    {
      label: 'ACCESSORIES',
      categoryFilter: 'Accessories',
    },
    {
      label: 'MOMMY & ME',
      categoryFilter: 'Mommy & Me',
    },
    {
      label: "MEN'S",
      categoryFilter: "Men's",
    },
    {
      label: 'COLLECTIONS',
      categoryFilter: "Resort '26",
      dropdown: [
        { label: 'Labor Day Style Guide', filter: 'Labor Day Style Guide' },
        { label: 'Katie Couric Collection', filter: 'Katie Couric Collection' },
        { label: 'The Navy Edit', filter: 'The Navy Edit' },
        { label: 'Kaftans', filter: 'Kaftans' },
        { label: 'Soft Neutrals', filter: 'Soft Neutrals' },
        { label: 'Beach-to-Table Dresses', filter: 'Beach-to-Table Dresses' },
        { label: 'What to Pack for Vacation', filter: 'What to Pack for Vacation' },
        { label: 'Eyelets', filter: 'Eyelets' },
        { label: 'Occasion', filter: 'Occasion' },
        { label: "Resort '26", filter: "Resort '26" },
      ],
    },
    {
      label: 'SALE',
      categoryFilter: 'Sale',
      isHighlight: true,
    },
  ];

  const handleSelectNav = (filter?: string) => {
    setActiveDropdown(null);
    setViewMode('storefront');
    if (filter) {
      setSelectedCategory(filter);
      const target =
        document.getElementById('category-products-section') ||
        document.getElementById('collection-grid');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    setViewMode('storefront');
    setSelectedCategory("Resort '26");
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 text-slate-800 transition-colors shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#1c1917] text-white px-4 py-2 text-xs flex items-center justify-between gap-3">
        {/* Left spacer for centering on desktop */}
        <div className="hidden md:block w-32" />

        {/* Center: Announcement message */}
        <div className="flex-1 text-center font-medium tracking-wider flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs uppercase font-serif tracking-widest text-amber-100">
            HANDCRAFTED IN MUMBAI ✦ STOFFASTYLE.COM ✦ CELEBRITY RED-CARPET COMFORT
          </span>
          <button
            onClick={() => handleSelectNav('Shoes')}
            className="text-[11px] underline text-amber-400 hover:text-white font-mono uppercase ml-1 cursor-pointer"
          >
            EXPLORE WEDGES
          </button>
        </div>

        {/* Right: Currency / Country Selector */}
        <div className="relative">
          <button
            id="currency-switcher-btn"
            onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
            title="Change currency and country"
          >
            <span className="text-sm">{activeCurrency.flag}</span>
            <span className="font-semibold">{activeCurrency.code === 'CAD' ? 'Canada (CAD $)' : `${activeCurrency.code} (${activeCurrency.symbol})`}</span>
            <ChevronDown className="w-3 h-3 text-amber-200" />
          </button>

          {isCurrencyMenuOpen && (
            <div className="absolute end-0 mt-2 w-56 rounded-2xl bg-white border border-amber-100 shadow-2xl py-2 z-50 animate-in fade-in text-slate-800">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-amber-50 font-mono">
                Select Currency & Country
              </div>
              {enabledCurrencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code);
                    setIsCurrencyMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-start transition-colors cursor-pointer ${
                    activeCurrency.code === curr.code
                      ? 'bg-amber-50 text-amber-950 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{curr.flag}</span>
                    <span className="font-medium">
                      {curr.code === 'CAD' ? 'Canada (CAD $)' : curr.code === 'USD' ? 'United States (USD $)' : curr.code === 'EUR' ? 'Europe (EUR €)' : `${curr.code} (${curr.symbol})`}
                    </span>
                  </span>
                  {activeCurrency.code === curr.code && <Check className="w-3.5 h-3.5 text-amber-800" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Brand Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Search Input Box */}
        <div className="w-1/4 sm:w-1/3 flex items-center">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-amber-700 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="navbar-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search wedges, kolhapuris, flats, potlis..."
              className="w-full bg-[#fdfbf7] border border-amber-200/80 rounded-full ps-9 pe-8 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-600/30 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Center: Brand Identity (Teal Seashell Icon + "walker & wade" in elegant serif tracked typography) */}
        <div className="flex-1 flex justify-center text-center">
          <button
            id="brand-logo-btn"
            onClick={handleLogoClick}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="transition-transform duration-300 group-hover:scale-105 mb-0.5">
              <SeashellLogo size={36} />
            </div>
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.16em] text-[#0d3b46] lowercase font-medium transition-colors group-hover:text-teal-900">
              walker &amp; wade
            </span>
          </button>
        </div>

        {/* Right: Rewards, Account & Cart */}
        <div className="w-1/4 sm:w-1/3 flex items-center justify-end gap-3 sm:gap-4 text-slate-700">
          {/* Rewards Button */}
          <button
            id="nav-rewards-btn"
            onClick={() => setIsRewardsModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-sky-900 transition-colors cursor-pointer"
          >
            <Gift className="w-4 h-4 text-teal-700" />
            <span>Rewards</span>
          </button>

          {/* Account / Order Tracking Button */}
          <button
            id="nav-account-btn"
            onClick={() => setIsTrackingModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-sky-900 transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 text-teal-700" />
            <span>Account</span>
          </button>

          {/* Shopping Cart Button */}
          <button
            id="cart-toggle-btn"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0d3b46] hover:bg-[#07262d] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="w-5 h-5 rounded-full bg-white text-[#0d3b46] text-[11px] font-bold flex items-center justify-center font-mono">
              {totalCartCount}
            </span>
          </button>

          {/* Portal Switchers */}
          <div className="hidden lg:flex items-center gap-1.5 ps-2 border-s border-slate-200">
            <button
              onClick={() => setViewMode('admin')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'admin' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-800'
              }`}
              title="Merchant Admin"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('affiliate_portal')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'affiliate_portal' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-800'
              }`}
              title="Affiliate Portal"
            >
              <Users className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Links Row (Directly below the logo row matching the screenshot) */}
      <nav className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-2.5 text-[11px] sm:text-xs font-sans uppercase tracking-[0.1em]">
            {navItems.map((item) => {
              const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
              const isOpen = activeDropdown === item.label;
              const isSelected =
                (item.categoryFilter === selectedCategory) ||
                (item.label === 'RESORT' && (selectedCategory === "Resort '26" || selectedCategory === 'Resort')) ||
                (item.label === 'COLLECTIONS' && item.dropdown?.some((d) => d.filter === selectedCategory));

              return (
                <div
                  key={item.label}
                  className="relative shrink-0"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleSelectNav(item.categoryFilter)}
                    className={`py-1 flex items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                        : item.isHighlight
                        ? 'text-amber-800 hover:text-amber-950 font-medium border-b-2 border-transparent'
                        : 'text-slate-700 hover:text-slate-950 font-normal border-b-2 border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>

                  {/* Dropdown Menu (Right aligned or centered under COLLECTIONS as in screenshot) */}
                  {hasDropdown && isOpen && (
                    <div className="absolute start-0 sm:start-auto sm:end-0 top-full mt-1 w-60 bg-white border border-slate-200/90 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 text-slate-800">
                      <div className="space-y-0.5">
                        {item.dropdown!.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => handleSelectNav(sub.filter)}
                            className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer block ${
                              selectedCategory === sub.filter
                                ? 'text-[#0d3b46] font-semibold bg-slate-50'
                                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Rewards & Loyalty Program Modal */}
      {isRewardsModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsRewardsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl border border-sky-100 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-900 mx-auto flex items-center justify-center border border-sky-100">
              <Gift className="w-7 h-7 text-sky-700" />
            </div>

            <div>
              <h3 className="font-serif text-xl text-slate-900 font-semibold">
                Walker & Wade VIP Club
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-light">
                Earn 1 Sunny Point for every $1 spent. Unlock $20 coupons, secret preview links, and complimentary monogramming.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f0f7fb] border border-sky-100 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono font-semibold text-sky-900">
                <span>Welcome Bonus</span>
                <span>+100 pts</span>
              </div>
              <div className="flex items-center justify-between font-mono font-semibold text-sky-900">
                <span>Birthday Gift</span>
                <span>$25 Credit</span>
              </div>
              <div className="flex items-center justify-between font-mono font-semibold text-sky-900">
                <span>Free Express Shipping</span>
                <span>Always Included</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsRewardsModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-white font-semibold text-xs uppercase tracking-wider"
              >
                Join with 1-Click
              </button>
              <button
                onClick={() => setIsRewardsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
