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
} from 'lucide-react';
import { STOFFA_BRAND_ASSETS } from '../data/stoffaMediaAssets';
import { useCommerce } from '../context/CommerceContext';

export const Footer: React.FC = () => {
  const { activeCurrency, setIsTrackingModalOpen, setIsB2BModalOpen, setViewMode } = useCommerce();
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
    <footer className="w-full bg-[#f8fafc] text-slate-700 border-t border-sky-100">
      {/* 4 Value-Props Banner (Matches screenshot: Exchanges & Returns, Customer Service, Loyalty Program, Gift Cards) */}
      <div className="border-b border-sky-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* 1. Exchanges & Returns */}
            <div className="flex flex-col items-center space-y-2 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center transition-transform group-hover:scale-110 border border-sky-100 shadow-2xs">
                <RotateCcw className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider font-serif">
                Exchanges & Returns
              </span>
              <p className="text-[11px] text-slate-500 font-light max-w-[180px]">
                Complimentary 30-day pre-paid return shipping
              </p>
            </div>

            {/* 2. Customer Service */}
            <div className="flex flex-col items-center space-y-2 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center transition-transform group-hover:scale-110 border border-sky-100 shadow-2xs">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider font-serif">
                Customer Service
              </span>
              <p className="text-[11px] text-slate-500 font-light max-w-[180px]">
                Concierge styling & sizing support 7 days a week
              </p>
            </div>

            {/* 3. Loyalty Program */}
            <div className="flex flex-col items-center space-y-2 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center transition-transform group-hover:scale-110 border border-sky-100 shadow-2xs">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider font-serif">
                Loyalty Program
              </span>
              <p className="text-[11px] text-slate-500 font-light max-w-[180px]">
                Earn sunny points, VIP drops & birthday surprises
              </p>
            </div>

            {/* 4. Gift Cards */}
            <div className="flex flex-col items-center space-y-2 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center transition-transform group-hover:scale-110 border border-sky-100 shadow-2xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider font-serif">
                Gift Cards
              </span>
              <p className="text-[11px] text-slate-500 font-light max-w-[180px]">
                Instant digital delivery with personalized notes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Our Journey (Stoffa Style Mumbai) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <img
                src={STOFFA_BRAND_ASSETS.logo}
                alt="Stoffa Style Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Women&apos;s luxury footwear & accessories designed and manufactured in-house in Mumbai (stoffastyle.com). Retailed from our flagship store and over 50 designer boutiques across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-900 font-medium pt-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Handcrafted with love in Mumbai, India</span>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-slate-900 uppercase">
              About Us
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-light">
              <li>
                <a href="#beach-to-table" className="hover:text-sky-800 transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-sky-800 transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-sky-800 transition-colors">
                  Press & Features
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsB2BModalOpen(true)}
                  className="hover:text-sky-800 transition-colors text-left"
                >
                  Wholesale & B2B
                </button>
              </li>
              <li>
                <button
                  onClick={() => setViewMode('affiliate_portal')}
                  className="hover:text-sky-800 transition-colors text-left font-medium text-sky-800"
                >
                  Affiliate Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-slate-900 uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-light">
              <li>
                <button
                  onClick={() => setIsTrackingModalOpen(true)}
                  className="hover:text-sky-800 transition-colors text-left"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <a href="#shipping" className="hover:text-sky-800 transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#size-guide" className="hover:text-sky-800 transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-sky-800 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  onClick={() => setViewMode('admin')}
                  className="hover:text-sky-800 transition-colors text-left text-[11px] text-slate-400 font-mono"
                >
                  Merchant Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Join Our Beach Party (Email Subscription + Socials) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-serif text-sm font-bold tracking-wider text-slate-900 uppercase">
              Join Our Beach Party
            </h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Stay connected for exclusive offers, early access to new arrivals, and more.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 rounded-xl border border-sky-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-600/30 shadow-2xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>JOINED!</span>
                  </>
                ) : (
                  <span>JOIN</span>
                )}
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-700 font-medium">
                Welcome to the Beach Party! Check your inbox for your 15% welcome code.
              </p>
            )}

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3 text-slate-500">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full border border-sky-200 bg-white flex items-center justify-center hover:text-sky-900 hover:border-sky-400 transition-colors shadow-2xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-8 h-8 rounded-full border border-sky-200 bg-white flex items-center justify-center hover:text-sky-900 hover:border-sky-400 transition-colors shadow-2xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#pinterest"
                className="w-8 h-8 rounded-full border border-sky-200 bg-white flex items-center justify-center hover:text-sky-900 hover:border-sky-400 transition-colors shadow-2xs"
                aria-label="Pinterest"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Badges & Multi-Currency */}
        <div className="mt-12 pt-8 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 Stoffa Style (stoffastyle.com). All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1 text-sky-900 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Stripe 256-Bit Encrypted
            </span>
            <span>&bull;</span>
            <span className="text-slate-600">Active Currency: {activeCurrency.code} ({activeCurrency.symbol})</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
