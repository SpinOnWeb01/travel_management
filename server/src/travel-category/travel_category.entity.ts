// src/travel-category/travel_category.entity.ts

import { TravelBlog } from 'src/travel-blogs/travel_blogs.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('travel_category') // 👈 matches your actual table name
export class TravelCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_name', nullable: true  })
  name: string;

  @Column({ name: 'category_slug', nullable: true, unique: true})
  slug: string;

 @Column({ name: 'category_image', nullable: true })
  image: string;


  @OneToMany(() => TravelBlog, blog => blog.category)
  blogs: TravelBlog[];
}
