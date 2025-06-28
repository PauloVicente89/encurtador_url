import { Links, PrismaClient } from "generated/prisma";
import { ICriteria } from "src/utils/interfaces/criteria";
import { IFindAllParams } from "src/utils/interfaces/findall-params";
import { CreateLinkDto } from "../dtos/create-link.dto";
import { UpdateLinkDto } from "../dtos/update-link.dto";
import { IFilters } from "../interfaces/findall-by-users";
import { LinkRepository } from "./link.repository";

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

  async findAll({ criteria, pagination, fields }: IFindAllParams): Promise<Partial<Links>[]> {
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
      select: fields,
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
