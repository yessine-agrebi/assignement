export interface CategoryContent {
  id: string | null;
  name: string | null;
  slug: string | null;
  description: string | null;
  language: string | null;
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
