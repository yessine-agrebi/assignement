import { Language } from 'generated/prisma';

export class CreateCategoryContentDto {
  name: string;
  slug: string;
  description?: string;
  language: Language;
}
