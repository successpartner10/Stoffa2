import React from 'react';
import { AlertTriangle, ArrowRight, Check, X } from 'lucide-react';
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
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-300">
            <AlertTriangle className="w-6 h-6 text-amber-700" />
          </div>
          <div className="flex-1">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-1">
              Translation Disclaimer
            </span>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Machine Generated Translation
            </h3>
          </div>
        </div>

        {/* Prominent required disclaimer quote */}
        <div className="my-4 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs leading-relaxed font-medium">
          Please proceed knowing that language is machine generated and may not be accurate and may have unintended errors.
        </div>

        {/* Comparison card with native words */}
        <div className="my-4 p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeLanguage.flag}</span>
            <div>
              <div className="text-[10px] text-stone-400 uppercase font-mono">Current</div>
              <div className="font-semibold text-stone-800">{activeLanguage.nativeName || activeLanguage.name}</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />

          <div className="flex items-center gap-2">
            <span className="text-xl">{pendingLanguage.flag}</span>
            <div>
              <div className="text-[10px] text-amber-800 uppercase font-mono font-bold">Switching To</div>
              <div className="font-semibold text-stone-900">{pendingLanguage.nativeName || pendingLanguage.name}</div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-stone-500 font-light leading-normal mb-5">
          Product titles, descriptions, and checkout terms will be rendered in {pendingLanguage.nativeName || pendingLanguage.name}. Your active shopping cart and currency will remain intact.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={cancelLanguageChange}
            className="px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            id="confirm-language-switch-btn"
            onClick={confirmLanguageChange}
            className="px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Proceed &amp; Switch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
