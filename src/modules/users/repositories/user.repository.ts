import { Users } from "generated/prisma";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ICriteria } from "src/utils/interfaces/ICriteria";

export abstract class UserRepository {
  abstract create(body: CreateUserDto): Promise<Users>;
  abstract findBy(param: ICriteria): Promise<Users | null>;
}