import { ICriteria } from "src/utils/interfaces/ICriteria";
import { IPagination } from "src/utils/interfaces/IPagination";

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

