export interface Page {
  headerItems: HeaderItem[];
  carouselItems: CarouselItem[];
  itemGalleryProducts: ItemGallery[];
  itemGalleryServices: ItemGallery[];
  itemCard: ItemCard[];
  /**
   * Products
   */
  itemToggleCredits: ItemToggle[];
  itemToggleDeposits: ItemToggle[];
  itemToggleInvestments: ItemToggle[];
}

export interface CarouselItem {
  id: number;
  title?: {
    first: string;
    second: string;
  };
  subtitle?: string;
  link?: string;
  images: Images;
  order?: number;
  marginLeft?: number;
}

interface Images {
  desktop?: string;
  mobile: string;
}

export interface HeaderItem {
  id: number;
  title: string;
  subtitle?: string;
  link?: string;
  externalLink?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  actived?: boolean;
  icon: string;
  hasChildren?: boolean;
  children?: HeaderItem[];
}

export interface ItemGallery {
  id: number;
  title: string;
  subtitle?: string;
  link?: string;
  externalLink?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  actived?: boolean;
  icon: string;
}

export interface ItemToggle {
  id: number;
  title: string;
  icon?: string;
  images?: Images;
  selected: boolean;
  html?: string;
}

export interface ItemCard {
  id: number;
  title: string;
  description?: string;
  titleBtn?: string;
  srcImage?: string;
  matTooltipBtn?: string;
  link?: string;
  externalLink?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  position?: 'Left' | 'Right';
}

/**
 * Simulators
 */

export interface InvestmentsParameters {
  id: number;
  from: number;
  to: number;
  I30: number;
  I60: number;
  I90: number;
  I180: number;
  IM360: number;
}

export interface InvestmentsTerm {
  id: number;
  name: string;
  keyDay: string;
  valueOfDays: number;
}

export interface InvestmentsForm {
  term: InvestmentsTerm;
  capital: number;
}

/**
 * Credits
 */

export type AmortizationTableType = 'German' | 'French';

export interface TypeCreditProduct {
  id: number;
  name: string;
  description: string;
  interest: number;
  maxAmount: number;
  maxTerm: number;
}

export interface CreditsTerm {
  id: number;
  name: string;
  valueOfMonts: number;
}

export interface AmortizationTable {
  id: number;
  name: string;
  description: string;
  amortizationTable: AmortizationTableType;
}

export interface CreditsForm {
  balance: number;
  type: TypeCreditProduct;
  term: CreditsTerm;
  amortizationTable: AmortizationTable;
  paymentDay: number;
}

export interface GermanDividend {
  id: number;
  paymentDate?: Date;
  capital?: number;
  calculateDays?: number;
  balance?: number;
  interest?: number;
  cuota?: number;
}

export interface FrenchDividend {
  id: number;
  paymentDate: Date;
  cuota: number;
  interest: number;
  capital: number;
  balance: number;
}
