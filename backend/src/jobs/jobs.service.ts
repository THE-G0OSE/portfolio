import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateJobDto) {
    return this.prisma.job.create({ data: dto });
  }

  update(id: number, dto: UpdateJobDto) {
    return this.prisma.job.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }
}
