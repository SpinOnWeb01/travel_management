import {   Controller,  Get,  Post,  Put,  Delete,  Param,  Body,  ParseIntPipe, UseGuards} from '@nestjs/common';
import { TravelBlogsService } from './travel_blogs.service';
import { TravelBlog } from './travel_blogs.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTravelBlogsDto } from './travel_blogs.dto';

@UseGuards(JwtAuthGuard)
@Controller('travel-blogs')
export class TravelBlogsController {
  constructor(private readonly travelBlogsService: TravelBlogsService) {}

  @Get()
  findAll(): Promise<TravelBlog[]> {
    return this.travelBlogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TravelBlog> {
    return this.travelBlogsService.findOne(id);
  }

  @Post()
  create(@Body() blogData: CreateTravelBlogsDto): Promise<TravelBlog> {
    return this.travelBlogsService.create(blogData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() blogData: Partial<TravelBlog>,
  ): Promise<TravelBlog> {
    return this.travelBlogsService.update(id, blogData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.travelBlogsService.remove(id);
  }
}
