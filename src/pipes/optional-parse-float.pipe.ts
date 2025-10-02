import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class OptionalParseFloatPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed (numeric string is expected)');
    }
    return val;
  }
}
