import { CreateCategoryContentDto } from './create-category-content.dto';

export class CreateCategoryDto {
  parentCategoryId?: string;
  image?: string;
  displayOrder: number;
  contents: CreateCategoryContentDto[];
}
