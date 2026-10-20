import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';
import { RevalidateModule } from './revalidate/revalidate.module';
import { SocialsModule } from './socials/socials.module';
import { StackModule } from './stack/stack.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    RevalidateModule,
    PortfolioModule,
    ProfileModule,
    StackModule,
    JobsModule,
    ProjectsModule,
    SocialsModule,
  ],
})
export class AppModule {}
