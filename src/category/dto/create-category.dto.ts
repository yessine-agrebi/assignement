import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCategoryContentDto } from './create-category-content.dto';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  parentCategoryId?: string;
  @IsString()
  @IsOptional()
  image?: string;
  @IsNumber()
  displayOrder: number;
  @IsArray()
  contents: CreateCategoryContentDto[];
}
