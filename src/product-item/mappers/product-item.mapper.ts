// import { ProductItem } from 'generated/prisma';
// import {
//   ProductItemDto,
//   ProductItemPriceDto,
//   ProductItemVariationDto,
//   ProductItemVariationContentDto,
// } from '../types/product-item.types';

// export class ProductItemMapper {
//   public static toDto(item: ProductItem): ProductItemDto {
//     return {
//       id: item.id,
//       barcode: item.barcode,
//       reference: item.reference,
//       image: item.image,
//       online: item.online,
//       quantity: item.quantity,
//       createdAt: item.createdAt,
//       updatedAt: item.updatedAt,

//       prices: item.prices.map((p: any): ProductItemPriceDto => ({
//         id: p.id,
//         price: p.price?.toNumber?.() ?? null, // Prisma.Decimal → number
//         currency: p.currency,
//         createdAt: p.createdAt,
//         updatedAt: p.updatedAt,
//       })),

//       variations: item.variations.map((v: any): ProductItemVariationDto => ({
//         id: v.id,
//         createdAt: v.createdAt,
//         updatedAt: v.updatedAt,
//         contents: v.contents.map(
//           (c: any): ProductItemVariationContentDto => ({
//             id: c.id,
//             name: c.name,
//             value: c.value,
//             language: c.language,
//             createdAt: c.createdAt,
//             updatedAt: c.updatedAt,
//           }),
//         ),
//       })),
//     };
//   }

//   public static toDtos(items: any[]): ProductItemDto[] {
//     return items.map(this.toDto);
//   }
// }
