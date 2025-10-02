import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRow } from './types/product-row.type';
import { ProductMapper } from './mappers/product.mapper';
import { Product } from './types/product.types';
import { Prisma } from 'generated/prisma';

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

  async findAll(
    filters?: {
      name?: string;
      description?: string;
      minPrice?: number;
      maxPrice?: number;
    },
    limit: number = 10,
    offset: number = 0,
  ): Promise<Product[]> {
    const whereClauses: Prisma.Sql[] = [];

    if (filters?.name) {
      whereClauses.push(
        Prisma.sql`pc."name" ILIKE ${'%' + filters.name + '%'}`,
      );
    }

    if (filters?.description) {
      whereClauses.push(
        Prisma.sql`pc."description" ILIKE ${'%' + filters.description + '%'}`,
      );
    }

    if (filters?.minPrice !== undefined) {
      whereClauses.push(Prisma.sql`pip."price" >= ${filters.minPrice}`);
    }

    if (filters?.maxPrice !== undefined) {
      whereClauses.push(Prisma.sql`pip."price" <= ${filters.maxPrice}`);
    }

    const whereSql =
      whereClauses.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(whereClauses, ' AND ')}`
        : Prisma.empty;

    const query = Prisma.sql`SELECT
  p."id",
  p."displayOrder",
  p."createdAt",
  p."updatedAt",

  pc."id"          AS "productContentId",
  pc."name",
  pc."slug",
  pc."description",
  pc."details",
  pc."language",

  c."id"           AS "categoryId",
  c."image"        AS "categoryImage",
  c."displayOrder" AS "categoryDisplayOrder",

  cc."id"          AS "categoryContentId",
  cc."name"        AS "categoryName",
  cc."slug"        AS "categorySlug",
  cc."description" AS "categoryDescription",
  cc."language"    AS "categoryLanguage",

  pi."id"          AS "productItemId",
  pi."barcode",
  pi."reference",
  pi."image"       AS "productItemImage",
  pi."online",
  pi."quantity",
  pi."createdAt"   AS "productItemCreatedAt",
  pi."updatedAt"   AS "productItemUpdatedAt",

  pip."id"         AS "productItemPriceId",
  pip."price",
  pip."currency",

  piv."id"         AS "productItemVariationId",
  pivc."id"        AS "variationContentId",
  pivc."name"      AS "variationName",
  pivc."value"     AS "variationValue",
  pivc."language"  AS "variationLanguage"

FROM "Product" p
LEFT JOIN "ProductContent" pc
  ON p."id" = pc."productId"

LEFT JOIN "ProductOnCategory" poc
  ON p."id" = poc."productId"

LEFT JOIN "Category" c
  ON poc."categoryId" = c."id"

LEFT JOIN "CategoryContent" cc
  ON c."id" = cc."categoryId"

LEFT JOIN "ProductItem" pi
  ON p."id" = pi."productId"

LEFT JOIN "ProductItemPrice" pip
  ON pi."id" = pip."productItemId"

LEFT JOIN "ProductItemVariation" piv
  ON pi."id" = piv."productItemId"

LEFT JOIN "ProductItemVariationContent" pivc
  ON piv."id" = pivc."productItemVariationId"
${whereSql}
    ORDER BY p."createdAt" DESC
    LIMIT ${limit} OFFSET ${offset};
`;

    const productRows = await this.prisma.$queryRaw<ProductRow[]>(query);
    const products = ProductMapper.mapProductRowsToDto(productRows);
    return products;
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({
      where: { id },
      include: {
        contents: true,
        categories: {
          include: { category: { include: { contents: true } } },
        },
        items: {
          include: {
            prices: true,
            variations: { include: { contents: true } },
          },
        },
      },
    });
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
            },
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
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
