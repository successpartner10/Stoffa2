import bridalModelImg from '../assets/images/bridal_elegance_model_1788635754691.jpg';
import galaModelImg from '../assets/images/gala_evening_model_1788635714917.jpg';
import festiveBrunchModelImg from '../assets/images/festive_brunch_model_1788635728185.jpg';
import resortHolidayModelImg from '../assets/images/resort_holiday_model_1788635741638.jpg';
import editorialCocktailModelImg from '../assets/images/editorial_cocktail_model_1788636217428.jpg';
import eveningGlamModelImg from '../assets/images/evening_glam_model_1788636233051.jpg';
import resortChicModelImg from '../assets/images/resort_chic_model_1788636246938.jpg';
import nightOutModelImg from '../assets/images/night_out_model_1788636263097.jpg';

export interface CuratedCollectionItem {
  id: string;
  title: string;
  tagline: string;
  theme: 'Wedding & Ceremonies' | 'Galas & Celebrations' | 'Resort & Evenings';
  shoeNote: string;
  image: string;
}

export const CURATED_COLLECTIONS_DATA: CuratedCollectionItem[] = [
  // Theme 1: Wedding & Ceremonies
  {
    id: 'bride-on-her-feet',
    title: 'Bride on Her Feet',
    tagline: 'Made for the long day, the dance floor and everything after — from the aisle to the after party.',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Higher Wedges (3.5" - 4.25") & Bridal Crystals',
    image: bridalModelImg,
  },
  {
    id: 'mother-of-the-bride',
    title: 'Mother of the Bride',
    tagline: 'All the glam, with comfort for the long hours',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Low Wedges (2.5") & Block Heels',
    image: 'https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_115_109.jpg?v=1664156860',
  },
  {
    id: 'the-bridesmaid-edit',
    title: 'The Bridesmaid Edit',
    tagline: 'Made to complement the bride, without holding you back from the dance floor.',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Festive Flats, Block Heels & Potlis',
    image: 'https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_115_114_A_e0863e4d-eb76-4350-86e0-b38b7fe09a7f.jpg?v=1663996191',
  },
  {
    id: 'the-destination-bride',
    title: 'The Destination Bride',
    tagline: 'Glamour that travels — from the ceremony to cocktails by the sea.',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Lawn & Sand-Friendly Wedges',
    image: 'https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_115_111_A_9ce48324-b51c-4e2c-9a00-7ff1710108fe.jpg?v=1663910366',
  },
  {
    id: 'the-sangeet-ceremony',
    title: 'The Sangeet Ceremony',
    tagline: 'Color and dance a match made in heaven.',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Dance-Ready Low Wedges & Metallic Flats',
    image: 'https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STB_164_111_A.jpg?v=1660355771',
  },
  {
    id: 'something-blue',
    title: 'Something Blue',
    tagline: 'A little blue, a lot of personality — your something blue, with a twist',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Navy Flats, Ink Wedges & Silver Crystals',
    image: 'https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_563_118_A_c21107a3-5d93-4818-a4c2-7f685c5db78b.jpg?v=1663997809',
  },

  // Theme 2: Galas & Celebrations
  {
    id: 'red-carpet-ready',
    title: 'Red Carpet Ready',
    tagline: 'Make the entrance. Own the moment. Stay out late.',
    theme: 'Galas & Celebrations',
    shoeNote: 'Sculptural High Wedges & Celebrity Crystals',
    image: galaModelImg,
  },
  {
    id: 'prom-night',
    title: 'Prom Night',
    tagline: 'The shoes that make the entrance — and keep you dancing all night',
    theme: 'Galas & Celebrations',
    shoeNote: 'High Wedges & Baguette Crystals',
    image: eveningGlamModelImg,
  },
  {
    id: 'quinceanera-glam',
    title: 'Quinceañera Glam',
    tagline: 'For her big moment, with the glamour to match every dance.',
    theme: 'Galas & Celebrations',
    shoeNote: 'Princess Crystals, Rose Gold & High Wedges',
    image: 'https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_563_120_A_10f50ca9-1c81-408e-bcc4-2d4d4c49dcbb.jpg?v=1663999704',
  },
  {
    id: 'garden-party',
    title: 'Garden Party',
    tagline: 'Glam on the lawns , Height without the stumble.',
    theme: 'Galas & Celebrations',
    shoeNote: 'Lawn-Stable Block Heels & Low Wedges',
    image: 'https://cdn.shopify.com/s/files/1/0438/2221/9423/files/STO563TAN_3.jpg?v=1690399976',
  },
  {
    id: 'christmas-brunch',
    title: 'Christmas Brunch',
    tagline: 'Sparkle in comfort indoors,  as hostess or guest.',
    theme: 'Galas & Celebrations',
    shoeNote: 'Indoor Sparkle Flats & Festive Bags',
    image: festiveBrunchModelImg,
  },

  // Theme 3: Resort & Evenings
  {
    id: 'cruise-ready',
    title: 'Cruise Ready',
    tagline: 'From daytime exploring to sunset cocktails — one wardrobe, every occasion',
    theme: 'Resort & Evenings',
    shoeNote: 'Artisanal Flats & 2.5" Low Wedges',
    image: resortHolidayModelImg,
  },
  {
    id: 'the-holiday-edit',
    title: 'The Holiday Edit',
    tagline: 'Lightweight in your baggage and versatile glam on your feet',
    theme: 'Resort & Evenings',
    shoeNote: 'Packable Flats & Versatile Metallics',
    image: resortChicModelImg,
  },
  {
    id: 'girls-night-out',
    title: "Girls' Night Out",
    tagline: 'Made for the plans that start with “just one drink” and end much later',
    theme: 'Resort & Evenings',
    shoeNote: 'Dance-Floor Flats, Block Heels & Clutches',
    image: nightOutModelImg,
  },
  {
    id: 'date-night',
    title: 'Date Night',
    tagline: 'A little extra glamour, wherever the night takes you.',
    theme: 'Resort & Evenings',
    shoeNote: 'Sleek 2.5" Wedges & Strappy Block Heels',
    image: editorialCocktailModelImg,
  },
];
