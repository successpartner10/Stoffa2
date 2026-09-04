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
import { Affiliate, Campaign, CartItem, Currency, Language, Order, Payout, Product } from '../types';

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
  adminTab: 'campaigns' | 'affiliates' | 'payouts' | 'i18n_currencies' | 'analytics';
  setAdminTab: (tab: 'campaigns' | 'affiliates' | 'payouts' | 'i18n_currencies' | 'analytics') => void;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Persistent or Initialized State ---
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('all');
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
