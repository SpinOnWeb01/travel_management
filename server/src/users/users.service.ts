import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/user/user.entity';
// import { User } from './userbackend.entity'; // Remove this line if not used elsewhere



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(email: string, password: string): Promise<Users> {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password: hashed });
    return this.usersRepository.save(user);
  }

 async findByEmail(email: string): Promise<Users | undefined> {
  const user = await this.usersRepository.findOne({ where: { email } });
  return user === null ? undefined : user;
}



async updateUserById(id: number, updateData: Partial<Users>): Promise<Users> {
  const user = await this.usersRepository.findOne({ where: { id } });

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  Object.assign(user, updateData);
  return this.usersRepository.save(user); // ✅ Returns Users
}

async findById(id: number): Promise<Users | null> {
  return await this.usersRepository.findOne({ where: { id } });
}




}
