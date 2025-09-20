import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/db/entities/user-entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private manager: EntityManager;
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  // Create User
  async createUser(data: CreateUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntity, {
        email: data.email,
      });

      if (user) {
        throw new Error('user already exists, go to login');
      }

      const hashedPassword = await bcrypt.hash(
        data.password,
        Number(process.env.SALT_ROUNDS),
      );

      const createUser = await this.manager.create(UserEntity, {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      });

      await this.manager.save(createUser);

      return { message: "User created successfully",createUser };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
}
