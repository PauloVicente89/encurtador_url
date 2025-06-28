import { Links, PrismaClient } from "generated/prisma";
import { IFindBy } from "src/utils/interfaces/IFindBy";
import { CreateLinkDto } from "../dtos/create-link.dto";
import { LinkRepository } from "./link.repository";
import { UpdateLinkDto } from "../dtos/update-link.dto";

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

  async findBy(criteria: IFindBy): Promise<Links | null> {
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
