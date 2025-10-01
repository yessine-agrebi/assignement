import { Currency, Language } from "generated/prisma";

export interface ProductRow {
  id: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;

  productContentId?: string;
  name?: string;
  slug?: string;
  description?: string;
  details?: string;
  language?: Language;

  categoryId?: string;
  categoryImage?: string;
  categoryDisplayOrder?: number;
  categoryContentId?: string;
  categoryName?: string;
  categorySlug?: string;
  categoryDescription?: string;
  categoryLanguage?: string;

  productItemId?: string;
  barcode?: string;
  reference?: string;
  productItemImage?: string;
  online?: boolean;
  quantity?: number;
  productItemCreatedAt?: Date;
  productItemUpdatedAt?: Date;

  productItemPriceId?: string;
  price?: number;
  currency?: Currency;

  productItemVariationId?: string;
  variationContentId?: string;
  variationName?: string;
  variationValue?: string;
  variationLanguage?: Language;
}
