import { PrismaClient, Users } from "generated/prisma";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IFindBy } from "src/utils/interfaces/IFindBy";

export default class PrismaUserRepository implements UserRepository 
{
  private readonly prisma: PrismaClient;
  
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(body: CreateUserDto): Promise<Users> {
    return await this.prisma.users.create({
      data: body,
    });
  }

  async findBy(criteria: IFindBy): Promise<Users | null> {
    return await this.prisma.users.findFirst({
      where: criteria,
    });
  }
}
