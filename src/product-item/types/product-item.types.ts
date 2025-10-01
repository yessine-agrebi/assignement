import { Currency, Language } from 'generated/prisma';

export interface ProductItemPrice {
  id: string;
  price: number | null;
  currency: Currency;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductItemVariationContent {
  id: string;
  name: string;
  value: string;
  language: Language;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductItemVariation {
  id: string;
  contents: ProductItemVariationContent[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductItem {
  id: string;
  barcode: string;
  reference?: string | null;
  image?: string | null;
  online: boolean;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;

  prices: ProductItemPrice[];
  variations: ProductItemVariation[];
}
