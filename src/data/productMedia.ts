import aiShoesDenimCu from '../assets/images/ai_shoes_denim_cu_1788534933587.jpg';
import aiShoesDressFull from '../assets/images/ai_shoes_dress_full_1788534946483.jpg';
import aiBagArmCu from '../assets/images/ai_bag_arm_cu_1788534958494.jpg';
import aiBagStreetFull from '../assets/images/ai_bag_street_full_1788534970450.jpg';
import aiShoesLegsDress from '../assets/images/ai_shoes_legs_dress_1788534991212.jpg';
import { ProductAngle } from '../types';

export const AI_MEDIA_ASSETS = {
  shoesDenimCu: aiShoesDenimCu,
  shoesDressFull: aiShoesDressFull,
  shoesLegsDress: aiShoesLegsDress,
  bagArmCu: aiBagArmCu,
  bagStreetFull: aiBagStreetFull,
};

/**
 * Returns a complete set of 4-5 curated angles including mandatory AI on-model imagery:
 * - American women legs & feet with jeans (CU & mid shot) or dresses (full length) for shoes
 * - Arm and bag styling with tailored blazers / street style for bags
 */
export function getProductAngles(
  id: string,
  category: string,
  baseImages: string[]
): ProductAngle[] {
  const isBag =
    category.toLowerCase().includes('bag') ||
    category.toLowerCase().includes('tote');

  if (isBag) {
    return [
      {
        url: baseImages[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
        label: 'Studio Hero',
        tag: 'Front View',
        shotType: 'hero',
      },
      {
        url: baseImages[1] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
        label: 'Profile & Depth',
        tag: 'Side Angle',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
        label: 'Hardware & Edge Detail',
        tag: 'Close-Up',
        shotType: 'detail',
      },
      {
        url: aiBagArmCu,
        label: 'AI On-Model: Arm & Bag CU',
        tag: '✨ AI Editorial',
        isAiImage: true,
        aiDescription: 'Close-up fashion editorial: American woman arm and hand holding structured leather bag with tailored charcoal wool blazer cuff',
        shotType: 'ai_cu',
      },
      {
        url: aiBagStreetFull,
        label: 'AI Street Look: Full Length',
        tag: '✨ AI Lookbook',
        isAiImage: true,
        aiDescription: 'Full length street style: American woman carrying luxury bag over shoulder with relaxed trousers and silk shirt',
        shotType: 'ai_full',
      },
    ];
  }

  // Otherwise it is footwear (Heels, Boots, Flats, Sandals, Pumps, Loafers)
  const isBoot = category.toLowerCase().includes('boot');
  const isFlats = category.toLowerCase().includes('flat') || category.toLowerCase().includes('loafer') || category.toLowerCase().includes('mule');

  return [
    {
      url: baseImages[0] || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85',
      label: 'Studio Hero',
      tag: 'Front Perspective',
      shotType: 'hero',
    },
    {
      url: baseImages[1] || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85',
      label: 'Architectural Profile',
      tag: 'Side Heel Contour',
      shotType: 'side',
    },
    {
      url: isBoot
        ? 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=85'
        : isFlats
        ? 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=85'
        : 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85',
      label: 'Tuscan Leather & Sole CU',
      tag: 'Craft Close-Up',
      shotType: 'detail',
    },
    {
      url: aiShoesDenimCu,
      label: 'AI On-Model: Denim Jeans CU',
      tag: '✨ AI Editorial',
      isAiImage: true,
      aiDescription: 'Close-up fashion editorial: American woman legs and feet styled with raw-hem cropped blue denim jeans',
      shotType: 'ai_cu',
    },
    {
      url: isBoot ? aiShoesDressFull : aiShoesLegsDress,
      label: isBoot ? 'AI Lookbook: Dress Full Length' : 'AI On-Model: Dress & Legs Mid Shot',
      tag: '✨ AI Lookbook',
      isAiImage: true,
      aiDescription: isBoot
        ? 'Full length fashion lookbook: American woman walking in knee-high leather boots with pleated midi dress and tailored camel trench'
        : 'Mid shot & legs close-up: American woman legs and feet in sculpted designer heels with ivory silk slip dress',
      shotType: isBoot ? 'ai_full' : 'ai_mid',
    },
  ];
}
