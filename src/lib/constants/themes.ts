export type WeddingThemeId =
  | 'champagne_gold'
  | 'emerald_garden'
  | 'romantic_rose'
  | 'javanese_heritage'
  | 'midnight_celestial';

export type OpeningTransitionType =
  | 'satin_curtain'
  | 'garden_gate'
  | 'floral_parting'
  | 'keraton_gate'
  | 'celestial_portal';

export interface WeddingThemeConfig {
  id: WeddingThemeId;
  name: string;
  subtitle: string;
  badge: string;
  swatch: [string, string, string]; // [primary, accent, bg]
  isDark: boolean;
  openingTransition: OpeningTransitionType;
  openingLabel: string;
  revealAnimation: string;
  colors: {
    bgPage: string;
    bgSection: string;
    bgCard: string;
    textTitle: string;
    textBody: string;
    textMuted: string;
    accent: string;
    accentDark: string;
    border: string;
    borderAccent: string;
    buttonBg: string;
    buttonHover: string;
    buttonText: string;
    tagBg: string;
    tagText: string;
    dividerColor: string;
  };
  styleClass: {
    cardBorder: string;
    goldText: string;
    buttonShadow: string;
    headingAccent: string;
  };
}

export const WEDDING_THEMES: Record<WeddingThemeId, WeddingThemeConfig> = {
  champagne_gold: {
    id: 'champagne_gold',
    name: 'Champagne Royale',
    subtitle: 'Kemewahan Abadi bernuansa Warm Ivory & Shimmering Gold',
    badge: 'Klasik Elegan',
    swatch: ['#C5A46D', '#6F5A42', '#FAF7F0'],
    isDark: false,
    openingTransition: 'satin_curtain',
    openingLabel: 'Tirai Satin Emas',
    revealAnimation: 'reveal-champagne',
    colors: {
      bgPage: '#FAF7F0',
      bgSection: '#FFFFFF',
      bgCard: '#FAF7F0',
      textTitle: '#30281E',
      textBody: '#6F5A42',
      textMuted: '#948573',
      accent: '#C5A46D',
      accentDark: '#846B48',
      border: '#E8DFD0',
      borderAccent: '#C5A46D',
      buttonBg: '#C5A46D',
      buttonHover: '#A88952',
      buttonText: '#FFFFFF',
      tagBg: '#FAF7F0',
      tagText: '#6F5A42',
      dividerColor: '#C5A46D',
    },
    styleClass: {
      cardBorder: 'border-[#E8DFD0]',
      goldText: 'text-[#C5A46D]',
      buttonShadow: 'shadow-[0_10px_25px_-5px_rgba(197,164,109,0.4)]',
      headingAccent: 'tracking-wide',
    },
  },
  emerald_garden: {
    id: 'emerald_garden',
    name: 'Emerald Botanical',
    subtitle: 'Nuansa Taman Eksklusif, Daun Eucalyptus & Cahaya Matahari',
    badge: 'Garden & Outdoor',
    swatch: ['#214B3B', '#B9A477', '#FAF8F1'],
    isDark: false,
    openingTransition: 'garden_gate',
    openingLabel: 'Gerbang Taman Botani',
    revealAnimation: 'reveal-emerald',
    colors: {
      bgPage: '#F4F7F2',
      bgSection: '#FAF8F1',
      bgCard: '#DCE5DA',
      textTitle: '#214B3B',
      textBody: '#315C48',
      textMuted: '#688576',
      accent: '#214B3B',
      accentDark: '#17362A',
      border: '#C8D8C6',
      borderAccent: '#B9A477',
      buttonBg: '#214B3B',
      buttonHover: '#17362A',
      buttonText: '#FAF8F1',
      tagBg: '#DCE5DA',
      tagText: '#214B3B',
      dividerColor: '#B9A477',
    },
    styleClass: {
      cardBorder: 'border-[#C8D8C6]',
      goldText: 'text-[#B9A477]',
      buttonShadow: 'shadow-[0_10px_25px_-5px_rgba(33,75,59,0.35)]',
      headingAccent: 'tracking-normal',
    },
  },
  romantic_rose: {
    id: 'romantic_rose',
    name: 'Romantic Rose & Blush',
    subtitle: 'Kelembutan Kelopak Mawar, Blush Pink & Rose Gold',
    badge: 'Romantis Manis',
    swatch: ['#C77B8C', '#C99A91', '#FFF9F6'],
    isDark: false,
    openingTransition: 'floral_parting',
    openingLabel: 'Kelopak Mawar Bermekaran',
    revealAnimation: 'reveal-rose',
    colors: {
      bgPage: '#FFF9F6',
      bgSection: '#FFFFFF',
      bgCard: '#F9ECEF',
      textTitle: '#5A2635',
      textBody: '#7D4253',
      textMuted: '#9D596A',
      accent: '#C77B8C',
      accentDark: '#9D596A',
      border: '#F4DDE2',
      borderAccent: '#C99A91',
      buttonBg: '#C77B8C',
      buttonHover: '#9D596A',
      buttonText: '#FFFFFF',
      tagBg: '#F4DDE2',
      tagText: '#9D596A',
      dividerColor: '#C99A91',
    },
    styleClass: {
      cardBorder: 'border-[#F4DDE2]',
      goldText: 'text-[#C77B8C]',
      buttonShadow: 'shadow-[0_10px_25px_-5px_rgba(199,123,140,0.4)]',
      headingAccent: 'italic tracking-normal',
    },
  },
  javanese_heritage: {
    id: 'javanese_heritage',
    name: 'Royal Heritage Nusantara',
    subtitle: 'Keagungan Keraton Jawa, Batik Parang & Prada Emas',
    badge: 'Adat & Tradisi',
    swatch: ['#C29A42', '#6C2630', '#F7F0E3'],
    isDark: false,
    openingTransition: 'keraton_gate',
    openingLabel: 'Gerbang Agung Keraton',
    revealAnimation: 'reveal-heritage',
    colors: {
      bgPage: '#F7F0E3',
      bgSection: '#FBF7EF',
      bgCard: '#E9DCC5',
      textTitle: '#4A2418',
      textBody: '#633B26',
      textMuted: '#86512F',
      accent: '#C29A42',
      accentDark: '#6C2630',
      border: '#DFCDAE',
      borderAccent: '#C29A42',
      buttonBg: '#6C2630',
      buttonHover: '#521B23',
      buttonText: '#F7F0E3',
      tagBg: '#E9DCC5',
      tagText: '#633B26',
      dividerColor: '#C29A42',
    },
    styleClass: {
      cardBorder: 'border-[#DFCDAE]',
      goldText: 'text-[#C29A42]',
      buttonShadow: 'shadow-[0_10px_25px_-5px_rgba(108,38,48,0.4)]',
      headingAccent: 'tracking-wider',
    },
  },
  midnight_celestial: {
    id: 'midnight_celestial',
    name: 'Midnight Celestial Glam',
    subtitle: 'Kemegahan Langit Malam Sapphire, Konstelasi & Bintang Emas',
    badge: 'Modern Glamour',
    swatch: ['#D4AF37', '#1C3260', '#10182D'],
    isDark: true,
    openingTransition: 'celestial_portal',
    openingLabel: 'Portal Cahaya Bintang',
    revealAnimation: 'reveal-celestial',
    colors: {
      bgPage: '#10182D',
      bgSection: '#152347',
      bgCard: '#1C3260',
      textTitle: '#F4F2EE',
      textBody: '#E6D6AD',
      textMuted: '#94A3B8',
      accent: '#D4AF37',
      accentDark: '#E6D6AD',
      border: '#243F73',
      borderAccent: '#D4AF37',
      buttonBg: '#D4AF37',
      buttonHover: '#B89628',
      buttonText: '#10182D',
      tagBg: '#1C3260',
      tagText: '#D4AF37',
      dividerColor: '#D4AF37',
    },
    styleClass: {
      cardBorder: 'border-[#243F73]',
      goldText: 'text-[#D4AF37]',
      buttonShadow: 'shadow-[0_10px_25px_-5px_rgba(212,175,55,0.45)]',
      headingAccent: 'tracking-widest',
    },
  },
};

export function getWeddingTheme(themeId?: string): WeddingThemeConfig {
  if (themeId && themeId in WEDDING_THEMES) {
    return WEDDING_THEMES[themeId as WeddingThemeId];
  }
  if (themeId === 'emerald_luxury') return WEDDING_THEMES.emerald_garden;
  return WEDDING_THEMES.champagne_gold;
}
