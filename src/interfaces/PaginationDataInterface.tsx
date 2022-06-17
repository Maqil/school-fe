export interface PaginationDataInterface {
  currentPage: number;
  pageCount: number;
  pageSize: number;
}

export const defaultPaginationData = {
  currentPage: 0,
  pageCount: 0,
  pageSize: 0
} as PaginationDataInterface;
