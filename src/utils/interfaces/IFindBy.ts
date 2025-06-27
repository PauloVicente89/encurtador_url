import { Users } from "generated/prisma";

export interface IFindBy {
  [key: string]: string | number | boolean | Date;
}