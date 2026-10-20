import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { EmptyToNull } from '../../common/empty-to-null.transform';
import { OrderDto } from '../../common/order.dto';
import { ComicColor } from '../../generated/prisma/client';

export class CreateProjectDto extends OrderDto {
  // small label above the name, e.g. "Latest release"
  @IsString()
  @MaxLength(30)
  tag: string;

  @IsString()
  @MaxLength(60)
  name: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsArray()
  @ArrayMaxSize(12)
  @IsString({ each: true })
  @MaxLength(30, { each: true })
  tech: string[];

  @IsEnum(ComicColor)
  color: ComicColor;

  @EmptyToNull()
  @IsOptional()
  @IsUrl()
  liveUrl?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsUrl()
  codeUrl?: string | null;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
