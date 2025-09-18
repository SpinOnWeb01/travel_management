import { IsNumber, IsString, MinLength } from 'class-validator';

export class SetPasswordDto {
  @IsNumber()
  userId: number;

  @IsString()
  @MinLength(6)
  password: string;
}
