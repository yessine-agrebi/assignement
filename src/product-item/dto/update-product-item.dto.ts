import { PartialType } from '@nestjs/mapped-types';
import { CreateProductItemDto } from './create-product-item.dto';
import { IsString } from 'class-validator';

export class UpdateProductItemDto extends PartialType(CreateProductItemDto) {
    @IsString()
    id: string;
}
