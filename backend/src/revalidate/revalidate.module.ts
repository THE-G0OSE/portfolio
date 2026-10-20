import { Global, Module } from '@nestjs/common';
import { RevalidateInterceptor } from './revalidate.interceptor';
import { RevalidateService } from './revalidate.service';

@Global()
@Module({
  providers: [RevalidateService, RevalidateInterceptor],
  exports: [RevalidateService, RevalidateInterceptor],
})
export class RevalidateModule {}
