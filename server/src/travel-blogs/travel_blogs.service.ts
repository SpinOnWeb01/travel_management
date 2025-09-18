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

  async findOne(slug: string): Promise<TravelBlog> {
    const blog = await this.travelBlogsRepository.findOneBy({ slug });
    if (!blog) {
      throw new Error(`TravelBlog with id ${slug} not found`);
    }
    return blog;
  }

  async findBySlug(slug: string): Promise<TravelBlog> {
  const blog = await this.travelBlogsRepository.findOneBy({ slug });
  if (!blog) {
    throw new Error(`TravelBlog with slug '${slug}' not found`);
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

  async update(slug: string, blogData: Partial<TravelBlog>): Promise<TravelBlog> {
    await this.travelBlogsRepository.update({slug}, blogData);
    return this.findOne(slug);
  }

  async remove(id: number): Promise<void> {
    await this.travelBlogsRepository.delete(id);
  }
}
