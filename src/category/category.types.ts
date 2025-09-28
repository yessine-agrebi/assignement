interface CategoryContentRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  language: string;
}

export interface CategoryRow {
  id: string;
  image: string;
  displayOrder: number;
  categoryContentId: string;
  name: string;
  slug: string;
  description: string;
  language: string;
  parentId: string | null;
  parentImage: string | null;
  parentDisplayOrder: number | null;
  parentContentId: string | null;
  parentName: string | null;
  parentSlug: string | null;
  parentDescription: string | null;
  parentLanguage: string | null;
  subcategoryId: string | null;
  subcategoryImage: string | null;
  subcategoryDisplayOrder: number | null;
  subcategoryContentId: string | null;
  subcategoryName: string | null;
  subcategorySlug: string | null;
  subcategoryDescription: string | null;
  subcategoryLanguage: string | null;
}

export interface CategoryContentDto extends CategoryContentRow {}

export interface SubcategoryDto {
  id: string;
  image: string;
  displayOrder: number;
  contents: CategoryContentDto[];
}

export interface ParentCategoryDto extends SubcategoryDto {} 

export interface CategoryDto {
  id: string;
  image: string;
  displayOrder: number;
  contents: CategoryContentDto[];
  parent: ParentCategoryDto | null;
  subcategories: SubcategoryDto[];
}