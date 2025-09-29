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
    console.log(products[0].categories.length);
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
