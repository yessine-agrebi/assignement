import { IsEnum, IsOptional, IsString } from "class-validator";
import { Language } from "generated/prisma";

export class CreateProductContentDto {
    @IsString()
    name: string;
    @IsString()
    slug: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsString()
    @IsOptional()
    details?: string;
    @IsEnum(Language)
    language: Language;
}