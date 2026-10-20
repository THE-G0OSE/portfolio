import { Injectable } from '@nestjs/common';
import { BY_ORDER } from '../common/order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PROFILE_ID } from '../profile/profile.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  // everything the site needs in one request
  async getPortfolio() {
    const [profile, stack, jobs, projects, socials] =
      await this.prisma.$transaction([
        this.prisma.profile.findUnique({ where: { id: PROFILE_ID } }),
        this.prisma.stackCategory.findMany({
          orderBy: BY_ORDER,
          include: { items: { orderBy: BY_ORDER } },
        }),
        this.prisma.job.findMany({ orderBy: BY_ORDER }),
        this.prisma.project.findMany({ orderBy: BY_ORDER }),
        this.prisma.social.findMany({ orderBy: BY_ORDER }),
      ]);

    return { profile, stack, jobs, projects, socials };
  }
}
