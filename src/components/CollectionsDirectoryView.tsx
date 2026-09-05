import React, { useState } from 'react';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import { CURATED_COLLECTIONS_DATA, CuratedCollectionItem } from '../data/collectionsData';

interface CollectionsDirectoryViewProps {
  onSelectCollection: (title: string) => void;
  onBackToHome?: () => void;
}

export const CollectionsDirectoryView: React.FC<CollectionsDirectoryViewProps> = ({
  onSelectCollection,
  onBackToHome,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  const themes = [
    { id: 'all', label: 'All Collections' },
    { id: 'Wedding & Ceremonies', label: 'Wedding & Bridal' },
    { id: 'Galas & Celebrations', label: 'Galas & Celebrations' },
    { id: 'Resort & Evenings', label: 'Resort & Evenings' },
  ];

  const filteredCollections = selectedTheme === 'all'
    ? CURATED_COLLECTIONS_DATA
    : CURATED_COLLECTIONS_DATA.filter((c) => c.theme === selectedTheme);

  return (
    <section id="collections-directory" className="w-full bg-[#faf9f6] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-[0.18em]">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Curated Lifestyle Editions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-950 font-bold tracking-tight">
            The Curated Collections
          </h1>
          <p className="text-stone-700 text-base sm:text-lg font-medium leading-relaxed">
            From the aisle to the after-party, coastal getaways to red carpet entrances — discover handcrafted luxury footwear and artisanal accessories designed for every moment.
          </p>

          {/* Quick Theme Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                id={`theme-tab-${t.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedTheme(t.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  selectedTheme === t.id
                    ? 'bg-stone-950 text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Columns Grid of All Collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCollections.map((col: CuratedCollectionItem) => (
            <div
              key={col.id}
              id={`collection-card-${col.id}`}
              onClick={() => {
                onSelectCollection(col.title);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative h-[440px] sm:h-[480px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-stone-200/80 flex flex-col justify-end"
            >
              {/* Image Background with gentle zoom on hover */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Subtle ambient lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Theme Tag Badge at top-left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-[0.16em] border border-white/20">
                  {col.theme}
                </span>
              </div>

              {/* Text Overlay on top of image with 90% transparency behind text as requested */}
              <div className="relative z-10 m-4 sm:m-5 bg-white/90 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-xl border border-white/60 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-800">
                      {col.shoeNote}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-900 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </div>
                  
                  <h2 className="font-serif text-2xl font-bold text-stone-950 tracking-tight leading-snug">
                    {col.title}
                  </h2>

                  <p className="text-stone-800 text-xs sm:text-sm font-medium leading-relaxed">
                    {col.tagline}
                  </p>

                  <div className="pt-2 flex items-center text-xs font-bold text-stone-950 uppercase tracking-[0.14em]">
                    <span>Explore Edit</span>
                    <span className="ml-1 text-amber-700">&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Full Catalog / Storefront Link */}
        {onBackToHome && (
          <div className="mt-12 text-center">
            <button
              id="back-to-home-btn"
              onClick={onBackToHome}
              className="px-6 py-3 bg-white border border-stone-300 text-stone-800 hover:text-stone-950 hover:bg-stone-50 rounded-full text-xs uppercase font-bold tracking-[0.18em] transition-colors shadow-sm"
            >
              &larr; Return to All Shoes &amp; Bags
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
