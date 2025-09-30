import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PRODUCT_QUERY } from 'src/lib/queries';
import { ProductRow } from './types/product-row.type';
import { ProductMapper } from './mappers/product.mapper';
import { Product } from './types/product.types';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const { categoriesIds, contents, ...productData } = createProductDto;
    const product = await this.prisma.product.create({
      data: {
        ...productData,
        contents: {
          create: contents,
        },
        categories: {
          create: categoriesIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
      include: { contents: true, categories: true },
    });
    return product;
  }

  async findAll(): Promise<Product[]> {
    const productRows =
      await this.prisma.$queryRawUnsafe<ProductRow[]>(PRODUCT_QUERY);
    const products = ProductMapper.mapProductRowsToDto(productRows);
    return products;
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({
      where: { id },
      include: { contents: true, categories: {
        include: { category: { include: { contents: true } } },
      } },
    })
  }

  async update(updateProductDto: UpdateProductDto) {
    return await this.prisma.$transaction(async (tx) => {
      const { id, contents, categoriesIds, ...rest } = updateProductDto;

      const product = await tx.product.update({
        where: { id },
        data: {
          ...rest,
        },
      });
      if (contents && contents.length > 0) {
        for (const content of contents) {
          await tx.productContent.upsert({
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
              details: content.details || undefined,
            },
            create: {
              productId: id,
              name: content.name,
              slug: content.slug,
              description: content.description || undefined,
              details: content.details || undefined,
              language: content.language,
            }
          });
        }
      }

      if (categoriesIds && categoriesIds.length > 0) {
        await tx.productOnCategory.deleteMany({
          where: { productId: id },
        });
        for (const categoryId of categoriesIds) {
          await tx.productOnCategory.create({
            data: {
              productId: id,
              categoryId: categoryId,
            },
          });
        }
      }

      return product;
    })
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
