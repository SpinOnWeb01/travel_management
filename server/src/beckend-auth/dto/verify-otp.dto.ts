import { IsNumber, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsNumber()
  userId: number;

  @IsString()
  @Length(4, 8)
  otp: string;
}
