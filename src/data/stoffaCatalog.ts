import { Product } from '../types';
import { AI_MEDIA_ASSETS, getProductAngles } from './productMedia';

export const STOFFA_BRAND_STORY =
  'Stöffa Style (stoffastyle.com) — Artisanal luxury handcrafted footwear, signature Kolhapuri wedges, and festive heels. Every silhouette is crafted with memory-cushioned footbeds, non-skid rubber soles, premium vegan leathers, and intricate crystal and metallic embellishments for weddings, festive celebrations, and effortless everyday poise.';

export const STOFFA_RAW_PRODUCTS: Omit<Product, 'angles'>[] = [
  // 1. Skin Crossfront High Wedge Gold
  {
    id: 'skin-crossfront-3-5-inch-wedge-gold',
    title: 'Skin Crossfront High Wedge Gold',
    subtitle: '3.5-inch high faux skin wedge with natural jute dori and cushioned footbed',
    category: 'Heels',
    occasions: ['wedding', 'prom', 'garden_party', 'cocktail', 'date_night'],
    occasionNote: 'Festive celebrations, wedding receptions, and elegant daytime soirees',
    priceUSD: 50,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/sto657G_9.jpg?v=1788565811',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/sto657G_8.jpg?v=1788565810',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/sto657G_7.jpg?v=1788565810',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/sto657G_6.jpg?v=1788565811',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/sto657LG_9.jpg?v=1788565810',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Light Gold', hex: '#E6CA65' },
    ],
    inventory: { '36': 5, '37': 8, '38': 10, '39': 6, '40': 4, '41': 2 },
    description:
      'Wear these super comfortable faux skin high wedges with any attire. Characterised by a natural braided jute dori, this pair is available in two radiant shades of Gold with ergonomic arch cushioning and slip-resistant rubber tread.',
    materials: 'Faux skin vegan leather with natural braided jute dori, cushioned footbed, rubber non-skid sole.',
    rating: 4.96,
    reviewCount: 48,
    isBestSeller: true,
    isNewArrival: true,
  },

  // 2. Classic High K Wedge Ink
  {
    id: 'classic-high-k-wedge-ink',
    title: 'Classic High K Wedge Ink',
    subtitle: 'Signature 3.5-inch handcrafted Kolhapuri wedge in subtle matte vegan leather',
    category: 'Heels',
    occasions: ['boardroom', 'brunch', 'wedding', 'cocktail', 'vacation'],
    occasionNote: 'Traditional ceremonies, corporate celebrations, and festive parties',
    priceUSD: 48,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_123_A_9c7c8a6e-31dd-4a11-bfed-c5ec6d093f50.jpg?v=1788565822',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_123_B_fb4fa11d-3db2-41ec-a710-084f9420c624.jpg?v=1788565822',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_123_L_7f6f8313-a35c-47c3-9818-c956f455ab68.jpg?v=1788565822',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_123_P_4faf2ed8-5cb5-414d-aa83-c27640561974.jpg?v=1788565822',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_123_T_d437fe59-6745-4fe3-8c90-e3fd0824711e.jpg?v=1788565822',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Ink', hex: '#1B263B' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Taupe', hex: '#8B8579' },
      { name: 'Navy', hex: '#1D2D44' },
      { name: 'Slate', hex: '#5C677D' },
      { name: 'Rose Antique', hex: '#B76E79' },
      { name: 'Chocolate', hex: '#3D2B1F' },
      { name: 'Maroon', hex: '#5B1425' },
      { name: 'Dark Grey', hex: '#4A4E57' },
    ],
    inventory: { '36': 6, '37': 9, '38': 12, '39': 8, '40': 5, '41': 3 },
    description:
      'Our signature handcrafted 3.5 inch high Kolhapuri-inspired wedge. In a range of subtle and elegant matte shades, it is a perfect match for any attire. Comfortable and lightweight, this pair comes with a durable rubber non-skid sole.',
    materials: 'Premium matte vegan leather, memory cushion insole, anti-skid rubber sole. Made by Stöffa Style.',
    rating: 4.98,
    reviewCount: 86,
    isBestSeller: true,
  },

  // 3. Classic K Flats Taupe
  {
    id: 'classic-k-flats-taupe',
    title: 'Classic K Flats Taupe',
    subtitle: 'Signature Kolhapuri-inspired flat in understated matte tones with non-skid sole',
    category: 'Flats & Loafers',
    occasions: ['brunch', 'vacation', 'beach', 'date_night', 'graduation'],
    occasionNote: 'Daily elegance, festive gatherings, and comfortable destination strolls',
    priceUSD: 46,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_D_115_A.jpg?v=1788565824',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_D_115_L.jpg?v=1788565824',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_D_115_P.jpg?v=1788565824',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_D_115_B.jpg?v=1788565824',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_D_117_A_626fad8b-d545-4436-84a6-9098df017792.jpg?v=1788565824',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Taupe', hex: '#8B8579' },
      { name: 'Navy', hex: '#1D2D44' },
      { name: 'Blush', hex: '#E8C5C8' },
      { name: 'Chocolate', hex: '#3D2B1F' },
      { name: 'Ink', hex: '#1B263B' },
      { name: 'Dark Grey', hex: '#4A4E57' },
    ],
    inventory: { '36': 7, '37': 11, '38': 14, '39': 9, '40': 4, '41': 2 },
    description:
      'Our signature Kolhapuri-inspired flats in a range of subtle and elegant matte shades, perfect for any attire. Comfortable and lightweight, this pair comes with a soft padded base and flexible non-skid sole.',
    materials: 'Handcrafted vegan leather, soft padded base, flexible non-skid sole. Made by Stöffa Style.',
    rating: 4.97,
    reviewCount: 72,
    isBestSeller: true,
  },

  // 4. Classic K Flats Camel
  {
    id: 'classic-k-flats-camel',
    title: 'Classic K Flats Camel',
    subtitle: 'Neutral Kolhapuri 1-inch flat in rich camel tone with timeless artisan finish',
    category: 'Flats & Loafers',
    occasions: ['brunch', 'vacation', 'wedding', 'date_night'],
    occasionNote: 'Day-to-evening dressing, ethnic occasions, and resort wear',
    priceUSD: 46,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO115DCAMEL_3_4849c82b-c58d-4a99-a96c-08341b35855e.jpg?v=1788565826',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO115DCAMEL_4_9c2b6743-661e-4cb3-83df-3ccd03583ddd.jpg?v=1788565826',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO115DCAMEL_5_94d3d500-326b-4cce-aa72-8c7a82e285c7.jpg?v=1788565826',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO115DCAMEL_6_6fd44415-a16b-4957-a61a-843664cdb0d1.jpg?v=1788565826',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Antique Gold', hex: '#B3924B' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    inventory: { '36': 5, '37': 8, '38': 10, '39': 6, '40': 3, '41': 1 },
    description:
      'Our signature handcrafted K flats in 1 inch Kolhapuri-inspired styling. A neutral shade expressed in a traditional format creates a classic and versatile pair suitable for any occasion.',
    materials: 'Artisanal vegan material, reinforced toe-loop, flexible non-skid sole. Made by Stöffa Style.',
    rating: 4.95,
    reviewCount: 64,
  },

  // 5. Tassel K Flats Taupe
  {
    id: 'tassel-k-flats-taupe',
    title: 'Tassel K Flats Taupe',
    subtitle: 'Braided multi-tassel Kolhapuri flats with cushioned padded footbed',
    category: 'Flats & Loafers',
    occasions: ['wedding', 'garden_party', 'brunch', 'date_night'],
    occasionNote: 'Sangeet nights, festive luncheons, and celebratory garden parties',
    priceUSD: 47,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO645TAUPE_1_0d47a2b0-1b9f-4095-812d-3eb1400f5172.jpg?v=1788565834',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO645TAUPE_4_3332df7c-51a0-446e-a1de-a1440857f10b.jpg?v=1788565833',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO645TAUPE_3_ea1938c7-fbe7-4d35-abe9-19c9c1f4b8df.jpg?v=1788565834',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO645SILVER_9_f6fcde13-5fe5-4fb8-9adb-262896485af1.jpg?v=1788565834',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO645CHAMPAGNE_5_997d7fd5-933e-42d8-a593-3f032ddddcb2.jpg?v=1788565833',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Taupe', hex: '#8B8579' },
      { name: 'Champagne', hex: '#E6D8AD' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    inventory: { '36': 8, '37': 12, '38': 15, '39': 9, '40': 5, '41': 2 },
    description:
      "What's not to love about these braided multi tassel K flats? Intricate craftsmanship and a soft padded base make these flats comfortable all day and night long! You're spoilt for choice with 3 options in Champagne, Silver and Taupe!",
    materials: 'Hand-braided vegan leather with multi-tassel accents, memory padded base. Made by Stöffa Style.',
    rating: 4.99,
    reviewCount: 92,
    isBestSeller: true,
  },

  // 6. Crystal Low Wedge Champagne
  {
    id: 'crystal-braid-2-25-inch-wedge-champagne',
    title: 'Crystal Low Wedge Champagne',
    subtitle: '2.25-inch formal wedge adorned with luminous crystal braided strap',
    category: 'Heels',
    occasions: ['wedding', 'prom', 'cocktail', 'bachelorette'],
    occasionNote: 'Evening galas, bridal festivities, and black-tie celebrations',
    priceUSD: 55,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB170_C_CHAMPAGNE_6_fbe5f1bb-99c4-4f55-9b0b-2649613a2f8a.jpg?v=1788565845',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB170_C_CHAMPAGNE_5_608720da-2057-447b-a99c-8ccdcfb5cd46.jpg?v=1788565845',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB170_C_CHAMPAGNE_9_4c448020-17dc-48b6-b461-d0f300de8f18.jpg?v=1788565845',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB170_C_MATTESILVER_e984c2f6-ea2b-4a96-85b6-da0cbc87f284.jpg?v=1788565845',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB170_C_MATTESILVER_1_b3f0b7b3-4574-46b2-87af-c4b84b5fa011.jpg?v=1788565845',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Champagne', hex: '#E6D8AD' },
      { name: 'Matte Silver', hex: '#C4C4C4' },
    ],
    inventory: { '36': 5, '37': 7, '38': 9, '39': 5, '40': 3, '41': 1 },
    description:
      'Pair our stylish crystal braided 2.25" wedges with any formal and festive attire! The crystal embellishment blends beautifully with classic champagne or with matte silver to give you 2 elegant options.',
    materials: 'Crystal embellished strap, metallic vegan leather, comfort arch wedge, non-skid rubber sole.',
    rating: 4.97,
    reviewCount: 61,
    isNewArrival: true,
  },

  // 7. Classic Low K Wedge Maroon
  {
    id: 'matte-ethnic-2-25-inch-low-wedge-maroon',
    title: 'Classic Low K Wedge Maroon',
    subtitle: 'Handcrafted 2.25-inch low wedge with traditional Kolhapuri strap and non-skid sole',
    category: 'Heels',
    occasions: ['wedding', 'boardroom', 'garden_party', 'cocktail', 'date_night'],
    occasionNote: 'Ceremony rituals, festive family gatherings, and formal dinners',
    priceUSD: 48,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_C_107_A_2d3f30b0-b488-4951-912e-4086050da9fb.jpg?v=1788565855',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_C_107_B_bef4e175-c03e-44b1-a33c-abb97b21884d.jpg?v=1788565855',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_C_107_L_b1f244bd-6d51-4e3e-a025-1a5dffe52676.jpg?v=1788565855',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_C_123_A_a65d28be-8bc6-4938-af0a-e51de822407e.jpg?v=1788565855',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_C_101_A_3f8078b6-519c-45cd-b0f1-e6064993c2f0.jpg?v=1788565855',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Maroon', hex: '#5B1425' },
      { name: 'Ink', hex: '#1B263B' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Chocolate', hex: '#3D2B1F' },
      { name: 'Rose Antique', hex: '#B76E79' },
      { name: 'Slate', hex: '#5C677D' },
      { name: 'Navy', hex: '#1D2D44' },
      { name: 'Taupe', hex: '#8B8579' },
      { name: 'Dark Grey', hex: '#4A4E57' },
    ],
    inventory: { '36': 6, '37': 10, '38': 12, '39': 7, '40': 4, '41': 2 },
    description:
      'Our signature handcrafted 2 and a quarter inch Kolhapuri-inspired low wedge. In a range of subtle and elegant matte shades, it is a perfect match for any attire. Comfortable and lightweight, this pair comes with a rubber non-skid sole.',
    materials: 'Matte finish vegan leather, ergonomic 2.25-inch wedge, non-skid rubber base. Made by Stöffa Style.',
    rating: 4.94,
    reviewCount: 78,
  },

  // 8. Classic Low K Wedge Metallic Collection
  {
    id: 'classic-ethnic-2-25-inch-low-wedge-antique-gold',
    title: 'Classic Low K Wedge Metallic Collection',
    subtitle: '2.25-inch Kolhapuri low wedge shimmering in antique gold, rose gold, and champagne',
    category: 'Heels',
    occasions: ['wedding', 'prom', 'garden_party', 'cocktail'],
    occasionNote: 'Grand weddings, festive poojas, and celebratory receptions',
    priceUSD: 48,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_C_109_A_2f57fd31-cf3e-45af-820d-b81be4c65652.jpg?v=1788565876',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_C_114_A_a78ff93a-ea39-49cd-bd96-348fe87a6846.jpg?v=1788565876',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_C_115_A_e8721d1c-ba7c-400c-ab00-cf2a43d216a4.jpg?v=1788565876',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_C_102_A_1674b8bc-3628-446d-863a-5df330157f2c.jpg?v=1788565876',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_C_113_B_3a002a53-2ab8-4559-beb7-800b7a694225.jpg?v=1788565876',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Antique Gold', hex: '#B3924B' },
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Champagne', hex: '#E6D8AD' },
      { name: 'Pewter', hex: '#8B8C89' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    inventory: { '36': 8, '37': 12, '38': 16, '39': 9, '40': 5, '41': 2 },
    description:
      'Our signature handcrafted 2 and a quarter inch Kolhapuri-inspired low wedge. Metallic shades intermingle to create a classic and versatile pair suitable for any occasion. Comfortable and lightweight, this pair comes with a rubber non-skid sole.',
    materials: 'Metallic foiled vegan leather, cushioned insole, anti-skid rubber sole. Made by Stöffa Style.',
    rating: 4.98,
    reviewCount: 95,
    isBestSeller: true,
  },

  // 9. Multi Border Low Wedge Antique Gold
  {
    id: 'multi-border-low-wedge',
    title: 'Multi Border Low Wedge Antique Gold',
    subtitle: 'Delicately embroidered antique border detailing on a comfortable 2.25-inch wedge',
    category: 'Heels',
    occasions: ['wedding', 'garden_party', 'cocktail', 'prom'],
    occasionNote: 'Mehendi functions, wedding festivities, and cultural galas',
    priceUSD: 52,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB168CANTIQUE_1.jpg?v=1788565912',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB168CANTIQUE_5.jpg?v=1788565912',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB168CANTIQUE_4.jpg?v=1788565912',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB168CANTIQUE_2.jpg?v=1788565912',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [{ name: 'Antique Gold', hex: '#B3924B' }],
    inventory: { '36': 4, '37': 7, '38': 9, '39': 5, '40': 3, '41': 1 },
    description:
      'Wear this beautifully designed K wedge with all your festive wear! The 2.25" heel is delicately adorned with rows of embroidered borders in rich antique zari.',
    materials: 'Multi-border zari and antique thread embroidery, vegan leather footbed, rubber sole. Handcrafted by Stöffa Style.',
    rating: 4.96,
    reviewCount: 53,
    isNewArrival: true,
  },

  // 10. Crystal Higher K Wedge Champagne & Silver
  {
    id: 'crystal-higher-k-wedge-silver',
    title: 'Crystal Higher K Wedge Champagne & Silver',
    subtitle: 'Dramatic 4.5-inch high Kolhapuri wedge with radiant crystal pavé strap',
    category: 'Heels',
    occasions: ['prom', 'wedding', 'runway', 'bachelorette', 'cocktail'],
    occasionNote: 'High-glamour bridal wear, red-carpet entrances, and formal galas',
    priceUSD: 61,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_A_112_A_f60cac26-3fc5-4da9-8f0a-16fbb36386f0.jpg?v=1788565915',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_A_112_B_350689d4-4049-41ac-911b-17988ed15a2a.jpg?v=1788565915',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_A_112_L_5f813829-9415-4f93-8037-163cc5e87645.jpg?v=1788565915',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_A_110_A_a96ea1c1-27e8-4619-b7af-7614d17fe5f9.jpg?v=1788565915',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_A_110_T_3dd9ef33-8219-4efc-88a5-c414982f1a93.jpg?v=1788565915',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Champagne', hex: '#E6D8AD' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    inventory: { '36': 5, '37': 9, '38': 11, '39': 6, '40': 4, '41': 2 },
    description:
      'Our signature 4.5\'\' high Kolhapuri-inspired wedge, rendered beautifully in striking crystal. Choose between champagne or silver to get an elegant and timeless pair of formal wedges that will perfectly complement your festive attire.',
    materials: 'High-grade faceted crystal embroidery, metallic vegan leather, structured 4.5" wedge with platform balance.',
    rating: 4.97,
    reviewCount: 73,
    isBestSeller: true,
  },

  // 11. Crystal High K Wedge Champagne & Silver
  {
    id: 'embellished-3-5-inch-high-wedge-champagne',
    title: 'Crystal High K Wedge Champagne & Silver',
    subtitle: 'Refined 3.5-inch crystal Kolhapuri wedge balancing festive brilliance with wearable comfort',
    category: 'Heels',
    occasions: ['wedding', 'prom', 'cocktail', 'date_night'],
    occasionNote: 'Reception parties, festive dinners, and milestone celebrations',
    priceUSD: 54,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_112_A_b0e61679-f0e9-42cf-800a-c9380cc7b3aa.jpg?v=1788565961',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_112_B_4803598e-5a03-4e45-b70c-637d7cb16f58.jpg?v=1788565960',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_112_L_65128d9b-2ef5-4701-bf19-63b363d2d291.jpg?v=1788565960',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STB_141_110_A_c0de358f-7aed-4d6f-829e-c39a7af24aae.jpg?v=1788565960',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Champagne', hex: '#E6D8AD' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    inventory: { '36': 6, '37': 8, '38': 10, '39': 7, '40': 3, '41': 2 },
    description:
      'Our signature 3.5\'\' high Kolhapuri-inspired wedge, rendered beautifully in striking crystal. Choose between champagne or silver to get an elegant and timeless pair of formal wedges that will perfectly complement your festive attire.',
    materials: 'Crystal embellished strap, metallic vegan leather, 3.5" balanced wedge, non-skid sole. Made by Stöffa Style.',
    rating: 4.95,
    reviewCount: 68,
  },

  // 12. Classic K Block Heel Camel & Black
  {
    id: 'classic-k-block-heel-black',
    title: 'Classic K Block Heel Camel & Black',
    subtitle: 'Handcrafted 2.25-inch Kolhapuri block heel with architectural stability',
    category: 'Heels',
    occasions: ['boardroom', 'wedding', 'brunch', 'garden_party'],
    occasionNote: 'Outdoor lawn weddings, corporate celebrations, and festive brunches',
    priceUSD: 55,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_E_102_A_0c22a07a-6eaa-4552-9f36-c6d20543e1fd.jpg?v=1788565964',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_E_102_L_7231e48c-9d6b-488f-b5e8-5aceec50d767.jpg?v=1788565965',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_E_101_A_e4a23634-d81e-4c90-8f90-b7f6cad76535.jpg?v=1788565963',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_E_114_A_ad7d8264-35a5-4888-850a-50ba6a08e5c5.jpg?v=1788565962',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Champagne', hex: '#E6D8AD' },
    ],
    inventory: { '36': 5, '37': 8, '38': 10, '39': 6, '40': 4, '41': 1 },
    description:
      'Our signature handcrafted 2.25 inch Kolhapuri-inspired block heel. A neutral shade expressed in a traditional format creates a classic and versatile pair suitable for any occasion. Comfortable and lightweight, this pair comes with a non-skid sole.',
    materials: 'Matte & metallic vegan leather, solid 2.25" block heel, non-slip rubber base. Made by Stöffa Style.',
    rating: 4.96,
    reviewCount: 57,
    isNewArrival: true,
  },

  // 13. Classic K Block Heel Matte Colors
  {
    id: 'classic-k-block-heel-rose-maroon',
    title: 'Classic K Block Heel Matte Colors',
    subtitle: 'Subtle matte tone Kolhapuri block heels in maroon, slate, taupe, and rose antique',
    category: 'Heels',
    occasions: ['boardroom', 'cocktail', 'wedding', 'date_night'],
    occasionNote: 'Evening gatherings, festive celebrations, and smart casual elegance',
    priceUSD: 55,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_E_107_A_33c3a60f-c048-45d9-ad88-8044fa0a5b1b.jpg?v=1788565967',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_E_107_B_8c8af3dc-54cb-42de-82f1-43b76f0831d6.jpg?v=1788565967',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_E_118_A_9c36a160-b703-4115-9e62-9ca341b768b1.jpg?v=1788565969',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_E_115_A_7c6a7c21-a67f-49b1-b0bb-8ed9c381978b.jpg?v=1788565969',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Maroon', hex: '#5B1425' },
      { name: 'Rose Antique', hex: '#B76E79' },
      { name: 'Slate', hex: '#5C677D' },
      { name: 'Taupe', hex: '#8B8579' },
      { name: 'Ink', hex: '#1B263B' },
    ],
    inventory: { '36': 4, '37': 7, '38': 8, '39': 5, '40': 3, '41': 1 },
    description:
      'Our signature handcrafted 2.25 inch Kolhapuri-inspired block heel. In a range of subtle and elegant matte shades, it is a perfect match for any attire. Comfortable and lightweight, this pair comes with a non-skid sole.',
    materials: 'Matte finish vegan leather, 2.25" block heel, padded footbed. Made by Stöffa Style.',
    rating: 4.93,
    reviewCount: 42,
  },

  // 14. PVC High Wedge Cork
  {
    id: 'pvc-high-wedge',
    title: 'PVC High Wedge Cork',
    subtitle: 'Contemporary clear PVC upper on lightweight, sculpted cork wedge',
    category: 'Heels',
    occasions: ['beach', 'vacation', 'brunch', 'cocktail'],
    occasionNote: 'Resort holidays, yacht cruises, summer weddings, and pool parties',
    priceUSD: 50,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO626PVCCORK.jpg?v=1788565974',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO626PVCCORK_2.jpg?v=1788565974',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO626PVCCORK_3.jpg?v=1788565974',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO626PVCCORK_4.jpg?v=1788565974',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [{ name: 'Natural Cork', hex: '#D2B48C' }],
    inventory: { '36': 5, '37': 8, '38': 9, '39': 6, '40': 4, '41': 2 },
    description:
      'Contemporary and neutral, these PVC high wedges look elegant on your feet and complement any ensemble. Comfortable and lightweight, this pair comes with a rubber non-skid sole.',
    materials: 'Transparent optical PVC upper, natural lightweight cork wedge, anti-skid rubber sole. Made by Stöffa Style.',
    rating: 4.91,
    reviewCount: 39,
  },

  // 15. Classic High K Wedge Blush
  {
    id: 'classic-high-k-wedge-blush',
    title: 'Classic High K Wedge Blush',
    subtitle: '3.5-inch Kolhapuri wedge in romantic pastel blush matte finish',
    category: 'Heels',
    occasions: ['wedding', 'garden_party', 'date_night', 'prom'],
    occasionNote: 'Daytime garden receptions, bridal showers, and romantic dinners',
    priceUSD: 45,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_119_A_a9581545-5306-4a9a-b121-787f92bf9be6.jpg?v=1788565973',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_119_B_0576eaf7-e1ea-4506-8d38-edb8b603a6d8.jpg?v=1788565973',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_119_L_064b75af-01cd-4501-a301-81c93c55a896.jpg?v=1788565973',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_563_119_P_6fb080b9-066f-4ac1-b5c0-843c4728c58a.jpg?v=1788565973',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Blush', hex: '#E8C5C8' },
      { name: 'Taupe', hex: '#8B8579' },
      { name: 'Navy', hex: '#1D2D44' },
      { name: 'Slate', hex: '#5C677D' },
      { name: 'Rose Antique', hex: '#B76E79' },
      { name: 'Olive', hex: '#555B42' },
      { name: 'Chocolate', hex: '#3D2B1F' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Ink', hex: '#1B263B' },
    ],
    inventory: { '36': 6, '37': 9, '38': 11, '39': 7, '40': 3, '41': 2 },
    description:
      'Our signature handcrafted 3.5 inch high Kolhapuri-inspired wedge. In a range of subtle and elegant matte shades, it is a perfect match for any attire. Comfortable and lightweight, this pair comes with a rubber non-skid sole.',
    materials: 'Matte vegan leather, cushioned insole, anti-skid rubber sole. Made by Stöffa Style.',
    rating: 4.92,
    reviewCount: 47,
  },

  // 16. Classic High K Wedge Metallic Champagne
  {
    id: 'classic-high-k-wedge-champagne',
    title: 'Classic High K Wedge Metallic Champagne',
    subtitle: '3.5-inch high Kolhapuri wedge in glowing festive champagne and metallic shades',
    category: 'Heels',
    occasions: ['wedding', 'prom', 'garden_party', 'cocktail'],
    occasionNote: 'Grand Indian celebrations, weddings, and formal sangeet evenings',
    priceUSD: 51,
    images: [
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_111_A_6d1e2743-656d-41c8-9e50-bda91f83a522.jpg?v=1788565982',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_111_B_9e1ccf8f-af12-4bd0-8a53-692dd8edcf82.jpg?v=1788565982',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_111_L_efb93a2e-940a-4273-bc12-0692abc6de83.jpg?v=1788565982',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_111_P_cab0651e-25f2-4896-a176-12835dc08266.jpg?v=1788565982',
      'https://cdn.shopify.com/s/files/1/0730/6697/1178/files/STO_115_111_T_b7a85068-8344-48dd-a954-226c3c35103f.jpg?v=1788565982',
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Champagne', hex: '#E6D8AD' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Pewter', hex: '#8B8C89' },
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Taupe', hex: '#8B8579' },
      { name: 'Antique Gold', hex: '#B3924B' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    inventory: { '36': 8, '37': 14, '38': 18, '39': 10, '40': 6, '41': 3 },
    description:
      'Our signature handcrafted 3.5 inch high Kolhapuri-inspired wedge. Metallic shades intermingle to create a classic and versatile pair suitable for any occasion. Comfortable and lightweight, this pair comes with a rubber non-skid sole.',
    materials: 'Foil metallic vegan leather, memory foam cushioned footbed, 3.5" non-skid wedge. Made by Stöffa Style.',
    rating: 4.98,
    reviewCount: 96,
    isBestSeller: true,
  },
];

export const STOFFA_STORE_PRODUCTS: Product[] = STOFFA_RAW_PRODUCTS.map((p) => {
  const angles = getProductAngles(p.id, p.category, p.images);
  return {
    ...p,
    brand: 'Stöffa',
    angles,
    images: angles.map((a) => a.url),
  };
});

export const STOFFA_CATALOG_CSV: string = (() => {
  const headers = [
    'id',
    'title',
    'subtitle',
    'category',
    'priceUSD',
    'rating',
    'reviewCount',
    'materials',
    'sizes',
    'colors',
    'images',
    'description',
  ];
  const rows = STOFFA_STORE_PRODUCTS.map((p) => [
    `"${p.id}"`,
    `"${p.title.replace(/"/g, '""')}"`,
    `"${p.subtitle.replace(/"/g, '""')}"`,
    `"${p.category}"`,
    p.priceUSD,
    p.rating,
    p.reviewCount,
    `"${p.materials.replace(/"/g, '""')}"`,
    `"${p.sizes.join(';')}"`,
    `"${p.colors.map((c) => c.name).join(';')}"`,
    `"${p.images.join(';')}"`,
    `"${p.description.replace(/"/g, '""')}"`,
  ]);
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
})();
