import React, { useState } from 'react';
import { Building2, Check, Download, FileText, Plus, Send, Trash2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCommerce } from '../context/CommerceContext';
import { B2BOrderItem, Product } from '../types';

export const B2BOrderModal: React.FC = () => {
  const {
    isB2BModalOpen,
    setIsB2BModalOpen,
    b2bTargetProduct,
    setB2BTargetProduct,
    products,
    b2bList,
    addToB2BList,
    removeFromB2BList,
    clearB2BList,
    formatPrice,
    activeCurrency,
  } = useCommerce();

  const [activeTab, setActiveTab] = useState<'configure' | 'list'>('configure');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    b2bTargetProduct?.id || products[0]?.id || ''
  );

  const selectedProduct: Product =
    products.find((p) => p.id === selectedProductId) || b2bTargetProduct || products[0];

  const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors[0]?.name || 'Nero Black');

  // Matrix of quantities per size
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    selectedProduct?.sizes.forEach((s) => {
      initial[s] = 2; // Default 2 units per size
    });
    return initial;
  });

  const [companyName, setCompanyName] = useState('Nordic Luxury Concepts Inc.');
  const [contactEmail, setContactEmail] = useState('purchasing@nordicluxury.com');
  const [inquiryNotes, setInquiryNotes] = useState('Standard EU delivery with consolidated wooden crating.');
  const [orderSubmitted, setOrderSubmitted] = useState<string | null>(null);

  if (!isB2BModalOpen) return null;

  const totalSelectedUnits: number = (Object.values(sizeQuantities) as number[]).reduce((a: number, b: number) => a + b, 0);

  // Tiered discount logic
  const getTierDiscountRate = (units: number) => {
    if (units >= 50) return 0.35;
    if (units >= 30) return 0.25;
    if (units >= 10) return 0.15;
    return 0.05;
  };

  const discountRate = getTierDiscountRate(totalSelectedUnits);
  const unitPriceUSD = selectedProduct.priceUSD;
  const discountedUnitPriceUSD = unitPriceUSD * (1 - discountRate);
  const configurationSubtotalUSD = discountedUnitPriceUSD * totalSelectedUnits;

  // Handle quantity change
  const handleQtyChange = (size: string, val: number) => {
    const num = Math.max(0, isNaN(val) ? 0 : val);
    setSizeQuantities((prev) => ({
      ...prev,
      [size]: num,
    }));
  };

  const handleAddCurrentToList = () => {
    if (totalSelectedUnits <= 0) return;

    const newItem: B2BOrderItem = {
      product: selectedProduct,
      sizeBreakdown: { ...sizeQuantities },
      colorName: selectedColor,
      totalQuantity: totalSelectedUnits,
      unitPriceUSD,
      discountedUnitPriceUSD,
    };

    addToB2BList(newItem);
    setActiveTab('list');
  };

  // Grand totals of B2B List
  const listTotalUnits = b2bList.reduce((acc, item) => acc + item.totalQuantity, 0);
  const listTotalUSD = b2bList.reduce((acc, item) => acc + item.discountedUnitPriceUSD * item.totalQuantity, 0);

  const handleExportCSV = () => {
    const headers = ['Product ID', 'Title', 'Color', 'Sizes & Breakdown', 'Units', 'Unit Price USD', 'Total USD'];
    const rows = b2bList.map((item) => [
      `"${item.product.id}"`,
      `"${item.product.title.replace(/"/g, '""')}"`,
      `"${item.colorName}"`,
      `"${Object.entries(item.sizeBreakdown).map(([sz, q]) => `${sz}:${q}`).join(';')}"`,
      item.totalQuantity,
      item.discountedUnitPriceUSD.toFixed(2),
      (item.discountedUnitPriceUSD * item.totalQuantity).toFixed(2),
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `b2b_inquiry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitInquiry = () => {
    const refId = `B2B-PO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSubmitted(refId);
    clearB2BList();
    confetti({
      particleCount: 130,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-stone-200 shadow-2xl p-6 sm:p-8 text-stone-900 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-stone-500 font-bold">
                Atelier Étoile • Wholesale & Private Label Portal
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
                B2B Bulk Purchase & Commercial Invoice Builder
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              setIsB2BModalOpen(false);
              setB2BTargetProduct(null);
            }}
            className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-4 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('configure')}
            className={`pb-3 px-3 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 ${
              activeTab === 'configure'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            1. Configure Sizes & Volume Tier
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-3 px-3 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'list'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>2. Bulk Order List</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-800 text-[10px] font-mono border border-stone-300">
              {b2bList.length}
            </span>
          </button>
        </div>

        {orderSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-700" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-medium">
              B2B Commercial PO Generated!
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Reference Number:{' '}
              <strong className="font-mono text-stone-900 font-bold bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                {orderSubmitted}
              </strong>
              . A proforma invoice and allocation contract have been drafted for{' '}
              <strong>{companyName}</strong>.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setOrderSubmitted(null);
                  setActiveTab('configure');
                }}
                className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Create Another PO
              </button>
              <button
                onClick={() => setIsB2BModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        ) : activeTab === 'configure' ? (
          <div className="py-6 space-y-6">
            {/* Product & Volume Tier Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block">
                  Select Product Silhouette
                </label>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    setSelectedProductId(e.target.value);
                    const prod = products.find((p) => p.id === e.target.value);
                    if (prod) {
                      const newSizes: Record<string, number> = {};
                      prod.sizes.forEach((s) => (newSizes[s] = 2));
                      setSizeQuantities(newSizes);
                    }
                  }}
                  className="w-full text-xs font-medium bg-white border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-stone-900"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({formatPrice(p.priceUSD)})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-stone-500 pt-1">
                  MSRP: <span className="font-mono font-semibold">{formatPrice(selectedProduct.priceUSD)}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block">
                  Colorway / Finish
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 border transition-all ${
                        selectedColor === c.name
                          ? 'border-stone-900 bg-white text-stone-900 font-semibold shadow-xs'
                          : 'border-stone-200 bg-white/60 text-stone-600 hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Discount Tiers Indicator */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1 text-xs">
                <div className="text-[10px] uppercase font-mono text-amber-900 font-bold">
                  B2B Volume Discount Scale
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                  <div className={totalSelectedUnits < 10 ? 'font-bold text-amber-950' : 'text-stone-500'}>
                    1-9 units: -5%
                  </div>
                  <div className={totalSelectedUnits >= 10 && totalSelectedUnits < 30 ? 'font-bold text-amber-950' : 'text-stone-500'}>
                    10-29 units: -15%
                  </div>
                  <div className={totalSelectedUnits >= 30 && totalSelectedUnits < 50 ? 'font-bold text-amber-950' : 'text-stone-500'}>
                    30-49 units: -25%
                  </div>
                  <div className={totalSelectedUnits >= 50 ? 'font-bold text-amber-950' : 'text-stone-500'}>
                    50+ units: -35% VIP
                  </div>
                </div>
                <div className="text-[10px] text-amber-800 pt-1">
                  Current Tier Discount: <strong>-{(discountRate * 100).toFixed(0)}%</strong>
                </div>
              </div>
            </div>

            {/* Size Breakdown Matrix */}
            <div className="p-5 rounded-xl border border-stone-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900">
                    Matrix: Quantities per Size ({selectedProduct.sizes.join(', ')})
                  </h4>
                  <p className="text-xs text-stone-500">
                    Specify wholesale package quantity per individual size last.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-stone-900">
                  Total Units: <span className="text-amber-800">{totalSelectedUnits}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 pt-2">
                {selectedProduct.sizes.map((sz) => (
                  <div key={sz} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-center">
                    <span className="text-[11px] font-mono font-semibold text-stone-700 block mb-1">
                      {sz}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={200}
                      value={sizeQuantities[sz] ?? 0}
                      onChange={(e) => handleQtyChange(sz, parseInt(e.target.value, 10))}
                      className="w-full text-center text-xs font-mono font-bold py-1 px-1 bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration Summary Bar */}
            <div className="p-4 rounded-xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-stone-400 font-mono">
                  {totalSelectedUnits} Units • Discounted Wholesale Price:{' '}
                  <span className="text-white font-bold">{formatPrice(discountedUnitPriceUSD)}</span> / unit
                </div>
                <div className="text-lg font-serif font-bold text-amber-200">
                  Subtotal: {formatPrice(configurationSubtotalUSD)}
                </div>
              </div>

              <button
                id="b2b-add-to-list-btn"
                onClick={handleAddCurrentToList}
                disabled={totalSelectedUnits <= 0}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Bulk Order List</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-6">
            {b2bList.length === 0 ? (
              <div className="py-12 text-center text-stone-500 space-y-2">
                <FileText className="w-8 h-8 mx-auto text-stone-400" />
                <p className="text-xs">No items currently in the B2B Order list.</p>
                <button
                  onClick={() => setActiveTab('configure')}
                  className="text-xs font-semibold text-stone-900 underline"
                >
                  Configure product units above →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden">
                  {b2bList.map((item, idx) => (
                    <div key={idx} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-md border border-stone-200"
                        />
                        <div>
                          <div className="font-serif font-medium text-stone-900">{item.product.title}</div>
                          <div className="text-[11px] text-stone-500">
                            Color: {item.colorName} • {item.totalQuantity} units
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                            Sizes: {Object.entries(item.sizeBreakdown).map(([sz, q]) => `${sz}: ${q}`).join(', ')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <div className="font-mono font-semibold text-stone-900">
                            {formatPrice(item.discountedUnitPriceUSD * item.totalQuantity)}
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">
                            {formatPrice(item.discountedUnitPriceUSD)}/ea
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromB2BList(idx)}
                          className="p-1.5 rounded text-stone-400 hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Company & Billing info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block mb-1">
                      Purchasing Entity / Business Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block mb-1">
                      Accounts Payable / Buyer Email
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 rounded-xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-stone-400 font-mono">
                      Consolidated Order: {listTotalUnits} Units Total
                    </div>
                    <div className="text-lg font-serif font-bold text-amber-200">
                      Grand Total: {formatPrice(listTotalUSD)} ({activeCurrency.code})
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={handleExportCSV}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg border border-stone-600 hover:bg-stone-800 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={handleSubmitInquiry}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Commercial PO</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
