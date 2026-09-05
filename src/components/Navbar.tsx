import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Globe,
  Layers,
  Package,
  Search,
  ShoppingBag,
  Sliders,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

const CONTINENT_ORDER_CONFIG: { key: string; label: string; icon: string; order: number }[] = [
  { key: 'European', label: 'European', icon: '🇪🇺', order: 1 },
  { key: 'Canada & Americas', label: 'Canada & Americas', icon: '🇨🇦', order: 2 },
  { key: 'Middle East & Asia', label: 'Middle East & Asia', icon: '🌏', order: 3 },
  { key: 'Indian Subcontinent', label: 'Indian Subcontinent', icon: '🇮🇳', order: 4 },
];

export const Navbar: React.FC = () => {
  const {
    currencies,
    activeCurrency,
    setCurrency,
    languages,
    activeLanguage,
    requestLanguageChange,
    cart,
    setIsCartOpen,
    activeCampaign,
    campaigns,
    activateCampaignBySlug,
    viewMode,
    setViewMode,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    setIsB2BModalOpen,
    setIsTrackingModalOpen,
    lookupTracking,
    t,
  } = useCommerce();

  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCampaignMenuOpen, setIsCampaignMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedContinentFilter, setSelectedContinentFilter] = useState<string>('all');
  const [languageSearchTerm, setLanguageSearchTerm] = useState<string>('');

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const enabledCurrencies = currencies.filter((c) => c.isEnabled);
  const enabledLanguages = languages.filter((l) => l.isEnabled);

  // Group and sort languages by continent with Indian at the bottom
  const groupedLanguages = useMemo(() => {
    const q = languageSearchTerm.trim().toLowerCase();
    const filtered = enabledLanguages.filter((l) => {
      if (selectedContinentFilter !== 'all' && l.continent !== selectedContinentFilter) {
        return false;
      }
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        (l.continent && l.continent.toLowerCase().includes(q))
      );
    });

    // Group according to CONTINENT_ORDER_CONFIG (European -> Canada & Americas -> Middle East & Asia -> Indian Subcontinent)
    return CONTINENT_ORDER_CONFIG.map((group) => {
      const items = filtered.filter((l) => l.continent === group.key);
      return {
        ...group,
        items,
        totalEnabledInGroup: enabledLanguages.filter((l) => l.continent === group.key).length,
      };
    }).filter((group) => group.items.length > 0);
  }, [enabledLanguages, selectedContinentFilter, languageSearchTerm]);

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200/90 text-stone-900 transition-colors">
      {/* Top Utility Announcement Bar in light mode */}
      <div className="bg-stone-100/90 px-4 py-1.5 border-b border-stone-200/80 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-stone-700 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            {t('sustainable_luxury')}
          </span>
          <span className="hidden md:inline text-stone-300">•</span>
          <span className="hidden md:inline text-stone-600">
            {t('free_returns')}
          </span>
        </div>

        {/* Global Controls & Mode Switcher */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Quick Currency Selector Dropdown */}
          <div className="relative">
            <button
              id="currency-switcher-btn"
              onClick={() => {
                setIsCurrencyMenuOpen(!isCurrencyMenuOpen);
                setIsLanguageMenuOpen(false);
                setIsCampaignMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 transition-colors shadow-2xs"
              title="Quick switch display currency"
            >
              <span className="text-sm">{activeCurrency.flag}</span>
              <span className="font-semibold">{activeCurrency.code}</span>
              <span className="text-stone-500 font-normal">({activeCurrency.symbol})</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {isCurrencyMenuOpen && (
              <div className="absolute end-0 mt-1.5 w-52 rounded-xl bg-white border border-stone-200 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 text-stone-800">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-500 uppercase tracking-wider border-b border-stone-100">
                  Select Currency (1-Click)
                </div>
                {enabledCurrencies.map((curr) => (
                  <button
                    key={curr.code}
                    id={`currency-option-${curr.code.toLowerCase()}`}
                    onClick={() => {
                      setCurrency(curr.code);
                      setIsCurrencyMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-start transition-colors ${
                      activeCurrency.code === curr.code
                        ? 'bg-stone-100 text-stone-900 font-bold'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{curr.flag}</span>
                      <span className="font-medium">{curr.code}</span>
                      <span className="text-stone-400 font-normal">({curr.symbol})</span>
                    </span>
                    {activeCurrency.code === curr.code && <Check className="w-3.5 h-3.5 text-stone-900" />}
                  </button>
                ))}
                <div className="p-2 border-t border-stone-100 text-center">
                  <button
                    onClick={() => {
                      setIsCurrencyMenuOpen(false);
                      setViewMode('admin');
                    }}
                    className="text-[11px] text-stone-900 hover:underline font-semibold"
                  >
                    Manage 1-Click Currencies →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Language Selector Dropdown with Continent Grouping */}
          <div className="relative">
            <button
              id="language-switcher-btn"
              onClick={() => {
                setIsLanguageMenuOpen(!isLanguageMenuOpen);
                setIsCurrencyMenuOpen(false);
                setIsCampaignMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 transition-colors shadow-2xs"
              title="Quick switch store language"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>{activeLanguage.flag}</span>
              <span className="uppercase font-semibold tracking-wider">{activeLanguage.code}</span>
              <span className="hidden md:inline text-stone-600 font-normal">
                ({activeLanguage.code === 'fr' ? 'Français' : activeLanguage.code === 'es' ? 'Español' : activeLanguage.name})
              </span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {isLanguageMenuOpen && (
              <div className="absolute end-0 mt-1.5 w-80 sm:w-96 rounded-2xl bg-white border border-stone-200 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 text-stone-800">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-stone-700" />
                    <span className="text-xs font-bold text-stone-900 tracking-wide uppercase">
                      Storefront Language
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    Sorted by Continent
                  </span>
                </div>

                {/* Continent Quick Filter Pills */}
                <div className="flex items-center gap-1 py-2 overflow-x-auto no-scrollbar text-[11px]">
                  <button
                    onClick={() => setSelectedContinentFilter('all')}
                    className={`px-2 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                      selectedContinentFilter === 'all'
                        ? 'bg-stone-900 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    All ({enabledLanguages.length})
                  </button>
                  {CONTINENT_ORDER_CONFIG.map((c) => {
                    const count = enabledLanguages.filter((l) => l.continent === c.key).length;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setSelectedContinentFilter(c.key)}
                        className={`px-2 py-1 rounded-md font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                          selectedContinentFilter === c.key
                            ? 'bg-stone-900 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <span>{c.icon}</span>
                        <span>{c.label === 'Canada & Americas' ? 'Canada' : c.label === 'Indian Subcontinent' ? 'Indian' : c.label}</span>
                        <span className="opacity-70 text-[10px]">({count})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div className="relative my-1">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={languageSearchTerm}
                    onChange={(e) => setLanguageSearchTerm(e.target.value)}
                    placeholder="Search Hindi, Français, Español, Tamil..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
                  />
                  {languageSearchTerm && (
                    <button
                      onClick={() => setLanguageSearchTerm('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Grouped Language List */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mt-1">
                  {groupedLanguages.length === 0 ? (
                    <div className="py-6 text-center text-xs text-stone-400">
                      No matching languages found
                    </div>
                  ) : (
                    groupedLanguages.map((group) => (
                      <div key={group.key} className="space-y-1">
                        {/* Continent Section Header */}
                        <div className="sticky top-0 bg-stone-50/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-stone-600 uppercase tracking-wider flex items-center justify-between border border-stone-200/50">
                          <span className="flex items-center gap-1.5">
                            <span>{group.icon}</span>
                            <span>{group.label}</span>
                            {group.key === 'Indian Subcontinent' && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold lowercase">
                                (south & north)
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400 font-normal">
                            {group.items.length} languages
                          </span>
                        </div>

                        {/* Languages in Group */}
                        <div className="grid grid-cols-1 gap-1">
                          {group.items.map((lang) => {
                            const isSelected = activeLanguage.code === lang.code;
                            // Explicit requested display names: French as "Français", Spanish as "Español"
                            const displayName =
                              lang.code === 'fr'
                                ? 'Français'
                                : lang.code === 'es'
                                ? 'Español'
                                : lang.nativeName;

                            return (
                              <button
                                key={lang.code}
                                id={`language-option-${lang.code}`}
                                onClick={() => {
                                  if (lang.code !== activeLanguage.code) {
                                    requestLanguageChange(lang.code);
                                  }
                                  setIsLanguageMenuOpen(false);
                                  setLanguageSearchTerm('');
                                }}
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition-all ${
                                  isSelected
                                    ? 'bg-stone-900 text-white font-medium shadow-xs'
                                    : 'text-stone-800 hover:bg-stone-100'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="text-xl shrink-0">{lang.flag}</span>
                                  <div className="truncate">
                                    <div className="flex items-center gap-1.5">
                                      <span className={`font-semibold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                                        {displayName}
                                      </span>
                                      {lang.code === 'fr' && (
                                        <span className={`text-[10px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                                          (Français)
                                        </span>
                                      )}
                                      {lang.code === 'es' && (
                                        <span className={`text-[10px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                                          (Español)
                                        </span>
                                      )}
                                    </div>
                                    <div className={`text-[11px] truncate ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                                      {lang.name} • <span className="uppercase font-mono font-medium">{lang.code}</span>
                                    </div>
                                  </div>
                                </div>

                                {isSelected && (
                                  <Check className="w-4 h-4 text-white shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer link to merchant language manager */}
                <div className="p-2 mt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500">
                    Instant client-side 1-click engine
                  </span>
                  <button
                    onClick={() => {
                      setIsLanguageMenuOpen(false);
                      setViewMode('admin');
                    }}
                    className="text-[11px] text-stone-900 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Manage All Languages</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mode Navigation Capsule */}
          <div className="hidden sm:flex items-center rounded-full bg-stone-200/80 p-0.5 border border-stone-300 text-xs">
            <button
              id="nav-mode-storefront"
              onClick={() => setViewMode('storefront')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                viewMode === 'storefront'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {t('storefront_mode')}
            </button>
            <button
              id="nav-mode-admin"
              onClick={() => setViewMode('admin')}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === 'admin'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Sliders className="w-3 h-3" />
              <span>{t('admin_mode')}</span>
            </button>
            <button
              id="nav-mode-affiliate"
              onClick={() => setViewMode('affiliate_portal')}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === 'affiliate_portal'
                  ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>{t('affiliate_portal')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-8">
          <button
            id="brand-logo-btn"
            onClick={() => {
              setViewMode('storefront');
              setSelectedCategory('All');
            }}
            className="text-left group"
          >
            <span className="block font-serif text-2xl tracking-widest text-stone-900 group-hover:text-stone-700 transition-colors uppercase font-bold">
              STÖFFA
            </span>
            <span className="block text-[9px] uppercase tracking-[0.35em] text-stone-500 font-mono font-medium">
              Artisanal Handcrafted Footwear
            </span>
          </button>

          {/* Category Navigation Links */}
          {viewMode === 'storefront' && (
            <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider text-stone-600 font-medium">
              <button
                onClick={() => {
                  const el = document.getElementById('occasions-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-stone-900 font-semibold hover:text-black transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-300"
              >
                <Sparkles className="w-3 h-3 text-stone-900" />
                <span>Occasions (13)</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('storefront');
                  setSelectedCategory('All');
                }}
                className="text-stone-900 font-semibold hover:text-black transition-colors"
              >
                {t('all_categories')}
              </button>
              <button
                onClick={() => {
                  setViewMode('storefront');
                  setSelectedCategory('Heels');
                }}
                className="hover:text-stone-900 transition-colors"
              >
                {t('category_heels')}
              </button>
              <button
                onClick={() => {
                  setViewMode('storefront');
                  setSelectedCategory('Flats & Loafers');
                }}
                className="hover:text-stone-900 transition-colors"
              >
                {t('category_flats')}
              </button>
            </nav>
          )}
        </div>

        {/* Right Action Icons & Search Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Real-Time Search Field */}
          {viewMode === 'storefront' && (
            <div className="relative flex items-center">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="navbar-search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Stöffa, suede, boots, totes..."
                  className="w-36 sm:w-52 md:w-64 bg-white border border-stone-300 rounded-full pl-8 pr-7 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:w-72 transition-all shadow-2xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* B2B Wholesale Portal Button */}
          <button
            id="nav-b2b-btn"
            onClick={() => setIsB2BModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 transition-colors shadow-2xs"
            title="Open B2B Bulk Purchasing and PO builder"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>B2B Orders</span>
          </button>

          {/* Shipment Tracking Shortcut */}
          <button
            id="nav-track-btn"
            onClick={() => {
              const el = document.getElementById('order-tracker-footer-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setIsTrackingModalOpen(true);
              }
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Track shipment progress"
          >
            <Package className="w-3.5 h-3.5 text-stone-500" />
            <span>Track</span>
          </button>

          {/* Custom Campaign URL Simulation Pill */}
          <div className="relative">
            <button
              id="active-campaign-btn"
              onClick={() => {
                setIsCampaignMenuOpen(!isCampaignMenuOpen);
                setIsCurrencyMenuOpen(false);
                setIsLanguageMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeCampaign
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-medium'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-900" />
              <span className="truncate max-w-[90px] sm:max-w-[140px] font-mono">
                {activeCampaign ? `/c/${activeCampaign.slug}` : 'VIP URL'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isCampaignMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-white border border-stone-200 shadow-xl p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-semibold text-stone-900">
                    Social Campaign URL Tester
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono font-semibold">Attribution Engine</span>
                </div>
                <p className="text-[11px] text-stone-600 my-2">
                  Click a campaign to test how custom URLs immediately set currency, language, and affiliate tracking:
                </p>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {campaigns.map((camp) => (
                    <button
                      key={camp.id}
                      onClick={() => {
                        activateCampaignBySlug(camp.slug);
                        setIsCampaignMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors border ${
                        activeCampaign?.id === camp.id
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                          : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-stone-900 font-semibold">
                        <span>/c/{camp.slug}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-stone-600 border border-stone-200">
                          {camp.platform}
                        </span>
                      </div>
                      <div className="text-stone-500 text-[11px] mt-0.5 truncate">
                        {camp.creatorName} • -{camp.discountPercent}% • {camp.defaultCurrency || 'USD'} / {camp.defaultLanguage?.toUpperCase() || 'EN'}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setIsCampaignMenuOpen(false);
                      setViewMode('admin');
                    }}
                    className="text-[11px] text-stone-900 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Create New Custom URL</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Bag Trigger in light mode */}
          <button
            id="open-shopping-bag-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-white border border-stone-300 hover:border-stone-400 text-stone-800 hover:text-stone-950 transition-colors shadow-2xs"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-scale">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Mode Switcher Bar */}
      <div className="sm:hidden px-4 py-2 bg-stone-100 border-t border-stone-200 flex items-center justify-around text-xs">
        <button
          onClick={() => setViewMode('storefront')}
          className={`px-3 py-1 rounded font-medium ${
            viewMode === 'storefront' ? 'text-stone-950 font-bold' : 'text-stone-600'
          }`}
        >
          Storefront
        </button>
        <button
          onClick={() => setViewMode('admin')}
          className={`px-3 py-1 rounded font-medium ${
            viewMode === 'admin' ? 'text-stone-950 font-bold' : 'text-stone-600'
          }`}
        >
          Admin Engine
        </button>
        <button
          onClick={() => setViewMode('affiliate_portal')}
          className={`px-3 py-1 rounded font-medium ${
            viewMode === 'affiliate_portal' ? 'text-emerald-800 font-bold' : 'text-stone-600'
          }`}
        >
          Affiliate Portal
        </button>
      </div>
    </header>
  );
};
