import { CategoryContent } from 'src/category/types/category-row.type';
import { ProductRow } from '../types/product-row.type';
import {
  Product,
  ProductContent,
} from '../types/product.types';
import { ProductItemPrice, ProductItemVariationContent } from 'src/product-item/types/product-item.types';

export class ProductMapper {
  public static mapProductRowsToDto(productRows: ProductRow[]): Product[] {
    const productsMap = new Map<string, Product>();

    for (const row of productRows) {
      const product = this.getOrCreateProduct(productsMap, row);

      this.addContent(product.contents, {
        id: row.productContentId!,
        name: row.name!,
        slug: row.slug!,
        description: row.description || undefined,
        details: row.details || undefined,
        language: row.language!,
      });

      if (row.categoryId && row.categoryContentId) {
        let category = product.categories.find((c) => c.id === row.categoryId);

        if (!category) {
          category = {
            id: row.categoryId!,
            image: row.categoryImage!,
            displayOrder: row.categoryDisplayOrder || 0,
            contents: [],
            parent: null,
            subcategories: [],
          };
          product.categories.push(category);
        }

        this.addCategoryContent(category.contents, {
          id: row.categoryContentId!,
          name: row.categoryName!,
          slug: row.categorySlug!,
          description: row.categoryDescription ?? null,
          language: row.categoryLanguage!,
        });
      }

      if (row.productItemId) {
        let item = product?.items?.find((i) => i.id === row.productItemId);

        if (!item) {
          item = {
            id: row.productItemId!,
            barcode: row.barcode!,
            reference: row.reference || undefined,
            image: row.productItemImage || undefined,
            online: row.online ?? true,
            quantity: row.quantity ?? 0,
            createdAt: row.productItemCreatedAt!,
            updatedAt: row.productItemUpdatedAt!,
            prices: [],
            variations: [],
          };
          product?.items?.push(item);
        }

        if (row.productItemPriceId) {
          this.addPrice(item.prices, {
            id: row.productItemPriceId!,
            price: row.price!,
            currency: row.currency!,
          });
        }

        if (row.productItemVariationId) {
          let variation = item.variations.find(
            (v) => v.id === row.productItemVariationId,
          );

          if (!variation) {
            variation = {
              id: row.productItemVariationId!,
              contents: [],
            };
            item.variations.push(variation);
          }

          if (row.variationContentId) {
            this.addVariationContent(variation.contents, {
              id: row.variationContentId!,
              name: row.variationName!,
              value: row.variationValue!,
              language: row.variationLanguage!,
            });
          }
        }
      }
    }

    return Array.from(productsMap.values());
  }


  private static getOrCreateProduct(
    map: Map<string, Product>,
    row: ProductRow,
  ): Product {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        displayOrder: row.displayOrder,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        contents: [],
        categories: [],
        items: [],
      });
    }
    return map.get(row.id)!;
  }

  private static addContent(
    contents: ProductContent[],
    contentData: ProductContent,
  ): void {
    if (contentData.id && !contents.some((c) => c.id === contentData.id)) {
      contents.push(contentData);
    }
  }

  private static addCategoryContent(
    contents: CategoryContent[],
    contentData: CategoryContent,
  ): void {
    if (contentData.id && !contents.some((c) => c.id === contentData.id)) {
      contents.push(contentData);
    }
  }

  private static addPrice(
    prices: ProductItemPrice[],
    priceData: ProductItemPrice,
  ): void {
    if (priceData.id && !prices.some((p) => p.id === priceData.id)) {
      prices.push(priceData);
    }
  }

  private static addVariationContent(
    contents: ProductItemVariationContent[],
    contentData: ProductItemVariationContent,
  ): void {
    if (contentData.id && !contents.some((c) => c.id === contentData.id)) {
      contents.push(contentData);
    }
  }
}
