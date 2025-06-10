// src/travel-category/travel_category.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelCategory } from './travel_category.entity';
import { TravelCategoryService } from './travel_category.service';
import { TravelCategoryController } from './travel_category.controller';
import { TravelBlog } from 'src/travel-blogs/travel_blogs.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TravelCategory,TravelBlog])], // ✅ Needed
  providers: [TravelCategoryService],
  controllers: [TravelCategoryController],
})
export class TravelCategoryModule {}
