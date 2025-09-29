export interface ProductRow {
  // Product
  id: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;

  // ProductContent
  productContentId: string | null;
  name: string | null;
  slug: string | null;
  description: string | null;
  details: string | null;
  language: string | null;

  // Category
  categoryId: string | null;
  categoryImage: string | null;
  categoryDisplayOrder: number | null;

  // CategoryContent
  categoryContentId: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  categoryDescription: string | null;
  categoryLanguage: string | null;
}
