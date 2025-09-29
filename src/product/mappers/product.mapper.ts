import { CategoryContent } from 'src/category/types/category-row.type';
import { ProductRow } from '../types/product-row.type';
import { Product, ProductContent } from '../types/product.types';

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
          description: row.categoryDescription,
          language: row.categoryLanguage!,
        });
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
}
