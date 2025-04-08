import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUser } from '../interfaces/user-auth.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Create user
   * @param user
   * @returns
   */
  public async create(user: ICreateUser): Promise<User> {
    return await this.usersRepository.save(user);
  }

  /**
   * Find user by email
   * @param email
   * @returns
   */
  public async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  /**
   * Find user by id
   * @param id
   * @returns
   */
  public async findById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  /**
   * Update user
   * @returns
   */
  public async update(id: number, data: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, data);
    return this.findById(id);
  }
}
