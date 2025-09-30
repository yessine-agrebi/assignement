import { Currency } from 'generated/prisma';

export class CreateProductItemPriceDto {
  price: number;
  currency: Currency;
}

export class CreateProductItemVariationContentDto {
  name: string;
  value: string;
  language: string;
}

export class CreateProductItemVariationDto {
  contents: CreateProductItemVariationContentDto[];
}

export class CreateProductItemDto {
  productId: string;
  barcode: string;
  reference?: string;
  image?: string;
  online?: boolean;
  quantity?: number;
  prices: CreateProductItemPriceDto[];
  variations: CreateProductItemVariationDto[];
}
