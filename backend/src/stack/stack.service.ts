import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateStackCategoryDto,
  UpdateStackCategoryDto,
} from './dto/stack-category.dto';
import { CreateStackItemDto, UpdateStackItemDto } from './dto/stack-item.dto';

@Injectable()
export class StackService {
  constructor(private readonly prisma: PrismaService) {}

  // CATEGORIES

  createCategory(dto: CreateStackCategoryDto) {
    return this.prisma.stackCategory.create({ data: dto });
  }

  updateCategory(id: number, dto: UpdateStackCategoryDto) {
    return this.prisma.stackCategory.update({ where: { id }, data: dto });
  }

  // items are removed by cascade
  removeCategory(id: number) {
    return this.prisma.stackCategory.delete({ where: { id } });
  }

  // ITEMS

  createItem(dto: CreateStackItemDto) {
    return this.prisma.stackItem.create({ data: dto });
  }

  updateItem(id: number, dto: UpdateStackItemDto) {
    return this.prisma.stackItem.update({ where: { id }, data: dto });
  }

  removeItem(id: number) {
    return this.prisma.stackItem.delete({ where: { id } });
  }
}
