import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelBlog } from './travel_blogs.entity';
import { TravelBlogsService } from './travel_blogs.service';
import { TravelBlogsController } from './travel_blogs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TravelBlog])],
  providers: [TravelBlogsService],
  controllers: [TravelBlogsController],
})
export class TravelBlogsModule {}
