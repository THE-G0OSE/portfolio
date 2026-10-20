import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { tap } from 'rxjs';
import { RevalidateService } from './revalidate.service';

// after every successful write request, refreshes the site cache
@Injectable()
export class RevalidateInterceptor implements NestInterceptor {
  constructor(private readonly revalidateService: RevalidateService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const { method } = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        if (method !== 'GET') void this.revalidateService.revalidateSite();
      }),
    );
  }
}
