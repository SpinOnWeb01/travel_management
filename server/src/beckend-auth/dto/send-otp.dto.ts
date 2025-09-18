import { IsOptional, IsEmail, IsMobilePhone } from 'class-validator';

export class SendOtpDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsMobilePhone('en-IN')
  phone?: string;
}
