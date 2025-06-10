// src/travel-category/dto/create-travel-category.dto.ts

import { IsString, MinLength } from 'class-validator';

export class CreateTravelCategoryDto {
  @IsString()
  @MinLength(2)  
  name: string;

  @IsString()
  @MinLength(2)
  slug: string;

}
