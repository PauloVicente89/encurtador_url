import { PrismaClient, Users } from "generated/prisma";
import { ICriteria } from "src/utils/interfaces/criteria";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserRepository } from "./user.repository";

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

  async findBy(criteria: ICriteria): Promise<Users | null> {
    return await this.prisma.users.findFirst({
      where: criteria,
    });
  }
}
