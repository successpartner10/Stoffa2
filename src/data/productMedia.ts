import aiShoesDenimCu from '../assets/images/ai_shoes_denim_cu_1788534933587.jpg';
import aiShoesDressFull from '../assets/images/ai_shoes_dress_full_1788534946483.jpg';
import aiBagArmCu from '../assets/images/ai_bag_arm_cu_1788534958494.jpg';
import aiBagStreetFull from '../assets/images/ai_bag_street_full_1788534970450.jpg';
import aiShoesLegsDress from '../assets/images/ai_shoes_legs_dress_1788534991212.jpg';
import coutureHeroLookbook from '../assets/images/couture_hero_lookbook_1788542745021.jpg';
import coutureShoesBag from '../assets/images/couture_shoes_bag_1788542759452.jpg';
import coutureRunwayStreet from '../assets/images/couture_runway_street_1788542775853.jpg';
import stoffaSuedeSlipper from '../assets/images/stoffa_suede_slipper_1788542974814.jpg';
import stoffaFoldoverTote from '../assets/images/stoffa_foldover_tote_1788542991697.jpg';
import stoffaBaboucheOnModel from '../assets/images/stoffa_babouche_onmodel_1788543438556.jpg';
import stoffaToteOnModel from '../assets/images/stoffa_tote_onmodel_1788543456061.jpg';
import stoffaBootOnModel from '../assets/images/stoffa_boot_onmodel_1788543478427.jpg';
import stoffaLoaferOnModel from '../assets/images/stoffa_loafer_onmodel_1788543496501.jpg';
import stoffaWeekenderOnModel from '../assets/images/stoffa_weekender_onmodel_1788543514597.jpg';
import stoffaChelseaBoot from '../assets/images/stoffa_chelsea_boot_1788543960314.jpg';
import stoffaPennyLoafer from '../assets/images/stoffa_penny_loafer_1788543975250.jpg';
import stoffaPointedSlingback from '../assets/images/stoffa_pointed_slingback_1788543995844.jpg';
import stoffaSuedeMule from '../assets/images/stoffa_suede_mule_1788544009514.jpg';
import { ProductAngle } from '../types';

export const AI_MEDIA_ASSETS = {
  shoesDenimCu: aiShoesDenimCu,
  shoesDressFull: aiShoesDressFull,
  shoesLegsDress: aiShoesLegsDress,
  bagArmCu: aiBagArmCu,
  bagStreetFull: aiBagStreetFull,
  coutureHeroLookbook,
  coutureShoesBag,
  coutureRunwayStreet,
  stoffaSuedeSlipper,
  stoffaFoldoverTote,
  stoffaBaboucheOnModel,
  stoffaToteOnModel,
  stoffaBootOnModel,
  stoffaLoaferOnModel,
  stoffaWeekenderOnModel,
  stoffaChelseaBoot,
  stoffaPennyLoafer,
  stoffaPointedSlingback,
  stoffaSuedeMule,
};

// Convert image URL to 4x upscale Retina HD
const toRetinaHd = (url: string) => {
  if (!url) return url;
  if (url.includes('images.unsplash.com')) {
    return (
      url
        .replace(/w=\d+/, 'w=1600')
        .replace(/q=\d+/, 'q=90') + '&dpr=2'
    );
  }
  return url;
};

/**
 * Returns a tailored set of 4-5 curated angles where ALL models wear/carry
 * the exact product displayed:
 * - Babouche slipper product -> model wears the brown suede babouche slipper.
 * - Foldover tote product -> model carries the cognac foldover nappa carryall tote.
 * - Pleated boot product -> model wears the pleated elastic-gore Chelsea boot.
 * - Slingback kitten heel -> model wears the pointed kitten slingback.
 * - Weekender duffel -> model carries the water-repellent suede weekender.
 * - Penny loafer -> model wears the deconstructed suede penny loafer.
 * - Crossbody bag -> model wears the structured box calfskin crossbody.
 */
