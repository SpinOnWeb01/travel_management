import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './userbackend.entity';
import { Users } from 'src/user/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User,Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export if used in AuthModule
})
export class UsersModule {}
