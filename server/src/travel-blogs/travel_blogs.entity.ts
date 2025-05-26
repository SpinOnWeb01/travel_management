import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
