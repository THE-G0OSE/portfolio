import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '../generated/prisma/client';

// maps prisma errors to http errors instead of 500
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const exception = this.toHttpException(error);

    res.status(exception.getStatus()).json(exception.getResponse());
  }

  private toHttpException(
    error: Prisma.PrismaClientKnownRequestError,
  ): HttpException {
    switch (error.code) {
      // record to update / delete not found
      case 'P2025':
        return new NotFoundException('Record not found');
      // foreign key violation (e.g. unknown categoryId)
      case 'P2003':
        return new BadRequestException('Related record does not exist');
      default:
        return new BadRequestException(`Database error ${error.code}`);
    }
  }
}
