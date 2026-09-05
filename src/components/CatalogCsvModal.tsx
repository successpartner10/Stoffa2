import React, { useState, useRef } from 'react';
import {
  Download,
  Upload,
  FileText,
  Check,
  AlertCircle,
  X,
  Sparkles,
  RotateCcw,
  Copy,
  Layers,
  DollarSign,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const CatalogCsvModal: React.FC = () => {
  const {
    isCatalogManagerOpen,
    setIsCatalogManagerOpen,
    products,
    exportCatalogCSV,
    importProductsFromCSV,
    importStoffaCatalog,
    formatPrice,
    isAdminLoggedIn,
    adminUser,
    setIsAdminLoginModalOpen,
  } = useCommerce();

  const [activeTab, setActiveTab] = useState<'download' | 'upload'>('download');
  const [csvInput, setCsvInput] = useState('');
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isCatalogManagerOpen) return null;

  // Access control gate: only sulaniyashpal@gmail.com can view or use the CSV catalog
  if (!isAdminLoggedIn) {
    return (
      <div
        id="catalog-csv-restricted-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCatalogManagerOpen(false)}
      >
        <div
          id="catalog-csv-restricted-modal"
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 sm:p-8 text-center text-stone-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-5 shadow-inner">
            <Lock className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-stone-950 mb-2">
            Administrator Access Restricted
          </h2>
          <p className="text-sm text-stone-700 font-medium mb-6 leading-relaxed">
            Catalog CSV download and bulk upload is confidential and restricted. Access is exclusively granted to verified store administrator (<strong className="font-mono text-stone-950 font-bold bg-amber-100 px-1.5 py-0.5 rounded">sulaniyashpal@gmail.com</strong>).
          </p>
          <div className="flex flex-col gap-3">
            <button
              id="restricted-modal-login-btn"
              onClick={() => {
                setIsCatalogManagerOpen(false);
                setIsAdminLoginModalOpen(true);
              }}
              className="w-full py-3.5 rounded-xl bg-stone-950 hover:bg-black text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Login</span>
            </button>
            <button
              onClick={() => setIsCatalogManagerOpen(false)}
              className="w-full py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-sm transition-all cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    try {
      const csvData = exportCatalogCSV();
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `accessoiree_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/accessoiree_catalog.csv', '_blank');
    }
  };

  const handleCopy = () => {
    const csvData = exportCatalogCSV();
    navigator.clipboard.writeText(csvData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCsvInput(content);
        processCSV(content);
      }
    };
    reader.readAsText(file);
  };

  const processCSV = (content: string) => {
    setUploadStatus({ type: 'idle', message: '' });
    if (!content.trim()) {
      setUploadStatus({ type: 'error', message: 'CSV content cannot be empty.' });
      return;
    }

    const res = importProductsFromCSV(content);
    if (res.success) {
      setUploadStatus({
        type: 'success',
        message: `Successfully loaded & updated ${res.count} products! All prices calibrated in USD.`,
      });
    } else {
      setUploadStatus({
        type: 'error',
        message: res.error || 'Failed to parse CSV file.',
      });
    }
  };

  const handleResetCatalog = () => {
    const res = importStoffaCatalog();
    setUploadStatus({
      type: 'success',
      message: `Reset complete! Loaded ${res.count} official Accessoiree products with official USD prices (INR / 50).`,
    });
  };

  return (
    <div
      id="catalog-csv-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={() => setIsCatalogManagerOpen(false)}
    >
      <div
        id="catalog-csv-modal"
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d3b46] text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif tracking-tight text-slate-900">
                  Products Catalog CSV
                </h2>
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {adminUser}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Admin Exclusive: Download full product inventory or upload CSV with automatic INR to USD conversion
              </p>
            </div>
          </div>
          <button
            id="close-catalog-csv-modal-btn"
            onClick={() => setIsCatalogManagerOpen(false)}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-200 bg-stone-100/50 px-6 pt-3 gap-3">
          <button
            id="tab-download-csv"
            onClick={() => setActiveTab('download')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'download'
                ? 'border-[#0d3b46] text-[#0d3b46]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download CSV ({products.length} items)</span>
          </button>
          <button
            id="tab-upload-csv"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'border-[#0d3b46] text-[#0d3b46]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload CSV</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Status Message */}
          {uploadStatus.message && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${
                uploadStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {uploadStatus.type === 'success' ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">{uploadStatus.message}</div>
            </div>
          )}

          {activeTab === 'download' ? (
            <div className="space-y-5">
              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-serif text-lg font-bold text-slate-900">
                      Accessoiree Products Catalog
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0d3b46] text-white">
                      {products.length} Products
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-light">
                    Prices always in USD ($) • Mapped from original INR catalog (e.g., 3,000 INR = $60 USD, 5,000 INR = $100 USD, 4,500 INR = $90 USD)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-white text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy CSV'}</span>
                  </button>
                  <button
                    id="download-catalog-csv-btn"
                    onClick={handleDownload}
                    className="px-5 py-2.5 rounded-xl bg-[#0d3b46] hover:bg-[#07262d] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .CSV</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Table */}
              <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-stone-100 px-4 py-2.5 border-b border-stone-200 font-semibold text-xs text-stone-700 flex justify-between items-center">
                  <span>Catalog Sample (First 6 items)</span>
                  <span className="text-[11px] font-mono text-stone-500">Columns: ID, Title, Category, INR Price, USD Price</span>
                </div>
                <div className="overflow-x-auto max-h-60">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-stone-50 sticky top-0 border-b border-stone-200 text-stone-600 font-serif">
                      <tr>
                        <th className="p-2.5">ID</th>
                        <th className="p-2.5">Title</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5 font-mono text-right">INR Price</th>
                        <th className="p-2.5 font-mono text-right">USD Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 font-light">
                      {products.slice(0, 6).map((p) => (
                        <tr key={p.id} className="hover:bg-amber-50/40">
                          <td className="p-2.5 font-mono text-[11px] text-stone-500">{p.id}</td>
                          <td className="p-2.5 font-medium text-stone-900">{p.title}</td>
                          <td className="p-2.5 text-stone-600">{p.category}</td>
                          <td className="p-2.5 font-mono text-right text-stone-600">
                            ₹{(p.priceINR || p.priceUSD * 50).toLocaleString()}
                          </td>
                          <td className="p-2.5 font-mono font-bold text-right text-emerald-800">
                            {formatPrice(p.priceUSD)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Formula & Auto-Conversion Guidance */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-1.5">
                <div className="flex items-center gap-2 font-bold font-serif text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Automatic INR to USD Conversion Active</span>
                </div>
                <p className="text-amber-800 font-light leading-relaxed">
                  When you upload a CSV with a <code className="font-mono bg-amber-100/90 px-1 py-0.5 rounded text-amber-900 font-bold">price_inr</code> or <code className="font-mono bg-amber-100/90 px-1 py-0.5 rounded text-amber-900 font-bold">priceINR</code> column, all prices will automatically convert to USD using the formula:
                </p>
                <div className="font-mono font-semibold bg-white/80 p-2.5 rounded-lg border border-amber-200 text-amber-900 flex flex-wrap items-center gap-4 text-xs">
                  <span>3,000 INR &rarr; $60 USD</span>
                  <span>&bull;</span>
                  <span>4,500 INR &rarr; $90 USD</span>
                  <span>&bull;</span>
                  <span>5,000 INR &rarr; $100 USD</span>
                  <span>&bull;</span>
                  <span className="text-emerald-700">Formula: USD = Math.round(INR / 50)</span>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-[#0d3b46] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-stone-50"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-700">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-stone-800">
                    Click to browse or drop your CSV file here
                  </span>
                  <span className="text-xs text-stone-500 font-light">
                    Supports .csv files with headers (id, title, category, price_inr, price_usd, sizes, description)
                  </span>
                </div>
              </div>

              {/* Or Paste CSV */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Or Paste CSV Text Directly
                </label>
                <textarea
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  placeholder={'id,title,category,price_inr,price_usd\nstoffa_001,Bridal High Wedge,Heels,4000,80\nstoffa_002,Artisanal Potli,Bags,3000,60'}
                  rows={5}
                  className="w-full p-3 font-mono text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0d3b46] bg-white"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleResetCatalog}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Official Catalog (106 items)</span>
                </button>

                <button
                  id="process-csv-upload-btn"
                  onClick={() => processCSV(csvInput)}
                  disabled={!csvInput.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#0d3b46] hover:bg-[#07262d] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Import &amp; Update Storefront</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>All Store Prices Always In USD ($)</span>
          </div>
          <button
            onClick={() => setIsCatalogManagerOpen(false)}
            className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
