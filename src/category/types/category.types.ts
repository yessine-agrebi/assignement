import { CategoryContent } from './category-row.type';

export interface Subcategory {
  id: string;
  image: string;
  displayOrder: number;
  contents: CategoryContent[];
}

export interface Category {
  id: string;
  image: string;
  displayOrder: number;
  contents: CategoryContent[];
  parent: Category | null;
  subcategories: Subcategory[];
}
