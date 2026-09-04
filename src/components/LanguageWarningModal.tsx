import React from 'react';
import { AlertTriangle, ArrowRight, Check, Globe, X } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const LanguageWarningModal: React.FC = () => {
  const {
    pendingLanguage,
    activeLanguage,
    confirmLanguageChange,
    cancelLanguageChange,
  } = useCommerce();

  if (!pendingLanguage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white border border-stone-200 shadow-2xl p-6 text-stone-900 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={cancelLanguageChange}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
            <AlertTriangle className="w-6 h-6 text-amber-700" />
          </div>
          <div className="flex-1">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-1">
              Language Change Notice
            </span>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Confirm Locale Switch
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Switching storefront language will adapt editorial descriptions, size nomenclature, and occasion taxonomy.
            </p>
          </div>
        </div>

        {/* Comparison card */}
        <div className="my-5 p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeLanguage.flag}</span>
            <div>
              <div className="text-[10px] text-stone-400 uppercase font-mono">Current</div>
              <div className="font-semibold text-stone-800">{activeLanguage.name}</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />

          <div className="flex items-center gap-2">
            <span className="text-xl">{pendingLanguage.flag}</span>
            <div>
              <div className="text-[10px] text-amber-700 uppercase font-mono font-bold">Target</div>
              <div className="font-semibold text-stone-900">{pendingLanguage.name}</div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-stone-500 font-light leading-normal mb-5">
          Please acknowledge to proceed. Your shopping bag and active filters will be preserved.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={cancelLanguageChange}
            className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors"
          >
            Keep {activeLanguage.name}
          </button>
          <button
            id="confirm-language-switch-btn"
            onClick={confirmLanguageChange}
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Acknowledge & Switch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
