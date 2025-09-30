import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductItemModule } from './product-item/product-item.module';

@Module({
  imports: [PrismaModule, CategoryModule, ProductModule, ProductItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
