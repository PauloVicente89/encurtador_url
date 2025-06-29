import { Links } from "generated/prisma";
import { ICriteria } from "src/utils/interfaces/filters-pagination";
import { CreateLinkDto } from "../dtos/create-link.dto";
import { UpdateLinkDto } from "../dtos/update-link.dto";
import { IFindLinksByUserParams } from "../interfaces/findall-by-users";

export abstract class LinkRepository {
  abstract create(body: CreateLinkDto): Promise<Links>;
  abstract update(id: string, body: UpdateLinkDto): Promise<Links>;
  abstract findBy(criteria: ICriteria): Promise<Links | null>;
  abstract findAllByUser(data: IFindLinksByUserParams): Promise<Partial<Links>[]>;
}