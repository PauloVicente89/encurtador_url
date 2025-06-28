import { ICriteria } from "./ICriteria";
import { IPagination } from "./IPagination";

export interface IFindAllParams {
  criteria?: ICriteria;
  pagination: IPagination;
  fields?: {
    [key: string]: boolean;
  }
};