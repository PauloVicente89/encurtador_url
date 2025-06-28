import { ICriteria } from "src/utils/interfaces/ICriteria";

export interface IFilters {
  userId?: string;
}

export interface IQueryFilters extends ICriteria {
  page?: number;
  perPage?: number;
}