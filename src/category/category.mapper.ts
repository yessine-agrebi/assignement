import { CategoryContent, CategoryRow } from './types/category-row.type';
import { Category, Subcategory } from './types/category.types';

export class CategoryMapper {
  public static mapRawRowsToHierarchicalDto(
    rawRows: CategoryRow[],
  ): Category[] {
    const categoriesMap = new Map<string, Category>();

    for (const row of rawRows) {
      const category = this.getOrCreateCategory(categoriesMap, row);

      this.addContent(category.contents, {
        id: row.categoryContentId,
        name: row.name,
        slug: row.slug,
        description: row.description,
        language: row.language,
      });

      this.addParentDetails(category, row);

      this.addSubcategoryDetails(category, row);
    }

    return Array.from(categoriesMap.values());
  }

  private static getOrCreateCategory(
    map: Map<string, Category>,
    row: CategoryRow,
  ): Category {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        image: row.image,
        displayOrder: row.displayOrder,
        contents: [],
        parent: null,
        subcategories: [],
      });
    }
    return map.get(row.id)!;
  }

  private static addContent(
    contents: CategoryContent[],
    contentData: CategoryContent,
  ): void {
    if (contentData.id && !contents.some((c) => c.id === contentData.id)) {
      contents.push(contentData);
    }
  }

  private static addParentDetails(category: Category, row: CategoryRow): void {
    if (row.parentId) {
      if (!category.parent) {
        category.parent = {
          id: row.parentId,
          image: row.parentImage!,
          displayOrder: row.parentDisplayOrder!,
          contents: [],
          parent: null,
          subcategories: [],
        } as Category;
      }
      this.addContent(category.parent.contents, {
        id: row.parentContentId,
        name: row.parentName,
        slug: row.parentSlug,
        description: row.parentDescription,
        language: row.parentLanguage,
      });
    }
  }

  private static addSubcategoryDetails(
    category: Category,
    row: CategoryRow,
  ): void {
    if (row.subcategoryId) {
      let subcategory = category.subcategories.find(
        (sub) => sub.id === row.subcategoryId,
      );

      if (!subcategory) {
        subcategory = {
          id: row.subcategoryId,
          image: row.subcategoryImage!,
          displayOrder: row.subcategoryDisplayOrder!,
          contents: [],
        } as Subcategory;
        category.subcategories.push(subcategory);
      }

      this.addContent(subcategory.contents, {
        id: row.subcategoryContentId,
        name: row.subcategoryName,
        slug: row.subcategorySlug,
        description: row.subcategoryDescription,
        language: row.subcategoryLanguage,
      });
    }
  }
}
