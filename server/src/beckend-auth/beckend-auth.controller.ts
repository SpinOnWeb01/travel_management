import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BeckendAuthService } from './beckend-auth.service';

@Controller('beckend-auth')
export class BeckendAuthController {
  constructor(private readonly authService: BeckendAuthService) {}

  @Post('signup')
  async signup(@Body() body: { phone: string; password: string }) {
    return this.authService.signupMobile(body.phone, body.password);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { userId: number; otp: string }) {
    return this.authService.verifyOtp(body.userId, body.otp);
  }

  // In controller
@Get('get-otp/:userId')
async getOtp(@Param('userId') userId: string) { // Keep as string
  return this.authService.getOtp(parseInt(userId));
}

@Post('login')
async login(@Body() body: { phone: string; password: string }) {
  return this.authService.loginMobile(body.phone, body.password);
}

}
