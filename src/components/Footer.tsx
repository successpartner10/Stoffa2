import React, { useState } from 'react';
import {
  RotateCcw,
  Headphones,
  Gift,
  CreditCard,
  Instagram,
  Facebook,
  Send,
  Check,
  Heart,
  ShieldCheck,
  Lock,
  FileSpreadsheet,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const Footer: React.FC = () => {
  const {
    activeCurrency,
    setIsTrackingModalOpen,
    setIsB2BModalOpen,
    setIsCatalogManagerOpen,
    isAdminLoggedIn,
    adminUser,
    setIsAdminLoginModalOpen,
  } = useCommerce();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-[#f8fafc] text-stone-900 border-t-2 border-stone-200">
      {/* 4 Value-Props Banner with much bigger and darker fonts */}
      <div className="border-b-2 border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* 1. Exchanges & Returns */}
            <div className="flex flex-col items-center space-y-2.5 group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center transition-transform group-hover:scale-110 border border-stone-300 shadow-sm">
                <RotateCcw className="w-7 h-7 text-stone-950" />
              </div>
              <span className="text-base sm:text-lg font-bold text-stone-950 uppercase tracking-wider font-serif">
                Exchanges &amp; Returns
              </span>
              <p className="text-sm text-stone-700 font-medium max-w-[220px]">
                Complimentary 30-day pre-paid return shipping worldwide
              </p>
            </div>

            {/* 2. Customer Service */}
            <div className="flex flex-col items-center space-y-2.5 group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center transition-transform group-hover:scale-110 border border-stone-300 shadow-sm">
                <Headphones className="w-7 h-7 text-stone-950" />
              </div>
              <span className="text-base sm:text-lg font-bold text-stone-950 uppercase tracking-wider font-serif">
                Customer Service
              </span>
              <p className="text-sm text-stone-700 font-medium max-w-[220px]">
                Concierge styling &amp; sizing support 7 days a week
              </p>
            </div>

            {/* 3. Loyalty Program */}
            <div className="flex flex-col items-center space-y-2.5 group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center transition-transform group-hover:scale-110 border border-stone-300 shadow-sm">
                <Gift className="w-7 h-7 text-stone-950" />
              </div>
              <span className="text-base sm:text-lg font-bold text-stone-950 uppercase tracking-wider font-serif">
                VIP Access
              </span>
              <p className="text-sm text-stone-700 font-medium max-w-[220px]">
                Priority access to limited bridal drops &amp; custom orders
              </p>
            </div>

            {/* 4. Gift Cards */}
            <div className="flex flex-col items-center space-y-2.5 group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center transition-transform group-hover:scale-110 border border-stone-300 shadow-sm">
                <CreditCard className="w-7 h-7 text-stone-950" />
              </div>
              <span className="text-base sm:text-lg font-bold text-stone-950 uppercase tracking-wider font-serif">
                Instant Gift Cards
              </span>
              <p className="text-sm text-stone-700 font-medium max-w-[220px]">
                Digital luxury delivery with custom personalized messages
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Our Journey (Accessoiree) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.2em] text-stone-950 lowercase font-bold">
                accessoiree
              </span>
            </div>
            <p className="text-base text-stone-700 font-medium leading-relaxed">
              Women&apos;s luxury footwear &amp; artisanal bags handcrafted in master workshops. Signature wedges, architectural block heels, authentic flats, and bridal creations exclusively in USD.
            </p>
            <div className="flex items-center gap-2 text-sm text-stone-950 font-bold pt-1">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <span>Handcrafted with precision &amp; dual-density comfort</span>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-stone-950 uppercase">
              About Us
            </h4>
            <ul className="space-y-3 text-base text-stone-800 font-semibold">
              <li>
                <a href="#about" className="hover:text-black transition-colors">
                  Our Atelier
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-black transition-colors">
                  Artisanship
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-black transition-colors">
                  Press &amp; Editorial
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsB2BModalOpen(true)}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  Wholesale &amp; B2B
                </button>
              </li>
              {/* Admin-only or Protected Admin Access */}
              <li>
                {isAdminLoggedIn ? (
                  <button
                    onClick={() => setIsCatalogManagerOpen(true)}
                    className="flex items-center gap-1.5 text-amber-900 hover:text-black font-bold text-left cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-700" />
                    <span>Catalog CSV (Admin)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAdminLoginModalOpen(true)}
                    className="flex items-center gap-1.5 text-stone-500 hover:text-stone-950 font-medium text-xs pt-1 cursor-pointer"
                    title="Merchant Administrator Login"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Merchant Admin Portal</span>
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-stone-950 uppercase">
              Customer Care
            </h4>
            <ul className="space-y-3 text-base text-stone-800 font-semibold">
              <li>
                <button
                  onClick={() => setIsTrackingModalOpen(true)}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <a href="#shipping" className="hover:text-black transition-colors">
                  Shipping &amp; Delivery
                </a>
              </li>
              <li>
                <a href="#size-guide" className="hover:text-black transition-colors">
                  Shoe Size Guide
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-black transition-colors">
                  Client Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter + Socials */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-stone-950 uppercase">
              Join Our VIP Circle
            </h4>
            <p className="text-base text-stone-700 font-medium leading-relaxed">
              Stay connected for exclusive trunk shows, early access to new wedge releases, and special drops.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-300 bg-white text-base font-semibold text-stone-950 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-950 shadow-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-stone-950 hover:bg-black text-white text-sm font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>JOINED!</span>
                  </>
                ) : (
                  <span>JOIN</span>
                )}
              </button>
            </form>

            {subscribed && (
              <p className="text-sm text-emerald-800 font-bold">
                Welcome to Accessoiree VIP Circle! Check your inbox for your 15% code.
              </p>
            )}

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3 text-stone-700">
              <a
                href="#instagram"
                className="w-11 h-11 rounded-xl border-2 border-stone-300 bg-white flex items-center justify-center hover:text-black hover:border-stone-950 transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#facebook"
                className="w-11 h-11 rounded-xl border-2 border-stone-300 bg-white flex items-center justify-center hover:text-black hover:border-stone-950 transition-colors shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#pinterest"
                className="w-11 h-11 rounded-xl border-2 border-stone-300 bg-white flex items-center justify-center hover:text-black hover:border-stone-950 transition-colors shadow-xs"
                aria-label="Pinterest"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Badges & Multi-Currency */}
        <div className="mt-14 pt-8 border-t-2 border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-semibold text-stone-700">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 Accessoiree Luxury Footwear. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 text-stone-950 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Stripe 256-Bit SSL Encrypted
            </span>
            <span>&bull;</span>
            <span className="text-stone-900 font-bold">Currency: USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
