import { Injectable } from '@nestjs/common';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductItemService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProductItemDto: CreateProductItemDto) {
    return await this.prismaService.productItem.create({
      data: {
        productId: createProductItemDto.productId,
        barcode: createProductItemDto.barcode,
        reference: createProductItemDto.reference,
        image: createProductItemDto.image,
        online: createProductItemDto.online ?? true,
        quantity: createProductItemDto.quantity ?? 0,

        prices: {
          create: createProductItemDto.prices.map((p) => ({
            price: p.price,
            currency: p.currency,
          })),
        },

        variations: {
          create: createProductItemDto.variations.map((v) => ({
            contents: {
              create: v.contents.map((c) => ({
                name: c.name,
                value: c.value,
                language: c.language,
              })),
            },
          })),
        },
      },
      include: {
        prices: true,
        variations: { include: { contents: true } },
      },
    });
  }

  async findAll(productId: string) {
    const items = await this.prismaService.productItem.findMany({
      where: { productId },
      include: {
        prices: true,
        variations: { include: { contents: true } },
      },
    });

    return items;
  }

  async findOne(id: string) {
    return await this.prismaService.productItem.findUnique({
      where: { id },
      include: {
        prices: true,
        variations: { include: { contents: true } },
      },
    });
  }

  async update(updateProductItemDto: UpdateProductItemDto) {
    const { id } = updateProductItemDto;
    return await this.prismaService.$transaction(async (tx) => {
      await tx.productItemPrice.deleteMany({ where: { productItemId: id } });
      await tx.productItemVariation.deleteMany({
        where: { productItemId: id },
      });

      return tx.productItem.update({
        where: { id },
        data: {
          barcode: updateProductItemDto.barcode,
          reference: updateProductItemDto.reference,
          image: updateProductItemDto.image,
          online: updateProductItemDto.online,
          quantity: updateProductItemDto.quantity,

          prices: {
            create:
              updateProductItemDto.prices?.map((p) => ({
                price: p.price,
                currency: p.currency,
              })) || [],
          },

          variations: {
            create:
              updateProductItemDto.variations?.map((variation) => ({
                contents: {
                  create: variation.contents.map((content) => ({
                    name: content.name,
                    value: content.value,
                    language: content.language,
                  })),
                },
              })) || [],
          },
        },
        include: {
          prices: true,
          variations: { include: { contents: true } },
        },
      });
    });
  }

  async remove(id: string) {
    return await this.prismaService.productItem.delete({
      where: { id },
    });
  }
}
