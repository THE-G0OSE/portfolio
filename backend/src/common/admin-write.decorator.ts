import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RevalidateInterceptor } from '../revalidate/revalidate.interceptor';

// admin only endpoint, which refreshes the site cache after success
export const AdminWrite = () =>
  applyDecorators(UseGuards(AuthGuard), UseInterceptors(RevalidateInterceptor));
