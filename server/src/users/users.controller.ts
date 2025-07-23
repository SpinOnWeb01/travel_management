import {
  Controller,
  Put,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from 'src/user/user.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   @Put(':id')
async updateUserById(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateData: Partial<Users>,
): Promise<Users> { // ✅ Return type must match
  const updatedUser = await this.usersService.updateUserById(id, updateData);
  return updatedUser;
}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

}
