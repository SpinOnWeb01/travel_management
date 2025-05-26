import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/user.entity';
import { TravelBlog } from './travel-blogs/travel_blogs.entity';

dotenv.config();

export const ormConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER, // Replace with your PostgreSQL username
  password: process.env.DB_PASSWORD, // Replace with your PostgreSQL password
  database: process.env.DB_NAME, // Replace with your database name
  entities: [User, TravelBlog,], //__dirname + '/**/*.entity{.ts,.js}' Glob pattern for entity files
  synchronize: true, // Enable auto-synchronization (avoid in production)
};
