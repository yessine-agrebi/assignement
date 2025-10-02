import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Currency } from 'generated/prisma';

export class CreateProductItemPriceDto {
  @IsNumber()
  price: number;
  @IsEnum(Currency)
  currency: Currency;
}

export class CreateProductItemVariationContentDto {
  @IsString()
  name: string;
  @IsString()
  value: string;
  @IsString()
  language: string;
}

export class CreateProductItemVariationDto {
  @IsArray()
  contents: CreateProductItemVariationContentDto[];
}

export class CreateProductItemDto {
  @IsString()
  productId: string;
  @IsString()
  barcode: string;
  @IsString()
  @IsOptional()
  reference?: string;
  @IsString()
  @IsOptional()
  image?: string;
  @IsBoolean()
  @IsOptional()
  online?: boolean;
  @IsNumber()
  @IsOptional()
  quantity?: number;
  @IsArray()
  prices: CreateProductItemPriceDto[];
  @IsArray()
  variations: CreateProductItemVariationDto[];
}
