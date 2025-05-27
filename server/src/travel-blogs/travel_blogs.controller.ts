import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TravelBlogsService } from './travel_blogs.service';
import { TravelBlog } from './travel_blogs.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTravelBlogsDto } from './travel_blogs.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


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
    FileFieldsInterceptor(
      [
        { name: 'featured_image', maxCount: 1 },
        { name: 'gallery_image', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './public/images',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const prefix = file.fieldname === 'featured_image' ? 'featured' : 'gallery';
            callback(null, `${prefix}-${uniqueSuffix}${ext}`);
          },
        }),
      }
    )
  )
  async create(
    @UploadedFiles()
    files: {
      featured_image?: Express.Multer.File[];
      gallery_image?: Express.Multer.File[];
    },
    @Body() createBlogDto: CreateTravelBlogsDto,
  ) {
    const featuredImage = files.featured_image?.[0];
    const featuredImagePath = featuredImage ? `images/${featuredImage.filename}` : undefined;

    const galleryImagePaths =
      files.gallery_image?.map((file) => `images/${file.filename}`) || [];

    return this.travelBlogsService.create({
      ...createBlogDto,
      featured_image: featuredImagePath,
      gallery_image: galleryImagePaths,
    });
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
