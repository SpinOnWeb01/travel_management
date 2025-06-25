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

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthModule,
    TravelBlogsModule,
    TravelCategoryModule,
    UserModule,
    CacheModule.register({ isGlobal: true }), // ✅ GLOBAL cache
    BeckendAuthModule, // ✅ This auto-registers its own controller/service
  ],
})
export class AppModule {}

