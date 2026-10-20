import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSocialDto, UpdateSocialDto } from './dto/social.dto';

@Injectable()
export class SocialsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSocialDto) {
    return this.prisma.social.create({ data: dto });
  }

  update(id: number, dto: UpdateSocialDto) {
    return this.prisma.social.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.social.delete({ where: { id } });
  }
}
