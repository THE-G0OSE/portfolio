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
import { CreateSocialDto, UpdateSocialDto } from './dto/social.dto';
import { SocialsService } from './socials.service';

@Controller('socials')
@AdminWrite()
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Post()
  create(@Body() dto: CreateSocialDto) {
    return this.socialsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSocialDto) {
    return this.socialsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.socialsService.remove(id);
  }
}
