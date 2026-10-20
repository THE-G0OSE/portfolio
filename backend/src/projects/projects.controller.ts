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
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@AdminWrite()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.projectsService.remove(id);
  }
}
