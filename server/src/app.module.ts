import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelBlogsModule } from './travel-blogs/travel-blogs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',           // apne db user
      password: 'root',       // apne db password
      database: 'travel_management',  // tumhara db name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // dev ke liye true,
    }),
    TravelBlogsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
