export interface IListResponse<T = unknown> {
  totalRows: number;
  totalPages: number;
  currentPage: number;
  result: T;
}
