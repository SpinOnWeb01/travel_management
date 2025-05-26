import {   Controller,  Get,  Post,  Put,  Delete,  Param,  Body,  ParseIntPipe, UseGuards, UploadedFile, UseInterceptors} from '@nestjs/common';
import { TravelBlogsService } from './travel_blogs.service';
import { TravelBlog } from './travel_blogs.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTravelBlogsDto } from './travel_blogs.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('create')
  @UseInterceptors(
    FileInterceptor('featured_image', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createBlogDto: CreateTravelBlogsDto,
  ) {
    const imagePath = image ? `images/${image.filename}` : undefined;
    return this.travelBlogsService.create({ ...createBlogDto, featured_image: imagePath });
  }

  // @Post()
  // create(@Body() blogData: CreateTravelBlogsDto): Promise<TravelBlog> {
  //   return this.travelBlogsService.create(blogData);
  // }

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
