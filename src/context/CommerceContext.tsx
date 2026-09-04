import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  AVAILABLE_CURRENCY_PRESETS,
  AVAILABLE_LANGUAGE_PRESETS,
  INITIAL_AFFILIATES,
  INITIAL_CAMPAIGNS,
  INITIAL_CURRENCIES,
  INITIAL_LANGUAGES,
  INITIAL_PAYOUTS,
  INITIAL_PRODUCTS,
  TRANSLATIONS,
} from '../data/mockData';
import { STOFFA_BRAND_STORY, STOFFA_STORE_PRODUCTS } from '../data/stoffaCatalog';
import {
  Affiliate,
  B2BOrderItem,
  Campaign,
  CartItem,
  Currency,
  Language,
  Order,
  Payout,
  Product,
  ShipmentMilestone,
  SortOption,
  TrackingDetails,
} from '../types';
import { getProductAngles } from '../data/productMedia';

interface CommerceContextType {
  // Storefront & Products
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occ: string) => void;
  clearFilters: () => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (prod: Product | null) => void;

  // Search, Sorting & Size Filters
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  selectedSizeFilter: string;
  setSelectedSizeFilter: (size: string) => void;

  // Product Comparison
  comparisonList: Product[];
  addToComparison: (p: Product) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;

  // Storytelling seasonal description
  storytellingText: string;
  setStorytellingText: (text: string) => void;
  resetStorytellingText: () => void;

  // B2B Wholesale & Bulk ordering
  b2bList: B2BOrderItem[];
  addToB2BList: (item: B2BOrderItem) => void;
  removeFromB2BList: (index: number) => void;
  clearB2BList: () => void;
  isB2BModalOpen: boolean;
  setIsB2BModalOpen: (open: boolean) => void;
  b2bTargetProduct: Product | null;
  setB2BTargetProduct: (p: Product | null) => void;

  // Order Tracking
  lookupTracking: (trackingNum: string) => TrackingDetails | null;
  activeTrackingDetails: TrackingDetails | null;
  setActiveTrackingDetails: (t: TrackingDetails | null) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;

  // CSV Catalog Management
  exportCatalogCSV: () => string;
  importProductsFromCSV: (csvString: string) => { success: boolean; count: number; error?: string };
  importStoffaCatalog: () => { success: boolean; count: number };
  updateProductPrice: (productId: string, newPriceUSD: number) => { success: boolean; error?: string };
  isCatalogManagerOpen: boolean;
  setIsCatalogManagerOpen: (open: boolean) => void;

  // Language Change Confirmation
  pendingLanguage: Language | null;
  requestLanguageChange: (code: string) => void;
  confirmLanguageChange: () => void;
  cancelLanguageChange: () => void;

  // Quota limits handling
  quotaAlert: { message: string; retryAction?: () => void } | null;
  triggerQuotaAlert: (msg?: string, retryAction?: () => void) => void;
  dismissQuotaAlert: () => void;

  // Social Share
  shareProduct: (product: Product, platform?: string) => Promise<{ success: boolean; message: string }>;

  // Currencies & 1-Click Toggle
  currencies: Currency[];
  activeCurrency: Currency;
  setCurrency: (code: string) => void;
  toggleCurrency: (code: string) => void;
  updateCurrencyRate: (code: string, newRate: number) => void;
  addCurrencyPreset: (presetCode: string) => void;
  formatPrice: (amountUSD: number) => string;

  // Languages & 1-Click Localization
  languages: Language[];
  activeLanguage: Language;
  setLanguage: (code: string) => void;
  toggleLanguage: (code: string) => void;
  addLanguagePreset: (presetCode: string) => void;
  t: (key: string) => string;

  // Custom Campaign URL Tracking
  campaigns: Campaign[];
  activeCampaign: Campaign | null;
  activateCampaignBySlug: (slug: string) => boolean;
  clearActiveCampaign: () => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'clicks' | 'conversions' | 'revenueUSD' | 'createdAt' | 'isActive'>) => void;
  toggleCampaignStatus: (id: string) => void;

  // Affiliates & Automated Payouts
  affiliates: Affiliate[];
  payouts: Payout[];
  activeAffiliateId: string;
  setActiveAffiliateId: (id: string) => void;
  executeStripePayout: (affiliateId: string) => void;
  executeBatchStripePayouts: () => number;

  // Cart & Orders
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: { name: string; hex: string }, qty?: number) => void;
  updateCartQuantity: (index: number, delta: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (customer: { name: string; email: string; address: string }) => Order;

  // App Views
  viewMode: 'storefront' | 'admin' | 'affiliate_portal';
  setViewMode: (mode: 'storefront' | 'admin' | 'affiliate_portal') => void;
  adminTab: 'campaigns' | 'affiliates' | 'payouts' | 'i18n_currencies' | 'analytics' | 'catalog_cms';
  setAdminTab: (tab: 'campaigns' | 'affiliates' | 'payouts' | 'i18n_currencies' | 'analytics' | 'catalog_cms') => void;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Persistent or Initialized State ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('etoile_products');
    const catalogSource = localStorage.getItem('etoile_catalog_source');
    if (!saved || catalogSource !== 'stoffa_v3') {
      localStorage.setItem('etoile_catalog_source', 'stoffa_v3');
      localStorage.setItem('etoile_products', JSON.stringify(STOFFA_STORE_PRODUCTS));
      return STOFFA_STORE_PRODUCTS;
    }
    try {
      const parsed: Product[] = JSON.parse(saved);
      // Ensure products contain the updated Stöffa catalog
      const hasStoffa = parsed.some((p) => p.id.startsWith('stoffa_') || p.title.toLowerCase().includes('stoffa') || p.title.includes('Stöffa'));
      if (!hasStoffa || parsed.length === 0) {
        localStorage.setItem('etoile_products', JSON.stringify(STOFFA_STORE_PRODUCTS));
        return STOFFA_STORE_PRODUCTS;
      }
      return parsed;
    } catch {
      return STOFFA_STORE_PRODUCTS;
    }
  });

  const saveProducts = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem('etoile_products', JSON.stringify(newProds));
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  // Search, Sorting & Size Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');

  // Product Comparison State
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);

  const addToComparison = (p: Product) => {
    setComparisonList((prev) => {
      if (prev.some((item) => item.id === p.id)) return prev;
      if (prev.length >= 2) {
        return [prev[1], p];
      }
      return [...prev, p];
    });
    setIsComparisonOpen(true);
  };

  const removeFromComparison = (id: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  // Storytelling Seasonal Description
  const DEFAULT_STORYTELLING =
    'Curated in collaboration with European master tanners in Florence and Porto. The Autumn / Winter 2026 collection celebrates sculptural geometry, ergonomic hand-sculpted lasts, and sustainable Tuscan nappa leather. Designed for modern living with seamless occasion versatility and effortless luxury.';

  const [storytellingText, setStorytellingTextState] = useState<string>(() => {
    return localStorage.getItem('etoile_storytelling_text') || DEFAULT_STORYTELLING;
  });

  const setStorytellingText = (text: string) => {
    setStorytellingTextState(text);
    localStorage.setItem('etoile_storytelling_text', text);
  };

  const resetStorytellingText = () => {
    setStorytellingText(DEFAULT_STORYTELLING);
  };

  // B2B Wholesale Ordering
  const [b2bList, setB2BList] = useState<B2BOrderItem[]>(() => {
    const saved = localStorage.getItem('etoile_b2b_list');
    return saved ? JSON.parse(saved) : [];
  });
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);
  const [b2bTargetProduct, setB2BTargetProduct] = useState<Product | null>(null);

  const addToB2BList = (item: B2BOrderItem) => {
    setB2BList((prev) => {
      const updated = [...prev, item];
      localStorage.setItem('etoile_b2b_list', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromB2BList = (index: number) => {
    setB2BList((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('etoile_b2b_list', JSON.stringify(updated));
      return updated;
    });
  };

  const clearB2BList = () => {
    setB2BList([]);
    localStorage.removeItem('etoile_b2b_list');
  };

  // Tracking & Shipments
  const [activeTrackingDetails, setActiveTrackingDetails] = useState<TrackingDetails | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // CSV Catalog Management
  const [isCatalogManagerOpen, setIsCatalogManagerOpen] = useState(false);

  // Language Change Warning Modal
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);

  // Quota Limits & Fallback
  const [quotaAlert, setQuotaAlert] = useState<{ message: string; retryAction?: () => void } | null>(null);

  const triggerQuotaAlert = (msg?: string, retryAction?: () => void) => {
    setQuotaAlert({
      message:
        msg ||
        'Gemini 3.8 Flash quota limit or model provider threshold reached. Atelier AI fallback engine activated with offline cached styling parameters.',
      retryAction,
    });
  };

  const dismissQuotaAlert = () => {
    setQuotaAlert(null);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('all');
    setSearchTerm('');
    setSelectedSizeFilter('all');
    setSortBy('featured');
  };

  // Currencies state
  const [currencies, setCurrencies] = useState<Currency[]>(() => {
    const saved = localStorage.getItem('etoile_currencies');
    return saved ? JSON.parse(saved) : INITIAL_CURRENCIES;
  });
  const [activeCurrencyCode, setActiveCurrencyCode] = useState<string>(() => {
    return localStorage.getItem('etoile_active_currency') || 'CAD'; // Defaulting to CAD as user noted cad, USD
  });

  // Languages state
  const [languages, setLanguages] = useState<Language[]>(() => {
    const saved = localStorage.getItem('etoile_languages');
    if (!saved) return INITIAL_LANGUAGES;
    try {
      const parsed: Language[] = JSON.parse(saved);
      const map = new Map(parsed.map((p) => [p.code, p]));
      // Merge: preserve isEnabled from saved, but use latest updated metadata (e.g. name: 'Français', 'Español', continent, continentOrder)
      const merged = INITIAL_LANGUAGES.map((initL) => {
        const existing = map.get(initL.code);
        return existing
          ? {
              ...initL,
              isEnabled: existing.isEnabled !== undefined ? existing.isEnabled : initL.isEnabled,
            }
          : initL;
      });
      const extra = parsed.filter((p) => !INITIAL_LANGUAGES.some((initL) => initL.code === p.code));
      return [...merged, ...extra];
    } catch {
      return INITIAL_LANGUAGES;
    }
  });
  const [activeLanguageCode, setActiveLanguageCode] = useState<string>(() => {
    return localStorage.getItem('etoile_active_language') || 'en';
  });

  // Campaigns & Affiliates state
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('etoile_campaigns');
    if (!saved) return INITIAL_CAMPAIGNS;
    try {
      const parsed: Campaign[] = JSON.parse(saved);
      const missing = INITIAL_CAMPAIGNS.filter((initC) => !parsed.some((p) => p.id === initC.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(() => {
    // Start with default tiktok-clara campaign for immediate demonstration of social URL tracking
    return INITIAL_CAMPAIGNS[0];
  });

  const [affiliates, setAffiliates] = useState<Affiliate[]>(() => {
    const saved = localStorage.getItem('etoile_affiliates');
    return saved ? JSON.parse(saved) : INITIAL_AFFILIATES;
  });
  const [activeAffiliateId, setActiveAffiliateId] = useState<string>('aff_01');

  const [payouts, setPayouts] = useState<Payout[]>(() => {
    const saved = localStorage.getItem('etoile_payouts');
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  // Cart & Orders
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('etoile_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('etoile_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Views
  const [viewMode, setViewMode] = useState<'storefront' | 'admin' | 'affiliate_portal'>('storefront');
  const [adminTab, setAdminTab] = useState<'campaigns' | 'affiliates' | 'payouts' | 'i18n_currencies' | 'analytics'>('campaigns');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('etoile_currencies', JSON.stringify(currencies));
  }, [currencies]);

  useEffect(() => {
    localStorage.setItem('etoile_languages', JSON.stringify(languages));
  }, [languages]);

  useEffect(() => {
    localStorage.setItem('etoile_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('etoile_affiliates', JSON.stringify(affiliates));
  }, [affiliates]);

  useEffect(() => {
    localStorage.setItem('etoile_payouts', JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem('etoile_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('etoile_orders', JSON.stringify(orders));
  }, [orders]);

  // Active currency object
  const activeCurrency = currencies.find((c) => c.code === activeCurrencyCode && c.isEnabled) ||
    currencies.find((c) => c.isEnabled) ||
    currencies[0];

  const setCurrency = (code: string) => {
    setActiveCurrencyCode(code);
    localStorage.setItem('etoile_active_currency', code);
  };

  // 1-Click Toggle Currency
  const toggleCurrency = (code: string) => {
    setCurrencies((prev) => {
      const target = prev.find((c) => c.code === code);
      if (!target) return prev;
      // Do not disable if it's the last remaining enabled currency
      const enabledCount = prev.filter((c) => c.isEnabled).length;
      if (target.isEnabled && enabledCount <= 1) return prev;

      return prev.map((c) => (c.code === code ? { ...c, isEnabled: !c.isEnabled } : c));
    });
  };

  const updateCurrencyRate = (code: string, newRate: number) => {
    if (newRate <= 0) return;
    setCurrencies((prev) => prev.map((c) => (c.code === code ? { ...c, rate: newRate } : c)));
  };

  const addCurrencyPreset = (presetCode: string) => {
    const found = AVAILABLE_CURRENCY_PRESETS.find((p) => p.code === presetCode);
    if (!found) return;
    if (currencies.some((c) => c.code === presetCode)) {
      toggleCurrency(presetCode);
      return;
    }
    setCurrencies((prev) => [...prev, { ...found, isEnabled: true }]);
  };

  // Price formatting
  const formatPrice = (amountUSD: number) => {
    const converted = amountUSD * activeCurrency.rate;
    // For Japanese Yen or Korean Won, no decimals
    if (activeCurrency.code === 'JPY' || activeCurrency.code === 'KRW') {
      return `${activeCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${activeCurrency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Active language object
  const activeLanguage = languages.find((l) => l.code === activeLanguageCode && l.isEnabled) ||
    languages.find((l) => l.isEnabled) ||
    languages[0];

  useEffect(() => {
    const isRtl = activeLanguage.dir === 'rtl' || activeLanguage.code === 'fa' || activeLanguage.code === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = activeLanguage.code;
  }, [activeLanguage]);

  const setLanguage = (code: string) => {
    setActiveLanguageCode(code);
    localStorage.setItem('etoile_active_language', code);
  };

  // 1-Click Toggle Language
  const toggleLanguage = (code: string) => {
    setLanguages((prev) => {
      const target = prev.find((l) => l.code === code);
      if (!target) return prev;
      const enabledCount = prev.filter((l) => l.isEnabled).length;
      if (target.isEnabled && enabledCount <= 1) return prev;
      return prev.map((l) => (l.code === code ? { ...l, isEnabled: !l.isEnabled } : l));
    });
  };

  const addLanguagePreset = (presetCode: string) => {
    const found = AVAILABLE_LANGUAGE_PRESETS.find((p) => p.code === presetCode);
    if (!found) return;
    if (languages.some((l) => l.code === presetCode)) {
      toggleLanguage(presetCode);
      return;
    }
    setLanguages((prev) => [...prev, { ...found, isEnabled: true }]);
  };

  // Translation helper
  const t = (key: string): string => {
    const langDict = TRANSLATIONS[activeLanguage.code];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    return TRANSLATIONS.en[key] || key;
  };

  // Campaign Activation by Custom URL slug
  const activateCampaignBySlug = (slug: string): boolean => {
    const campaign = campaigns.find((c) => c.slug.toLowerCase() === slug.toLowerCase() && c.isActive);
    if (!campaign) return false;

    setActiveCampaign(campaign);
    // Auto preset currency if specified in campaign
    if (campaign.defaultCurrency) {
      const targetCurr = currencies.find((c) => c.code === campaign.defaultCurrency);
      if (targetCurr && targetCurr.isEnabled) {
        setCurrency(campaign.defaultCurrency);
      }
    }
    // Auto preset language if specified in campaign
    if (campaign.defaultLanguage) {
      const targetLang = languages.find((l) => l.code === campaign.defaultLanguage);
      if (targetLang) {
        if (!targetLang.isEnabled) {
          setLanguages((prev) => prev.map((l) => (l.code === campaign.defaultLanguage ? { ...l, isEnabled: true } : l)));
        }
        setLanguage(campaign.defaultLanguage);
      }
    }

    // Increment campaign clicks
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaign.id ? { ...c, clicks: c.clicks + 1 } : c))
    );

    // If tied to an affiliate, increment affiliate clicks
    if (campaign.affiliateId) {
      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === campaign.affiliateId ? { ...a, totalClicks: a.totalClicks + 1 } : a
        )
      );
    }

    return true;
  };

  const clearActiveCampaign = () => {
    setActiveCampaign(null);
  };

  const createCampaign = (
    newCamp: Omit<Campaign, 'id' | 'clicks' | 'conversions' | 'revenueUSD' | 'createdAt' | 'isActive'>
  ) => {
    const campaignItem: Campaign = {
      ...newCamp,
      id: `camp_${Date.now()}`,
      clicks: 0,
      conversions: 0,
      revenueUSD: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
    };
    setCampaigns((prev) => [campaignItem, ...prev]);
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Automated Payouts via Stripe Connect
  const executeStripePayout = (affiliateId: string) => {
    const affiliate = affiliates.find((a) => a.id === affiliateId);
    if (!affiliate || affiliate.clearedCommissionUSD <= 0) return;

    const payoutAmount = affiliate.clearedCommissionUSD;
    const newPayout: Payout = {
      id: `pay_${Date.now()}`,
      affiliateId: affiliate.id,
      affiliateName: affiliate.name,
      amountUSD: payoutAmount,
      currency: 'USD',
      paymentMethod: 'Stripe Connect',
      status: 'paid',
      transactionHash: `tr_strp_${Math.random().toString(36).substring(2, 12)}`,
      initiatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
    };

    setPayouts((prev) => [newPayout, ...prev]);

    setAffiliates((prev) =>
      prev.map((a) => {
        if (a.id === affiliateId) {
          return {
            ...a,
            clearedCommissionUSD: 0,
            paidCommissionUSD: a.paidCommissionUSD + payoutAmount,
          };
        }
        return a;
      })
    );

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const executeBatchStripePayouts = (): number => {
    const eligibleAffiliates = affiliates.filter((a) => a.clearedCommissionUSD > 0 && a.stripeConnected);
    if (eligibleAffiliates.length === 0) return 0;

    let totalDisbursed = 0;
    const newPayoutsList: Payout[] = [];

    eligibleAffiliates.forEach((aff) => {
      totalDisbursed += aff.clearedCommissionUSD;
      newPayoutsList.push({
        id: `pay_${Date.now()}_${aff.id}`,
        affiliateId: aff.id,
        affiliateName: aff.name,
        amountUSD: aff.clearedCommissionUSD,
        currency: 'USD',
        paymentMethod: 'Stripe Connect',
        status: 'paid',
        transactionHash: `tr_batch_${Math.random().toString(36).substring(2, 12)}`,
        initiatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      });
    });

    setPayouts((prev) => [...newPayoutsList, ...prev]);

    setAffiliates((prev) =>
      prev.map((a) => {
        const matching = eligibleAffiliates.find((ea) => ea.id === a.id);
        if (matching) {
          return {
            ...a,
            clearedCommissionUSD: 0,
            paidCommissionUSD: a.paidCommissionUSD + matching.clearedCommissionUSD,
          };
        }
        return a;
      })
    );

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });

    return totalDisbursed;
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: { name: string; hex: string }, qty: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Place Order with Attribution
  const placeOrder = (customer: { name: string; email: string; address: string }): Order => {
    const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
    const discountRate = activeCampaign ? activeCampaign.discountPercent / 100 : 0;
    const discountUSD = subtotalUSD * discountRate;
    const totalUSD = subtotalUSD - discountUSD;
    const currencyTotal = totalUSD * activeCurrency.rate;

    const generatedTracking = `ETL-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: `ord_${Date.now().toString().slice(-6)}`,
      items: [...cart],
      subtotalUSD,
      discountUSD,
      totalUSD,
      currency: activeCurrency.code,
      currencyTotal,
      customerEmail: customer.email,
      customerName: customer.name,
      shippingAddress: customer.address,
      campaignSlug: activeCampaign?.slug,
      affiliateId: activeCampaign?.affiliateId,
      status: 'confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      trackingNumber: generatedTracking,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Attribution update for campaign
    if (activeCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === activeCampaign.id
            ? {
                ...c,
                conversions: c.conversions + 1,
                revenueUSD: c.revenueUSD + totalUSD,
              }
            : c
        )
      );

      // Attribution update for affiliate
      if (activeCampaign.affiliateId) {
        const affiliate = affiliates.find((a) => a.id === activeCampaign.affiliateId);
        if (affiliate) {
          const commissionEarned = totalUSD * affiliate.commissionRate;
          setAffiliates((prev) =>
            prev.map((a) =>
              a.id === affiliate.id
                ? {
                    ...a,
                    totalSales: a.totalSales + 1,
                    totalRevenueUSD: a.totalRevenueUSD + totalUSD,
                    // By default, new order commission enters 14-day clearance hold
                    pendingCommissionUSD: a.pendingCommissionUSD + commissionEarned,
                  }
                : a
            )
          );
        }
      }
    }

    clearCart();

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });

    return newOrder;
  };

  // Simulated Order Tracking Lookup
  const lookupTracking = (rawNum: string): TrackingDetails | null => {
    const trackingNum = rawNum.trim().toUpperCase();
    if (!trackingNum) return null;

    const matchedOrder = orders.find(
      (o) =>
        o.id.toUpperCase() === trackingNum ||
        (o.trackingNumber && o.trackingNumber.toUpperCase() === trackingNum)
    );

    const targetNum = matchedOrder?.trackingNumber || trackingNum;
    const itemsLabel = matchedOrder
      ? matchedOrder.items.map((i) => `${i.quantity}x ${i.product.title} (${i.selectedSize})`).join(', ')
      : '1x The Architectural Sculpted Slingback Pump (EU 38), 1x The Monolithic Box Calfskin Tote';
    const destLabel = matchedOrder?.shippingAddress || 'Montreal, QC, Canada';

    const milestones: ShipmentMilestone[] = [
      {
        stage: 'ordered',
        title: 'Order Confirmed & Allocation Reserved',
        location: 'Atelier Étoile HQ • Florence, Italy',
        date: 'Sept 01, 2026 — 09:15 CET',
        completed: true,
        current: false,
        notes: 'Encrypted Stripe Connect authorization completed. Inventory reserved.',
      },
      {
        stage: 'verified',
        title: 'Artisanal Inspection & White-Glove Packaging',
        location: 'Tuscan Leatherworks Facility • Scandicci, Italy',
        date: 'Sept 02, 2026 — 14:30 CET',
        completed: true,
        current: false,
        notes: 'Hand-buffed box calfskin, dustbags assigned, brass authenticity seal verified.',
      },
      {
        stage: 'dispatched',
        title: 'Handed to Carrier • Air Express Flight Departed',
        location: 'Pisa / Florence International Cargo Hub (PSA)',
        date: 'Sept 03, 2026 — 21:40 CET',
        completed: true,
        current: false,
        notes: 'Flight DHL-942 Departed for Transatlantic International Gateway.',
      },
      {
        stage: 'in_transit',
        title: 'Customs Clearance Completed & Transit Hub',
        location: 'North American Sort Facility • Mirabel / JFK',
        date: 'Sept 04, 2026 — 06:12 EDT',
        completed: true,
        current: true,
        notes: 'Import duties prepaid & cleared. Processed through international hub.',
      },
      {
        stage: 'out_for_delivery',
        title: 'Out for Delivery via Express Courier Van',
        location: 'Local Metropolitan Distribution Hub',
        date: 'Expected Today by 17:30',
        completed: false,
        current: false,
        notes: 'Courier with signature delivery protocol.',
      },
      {
        stage: 'delivered',
        title: 'White-Glove Doorstep Delivery',
        location: destLabel,
        date: 'Estimated Sept 05, 2026',
        completed: false,
        current: false,
        notes: 'Signature required upon receipt.',
      },
    ];

    const details: TrackingDetails = {
      trackingNumber: targetNum,
      carrier: 'DHL Express Worldwide & Priority Air',
      status: 'In Transit',
      estimatedDelivery: 'Sept 05, 2026 (Before 17:30)',
      origin: 'Florence / Scandicci (Italy)',
      destination: destLabel,
      weight: '2.40 kg / 5.3 lbs',
      milestones,
      itemsSummary: itemsLabel,
    };

    setActiveTrackingDetails(details);
    setIsTrackingModalOpen(true);
    return details;
  };

  // CSV Catalog Management
  const exportCatalogCSV = (): string => {
    const headers = ['id', 'title', 'subtitle', 'category', 'priceUSD', 'rating', 'reviewCount', 'materials', 'sizes', 'description'];
    const rows = products.map((p) => [
      `"${p.id}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.subtitle.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.priceUSD,
      p.rating,
      p.reviewCount,
      `"${p.materials.replace(/"/g, '""')}"`,
      `"${p.sizes.join(';')}"`,
      `"${p.description.replace(/"/g, '""')}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  };

  const importProductsFromCSV = (csvString: string): { success: boolean; count: number; error?: string } => {
    try {
      const lines = csvString.trim().split(/\r?\n/);
      if (lines.length < 2) {
        return { success: false, count: 0, error: 'CSV must contain a header row and at least one product row.' };
      }

      const parseCSVLine = (text: string) => {
        const result: string[] = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === '"') {
            if (inQuotes && text[i + 1] === '"') {
              cur += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
          } else {
            cur += char;
          }
        }
        result.push(cur.trim());
        return result;
      };

      const rawHeaders = parseCSVLine(lines[0]).map((h) => h.toLowerCase());
      const idIdx = rawHeaders.indexOf('id');
      const titleIdx = rawHeaders.indexOf('title');
      const priceIdx = rawHeaders.indexOf('priceusd') !== -1 ? rawHeaders.indexOf('priceusd') : rawHeaders.indexOf('price');
      const catIdx = rawHeaders.indexOf('category');

      if (titleIdx === -1 || priceIdx === -1) {
        return { success: false, count: 0, error: 'CSV is missing required headers: "title" and "priceUSD" (or "price").' };
      }

      const imported: Product[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const cols = parseCSVLine(lines[i]);
        const title = cols[titleIdx];
        if (!title) continue;

        const rawPrice = parseFloat(cols[priceIdx]);
        const priceUSD = isNaN(rawPrice) || rawPrice <= 0 ? 350 : Math.round(rawPrice * 100) / 100;
        const category = catIdx !== -1 && cols[catIdx] ? cols[catIdx] : 'Shoes';
        const id = idIdx !== -1 && cols[idIdx] ? cols[idIdx] : `csv_${Date.now()}_${i}`;
        const subtitleIdx = rawHeaders.indexOf('subtitle');
        const subtitle = subtitleIdx !== -1 && cols[subtitleIdx] ? cols[subtitleIdx] : `${category} crafted in Tuscan leather`;
        const materialsIdx = rawHeaders.indexOf('materials');
        const materials = materialsIdx !== -1 && cols[materialsIdx] ? cols[materialsIdx] : 'Full-grain Italian calfskin, hand-turned leather sole.';
        const sizesIdx = rawHeaders.indexOf('sizes');
        const sizes = sizesIdx !== -1 && cols[sizesIdx] ? cols[sizesIdx].split(';').map((s) => s.trim()).filter(Boolean) : ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'];
        const descIdx = rawHeaders.indexOf('description');
        const description = descIdx !== -1 && cols[descIdx] ? cols[descIdx] : `${title}. Designed for effortless modern elegance and lasting comfort.`;

        const existing = products.find((p) => p.id === id || p.title.toLowerCase() === title.toLowerCase());
        const baseImages = existing?.images || [
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1600&q=90&dpr=2',
          'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1600&q=90&dpr=2',
        ];

        const angles = getProductAngles(id, category, baseImages);

        const newProd: Product = {
          id,
          title,
          subtitle,
          category,
          occasions: existing?.occasions || ['all', 'cocktail', 'date_night'],
          occasionNote: existing?.occasionNote || 'Versatile day-to-evening styling',
          priceUSD,
          images: angles.map((a) => a.url),
          angles,
          sizes: sizes.length > 0 ? sizes : ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
          colors: existing?.colors || [
            { name: 'Nero Black', hex: '#1C1B1B' },
            { name: 'Espresso Tuscan Brown', hex: '#3B2F2F' },
          ],
          inventory: existing?.inventory || { 'EU 36': 4, 'EU 37': 5, 'EU 38': 6, 'EU 39': 3, 'EU 40': 2, 'EU 41': 1 },
          description,
          materials,
          rating: existing?.rating || 4.9,
          reviewCount: existing?.reviewCount || 18,
          isNewArrival: true,
        };

        imported.push(newProd);
      }

      if (imported.length === 0) {
        return { success: false, count: 0, error: 'No valid products could be parsed from the CSV.' };
      }

      saveProducts(imported);
      return { success: true, count: imported.length };
    } catch (err: any) {
      return { success: false, count: 0, error: err?.message || 'Error parsing CSV file.' };
    }
  };

  const importStoffaCatalog = (): { success: boolean; count: number } => {
    saveProducts(STOFFA_STORE_PRODUCTS);
    localStorage.setItem('etoile_catalog_source', 'stoffa_v3');
    setStorytellingText(STOFFA_BRAND_STORY);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    return { success: true, count: STOFFA_STORE_PRODUCTS.length };
  };

  const updateProductPrice = (productId: string, newPriceUSD: number): { success: boolean; error?: string } => {
    if (isNaN(newPriceUSD) || newPriceUSD <= 0) {
      return { success: false, error: 'Price must be a valid positive number.' };
    }
    const updated = products.map((p) => (p.id === productId ? { ...p, priceUSD: Math.round(newPriceUSD * 100) / 100 } : p));
    saveProducts(updated);
    return { success: true };
  };

  // Language Change Confirmation
  const requestLanguageChange = (code: string) => {
    const target = languages.find((l) => l.code === code);
    if (!target) return;
    if (target.code === activeLanguage.code) return;
    setPendingLanguage(target);
  };

  const confirmLanguageChange = () => {
    if (pendingLanguage) {
      if (!pendingLanguage.isEnabled) {
        setLanguages((prev) => prev.map((l) => (l.code === pendingLanguage.code ? { ...l, isEnabled: true } : l)));
      }
      setLanguage(pendingLanguage.code);
      setPendingLanguage(null);
    }
  };

  const cancelLanguageChange = () => {
    setPendingLanguage(null);
  };

  // Social Share
  const shareProduct = async (product: Product, platform?: string): Promise<{ success: boolean; message: string }> => {
    const shareUrl = `${window.location.origin}/?product=${product.id}`;
    const shareText = `Explore ${product.title} at Atelier Étoile: ${product.subtitle}`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      return { success: true, message: 'Opening X / Twitter...' };
    } else if (platform === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(product.images[0])}&description=${encodeURIComponent(shareText)}`, '_blank');
      return { success: true, message: 'Opening Pinterest...' };
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
      return { success: true, message: 'Opening WhatsApp...' };
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        return { success: true, message: 'Shareable product link copied to clipboard!' };
      }
    } catch {
      // ignore
    }
    return { success: true, message: `Share link: ${shareUrl}` };
  };

  return (
    <CommerceContext.Provider
      value={{
        products,
        selectedCategory,
        setSelectedCategory,
        selectedOccasion,
        setSelectedOccasion,
        clearFilters,
        selectedProductModal,
        setSelectedProductModal,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        selectedSizeFilter,
        setSelectedSizeFilter,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isComparisonOpen,
        setIsComparisonOpen,
        storytellingText,
        setStorytellingText,
        resetStorytellingText,
        b2bList,
        addToB2BList,
        removeFromB2BList,
        clearB2BList,
        isB2BModalOpen,
        setIsB2BModalOpen,
        b2bTargetProduct,
        setB2BTargetProduct,
        lookupTracking,
        activeTrackingDetails,
        setActiveTrackingDetails,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        exportCatalogCSV,
        importProductsFromCSV,
        importStoffaCatalog,
        updateProductPrice,
        isCatalogManagerOpen,
        setIsCatalogManagerOpen,
        pendingLanguage,
        requestLanguageChange,
        confirmLanguageChange,
        cancelLanguageChange,
        quotaAlert,
        triggerQuotaAlert,
        dismissQuotaAlert,
        shareProduct,
        currencies,
        activeCurrency,
        setCurrency,
        toggleCurrency,
        updateCurrencyRate,
        addCurrencyPreset,
        formatPrice,
        languages,
        activeLanguage,
        setLanguage,
        toggleLanguage,
        addLanguagePreset,
        t,
        campaigns,
        activeCampaign,
        activateCampaignBySlug,
        clearActiveCampaign,
        createCampaign,
        toggleCampaignStatus,
        affiliates,
        payouts,
        activeAffiliateId,
        setActiveAffiliateId,
        executeStripePayout,
        executeBatchStripePayouts,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        placeOrder,
        viewMode,
        setViewMode,
        adminTab,
        setAdminTab,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
