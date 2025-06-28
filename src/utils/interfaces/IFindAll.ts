import { ICriteria } from "./ICriteria";

export interface IFindAllParams {
  criteria?: ICriteria;
  pagination: IPagination;
};

interface IPagination {
  page: number;
  perPage: number;
}