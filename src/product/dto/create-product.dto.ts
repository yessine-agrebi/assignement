import { CreateCategoryContentDto } from "src/category/dto/create-category-content.dto";

export class CreateProductDto {
    displayOrder: number;
    categoriesIds: string[];
    contents: CreateCategoryContentDto[];
}
