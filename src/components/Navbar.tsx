import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Globe,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { SeashellLogo } from './SeashellLogo';

interface ShoeSubItem {
  id: string;
  label: string;
  filterValue: string;
}

export const Navbar: React.FC = () => {
  const {
    activeLanguage,
    setIsLanguageModalOpen,
    cart,
    setIsCartOpen,
    setViewMode,
    selectedCategory,
    setSelectedCategory,
    setIsCatalogManagerOpen,
    adminUser,
    isAdminLoggedIn,
    logoutAdmin,
    setIsAdminLoginModalOpen,
    t,
  } = useCommerce();

  const [shoesDropdownOpen, setShoesDropdownOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShoesExpanded, setMobileShoesExpanded] = useState(true);
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(false);

  const shoesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const collectionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 5 Shoe subcategories as per handwritten image (clean, unnumbered, without style counts)
  const shoeSubItems: ShoeSubItem[] = [
    {
      id: 'low-wedges',
      label: 'Low wedges - 2.5 inch',
      filterValue: 'Low wedges - 2.5 inch',
    },
    {
      id: 'high-wedges',
      label: 'High wedges - 3.5 inch',
      filterValue: 'High wedges - 3.5 inch',
    },
    {
      id: 'higher-wedge',
      label: 'Higher wedge - 4.25 inch',
      filterValue: 'Higher wedge - 4.25 inch',
    },
    {
      id: 'block-heels',
      label: 'Block Heels',
      filterValue: 'Block Heels',
    },
    {
      id: 'flats',
      label: 'Flats',
      filterValue: 'Flats',
    },
  ];

  const collectionSubItems = [
    { label: 'Bridal Wedges', filterValue: 'Bridal Wedges' },
    { label: 'High Wedges (3.5")', filterValue: 'High wedges - 3.5 inch' },
    { label: 'Kolhapuri Flats', filterValue: 'Flats' },
    { label: 'Low Wedges (2.5")', filterValue: 'Low wedges - 2.5 inch' },
    { label: 'Block Heels', filterValue: 'Block Heels' },
    { label: 'Bags & Potlis', filterValue: 'Bags' },
    { label: 'View All Collections', filterValue: 'Collections' },
  ];

  const handleSelectNav = (filterValue: string) => {
    setViewMode('storefront');
    setShoesDropdownOpen(false);
    setCollectionsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (filterValue === 'All' || filterValue === 'Home') {
      setSelectedCategory('All');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSelectedCategory(filterValue);
    const target =
      document.getElementById('category-products-section') ||
      document.getElementById('collection-grid') ||
      document.getElementById('symmetrical-edits');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    setViewMode('storefront');
    setSelectedCategory('All');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShoesMouseEnter = () => {
    if (shoesTimeoutRef.current) clearTimeout(shoesTimeoutRef.current);
    setShoesDropdownOpen(true);
  };

  const handleShoesMouseLeave = () => {
    shoesTimeoutRef.current = setTimeout(() => {
      setShoesDropdownOpen(false);
    }, 150);
  };

  const handleCollectionsMouseEnter = () => {
    if (collectionsTimeoutRef.current) clearTimeout(collectionsTimeoutRef.current);
    setCollectionsDropdownOpen(true);
  };

  const handleCollectionsMouseLeave = () => {
    collectionsTimeoutRef.current = setTimeout(() => {
      setCollectionsDropdownOpen(false);
    }, 150);
  };

  // Check if current category matches Shoes or one of its 5 children
  const isShoesActive =
    selectedCategory === 'Shoes' ||
    shoeSubItems.some((item) => item.filterValue === selectedCategory);

  const isCollectionsActive =
    selectedCategory === 'Collections' ||
    collectionSubItems.some((item) => item.filterValue === selectedCategory);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 transition-colors shadow-xs">
      {/* 0. Admin Status Banner (ONLY when logged in as sulaniyashpal@gmail.com) */}
      {isAdminLoggedIn && (
        <div className="bg-stone-950 text-amber-300 px-4 sm:px-8 py-2 border-b border-amber-500/30 flex items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-white">Admin Session Active:</span>
            <span className="font-mono text-amber-300 bg-stone-900 px-2 py-0.5 rounded border border-amber-500/30">
              {adminUser}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              id="admin-bar-catalog-csv-btn"
              onClick={() => setIsCatalogManagerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-400 text-stone-950 font-bold hover:bg-amber-300 transition-colors cursor-pointer text-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Manage Catalog CSV</span>
            </button>
            <button
              id="admin-bar-dashboard-btn"
              onClick={() => setViewMode('admin')}
              className="flex items-center gap-1.5 px-3 py-1 rounded border border-stone-700 bg-stone-900 text-stone-200 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer text-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>
            <button
              id="admin-bar-logout-btn"
              onClick={logoutAdmin}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-stone-400 hover:text-rose-400 hover:bg-stone-900 transition-colors cursor-pointer text-xs"
              title="Log out of admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. Top Announcement Bar in Clean High-Contrast Dark Slate */}
      <div className="bg-[#0f172a] text-white px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4 border-b border-slate-800">
        {/* Left: Brand Announcement with larger bold font */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span className="font-serif tracking-widest text-amber-100 uppercase hidden md:inline">
            ACCESSOIREE LUXURY ✦ ALL PRICES EXCLUSIVELY IN USD ($) ✦ COMPLIMENTARY WORLDWIDE EXPRESS DELIVERY
          </span>
          <span className="font-serif tracking-widest text-amber-100 uppercase md:hidden">
            ACCESSOIREE LUXURY ✦ USD ($)
          </span>
        </div>

        {/* Top Right: Language Selector */}
        <div className="flex items-center gap-3 shrink-0 ms-auto">
          <button
            id="navbar-language-modal-btn"
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/20 shadow-2xs hover:border-amber-300"
            title="Select storefront language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="tracking-wide">
              {activeLanguage.nativeName || activeLanguage.name}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Main Brand Header Row (Crisp White with centered luxury typography) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle or Spacer */}
        <div className="w-1/4 sm:w-1/3 flex items-center">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:block">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-700">
              Est. 2026 • Mumbai &amp; New York
            </span>
          </div>
        </div>

        {/* Center: Brand Identity with less bold, 20% smaller typography */}
        <div className="flex-1 flex justify-center text-center">
          <button
            id="brand-logo-btn"
            onClick={handleLogoClick}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="transition-transform duration-300 group-hover:scale-105 mb-1">
              <SeashellLogo size={36} />
            </div>
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] tracking-[0.18em] text-stone-900 font-medium lowercase transition-colors group-hover:text-stone-950 leading-none">
              accessoiree
            </span>
          </button>
        </div>

        {/* Right: Walker & Wade Inspired Cart Icon & Count */}
        <div className="w-1/4 sm:w-1/3 flex items-center justify-end gap-3">
          <button
            id="cart-toggle-btn"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-stone-300 hover:border-stone-950 bg-white hover:bg-stone-50 text-stone-950 transition-all shadow-2xs hover:shadow-sm cursor-pointer group"
            aria-label="View Shopping Cart"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-stone-900 stroke-[1.75] group-hover:scale-105 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-stone-950 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em]">
              {t('cart')}
            </span>
            <span className="text-xs font-mono font-semibold text-stone-600">
              ({totalCartCount})
            </span>
          </button>
        </div>
      </div>

      {/* 3. Navigation Links Row: Walker & Wade Clean White Aesthetic with Underline Movement */}
      <nav className="hidden md:block bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 lg:gap-10">
            {/* JUST IN */}
            <div className="relative group">
              <button
                id="nav-just-in-btn"
                onClick={() => handleSelectNav('Just In')}
                className={`relative py-4 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer block ${
                  selectedCategory === 'Just In'
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_just_in')}</span>
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    selectedCategory === 'Just In'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </div>

            {/* SHOES (With Dropdown per attached handwritten image, no numbers, no descriptions) */}
            <div
              className="relative group"
              onMouseEnter={handleShoesMouseEnter}
              onMouseLeave={handleShoesMouseLeave}
            >
              <button
                id="nav-shoes-btn"
                onClick={() => handleSelectNav('Shoes')}
                className={`relative py-4 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isShoesActive
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_shoes')}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    shoesDropdownOpen ? 'rotate-180 text-stone-950' : 'text-stone-600'
                  }`}
                />
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    isShoesActive
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>

              {/* Walker & Wade Clean Style Dropdown Menu for SHOES */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 transition-all duration-200 ease-out ${
                  shoesDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="w-[280px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden py-2">
                  {shoeSubItems.map((item) => {
                    const isItemActive = selectedCategory === item.filterValue;
                    return (
                      <button
                        key={item.id}
                        id={`nav-shoe-sub-${item.id}`}
                        onClick={() => handleSelectNav(item.filterValue)}
                        className={`w-full px-5 py-3 text-left flex items-center justify-between group/sub transition-all cursor-pointer ${
                          isItemActive
                            ? 'bg-amber-50 text-stone-950 font-bold border-l-4 border-stone-950'
                            : 'text-stone-900 hover:bg-stone-50 hover:text-stone-950'
                        }`}
                      >
                        <span className="text-sm font-semibold tracking-wide text-stone-900 group-hover/sub:text-stone-950 group-hover/sub:translate-x-0.5 transition-transform">
                          {item.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/sub:opacity-100 text-stone-600 transition-opacity" />
                      </button>
                    );
                  })}
                  <div className="pt-2 px-5 border-t border-stone-100 mt-1">
                    <button
                      onClick={() => handleSelectNav('Shoes')}
                      className="w-full py-2 text-left text-xs font-bold uppercase tracking-[0.14em] text-stone-900 hover:text-amber-900 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>View All Shoes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BAGS */}
            <div className="relative group">
              <button
                id="nav-bags-btn"
                onClick={() => handleSelectNav('Bags')}
                className={`relative py-4 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer block ${
                  selectedCategory === 'Bags'
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_bags')}</span>
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    selectedCategory === 'Bags'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </div>

            {/* COLLECTIONS (With Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={handleCollectionsMouseEnter}
              onMouseLeave={handleCollectionsMouseLeave}
            >
              <button
                id="nav-collections-btn"
                onClick={() => handleSelectNav('Collections')}
                className={`relative py-4 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isCollectionsActive
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_collections')}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    collectionsDropdownOpen ? 'rotate-180 text-stone-950' : 'text-stone-600'
                  }`}
                />
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    isCollectionsActive
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>

              {/* Collections Dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 transition-all duration-200 ease-out ${
                  collectionsDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="w-[300px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden py-3">
                  <div className="px-5 py-2.5 border-b border-stone-100 bg-stone-50/80">
                    <span className="text-[11px] uppercase tracking-[0.18em] font-extrabold text-stone-800">
                      Curated Editions
                    </span>
                  </div>
                  <div className="py-2">
                    {collectionSubItems.map((c) => (
                      <button
                        key={c.label}
                        onClick={() => handleSelectNav(c.filterValue)}
                        className={`w-full px-5 py-2.5 text-left text-sm font-bold tracking-wide transition-colors cursor-pointer flex items-center justify-between ${
                          selectedCategory === c.filterValue
                            ? 'bg-amber-50 text-stone-950 border-l-4 border-stone-950'
                            : 'text-stone-900 hover:bg-stone-50 hover:text-stone-950'
                        }`}
                      >
                        <span>{c.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 hover:opacity-100 text-stone-500" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SALE */}
            <div className="relative group">
              <button
                id="nav-sale-btn"
                onClick={() => handleSelectNav('Sale')}
                className={`relative py-4 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer block ${
                  selectedCategory === 'Sale'
                    ? 'text-stone-950'
                    : 'text-rose-700 hover:text-rose-900'
                }`}
              >
                <span className="text-rose-700">{t('nav_sale')}</span>
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-rose-700 transition-all duration-300 ease-out ${
                    selectedCategory === 'Sale'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </div>

            {/* READY TO SHIP */}
            <div className="relative group">
              <button
                id="nav-ready-to-ship-btn"
                onClick={() => handleSelectNav('Ready to Ship')}
                className={`relative py-4 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer block ${
                  selectedCategory === 'Ready to Ship'
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_ready_to_ship')}</span>
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    selectedCategory === 'Ready to Ship'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer (Clean White Aesthetic) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-black/60 backdrop-blur-xs">
          <div className="w-4/5 max-w-sm h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <span className="font-serif text-2xl font-bold lowercase tracking-widest text-stone-950">
                accessoiree
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-stone-600 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* JUST IN */}
              <button
                onClick={() => handleSelectNav('Just In')}
                className="w-full text-left py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 border-b border-stone-100"
              >
                Just In
              </button>

              {/* SHOES ACCORDION */}
              <div>
                <button
                  onClick={() => setMobileShoesExpanded(!mobileShoesExpanded)}
                  className="w-full py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 flex items-center justify-between border-b border-stone-100"
                >
                  <span>Shoes</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileShoesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileShoesExpanded && (
                  <div className="pl-3 py-2 space-y-2 border-l-2 border-stone-200 ml-2 mt-2">
                    {shoeSubItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectNav(item.filterValue)}
                        className="w-full text-left py-1.5 text-base font-semibold text-stone-800 hover:text-stone-950 flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => handleSelectNav('Shoes')}
                      className="w-full text-left py-1.5 text-xs uppercase font-bold text-stone-800 tracking-wider pt-2"
                    >
                      View All Shoes →
                    </button>
                  </div>
                )}
              </div>

              {/* BAGS */}
              <button
                onClick={() => handleSelectNav('Bags')}
                className="w-full text-left py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 border-b border-stone-100"
              >
                {t('nav_bags')}
              </button>

              {/* COLLECTIONS ACCORDION */}
              <div>
                <button
                  onClick={() => setMobileCollectionsExpanded(!mobileCollectionsExpanded)}
                  className="w-full py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 flex items-center justify-between border-b border-stone-100"
                >
                  <span>{t('nav_collections')}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileCollectionsExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileCollectionsExpanded && (
                  <div className="pl-3 py-2 space-y-2 border-l-2 border-stone-200 ml-2 mt-2">
                    {collectionSubItems.map((c) => (
                      <button
                        key={c.label}
                        onClick={() => handleSelectNav(c.filterValue)}
                        className="w-full text-left py-1 text-base font-semibold text-stone-800 hover:text-stone-950"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SALE */}
              <button
                onClick={() => handleSelectNav('Sale')}
                className="w-full text-left py-2 text-lg font-bold uppercase tracking-[0.14em] text-rose-700 border-b border-stone-100"
              >
                {t('nav_sale')}
              </button>

              {/* READY TO SHIP */}
              <button
                onClick={() => handleSelectNav('Ready to Ship')}
                className="w-full text-left py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 border-b border-stone-100"
              >
                {t('nav_ready_to_ship')}
              </button>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-stone-200 space-y-3 bg-stone-50">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLanguageModalOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-white text-stone-900 font-bold text-sm flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4 text-amber-600" />
                <span>{activeLanguage.name}</span>
              </button>

              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCatalogManagerOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Admin: Catalog CSV</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
