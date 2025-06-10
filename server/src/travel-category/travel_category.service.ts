// src/travel-category/travel_category.service.ts

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelCategory } from './travel_category.entity';
import { Repository } from 'typeorm';
import { CreateTravelCategoryDto } from './dto/create-travel-category.dto';
import { TravelBlog } from 'src/travel-blogs/travel_blogs.entity';

@Injectable()
export class TravelCategoryService {
    [x: string]: any;
  constructor(
    @InjectRepository(TravelCategory)
    private categoryRepo: Repository<TravelCategory>,

    @InjectRepository(TravelBlog)
    private blogRepo: Repository<TravelBlog>,
  ) {}

  async createCategory(data: CreateTravelCategoryDto, imagePath: string) {
  try {
    const category = this.categoryRepo.create({
      name: data.name,
      slug: data.slug,
      image: imagePath,
      
    });
    return await this.categoryRepo.save(category);
  } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique violation error code
        throw new ConflictException('Slug already exists. Please use a different slug.');
      }
      throw error;
    }
}

  async findOneBySlugWithBlogs(slug: string) {
    // Find the category by slug
    const category = await this.categoryRepo.findOne({ where: { slug } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Find blogs where category_name matches category.name
    const blogs = await this.blogRepo.find({
      where: { category_name: category.slug },
      select: ['id', 'main_heading', 'meta_description','meta_keyword','main_heading','slug','featured_image','gallery_image','category_name'],
    });

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      blogs,
    };
  }



  async getAllCategories() {
    return this.categoryRepo.find();
  }
}
