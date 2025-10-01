import { Category } from 'src/category/types/category.types';
import { ProductItem } from 'src/product-item/types/product-item.types';

export interface ProductContent {
  id: string;
  name: string;
  slug: string;
  description?: string;
  details?: string;
  language: string;
}

export interface Product {
  id: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  contents: ProductContent[];
  categories: Category[];
  items?: ProductItem[]
}
