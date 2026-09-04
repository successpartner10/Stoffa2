import React from 'react';
import { ChevronRight, Home, RefreshCw, Search } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const Breadcrumbs: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    selectedCategory,
    setSelectedCategory,
    selectedOccasion,
    setSelectedOccasion,
    searchTerm,
    setSearchTerm,
    selectedProductModal,
    setSelectedProductModal,
    selectedSizeFilter,
    setSelectedSizeFilter,
    t,
  } = useCommerce();

  if (viewMode !== 'storefront') {
    return (
      <div className="bg-stone-50 border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-stone-500 font-mono">
          <button
            onClick={() => setViewMode('storefront')}
            className="hover:text-stone-900 flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-stone-400" />
            <span>Atelier Étoile</span>
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-stone-900 font-semibold uppercase tracking-wider">
            {viewMode === 'admin' ? t('admin_mode') : t('affiliate_portal')}
          </span>
        </div>
      </div>
    );
  }

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedOccasion !== 'all' ||
    Boolean(searchTerm) ||
    selectedSizeFilter !== 'all' ||
    Boolean(selectedProductModal);

  return (
    <div
      id="storefront-breadcrumbs"
      className="bg-stone-50/90 border-b border-stone-200/70 px-4 sm:px-6 lg:px-8 py-2 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-stone-500">
          <button
            id="breadcrumb-home"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedOccasion('all');
              setSearchTerm('');
              setSelectedSizeFilter('all');
              setSelectedProductModal(null);
            }}
            className="hover:text-stone-900 flex items-center gap-1 transition-colors text-stone-600"
          >
            <Home className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-medium">Atelier</span>
          </button>

          <ChevronRight className="w-3 h-3 text-stone-300 shrink-0" />
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedOccasion('all');
              setSelectedProductModal(null);
            }}
            className="hover:text-stone-900 transition-colors"
          >
            Collection 2026
          </button>

          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-300 shrink-0" />
              <button
                onClick={() => setSelectedProductModal(null)}
                className={`transition-colors ${
                  !selectedProductModal && selectedOccasion === 'all'
                    ? 'text-stone-900 font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {selectedCategory}
              </button>
            </>
          )}

          {selectedOccasion !== 'all' && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-300 shrink-0" />
              <span className="text-stone-800 font-medium px-1.5 py-0.5 rounded bg-stone-200/80 text-[11px] uppercase">
                {t(`occ_${selectedOccasion}`) || selectedOccasion}
              </span>
            </>
          )}

          {selectedSizeFilter !== 'all' && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-300 shrink-0" />
              <span className="text-stone-800 font-medium px-1.5 py-0.5 rounded bg-stone-200/80 text-[11px]">
                Size {selectedSizeFilter}
              </span>
            </>
          )}

          {searchTerm && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-300 shrink-0" />
              <span className="text-stone-800 font-medium flex items-center gap-1 bg-amber-100/70 text-amber-900 px-1.5 py-0.5 rounded text-[11px]">
                <Search className="w-3 h-3 text-amber-700" />
                <span>&quot;{searchTerm}&quot;</span>
              </span>
            </>
          )}

          {selectedProductModal && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-300 shrink-0" />
              <span className="text-stone-900 font-bold truncate max-w-[200px] sm:max-w-[320px]">
                {selectedProductModal.title}
              </span>
            </>
          )}
        </nav>

        {hasActiveFilters && (
          <button
            id="breadcrumbs-clear-all-btn"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedOccasion('all');
              setSearchTerm('');
              setSelectedSizeFilter('all');
              setSelectedProductModal(null);
            }}
            className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-900 transition-colors font-medium ml-auto"
          >
            <RefreshCw className="w-3 h-3 text-stone-400" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
