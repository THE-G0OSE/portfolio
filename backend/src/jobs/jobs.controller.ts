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
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
@AdminWrite()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJobDto) {
    return this.jobsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.jobsService.remove(id);
  }
}
