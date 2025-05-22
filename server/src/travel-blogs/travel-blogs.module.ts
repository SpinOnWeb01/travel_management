import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelBlog } from './travel-blogs.entity';
import { TravelBlogsService } from './travel-blogs.service';
import { TravelBlogsController } from './travel-blogs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TravelBlog])],
  providers: [TravelBlogsService],
  controllers: [TravelBlogsController],
})
export class TravelBlogsModule {}
