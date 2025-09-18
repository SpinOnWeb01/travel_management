import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { BeckendAuthService } from './beckend-auth.service';
import { MailerService } from 'src/mailer/mailer.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('beckend-auth')
export class BeckendAuthController {
  constructor(
    private readonly authService: BeckendAuthService,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache // Injected cache manager
  ) {}

  

  @Post('signup')
     async signup(@Body() body: { phone: string; email: string; password: string }) {
     return this.authService.signupMobile(body.phone, body.email, body.password);
    }


  @Post('verify-otp')
  async verifyOtp(@Body() body: { userId: number; otp: string }) {
    return this.authService.verifyOtp(body.userId, body.otp);
  }

  @Get('get-otp/:userId')
  async getOtp(@Param('userId') userId: string) {
    return this.authService.getOtp(parseInt(userId));
  }

  @Post('login')
async login(@Body() body: { phone: string; password: string }) {
  try {
    console.log('Login request received:', body);
    const result = await this.authService.loginMobile(body.phone, body.password);
    return result;
  } catch (error) {
    console.error('Login failed:', error);
    return {
      statusCode: 500,
      message: 'Login failed',
      error: error.message || 'Internal server error',
    };
  }
}

  @Post('send-otp')
  async sendOtp(@Body() body: { email: string }) {
    return this.authService.sendOtpToEmail(body.email);
  }

@Get('cache-diagnostics/:userId')
async cacheDiagnostics(@Param('userId') userId: number) {
  const key = `otp:${userId}`;
  const otpValue = await this.authService.getOtp(userId); // Get direct value
  
  let allKeys: string[] = [];
  try {
    if (typeof this.cacheManager.stores.keys === 'function') {
      allKeys = Array.from(await this.cacheManager.stores.keys()).map(String);
    }
  } catch (error) {
    console.error('Key listing failed', error);
  } 
  return {
    userId,
    key,
    storedOtp: otpValue, 
    allKeys
  };
}
@Post('send-otp-mobile')
async sendOtpForSignup(@Body() body: { phone: string }) {
  return this.authService.initiateSignup(body.phone);
}
@Post('set-password')
async setPassword(@Body() body: { userId: number; password: string }) {
  return this.authService.setPassword(body.userId, body.password);
}
// In controller 
@Get('cache-keys')
async listCacheKeys() {
  return this.authService.debugCacheKeys();
}
}