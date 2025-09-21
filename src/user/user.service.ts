import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/db/entities/user-entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

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

    //  update user
    async updateUser(id: string, data: UpdateUserDto) {
        try {
            const user = await this.manager.findOneBy(UserEntity, {id});
            if(!user) {
                throw new Error('user not found');
            }
            user.name = data.name || user.name;
            user.email = data.email || user.email;
            await this.manager.save(user);
            return { message: 'user updated successfully', data: {...data, id} };
        } catch (error) {
            throw new NotFoundException(`${error.message}`);
        }
    }

    // delete user

    async deleteUser(id: string) {
        try {
            const user = await this.manager.findOneBy(UserEntity, {id});
            if(!user) {
                throw new Error('user not found');
            }
            await this.manager.delete(UserEntity, {id});
            return {message: 'user deleted successfully'};
        } catch (error) {
      throw new NotFoundException(`${error.message}`);
        }
    }

    // get all user
    async getAllUsers() {
        try {
            const users = await this.manager.find(UserEntity);
            return users;
        } catch (error) {
            throw new NotFoundException(`${error.message}`);
        }
    }

    // get user by id
    async getUserById(id: string) {
        try {
            const user = await this.manager.findOneBy(UserEntity, {id});
            if(!user) {
                throw new Error('user not found');
            }
            return user;
        } catch (error) {
            throw new NotFoundException(`${error.message}`);
        }
    }
}
