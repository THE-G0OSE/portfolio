import { Transform } from 'class-transformer';

// empty form field means "no value"
export const EmptyToNull = () =>
  Transform(({ value }: { value: unknown }) => (value === '' ? null : value));
