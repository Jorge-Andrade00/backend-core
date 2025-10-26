export interface PaginationResponse<T> {
  data: T[];
  total: number;
  lastPage: number;
  currentPage: number;
  limit: number;
}
