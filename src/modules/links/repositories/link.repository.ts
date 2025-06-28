import { Links } from "generated/prisma";
import { ICriteria } from "src/utils/interfaces/criteria";
import { CreateLinkDto } from "../dtos/create-link.dto";
import { UpdateLinkDto } from "../dtos/update-link.dto";
import { IFindAllParams } from "src/utils/interfaces/findall-params";

export abstract class LinkRepository {
  abstract create(body: CreateLinkDto): Promise<Links>;
  abstract update(id: string, body: UpdateLinkDto): Promise<Links>;
  abstract findBy(criteria: ICriteria): Promise<Links | null>;
  abstract findAll({ criteria, pagination, fields }: IFindAllParams): Promise<Partial<Links>[]>;
}