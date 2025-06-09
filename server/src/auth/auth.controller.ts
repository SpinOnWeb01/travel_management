import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Request,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response, Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response, // required for cookies
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.authService.login(user);

    // Set refresh token in HttpOnly cookie
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // true in production
      // sameSite: 'strict',
      secure: false, // ❌ Must be false for localhost (no https)
      sameSite: 'lax', // or 'strict'
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      success: true,
      access_token: tokens.access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return {
      success: true,
      user: req.user,
    };
  }

  @Post('refresh')
  async refreshToken(@Req() req: ExpressRequest) {
    const token = req.cookies['refresh_token'];
    if (!token) throw new UnauthorizedException('No refresh token provided');

    try {
      const decoded = this.authService.verifyRefreshToken(token);
      const newAccessToken = this.authService.generateAccessToken(decoded);
      return {
        success: true,
        access_token: newAccessToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
