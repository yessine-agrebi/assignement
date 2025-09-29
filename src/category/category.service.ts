import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CATEGORY_PARENT_SUBCATEGORIES_QUERY } from 'src/lib/queries';
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
    const categoryRows = await this.prisma.$queryRawUnsafe<CategoryRow[]>(
      CATEGORY_PARENT_SUBCATEGORIES_QUERY,
    );

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
