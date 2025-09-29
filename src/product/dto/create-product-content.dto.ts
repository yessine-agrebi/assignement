import { Language } from "generated/prisma";

export class CreateProductContentDto {
    name: string;
    slug: string;
    description?: string;
    details?: string;
    language: Language;
}