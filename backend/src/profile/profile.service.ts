import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

export const PROFILE_ID = 1;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  update(dto: UpdateProfileDto) {
    return this.prisma.profile.upsert({
      where: { id: PROFILE_ID },
      update: dto,
      create: { id: PROFILE_ID, ...dto },
    });
  }
}
