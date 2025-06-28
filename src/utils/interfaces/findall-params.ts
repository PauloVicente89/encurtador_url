import { ICriteria } from "./criteria";
import { IPagination } from "./pagination";

export interface IFindAllParams {
  criteria?: ICriteria;
  pagination: IPagination;
  fields?: {
    [key: string]: boolean;
  }
};