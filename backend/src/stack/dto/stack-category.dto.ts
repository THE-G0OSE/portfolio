import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { OrderDto } from '../../common/order.dto';
import { ComicColor } from '../../generated/prisma/client';

export class CreateStackCategoryDto extends OrderDto {
  // short tab label in the power switch
  @IsString()
  @MaxLength(12)
  label: string;

  @IsString()
  @MaxLength(30)
  title: string;

  // sound effect in the burst, e.g. "ZAP!"
  @IsString()
  @MaxLength(10)
  sfx: string;

  // roman number of the part, e.g. "II"
  @IsString()
  @MaxLength(6)
  part: string;

  @IsEnum(ComicColor)
  color: ComicColor;
}

export class UpdateStackCategoryDto extends PartialType(
  CreateStackCategoryDto,
) {}
