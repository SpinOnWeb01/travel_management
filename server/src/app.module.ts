// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TravelBlogsModule } from './travel-blogs/travel_blogs.module';
import { TravelCategoryModule } from './travel-category/travel_category.module';
import { UserModule } from './user/user.module';
import { BeckendAuthModule } from './beckend-auth/beckend-auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MailerModule } from './mailer/mailer.module';
import * as redisStore from 'cache-manager-redis-store';
import { AdminpanelauthModule } from './adminpanelauth/adminpanelauth.module';

@Module({
  imports: [
    MailerModule,
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthModule,
    TravelBlogsModule,
    AdminpanelauthModule,
    TravelCategoryModule,
    UserModule,
    CacheModule.register({
      store: redisStore as any,
      host: 'localhost', // or your Redis host
      port: 6379,        // default Redis port
      ttl: 600,          // 10 minutes in seconds for Redis
      isGlobal: true,
    }),
    BeckendAuthModule,
  ],
})
export class AppModule {}