export function getProductAngles(
  id: string,
  category: string,
  baseImages: string[]
): ProductAngle[] {
  const highResBase = (baseImages || []).filter(Boolean).map(toRetinaHd);

  // Return strictly authentic Stöffa product imagery
  if (highResBase.length > 0) {
    return highResBase.map((imgUrl, i) => ({
      url: imgUrl,
      label: `Stöffa Perspective ${i + 1}`,
      tag: i === 0 ? 'Front' : i === 1 ? 'Profile' : i === 2 ? 'Pair' : `Angle ${i + 1}`,
      shotType: (i === 0 ? 'hero' : i === 1 ? 'side' : 'detail') as 'hero' | 'side' | 'detail',
    }));
  }

  // 1. The Stöffa Suede Slip-On Babouche
  if (id === 'stoffa_01') {
    return [
      {
        url: stoffaSuedeSlipper,
        label: 'Studio Hero: Suede Babouche',
        tag: 'Front Perspective',
        shotType: 'hero',
      },
      {
        url: stoffaSuedeMule,
        label: 'Architectural Profile & Collapsible Heel',
        tag: 'Side Profile',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Tuscan Split Suede & Hand-Turned Sole',
        tag: 'Craft Close-Up',
        shotType: 'detail',
      },
      {
        url: stoffaBaboucheOnModel,
        label: 'On-Model: Wearing Suede Babouche Slipper',
        tag: '✨ On-Model',
        isAiImage: true,
        aiDescription: 'High-fashion editorial: Model wearing the chocolate brown suede Stöffa babouche slipper with relaxed cropped ivory linen trousers',
        shotType: 'ai_cu',
      },
      {
        url: stoffaBaboucheOnModel,
        label: 'On-Model: Florentine Courtyard Walk',
        tag: '✨ On-Model Lookbook',
        isAiImage: true,
        aiDescription: 'Full runway silhouette: Model walking on Tuscan stone courtyard terrace wearing the handcrafted Stöffa suede babouche',
        shotType: 'ai_full',
      },
    ];
  }

  // 2. The Stöffa Soft Foldover Nappa Carryall Tote
  if (id === 'stoffa_02') {
    return [
      {
        url: stoffaFoldoverTote,
        label: 'Studio Hero: Foldover Nappa Tote',
        tag: 'Front View',
        shotType: 'hero',
      },
      {
        url: highResBase[1] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Profile & Modular Foldover Collar',
        tag: 'Side Angle',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Tubular Handle & Washed Lamb Nappa Detail',
        tag: 'Close-Up',
        shotType: 'detail',
      },
      {
        url: stoffaToteOnModel,
        label: 'On-Model: Soft Foldover Nappa Tote',
        tag: '✨ On-Model',
        isAiImage: true,
        aiDescription: 'Editorial lookbook: Model carrying the cognac soft foldover lamb nappa tote over shoulder with fluid sand linen trench',
        shotType: 'ai_cu',
      },
      {
        url: stoffaToteOnModel,
        label: 'On-Model: Colonnade Promenade Look',
        tag: '✨ On-Model Lookbook',
        isAiImage: true,
        aiDescription: 'Street style: Model holding the folded nappa carryall tote in historic Florence',
        shotType: 'ai_full',
      },
    ];
  }

  // 3. The Stöffa Pleated Elastic-Gore Boot
  if (id === 'stoffa_03') {
    return [
      {
        url: stoffaChelseaBoot,
        label: 'Studio Hero: Pleated Chelsea Boot',
        tag: 'Front Perspective',
        shotType: 'hero',
      },
      {
        url: stoffaBootOnModel,
        label: 'Micro-Pleated Leather Stretch Gore Profile',
        tag: 'Side Contour',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'French Calf Nubuck & Blake-Rapid Welt',
        tag: 'Craft Close-Up',
        shotType: 'detail',
      },
      {
        url: stoffaBootOnModel,
        label: 'On-Model: Wearing Pleated Chelsea Boot',
        tag: '✨ On-Model',
        isAiImage: true,
        aiDescription: 'Editorial street style: Model wearing the rich walnut Stöffa pleated Chelsea boot on Milan cobblestones',
        shotType: 'ai_cu',
      },
      {
        url: stoffaBootOnModel,
        label: 'On-Model: Tailored Winter Lookbook',
        tag: '✨ On-Model Lookbook',
        isAiImage: true,
        aiDescription: 'Full silhouette: Model wearing the Stöffa architectural boot with cropped charcoal wool trousers',
        shotType: 'ai_full',
      },
    ];
  }

  // 4. The Stöffa Sculptural Pointed Slingback
  if (id === 'stoffa_04') {
    return [
      {
        url: stoffaPointedSlingback,
        label: 'Studio Hero: Pointed Slingback',
        tag: 'Front Perspective',
        shotType: 'hero',
      },
      {
        url: aiShoesDenimCu,
        label: '50mm Kitten Heel Contour Profile',
        tag: 'Side Heel Contour',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Washed Nappa Footbed & Turned Sole',
        tag: 'Craft Close-Up',
        shotType: 'detail',
      },
      {
        url: aiShoesDenimCu,
        label: 'On-Model: Pointed Slingback with Raw Denim',
        tag: '✨ On-Model',
        isAiImage: true,
        aiDescription: 'Model wearing the signature pointed kitten slingbacks with cropped raw-hem denim',
        shotType: 'ai_cu',
      },
      {
        url: aiShoesLegsDress,
        label: 'On-Model: Evening Slip Dress Pairing',
        tag: '✨ On-Model Lookbook',
        isAiImage: true,
        aiDescription: 'Model wearing the sculptured pointed slingbacks with ivory silk slip dress',
        shotType: 'ai_mid',
      },
    ];
  }

  // 5. The Stöffa Water-Repellent Suede Weekender Duffel
  if (id === 'stoffa_05') {
    return [
      {
        url: highResBase[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Studio Hero: Suede Weekender Duffel',
        tag: 'Front View',
        shotType: 'hero',
      },
      {
        url: highResBase[1] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Bridle Leather Harness Straps Profile',
        tag: 'Side Angle',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Hydrophobic Split Suede & Excella Zipper',
        tag: 'Craft Close-Up',
        shotType: 'detail',
      },
      {
        url: stoffaWeekenderOnModel,
        label: 'On-Model: Carrying Suede Weekender Duffel',
        tag: '✨ On-Model',
        isAiImage: true,
        aiDescription: 'Travel editorial: Model carrying the bitter chocolate suede weekender duffel bag outside Italian villa',
        shotType: 'ai_cu',
      },
      {
        url: stoffaWeekenderOnModel,
        label: 'On-Model: Luxury Jet-Setting Look',
        tag: '✨ On-Model Lookbook',
        isAiImage: true,
        aiDescription: 'Full travel look: Model styled in cream cashmere coat holding the Stöffa suede duffel',
        shotType: 'ai_full',
      },
    ];
  }

  // 6. The Stöffa Deconstructed Hand-Turned Penny Loafer
  if (id === 'stoffa_06') {
    return [
      {
        url: stoffaPennyLoafer,
        label: 'Studio Hero: Penny Loafer',
        tag: 'Front Perspective',
        shotType: 'hero',
      },
      {
        url: stoffaLoaferOnModel,
        label: 'Raw-Cut Saddle & Unlined Profile',
        tag: 'Side Profile',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Santa Croce Reverse Suede & Island Sole',
        tag: 'Craft Close-Up',
        shotType: 'detail',
      },
      {
        url: stoffaLoaferOnModel,
        label: 'On-Model: Wearing Deconstructed Suede Loafer',
        tag: '✨ On-Model',
        isAiImage: true,
        aiDescription: 'Editorial gallery look: Model wearing the dark taupe Stöffa unlined penny loafers with sand trousers',
        shotType: 'ai_cu',
      },
      {
        url: stoffaLoaferOnModel,
        label: 'On-Model: Modernist Tailoring Lookbook',
        tag: '✨ On-Model Lookbook',
        isAiImage: true,
        aiDescription: 'Full lookbook: Relaxed architectural silhouette wearing Stöffa hand-turned suede loafers',
        shotType: 'ai_full',
      },
    ];
  }

  // 7. The Stöffa Structured Box Calfskin Crossbody
  if (id === 'stoffa_07') {
    return [
      {
        url: highResBase[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Studio Hero: Box Calfskin Crossbody',
        tag: 'Front View',
        shotType: 'hero',
      },
      {
        url: highResBase[1] || 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Rectilinear Geometry & Depth',
        tag: 'Side Angle',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Concealed Lock & Lacquered Edges',
        tag: 'Hardware Detail',
        shotType: 'detail',
      },
      {
        url: aiBagArmCu,
        label: 'On-Model: Box Crossbody on Arm',
        tag: '✨ On-Model',
        isAiImage: true,
        aiDescription: 'Close-up: Model holding the structured vegetable-tanned box calfskin bag with tailored charcoal blazer',
        shotType: 'ai_cu',
      },
      {
        url: aiBagStreetFull,
        label: 'On-Model: Street Style Crossbody',
        tag: '✨ On-Model Lookbook',
        isAiImage: true,
        aiDescription: 'Full length: Model wearing the box calfskin crossbody over shoulder in historic center',
        shotType: 'ai_full',
      },
    ];
  }

  const isBag =
    category.toLowerCase().includes('bag') ||
    category.toLowerCase().includes('tote');

  if (isBag) {
    return [
      {
        url: highResBase[0] || stoffaFoldoverTote,
        label: 'Studio Hero',
        tag: 'Front View',
        shotType: 'hero',
      },
      {
        url: highResBase[1] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Profile & Depth',
        tag: 'Side Angle',
        shotType: 'side',
      },
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=90&dpr=2',
        label: 'Hardware & Edge Detail',
        tag: 'Close-Up',
        shotType: 'detail',
      },
      {
        url: stoffaToteOnModel,
        label: 'On-Model: Carrying Draped Leather Carryall',
        tag: '✨ On-Model',
        isAiImage: true,
        aiDescription: 'Fashion editorial: Model carrying luxury Italian leather bag over shoulder with relaxed tailoring',
        shotType: 'ai_cu',
      },
      {
        url: stoffaWeekenderOnModel,
        label: 'On-Model: Transit & Travel Silhouette',
        tag: '✨ On-Model Lookbook',
        isAiImage: true,
        aiDescription: 'Travel lookbook: Model carrying Italian leather luggage bag in tailored outerwear',
        shotType: 'ai_full',
      },
    ];
  }

  // Footwear default
  const isBoot = category.toLowerCase().includes('boot');
  const isLoaferOrFlat =
    category.toLowerCase().includes('flat') ||
    category.toLowerCase().includes('loafer');

  const onModelCloseUp = isBoot
    ? stoffaBootOnModel
    : isLoaferOrFlat
    ? stoffaLoaferOnModel
    : aiShoesDenimCu;

  const onModelFull = isBoot
    ? stoffaBootOnModel
    : isLoaferOrFlat
    ? stoffaBaboucheOnModel
    : aiShoesLegsDress;

  // Multi-angle catalog images support
  if (highResBase.length >= 3) {
    const defaultLabels = [
      { label: 'Studio Hero: Front View', tag: 'Front Angle', shotType: 'hero' as const },
      { label: 'Architectural Profile', tag: 'Side Profile', shotType: 'side' as const },
      { label: 'Pair Composition', tag: 'Pair View', shotType: 'detail' as const },
      { label: 'Top Elevation & Arch', tag: 'Top Angle', shotType: 'detail' as const },
      { label: 'Artisanal Craft & Texture', tag: 'Detail CU', shotType: 'detail' as const },
    ];

    const mappedAngles: ProductAngle[] = highResBase.slice(0, 5).map((imgUrl, i) => {
      const def = defaultLabels[i] || {
        label: `Artisanal Angle ${i + 1}`,
        tag: `Angle ${i + 1}`,
        shotType: 'detail' as const,
      };
      return {
        url: imgUrl,
        label: def.label,
        tag: def.tag,
        shotType: def.shotType,
      };
    });

    mappedAngles.push({
      url: onModelCloseUp,
      label: 'On-Model: Editorial Lookbook',
      tag: '✨ On-Model',
      isAiImage: true,
      aiDescription: 'Fashion editorial: Model styled wearing handcrafted footwear silhouette with tailored ensemble',
      shotType: 'ai_cu',
    });

    return mappedAngles;
  }

  return [
    {
      url: highResBase[0] || stoffaSuedeSlipper,
      label: 'Studio Hero',
      tag: 'Front Perspective',
      shotType: 'hero',
    },
    {
      url: highResBase[1] || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1600&q=90&dpr=2',
      label: 'Architectural Profile',
      tag: 'Side Heel Contour',
      shotType: 'side',
    },
    {
      url: highResBase[2] || 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1600&q=90&dpr=2',
      label: 'Tuscan Leather & Sole CU',
      tag: 'Craft Close-Up',
      shotType: 'detail',
    },
    {
      url: onModelCloseUp,
      label: isBoot
        ? 'On-Model: Wearing Architectural Boots'
        : isLoaferOrFlat
        ? 'On-Model: Wearing Hand-Turned Loafers'
        : 'On-Model: Wearing Pointed Footwear',
      tag: '✨ On-Model',
      isAiImage: true,
      aiDescription: 'Model feet and legs styled wearing the exact matching Italian footwear silhouette with tailored trousers',
      shotType: 'ai_cu',
    },
    {
      url: onModelFull,
      label: 'On-Model: Full Editorial Silhouette',
      tag: '✨ On-Model Lookbook',
      isAiImage: true,
      aiDescription: 'Full runway silhouette: Model wearing matching handcrafted footwear with relaxed Italian linen and wool tailoring',
      shotType: 'ai_mid',
    },
  ];
}
