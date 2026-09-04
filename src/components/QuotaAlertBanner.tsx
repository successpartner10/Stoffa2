import React from 'react';
import { AlertCircle, RefreshCw, Sparkles, X } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const QuotaAlertBanner: React.FC = () => {
  const { quotaAlert, dismissQuotaAlert } = useCommerce();

  if (!quotaAlert) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5">
      <div className="rounded-xl bg-amber-950 text-amber-50 border border-amber-600/60 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-900/80 text-amber-300 shrink-0 border border-amber-700/50">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-300">
                Gemini 3.8 Flash Quota Notice
              </span>
              <button
                onClick={dismissQuotaAlert}
                className="text-amber-400 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-serif text-sm font-semibold text-white mt-0.5">
              AI Generation Rate Limit Exceeded
            </h4>
            <p className="text-xs text-amber-200/90 mt-1 font-light leading-relaxed">
              {quotaAlert.message}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  if (quotaAlert.retryAction) {
                    quotaAlert.retryAction();
                  }
                  dismissQuotaAlert();
                }}
                className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry AI Request</span>
              </button>
              <button
                onClick={dismissQuotaAlert}
                className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
              >
                Continue with Curated Lookbook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
