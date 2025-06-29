export interface ICriteria {
  [key: string]: string | number | boolean | Date | undefined | null;
}

export interface IPagination {
  page?: number;
  perPage?: number;
}

export interface IFiltersWithPagination extends ICriteria {
  page?: number;
  perPage?: number;
}