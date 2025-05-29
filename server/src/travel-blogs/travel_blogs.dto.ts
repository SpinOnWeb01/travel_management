import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTravelBlogsDto {
  @IsOptional()
  @IsString()
  meta_title?: string;

  @IsOptional()
  @IsString()
  meta_description?: string;

  @IsOptional()
  @IsString()
  meta_keyword?: string;

  @IsNotEmpty()
  @IsString()
  main_heading?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  featured_image?: string;

  @IsOptional()
  @IsString()
  gallery_image?: string[];

  @IsOptional()
  @IsString()
  category_name?: string;

  @IsOptional()
  @IsString()
  content_description?: string;

  
}
