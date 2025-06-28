import { Links, PrismaClient } from "generated/prisma";
import { CreateLinkDto } from "../dtos/create-link.dto";
import { LinkRepository } from "./link.repository";
import { UpdateLinkDto } from "../dtos/update-link.dto";
import { IFindAllParams } from "src/utils/interfaces/IFindAll";
import { ICriteria } from "src/utils/interfaces/ICriteria";
import { IFilters } from "../interfaces/IFilters";
import { IFindAllByUserResponse } from "../interfaces/IResponses";

export default class PrismaLinkRepository implements LinkRepository 
{
  private readonly prisma: PrismaClient;
  
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(body: CreateLinkDto): Promise<Links> {
    return await this.prisma.links.create({
      data: body,
    });
  }

  async findAllByUser({ criteria, pagination }: IFindAllParams): Promise<IFindAllByUserResponse[]> {
    const page = pagination.page || 1;
    const perPage = pagination.perPage || 20;
    const skip = (page - 1) * perPage;
    const where: IFilters = {};

    if(criteria?.userId) {
      where.userId = String(criteria?.userId);
    }

    return await this.prisma.links.findMany({
      where: where,
      take: +perPage,
      skip: +skip,
      select: {
        accessCount: true,
        code: true,
      }
    });
  }

  async findBy(criteria: ICriteria): Promise<Links | null> {
    return await this.prisma.links.findFirst({
      where: criteria,
    });
  }

  async update(id: string, body: UpdateLinkDto): Promise<Links> {
    return await this.prisma.links.update({
      where: { id },
      data: body,
    });
  }
}
