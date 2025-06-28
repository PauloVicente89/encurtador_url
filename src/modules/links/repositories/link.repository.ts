import { Links } from "generated/prisma";
import { CreateLinkDto } from "../dtos/create-link.dto";
import { UpdateLinkDto } from "../dtos/update-link.dto";
import { IFindAllParams } from "src/utils/interfaces/IFindAll";
import { ICriteria } from "src/utils/interfaces/ICriteria";
import { IFindAllByUserResponse } from "../interfaces/IResponses";

export abstract class LinkRepository {
  abstract create(body: CreateLinkDto): Promise<Links>;
  abstract update(id: string, body: UpdateLinkDto): Promise<Links>;
  abstract findBy(param: ICriteria): Promise<Links | null>;
  abstract findAllByUser({ criteria, pagination }: IFindAllParams): Promise<IFindAllByUserResponse[]>
}