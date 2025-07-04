import { Injectable } from '@nestjs/common';
import { Users } from 'generated/prisma';
import { ICriteria } from 'src/utils/interfaces/filters-pagination';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateUserDto): Promise<Users> {
    return await this.userRepository.create(data);
  }

  async findBy(criteria: ICriteria): Promise<Users | null> {
    return await this.userRepository.findBy(criteria);
  }
}
