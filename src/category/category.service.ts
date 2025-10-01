import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from './types/category.types';
import { CategoryRow } from './types/category-row.type';
import { CategoryMapper } from './mappers/category.mapper';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { contents, ...categoryData } = createCategoryDto;

    return await this.prisma.category.create({
      data: {
        ...categoryData,
        contents: {
          create: contents,
        },
      },
      include: { contents: true },
    });
  }

  async findAll(): Promise<Category[]> {
    const query = `
      SELECT
  c.id,
  c.image ,
  c."displayOrder",
  cc.id AS "categoryContentId",
  cc.name,
  cc.slug,
  cc.description,
  cc.language,
  
  p.id AS "parentId",
  p.image AS "parentImage",
  p."displayOrder" AS "parentDisplayOrder",
  pc.id AS "parentContentId",
  pc.name AS "parentName",
  pc.slug AS "parentSlug",
  pc.description AS "parentDescription",
  pc.language AS "parentLanguage",
  
  sc.id AS "subcategoryId",
  sc.image AS "subcategoryImage",
  sc."displayOrder" AS "subcategoryDisplayOrder",
  scc.id AS "subcategoryContentId",
  scc.name AS "subcategoryName",
  scc.slug AS "subcategorySlug",
  scc.description AS "subcategoryDescription",
  scc.language AS "subcategoryLanguage"

FROM "Category" c



-- Join category translations
LEFT JOIN "CategoryContent" cc ON cc."categoryId" = c.id

-- Join parent category and its translations
LEFT JOIN "Category" p ON c."parentCategoryId" = p.id
LEFT JOIN "CategoryContent" pc ON pc."categoryId" = p.id

-- Join subcategories and their translations
LEFT JOIN "Category" sc ON sc."parentCategoryId" = c.id
LEFT JOIN "CategoryContent" scc ON scc."categoryId" = sc.id

-- WHERE c."parentCategoryId" IS NULL
ORDER BY c."displayOrder", sc."displayOrder";

`;
    const categoryRows =
      await this.prisma.$queryRawUnsafe<CategoryRow[]>(query);

    return CategoryMapper.mapCategoryRowsToHierarchicalDto(categoryRows);
  }

  async findOne(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
      include: { contents: true },
    });
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const { id, contents, ...rest } = updateCategoryDto;

    return this.prisma.$transaction(async (tx) => {
      const category = await tx.category.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      if (contents && contents.length > 0) {
        for (const content of contents) {
          await tx.categoryContent.upsert({
            where: {
              slug_language: {
                slug: content.slug,
                language: content.language,
              },
            },
            update: {
              name: content.name,
              slug: content.slug,
              description: content.description,
            },
            create: {
              categoryId: id,
              name: content.name,
              slug: content.slug,
              description: content.description,
              language: content.language,
            },
          });
        }
      }

      return category;
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.category.updateMany({
        where: { parentCategoryId: id },
        data: { parentCategoryId: null },
      });

      return tx.category.delete({
        where: { id },
      });
    });
  }
}
