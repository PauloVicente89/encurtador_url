import { ICriteria } from "src/utils/interfaces/criteria";
import { IPagination } from "src/utils/interfaces/pagination";

export interface IFilters {
  userId?: string;
}

export interface IQueryFilters extends ICriteria {
  page?: number;
  perPage?: number;
}

export interface IFindAllByUserParams {
  criteria?: ICriteria;
  pagination: IPagination;
};

