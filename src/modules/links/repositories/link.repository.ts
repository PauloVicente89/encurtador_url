import { Links } from "generated/prisma";
import { IFindBy } from "src/utils/interfaces/IFindBy";
import { CreateLinkDto } from "../dtos/create-link.dto";
import { UpdateLinkDto } from "../dtos/update-link.dto";

export abstract class LinkRepository {
  abstract create(body: CreateLinkDto): Promise<Links>;
  abstract update(id: string, body: UpdateLinkDto): Promise<Links>;
  abstract findBy(param: IFindBy): Promise<Links | null>;
}