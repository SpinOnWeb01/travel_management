// src/adminpanelauth/adminpanelauth.module.ts

import { Module } from '@nestjs/common';
import { AdminpanelauthService } from './adminpanelauth.service';
import { AdminpanelauthController } from './adminpanelauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminpanelauthController],
  providers: [AdminpanelauthService],
})
export class AdminpanelauthModule {}
