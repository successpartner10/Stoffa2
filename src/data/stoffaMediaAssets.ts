import editorialCocktailModelImg from '../assets/images/editorial_cocktail_model_1788636217428.jpg';
import eveningGlamModelImg from '../assets/images/evening_glam_model_1788636233051.jpg';
import resortChicModelImg from '../assets/images/resort_chic_model_1788636246938.jpg';
import nightOutModelImg from '../assets/images/night_out_model_1788636263097.jpg';
import bridalModelImg from '../assets/images/bridal_elegance_model_1788635754691.jpg';
import galaModelImg from '../assets/images/gala_evening_model_1788635714917.jpg';
import festiveBrunchModelImg from '../assets/images/festive_brunch_model_1788635728185.jpg';
import resortHolidayModelImg from '../assets/images/resort_holiday_model_1788635741638.jpg';
import fashionHeroModelImg from '../assets/images/fashion_hero_model_1788635702143.jpg';

export interface CelebritySpotting {
  id: string;
  celebrityName: string;
  styleName: string;
  styleHandle: string;
  styleCategory: string;
  imageUrl: string;
  quote?: string;
}

export const STOFFA_BRAND_ASSETS = {
  logo: 'https://stoffastyle.com/cdn/shop/files/STOFFA_LOGO_0b001faa-38d7-4a0a-a937-06b9812b2d00.png',
  heroBanner: fashionHeroModelImg,
  campaignHighWedges: galaModelImg,
  campaignFlats: resortHolidayModelImg,
  campaignBridalPotlis: festiveBrunchModelImg,
  campaignBlockHeels: eveningGlamModelImg,
  craftsmanshipEditorial1: resortChicModelImg,
  craftsmanshipEditorial2: nightOutModelImg,
  craftsmanshipEditorial3: editorialCocktailModelImg,
  craftsmanshipEditorial4: bridalModelImg,
};

export const STOFFA_CELEBRITIES: CelebritySpotting[] = [
  {
    id: 'celeb-1',
    celebrityName: 'Sofia Laurent',
    styleName: 'Classic High K Wedge in Champagne',
    styleHandle: 'classic-high-k-wedge-champagne',
    styleCategory: 'High Wedges',
    imageUrl: editorialCocktailModelImg,
    quote: 'Styled in Champagne Kolhapuri Wedges with a champagne slip dress for high-society soirees.',
  },
  {
    id: 'celeb-2',
    celebrityName: 'Elena Rostova',
    styleName: 'Classic High K Wedge in Pewter',
    styleHandle: 'copy-of-classic-high-k-wedge-pewter',
    styleCategory: 'High Wedges',
    imageUrl: eveningGlamModelImg,
    quote: 'Pairing emerald satin evening gowns with sculpted pewter wedges for red carpet events.',
  },
  {
    id: 'celeb-3',
    celebrityName: 'Camilla Jensen',
    styleName: 'Artisanal Braided Flat in Rose Gold',
    styleHandle: 'classic-high-k-rose-antique',
    styleCategory: 'Artisanal Flats',
    imageUrl: resortChicModelImg,
    quote: 'Effortless Mediterranean summer chic with hand-braided rose gold metallic sandals.',
  },
  {
    id: 'celeb-4',
    celebrityName: 'Chloe Davenport',
    styleName: 'Classic Low Wedge in Bronze',
    styleHandle: 'classic-k-block-heel-silver',
    styleCategory: 'Low Wedges',
    imageUrl: nightOutModelImg,
    quote: 'Sleek black column gown paired with dual-density bronze wedges for all-night comfort.',
  },
  {
    id: 'celeb-5',
    celebrityName: 'Genevieve Moreau',
    styleName: 'Bridal Crystal High Wedge',
    styleHandle: 'classic-high-k-wedge-champagne',
    styleCategory: 'Bridal Couture',
    imageUrl: bridalModelImg,
    quote: 'Haute couture bridal silhouette finished with hand-set crystal wedge architecture.',
  },
  {
    id: 'celeb-6',
    celebrityName: 'Victoria Vance',
    styleName: 'Sculptural High Wedge in Gold',
    styleHandle: 'copy-of-classic-high-k-wedge-gold',
    styleCategory: 'High Wedges',
    imageUrl: galaModelImg,
    quote: 'Golden gala glamour with handcrafted metallic footbeds designed for evening longevity.',
  },
  {
    id: 'celeb-7',
    celebrityName: 'Sienna Brooks',
    styleName: 'Festive Sparkle Flat in Champagne',
    styleHandle: 'classic-high-k-wedge-champagne',
    styleCategory: 'Flats & Loafers',
    imageUrl: festiveBrunchModelImg,
    quote: 'Celebration brunch styling with lightweight metallic braided straps and luxury comfort foam.',
  },
  {
    id: 'celeb-8',
    celebrityName: 'Amelia Dupont',
    styleName: 'Resort Low Wedge in Slate',
    styleHandle: 'classic-high-k-wedge-black',
    styleCategory: 'Resort Wedges',
    imageUrl: resortHolidayModelImg,
    quote: 'Coastal terrace gatherings elevated with timeless slate leather and ergonomic arch support.',
  },
];
