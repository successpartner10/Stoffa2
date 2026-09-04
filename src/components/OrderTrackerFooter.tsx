import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Package,
  Plane,
  Search,
  Truck,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const OrderTrackerFooter: React.FC = () => {
  const {
    lookupTracking,
    activeTrackingDetails,
    setActiveTrackingDetails,
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    orders,
  } = useCommerce();

  const [inputCode, setInputCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setHasSearched(true);
    lookupTracking(inputCode);
  };

  const sampleTrackingNumbers = [
    orders[0]?.trackingNumber || 'ETL-98421',
    'TRK-88210-CAD',
    'ATELIER-2026-IT',
  ];

  return (
    <div id="order-tracker-footer-section" className="bg-stone-900 text-white border-t border-stone-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left copy */}
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Package className="w-4 h-4" />
            <span>White-Glove Courier Tracking</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-100">
            Track Simulated Shipping Progress
          </h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Enter your Atelier order confirmation code or DHL/FedEx parcel number to inspect real-time transatlantic air transit from Florence to your doorstep.
          </p>
        </div>

        {/* Right Input and Quick Pills */}
        <div className="lg:col-span-7 space-y-3">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="tracking-number-input"
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="e.g. ETL-98421 or order ID..."
                className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-colors"
              />
            </div>
            <button
              id="lookup-tracking-btn"
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-md flex items-center justify-center gap-2"
            >
              <span>Track Parcel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="flex items-center gap-2 flex-wrap text-[11px] text-stone-400">
            <span className="font-mono text-[10px] uppercase text-stone-500">Quick Test:</span>
            {sampleTrackingNumbers.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setInputCode(num);
                  lookupTracking(num);
                }}
                className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono transition-colors border border-stone-700/60"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tracking Modal */}
      {isTrackingModalOpen && activeTrackingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white text-stone-900 border border-stone-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsTrackingModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              aria-label="Close Tracking Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>Active Consignment</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mt-0.5">
                Shipment Tracking: {activeTrackingDetails.trackingNumber}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 mt-2">
                <span className="font-medium text-stone-800">Carrier: {activeTrackingDetails.carrier}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono uppercase">
                  {activeTrackingDetails.status}
                </span>
                <span>•</span>
                <span className="font-mono text-stone-500">Weight: {activeTrackingDetails.weight}</span>
              </div>
            </div>

            {/* Shipment Route Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-400 text-[10px] font-mono uppercase font-bold">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>Origin Atelier</span>
                </div>
                <div className="font-medium text-stone-900">{activeTrackingDetails.origin}</div>
                <div className="text-[11px] text-stone-500">White-glove fulfillment center</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-400 text-[10px] font-mono uppercase font-bold">
                  <Plane className="w-3.5 h-3.5 text-amber-600" />
                  <span>Destination Address</span>
                </div>
                <div className="font-medium text-stone-900">{activeTrackingDetails.destination}</div>
                <div className="text-[11px] text-emerald-800 font-medium font-mono">
                  Estimated: {activeTrackingDetails.estimatedDelivery}
                </div>
              </div>
            </div>

            {/* Package Contents */}
            <div className="mb-6 p-3 rounded-lg bg-stone-100/70 border border-stone-200/80 text-xs text-stone-700">
              <span className="font-mono text-[10px] uppercase font-bold text-stone-500 mr-2">
                Allocated Pieces:
              </span>
              <span className="font-light">{activeTrackingDetails.itemsSummary}</span>
            </div>

            {/* Milestones Progress Timeline */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-semibold text-stone-900">
                Logistics Journey & Clearance History
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {activeTrackingDetails.milestones.map((ms, index) => (
                  <div key={index} className="relative text-xs">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                        ms.completed
                          ? 'bg-emerald-600 text-white'
                          : ms.current
                          ? 'bg-amber-600 text-white ring-4 ring-amber-100'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      {ms.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                        <span>{ms.title}</span>
                        {ms.current && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-amber-100 text-amber-900 uppercase">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] text-stone-400">{ms.date}</div>
                    </div>

                    <div className="text-[11px] text-stone-500 font-medium mt-0.5">
                      {ms.location}
                    </div>

                    {ms.notes && (
                      <p className="text-[11px] text-stone-600 font-light mt-1">
                        {ms.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-[11px] text-stone-400 font-mono">
                API Carrier Synchronized • Live Update
              </span>
              <button
                onClick={() => setIsTrackingModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
