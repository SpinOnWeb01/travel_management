// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TravelBlogsModule } from './travel-blogs/travel-blogs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),  // Register the TypeORM module with the configuration
    UsersModule,  // Make sure to import UserModule here
    AuthModule,  
    TravelBlogsModule
  ],
})
export class AppModule {}
