import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// asks the Next.js site to drop its cached portfolio data
@Injectable()
export class RevalidateService {
  private readonly logger = new Logger(RevalidateService.name);

  constructor(private readonly config: ConfigService) {}

  async revalidateSite() {
    const url = this.config.get<string>('SITE_REVALIDATE_URL');
    const secret = this.config.get<string>('REVALIDATE_SECRET');

    if (!url || !secret) return;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'x-revalidate-secret': secret },
      });
      if (!res.ok)
        this.logger.warn(`Site revalidation responded ${res.status}`);
    } catch (error) {
      this.logger.warn(`Site revalidation failed: ${(error as Error).message}`);
    }
  }
}
