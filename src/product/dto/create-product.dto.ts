import { IsArray, IsNumber } from "class-validator";
import { CreateProductContentDto } from "./create-product-content.dto";

export class CreateProductDto {
    @IsNumber()
    displayOrder: number;
    @IsArray()
    categoriesIds: string[];
    @IsArray()
    contents: CreateProductContentDto[];
}
