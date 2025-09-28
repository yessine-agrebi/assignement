import { CategoryRow, CategoryDto, ParentCategoryDto, SubcategoryDto, CategoryContentDto } from './category.types';

export class CategoryMapper {
  /**
   * Transforms flat CategoryRow data into a hierarchical CategoryDto array.
   */
  public static mapRawRowsToHierarchicalDto(rawRows: CategoryRow[]): CategoryDto[] {
    const categoriesMap = new Map<string, CategoryDto>();

    for (const row of rawRows) {
      // 1. Get or initialize the main Category
      const category = this.getOrCreateCategory(categoriesMap, row);

      // 2. Add Category's Content/Translation
      this.addContent(category.contents, {
        id: row.categoryContentId,
        name: row.name,
        slug: row.slug,
        description: row.description,
        language: row.language,
      });

      // 3. Add Parent Category details
      this.addParentDetails(category, row);

      // 4. Add Subcategory details
      this.addSubcategoryDetails(category, row);
    }

    return Array.from(categoriesMap.values());
  }

  // --- Helper Methods for Clarity and Reusability ---

  private static getOrCreateCategory(map: Map<string, CategoryDto>, row: CategoryRow): CategoryDto {
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

  private static addContent(contents: CategoryContentDto[], contentData: any): void {
    if (contentData.id && !contents.some(c => c.id === contentData.id)) {
      contents.push(contentData);
    }
  }

  private static addParentDetails(category: CategoryDto, row: CategoryRow): void {
    if (row.parentId) {
      if (!category.parent) {
        category.parent = {
          id: row.parentId,
          image: row.parentImage!,
          displayOrder: row.parentDisplayOrder!,
          contents: [],
        } as ParentCategoryDto;
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

  private static addSubcategoryDetails(category: CategoryDto, row: CategoryRow): void {
    if (row.subcategoryId) {
      let subcategory = category.subcategories.find(sub => sub.id === row.subcategoryId);

      if (!subcategory) {
        subcategory = {
          id: row.subcategoryId,
          image: row.subcategoryImage!,
          displayOrder: row.subcategoryDisplayOrder!,
          contents: [],
        } as SubcategoryDto;
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