import React from 'react';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { B2BOrderModal } from './components/B2BOrderModal';
import { Breadcrumbs } from './components/Breadcrumbs';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CatalogCsvModal } from './components/CatalogCsvModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Hero } from './components/Hero';
import { LanguageModal } from './components/LanguageModal';
import { LanguageWarningModal } from './components/LanguageWarningModal';
import { Navbar } from './components/Navbar';
import { OccasionDiscovery } from './components/OccasionDiscovery';
import { OrderTrackerFooter } from './components/OrderTrackerFooter';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { QuotaAlertBanner } from './components/QuotaAlertBanner';
import { SymmetricalSections } from './components/SymmetricalSections';
import { EdgeToEdgeNewArrivals } from './components/EdgeToEdgeNewArrivals';
import { BeachToTableStory } from './components/BeachToTableStory';
import { VacationAccessoriesScroll } from './components/VacationAccessoriesScroll';
import { CategoryCollectionSection } from './components/CategoryCollectionSection';
import { Footer } from './components/Footer';
import { CommerceProvider, useCommerce } from './context/CommerceContext';

const StorefrontContent: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useCommerce();

  const isCategoryFiltered = selectedCategory !== 'All' && Boolean(selectedCategory);

  return (
    <div className="bg-[#faf9f6]">
      {/* If category is active, show the focused Category Collection View right at top */}
      {isCategoryFiltered ? (
        <div className="space-y-12 pb-16">
          <CategoryCollectionSection
            categoryTitle={selectedCategory}
            onBackToHome={() => setSelectedCategory('All')}
          />
          <EdgeToEdgeNewArrivals />
          <BeachToTableStory />
          <VacationAccessoriesScroll />
        </div>
      ) : (
        /* Full Storefront Homepage Layout matching Accessoiree Resort & Luxury Aesthetic */
        <div className="space-y-14 sm:space-y-20 pb-16">
          {/* 1. Coastal Resort Hero & SET Sale 60% OFF Banner */}
          <Hero />

          {/* 2. Symmetrical 2x2 Editorial Sections */}
          <div id="symmetrical-edits">
            <SymmetricalSections onSelectCollection={(col) => setSelectedCategory(col)} />
          </div>

          {/* 3. Edge-to-Edge New Arrivals Horizontal Rail with Arrow Navigation */}
          <EdgeToEdgeNewArrivals />

          {/* 4. Beach to Table Storytelling Break with Editorial Photograph & Our Story CTA */}
          <BeachToTableStory />

          {/* 5. Vacation-Ready Accessories Horizontal Rail (Straw Totes, Pickleball Sets, Footwear) */}
          <VacationAccessoriesScroll />

          {/* 6. Comprehensive Resort & Footwear Highlights with Symmetrical 4-Column Grid */}
          <CategoryCollectionSection
            categoryTitle="Resort & Handcrafted Footwear"
            onBackToHome={() => setSelectedCategory('All')}
          />

          {/* 7. Curated Occasion Showcase */}
          <OccasionDiscovery />
        </div>
      )}
    </div>
  );
};

const MainAppLayout: React.FC = () => {
  const { viewMode, selectedProductModal } = useCommerce();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Breadcrumbs Navigation (shown on catalog views) */}
      {!selectedProductModal && <Breadcrumbs />}

      {/* Main Content Router */}
      <main className="flex-1">
        {selectedProductModal ? (
          <ProductDetailPage />
        ) : (
          <>
            {viewMode === 'storefront' && <StorefrontContent />}
            {viewMode === 'admin' && <AdminDashboard />}
          </>
        )}
      </main>

      {/* Global Modals & Drawers */}
      {/* Product detail view is now a full page not a popup as requested */}
      <ProductComparisonModal />
      <B2BOrderModal />
      <LanguageModal />
      <CatalogCsvModal />
      <AdminLoginModal />
      <LanguageWarningModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerFooter />
      <QuotaAlertBanner />

      {/* Clean Accessoiree Brand Footer with 4-Card Value Prop Banner */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CommerceProvider>
      <MainAppLayout />
    </CommerceProvider>
  );
}
