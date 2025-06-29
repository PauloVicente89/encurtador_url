import { IPagination } from "src/utils/interfaces/filters-pagination";

export interface IFindLinksByUserParams {
  userId: string;
  pagination: IPagination;
};

