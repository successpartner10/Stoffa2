import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { STOFFA_BRAND_ASSETS } from '../data/stoffaMediaAssets';

interface SymmetricalSectionsProps {
  onSelectCollection?: (collectionName: string) => void;
}

export const SymmetricalSections: React.FC<SymmetricalSectionsProps> = ({ onSelectCollection }) => {
  const { setSelectedCategory, clearFilters } = useCommerce();

  const handleTileClick = (filterCategory: string, collectionTitle: string) => {
    if (onSelectCollection) {
      onSelectCollection(collectionTitle);
    } else {
      clearFilters();
      setSelectedCategory(filterCategory);
      const grid = document.getElementById('category-products-section') || document.getElementById('collection-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const tiles = [
    {
      id: 'high-wedges',
      title: 'ICONIC KOLHAPURI WEDGES',
      subtitle: 'Signature 3.5" & 4.25" wedges with dual-density memory foam footbed',
      ctaText: 'SHOP HIGH WEDGES',
      filterTarget: 'Shoes',
      collectionName: 'High Wedges (3.5")',
      imageUrl: STOFFA_BRAND_ASSETS.campaignHighWedges,
      badge: 'Stoffa Style Best Seller',
    },
    {
      id: 'celebrity-spotting',
      title: 'CELEBRITY SPOTTING',
      subtitle: 'Spotted on Madhuri Dixit, Kareena Kapoor, Alia Bhatt & Rashmika Mandanna',
      ctaText: 'EXPLORE CELEBRITY EDIT',
      filterTarget: 'All',
      collectionName: 'Celebrity Edit',
      imageUrl: 'https://stoffastyle.com/cdn/shop/files/Madhuri_Dixit-_STO_115_Champagne__jpg_8c2611ad-d6b7-4f1a-957d-6f331246f76f.jpg',
      badge: 'Spotted on Bollywood Icons',
    },
    {
      id: 'artisanal-flats',
      title: 'ARTISANAL KOLHAPURI FLATS',
      subtitle: 'Tribal braids, crystal baguettes & versatile metallic flats for day & night',
      ctaText: 'DISCOVER FLATS',
      filterTarget: 'Flats & Loafers',
      collectionName: 'Kolhapuri Flats',
      imageUrl: STOFFA_BRAND_ASSETS.campaignFlats,
      badge: 'Handcrafted Braids',
    },
    {
      id: 'bridal-potlis',
      title: 'BRIDAL WEDGES & POTLIS',
      subtitle: 'Exquisite heirloom zardozi borders & hand-embellished silk potli drawstrings',
      ctaText: 'EXPLORE BRIDAL & BAGS',
      filterTarget: 'Bags',
      collectionName: 'Bags & Potlis',
      imageUrl: STOFFA_BRAND_ASSETS.campaignBridalPotlis,
      badge: 'Heirloom Handcraft',
    },
  ];

  return (
    <section id="symmetrical-edits" className="w-full bg-[#faf9f6] py-12 sm:py-16 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Curated Collections &bull; stoffastyle.com</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-medium tracking-tight">
            The World of Stoffa Style
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2 font-light">
            Explore authentic handcrafted edits, from red-carpet Kolhapuri wedges to heirloom bridal potlis.
          </p>
        </div>

        {/* Symmetrical 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              id={`tile-${tile.id}`}
              onClick={() => handleTileClick(tile.filterTarget, tile.collectionName)}
              className="group relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-amber-100 bg-slate-950"
            >
              {/* Background Image with zoom on hover */}
              <img
                src={tile.imageUrl}
                alt={tile.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
              />

              {/* Refined gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

              {/* Top pill badge */}
              <div className="absolute top-4 start-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-mono font-bold tracking-widest uppercase shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {tile.badge}
                </span>
              </div>

              {/* Text & CTA Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end text-left text-white">
                <h3 className="text-xl sm:text-2xl font-serif font-medium tracking-wider mb-1.5 drop-shadow-xs">
                  {tile.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-light mb-4 line-clamp-2 max-w-md drop-shadow-xs">
                  {tile.subtitle}
                </p>

                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-amber-200 group-hover:text-white transition-colors">
                    <span>{tile.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
