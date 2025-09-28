import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CATEGORY_PARENT_SUBCATEGORIES_QUERY } from 'src/lib/queries';
import { CategoryDto, CategoryRow } from './category.types';
import { CategoryMapper } from './category.mapper';

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

  async findAll(): Promise<CategoryDto[]> {
    const rawRows = await this.prisma.$queryRawUnsafe<CategoryRow[]>(
      CATEGORY_PARENT_SUBCATEGORIES_QUERY,
    );

    return CategoryMapper.mapRawRowsToHierarchicalDto(rawRows);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
