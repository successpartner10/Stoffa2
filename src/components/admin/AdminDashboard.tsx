import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Coins,
  Copy,
  DollarSign,
  ExternalLink,
  Globe,
  Layers,
  Link as LinkIcon,
  Play,
  Plus,
  RefreshCw,
  Search,
  Share2,
  ShieldCheck,
  Sliders,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { AVAILABLE_CURRENCY_PRESETS, AVAILABLE_LANGUAGE_PRESETS } from '../../data/mockData';
import { useCommerce } from '../../context/CommerceContext';
import { Campaign } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    currencies,
    toggleCurrency,
    addCurrencyPreset,
    updateCurrencyRate,
    languages,
    toggleLanguage,
    addLanguagePreset,
    campaigns,
    createCampaign,
    toggleCampaignStatus,
    activateCampaignBySlug,
    affiliates,
    payouts,
    executeStripePayout,
    executeBatchStripePayouts,
    orders,
    formatPrice,
    setViewMode,
  } = useCommerce();

  // Currency & Language modal states
  const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);
  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);

  // New Campaign Form State
  const [newSlug, setNewSlug] = useState('');
  const [newName, setNewName] = useState('');
  const [newPlatform, setNewPlatform] = useState<Campaign['platform']>('TikTok');
  const [newCreator, setNewCreator] = useState('');
  const [newAffiliateId, setNewAffiliateId] = useState('');
  const [newDefaultCurrency, setNewDefaultCurrency] = useState('USD');
  const [newDefaultLanguage, setNewDefaultLanguage] = useState('en');
  const [newDiscount, setNewDiscount] = useState<number>(15);
  const [campaignCreationSuccess, setCampaignCreationSuccess] = useState(false);
  const [batchSuccessMessage, setBatchSuccessMessage] = useState<string | null>(null);

  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenueUSD, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : '0.0';
  const totalClearedCommissions = affiliates.reduce((acc, a) => acc + a.clearedCommissionUSD, 0);

  const handleCreateCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlug.trim() || !newName.trim()) return;

    createCampaign({
      slug: newSlug.trim().toLowerCase().replace(/\s+/g, '-'),
      name: newName.trim(),
      platform: newPlatform,
      creatorName: newCreator.trim() || 'Direct Campaign',
      affiliateId: newAffiliateId || undefined,
      defaultCurrency: newDefaultCurrency,
      defaultLanguage: newDefaultLanguage,
      discountPercent: Number(newDiscount),
    });

    setCampaignCreationSuccess(true);
    setTimeout(() => {
      setCampaignCreationSuccess(false);
      setNewSlug('');
      setNewName('');
      setNewCreator('');
    }, 2000);
  };

  const handleBatchPayoutClick = () => {
    const disbursed = executeBatchStripePayouts();
    if (disbursed > 0) {
      setBatchSuccessMessage(`Successfully disbursed ${formatPrice(disbursed)} to eligible affiliates via Stripe Connect!`);
      setTimeout(() => setBatchSuccessMessage(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-stone-900">
      {/* Top Header & Overview Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-600 font-semibold mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>COMMERCE ARCHITECTURE ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
            Attribution, Multi-Currency & Payout Control
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            High-performance event routing, 1-click localization, custom campaign URLs, and Stripe Connect payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('storefront')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-xs font-medium border border-stone-300 transition-colors flex items-center gap-2 shadow-2xs"
          >
            <span>Preview Live Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </button>
          <button
            onClick={() => setViewMode('affiliate_portal')}
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300 transition-colors flex items-center gap-2 shadow-2xs"
          >
            <span>Open Affiliate Portal</span>
            <Users className="w-3.5 h-3.5 text-emerald-700" />
          </button>
        </div>
      </div>

      {/* Metric Quick Cards in Light Mode */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">Attributed Social Revenue</div>
          <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+28.4% this month</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">Campaign Link Clicks</div>
          <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
            {totalClicks.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-light">
            Zero database locks via async queue
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">Attribution Conversion</div>
          <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
            {conversionRate}%
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-light">
            {totalConversions.toLocaleString()} orders completed
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">Cleared Affiliate Balance</div>
          <div className="text-2xl font-serif font-bold text-emerald-800 mt-1">
            {formatPrice(totalClearedCommissions)}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-light">
            Ready for 1-Click Stripe Payout
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1">
        <button
          onClick={() => setAdminTab('i18n_currencies')}
          className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'i18n_currencies'
              ? 'bg-stone-900 text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>1-Click Currency & Language Manager</span>
        </button>

        <button
          onClick={() => setAdminTab('campaigns')}
          className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'campaigns'
              ? 'bg-stone-900 text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>Custom Social URL Tracker</span>
        </button>

        <button
          onClick={() => setAdminTab('affiliates')}
          className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'affiliates'
              ? 'bg-stone-900 text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Affiliates & Automated Payouts</span>
        </button>

        <button
          onClick={() => setAdminTab('analytics')}
          className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'analytics'
              ? 'bg-stone-900 text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>High-Volume Architecture & Funnel</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 1-CLICK CURRENCY & LANGUAGE MANAGER                                */}
      {/* ========================================================================= */}
      {adminTab === 'i18n_currencies' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Currencies Section */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-600 font-semibold">
                  <Coins className="w-4 h-4" />
                  <span>1-CLICK CURRENCY SYSTEM</span>
                </div>
                <h3 className="text-xl font-serif text-stone-900 font-medium mt-1">
                  Active Display Currencies
                </h3>
                <p className="text-xs text-stone-500">
                  Enable or disable any currency with 1 click. Real-time rates convert store prices instantly.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddCurrencyModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Currency from List</span>
                </button>
              </div>
            </div>

            {/* Currency Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currencies.map((curr) => (
                <div
                  key={curr.code}
                  className={`p-4 rounded-xl border transition-all ${
                    curr.isEnabled
                      ? 'bg-white border-stone-300 shadow-xs'
                      : 'bg-stone-50 border-stone-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{curr.flag}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 font-mono text-base">
                            {curr.code}
                          </span>
                          <span className="text-stone-500 text-xs">({curr.symbol})</span>
                          {curr.isDefault && (
                            <span className="px-1.5 py-0.2 rounded bg-stone-100 text-[10px] text-stone-700 font-medium">
                              Base USD
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500">{curr.name}</div>
                      </div>
                    </div>

                    {/* 1-Click Toggle Switch */}
                    <button
                      onClick={() => toggleCurrency(curr.code)}
                      className="p-1 rounded text-xs transition-colors"
                      title={curr.isEnabled ? 'Click to disable currency' : 'Click to enable currency'}
                    >
                      {curr.isEnabled ? (
                        <ToggleRight className="w-7 h-7 text-stone-900" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-stone-300" />
                      )}
                    </button>
                  </div>

                  {/* Rate modifier */}
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">Exchange Rate (1 USD =):</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.01"
                        disabled={curr.code === 'USD'}
                        defaultValue={curr.rate}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val) && val > 0) {
                            updateCurrencyRate(curr.code, val);
                          }
                        }}
                        className="w-20 px-2 py-0.5 rounded bg-stone-50 border border-stone-300 text-stone-900 text-right font-mono focus:outline-none focus:border-stone-900 disabled:opacity-50"
                      />
                      <span className="font-mono text-stone-400">{curr.symbol}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Helper Note */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Storefront Currency Switcher:</strong> When enabled, customers see these options in the top header. Social campaign URLs like <code>/c/montreal-editorial</code> can also automatically pre-select CAD.
              </span>
            </div>
          </div>

          {/* Languages Section */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-600 font-semibold">
                  <Globe className="w-4 h-4" />
                  <span>1-CLICK LANGUAGE (LOCALIZATION) SYSTEM</span>
                </div>
                <h3 className="text-xl font-serif text-stone-900 font-medium mt-1">
                  Active Storefront Languages
                </h3>
                <p className="text-xs text-stone-500">
                  Intuitive for beginners: 1-click added functionality, 1-click remover. Instant client-side switching.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddLanguageModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Language from List</span>
                </button>
              </div>
            </div>

            {/* Grouped Languages by Continent */}
            <div className="space-y-6">
              {[
                { key: 'European', title: 'European Languages', icon: '🇪🇺', order: 1 },
                { key: 'Canada & Americas', title: 'Canada & The Americas', icon: '🇨🇦', order: 2 },
                { key: 'Middle East & Asia', title: 'Middle East & East Asia', icon: '🌏', order: 3 },
                { key: 'Indian Subcontinent', title: 'Indian Subcontinent (South & North India)', icon: '🇮🇳', order: 4 },
              ].map((continent) => {
                const groupLangs = languages.filter((l) => l.continent === continent.key);
                if (groupLangs.length === 0) return null;

                return (
                  <div key={continent.key} className="space-y-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-200">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{continent.icon}</span>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800">
                          {continent.title}
                        </h4>
                        {continent.key === 'Indian Subcontinent' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                            Indian at bottom
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-stone-500">
                        {groupLangs.filter((l) => l.isEnabled).length} of {groupLangs.length} enabled
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {groupLangs.map((lang) => (
                        <div
                          key={lang.code}
                          className={`p-3.5 rounded-xl border transition-all ${
                            lang.isEnabled
                              ? 'bg-white border-stone-300 shadow-xs'
                              : 'bg-stone-50/70 border-stone-200 opacity-60'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl">{lang.flag}</span>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-stone-900 text-sm">
                                    {lang.code === 'fr' ? 'Français' : lang.code === 'es' ? 'Español' : lang.name}
                                  </span>
                                  <span className="text-stone-500 text-[11px] font-mono uppercase">
                                    ({lang.code})
                                  </span>
                                  {lang.isDefault && (
                                    <span className="px-1.5 py-0.2 rounded bg-stone-100 text-[10px] text-stone-700 font-medium">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-stone-500">{lang.nativeName}</div>
                              </div>
                            </div>

                            {/* 1-Click Toggle Switch */}
                            <button
                              onClick={() => toggleLanguage(lang.code)}
                              className="p-1 rounded text-xs transition-colors"
                              title={lang.isEnabled ? 'Click to disable language' : 'Click to enable language'}
                            >
                              {lang.isEnabled ? (
                                <ToggleRight className="w-7 h-7 text-stone-900" />
                              ) : (
                                <ToggleLeft className="w-7 h-7 text-stone-300" />
                              )}
                            </button>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                            <span>{continent.title.split(' ')[0]} Region</span>
                            <span className={lang.isEnabled ? 'text-emerald-700 font-medium' : 'text-stone-400'}>
                              {lang.isEnabled ? 'Live on Store' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Zero Third-Party Lag:</strong> Translations load natively in milliseconds without external widget scripts slowing down mobile customers.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CUSTOM SOCIAL URL TRACKER                                          */}
      {/* ========================================================================= */}
      {adminTab === 'campaigns' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Campaign Creator Form */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-600 font-semibold">
                  <LinkIcon className="w-4 h-4" />
                  <span>VANITY ROUTING & INGESTION ENGINE</span>
                </div>
                <h3 className="text-xl font-serif text-stone-900 font-medium mt-1">
                  Create Custom Campaign URL
                </h3>
                <p className="text-xs text-stone-500">
                  Generate clean URLs like <code>etoile.store/c/tiktok-shoes</code> with automated currency, language, and affiliate attribution presets.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateCampaignSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-mono">
                  Custom Vanity Slug (/c/...)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 text-stone-400 font-mono">/c/</span>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="autumn-runway"
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 font-mono focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. TikTok Fall Drop 2026"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Traffic Platform</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                >
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Pinterest">Pinterest</option>
                  <option value="Editorial">Editorial / Press</option>
                  <option value="Other">Other Channel</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Creator / Influencer Handle</label>
                <input
                  type="text"
                  value={newCreator}
                  onChange={(e) => setNewCreator(e.target.value)}
                  placeholder="e.g. @clara.styles"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Link to Affiliate Partner</label>
                <select
                  value={newAffiliateId}
                  onChange={(e) => setNewAffiliateId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                >
                  <option value="">None (House Brand Campaign)</option>
                  {affiliates.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.handle}) &bull; {(a.commissionRate * 100)}% Comm.
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-600 mb-1">Preset Currency</label>
                  <select
                    value={newDefaultCurrency}
                    onChange={(e) => setNewDefaultCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900 font-mono"
                  >
                    {currencies.filter((c) => c.isEnabled).map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1">Preset Language</label>
                  <select
                    value={newDefaultLanguage}
                    onChange={(e) => setNewDefaultLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900 font-mono uppercase"
                  >
                    {languages.filter((l) => l.isEnabled).map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.code} ({l.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-stone-600 mb-1">
                    Auto-Applied Customer VIP Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(Number(e.target.value))}
                    className="w-32 px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 font-mono focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Deploy Campaign Link</span>
                </button>
              </div>
            </form>

            {campaignCreationSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4" />
                <span>Campaign URL created successfully and added to live routing table!</span>
              </div>
            )}
          </div>

          {/* Active Campaigns Table */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif text-stone-900 font-medium">Live Campaign Routing Table</h3>
              <span className="text-xs text-stone-500 font-mono">
                {campaigns.length} Active Endpoints
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Custom URL Slug</th>
                    <th className="py-3 px-3">Platform & Creator</th>
                    <th className="py-3 px-3">Presets</th>
                    <th className="py-3 px-3">Discount</th>
                    <th className="py-3 px-3 text-right">Traffic Clicks</th>
                    <th className="py-3 px-3 text-right">Orders</th>
                    <th className="py-3 px-3 text-right">Attributed Sales</th>
                    <th className="py-3 px-3 text-center">Test Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-mono text-stone-900 font-semibold">
                          /c/{camp.slug}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate max-w-[180px]">
                          {camp.name}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-stone-100 font-mono text-stone-700 text-[10px] border border-stone-200">
                          {camp.platform}
                        </span>
                        <div className="text-stone-700 text-[11px] mt-0.5">
                          {camp.creatorName}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-stone-600">
                        <span>{camp.defaultCurrency || 'USD'}</span> /{' '}
                        <span className="uppercase">{camp.defaultLanguage || 'EN'}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono font-semibold border border-emerald-200 text-[11px]">
                          -{camp.discountPercent}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-stone-700">
                        {camp.clicks.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-stone-900 font-semibold">
                        {camp.conversions}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-stone-900 font-bold">
                        {formatPrice(camp.revenueUSD)}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => {
                            activateCampaignBySlug(camp.slug);
                            setViewMode('storefront');
                          }}
                          className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium border border-stone-200 transition-colors inline-flex items-center gap-1"
                          title="Simulate visitor clicking this campaign link"
                        >
                          <Play className="w-3 h-3 text-stone-700" />
                          <span>Simulate</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: AFFILIATES & AUTOMATED PAYOUTS                                    */}
      {/* ========================================================================= */}
      {adminTab === 'affiliates' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Payout Action Header */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
                  <DollarSign className="w-4 h-4" />
                  <span>AUTOMATED STRIPE CONNECT PAYOUT PIPELINE</span>
                </div>
                <h3 className="text-xl font-serif text-stone-900 font-medium mt-1">
                  Affiliate Commission Ledger & Batch Distributions
                </h3>
                <p className="text-xs text-stone-500">
                  Anti-fraud holding periods (14-day clearance) prevent chargeback loss before one-click payout execution.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="execute-batch-payout-btn"
                  onClick={handleBatchPayoutClick}
                  disabled={totalClearedCommissions <= 0}
                  className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:bg-stone-200 text-white disabled:text-stone-400 font-semibold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Execute Batch Payout ({formatPrice(totalClearedCommissions)})</span>
                </button>
              </div>
            </div>

            {batchSuccessMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{batchSuccessMessage}</span>
              </div>
            )}
          </div>

          {/* Affiliates Roster */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xl font-serif text-stone-900 font-medium">Affiliate Creator Roster</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {affiliates.map((aff) => (
                <div
                  key={aff.id}
                  className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-4 shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-serif text-base text-stone-900 font-medium">{aff.name}</h4>
                        <div className="text-xs text-stone-600 font-mono">{aff.handle}</div>
                        <div className="text-[11px] text-stone-400">{aff.email}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white font-mono text-[10px] text-stone-700 border border-stone-200">
                        {aff.platform}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs pt-3 border-t border-stone-200">
                      <div>
                        <span className="text-stone-500 text-[10px] uppercase">Commission</span>
                        <div className="font-mono font-semibold text-stone-900">
                          {(aff.commissionRate * 100)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-stone-500 text-[10px] uppercase">Total Sales</span>
                        <div className="font-mono font-semibold text-stone-900">
                          {aff.totalSales} ({formatPrice(aff.totalRevenueUSD)})
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 rounded-lg bg-white border border-stone-200 space-y-1 text-xs">
                      <div className="flex justify-between text-stone-500">
                        <span>14-Day Hold (Pending):</span>
                        <span className="font-mono text-stone-800">
                          {formatPrice(aff.pendingCommissionUSD)}
                        </span>
                      </div>
                      <div className="flex justify-between text-emerald-800 font-medium">
                        <span>Cleared (Ready for Payout):</span>
                        <span className="font-mono font-bold">
                          {formatPrice(aff.clearedCommissionUSD)}
                        </span>
                      </div>
                      <div className="flex justify-between text-stone-400 text-[11px] pt-1 border-t border-stone-100">
                        <span>Historical Paid:</span>
                        <span className="font-mono">{formatPrice(aff.paidCommissionUSD)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => executeStripePayout(aff.id)}
                    disabled={aff.clearedCommissionUSD <= 0}
                    className="w-full py-2 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:bg-stone-200 text-white disabled:text-stone-400 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Pay {formatPrice(aff.clearedCommissionUSD)} via Stripe</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Payouts Ledger */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xl font-serif text-stone-900 font-medium">Automated Payout Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Transaction ID / Hash</th>
                    <th className="py-3 px-3">Recipient Partner</th>
                    <th className="py-3 px-3">Payment Method</th>
                    <th className="py-3 px-3 text-right">Amount Disbursed</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono text-xs">
                  {payouts.map((pay) => (
                    <tr key={pay.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-3 text-stone-700 truncate max-w-[180px]">
                        {pay.transactionHash}
                      </td>
                      <td className="py-3 px-3 text-stone-900 font-sans font-medium">
                        {pay.affiliateName}
                      </td>
                      <td className="py-3 px-3 text-stone-600 font-sans">
                        <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {pay.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-emerald-800 font-bold">
                        {formatPrice(pay.amountUSD)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-stone-400 text-[11px]">
                        {pay.initiatedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: HIGH-VOLUME ARCHITECTURE & ANALYTICS                               */}
      {/* ========================================================================= */}
      {adminTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Architecture Visual Guide */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-600 font-semibold">
                <Layers className="w-4 h-4" />
                <span>PERFORMANT DATABASE & TRAFFIC INGESTION ARCHITECTURE</span>
              </div>
              <h3 className="text-xl font-serif text-stone-900 font-medium mt-1">
                How High-Volume Traffic is Handled Efficiently
              </h3>
              <p className="text-xs text-stone-500">
                Architectural breakdown demonstrating how millions of social media campaign hits never slow down customer checkout or lock the database.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h4 className="font-serif text-base text-stone-900 font-medium">Edge Vanity Ingestion</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Incoming URLs (e.g. <code>/c/tiktok-viral</code>) resolve at the edge. Static assets are served from cache while click events are asynchronously buffered into an in-memory queue. No synchronous DB queries on landing page hits.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h4 className="font-serif text-base text-stone-900 font-medium">Zero-Lock Attribution Engine</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Attribution tokens and campaign codes are stored client-side in session memory. When a purchase occurs, the transactional ledger (PostgreSQL / Cloud SQL) writes the order and triggers an event to update affiliate balances asynchronously.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-stone-700 text-white flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h4 className="font-serif text-base text-stone-900 font-medium">Stripe Connect Automated Holds</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Commissions enter a 14-day fraud/return hold. Once cleared, batch disbursements run via Stripe Connect API webhooks, eliminating manual reconciliation and chargeback exposure.
                </p>
              </div>
            </div>
          </div>

          {/* Orders Log */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xl font-serif text-stone-900 font-medium">Real-Time Attributed Orders Feed</h3>
            {orders.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-400 font-light">
                No customer orders placed yet in this session. Visit the Storefront or Cart to place a test order!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 font-mono uppercase text-[10px]">
                      <th className="py-3 px-3">Order ID</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Attributed Campaign</th>
                      <th className="py-3 px-3 text-right">Items</th>
                      <th className="py-3 px-3 text-right">Charged Amount</th>
                      <th className="py-3 px-3 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono text-xs">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-stone-900">
                          #{ord.id}
                        </td>
                        <td className="py-3 px-3 font-sans text-stone-800">
                          {ord.customerName} ({ord.customerEmail})
                        </td>
                        <td className="py-3 px-3 text-emerald-800 font-medium">
                          {ord.campaignSlug ? `/c/${ord.campaignSlug}` : 'Direct Organic'}
                        </td>
                        <td className="py-3 px-3 text-right text-stone-500">
                          {ord.items.reduce((a, b) => a + b.quantity, 0)} items
                        </td>
                        <td className="py-3 px-3 text-right text-stone-900 font-bold">
                          {formatPrice(ord.totalUSD)}
                        </td>
                        <td className="py-3 px-3 text-right text-stone-400 text-[11px]">
                          {ord.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD CURRENCY PRESET                                                */}
      {/* ========================================================================= */}
      {showAddCurrencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white border border-stone-200 shadow-2xl text-stone-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-stone-900" />
                <h3 className="font-serif text-lg font-medium">Add World Currency (1-Click)</h3>
              </div>
              <button
                onClick={() => setShowAddCurrencyModal(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-500 font-light">
              Select a currency below to instantly add it to your live store display:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {AVAILABLE_CURRENCY_PRESETS.map((curr) => {
                const alreadyExists = currencies.some((c) => c.code === curr.code);
                return (
                  <button
                    key={curr.code}
                    onClick={() => {
                      addCurrencyPreset(curr.code);
                      setShowAddCurrencyModal(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors text-left text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{curr.flag}</span>
                      <div>
                        <div className="font-bold text-stone-900 font-mono">
                          {curr.code} ({curr.symbol})
                        </div>
                        <div className="text-[11px] text-stone-500">{curr.name}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs shadow-2xs">
                      {alreadyExists ? 'Toggle' : '+ Add 1-Click'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD LANGUAGE PRESET                                                */}
      {/* ========================================================================= */}
      {showAddLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white border border-stone-200 shadow-2xl text-stone-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-stone-900" />
                <h3 className="font-serif text-lg font-medium">Add Language Version (1-Click)</h3>
              </div>
              <button
                onClick={() => setShowAddLanguageModal(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-500 font-light">
              Choose from pre-translated global languages to publish a localized version instantly:
            </p>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {[
                { key: 'European', title: 'European', icon: '🇪🇺' },
                { key: 'Canada & Americas', title: 'Canada & Americas', icon: '🇨🇦' },
                { key: 'Middle East & Asia', title: 'Middle East & Asia', icon: '🌏' },
                { key: 'Indian Subcontinent', title: 'Indian Subcontinent', icon: '🇮🇳' },
              ].map((continent) => {
                const groupLangs = AVAILABLE_LANGUAGE_PRESETS.filter((l) => l.continent === continent.key);
                if (groupLangs.length === 0) return null;

                return (
                  <div key={continent.key} className="space-y-1.5">
                    <div className="px-2 py-0.5 rounded bg-stone-100 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-600 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span>{continent.icon}</span>
                        <span>{continent.title}</span>
                      </span>
                      <span className="text-stone-400 font-normal">{groupLangs.length}</span>
                    </div>

                    <div className="space-y-1">
                      {groupLangs.map((lang) => {
                        const alreadyExists = languages.some((l) => l.code === lang.code && l.isEnabled);
                        const displayName = lang.code === 'fr' ? 'Français' : lang.code === 'es' ? 'Español' : lang.name;

                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              addLanguagePreset(lang.code);
                              setShowAddLanguageModal(false);
                            }}
                            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors text-left text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl">{lang.flag}</span>
                              <div>
                                <div className="font-bold text-stone-900">{displayName}</div>
                                <div className="text-[11px] text-stone-500">
                                  {lang.nativeName} • <span className="uppercase font-mono">{lang.code}</span>
                                </div>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded font-semibold text-[11px] shadow-2xs ${
                                alreadyExists
                                  ? 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                                  : 'bg-stone-900 hover:bg-stone-800 text-white'
                              }`}
                            >
                              {alreadyExists ? 'Enabled' : '+ Add 1-Click'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
