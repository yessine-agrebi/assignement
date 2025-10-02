import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Language } from 'generated/prisma';

export class CreateCategoryContentDto {
  @IsString()
  name: string;
  @IsString()
  slug: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsEnum(Language)
  language: Language;
}
