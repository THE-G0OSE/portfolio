import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';
import { OrderDto } from '../../common/order.dto';

export class CreateStackItemDto extends OrderDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsInt()
  @Min(1)
  @Max(5)
  level: number;

  @IsInt()
  categoryId: number;
}

export class UpdateStackItemDto extends PartialType(CreateStackItemDto) {}
