import { TravelCategory } from 'src/travel-category/travel_category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('travel_blogs') 
export class TravelBlog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  meta_title: string;

  @Column({ type: 'text', nullable: true })
  meta_description: string;

  @Column({ length: 255, nullable: true })
  meta_keyword: string;

  @Column({ length: 255, nullable: true })
  main_heading: string;

  @Column({ length: 255, unique: true, nullable: true })
  slug: string;

  @Column({ nullable: true })
  featured_image: string;

  @Column({ type: 'text', nullable: true })
  gallery_image: string;

   @Column({ length: 255, unique: false, nullable: true })
   category_name: string;
 

   @Column({ length: 255,  nullable: true })
   content_description: string;

    // ✅ Foreign key column
  @Column({ nullable: true })
  category_id: number;

  @ManyToOne(() => TravelCategory, category => category.blogs)
  category: TravelCategory;
 
}
