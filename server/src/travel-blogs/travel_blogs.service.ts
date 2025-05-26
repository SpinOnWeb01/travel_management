import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelBlog } from './travel_blogs.entity';
import { CreateTravelBlogsDto } from './travel_blogs.dto';

@Injectable()
export class TravelBlogsService {
  constructor(
    @InjectRepository(TravelBlog)
    private travelBlogsRepository: Repository<TravelBlog>,
  ) {}

  findAll(): Promise<TravelBlog[]> {
    return this.travelBlogsRepository.find();
  }

  async findOne(id: number): Promise<TravelBlog> {
    const blog = await this.travelBlogsRepository.findOneBy({ id });
    if (!blog) {
      throw new Error(`TravelBlog with id ${id} not found`);
    }
    return blog;
  }

   async create(createBlogDto: CreateTravelBlogsDto): Promise<TravelBlog> {
    const blogData = {
      ...createBlogDto,
      gallery_image: Array.isArray(createBlogDto.gallery_image)
        ? createBlogDto.gallery_image.join(',')
        : createBlogDto.gallery_image,
    };
    const blog = this.travelBlogsRepository.create(blogData);
    return this.travelBlogsRepository.save(blog);
  }

  // create(blogData: Partial<TravelBlog>): Promise<TravelBlog> {
  //   const blog = this.travelBlogsRepository.create(blogData);
  //   return this.travelBlogsRepository.save(blog);
  // }

  async update(id: number, blogData: Partial<TravelBlog>): Promise<TravelBlog> {
    await this.travelBlogsRepository.update(id, blogData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.travelBlogsRepository.delete(id);
  }
}
