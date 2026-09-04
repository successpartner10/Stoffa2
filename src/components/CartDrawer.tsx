import React from 'react';
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatPrice,
    activeCurrency,
    activeCampaign,
    setIsCheckoutOpen,
    t,
  } = useCommerce();

  if (!isCartOpen) return null;

  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const discountRate = activeCampaign ? activeCampaign.discountPercent / 100 : 0;
  const discountUSD = subtotalUSD * discountRate;
  const totalUSD = subtotalUSD - discountUSD;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf9f6] border-l border-stone-200 text-stone-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif text-lg font-medium text-stone-900">
                {t('shopping_bag')} ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 stroke-1" />
                <p className="text-stone-700 font-serif text-lg">{t('empty_bag')}</p>
                <p className="text-xs text-stone-500 max-w-xs font-light">
                  Explore our handcrafted footwear and Tuscan leather bags with 1-click quick buy.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-xs text-white font-medium transition-colors shadow-xs"
                >
                  Return to Collection
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  className="p-3.5 rounded-xl bg-white border border-stone-200 flex gap-3.5 shadow-2xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-center rounded-lg bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm text-stone-900 font-medium line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                        <span className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-stone-800 border border-stone-200 font-medium">
                          {item.selectedSize}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-stone-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 border border-stone-300 rounded-lg p-1 bg-stone-50 text-xs">
                        <button
                          onClick={() => updateCartQuantity(index, -1)}
                          className="p-0.5 hover:text-stone-950 text-stone-500"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-mono font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(index, 1)}
                          className="p-0.5 hover:text-stone-950 text-stone-500"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right font-mono text-sm font-semibold text-stone-900">
                        {formatPrice(item.product.priceUSD * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-3">
              {/* Active Campaign Attribution Notice */}
              {activeCampaign && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
                  <span className="text-emerald-900 font-medium">
                    {activeCampaign.discountPercent}% VIP Code ({activeCampaign.name})
                  </span>
                  <span className="text-emerald-800 font-mono font-bold">
                    -{formatPrice(discountUSD)}
                  </span>
                </div>
              )}

              {/* Subtotal & Currency Info */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono text-stone-800 font-medium">{formatPrice(subtotalUSD)}</span>
                </div>
                {activeCampaign && (
                  <div className="flex justify-between text-emerald-800">
                    <span>{t('discount')} ({activeCampaign.discountPercent}%)</span>
                    <span className="font-mono font-medium">-{formatPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-medium">Free Express Courier</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Due ({activeCurrency.code})</span>
                  <span className="font-mono text-base text-stone-900 font-bold">{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{t('checkout')}</span>
                <span>•</span>
                <span className="font-mono">{formatPrice(totalUSD)}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Powered by Stripe • Billed in {activeCurrency.code}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
