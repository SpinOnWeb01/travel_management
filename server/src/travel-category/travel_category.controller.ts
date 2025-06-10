// src/travel-category/travel_category.controller.ts

import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TravelCategoryService } from './travel_category.service';
import { CreateTravelCategoryDto } from './dto/create-travel-category.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('travel-categories')
export class TravelCategoryController {
  [x: string]: any;
  constructor(private readonly categoryService: TravelCategoryService) {}

  


  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images', // ✅ Store images in public/images
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createCategory(
    @Body() body: CreateTravelCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? `images/${file.filename}` : '';
    return this.categoryService.createCategory(body, imagePath);
  }

  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

 @Get('slug/:slug')
getCategoryBySlug(@Param('slug') slug: string) {
  return this.categoryService.findOneBySlugWithBlogs(slug);
}
}
