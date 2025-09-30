import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';

@Controller('product-items')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @Post()
  create(@Body() createProductItemDto: CreateProductItemDto) {
    return this.productItemService.create(createProductItemDto);
  }

  @Get()
  findAll(@Query('productId') productId: string) {
    return this.productItemService.findAll(productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productItemService.findOne(id);
  }

  @Put()
  update(@Body() updateProductItemDto: UpdateProductItemDto) {
    return this.productItemService.update(updateProductItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productItemService.remove(id);
  }
}
