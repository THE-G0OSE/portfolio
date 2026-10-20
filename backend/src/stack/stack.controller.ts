import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminWrite } from '../common/admin-write.decorator';
import {
  CreateStackCategoryDto,
  UpdateStackCategoryDto,
} from './dto/stack-category.dto';
import { CreateStackItemDto, UpdateStackItemDto } from './dto/stack-item.dto';
import { StackService } from './stack.service';

@Controller('stack')
@AdminWrite()
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @Post('categories')
  createCategory(@Body() dto: CreateStackCategoryDto) {
    return this.stackService.createCategory(dto);
  }

  @Patch('categories/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStackCategoryDto,
  ) {
    return this.stackService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  @HttpCode(204)
  async removeCategory(@Param('id', ParseIntPipe) id: number) {
    await this.stackService.removeCategory(id);
  }

  @Post('items')
  createItem(@Body() dto: CreateStackItemDto) {
    return this.stackService.createItem(dto);
  }

  @Patch('items/:id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStackItemDto,
  ) {
    return this.stackService.updateItem(id, dto);
  }

  @Delete('items/:id')
  @HttpCode(204)
  async removeItem(@Param('id', ParseIntPipe) id: number) {
    await this.stackService.removeItem(id);
  }
}
