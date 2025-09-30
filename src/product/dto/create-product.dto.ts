import { CreateProductContentDto } from "./create-product-content.dto";

export class CreateProductDto {
    displayOrder: number;
    categoriesIds: string[];
    contents: CreateProductContentDto[];
}
