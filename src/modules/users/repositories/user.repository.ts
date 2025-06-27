import { Users } from "generated/prisma";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IFindBy } from "src/utils/interfaces/IFindBy";

export abstract class UserRepository {
  abstract create(body: CreateUserDto): Promise<Users>;
  abstract findBy(param: IFindBy): Promise<Users | null>;
}