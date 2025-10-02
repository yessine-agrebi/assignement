import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with new data...');

  const creativeArts = await prisma.category.create({
    data: {
      image: 'creative_arts.png',
      displayOrder: 1,
      contents: {
        create: {
          name: 'Creative Arts',
          slug: 'creative-arts',
          description: 'Digital tools for art and design',
          language: 'EN',
        },
      },
    },
  });

  const digitalPainting = await prisma.category.create({
    data: {
      image: 'digital_painting.png',
      displayOrder: 1,
      parentCategoryId: creativeArts.id,
      contents: {
        create: {
          name: 'Digital Painting',
          slug: 'digital-painting',
          description: 'Software and tablets for digital artists',
          language: 'EN',
        },
      },
    },
  });

  const urbanGardening = await prisma.category.create({
    data: {
      image: 'urban_gardening.png',
      displayOrder: 2,
      contents: {
        create: {
          name: 'Urban Gardening',
          slug: 'urban-gardening',
          description: 'Tools and kits for small-space farming',
          language: 'EN',
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      displayOrder: 1,
      contents: {
        create: {
          name: 'ArtFlow Pro Tablet',
          slug: 'artflow-pro-tablet',
          description: 'A powerful high-resolution drawing tablet for pros',
          details: '16GB RAM, 4K screen, Pressure Sensitive Stylus included',
          language: 'EN',
        },
      },
      categories: {
        create: {
          categoryId: digitalPainting.id,
        },
      },
      items: {
        create: [
          {
            barcode: '1001010100',
            reference: 'AF-PT-BLK',
            image: 'tablet.png',
            online: true,
            quantity: 30,
            prices: {
              create: {
                price: 799.00,
                currency: 'USD',
              },
            },
            variations: {
              create: {
                contents: {
                  create: {
                    name: 'Color',
                    value: 'Cosmic Black',
                    language: 'EN',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      displayOrder: 2,
      contents: {
        create: {
          name: 'TerraGrip Gardening Gloves',
          slug: 'terragrip-gloves',
          description: 'Durable, puncture-resistant gloves for all seasons',
          details: 'Synthetic leather, reinforced knuckles',
          language: 'EN',
        },
      },
      categories: {
        create: {
          categoryId: urbanGardening.id,
        },
      },
      items: {
        create: [
          {
            barcode: '2002020200',
            reference: 'TG-GL-L',
            image: 'gloves.png',
            online: true,
            quantity: 150,
            prices: {
              create: {
                price: 24.50,
                currency: 'USD',
              },
            },
            variations: {
              create: {
                contents: {
                  create: {
                    name: 'Size',
                    value: 'Large',
                    language: 'EN',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });

  console.log('✅ Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
