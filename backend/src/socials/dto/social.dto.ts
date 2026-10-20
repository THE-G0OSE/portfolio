import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { OrderDto } from '../../common/order.dto';
import { ComicColor } from '../../generated/prisma/client';

export class CreateSocialDto extends OrderDto {
  @IsString()
  @MaxLength(20)
  name: string;

  @IsString()
  @MaxLength(40)
  handle: string;

  // free text, e.g. "1.2K"
  @IsString()
  @MaxLength(10)
  count: string;

  @IsString()
  @MaxLength(20)
  unit: string;

  @IsUrl()
  href: string;

  @IsEnum(ComicColor)
  color: ComicColor;

  // sticker rotation in degrees
  @IsNumber()
  @Min(-10)
  @Max(10)
  tilt: number;
}

export class UpdateSocialDto extends PartialType(CreateSocialDto) {}
