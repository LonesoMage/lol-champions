export * from './champion';

export interface ApiResponse<T> {
  data: T;
  type: string;
  format: string;
  version: string;
  error?: string;
}