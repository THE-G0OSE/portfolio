import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { OrderDto } from '../../common/order.dto';
import { ComicColor } from '../../generated/prisma/client';

export class CreateJobDto extends OrderDto {
  // e.g. "2021–NOW"
  @IsString()
  @MaxLength(30)
  period: string;

  @IsString()
  @MaxLength(60)
  role: string;

  @IsString()
  @MaxLength(60)
  company: string;

  @IsString()
  @MaxLength(300)
  impact: string;

  @IsEnum(ComicColor)
  color: ComicColor;
}

export class UpdateJobDto extends PartialType(CreateJobDto) {}
