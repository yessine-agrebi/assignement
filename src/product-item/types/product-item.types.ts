import { Currency, Language } from 'generated/prisma';

export interface ProductItemPriceDto {
  id: string;
  price: number | null;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductItemVariationContentDto {
  id: string;
  name: string;
  value: string;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductItemVariationDto {
  id: string;
  contents: ProductItemVariationContentDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductItemDto {
  id: string;
  barcode: string;
  reference?: string | null;
  image?: string | null;
  online: boolean;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  prices: ProductItemPriceDto[];
  variations: ProductItemVariationDto[];
}
