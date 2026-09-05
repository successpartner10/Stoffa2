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
  heroBanner: 'https://stoffastyle.com/cdn/shop/files/stoffabanner-newarrivals.png',
  campaignHighWedges: 'https://stoffastyle.com/cdn/shop/files/1_3.png',
  campaignFlats: 'https://stoffastyle.com/cdn/shop/files/2_3.png',
  campaignBridalPotlis: 'https://stoffastyle.com/cdn/shop/files/3_1.png',
  campaignBlockHeels: 'https://stoffastyle.com/cdn/shop/files/4_5b7d8862-8463-4df1-8504-19269c7aa0df.png',
  craftsmanshipEditorial1: 'https://stoffastyle.com/cdn/shop/files/IMG_1354.jpg',
  craftsmanshipEditorial2: 'https://stoffastyle.com/cdn/shop/files/IMG_2034.jpg',
  craftsmanshipEditorial3: 'https://stoffastyle.com/cdn/shop/files/IMG_6070.jpg',
  craftsmanshipEditorial4: 'https://stoffastyle.com/cdn/shop/files/IMG_6224.jpg',
};

export const STOFFA_CELEBRITIES: CelebritySpotting[] = [
  {
    id: 'celeb-alia',
    celebrityName: 'Alia Bhatt',
    styleName: 'Classic High K Wedge in Champagne',
    styleHandle: 'classic-high-k-wedge-champagne',
    styleCategory: 'High Wedges',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/Alia_Bhatt-_STO_115E_Champagne__jpg.jpg',
    quote: 'Spotted in Stoffa Style STO 115E Champagne Kolhapuri Wedges for festive appearances.',
  },
  {
    id: 'celeb-kareena',
    celebrityName: 'Kareena Kapoor Khan',
    styleName: 'Classic High K Wedge in Pewter',
    styleHandle: 'copy-of-classic-high-k-wedge-pewter',
    styleCategory: 'High Wedges',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/Karina_Kapoor-_STO_115_Pewter_jpg.jpg',
    quote: 'Styled in Stoffa Style STO 115 Pewter for timeless regal elegance.',
  },
  {
    id: 'celeb-madhuri',
    celebrityName: 'Madhuri Dixit',
    styleName: 'Classic High K Wedge in Champagne',
    styleHandle: 'classic-high-k-wedge-champagne',
    styleCategory: 'High Wedges',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/Madhuri_Dixit-_STO_115_Champagne__jpg_8c2611ad-d6b7-4f1a-957d-6f331246f76f.jpg',
    quote: 'Seen elevating festive saree ensembles with Stoffa Style signature champagne wedges.',
  },
  {
    id: 'celeb-rashmika',
    celebrityName: 'Rashmika Mandanna',
    styleName: 'Classic High K Wedge in Rose Antique',
    styleHandle: 'classic-high-k-rose-antique',
    styleCategory: 'High Wedges',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/RASHMIKA-_STO_563_ROSE_ANTIQUE.png',
    quote: 'Paired with festive ethnic silhouettes in Stoffa Style STO 563 Rose Antique.',
  },
  {
    id: 'celeb-shreya',
    celebrityName: 'Shreya Ghoshal',
    styleName: 'Handcrafted Kolhapuri Block Heel in Silver',
    styleHandle: 'classic-k-block-heel-silver',
    styleCategory: 'Block Heels',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/SHREYA_GHOSHAL-_STB_191C_SILVER.jpg',
    quote: 'Concert and red-carpet comfort in Stoffa Style STB 191C Silver handcrafted heels.',
  },
  {
    id: 'celeb-sonali',
    celebrityName: 'Sonali Bendre',
    styleName: 'Classic High K Wedge in Champagne',
    styleHandle: 'classic-high-k-wedge-champagne',
    styleCategory: 'High Wedges',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/SONALI_BENDRE_STO_115C_CHAMPAGNE_1.jpg',
    quote: 'Effortless daytime soiree look styled with Stoffa Style STO 115C Champagne.',
  },
  {
    id: 'celeb-karishma',
    celebrityName: 'Karishma Tanna',
    styleName: 'Classic High K Wedge in Gold',
    styleHandle: 'copy-of-classic-high-k-wedge-gold',
    styleCategory: 'High Wedges',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/KARISHMA_TANNA_STO_115C_GOLD_1.jpg',
    quote: 'Glamorous wedding sangeet styling in Stoffa Style STO 115C Gold.',
  },
  {
    id: 'celeb-genelia',
    celebrityName: "Genelia D'Souza",
    styleName: 'Classic High K Wedge in Silver',
    styleHandle: 'classic-k-block-heel-silver',
    styleCategory: 'Block Heels',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/Genelia-STO_115C_Silver_jpg.jpg',
    quote: 'Celebrated for pairing handcrafted Indian footwear with modern chic ensembles.',
  },
  {
    id: 'celeb-bhavana',
    celebrityName: 'Bhavana Pandey',
    styleName: 'Classic High K Wedge in Black',
    styleHandle: 'copy-of-classic-high-k-wedge-black',
    styleCategory: 'High Wedges',
    imageUrl: 'https://stoffastyle.com/cdn/shop/files/BHAVANA_PANDEY-_STO_115_BLACK.jpg',
    quote: 'Sophisticated evening glamour in Stoffa Style STO 115 Black.',
  },
];
