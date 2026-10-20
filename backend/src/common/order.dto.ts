import { IsInt, IsOptional, Max, Min } from 'class-validator';

// position of the record in its list, lower goes first
export class OrderDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10000)
  order?: number;
}

export const BY_ORDER = [{ order: 'asc' as const }, { id: 'asc' as const }];
