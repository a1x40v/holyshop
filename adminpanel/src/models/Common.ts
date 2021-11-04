export interface PaginationDto<T> {
  amount: number;
  page: number;
  data: T[];
}
